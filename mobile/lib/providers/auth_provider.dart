import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AuthProvider with ChangeNotifier {
  String _accessToken = "";
  Map<String, dynamic> _user = {};
  bool _isLoggedIn = false;

  String get accessToken => _accessToken;
  Map<String, dynamic> get user => _user;
  bool get isLoggedIn => _isLoggedIn;

  AuthProvider() {
    _loadFromPrefs();
  }

  void login(String token, Map<String, dynamic> userData) async {
    _accessToken = token;
    _user = userData;
    _isLoggedIn = true;
    await _saveToPrefs();
    notifyListeners();
  }

  void logout() async {
    
  }

  Future<void> _saveToPrefs() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('accessToken', _accessToken);
    await prefs.setString('user', jsonEncode(_user));
  }

  Future<void> _loadFromPrefs() async {
    final prefs = await SharedPreferences.getInstance();
    _accessToken = prefs.getString('accessToken') ?? "";
    _user = jsonDecode(prefs.getString('user') ?? '{}');
    _isLoggedIn = _accessToken.isNotEmpty;
    notifyListeners();
  }

  Future<void> _clearPrefs() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('accessToken');
    await prefs.remove('user');
  }
}
