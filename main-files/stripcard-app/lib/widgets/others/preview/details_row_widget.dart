import 'package:flutter/material.dart';

import '../../../utils/custom_color.dart';
import '../../../utils/custom_style.dart';
import '../../../utils/dimensions.dart';
import '../../../utils/size.dart';
import '../../text_labels/custom_title_heading_widget.dart';

class DetailsRowWidget extends StatelessWidget {
  DetailsRowWidget({super.key, required this.variable, required this.value});
  final String variable, value;
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(
        bottom: Dimensions.paddingSize * 0.4,
      ),
      child: Row(
        mainAxisAlignment: mainSpaceBet,
        children: [
          CustomTitleHeadingWidget(
            text: variable,
            style: CustomStyle.darkHeading4TextStyle.copyWith(
              color: CustomColor.primaryLightTextColor.withOpacity(0.4),
            ),
          ),
          CustomTitleHeadingWidget(
            text: value,
            style: CustomStyle.darkHeading4TextStyle.copyWith(
                fontWeight: FontWeight.w600,
                fontSize: Dimensions.headingTextSize3,
                color: CustomColor.primaryLightTextColor.withOpacity(0.6)
                ),
          ),
        ],
      ),
    );
  }
}
