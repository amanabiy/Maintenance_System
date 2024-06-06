// lib/screens/user_page.dart
import 'package:flutter/material.dart';
import 'package:mobile/models/UserModel.dart';

class UserPage extends StatefulWidget {
  @override
  _UserPageState createState() => _UserPageState();
}

class _UserPageState extends State<UserPage> {
  late User user;
  bool isEditMode = false;
  late TextEditingController nameController;
  late TextEditingController emailController;
  late TextEditingController phoneController;

  @override
  void initState() {
    super.initState();
    // Initializing user with dummy data
    user = User(
      id: 4,
      createdAt: DateTime.parse("2024-06-05T16:20:49.954Z"),
      updatedAt: DateTime.parse("2024-06-06T04:59:18.000Z"),
      email: "user@example.com",
      fullName: "stringgg",
      phoneNumber: "+251988135784",
      isVerified: true,
      lastPasswordUpdatedAt: DateTime.parse("2024-06-05T16:20:49.000Z"),
      role: Role(
        id: 31,
        createdAt: DateTime.parse("2024-06-05T14:19:26.793Z"),
        updatedAt: DateTime.parse("2024-06-05T14:19:26.793Z"),
        roleName: "STUDENT", permissions: [],
      ),
      department: null,
    );

    // Initialize controllers
    nameController = TextEditingController(text: user.fullName);
    emailController = TextEditingController(text: user.email);
    phoneController = TextEditingController(text: user.phoneNumber);
  }

  @override
  void dispose() {
    nameController.dispose();
    emailController.dispose();
    phoneController.dispose();
    super.dispose();
  }

  void toggleEditMode() {
    setState(() {
      isEditMode = !isEditMode;
    });
  }

  void saveChanges() {
    setState(() {
      user = User(
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: DateTime.now(),
        email: emailController.text,
        fullName: nameController.text,
        phoneNumber: phoneController.text,
        isVerified: user.isVerified,
        lastPasswordUpdatedAt: user.lastPasswordUpdatedAt,
        role: user.role,
        department: user.department,
      );
      isEditMode = false;
    });
  }

  void cancelChanges() {
    setState(() {
      nameController.text = user.fullName!;
      emailController.text = user.email!;
      phoneController.text = user.phoneNumber!;
      isEditMode = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('User Page'),
        actions: [
          IconButton(
            icon: Icon(isEditMode ? Icons.check : Icons.edit),
            onPressed: isEditMode ? saveChanges : toggleEditMode,
          ),
          if (isEditMode)
            IconButton(
              icon: Icon(Icons.close),
              onPressed: cancelChanges,
            ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            CircleAvatar(
              radius: 50,
              backgroundImage: AssetImage('assets/image/profile_placeholder.jpg'), // Make sure you have a dummy profile picture in your assets
            ),
            SizedBox(height: 16),
            TextField(
              controller: nameController,
              enabled: isEditMode,
              decoration: InputDecoration(
                labelText: 'Name',
                border: OutlineInputBorder(),
                filled: !isEditMode,
                fillColor: !isEditMode ? Colors.grey[200] : null,
              ),
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: isEditMode ? Colors.black : Colors.grey[700],
              ),
            ),
            SizedBox(height: 8),
            TextField(
              controller: emailController,
              enabled: isEditMode,
              decoration: InputDecoration(
                labelText: 'Email',
                border: OutlineInputBorder(),
                filled: !isEditMode,
                fillColor: !isEditMode ? Colors.grey[200] : null,
              ),
              style: TextStyle(
                fontSize: 16,
                color: isEditMode ? Colors.black : Colors.grey[700],
              ),
            ),
            SizedBox(height: 8),
            TextField(
              controller: phoneController,
              enabled: isEditMode,
              decoration: InputDecoration(
                labelText: 'Phone Number',
                border: OutlineInputBorder(),
                filled: !isEditMode,
                fillColor: !isEditMode ? Colors.grey[200] : null,
              ),
              style: TextStyle(
                fontSize: 16,
                color: isEditMode ? Colors.black : Colors.grey[700],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
