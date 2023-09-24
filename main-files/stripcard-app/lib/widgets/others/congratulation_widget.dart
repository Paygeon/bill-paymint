import 'package:stripecard/utils/basic_screen_import.dart';
import '../../views/others/custom_image_widget.dart';
import '../text_labels/title_subtitle_widget.dart';

class StatusScreen {
  static show(
      {required BuildContext context,
      required String subTitle,
      required VoidCallback onPressed,
      bool ifSuccess = true}) {
    var widget = WillPopScope(
      onWillPop: () async {
        onPressed;
        return true;
      },
      child: Scaffold(
        backgroundColor: CustomColor.primaryLightScaffoldBackgroundColor,
        body: Padding(
          padding:
              EdgeInsets.symmetric(horizontal: Dimensions.marginSizeHorizontal),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              CustomImageWidget(
                path: ifSuccess
                    ? Assets.clipart.confirmation
                    : Assets.clipart.confirmation,
                height: Dimensions.iconSizeLarge * 6,
                width: Dimensions.iconSizeLarge * 6,
              ),
              verticalSpace(18),
              TitleSubTitleWidget(
                title: ifSuccess ? Strings.congratulations.tr : Strings.opps.tr,
                subtitle: subTitle,
                crossAxisAlignment: crossCenter,
              ),
              verticalSpace(32),
              PrimaryButton(
                title: Strings.okay.tr,
                onPressed: onPressed,
                borderColor: Theme.of(context).primaryColor,
                buttonColor: CustomColor.primaryBGLightColor,
              )
            ],
          ),
        ),
      ),
    );

    showDialog(
        context: context,
        builder: (context) {
          return widget;
        });
  }
}
