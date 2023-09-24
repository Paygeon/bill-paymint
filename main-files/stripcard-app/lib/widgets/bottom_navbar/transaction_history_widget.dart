import '../../utils/basic_screen_import.dart';

class TransactionWidget extends StatelessWidget {
  const TransactionWidget(
      {super.key,
      required this.amount,
      required this.title,
      required this.dateText,
      required this.transaction,
      required this.monthText});
  final String title, monthText, dateText, amount, transaction;
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(bottom: Dimensions.paddingSize * 0.3),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(Dimensions.radius),
          color: CustomColor.primaryLightColor.withOpacity(0.05),
        ),
        padding: EdgeInsets.only(right: Dimensions.paddingSize * 0.2),
        height: Dimensions.heightSize * 6,
        child: Row(
          children: [
            Expanded(
                flex: 4,
                child: Container(
                  margin: EdgeInsets.only(
                    left: Dimensions.marginSizeVertical * 0.4,
                    top: Dimensions.marginSizeVertical * 0.5,
                    bottom: Dimensions.marginSizeVertical * 0.4,
                    right: Dimensions.marginSizeVertical * 0.2,
                  ),
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    color: CustomColor.primaryLightColor.withOpacity(0.08),
                    borderRadius:
                        BorderRadius.circular(Dimensions.radius * 0.6),
                  ),
                  child: Column(
                    mainAxisAlignment: mainCenter,
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: crossCenter,
                    children: [
                      TitleHeading4Widget(
                        text: dateText,
                        fontSize: Dimensions.headingTextSize3 * 2,
                        fontWeight: FontWeight.w800,
                        color: CustomColor.primaryLightTextColor,
                      ),
                      TitleHeading4Widget(
                        text: monthText,
                        fontSize: Dimensions.headingTextSize6,
                        fontWeight: FontWeight.w500,
                        color: CustomColor.primaryLightTextColor,
                      ),
                    ],
                  ),
                )),
            Expanded(
              flex: 7,
              child: Column(
                crossAxisAlignment: crossStart,
                mainAxisAlignment: mainCenter,
                children: [
                  TitleHeading3Widget(
                    text: title,
                  ),
                  verticalSpace(Dimensions.widthSize * 0.7),
                  CustomTitleHeadingWidget(
                    text: transaction,
                    style: CustomStyle.darkHeading4TextStyle.copyWith(
                        fontSize: Dimensions.headingTextSize5,
                        fontWeight: FontWeight.w400,
                        color: CustomColor.primaryLightTextColor),
                  ),
                ],
              ),
            ),
            Expanded(
              flex: 5,
              child: TitleHeading3Widget(
                text: amount,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
