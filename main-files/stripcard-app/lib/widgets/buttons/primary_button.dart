import 'package:stripecard/utils/custom_color.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../utils/dimensions.dart';

class PrimaryButton extends StatelessWidget {
  const PrimaryButton({
    Key? key,
    required this.title,
    required this.onPressed,
    this.borderColor,
    this.borderWidth = 0,
    this.height,
    this.buttonColor =CustomColor.primaryLightColor,
    this.buttonTextColor = Colors.white,
    this.shape,
    this.icon,
    this.fontSize,
    this.fontWeight,
  }) : super(key: key);
  final String title;
  final VoidCallback onPressed;
  final Color? borderColor;
  final double borderWidth;
  final double? height;
  final Color? buttonColor;
  final Color buttonTextColor;
  final OutlinedBorder? shape;
  final Widget? icon;
  final double? fontSize;
  final FontWeight? fontWeight;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(Dimensions.radius),
        boxShadow: [
          BoxShadow(
            color: CustomColor.primaryLightColor,
            offset: const Offset(0.0, 0.0),
            blurRadius: 1.0,
            spreadRadius: .2,
          ), //BoxShadow
        ],
      ),
      height: height ?? Dimensions.buttonHeight * 0.8,
      width: double.infinity,
      child: ElevatedButton(
        onPressed: onPressed,
        style: ElevatedButton.styleFrom(
          shape: shape ??
              RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(Dimensions.radius * 0.7)),
          backgroundColor: buttonColor ?? CustomColor.primaryLightColor,
          side: BorderSide(
            width: borderWidth,
            color: borderColor ?? CustomColor.primaryLightColor,
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            icon ?? const SizedBox(),
            Text(title,
                style: GoogleFonts.inter(
                  fontSize: Dimensions.headingTextSize3,
                  fontWeight: FontWeight.w600,
                  color: CustomColor.whiteColor,
                )),
          ],
        ),
      ),
    );
  }
}
