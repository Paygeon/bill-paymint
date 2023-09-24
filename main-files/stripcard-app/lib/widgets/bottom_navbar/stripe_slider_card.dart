import 'package:carousel_slider/carousel_slider.dart';
import 'package:stripecard/controller/categories/virtual_card/stripe_card/stripe_card_controller.dart';
import '../../controller/navbar/dashboard_controller.dart';
import '../../utils/basic_screen_import.dart';
import 'card_widget.dart';

class DashboardSlider extends StatelessWidget {
  DashboardSlider({Key? key}) : super(key: key);
  final stripeCardController = Get.put(StripeCardController());
  final controller = Get.put(DashBoardController());

  @override
  Widget build(BuildContext context) {
    var myCards = stripeCardController.stripeCardModel.data.myCard;
    return myCards.isNotEmpty
        ? Obx(() {
            return Column(
              children: [
                CarouselSlider(
                  items: myCards.map((card) {
                    return Builder(
                      builder: (BuildContext context) {
                        return CardWidget(
                          availableBalance: Strings.cardHolder,
                          cardNumber: card.cardPan,
                          expiryDate: "${card.expiryMonth}/${card.expiryYear}",
                          balance: card.cardHolder.toString(),
                          validAt: "${card.expiryMonth}/${card.expiryYear}",
                          cvv: card.cvv,
                          logo: card.siteLogo,
                        );
                      },
                    );
                  }).toList(),
                  carouselController: controller.carouselController,
                  options: CarouselOptions(
                    onPageChanged: (index, reason) {
                      controller.current.value = index;
                      stripeCardController.cardId.value = myCards[index].cardId;
                      debugPrint(stripeCardController.cardId.value);
                      //! Custom Dot indicator State
                    },
                    height: MediaQuery.of(context).size.height * 0.24,
                    viewportFraction: 1,
                    initialPage: 1,
                    enableInfiniteScroll: true,
                    autoPlay: false,
                    aspectRatio: 17 / 8,
                    autoPlayInterval: Duration(seconds: 5),
                    autoPlayAnimationDuration: Duration(seconds: 2),
                    autoPlayCurve: Curves.fastOutSlowIn,
                    enlargeCenterPage: true,
                    scrollDirection: Axis.horizontal,
                  ),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: stripeCardController.stripeCardModel.data.myCard
                      .asMap()
                      .entries
                      .map((entry) {
                    return controller.current.value == entry.key
                        ? Container(
                            width: Dimensions.widthSize * 1,
                            height: Dimensions.heightSize * 0.6,
                            margin: EdgeInsets.symmetric(
                                vertical: Dimensions.marginSizeVertical * 0.2,
                                horizontal:
                                    Dimensions.marginSizeHorizontal * 0.2),
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              color: CustomColor.whiteColor,
                            ))
                        : Container(
                            width: Dimensions.widthSize * 0.7,
                            height: Dimensions.heightSize * 0.5,
                            margin: EdgeInsets.symmetric(
                                vertical: Dimensions.marginSizeVertical * 0.2,
                                horizontal:
                                    Dimensions.marginSizeHorizontal * 0.2),
                            decoration: BoxDecoration(
                              color: CustomColor.thirdLightTextColor
                                  .withOpacity(0.3),
                              shape: BoxShape.circle,
                            ),
                          );
                  }).toList(),
                ),
              ],
            );
          })
        : CardWidget(
           availableBalance: Strings.cardHolder,
            cardNumber: 'xxxx xxxx xxxx xxxx',
            expiryDate: 'xx/xx',
            balance: 'xx',
            validAt: 'xx',
            cvv: 'xxx',
            logo: Assets.logo.basicPn.path,
            isNetworkImage: false,
          );
  }
}
