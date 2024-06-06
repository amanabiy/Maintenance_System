// lib/screens/user_page.dart
import 'package:flutter/material.dart';
import 'package:mobile/models/UserModel.dart';
import 'package:mobile/network/endpoints.dart';
import 'package:mobile/providers/api_provider.dart';

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
  bool isLoading = true;
  final Api api = Api();

  @override
  void initState() {
    super.initState();
    fetchUserData();
  }

  Future<void> fetchUserData() async {
    try {
      final response = await api.get(Endpoints.getMyProfile);
      user = User.fromJson(response.data);
      print(response.data);
      nameController = TextEditingController(text: user.fullName);
      emailController = TextEditingController(text: user.email);
      phoneController = TextEditingController(text: user.phoneNumber);
      setState(() {
        isLoading = false;
      });
    } catch (e) {
      setState(() {
        isLoading = false;
      });
    }
  }

  void toggleEditMode() {
    setState(() {
      isEditMode = !isEditMode;
    });
  }

void saveChanges() async {
  if (nameController.text.isEmpty || emailController.text.isEmpty || phoneController.text.isEmpty) {
    // Show an error message or handle the empty fields appropriately
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('All fields must be filled out')),
    );
    return;
  }

  setState(() {
    isLoading = true;
  });

  try {
    final updatedUser = {
      'fullName': nameController.text,
      'email': emailController.text,
      'phoneNumber': phoneController.text,
    };
    print(updatedUser);
    await api.patch(Endpoints.updateMyProfile, updatedUser);

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
      isLoading = false;
    });
  } catch (e) {
    setState(() {
      isLoading = false;
    });
    print(e.toString());
    // Handle the error, show a message, etc.
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('Failed to update profile: $e')),
    );
  }
}


  void cancelChanges() {
    setState(() {
      nameController.text = user.fullName!;
      emailController.text = user.email!;
      phoneController.text = user.phoneNumber ?? "+251XXXXXXXXX";
      isEditMode = false;
    });
  }

  @override
  void dispose() {
    nameController.dispose();
    emailController.dispose();
    phoneController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('User Page'),
        actions: [
          if (!isLoading)
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
      body: isLoading
          ? Center(child: CircularProgressIndicator())
          : Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Center(
                    child: Stack(
                      children: [
                        CircleAvatar(
                          backgroundImage: AssetImage('assets/image/profile_placeholder.jpg'),
                          radius: 65,
                        ),
                        Positioned(
                          bottom: 0,
                          right: 0,
                          child: CircleAvatar(
                            backgroundColor: Colors.grey,
                            radius: 20,
                            child: IconButton(
                              onPressed: () {
                                print("open image picker");
                              },
                              icon: const Icon(
                                Icons.edit_rounded,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 16),
                  isEditMode
                      ? TextField(
                          controller: nameController,
                          decoration: InputDecoration(
                            labelText: 'Name',
                            border: OutlineInputBorder(),
                            filled: true,
                            fillColor: Colors.white,
                          ),
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                            color: Colors.black,
                          ),
                          textAlign: TextAlign.center,
                        )
                      : Column(
                          children: [
                            Text(
                              user.fullName!,
                              style: TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                  SizedBox(height: 24),
                  Padding(
                    padding: const EdgeInsets.symmetric(vertical: 8.0),
                    child: isEditMode
                        ? TextField(
                            controller: emailController,
                            decoration: InputDecoration(
                              labelText: 'Email',
                              border: OutlineInputBorder(),
                              filled: true,
                              fillColor: Colors.white,
                            ),
                            style: TextStyle(
                              fontSize: 16,
                              color: Colors.black,
                            ),
                          )
                        : ListTile(
                            title: Text(
                              user.email!,
                              style: TextStyle(
                                fontSize: 16,
                              ),
                            ),
                            subtitle: Text(
                              'Email',
                              style: TextStyle(
                                fontSize: 16,
                                color: Colors.grey[600],
                              ),
                            ),
                          ),
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(vertical: 8.0),
                    child: isEditMode
                        ? TextField(
                            controller: phoneController,
                            decoration: InputDecoration(
                              labelText: 'Phone Number',
                              border: OutlineInputBorder(),
                              filled: true,
                              fillColor: Colors.white,
                            ),
                            style: TextStyle(
                              fontSize: 16,
                              color: Colors.black,
                            ),
                          )
                        : ListTile(
                            title: Text(
                              user.phoneNumber ?? '',
                              style: TextStyle(
                                fontSize: 16,
                              ),
                            ),
                            subtitle: Text(
                              'Phone Number (Format +251XXXXXXXXX)',
                              style: TextStyle(
                                fontSize: 16,
                                color: Colors.grey[600],
                              ),
                            ),
                          ),
                  ),
                ],
              ),
            ),
    );
  }
}
