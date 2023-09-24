@extends('user.layouts.master')

@push('css')


@section('breadcrumb')
    @include('user.components.breadcrumb',['breadcrumbs' => [
        [
            'name'  => __("Dashboard"),
            'url'   => setRoute("user.dashboard"),
        ]
    ], 'active' => __("Manual Payment")])
@endsection

@section('content')

<div class="body-wrapper">
    <div class="deposit-wrapper ptb-50">
        <div class="container">
            <div class="row justify-content-center align-items-center">
                <div class="col-lg-6 col-md-8">
                    <div class="deposit-form">
                        <div class="form-title text-center">
                            <h3 class="title">{{ __($page_title) }}</h3>
                        </div>
                        <div class="row justify-content-center">

                             <div class="col-lg-6 mb-30">

                                <div class="dash-payment-item-wrapper">
                                    <div class="dash-payment-item active">
                                        <div class="dash-payment-body pt-4">
                                            <button type="submit" id="bKash_button" class="btn--base w-100 btn-loading"> {{ __("Confirm Payment") }}
                                                <i class="fa fa-spinner d-none fa-pulse fa-3x fa-fw"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection

@push('script')
    <script src="https://scripts.sandbox.bka.sh/versions/1.2.0-beta/checkout/bKash-checkout-sandbox.js"></script>

    <script>
        $('#bKash_button').click(function(){
            $('#bKash_button .fa-spinner').removeClass('d-none');
            $('#bKash_button .fa-spinner').addClass('active');
        });

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        var price = '{{ $amount }}';
        var paymentID = '';

        bKash.init({
            paymentMode: 'checkout', //fixed value ‘checkout’
            paymentRequest: {
                amount: price, //max two decimal points allowed
                intent: 'sale'
            },
            createRequest: function(request) { //request object is basically the paymentRequest object, automatically pushed by the script in createRequest method
                $.ajax({
                    url: `{{ route('user.add.money.bkash.create') }}`,
                    type: 'POST',
                    data: JSON.stringify(request),
                    contentType: 'application/json',
                    success: function(data) {
                        data = JSON.parse(data);
                        if (data && data.paymentID != null) {
                            $('#bKash_button').siblings('.fa.fa-spinner').addClass('d-none');
                            paymentID = data.paymentID;
                            bKash.create().onSuccess(data); //pass the whole response data in bKash.create().onSucess() method as a parameter
                        } else {
                            $('#bKash_button').removeClass('d-none');
                            $('#bKash_button').siblings('.fa.fa-spinner').removeClass('active');
                            if(data.errorMessage != null) {
                                alert(data.errorMessage);
                            }
                            bKash.create().onError();
                        }
                    },
                    error: function() {
                        $('#bKash_button').removeClass('d-none');
                        $('#bKash_button').siblings('.fa.fa-spinner').removeClass('active');
                        alert("Something Worng! Please try again.");
                        bKash.create().onError();
                    }
                });
            },
            executeRequestOnAuthorization: function() {
                $.ajax({
                    url: `{{ route('user.add.money.bkash.ipn') }}`,
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        "paymentID": paymentID
                    }),
                    success: function(data) {
                        var data = JSON.parse(data);
                        if (data && data.paymentID != null) {
                            window.location.href = '{{ route("user.add.money.index") }}'; // Your redirect route when successful payment
                        } else {
                            $('#bKash_button').removeClass('d-none');
                            $('#bKash_button').siblings('.fa.fa-spinner').removeClass('active');
                            if(data.errorMessage != null) {
                                alert(data.errorMessage);
                            }
                            bKash.execute().onError();
                        }
                    },
                    error: function() {
                        $('#bKash_button').removeClass('d-none');
                        $('#bKash_button').siblings('.fa.fa-spinner').removeClass('active');
                        alert('Something Worng! Please try again.');
                        bKash.execute().onError();
                    }
                });
            },
            onClose: function() {
                window.location.href = '{{ route("user.add.money.bkash.index") }}';
            },
        });

    </script>
@endpush
