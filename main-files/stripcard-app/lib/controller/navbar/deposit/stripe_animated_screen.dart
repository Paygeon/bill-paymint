import 'package:flutter/services.dart';
import 'package:stripecard/controller/navbar/deposit/deposit_controller.dart';
import 'package:flip_card/flip_card.dart';
import 'package:stripecard/utils/basic_widget_import.dart';
import '../../../backend/utils/custom_loading_api.dart';
import '../../../language/strings.dart';
import '../../../widgets/appbar/appbar_widget.dart';
import '../../../widgets/stripe/card_input_formatter.dart';
import '../../../widgets/stripe/card_month_input_formatter.dart';
import '../../../widgets/stripe/master_card.dart';
import '../../../widgets/stripe/my_painter.dart';

class StripeAnimatedScreen extends StatefulWidget {
  const StripeAnimatedScreen({Key? key}) : super(key: key);

  @override
  State<StripeAnimatedScreen> createState() => _StripeAnimatedScreenState();
}

class _StripeAnimatedScreenState extends State<StripeAnimatedScreen> {
  final controller = Get.put(DepositController());
  final formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBarWidget(
        text: Strings.stripePayment.tr,
        onTap: () {
          Get.back();
        },
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              SizedBox(height: 30.h),
              FlipCard(
                fill: Fill.fillFront,
                direction: FlipDirection.HORIZONTAL,
                controller: controller.flipCardController,
                onFlip: () {
                  print('Flip');
                },
                flipOnTouch: true,
                onFlipDone: (isFront) {
                  print('isFront: $isFront');
                },
                front: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 10),
                  child: buildCreditCard(
                    color: CustomColor.kDarkBlue,
                    cardExpiration:
                        controller.cardExpiryDateController.text.isEmpty
                            ? "00/0000"
                            : controller.cardExpiryDateController.text,
                    cardHolder: controller.cardHolderNameController.text.isEmpty
                        ? Strings.cardHolder.tr
                        : controller.cardHolderNameController.text
                            .toUpperCase(),
                    cardNumber: controller.cardNumberController.text.isEmpty
                        ? "XXXX XXXX XXXX XXXX"
                        : controller.cardNumberController.text,
                  ),
                ),
                back: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 10),
                  child: Card(
                    elevation: 4.0,
                    color: CustomColor.kDarkBlue,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(14),
                    ),
                    child: Container(
                      height: 200.h,
                      padding: const EdgeInsets.only(
                          left: 16.0, right: 16.0, bottom: 22.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          SizedBox(height: 10.h),
                          Container(
                            height: 45.h,
                            width: MediaQuery.of(context).size.width / 1.2,
                            decoration: BoxDecoration(
                              color: Colors.white.withOpacity(0.2),
                              borderRadius: BorderRadius.circular(5),
                            ),
                          ),
                          CustomPaint(
                            painter: MyPainter(),
                            child: SizedBox(
                              height: 35.h,
                              width: MediaQuery.of(context).size.width / 1.2,
                              child: Align(
                                alignment: Alignment.centerRight,
                                child: Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: Text(
                                    controller.cardCvvController.text.isEmpty
                                        ? "000"
                                        : controller.cardCvvController.text,
                                    style: TextStyle(
                                      color: Colors.black,
                                      fontSize: 21.sp,
                                    ),
                                  ),
                                ),
                              ),
                            ),
                          ),
                          const SizedBox(height: 10),
                          Text(
                            "This unique code is automatically generated and can be used only once.",
                            style: TextStyle(
                              color: Colors.white54,
                              fontSize: 11,
                            ),
                            textAlign: TextAlign.center,
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
              _cardInputFormWidget(context),
              const SizedBox(height: 20 * 3),
              Obx(
                () => controller.isLoading
                    ? CustomLoadingAPI(
                        color: CustomColor.primaryLightColor,
                      )
                    : ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          foregroundColor: Colors.white,
                          backgroundColor: CustomColor.primaryLightColor,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(Dimensions.radius*0.7),
                          ),
                          minimumSize: Size(
                              MediaQuery.of(context).size.width / 1.12, 55),
                        ),
                        onPressed: () {
                          if (formKey.currentState!.validate()) {
                            controller.stripePaymentGatewaysProcess(context);
                          }
                        },
                        child: Text(
                          Strings.payNow.tr.toUpperCase(),
                          style: TextStyle(
                            fontSize: 15.sp,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  _cardInputFormWidget(BuildContext context) {
    return Form(
      key: formKey,
      child: Column(
        children: [
          SizedBox(height: 40.h),
          SizedBox(
            width: MediaQuery.of(context).size.width / 1.12,
            child: TextFormField(
              controller: controller.cardNumberController,
              keyboardType: TextInputType.number,
              style: TextStyle(color: Colors.grey),
              validator: (String? value) {
                if (value!.isEmpty) {
                  return Strings.pleaseFillOutTheField.tr;
                } else {
                  return null;
                }
              },
              decoration: InputDecoration(
                fillColor: Colors.grey[200],
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(15),
                  borderSide: BorderSide(
                    width: 0,
                    style: BorderStyle.none,
                  ),
                ),
                filled: true,
                contentPadding:
                    EdgeInsets.symmetric(horizontal: 20, vertical: 15),
                hintText: Strings.cardNumber.tr,
                hintStyle: TextStyle(
                  color: Colors.grey,
                  fontSize: 16.sp,
                ),
                prefixIcon: Icon(
                  Icons.credit_card,
                  color: Colors.grey,
                ),
              ),
              inputFormatters: [
                FilteringTextInputFormatter.digitsOnly,
                LengthLimitingTextInputFormatter(16),
                CardInputFormatter(),
              ],
              onChanged: (value) {
                var text = value.replaceAll(RegExp(r'\s+\b|\b\s'), ' ');
                setState(() {
                  controller.cardNumberController.value =
                      controller.cardNumberController.value.copyWith(
                          text: text,
                          selection:
                              TextSelection.collapsed(offset: text.length),
                          composing: TextRange.empty);
                });
              },
            ),
          ),
          SizedBox(height: 12.h),
          SizedBox(
            width: MediaQuery.of(context).size.width / 1.12,
            child: TextFormField(
              controller: controller.cardHolderNameController,
              keyboardType: TextInputType.name,
              style: TextStyle(color: Colors.grey),
              validator: (String? value) {
                if (value!.isEmpty) {
                  return Strings.pleaseFillOutTheField.tr;
                } else {
                  return null;
                }
              },
              decoration: InputDecoration(
                fillColor: Colors.grey[200],
                filled: true,
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(15),
                  borderSide: BorderSide(
                    width: 0,
                    style: BorderStyle.none,
                  ),
                ),
                contentPadding:
                    EdgeInsets.symmetric(horizontal: 20, vertical: 15),
                hintText: Strings.fullName.tr,
                hintStyle: TextStyle(
                  color: Colors.grey,
                  fontSize: 16.sp,
                ),
                prefixIcon: Icon(
                  Icons.person,
                  color: Colors.grey,
                ),
              ),
              onChanged: (value) {
                setState(() {
                  controller.cardHolderNameController.value =
                      controller.cardHolderNameController.value.copyWith(
                          text: value,
                          selection:
                              TextSelection.collapsed(offset: value.length),
                          composing: TextRange.empty);
                });
              },
            ),
          ),
          SizedBox(height: 12.h),
          SizedBox(
            width: MediaQuery.of(context).size.width / 1.12,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Expanded(
                  child: TextFormField(
                    controller: controller.cardExpiryDateController,
                    keyboardType: TextInputType.number,
                    style: TextStyle(color: Colors.grey),
                    validator: (String? value) {
                      if (value!.isEmpty) {
                        return Strings.pleaseFillOutTheField.tr;
                      } else {
                        return null;
                      }
                    },
                    decoration: InputDecoration(
                      fillColor: Colors.grey[200],
                      filled: true,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(15),
                        borderSide: BorderSide(
                          width: 0,
                          style: BorderStyle.none,
                        ),
                      ),
                      contentPadding:
                          EdgeInsets.symmetric(horizontal: 20, vertical: 15),
                      hintText: 'MM/YY',
                      hintStyle: TextStyle(
                        color: Colors.grey,
                        fontSize: 16.sp,
                      ),
                      prefixIcon: Icon(
                        Icons.calendar_today,
                        color: Colors.grey,
                      ),
                    ),
                    inputFormatters: [
                      FilteringTextInputFormatter.digitsOnly,
                      LengthLimitingTextInputFormatter(4),
                      CardDateInputFormatter(),
                    ],
                    onChanged: (value) {
                      var text = value.replaceAll(RegExp(r'\s+\b|\b\s'), ' ');
                      setState(() {
                        controller.cardExpiryDateController.value =
                            controller.cardExpiryDateController.value.copyWith(
                                text: text,
                                selection: TextSelection.collapsed(
                                    offset: text.length),
                                composing: TextRange.empty);
                      });
                    },
                  ),
                ),
                SizedBox(width: 14.w),
                Expanded(
                  child: TextFormField(
                    controller: controller.cardCvvController,
                    keyboardType: TextInputType.number,
                    style: TextStyle(color: Colors.grey),
                    validator: (String? value) {
                      if (value!.isEmpty) {
                        return Strings.pleaseFillOutTheField.tr;
                      } else {
                        return null;
                      }
                    },
                    decoration: InputDecoration(
                      fillColor: Colors.grey[200],
                      filled: true,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(15),
                        borderSide: BorderSide(
                          width: 0,
                          style: BorderStyle.none,
                        ),
                      ),
                      contentPadding:
                          EdgeInsets.symmetric(horizontal: 20, vertical: 15),
                      hintText: 'CVV',
                      hintStyle: TextStyle(
                        color: Colors.grey,
                        fontSize: 16.sp,
                      ),
                      prefixIcon: Icon(
                        Icons.lock,
                        color: Colors.grey,
                      ),
                    ),
                    inputFormatters: [
                      FilteringTextInputFormatter.digitsOnly,
                      LengthLimitingTextInputFormatter(3),
                    ],
                    onTap: () {
                      setState(() {
                        Future.delayed(const Duration(milliseconds: 300), () {
                          controller.flipCardController.toggleCard();
                        });
                      });
                    },
                    onChanged: (value) {
                      setState(() {
                        int length = value.length;
                        if (length == 4 || length == 9 || length == 14) {
                          controller.cardNumberController.text = '$value ';
                          controller.cardNumberController.selection =
                              TextSelection.fromPosition(
                                  TextPosition(offset: value.length + 1));
                        }
                      });
                    },
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
