import 'package:flutter_svg/svg.dart';
import 'package:stripecard/utils/basic_screen_import.dart';

buildBottomNavigationMenu(context, bottomNavBarController) {
  return BottomAppBar(
    elevation: 0,
    color: CustomColor.transparent,
    child: Container(
      height: 64.h,
      margin: EdgeInsets.only(
        left: Dimensions.marginSizeVertical * 0.7,
        right: Dimensions.marginSizeVertical * 0.7,
        bottom: Dimensions.marginSizeVertical * 0.2,
      ),
      decoration: BoxDecoration(
          color: CustomColor.primaryBGLightColor,
          borderRadius: BorderRadius.circular(Dimensions.radius * 3.22)),
      child: Row(
        mainAxisSize: MainAxisSize.max,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          bottomItemWidget(Assets.icon.home, bottomNavBarController, 0,
              CustomColor.transparent),
          bottomItemWidget(Assets.icon.deposit, bottomNavBarController, 1,
              CustomColor.transparent),
          bottomItemWidget(Assets.icon.send, bottomNavBarController, 2,
              CustomColor.whiteColor.withOpacity(0.1)),
          bottomItemWidget(Assets.icon.myGift, bottomNavBarController, 3,
              CustomColor.transparent),
          bottomItemWidget(Assets.icon.messagetext, bottomNavBarController, 4,
              CustomColor.transparent),
        ],
      ),
    ),
  );
}

bottomItemWidget(
  var icon,
  bottomNavBarController,
  page,
  Color color,
) {
  return Expanded(
    child: GestureDetector(
      onTap: () {
        bottomNavBarController.selectedIndex.value = page;
        print(bottomNavBarController.selectedIndex.value);
      },
      child: CircleAvatar(
        radius: 25.r,
        backgroundColor: color,
        child: SvgPicture.asset(
          icon,
          color: 
              bottomNavBarController.selectedIndex.value == page
                  ? CustomColor.whiteColor
                  : CustomColor.whiteColor.withOpacity(0.4),
           
          height: Dimensions.heightSize * 2,
        ),
      ),
    ),
  );
}
