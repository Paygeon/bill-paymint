import 'package:google_fonts/google_fonts.dart';
import 'package:flip_card/flip_card.dart';
import '../../utils/basic_screen_import.dart';
import 'dart:io' show Platform;

class CardWidget extends StatelessWidget {
  final String cardNumber, expiryDate, balance, validAt, cvv, logo;
  final String? availableBalance;
  final bool isNetworkImage;
  CardWidget({
    super.key,
    required this.cardNumber,
    this.availableBalance,
    required this.expiryDate,
    required this.balance,
    required this.validAt,
    required this.cvv,
    required this.logo,
    this.isNetworkImage = true,
  });

  @override
  Widget build(BuildContext context) {
    return FlipCard(
      fill: Fill.fillFront,
      direction: FlipDirection.HORIZONTAL,
      front: Container(
        height: MediaQuery.of(context).size.height * 0.22,
        padding: EdgeInsets.symmetric(
          horizontal: Dimensions.paddingSize,
          vertical: Dimensions.paddingSize * 0.2,
        ),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(Dimensions.radius * 1.3),
          image: DecorationImage(
              image: AssetImage(Assets.card.cards.path),
              scale: Platform.isAndroid ? 3 : 3),
        ),
        child: Column(
          crossAxisAlignment: crossStart,
          children: [
            Container(
                margin: EdgeInsets.only(
                  top: Dimensions.heightSize * 1.3,
                  bottom: Dimensions.heightSize * 1.3,
                ),
                alignment: Alignment.topRight,
                child: Column(
                  children: [
                    Visibility(
                      visible: isNetworkImage,
                      child: Image.network(
                        logo,
                        color: CustomColor.whiteColor,
                        height: Dimensions.heightSize * 1.5,
                      ),
                    ),
                    Visibility(
                      visible: !isNetworkImage,
                      child: Image.asset(
                        logo,
                        color: CustomColor.whiteColor,
                        height: Dimensions.heightSize * 1.5,
                      ),
                    ),
                  ],
                )),
            CustomTitleHeadingWidget(
              padding: EdgeInsets.only(
                  left: Dimensions.paddingSize * 2,
                  top: Dimensions.paddingSize * 0.5),
              text: cardNumber,
              textOverflow: TextOverflow.ellipsis,
              maxLines: 1,
              style: GoogleFonts.outfit(
                fontSize: Dimensions.headingTextSize3 * 1,
                fontWeight: FontWeight.w800,
                color: CustomColor.whiteColor,
              ),
            ),
            verticalSpace(Dimensions.heightSize * 2),
            Row(
              mainAxisAlignment: mainSpaceBet,
              children: [
                Column(
                  crossAxisAlignment: crossStart,
                  children: [
                    TitleHeading2Widget(
                      text: expiryDate,
                      fontSize: Dimensions.headingTextSize4,
                      color: CustomColor.whiteColor,
                    ),
                    TitleHeading4Widget(
                      color: CustomColor.whiteColor.withOpacity(0.6),
                      fontWeight: FontWeight.w500,
                      fontSize: Dimensions.headingTextSize5,
                      text: Strings.expiryDate,
                    ),
                  ],
                ),
                Column(
                  crossAxisAlignment: crossEnd,
                  children: [
                    TitleHeading2Widget(
                      text: balance,
                      fontSize: Dimensions.headingTextSize4,
                      color: CustomColor.whiteColor,
                    ),
                    TitleHeading4Widget(
                      color: CustomColor.whiteColor.withOpacity(0.6),
                      fontWeight: FontWeight.w500,
                      fontSize: Dimensions.headingTextSize5,
                      text: availableBalance ?? Strings.availabeBlance,
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),
      ),
      back: Container(
        height: MediaQuery.of(context).size.height * 0.22,
        width: MediaQuery.of(context).size.width,
        padding: EdgeInsets.symmetric(
          horizontal: Dimensions.paddingSize,
          vertical: Dimensions.paddingSize * 0.2,
        ),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(Dimensions.radius * 1.3),
          image: DecorationImage(
            image: AssetImage(Assets.card.back.path),
          ),
        ),
        child: Column(
          crossAxisAlignment: crossEnd,
          children: [
            verticalSpace(Dimensions.heightSize * 1.3),
            CustomTitleHeadingWidget(
              padding: EdgeInsets.only(left: Dimensions.paddingSize * 2),
              text: "Valid: ${validAt}",
              textOverflow: TextOverflow.ellipsis,
              maxLines: 1,
              style: GoogleFonts.outfit(
                fontSize: Dimensions.headingTextSize2 * 0.5,
                fontWeight: FontWeight.w500,
                color: CustomColor.whiteColor.withOpacity(0.6),
              ),
            ),
            Container(
              height: Dimensions.heightSize * 1.2,
              width: Dimensions.widthSize * 3.1,
              margin: EdgeInsets.only(
                right: Dimensions.marginSizeHorizontal * 0.3,
                top: Dimensions.marginSizeVertical * 0.4,
              ),
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color: CustomColor.primaryLightTextColor.withOpacity(0.2),
                borderRadius: BorderRadius.circular(
                  Dimensions.radius * 0.3,
                ),
              ),
              child: TitleHeading4Widget(
                text: cvv,
                fontSize: 10,
                fontWeight: FontWeight.w600,
                color: CustomColor.whiteColor.withOpacity(0.4),
              ),
            ),
            verticalSpace(Dimensions.heightSize * 2),
          ],
        ),
      ),
    );
  }
}
