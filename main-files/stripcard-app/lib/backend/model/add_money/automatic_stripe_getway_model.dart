import 'dart:convert';

AutomaticPaymentStripeGatewayModel automaticPaymentStripeGatewayModelFromJson(
        String str) =>
    AutomaticPaymentStripeGatewayModel.fromJson(json.decode(str));

String automaticPaymentStripeGatewayModelToJson(
        AutomaticPaymentStripeGatewayModel data) =>
    json.encode(data.toJson());

class AutomaticPaymentStripeGatewayModel {
  AutomaticPaymentStripeGatewayModel({
    required this.message,
    required this.data,
  });

  Message message;
  Data data;

  factory AutomaticPaymentStripeGatewayModel.fromJson(
          Map<String, dynamic> json) =>
      AutomaticPaymentStripeGatewayModel(
        message: Message.fromJson(json["message"]),
        data: Data.fromJson(json["data"]),
      );

  Map<String, dynamic> toJson() => {
        "message": message.toJson(),
        "data": data.toJson(),
      };
}

class Data {
  Data({
    required this.gategayType,
    required this.gatewayCurrencyName,
    required this.alias,
    required this.identify,
    required this.inputFields,
    required this.paymentInformations,
    required this.url,
    required this.method,
  });

  String gategayType;
  String gatewayCurrencyName;
  String alias;
  String identify;
  List<InputField> inputFields;
  PaymentInformations paymentInformations;
  String url;
  String method;

  factory Data.fromJson(Map<String, dynamic> json) => Data(
        gategayType: json["gategay_type"],
        gatewayCurrencyName: json["gateway_currency_name"],
        alias: json["alias"],
        identify: json["identify"],
        inputFields: List<InputField>.from(
            json["input_fields"].map((x) => InputField.fromJson(x))),
        paymentInformations:
            PaymentInformations.fromJson(json["payment_informations"]),
        url: json["url"],
        method: json["method"],
      );

  Map<String, dynamic> toJson() => {
        "gategay_type": gategayType,
        "gateway_currency_name": gatewayCurrencyName,
        "alias": alias,
        "identify": identify,
        "input_fields": List<dynamic>.from(inputFields.map((x) => x.toJson())),
        "payment_informations": paymentInformations.toJson(),
        "url": url,
        "method": method,
      };
}

class InputField {
  InputField({
    required this.fieldName,
    required this.labelName,
  });

  String fieldName;
  String labelName;

  factory InputField.fromJson(Map<String, dynamic> json) => InputField(
        fieldName: json["field_name"],
        labelName: json["label_name"],
      );

  Map<String, dynamic> toJson() => {
        "field_name": fieldName,
        "label_name": labelName,
      };
}

class PaymentInformations {
  PaymentInformations({
    required this.trx,
    required this.gatewayCurrencyName,
    required this.requestAmount,
    required this.exchangeRate,
    required this.totalCharge,
    required this.willGet,
    required this.payableAmount,
  });

  String trx;
  String gatewayCurrencyName;
  String requestAmount;
  String exchangeRate;
  String totalCharge;
  String willGet;
  String payableAmount;

  factory PaymentInformations.fromJson(Map<String, dynamic> json) =>
      PaymentInformations(
        trx: json["trx"],
        gatewayCurrencyName: json["gateway_currency_name"],
        requestAmount: json["request_amount"],
        exchangeRate: json["exchange_rate"],
        totalCharge: json["total_charge"],
        willGet: json["will_get"],
        payableAmount: json["payable_amount"],
      );

  Map<String, dynamic> toJson() => {
        "trx": trx,
        "gateway_currency_name": gatewayCurrencyName,
        "request_amount": requestAmount,
        "exchange_rate": exchangeRate,
        "total_charge": totalCharge,
        "will_get": willGet,
        "payable_amount": payableAmount,
      };
}

class Message {
  Message({
    required this.success,
  });

  List<String> success;

  factory Message.fromJson(Map<String, dynamic> json) => Message(
        success: List<String>.from(json["success"].map((x) => x)),
      );

  Map<String, dynamic> toJson() => {
        "success": List<dynamic>.from(success.map((x) => x)),
      };
}
