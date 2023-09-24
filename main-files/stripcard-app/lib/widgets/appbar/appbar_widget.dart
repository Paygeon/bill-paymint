import 'package:stripecard/utils/basic_screen_import.dart';
import 'back_button.dart';

class AppBarWidget extends AppBar {
  final String text;

  final VoidCallback? onTap;
  final List<Widget>? actions;
  AppBarWidget({
    required this.text,
    this.onTap,
    this.actions,
    super.key,
  }) : super(
            title: Text(
              text,
              style: CustomStyle.darkHeading4TextStyle.copyWith(
                fontSize: Dimensions.headingTextSize1,
                fontWeight: FontWeight.w500,
                color: CustomColor.primaryLightTextColor,
              ),
            ),
            elevation: 0,
            backgroundColor: CustomColor.primaryLightScaffoldBackgroundColor,
            leading: BackButtonWidget(),
            actions: actions);
}
