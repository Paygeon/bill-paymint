import 'package:stripecard/utils/basic_screen_import.dart';
import 'package:stripecard/views/others/custom_image_widget.dart';


class CategoriesWidget extends StatelessWidget {
  const CategoriesWidget({
    super.key,
    required this.icon,
    required this.text, required this.onTap,
    required this.color,

  });
  final String icon, text;
  final VoidCallback onTap;
  final Color color;
  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Column(
        children: [
          CircleAvatar(
            radius: 27.r,
            backgroundColor: CustomColor.primaryLightColor.withOpacity(0.06),
            child: CustomImageWidget(
              path: icon,
              height: Dimensions.heightSize*2,
              width: Dimensions.widthSize*2.2,
              color:color,
            ),
          ),
        
          CustomTitleHeadingWidget(
            text: text,
            style: CustomStyle.darkHeading5TextStyle
                .copyWith(fontWeight: FontWeight.w600, fontSize: Dimensions.headingTextSize5,
               color: color,
                ),
          ),
        ],
      ),
    );
  }
}
