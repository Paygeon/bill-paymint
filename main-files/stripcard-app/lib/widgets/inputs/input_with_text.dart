import 'package:google_fonts/google_fonts.dart';
import 'package:stripecard/utils/basic_screen_import.dart';

class InputWithText extends StatefulWidget {
  final String hint, icon, label, suffixText;
  final int maxLines;
  final bool isValidator;
  final EdgeInsetsGeometry? paddings;
  final TextEditingController controller;

  InputWithText({
    Key? key,
    required this.controller,
    required this.hint,
    this.icon = "",
    this.isValidator = true,
    this.maxLines = 1,
    this.paddings,
    required this.label,
    required this.suffixText,
  }) : super(key: key);

  @override
  State<InputWithText> createState() => _PrimaryInputWidgetState();
}

class _PrimaryInputWidgetState extends State<InputWithText> {
  FocusNode? focusNode;
  @override
  void initState() {
    super.initState();
    focusNode = FocusNode();
  }

  @override
  void dispose() {
    focusNode!.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          widget.label,
          style: CustomStyle.darkHeading4TextStyle.copyWith(
            fontWeight: FontWeight.w600,
            color: CustomColor.primaryLightTextColor,
          ),
        ),
        verticalSpace(7),
        Row(
          children: [
            Expanded(
              flex: 9,
              child: TextFormField(
                validator: widget.isValidator == false
                    ? null
                    : (String? value) {
                        if (value!.isEmpty) {
                          return Strings.pleaseFillOutTheField;
                        } else {
                          return null;
                        }
                      },
                textInputAction: TextInputAction.next,
                controller: widget.controller,
                onTap: () {
                  setState(() {
                    focusNode!.requestFocus();
                  });
                },
                onFieldSubmitted: (value) {
                  setState(() {
                    focusNode!.unfocus();
                  });
                },
                focusNode: focusNode,
                textAlign: TextAlign.left,
                style: CustomStyle.darkHeading3TextStyle.copyWith(
                  color: CustomColor.primaryLightTextColor,
                ),
                // inputFormatters: <TextInputFormatter>[
                //   FilteringTextInputFormatter.digitsOnly
                // ],
                keyboardType: TextInputType.numberWithOptions(decimal: true),
                maxLines: widget.maxLines,
                decoration: InputDecoration(
                  hintText: widget.hint,
                  hintStyle: GoogleFonts.inter(
                    fontSize: Dimensions.headingTextSize3,
                    fontWeight: FontWeight.w500,
                    color: CustomColor.primaryLightTextColor.withOpacity(0.2),
                  ),
                  enabledBorder: OutlineInputBorder(
                    borderRadius:
                        BorderRadius.circular(Dimensions.radius * 0.5),
                    borderSide: BorderSide(
                      width: 1,
                      color: CustomColor.primaryLightTextColor.withOpacity(0.2),
                    ),
                  ),
                  focusedErrorBorder: OutlineInputBorder(
                    borderRadius:
                        BorderRadius.circular(Dimensions.radius * 0.5),
                    borderSide: BorderSide(
                      width: 1,
                      color: CustomColor.redColor,
                    ),
                  ),
                  errorBorder: OutlineInputBorder(
                    borderRadius:
                        BorderRadius.circular(Dimensions.radius * 0.5),
                    borderSide: BorderSide(
                      width: 1,
                      color: CustomColor.redColor,
                    ),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderRadius:
                        BorderRadius.circular(Dimensions.radius * 0.5),
                    borderSide: const BorderSide(
                        width: 2, color: CustomColor.primaryBGLightColor),
                  ),
                  contentPadding: EdgeInsets.symmetric(
                    horizontal: Dimensions.heightSize * 1.7,
                    vertical: Dimensions.widthSize,
                  ),
                  suffixIcon: Container(
                    width: 81,
                    alignment: Alignment.center,
                    padding: EdgeInsets.only(left: 5),
                    decoration: BoxDecoration(
                      color: CustomColor.primaryBGLightColor,
                      borderRadius: BorderRadius.only(
                        topRight: Radius.circular(Dimensions.radius * 0.5),
                        bottomRight: Radius.circular(Dimensions.radius * 0.5),
                      ),
                    ),
                    child: CustomTitleHeadingWidget(
                      text: widget.suffixText,
                      style: CustomStyle.darkHeading4TextStyle.copyWith(
                        fontWeight: FontWeight.w500,
                        fontSize: Dimensions.headingTextSize3,
                        color: CustomColor.whiteColor,
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ],
        )
      ],
    );
  }
}
