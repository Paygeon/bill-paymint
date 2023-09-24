
import '../../../../backend/utils/custom_loading_api.dart';
import '../../../../controller/categories/virtual_card/stripe_card/stripe_card_controller.dart';
import '../../../../utils/basic_screen_import.dart';
import '../../../../widgets/appbar/appbar_widget.dart';

class StripeCreateCardScreen extends StatelessWidget {
  StripeCreateCardScreen({super.key});
  final controller = Get.put(StripeCardController());
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBarWidget(text: Strings.createANewCard),
      body: _bodyWidget(context),
    );
  }

  _bodyWidget(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: Dimensions.paddingSize * 0.7),
      child: Column(
        mainAxisSize: mainMin,
        children: [
          _titleSubTile(context),
          _buttonWidget(context),
        ],
      ),
    );
  }

  _titleSubTile(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(
        vertical: Dimensions.paddingSize * 0.3,
      ),
      padding: EdgeInsets.all(Dimensions.paddingSize * 0.6),
      width: double.infinity,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(Dimensions.radius * 0.5),
        color: CustomColor.primaryLightScaffoldBackgroundColor,
        border: Border.all(
            width: Dimensions.widthSize * 0.2, color: CustomColor.primaryLightColor),
      ),
      child: Column(
        crossAxisAlignment: crossStart,
        children: [
          TitleHeading1Widget(text: Strings.virtual,
          
          ),
          TitleHeading4Widget(text: Strings.youCanUseVirtualCardInstantly,
          color: CustomColor.whiteColor.withOpacity(0.6),
          )
        ],
      ),
    );
  }

  _buttonWidget(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(vertical: Dimensions.paddingSize),
      child: Obx(
        () => controller.isBuyCardLoading
            ? CustomLoadingAPI(
                color: CustomColor.primaryLightColor,
              )
            : PrimaryButton(
                title: Strings.confirm,
                onPressed: () {
                  controller.buyCardProcess(context);
                },
                borderColor: CustomColor.primaryLightColor,
                buttonColor: CustomColor.primaryLightColor,
              ),
      ),
    );
  }
}
