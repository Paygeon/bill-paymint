import 'package:stripecard/views/navbar/dashboard_screen.dart';
import 'package:stripecard/views/navbar/notification_screen.dart';
import 'package:stripecard/views/profile/my_card_screen.dart';
import 'package:get/get.dart';

import '../../views/categories/deposit/deposit_screen.dart';
import '../../views/money_transfer/money_transfer_screen.dart';

class NavbarController extends GetxController {
  RxInt selectedIndex = 0.obs;
  List page = [
    DashboardScreen(),
    DepositScreen(),
    MonetTransferScreen(),
    MyCardScreen(),
    NotificationScreen(),
  ];
  void selectedPage(int index) {
    selectedIndex.value = index;
  }
}
