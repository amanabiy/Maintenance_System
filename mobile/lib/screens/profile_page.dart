import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:mobile/models/UserModel.dart';
import 'package:mobile/network/endpoints.dart';
import 'package:mobile/providers/api_provider.dart';
import 'package:mobile/screens/authentication/login_page.dart';
import 'package:mobile/screens/util/custom_scaffold.dart';

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
  FlutterSecureStorage _storage = FlutterSecureStorage();
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
    if (nameController.text.isEmpty ||
        emailController.text.isEmpty ||
        phoneController.text.isEmpty) {
      showFailureSnackBar(context, 'All fields must be filled out');
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
      showSuccessSnackBar(context, 'Profile updated successfully!');
    } catch (e) {
      setState(() {
        isLoading = false;
      });
      print(e.toString());
      showFailureSnackBar(context, 'Failed to update profile: $e');
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

  void logout() async {
    // clear all login information from the secure storage
    // and go to login screen
    await _storage.delete(
      key: 'accessToken',
    );
    await _storage.delete(
      key: 'refreshToken',
    );
    Navigator.pushAndRemoveUntil(
        context,
        MaterialPageRoute(builder: (context) => const LoginPage()),
        (route) => false);
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
        title: Text('Profile'),
        actions: [
          IconButton(
            icon: Icon(Icons.logout),
            onPressed: logout,
          ),
        ],
      ),
      body: isLoading
          ? Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Center(
                      child: Stack(
                        children: [
                          CircleAvatar(
                            backgroundImage: AssetImage(
                                'assets/image/profile_placeholder.png'),
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
                              fontSize: 16,
                              color: Colors.black,
                            ),
                          )
                        : Column(
                            children: [
                              Text(
                                user.fullName!,
                                style: TextStyle(
                                  fontSize: 25,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ],
                          ),
                    Padding(
                      padding: const EdgeInsets.symmetric(vertical: 20.0),
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
                                  fontSize: 20,
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
                                user.phoneNumber ?? 'No phone number',
                                style: TextStyle(
                                  fontSize: 20,
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
                    SizedBox(height: 30),
                    if (!isLoading)
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16.0),
                        child: isEditMode
                            ? Row(
                                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                                children: [
                                  Expanded(
                                    child: ElevatedButton(
                                      onPressed: saveChanges,
                                      child: Text('Save'),
                                      style: ElevatedButton.styleFrom(
                                        padding:
                                            EdgeInsets.symmetric(vertical: 15),
                                        textStyle: TextStyle(fontSize: 16),
                                      ),
                                    ),
                                  ),
                                  SizedBox(width: 16),
                                  Expanded(
                                    child: ElevatedButton(
                                      onPressed: cancelChanges,
                                      child: Text('Cancel'),
                                      style: ElevatedButton.styleFrom(
                                        padding:
                                            EdgeInsets.symmetric(vertical: 15),
                                        textStyle: TextStyle(fontSize: 16),
                                      ),
                                    ),
                                  ),
                                ],
                              )
                            : Align(
                                alignment: Alignment.bottomCenter,
                                child: ElevatedButton(
                                  onPressed: toggleEditMode,
                                  child: Text('Edit Profile'),
                                  style: ElevatedButton.styleFrom(
                                    padding: EdgeInsets.symmetric(
                                        vertical: 15, horizontal: 30),
                                    textStyle: TextStyle(fontSize: 16),
                                  ),
                                ),
                              ),
                      ),
                  ],
                ),
              ),
            ),
    );
  }
}
