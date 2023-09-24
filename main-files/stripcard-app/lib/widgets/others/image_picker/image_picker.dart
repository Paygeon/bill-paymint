import 'dart:io';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';

import '../../../custom_assets/assets.gen.dart';
import '../../../utils/custom_color.dart';
import '../../../utils/dimensions.dart';
import '../../../views/others/custom_image_widget.dart';

File? pickedFile;
ImagePicker imagePicker = ImagePicker();

final imageController = Get.put(InputImageController());

class InputImageController extends GetxController {
  var isImagePathSet = false.obs;
  var imagePath = "".obs;

  void setImagePath(String path) {
    imagePath.value = path;
    isImagePathSet.value = true;
  }
}
class ProfileViewWidget extends StatefulWidget {
  const ProfileViewWidget(
      {Key? key, this.withButton = false, this.heightSize = 12.0})
      : super(key: key);

  final bool withButton;
  final double heightSize;

  @override
  State<ProfileViewWidget> createState() => _ProfileViewWidgetState();
}

class _ProfileViewWidgetState extends State<ProfileViewWidget> {
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        _imageWidget(),
      ],
    );
  }

  _buttonWidget(BuildContext context) {
    return Visibility(
      visible: widget.withButton,
      child: InkWell(
        onTap: (() {
          _openImageSourceOptions(context, imageController);
        }),
        child: CustomImageWidget(
          path: Assets.icon.camera,
          height: 20,
          width: 20,
          color: CustomColor.whiteColor,
        ),
      ),
    );
  }

  _imageWidget() {
    return Center(
      child: Container(
        margin: EdgeInsets.only(
          top: Dimensions.paddingSize * 1,
        ),
        padding: EdgeInsets.all(Dimensions.paddingSize * 1.8),
        height: Dimensions.heightSize * 8.3,
        width: Dimensions.widthSize * 11.5,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(Dimensions.radius * 1.5),
          color: CustomColor.primaryLightTextColor,
          border: Border.all(color: Color(0xff8D8D8D), width: 5),
          image: DecorationImage(
              fit: BoxFit.cover,
              image: pickedFile == null
                  ? AssetImage(
                      Assets.clipart.user.path,
                    )
                  : FileImage(pickedFile!) as ImageProvider),
        ),
        child: _buttonWidget(context),
      ),
    );
  }

  _openImageSourceOptions(BuildContext context, controller) {
    showGeneralDialog(
        barrierLabel:
            MaterialLocalizations.of(context).modalBarrierDismissLabel,
        barrierDismissible: true,
        barrierColor: Colors.black.withOpacity(0.6),
        transitionDuration: const Duration(milliseconds: 700),
        context: context,
        pageBuilder: (_, __, ___) {
          return Material(
            type: MaterialType.transparency,
            child: Align(
              alignment: Alignment.center,
              child: Container(
                height: Dimensions.heightSize * 13,
                width: Dimensions.widthSize * 25,
                decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(Dimensions.radius)),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        GestureDetector(
                          child: const Icon(
                            Icons.camera_alt,
                            size: 40.0,
                            color: Colors.blue,
                          ),
                          onTap: () {
                            takePhoto(ImageSource.camera);
                            Navigator.of(context).pop();
                          },
                        ),
                        Text(
                          'from Camera',
                          style: TextStyle(
                              color: Colors.black,
                              fontSize: Dimensions.headingTextSize4),
                        )
                      ],
                    ),
                    Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        GestureDetector(
                          child: const Icon(
                            Icons.photo,
                            size: 40.0,
                            color: Colors.green,
                          ),
                          onTap: () {
                            takePhoto(ImageSource.gallery);
                            Navigator.of(context).pop();
                          },
                        ),
                        Text(
                          'From Gallery',
                          style: TextStyle(
                              color: Colors.black,
                              fontSize: Dimensions.headingTextSize4),
                        )
                      ],
                    ),
                  ],
                ),
              ),
            ),
          );
        },
        transitionBuilder: (_, anim, __, child) {
          return SlideTransition(
            position: Tween(begin: const Offset(0, 1), end: const Offset(0, 0))
                .animate(anim),
            child: child,
          );
        });
  }

  takePhoto(ImageSource source) async {
    final pickedImage =
        await imagePicker.pickImage(source: source, imageQuality: 100);

    pickedFile = File(pickedImage!.path);
    imageController.setImagePath(pickedFile!.path);
    setState(() {});
  }
}

