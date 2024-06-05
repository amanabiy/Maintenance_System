import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:mobile/screens/nav_bar.dart';
import 'package:provider/provider.dart';
import 'screens/authentication/login_page.dart';
import 'providers/auth_provider.dart'; // Ensure this import exists

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  const storage = FlutterSecureStorage();
  bool isLoggedIn = false;
  final token = await storage.read(key: 'accessToken');  
  if (token != null) {
    isLoggedIn = true;
  }
  runApp(MyApp(isLoggedIn: isLoggedIn));
}

class MyApp extends StatelessWidget {
  final bool isLoggedIn;
  const MyApp({super.key, required this.isLoggedIn});

  @override
  Widget build(BuildContext context) {
    
    return ChangeNotifierProvider(
      create: (context) => AuthProvider(),
      child: Consumer<AuthProvider>(
        builder: (context, authProvider, child) {
          return MaterialApp(
            title: 'Maintenance Demo',
            theme: ThemeData(
              primarySwatch: Colors.blue,
            ),
            home: isLoggedIn? const HomePage() : const LoginPage(),
          );
        },
      ),
    );
  }
}
