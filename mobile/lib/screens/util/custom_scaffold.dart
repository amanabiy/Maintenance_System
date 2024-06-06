import 'package:flutter/material.dart';

void showSuccessSnackBar(BuildContext context, String message) {
  final snackBar = SnackBar(
    content: Text(message),
    backgroundColor: Color.fromARGB(255, 124, 90, 248),
    behavior: SnackBarBehavior.floating,
    duration: Duration(seconds: 3),
  );
  ScaffoldMessenger.of(context).showSnackBar(snackBar);
}

void showFailureSnackBar(BuildContext context, String message) {
  final snackBar = SnackBar(
    content: Text(message),
    backgroundColor: Color.fromARGB(255, 255, 126, 100),
    behavior: SnackBarBehavior.floating,
    duration: Duration(seconds: 3),
  );
  ScaffoldMessenger.of(context).showSnackBar(snackBar);
}