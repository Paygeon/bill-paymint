import 'package:flip_card/flip_card_controller.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../../backend/model/add_money/add_money_info_model.dart';
import '../../../backend/model/add_money/automatic_paypal_getway.dart';
import '../../../backend/model/add_money/automatic_stripe_getway_model.dart';
import '../../../backend/model/common/common_success_model.dart';
import '../../../backend/services/api_services.dart';
import '../../../language/strings.dart';
import '../../../routes/routes.dart';
import '../../../widgets/others/congratulation_widget.dart';
import 'manual_gateway_controller.dart';

class DepositController extends GetxController {
  final amountController = TextEditingController();
  final depositMethod = TextEditingController();

  final cardNumberController = TextEditingController();
  final cardExpiryController = TextEditingController();
  final cardCVCController = TextEditingController();

  final cardHolderNameController = TextEditingController();
  final cardExpiryDateController = TextEditingController();
  final cardCvvController = TextEditingController();

  final flipCardController = FlipCardController();
  RxDouble amount = 0.0.obs;
  RxString baseCurrency = "".obs;
  RxInt baseCurrencyRate = 1.obs;
  RxString selectedCurrencyAlias = "".obs;
  RxString selectedCurrencyName = "Select Method".obs;
  RxString selectedCurrencyType = "".obs;
  RxString selectedGatewaySlug = "".obs;
  RxString gatewayTrx = "".obs;
  RxInt selectedCurrencyId = 0.obs;
  RxDouble fee = 0.0.obs;
  RxDouble limitMin = 0.0.obs;
  RxDouble limitMax = 0.0.obs;

  RxDouble percentCharge = 0.0.obs;
  RxDouble rate = 0.0.obs;
  RxString code = "".obs;
  List<int> indexList = [];
  List<Currency> currencyList = [];

  final manualPaymentController = Get.put(ManualPaymentController());
  @override
  void onInit() {
    getAddMoneyInfo();
    super.onInit();
  }

  late AddMoneyInfoModel _addMoneyInfoModel;
  AddMoneyInfoModel get addMoneyInfoModel => _addMoneyInfoModel;

  final _isLoading = false.obs;
  bool get isLoading => _isLoading.value;
  final _isPaypalLoading = false.obs;
  bool get isPaypalLoading => _isPaypalLoading.value;
  final _isStripeLoading = false.obs;
  bool get isStripeLoading => _isStripeLoading.value;

  Future<AddMoneyInfoModel> getAddMoneyInfo() async {
    _isLoading.value = true;
    update();

    await ApiServices.addMoneyInfoApi().then((value) {
      _addMoneyInfoModel = value!;

      _addMoneyInfoModel.data.gateways.forEach((gateways) {
        gateways.currencies.forEach((currency) {
          currencyList.add(
            Currency(
              id: currency.id,
              paymentGatewayId: currency.paymentGatewayId,
              name: currency.name,
              alias: currency.alias,
              currencyCode: currency.currencyCode,
              currencySymbol: currency.currencySymbol,
              minLimit: currency.minLimit,
              maxLimit: currency.maxLimit,
              percentCharge: currency.percentCharge,
              fixedCharge: currency.fixedCharge,
              rate: currency.rate,
              createdAt: currency.createdAt,
              updatedAt: currency.updatedAt,
              type: currency.type,
               image: currency.image,
            ),
          );
        });
      });
      Currency currency =
          _addMoneyInfoModel.data.gateways.first.currencies.first;
      Gateway gateway = _addMoneyInfoModel.data.gateways.first;

      selectedCurrencyAlias.value = currency.alias;
      selectedCurrencyType.value = currency.type.toString();
      selectedGatewaySlug.value = gateway.slug.toString();
      selectedCurrencyId.value = currency.id;
      selectedCurrencyName.value = currency.name;

      fee.value = currency.fixedCharge.toDouble();
      limitMin.value = currency.minLimit.toDouble();
      limitMax.value = currency.maxLimit.toDouble();
      percentCharge.value = currency.percentCharge.toDouble();
      rate.value = currency.rate;
      code.value = currency.currencyCode;

      //Base Currency
      baseCurrency.value = _addMoneyInfoModel.data.baseCurr;
      baseCurrencyRate.value = _addMoneyInfoModel.data.baseCurrRate;

      update();
    }).catchError((onError) {
      log.e(onError);
      _isLoading.value = false;
      update();
    });

    _isLoading.value = false;
    update();
    return _addMoneyInfoModel;
  }

  late AutomaticPaymentPaypalGatewayModel _automaticPaymentPaypalGatewayModel;

  AutomaticPaymentPaypalGatewayModel get automaticPaymentPaypalGatewayModel =>
      _automaticPaymentPaypalGatewayModel;

  Future<AutomaticPaymentPaypalGatewayModel>
      automaticPaymentPaypalGatewaysProcess(inputBody) async {
    _isPaypalLoading.value = true;
    update();
    await ApiServices.automaticPaymentPaypalGatewayApi(body: inputBody)
        .then((value) {
      _automaticPaymentPaypalGatewayModel = value!;
      update();
      Get.toNamed(Routes.webPaymentScreen);
    }).catchError((onError) {
      log.e(onError);
      _isPaypalLoading.value = false;
    });

    _isPaypalLoading.value = false;

    update();
    return _automaticPaymentPaypalGatewayModel;
  }

  // Automatic Payment Stripe Gateway Model
  late AutomaticPaymentStripeGatewayModel _automaticPaymentStripeGatewayModel;

  AutomaticPaymentStripeGatewayModel get automaticPaymentStripeGatewayModel =>
      _automaticPaymentStripeGatewayModel;

  Future<AutomaticPaymentStripeGatewayModel>
      automaticPaymentStripeGatewaysProcess(inputBody) async {
    _isStripeLoading.value = true;
    update();

    await ApiServices.automaticPaymentStripeGatewayApi(body: inputBody)
        .then((value) {
      _automaticPaymentStripeGatewayModel = value!;
      gatewayTrx.value =
          _automaticPaymentStripeGatewayModel.data.paymentInformations.trx;
      update();

      Get.toNamed(Routes.stripeAnimatedScreen);
    }).catchError((onError) {
      log.e(onError);
      _isStripeLoading.value = false;
    });

    _isStripeLoading.value = false;

    update();
    return _automaticPaymentStripeGatewayModel;
  }

  late CommonSuccessModel _stripePaymentPaypalGatewayModel;

  CommonSuccessModel get stripePaymentPaypalGatewayModel =>
      _stripePaymentPaypalGatewayModel;
  // Stripe Payment Gateway process function
  Future<CommonSuccessModel> stripePaymentGatewaysProcess(context) async {
    _isLoading.value = true;
    update();
    Map<String, dynamic> inputBody = {
      'track': gatewayTrx.value,
      'name': cardHolderNameController.text,
      'cardNumber': cardNumberController.text.removeAllWhitespace,
      'cardExpiry':
          "${cardExpiryDateController.text.split('/')[0]}/${cardExpiryDateController.text.split('/')[1]}",
      'cardCVC': cardCvvController.text,
    };

    await ApiServices.stripeConfirmApi(body: inputBody).then((value) {
      _stripePaymentPaypalGatewayModel = value!;
      _goToSuccessScreen(context);
      update();
    }).catchError((onError) {
      log.e(onError);
      _isLoading.value = false;
    });

    _isLoading.value = false;

    update();
    return _stripePaymentPaypalGatewayModel;
  }

  void _goToSuccessScreen(context) {
    StatusScreen.show(
        context: context,
        subTitle: Strings.yourMoneyAddedSucces.tr,
        onPressed: () {
          Get.offAllNamed(Routes.bottomNavBarScreen);
        });
  }

  paymentProceed() {
    Map<String, dynamic> inputBody = {
      'amount': double.parse(amountController.text),
      'currency': selectedCurrencyAlias.value,
    };
    switch (selectedCurrencyType.value) {
      case "Type.AUTOMATIC":
        {
          if (selectedCurrencyAlias.contains('stripe')) {
            automaticPaymentStripeGatewaysProcess(inputBody);
          } else {
            automaticPaymentPaypalGatewaysProcess(inputBody);
            print('paypal');
          }
        }
        break;
      case "Type.MANUAL":
        {
          manualPaymentController.manualPaymentGatewaysProcess(inputBody);
        }
        break;
    }
  }
}
