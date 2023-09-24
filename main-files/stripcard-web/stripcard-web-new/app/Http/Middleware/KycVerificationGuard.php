<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Constants\GlobalConst;
use App\Providers\Admin\BasicSettingsProvider;

class KycVerificationGuard
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $basic_settings = BasicSettingsProvider::get();
        if($basic_settings->kyc_verification) {
            $user = auth()->user();
            if($user->kyc_verified != GlobalConst::APPROVED) {
                $smg = "Please verify your KYC information before any transactional action";
                if($user->kyc_verified == GlobalConst::PENDING) {
                    $smg = "Your KYC information is pending. Please wait for admin confirmation.";
                }
                if(auth()->guard("web")->check()) {
                    return redirect()->route("user.authorize.kyc")->with(['warning' => [$smg]]);
                }
            }
        }
        return $next($request);
    }
}
