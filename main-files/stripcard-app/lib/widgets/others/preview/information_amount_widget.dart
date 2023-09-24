
import 'package:stripecard/widgets/text_labels/title_heading4_widget.dart';
import 'package:flutter/material.dart';
import '../../../utils/custom_color.dart';
import '../../../utils/dimensions.dart';
import '../../../utils/size.dart';
import '../../text_labels/title_heading3_widget.dart';

extension AmountInformation on Widget {
  Widget amountInformationWidget({
    required information,
    required enterAmount,
    required enterAmountRow,
    required fee,
    required feeRow,
    required exChange,
    required exChangeRow,
    received,
    receivedRow,
    total,
    totalRow,
  }) {
    return Container(
      margin: EdgeInsets.only(top: Dimensions.heightSize * 0.4),
      decoration: BoxDecoration(
          color: CustomColor.primaryLightColor,
          borderRadius: BorderRadius.circular(Dimensions.radius * 1.5)),
      child: Column(
        crossAxisAlignment: crossStart,
        children: [
          Padding(
            padding: EdgeInsets.only(
              top: Dimensions.paddingSize * 0.7,
              bottom: Dimensions.paddingSize * 0.3,
              left: Dimensions.paddingSize * 0.7,
              right: Dimensions.paddingSize * 0.7,
            ),
            child: TitleHeading3Widget(
                text: information,
                textAlign: TextAlign.left,
                ),
          ),
          Divider(
            thickness: 1,
            color: CustomColor.primaryLightScaffoldBackgroundColor,
          ),
          Padding(
            padding: EdgeInsets.only(
              top: Dimensions.paddingSize * 0.3,
              bottom: Dimensions.paddingSize * 0.6,
              left: Dimensions.paddingSize * 0.7,
              right: Dimensions.paddingSize * 0.7,
            ),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: mainSpaceBet,
                  children: [
                    TitleHeading4Widget(
                      text: enterAmount,
                      color: CustomColor.primaryLightTextColor.withOpacity(
                        0.4,
                      ),
                    ),
                    TitleHeading3Widget(
                      text: enterAmountRow,
                      color: CustomColor.primaryLightTextColor.withOpacity(
                        0.6,
                      ),
                      fontWeight: FontWeight.w600,
                    ),
                  ],
                ),
                verticalSpace(Dimensions.heightSize * 0.7),
                  Row(
                  mainAxisAlignment: mainSpaceBet,
                  children: [
                    TitleHeading4Widget(
                      text: exChange,
                      color: CustomColor.primaryLightTextColor.withOpacity(
                        0.4,
                      ),
                    ),
                    TitleHeading3Widget(
                      text: exChangeRow,
                      color: CustomColor.primaryLightTextColor.withOpacity(
                        0.6,
                      ),
                      fontWeight: FontWeight.w600,
                    ),
                  ],
                ),
                verticalSpace(Dimensions.heightSize * 0.7),
                Row(
                  mainAxisAlignment: mainSpaceBet,
                  children: [
                    TitleHeading4Widget(
                      text: fee,
                      color: CustomColor.primaryLightTextColor.withOpacity(
                        0.4,
                      ),
                    ),
                    TitleHeading3Widget(
                      text: feeRow,
                      color: CustomColor.primaryLightTextColor.withOpacity(
                        0.6,
                      ),
                      fontWeight: FontWeight.w600,
                    ),
                  ],
                ),
                verticalSpace(Dimensions.heightSize * 0.7),
                Row(
                  mainAxisAlignment: mainSpaceBet,
                  children: [
                    TitleHeading4Widget(
                      text: received,
                      color: CustomColor.primaryLightTextColor.withOpacity(
                        0.4,
                      ),
                    ),
                    TitleHeading3Widget(
                      text: receivedRow,
                      color: CustomColor.primaryLightTextColor.withOpacity(
                        0.6,
                      ),
                      fontWeight: FontWeight.w600,
                    ),
                  ],
                ),
                verticalSpace(Dimensions.heightSize * 0.7),
                Row(
                  mainAxisAlignment: mainSpaceBet,
                  children: [
                    TitleHeading4Widget(
                      text: total,
                      color: CustomColor.primaryLightTextColor.withOpacity(
                        0.4,
                      ),
                    ),
                    TitleHeading3Widget(
                      text: totalRow,
                      color: CustomColor.primaryLightTextColor.withOpacity(
                        0.6,
                      ),
                      fontWeight: FontWeight.w600,
                    ),
                  ],
                ),
              ],
            ),
          )
        ],
      ),
    );
  }
}
