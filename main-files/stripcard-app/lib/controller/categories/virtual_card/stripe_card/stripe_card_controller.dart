import '../../../../backend/model/common/common_success_model.dart';
import '../../../../backend/model/virtual_card/stripe_models/stripe_card_info_model.dart';
import '../../../../backend/services/api_services.dart';
import '../../../../utils/basic_screen_import.dart';
import '../../../../widgets/others/congratulation_widget.dart';
import '../../../navbar/dashboard_controller.dart';

class StripeCardController extends GetxController {
  final dashbaordController = Get.put(DashBoardController());
  RxString cardId = "".obs;
  RxInt activeIndicatorIndex = 0.obs;

  @override
  void onInit() {
    getStripeCardData();

    super.onInit();
  }

  changeIndicator(int value) {
    activeIndicatorIndex.value = value;
  }

  final _isLoading = false.obs;
  bool get isLoading => _isLoading.value;

  late StripeCardInfoModel _stripeCardModel;
  StripeCardInfoModel get stripeCardModel => _stripeCardModel;

  Future<StripeCardInfoModel> getStripeCardData() async {
    _isLoading.value = true;
    update();

    await ApiServices.stripeCardInfoApi().then((value) {
      _stripeCardModel = value!;
      cardId.value = _stripeCardModel.data.myCard.first.cardId;

      update();
    }).catchError((onError) {
      log.e(onError);
    });

    _isLoading.value = false;
    update();
    return _stripeCardModel;
  }

  ///  >>>>>> Start buyCard process
  final _isBuyCardLoading = false.obs;
  bool get isBuyCardLoading => _isBuyCardLoading.value;
  late CommonSuccessModel _buyCardModel;
  CommonSuccessModel get buyCardModel => _buyCardModel;

  Future<CommonSuccessModel> buyCardProcess(context) async {
    _isBuyCardLoading.value = true;
    update();
    Map<String, dynamic> inputBody = {};
    await ApiServices.stripeBuyCardApi(body: inputBody).then((value) {
      _buyCardModel = value!;
      update();

      StatusScreen.show(
        context: context,
        subTitle: Strings.yourCardSuccess.tr,
        onPressed: () {
          Get.offAllNamed(Routes.bottomNavBarScreen);
        },
      );
      update();
    }).catchError((onError) {
      log.e(onError);
      update();
    });

    _isBuyCardLoading.value = false;
    update();
    return _buyCardModel;
  }
}
