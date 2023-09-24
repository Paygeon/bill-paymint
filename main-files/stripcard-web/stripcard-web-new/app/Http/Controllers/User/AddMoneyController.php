<?php

namespace App\Http\Controllers\User;

use Exception;
use App\Models\UserWallet;
use App\Models\Transaction;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\TemporaryData;
use App\Http\Helpers\Response;
use App\Models\Admin\Currency;
use App\Models\Admin\BasicSettings;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Models\Admin\PaymentGateway;
use App\Traits\PaymentGateway\Manual;
use App\Traits\PaymentGateway\Stripe;
use App\Constants\PaymentGatewayConst;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use App\Models\Admin\PaymentGatewayCurrency;
use App\Http\Helpers\PaymentGateway as PaymentGatewayHelper;

class AddMoneyController extends Controller
{
    use Stripe,Manual;

    /*
     * Bkash Gateway
     */

     private $base_url;

     public function __construct()
     {
         $this->base_url = 'https://checkout.sandbox.bka.sh/v1.2.0-beta';
     }


    public function index() {
        $page_title = "Add Money";
        $user_wallets = UserWallet::auth()->get();
        $user_currencies = Currency::whereIn('id',$user_wallets->pluck('id')->toArray())->get();

        $payment_gateways_currencies = PaymentGatewayCurrency::whereHas('gateway', function ($gateway) {
            $gateway->where('slug', PaymentGatewayConst::add_money_slug());
            $gateway->where('status', 1);
        })->get();
        $transactions = Transaction::auth()->addMoney()->latest()->take(5)->get();
        return view('user.sections.add-money.index',compact("page_title","payment_gateways_currencies","transactions"));
    }

    public function getCurrenciesXml(Request $request) {
        $validator = Validator::make($request->all(),[
            'target'        => "required|integer|exists:payment_gateways,code",
        ]);
        if($validator->fails()) {
            return Response::error($validator->errors(),null,400);
        }
        $validated = $validator->validate();

        $user_wallets = UserWallet::auth()->get();
        $user_currencies = Currency::whereIn('id',$user_wallets->pluck('currency_id')->toArray())->get();

        try{
            $payment_gateways = PaymentGateway::active()->gateway($validated['target'])->withWhereHas('currencies',function($q) use ($user_currencies){
                $q->whereIn("currency_code",$user_currencies->pluck("code")->toArray());
            })->has("currencies")->first();
        }catch(Exception $e) {
            $error = ['error' => ['Something went worng!. Please try again.']];
            return Response::error($error,null,500);
        }

        if(!$payment_gateways) {
            $error = ['error' => ['Opps! Invalid Payment Gateway']];
            return Response::error($error,null,404);
        }

        $success = ['success' => ['Request server successfully']];
        return Response::success($success,$payment_gateways,200);
    }

    public function submit(Request $request) {
        $basic_setting = BasicSettings::first();
        try{
            $instance = PaymentGatewayHelper::init($request->all())->gateway()->render();
        }catch(Exception $e) {
            return back()->with(['error' => [$e->getMessage()]]);
        }
        return $instance;
    }

    public function success(Request $request, $gateway){
        $requestData = $request->all();
        $token = $requestData['token'] ?? "";
        $checkTempData = TemporaryData::where("type",$gateway)->where("identifier",$token)->first();
        if(!$checkTempData) return redirect()->route('user.add.money.index')->with(['error' => ['Transaction faild. Record didn\'t saved properly. Please try again.']]);
        $checkTempData = $checkTempData->toArray();

        try{
            PaymentGatewayHelper::init($checkTempData)->type(PaymentGatewayConst::TYPEADDMONEY)->responseReceive();
        }catch(Exception $e) {

            return back()->with(['error' => [$e->getMessage()]]);
        }
        return redirect()->route("user.add.money.index")->with(['success' => ['Successfully added money']]);
    }

    public function cancel(Request $request, $gateway) {
        $token = session()->get('identifier');
        if( $token){
            TemporaryData::where("identifier",$token)->delete();
        }

        return redirect()->route('user.add.money.index');
    }

    public function payment($gateway){
        $page_title = "Stripe Payment";
        $tempData = Session::get('identifier');
        $hasData = TemporaryData::where('identifier', $tempData)->where('type',$gateway)->first();
        if(!$hasData){
            return redirect()->route('user.add.money.index');
        }
        return view('user.sections.add-money.automatic.'.$gateway,compact("page_title","hasData"));
    }
    public function manualPayment(){
        $tempData = Session::get('identifier');
        $hasData = TemporaryData::where('identifier', $tempData)->first();
        $gateway = PaymentGateway::manual()->where('slug',PaymentGatewayConst::add_money_slug())->where('id',$hasData->data->gateway)->first();
        $page_title = "Manual Payment Via".' '.$gateway->name;
        if(!$hasData){
            return redirect()->route('user.add.money.index');
        }
        return view('user.sections.add-money.manual.payment_confirmation',compact("page_title","hasData",'gateway'));
    }

    // Bkash Payment

    public function bkashIndex(){
        $output = Session::get('output');
        $amount = $output['amount']->total_amount;
        $page_title = "Payment With Bkash";
        return view('user.sections.add-money.bkash.index', compact('page_title','amount'));
    }

    public function getBkashCredentials($gateway) {
        if(!$gateway) throw new Exception("Payment gateway not available");

        $username_sample = ['username'];
        $password_sample = ['password'];
        $app_key_sample = ['api key','api_key','client id','primary key', 'app key', 'app_key'];
        $secret_key_sample = ['client_secret','client secret','secret','secret key','secret id', 'app_secrete', 'secrete_key'];

        $username = '';
        $outer_break = false;
        foreach($username_sample as $item) {
            if($outer_break == true) {
                break;
            }
            $modify_item = $this->paypalPlainText($item);
            foreach($gateway->credentials ?? [] as $gatewayInput) {
                $label = $gatewayInput->label ?? "";
                $label = $this->paypalPlainText($label);

                if($label == $modify_item) {
                    $username = $gatewayInput->value ?? "";
                    $outer_break = true;
                    break;
                }
            }
        }


        $password = '';
        $outer_break = false;
        foreach($password_sample as $item) {
            if($outer_break == true) {
                break;
            }
            $modify_item = $this->paypalPlainText($item);
            foreach($gateway->credentials ?? [] as $gatewayInput) {
                $label = $gatewayInput->label ?? "";
                $label = $this->paypalPlainText($label);

                if($label == $modify_item) {
                    $password = $gatewayInput->value ?? "";
                    $outer_break = true;
                    break;
                }
            }
        }

        $app_key = '';
        $outer_break = false;
        foreach($app_key_sample as $item) {
            if($outer_break == true) {
                break;
            }
            $modify_item = $this->paypalPlainText($item);
            foreach($gateway->credentials ?? [] as $gatewayInput) {
                $label = $gatewayInput->label ?? "";
                $label = $this->paypalPlainText($label);

                if($label == $modify_item) {
                    $app_key = $gatewayInput->value ?? "";
                    $outer_break = true;
                    break;
                }
            }
        }


        $secrete_key = '';
        $outer_break = false;
        foreach($secret_key_sample as $item) {
            if($outer_break == true) {
                break;
            }
            $modify_item = $this->paypalPlainText($item);
            foreach($gateway->credentials ?? [] as $gatewayInput) {
                $label = $gatewayInput->label ?? "";
                $label = $this->paypalPlainText($label);

                if($label == $modify_item) {
                    $secrete_key = $gatewayInput->value ?? "";
                    $outer_break = true;
                    break;
                }
            }
        }

        return (object) [
            'username'    => $username,
            'password'    => $password,
            'app_key'     => $app_key,
            'secrete_key' => $secrete_key,
        ];

    }

    public function paypalPlainText($string) {
        $string = Str::lower($string);
        return preg_replace("/[^A-Za-z0-9]/","",$string);
    }

    public function getToken()
    {
        $gateway = PaymentGateway::where('alias', 'bkash')->first();

        $credential = $this->getBkashCredentials($gateway);

        $header = array(
            'Content-Type:application/json',
            'username:' . $credential->username,
            'password:' . $credential->password
        );

        $body_data = array('app_key' => $credential->app_key, 'app_secret' => $credential->secrete_key);
        $body_data_json = json_encode($body_data);

        $url = 'https://checkout.sandbox.bka.sh/v1.2.0-beta/checkout/token/grant';

        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $body_data_json);
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($curl, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);
        $response = curl_exec($curl);
        curl_close($curl);
        $response = json_decode($response);
        if (!$response) {
            return false;
        }
        $token = $response->id_token;

        $log_data = ["url" => $url, "header" => $header, "body" => $body_data, "api response" => $response];
        Log::channel('bkash')->info($log_data);

        return $token;
    }

    public function authHeaders()
    {
        $gateway = PaymentGateway::where('alias', 'bkash')->first();
        $credential = $this->getBkashCredentials($gateway);

        return array(
            'Content-Type:application/json',
            'Authorization:' . $this->getToken(),
            'X-APP-Key:' . $credential->app_key
        );
    }

    public function curlWithBody($url, $header, $method, $body_data_json)
    {
        $curl = curl_init($this->base_url . $url);
        curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $body_data_json);
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($curl, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);
        $response = curl_exec($curl);
        curl_close($curl);
        return $response;
    }

    public function curlWithoutBody(
        $url,
        $header,
        $method
    ) {
        $curl = curl_init($this->base_url . $url);
        curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
        $response = curl_exec($curl);
        curl_close($curl);
        return $response;
    }

    public function storeLog(
        $url,
        $header,
        $body_data,
        $response
    ) {
        $log_data = ["url" => $this->base_url . $url, "header" => $header, "body" => $body_data, "api response" => json_decode($response)];
        return Log::channel('bkash')->info($log_data);
    }

    public function bkashCreate(Request $request)
    {
        $header = $this->authHeaders();

        $body_data = array(
            'amount' => 500,
            'currency' => 'BDT',
            'intent' => 'sale',
            'merchantInvoiceNumber' => "Inv-8000000000"
        );
        $body_data_json = json_encode($body_data);

        $response = $this->curlWithBody('/checkout/payment/create', $header, 'POST', $body_data_json);

        Session::put('paymentID', json_decode($response)->paymentID);

        $this->storeLog('/checkout/payment/create', $header, $body_data, $response);

        return response()->json($response);
    }


}
