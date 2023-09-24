// ignore_for_file: unrelated_type_equality_checks

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../backend/model/add_money/add_money_info_model.dart';
import '../../utils/custom_color.dart';
import '../../utils/custom_style.dart';
import '../../utils/dimensions.dart';

class DepositMethodDropDown extends StatelessWidget {
  final RxString selectMethod;
  final List<Currency> itemsList;
  final void Function(Currency?)? onChanged;

  const DepositMethodDropDown({
    required this.itemsList,
    Key? key,
    required this.selectMethod,
    this.onChanged,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Obx(() => Container(
          height: Dimensions.inputBoxHeight * 0.72,
          decoration: BoxDecoration(
            border: Border.all(
              color: CustomColor.primaryBGLightColor,
              width: 2,
            ),
            borderRadius: BorderRadius.circular(Dimensions.radius * 0.5),
          ),
          child: DropdownButtonHideUnderline(
            child: Padding(
              padding: const EdgeInsets.only(left: 5, right: 20),
              child: DropdownButton(
                hint: Padding(
                  padding: EdgeInsets.only(left: Dimensions.paddingSize * 0.7),
                  child: Text(
                    selectMethod.value,
                    style: GoogleFonts.inter(
                      fontSize: Dimensions.headingTextSize4,
                      fontWeight: FontWeight.w600,
                      color: CustomColor.primaryLightTextColor,
                    ),
                  ),
                ),
                icon: Padding(
                  padding: EdgeInsets.only(right: 4),
                  child: Icon(
                    Icons.arrow_drop_down,
                    color: CustomColor.primaryBGLightColor,
                  ),
                ),
                onTap: () {},
                isExpanded: true,
                underline: Container(),
                borderRadius: BorderRadius.circular(Dimensions.radius),
                items: itemsList.map<DropdownMenuItem<Currency>>((value) {
                  return DropdownMenuItem<Currency>(
                    value: value,
                    child: Text(
                      value.name,
                      style: CustomStyle.darkHeading3TextStyle,
                    ),
                  );
                }).toList(),
                onChanged: onChanged,
              ),
            ),
          ),
        ));
  }
}
