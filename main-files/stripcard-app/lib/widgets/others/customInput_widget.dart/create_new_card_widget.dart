import 'dart:io';
import 'package:flutter/services.dart';
import 'package:stripecard/utils/basic_screen_import.dart';
import '../../../backend/local_storage.dart';
import '../../../backend/utils/custom_snackbar.dart';
import '../../../controller/navbar/create_newcard_controller.dart';
import '../../../views/others/custom_image_widget.dart';

class CustomCreateAmountWidget extends StatelessWidget {
  final createCardKey = GlobalKey<FormState>();

  CustomCreateAmountWidget({
    Key? key,
    required this.buttonText,
  }) : super(key: key);
  final String buttonText;
  final controller = Get.put(CreateCardController());

  @override
  Widget build(BuildContext context) {
    return _bodyWidget(context);
  }

  _bodyWidget(BuildContext context) {
    return Form(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          _inputFieldWidget(context),
          _customNumKeyBoardWidget(context),
          _buttonWidget(context)
        ],
      ),
    );
  }

  _inputFieldWidget(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(
        right: Dimensions.marginSizeHorizontal * 0.5,
        top: Dimensions.marginSizeVertical * 2,
      ),
      alignment: Alignment.topCenter,
      height: Dimensions.inputBoxHeight,
      width: double.infinity,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          SizedBox(
            width: MediaQuery.of(context).size.width * 0.45,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                SizedBox(width: Dimensions.widthSize * 0.7),
                Expanded(
                  child: TextFormField(
                    style: Get.isDarkMode
                        ? CustomStyle.lightHeading2TextStyle.copyWith(
                            fontSize: Dimensions.headingTextSize3 * 2,
                            color: CustomColor.primaryLightTextColor,
                            
                          )
                        : CustomStyle.darkHeading2TextStyle.copyWith(
                            color: CustomColor.primaryLightTextColor,
                            fontSize: Dimensions.headingTextSize3 * 2,
                          ),
                    readOnly: true,
                    controller: controller.amountTextController,
                    keyboardType:
                        const TextInputType.numberWithOptions(decimal: true),
                    inputFormatters: <TextInputFormatter>[
                      FilteringTextInputFormatter.allow(
                          RegExp(r'(^-?\d*\.?\d*)')),
                      LengthLimitingTextInputFormatter(
                        6,
                      ), //max length of 12 characters
                    ],
                    validator: (String? value) {
                      if (value!.isEmpty) {
                        return Strings.pleaseFillOutTheField;
                      } else {
                        return null;
                      }
                    },
                    // maxLength: 8,
                    decoration:  InputDecoration(
                      enabledBorder: InputBorder.none,
                      focusedBorder: InputBorder.none,
                      errorBorder: InputBorder.none,
                      focusedErrorBorder: InputBorder.none,
                      contentPadding: EdgeInsets.zero,
                      hintText: '0.0',
                      hintStyle: TextStyle(
                          fontSize: Dimensions.headingTextSize3 * 2,
                          color: CustomColor.primaryLightTextColor,
                        ),
                      )
                    ),
                  ),
                
                SizedBox(
                  width: Dimensions.widthSize * 0.5,
                ),
              ],
            ),
          ),
          SizedBox(width: Dimensions.widthSize * 0.7),
          _currencyDropDownWidget(context),
        ],
      ),
    );
  }

  _customNumKeyBoardWidget(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(top: Dimensions.marginSizeVertical * 6),
      child: GridView.count(
        physics: const NeverScrollableScrollPhysics(),
        crossAxisCount: 3,
        crossAxisSpacing: 10.0,
        mainAxisSpacing: 10.0,
        childAspectRatio: 3 / 1.7,
        shrinkWrap: true,
        children: List.generate(
          controller.keyboardItemList.length,
          (index) {
            return controller.inputItem(index);
          },
        ),
      ),
    );
  }

  _buttonWidget(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(
        left: Dimensions.marginSizeHorizontal * 0.8,
        right: Dimensions.marginSizeHorizontal * 0.8,
        top: Platform.isAndroid ? Dimensions.marginSizeVertical * 1.8 : 0.0,
      ),
      child: Row(
        children: [
          Expanded(
            child: PrimaryButton(
              title: buttonText,
              onPressed: () {
                if (controller.amountTextController.text.isNotEmpty) {
                  controller.goToCreateNewCardPreviewScreen();
                } else {
                  CustomSnackBar.error(Strings.plzEnterAmount);
                }
              },
              borderColor: Theme.of(context).primaryColor,
              buttonColor: CustomColor.primaryLightColor,
            ),
          ),
        ],
      ),
    );
  }

  _currencyDropDownWidget(BuildContext context) {
    return Container(
      width: MediaQuery.of(context).size.width * 0.25,
      height: Dimensions.buttonHeight * 0.65,
      alignment: Alignment.center,
      margin: EdgeInsets.symmetric(
          horizontal: Dimensions.marginSizeHorizontal * 0.1,
          vertical: Dimensions.marginSizeVertical * 0.2),
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(Dimensions.radius * 3),
          color: CustomColor.primaryBGLightColor),
      child: Row(children: [
        SizedBox(
          width: Dimensions.widthSize,
        ),
        ClipRRect(
          borderRadius: BorderRadius.circular(Dimensions.radius * 1.2),
          child: CustomImageWidget(
            path: Assets.qr.usa.path,
            height: Dimensions.heightSize * 2.3,
            width: Dimensions.widthSize * 2.3,
            color: Colors.blue,
          ),
        ),
        horizontalSpace(Dimensions.widthSize),
        TitleHeading3Widget(
          text: LocalStorage.getBaseCurrency() ?? 'USD',
          color: CustomColor.whiteColor,
          fontWeight: FontWeight.w500,
        ),
      ]),
    );
  }
}
