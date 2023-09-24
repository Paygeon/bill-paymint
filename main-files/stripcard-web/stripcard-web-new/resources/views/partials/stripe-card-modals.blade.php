<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Start Modal
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
<div class="modal fade" id="BuyCardModalStripe" tabindex="-1" aria-labelledby="buycard-modal" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header" id="buycard-modal">
                <h4 class="modal-title">{{__("Add Card")}}</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><i class="las la-times"></i></button>
            </div>
            <div class="modal-body stripe-modal">

                    <form class="card-form row g-4" action="{{ route('user.stripe.virtual.card.create') }}" method="POST">
                        @csrf
                        <div class="modal-checkbox d-flex">
                            <div class="radio-btn">
                                <div class="form-check">
                                    <input class="form-check-input" id="water" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked>
                                 </div>
                            </div>
                            <div class="modal-radio-content ps-2">
                                <h4 class="title">Virtual</h4>
                                <p>You can use virtual cards instantly.</p>
                            </div>
                            </div>
                        <button type="submit" class="btn btn--base w-100 btn-loading buyBtn">{{ __("Confirm") }}</button>
                </form>

            </div>

        </div>
    </div>
</div>
<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    End Modal
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->

@push('script')
    <script>
    var defualCurrency = "{{ get_default_currency_code() }}";
    var defualCurrencyRate = "{{ get_default_currency_rate() }}";
    $('.buyCard-stripe').on('click', function () {
        var modal = $('#BuyCardModalStripe');

        modal.modal('show');
    });
    </script>
@endpush
