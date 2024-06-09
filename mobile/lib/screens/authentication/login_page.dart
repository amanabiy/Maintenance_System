import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:mobile/network/endpoints.dart';
import 'package:mobile/providers/auth_provider.dart';
import 'package:mobile/screens/authentication/register_page.dart';
import 'package:mobile/screens/authentication/reset_password.dart';
import 'package:http/http.dart' as http;
import 'package:mobile/screens/nav_bar.dart';
import 'package:mobile/screens/util/custom_app_bar.dart';
import 'package:mobile/screens/util/custom_scaffold.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final bool _isLoading = false;

  Future<void> _login(String email, String password) async {
    // ... existing login logic ...
    try {
      final url = Uri.parse(Endpoints.login);
      final response = await http.post(
        url,
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          'email': email,
          'password': password,
        }),
      );
      final decResponse = jsonDecode(response.body);

      if (response.statusCode == 201) {
        const storage = FlutterSecureStorage();

        // Save token to secure storage
        await storage.write(
            key: 'accessToken', value: decResponse['accessToken']);
        await storage.write(
            key: 'refreshToken', value: decResponse['refreshToken']);
        await storage.write(key: 'email', value: email);
        await storage.write(
            key: 'userId', value: decResponse['user']['id'].toString());
        await storage.write(
            key: 'fullName', value: decResponse['user']['fullName']);
        await storage.write(key: 'user', value: decResponse['user'].toString());
        await storage.write(
            key: 'role', value: decResponse['user']['role'].toString());
        AuthProvider().login(decResponse['accessToken'], decResponse['user']);
        // Log the access token
        print('Access Token: ${decResponse['accessToken']}');

        // ignore: use_build_context_synchronously
        Navigator.pushAndRemoveUntil(
            context,
            MaterialPageRoute(builder: (context) => const HomePage()),
            (route) => false);
      } else if (response.statusCode == 400) {
        if (decResponse['message'].runtimeType == String) {
          showFailureSnackBar(context, decResponse['message']);
        } else {
          showFailureSnackBar(context, decResponse['message'][0]);
        }
      } else {
        showFailureSnackBar(context, 'Invalid email or password');
      }
    } catch (e) {
      // Handle other exceptions
      print('Error during login: $e');
      if (mounted) {
        showFailureSnackBar(
            context, 'An error occurred. Please try again later.');
      }
    }
  }

  void _handleForgotPassword() {
    // Navigate to your reset password page (replace with your implementation)
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => const ResetPasswordPage()),
    );
  }

  void _handleCreateAccount() {
    // Navigate to your create account page (replace with your implementation)
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => const CreateAccountPage()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(
        title: 'Login',
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Center(
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                CircleAvatar(
                  backgroundImage:
                      AssetImage('assets/image/icon.webp'),
                  radius: 75,
                ),
                const SizedBox(height: 50),
                TextField(
                  controller: _emailController,
                  decoration: InputDecoration(
                    labelText: 'Email',
                    hintText: 'Enter your email',
                    hintStyle: const TextStyle(color: Colors.grey),
                    contentPadding: const EdgeInsets.all(12.0),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                      borderSide:
                          const BorderSide(color: Colors.grey, width: 1.0),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                      borderSide:
                          const BorderSide(color: Colors.blue, width: 2.0),
                    ),
                  ),
                ),
                const SizedBox(height: 10),
                TextField(
                  controller: _passwordController,
                  decoration: InputDecoration(
                    labelText: 'Password',
                    hintText: 'Enter your password',
                    hintStyle: const TextStyle(color: Colors.grey),
                    contentPadding: const EdgeInsets.all(12.0),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                      borderSide:
                          const BorderSide(color: Colors.grey, width: 1.0),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                      borderSide:
                          const BorderSide(color: Colors.blue, width: 2.0),
                    ),
                  ),
                  obscureText: true,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    TextButton(
                      onPressed: _handleForgotPassword,
                      child: const Text(
                        'Forgot password?',
                        style: TextStyle(color: Colors.blue),
                      ),
                    ),
                  ],
                ),
                _isLoading
                    ? const CircularProgressIndicator()
                    : ElevatedButton(
                        onPressed: () {
                          _login(
                              _emailController.text, _passwordController.text);
                        },
                        style: ElevatedButton.styleFrom(
                          primary:
                              Color.fromARGB(255, 61, 24, 109), // Button color
                          onPrimary: Colors.white, // Text color
                          padding: const EdgeInsets.symmetric(
                              vertical: 12.0, horizontal: 24.0),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10.0),
                          ),
                        ),
                        child: const Text('Login'),
                      ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text('Don\'t have an account?'),
                    TextButton(
                      onPressed: _handleCreateAccount,
                      child: const Text(
                        'Create Account',
                        style: TextStyle(color: Colors.blue),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
