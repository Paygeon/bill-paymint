import 'package:stripecard/utils/basic_screen_import.dart';

extension PreviewAmount on Widget {
  Widget previewAmount({
    required amount,
  }) {
    return Container(
      padding: EdgeInsets.symmetric(vertical: Dimensions.paddingSize * 1.7),
      decoration: BoxDecoration(
          color: CustomColor.primaryLightColor,
          borderRadius: BorderRadius.circular(Dimensions.radius * 1.5)),
      margin:
          EdgeInsets.symmetric(vertical: Dimensions.marginSizeVertical * 0.2),
      child: Column(
        mainAxisAlignment: mainCenter,
        children: [
          CustomTitleHeadingWidget(
            text: amount,
            textAlign: TextAlign.center,
            style: CustomStyle.darkHeading1TextStyle.copyWith(
              fontSize: Dimensions.headingTextSize4 * 2,
              fontWeight: FontWeight.w800,
              color: CustomColor.primaryLightTextColor,
            ),
          ),
          TitleHeading4Widget(
            text: Strings.enteredAmount,
            textAlign: TextAlign.center,
            color: CustomColor.primaryLightTextColor.withOpacity(0.6),
          ),
        ],
      ),
    );
  }
}
