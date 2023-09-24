import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../utils/custom_color.dart';
import '../../utils/dimensions.dart';

class CustomTextButton extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;
  final Color color;
  const CustomTextButton({
    Key? key,
    required this.onPressed,
    required this.text,
    this.color = CustomColor.whiteColor,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onPressed,
      child: Text(
        text,
        style: GoogleFonts.inter(
          fontSize: Dimensions.headingTextSize4,
          color: CustomColor.whiteColor,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }
}
