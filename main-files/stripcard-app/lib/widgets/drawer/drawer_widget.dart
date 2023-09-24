// ignore_for_file: deprecated_member_use

import 'package:iconsax/iconsax.dart';
import 'package:stripecard/backend/utils/custom_switch_loading_api.dart';
import 'package:stripecard/controller/navbar/dashboard_controller.dart';
import '../../controller/auth/log_out/log_out.dart';
import '../../views/others/custom_image_widget.dart';
import '../../utils/basic_screen_import.dart';
import '../others/custom_dialouge/custom_dialuge.dart';

class CustomDrawer extends StatelessWidget {
  CustomDrawer({Key? key}) : super(key: key);
  final controller = Get.put(DashBoardController());
  final logOutController = Get.put(LogOutController());


  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Drawer(
        width: MediaQuery.of(context).size.width / 1.34,
        shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.only(
          topRight: Radius.circular(
            Dimensions.radius * 2,
          ),
        )),
        backgroundColor: CustomColor.secondaryLightColor,
        child: ListView(
          children: [
            _backIcon(),
            _userImgWidget(context),
            _userTextwidget(context),
            _drawerWidget(context),
          ],
        ),
      ),
    );
  }

  _userImgWidget(BuildContext context) {
    return Center(
      child: Container(
        margin: EdgeInsets.only(
          top: Dimensions.paddingSize * 1,
          bottom: Dimensions.paddingSize,
        ),
        height: Dimensions.heightSize * 8.3,
        width: Dimensions.widthSize * 11.5,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(Dimensions.radius * 1.5),
          color: CustomColor.primaryBGLightColor,
          border: Border.all(color: CustomColor.primaryBGLightColor, width: 5.w),
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(Dimensions.radius),
          child: FadeInImage(
            height: double.infinity,
            width: double.infinity,
            fit: BoxFit.cover,
            image: NetworkImage(
              controller.dashBoardModel.data.user.userImage,
            ),
            placeholder: AssetImage(
              Assets.clipart.user.path,
            ),
            imageErrorBuilder: (context, error, stackTrace) {
              return Image.asset(
                Assets.clipart.user.path,
                height: double.infinity,
                width: double.infinity,
                fit: BoxFit.cover,
              );
            },
          ),
        ),
      ),
    );
  }

  _userTextwidget(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: Dimensions.marginSizeHorizontal),
      child: Column(
        children: [
          TitleHeading3Widget(
            text:
                "${controller.firstNameController.text} ${controller.lastNameController.text}",
            maxLines: 1,
            textOverflow: TextOverflow.ellipsis,
          ),
          TitleHeading4Widget(
            text: controller.emailController.text,
            maxLines: 1,
            textOverflow: TextOverflow.ellipsis,
          ),
          verticalSpace(Dimensions.heightSize * 2)
        ],
      ),
    );
  }

  _drawerWidget(BuildContext context) {


    return Column(
      crossAxisAlignment: crossStart,
      mainAxisAlignment: mainCenter,
      children: [
        _drawerTileWidget(
          icon: Assets.icon.transactionsLog,
          title: Strings.transactionLog,
          onTap: () {
            Get.toNamed(Routes.transactionLogScreen);
          },
        ),
        _drawerTileWidget(
          icon: Assets.icon.kycVerification,
          title: Strings.kycVerification,
          onTap: () {
            Get.toNamed(Routes.kycScreen);
          },
        ),
        _drawerTileWidget(
          icon: Assets.icon.changePassword,
          title: Strings.changePassword,
          onTap: () {
            Get.toNamed(Routes.changePasswordScreen);
          },
        ),
        _drawerTileWidget(
          icon: Assets.icon.helpCenter,
          title: Strings.helpCenter,
          onTap: () {
            Get.toNamed(Routes.helpCenter);
          },
        ),
        _drawerTileWidget(
          icon: Assets.icon.privacyPolicy,
          title: Strings.privacyPolicy,
          onTap: () {
            Get.toNamed(Routes.privacyPolicy);
          },
        ),
        _drawerTileWidget(
          icon: Assets.icon.aboutUs,
          title: Strings.aboutUs,
          onTap: () {
            Get.toNamed(Routes.aboutUs);
          },
        ),
        Obx(() => logOutController.isLoading
            ? CustomSwitchLoading(
                color: CustomColor.primaryLightColor,
              )
            : _drawerTileWidget(
                icon: Assets.icon.signOut,
                title: Strings.signOut,
                onTap: () {
                  CustomDialog.show(
                      title: Strings.signOutAlert,
                      subtitle: Strings.doYouWant,
                      cancelOnTap: () {
                        Get.back();
                      },
                      confirmOnTap: () {
                        logOutController.logOutProcess();
                      });
                },
              )),
      ],
    );
  }

  _drawerTileWidget(
      {required VoidCallback onTap,
      required String title,
      required String icon}) {
    return InkWell(
      onTap: onTap,
      child: Padding(
        padding: EdgeInsets.symmetric(
          horizontal: Dimensions.paddingSize * 1,
          vertical: Dimensions.paddingSize * 0.2,
        ),
        child: Row(
          crossAxisAlignment: crossStart,
          mainAxisAlignment: mainStart,
          children: [
            Container(
              alignment: Alignment.center,
              height: Dimensions.heightSize * 2.5,
              width: Dimensions.widthSize * 3.3,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(Dimensions.radius * 0.7),
                color: CustomColor.whiteColor.withOpacity(0.2),
              ),
              child: Container(
                padding: EdgeInsets.all(Dimensions.paddingSize * 0.2),
                decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(
                      Dimensions.radius * 0.7,
                    ),
                    color: CustomColor.primaryBGLightColor),
                child: CustomImageWidget(
                  path: icon,
                  height: Dimensions.heightSize * 2,
                  width: Dimensions.widthSize * 2.2,
                ),
              ),
            ),
            horizontalSpace(Dimensions.widthSize),
            Padding(
              padding: EdgeInsets.only(top: Dimensions.paddingSize * 0.32),
              child: TitleHeading3Widget(
                text: title,
              ),
            ),
          ],
        ),
      ),
    );
  }

  _backIcon() {
    return GestureDetector(
      onTap: () {
        Get.close(1);
      },
      child: Padding(
        padding: EdgeInsets.only(
            top: Dimensions.paddingSize * 0.4,
            left: Dimensions.paddingSize * 0.6),
        child: Align(
          alignment: Alignment.centerLeft,
          child: Icon(
            Iconsax.arrow_left,
            color: CustomColor.primaryLightTextColor,
          ),
        ),
      ),
    );
  }
}
