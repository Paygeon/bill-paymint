import 'package:stripecard/utils/custom_color.dart';
import 'package:stripecard/utils/dimensions.dart';
import 'package:stripecard/utils/size.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

extension limit on Widget {
  Widget limitWidget({required fee, required limit}) {
    return Container(
      margin: EdgeInsets.symmetric(
        vertical: Dimensions.marginSizeVertical*0.2
      ),
      child: Column(
        crossAxisAlignment: crossStart,
        children: [
          
          Text(
            "Transfer Fee: ${fee} ",
            textAlign: TextAlign.left,
            style: GoogleFonts.inter(
              fontSize: Dimensions.headingTextSize5,
              fontWeight: FontWeight.w500,
              color: CustomColor.primaryLightTextColor,
            ),
          ),verticalSpace(Dimensions.heightSize*0.2),
          Text(
            "Limit: ${limit}",
                        textAlign: TextAlign.left,

            style: GoogleFonts.inter(
              fontSize: Dimensions.headingTextSize5,
              fontWeight: FontWeight.w500,
              color: CustomColor.primaryLightTextColor,
            ),
          ),
        ],
      ),
    );
  }
}

//  limitWidget(fee: Strings.uSD2,limit: Strings.limitusd2)