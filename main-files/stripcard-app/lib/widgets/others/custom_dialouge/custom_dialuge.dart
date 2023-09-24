
import 'package:stripecard/language/strings.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../../utils/custom_color.dart';
import '../../../utils/dimensions.dart';

class CustomDialog {
  
  static show(
      {required String title,
      required String subtitle,
      required VoidCallback cancelOnTap,
      required VoidCallback confirmOnTap}) {
    return Get.defaultDialog(
        title: title,
        titleStyle: GoogleFonts.inter(
          fontSize: Dimensions.headingTextSize3,
          fontWeight: FontWeight.bold,
          color: CustomColor.secondaryLightColor.withOpacity(0.6),
        ),
        content: Text(
          subtitle,
          textAlign: TextAlign.center,
          style: GoogleFonts.inter(
            fontSize: Dimensions.headingTextSize5 * 1.06,
            fontWeight: FontWeight.w500,
            color: CustomColor.secondaryLightColor.withOpacity(0.6),
          ),
        ),
        confirm: TextButton(
            onPressed: confirmOnTap,
            child: Container(
              padding: EdgeInsets.all(Dimensions.paddingSize * 0.2),
              decoration: BoxDecoration(
                  color: CustomColor.redColor,
                  borderRadius: BorderRadius.circular(5)),
              child: Text(
           Strings.yes,
                style: GoogleFonts.inter(
                  fontSize: Dimensions.headingTextSize4 * 1.06,
                  fontWeight: FontWeight.w500,
                  color: CustomColor.whiteColor,
                ),
              ),
            )),
        cancel: TextButton(
            onPressed: cancelOnTap,
            child: Container(
              padding: EdgeInsets.all(Dimensions.paddingSize * 0.2),
              decoration: BoxDecoration(
                  color: CustomColor.primaryLightColor,
                  borderRadius: BorderRadius.circular(5)),
              child: Text(
              Strings.no,
                style: GoogleFonts.inter(
                  fontSize: Dimensions.headingTextSize4 * 1.06,
                  fontWeight: FontWeight.w500,
                  color: CustomColor.whiteColor,
                ),
              ),
            )),
        radius: 10.0);
  }
}
