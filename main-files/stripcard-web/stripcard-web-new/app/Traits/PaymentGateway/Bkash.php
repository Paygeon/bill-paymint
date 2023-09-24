<?php

namespace App\Traits\PaymentGateway;

use Illuminate\Support\Facades\Session;
use App\Traits\ControlDynamicInputFields;

trait Bkash
{
use ControlDynamicInputFields;
    public function bkashInit($output = null) {
        if(!$output) $output = $this->output;
        $gatewayAlias = $output['gateway']['alias'];
        $identifier = generate_unique_string("transactions","trx_id",16);
        Session::put('identifier',$identifier);
        Session::put('output',$output);

        return redirect()->route('user.add.money.bkash.index');
    }
}
