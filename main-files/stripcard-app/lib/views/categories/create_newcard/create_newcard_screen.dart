import 'package:stripecard/controller/navbar/create_newcard_controller.dart';
import 'package:stripecard/widgets/appbar/appbar_widget.dart';
import '../../../widgets/others/customInput_widget.dart/create_new_card_widget.dart';
import 'package:stripecard/utils/basic_screen_import.dart';

class CreateNewScreen extends StatelessWidget {
  CreateNewScreen({super.key});
  final controller = Get.put(CreateCardController());
  @override
  Widget build(BuildContext context) {
    return ResponsiveLayout(
      mobileScaffold: Scaffold(
        appBar: AppBarWidget(text: Strings.createANewCard),
        body: _bodyWidget(context),
      ),
    );
  }

  _bodyWidget(BuildContext context) {
    return ListView(
      physics: BouncingScrollPhysics(),
      children: [
        CustomCreateAmountWidget(
          buttonText: Strings.proceed,
        ),
      ],
    );
  }
}
