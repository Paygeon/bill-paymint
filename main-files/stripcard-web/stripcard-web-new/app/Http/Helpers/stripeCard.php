<?php


use App\Models\VirtualCardApi;
use Illuminate\Support\Collection;


function createCardHolders($user){
    $client_ip = request()->ip() ?? false;
    $method = VirtualCardApi::first();
    $apiKey = $method->config->stripe_secret_key;
    $countries = get_all_countries();
    $currency = get_default_currency_code();
    $country = Collection::make($countries)->first(function ($item) use ($currency) {
        return $item->currency_code === $currency;
    });
    $data = [
        'name' => $user->fullname,
        'email' => $user->email,
        'phone_number' =>  $user->full_mobile,
        'status' => 'active',
        'type' => 'individual',
        'individual' => [
            'card_issuing' => [
                'user_terms_acceptance' => [
                    'date' => time(),
                    'ip' => $client_ip,
                    'user_agent' => $_SERVER['HTTP_USER_AGENT'],
                ],
            ],
            'first_name' => $user->firstname,
            'last_name' => $user->lastname,
            'dob' => ['day' => 1, 'month' => 11, 'year' => 1981],
        ],
        'billing' => [
            'address' => [
                'line1' =>$user->address->address == ''?"123 Main Street": $user->address->address,
                'city' => $user->address->city == ''?"San Francisco":$user->address->city,
                'state' => $user->address->state==''?"CA":$user->address->state,
                'postal_code' => $user->address->zip==''?"94111":$user->address->zip,
                'country' => $country->iso2??"US",
            ],
        ],
        'metadata' => [
            'terms_and_privacy_agreement' => true,
            'celtic_bank_authorized_user_terms' => true,
        ],
    ];

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $method->config->stripe_url.'/issuing/cardholders');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $apiKey,
        'Content-Type: application/x-www-form-urlencoded',
    ]);

    $response = curl_exec($ch);
    curl_close($ch);

    $result = json_decode($response,true);

    if(isset($result['error'])){
        $data = [
            'status'  => false,
            'message'  => $result['error']['message']??"Somethings Is Wrong!",
            'data'  => [],
        ];
    }else{
        $data = [
            'status'  => true,
            'message'  => "Card Holders Created Successfully",
            'data'  => $result,
        ];
    }
    return $data;
}
function createVirtualCard($card_holder_id){
    $method = VirtualCardApi::first();
    $secretKey = $method->config->stripe_secret_key;
    $cardholderId = $card_holder_id;

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $method->config->stripe_url.'/issuing/cards');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
        'cardholder' => $cardholderId,
        'currency' => 'usd',
        'type' => 'virtual',
        'metadata' => [
            'terms_and_privacy_agreement' => true,
            'celtic_bank_authorized_user_terms' => true,
        ],
        'status' => 'active',

    ]));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $secretKey,
    ]);

    $response = curl_exec($ch);
    curl_close($ch);
    $result = json_decode($response,true);

    if(isset($result['error'])){
        $data = [
            'status'  => false,
            'message'  => $result['error']['message']??"Somethings Is Wrong!",
            'data'  => [],
        ];
    }else{
        $data = [
            'status'  => true,
            'message'  => "Card Created Successfully",
            'data'  => $result,
        ];
    }
  return $data;

}
function cardActiveInactive($card_holder_id,$status){
    $method = VirtualCardApi::first();
    $secretKey = $method->config->stripe_secret_key;
    $cardholderId = $card_holder_id;
    $cardId = $cardholderId;
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $method->config->stripe_url.'/issuing/cards/' . $cardId);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
        'status' => $status,
    ]));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $secretKey,
    ]);
    $response = curl_exec($ch);
    curl_close($ch);
    $result = json_decode($response,true);

    if(isset($result['error'])){
        $data = [
            'status'  => false,
            'message'  => $result['error']['message']??"Somethings Is Wrong!",
            'data'  => [],
        ];
    }else{
        $data = [
            'status'  => true,
            'message'  => "Card Updated Successfully",
            'data'  => $result,
        ];
    }
  return $data;
}
function getSensitiveData($cardId){
    $method = VirtualCardApi::first();
    $apiKey = $method->config->stripe_secret_key;
    $cardId = $cardId;
    try{
        $stripe = new \Stripe\StripeClient($apiKey);
        $result = $stripe->issuing->cards->retrieve(
            $cardId,
            ['expand' => ['number', 'cvc']]
        );
        $data =[
            'status'        =>true,
            'message'       =>"Got Sensitive Data Successfully",
            'number'        =>$result->number,
            'cvc'           =>$result->cvc,
        ];
    }catch(Exception $e){
        $data =[
            'status'        =>false,
            'message'       =>"Something Is Wrong, please Contact With Owner",
            'number'        => "",
            'cvc'           =>"",
        ];
    }
    return $data;

}
function getIssueBalance(){
    $method = VirtualCardApi::first();
    $apiKey = $method->config->stripe_secret_key;

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $method->config->stripe_url.'/balance');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $apiKey,
    ]);

    $response = curl_exec($ch);
    curl_close($ch);

    $result = json_decode($response,true);
    if(isset($result['error'])){
        $data = [
            'status'  => false,
            'message'  => "Something Is Wrong,Please Contact With Owner!",
            'amount'  => 0.0,
        ];
    }else{
        $data = [
            'status'  => true,
            'message'  => "SuccessFully Fetch Issuing Balance",
            'amount'  => $result['issuing']['available'][0]['amount']/100,
        ];
    }
    return $data;

}
function getStripeCardTransactions($cardId){
    $method = VirtualCardApi::first();
    $apiKey = $method->config->stripe_secret_key;
    $stripe = new \Stripe\StripeClient($apiKey);
    $cardId = $cardId;
    try{
        $transactions = $stripe->issuing->transactions->all([
            'card' => $cardId,
        ]);
        $data =[
            'status'        =>true,
            'data'          =>$transactions['data']
        ];
    }catch(Exception $e){
        $data =[
            'status'        =>false,
            'data'          => []
        ];
    }
    return $data;

}

