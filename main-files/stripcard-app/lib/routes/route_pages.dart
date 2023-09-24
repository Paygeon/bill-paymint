import 'package:stripecard/routes/routes.dart';
import 'package:stripecard/views/auth/login/otp_verification_screen.dart';
import 'package:stripecard/views/auth/registration/email_otp_screen.dart';
import 'package:stripecard/views/auth/registration/sign_up_screen.dart';
import 'package:stripecard/views/categories/deposit/web_payment_screen.dart';
import 'package:stripecard/views/drawer/change_password_screen.dart';
import 'package:stripecard/views/navbar/bottom_navbar_screen.dart';
import 'package:stripecard/views/navbar/dashboard_screen.dart';
import 'package:stripecard/views/navbar/notification_screen.dart';
import 'package:stripecard/views/onboard/onboard_screen.dart';
import 'package:stripecard/views/profile/my_card_screen.dart';
import 'package:stripecard/views/profile/update_profile_screen.dart';
import 'package:get/get.dart';

import '../backend/services/api_endpoint.dart';
import '../bindings/splash_screen_binding.dart';
import '../controller/navbar/deposit/stripe_animated_screen.dart';
import '../language/strings.dart';
import '../views/auth/login/reset_password_screen.dart';
import '../views/auth/login/signin_screen.dart';
import '../views/categories/create_newcard/create_newcard_preview_screen.dart';
import '../views/categories/create_newcard/create_newcard_screen.dart';
import '../views/categories/deposit/deposit_preview_screen.dart';
import '../views/categories/deposit/deposit_screen.dart';
import '../views/categories/deposit/manual_payment_screen.dart';
import '../views/categories/virtual_card/stripe_card/stripe_card_details_screen.dart';
import '../views/categories/virtual_card/stripe_card/stripe_create_card.dart';
import '../views/categories/virtual_card/stripe_card/stripe_transaction_screen.dart';
import '../views/drawer/transaction_log_screen.dart';
import '../views/drawer/web_view_screen.dart';
import '../views/kyc/kyc_screen.dart';
import '../views/money_transfer/transfer_preview_screen.dart';
import '../views/splash_screen/splash_screen.dart';

class RoutePageList {
  static var list = [
    //!auth
    GetPage(
      name: Routes.splashScreen,
      page: () => SplashScreen(),
      binding: SplashBinding(),
    ),
    GetPage(
      name: Routes.onboardScreen,
      page: () => OnboardScreen(),
    ),

    GetPage(
      name: Routes.signInScreen,
      page: () => SignInScreen(),
    ),
    GetPage(
      name: Routes.resetOtpScreen,
      page: () => ResetOtpScreen(),
    ),
    GetPage(
      name: Routes.resetPasswordScreen,
      page: () => ResetPasswordScreen(),
    ),
    GetPage(
      name: Routes.registrationScreen,
      page: () => RegistrationScreen(),
    ),
    GetPage(
      name: Routes.emailOtpScreen,
      page: () => EmailOtpScreen(),
    ),

    //!categories
    GetPage(
      name: Routes.bottomNavBarScreen,
      page: () => BottomNavBarScreen(),
      // binding: BottomNavBarScreenBinding(),
    ),
    GetPage(
      name: Routes.dashboardScreen,
      page: () => DashboardScreen(),
    ),
    GetPage(
      name: Routes.notificationScreen,
      page: () => NotificationScreen(),
    ),

    // GetPage(
    //   name: Routes.cardDetailsScreen,
    //   page: () => CardDetailsScreen(),
    // ),
    // GetPage(
    //   name: Routes.addFundScreen,
    //   page: () => AddFundScreen(),
    // ),

    // GetPage(
    //   name: Routes.transactionHistoryScreen,
    //   page: () => TransactionHistoryScreen(),
    // ),

    // GetPage(
    //   name: Routes.addFundPreviewScreen,
    //   page: () => AddFundPreviewScreen(),
    // ),
    GetPage(
      name: Routes.depositScreen,
      page: () => DepositScreen(),
    ),
    GetPage(
      name: Routes.depositPreviewScreen,
      page: () => DepositPreviewScreen(),
    ),
    // GetPage(
    //   name: Routes.withdrawScreen,
    //   page: () => WithdrawScreen(),
    // ),
    // GetPage(
    //   name: Routes.withdrawPreviewScreen,
    //   page: () => WithdrawPreviewScreen(),
    // ),
    // GetPage(
    //   name: Routes.webViewScreen,
    //   page: () => WebViewScreen(),
    // ),
    //help center
    GetPage(
      name: Routes.helpCenter,
      page: () => WebViewScreen(
        title: Strings.helpCenter,
        url: "${ApiEndpoint.mainDomain}/contact",
      ),
    ),

    //privacy policy
    GetPage(
      name: Routes.privacyPolicy,
      page: () => WebViewScreen(
        title: Strings.privacyAndPolicy,
        url: "${ApiEndpoint.mainDomain}/page/privacy-policy",
      ),
    ),

    //about us
    GetPage(
      name: Routes.aboutUs,
      page: () => WebViewScreen(
        title: Strings.aboutUs,
        url: "${ApiEndpoint.mainDomain}/about",
      ),
    ),
    //!drawer screens

    GetPage(
      name: Routes.transactionLogScreen,
      page: () => TransactionLogScreen(),
    ),
    GetPage(
      name: Routes.createNewScreen,
      page: () => CreateNewScreen(),
    ),
    GetPage(
      name: Routes.createNewCardPreviewScreen,
      page: () => CreateNewCardPreviewScreen(),
    ),


    GetPage(
      name: Routes.changePasswordScreen,
      page: () => ChangePasswordScreen(),
    ),

    //!profile screen

    GetPage(
      name: Routes.mygiftCardScreen,
      page: () => MyCardScreen(),
    ),
    GetPage(
      name: Routes.updateProfileScreen,
      page: () => UpdateProfileScreen(),
    ),
    GetPage(
      name: Routes.manualPaymentScreen,
      page: () => ManualPaymentScreen(),
    ),
    GetPage(
      name: Routes.webPaymentScreen,
      page: () => WebPaymentScreen(),
    ),
    GetPage(
      name: Routes.stripeAnimatedScreen,
      page: () => StripeAnimatedScreen(),
    ),
    GetPage(
      name: Routes.kycScreen,
      page: () => KycScreen(),
    ),

    ///>>>>>>>>>>>> stripe card screen
    GetPage(
      name: Routes.stripeCardDetailsScreen,
      page: () => StripeCardDetailsScreen(),
    ),
    GetPage(
      name: Routes.stripeTransactionHistoryScreen,
      page: () => StripeTransactionHistoryScreen(),
    ),
    GetPage(
      name: Routes.moneyTransferPreviewScreen,
      page: () => MoneyTransferPreviewScreen(),
    ),
    GetPage(
      name: Routes.stripeCreateCardScreen,
      page: () => StripeCreateCardScreen(),
    ),
  ];
}
