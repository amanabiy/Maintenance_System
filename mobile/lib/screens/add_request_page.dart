// ignore_for_file: use_build_context_synchronously

import 'dart:io';
import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:image_picker/image_picker.dart';
import 'package:mobile/network/endpoints.dart';
import 'package:mobile/providers/api_provider.dart';
import 'package:mobile/screens/nav_bar.dart';
import 'package:mobile/screens/requests_list_page.dart';
import 'package:dio/dio.dart';
import 'package:http_parser/http_parser.dart';
import 'package:mobile/screens/util/custom_app_bar.dart';
import 'package:mobile/screens/util/custom_scaffold.dart';
import 'package:permission_handler/permission_handler.dart';

class AddRequestPage extends StatefulWidget {
  const AddRequestPage({super.key});

  @override
  _AddRequestPageState createState() => _AddRequestPageState();
}

class _AddRequestPageState extends State<AddRequestPage> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _subject = TextEditingController();
  final TextEditingController _description = TextEditingController();
  final TextEditingController _blockNumber = TextEditingController();
  final TextEditingController _floor = TextEditingController();
  final TextEditingController _roomNumber = TextEditingController();
  bool _isToilet = false;
  List<XFile> _selectedImages = [];
  List<Map<String, dynamic>> _uploadedFiles = [];

  @override
  void dispose() {
    _subject.dispose();
    _description.dispose();
    _blockNumber.dispose();
    _floor.dispose();
    _roomNumber.dispose();
    super.dispose();
  }

  Future<void> pickImage() async {
    final picker = ImagePicker();
    final source = await _showPickerOptions(context);
    if (source == null) return;

    final XFile image;
    if (source == ImageSource.camera) {
      image = (await picker.pickImage(source: ImageSource.camera))!;
    } else {
      image = (await picker.pickImage(source: ImageSource.gallery))!;
    }

    if (image != null) {
      setState(() {
        _selectedImages.add(image);
      });
    }
  }

  Future<void> _checkLocationPermission() async {
    if (await Permission.location.isGranted) {
      // You can use the location
    } else {
      // Request permission
      PermissionStatus status = await Permission.location.request();
      if (status.isGranted) {
        // You can use the location
      } else {
        // Permission denied
        if (mounted) {
          showFailureSnackBar(context, 'Location permission denied');
        }
      }
    }
  }

  Future<ImageSource?> _showPickerOptions(BuildContext context) async {
    return await showModalBottomSheet<ImageSource>(
      context: context,
      builder: (BuildContext context) {
        return SafeArea(
          child: Wrap(
            children: <Widget>[
              ListTile(
                leading: const Icon(Icons.photo_library),
                title: const Text('Photo Library'),
                onTap: () {
                  Navigator.of(context).pop(ImageSource.gallery);
                },
              ),
              ListTile(
                leading: const Icon(Icons.photo_camera),
                title: const Text('Camera'),
                onTap: () {
                  Navigator.of(context).pop(ImageSource.camera);
                },
              ),
            ],
          ),
        );
      },
    );
  }

  Future<void> _uploadImages() async {
    print("Uploading all images");
    for (var image in _selectedImages) {
      await _uploadFile(image);
    }
  }

  Future<void> _uploadFile(XFile file) async {
    try {
      final formData = FormData.fromMap({
        'file': await MultipartFile.fromFile(
          file.path,
          filename: file.name,
          contentType: MediaType('image', file.path.split('.').last),
        ),
      });

      final response = await Api().upload(Endpoints.uploadFile, formData);
      print(response.data);
      if (response.statusCode == 200 || response.statusCode == 201) {
        final fileUrl = response.data['fileUrl'];
        if (mounted) {
          setState(() {
            _uploadedFiles.add({
              'id': response.data['id'],
              'name': file.name,
              'path': fileUrl
            });
          });
          showSuccessSnackBar(context, 'File uploaded successfully');
        }
      } else {
        if (mounted) {
          showFailureSnackBar(
              context, 'Error uploading file: ${response.statusMessage}');
        }
      }
    } catch (e) {
      print('Error uploading file: $e');
      if (mounted) {
        showFailureSnackBar(context, 'Error uploading file: ${e}');
      }
    }
  }

  Future<void> _submitRequest(String subject, String description,
      String blockNumber, String floor, String roomNumber, bool isToilet,
      [double latitude = 0.0, double longitude = 0.0]) async {
    // Check and request location permission
    await _checkLocationPermission();
    if (!_formKey.currentState!.validate()) {
      return;
    }

    try {
      final blockNumberInt = int.parse(blockNumber);
      final floorInt = int.parse(floor);

      _formKey.currentState!.save();

      await _uploadImages();
      Position position = await Geolocator.getCurrentPosition(
          desiredAccuracy: LocationAccuracy.high);

      final body = {
        "subject": subject,
        "description": description,
        "locationCreate": {
          "blockNumber": blockNumberInt,
          "floor": floorInt,
          "latitude": position.latitude,
          "longitude": position.longitude,
          "roomNumber": roomNumber,
          "isToilet": isToilet,
        },
        "mediaIds": _uploadedFiles.map((file) => file['id']!).toList(),
      };

      final response = await Api().post(Endpoints.createRequest, body);
      if (response.statusCode == 201 || response.statusCode == 200) {
        if (mounted) {
          showSuccessSnackBar(context, 'Request submitted successfully');
          Future.delayed(const Duration(seconds: 1), () {
            Navigator.pushReplacement(
              context,
              MaterialPageRoute(builder: (context) => HomePage()),
            );
          });
        }
      } else {
        final errorMessage = response.data['message'] ??
            'Error submitting request. Please try again.';
        if (mounted) {
          showFailureSnackBar(context, 'Failed to add request: $errorMessage');
        }
      }
    } catch (e) {
      print(e);
      if (mounted) {
        showFailureSnackBar(context, 'Failed to add request: $e');
      }
    }
  }

  void _removeFile(String name) {
    setState(() {
      try {
        _uploadedFiles.removeWhere((file) => file['name'] == name);
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error deleting file: $e')),
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(title: 'Add Request'),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                TextFormField(
                  decoration: InputDecoration(
                    hintText: 'Enter the subject of the maintenance request',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.all(Radius.circular(12.0)),
                    ),
                    prefixIcon: Icon(Icons.subject,
                        color: Color.fromARGB(255, 61, 24, 109)),
                    filled: true,
                    fillColor: Colors.grey[200],
                    contentPadding:
                        EdgeInsets.symmetric(vertical: 20.0, horizontal: 10.0),
                  ),
                  controller: _subject,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter a subject.';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 16.0),
                TextFormField(
                  decoration: InputDecoration(
                    hintText:
                        'Enter a detailed description of the maintenance request. Provide as much information as possible to help the maintenance team understand the issue.',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.all(Radius.circular(12.0)),
                    ),
                    prefixIcon: Icon(Icons.description,
                        color: Color.fromARGB(255, 61, 24, 109)),
                    filled: true,
                    fillColor: Colors.grey[200],
                    contentPadding:
                        EdgeInsets.symmetric(vertical: 20.0, horizontal: 10.0),
                  ),
                  controller: _description,
                  maxLines: 5,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter a description. Describe the issue in detail to ensure the maintenance team has all the necessary information.';
                    }
                    if (value.length < 10) {
                      return 'The description is too short. Please provide more details.';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 16.0),
                TextFormField(
                  keyboardType: TextInputType.number,
                  decoration: InputDecoration(
                    hintText: 'Enter block number',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.all(Radius.circular(12.0)),
                    ),
                    prefixIcon: Icon(Icons.location_city,
                        color: Color.fromARGB(255, 61, 24, 109)),
                    filled: true,
                    fillColor: Colors.grey[200],
                    contentPadding:
                        EdgeInsets.symmetric(vertical: 20.0, horizontal: 10.0),
                  ),
                  controller: _blockNumber,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter a block number.';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 8.0),
                TextFormField(
                  keyboardType: TextInputType.number,
                  decoration: InputDecoration(
                    hintText: 'Enter floor number',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.all(Radius.circular(12.0)),
                    ),
                    prefixIcon: Icon(Icons.layers,
                        color: Color.fromARGB(255, 61, 24, 109)),
                    filled: true,
                    fillColor: Colors.grey[200],
                    contentPadding:
                        EdgeInsets.symmetric(vertical: 20.0, horizontal: 10.0),
                  ),
                  controller: _floor,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter a floor number.';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 8.0),
                Row(
                  children: [
                    const Text('Is Toilet:'),
                    const SizedBox(width: 8.0),
                    Checkbox(
                      value: _isToilet,
                      onChanged: (value) => setState(() => _isToilet = value!),
                    ),
                  ],
                ),
                const SizedBox(height: 8.0),
                if (!_isToilet)
                  TextFormField(
                    decoration: InputDecoration(
                      hintText: 'Enter room number (optional)',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(12.0)),
                      ),
                      prefixIcon: Icon(Icons.meeting_room,
                          color: Color.fromARGB(255, 61, 24, 109)),
                      filled: true,
                      fillColor: Colors.grey[200],
                      contentPadding: EdgeInsets.symmetric(
                          vertical: 20.0, horizontal: 10.0),
                    ),
                    controller: _roomNumber,
                  ),
                const SizedBox(height: 16.0),
                _selectedImages.isNotEmpty
                    ? SingleChildScrollView(
                        scrollDirection: Axis.horizontal,
                        child: Row(
                          children: _selectedImages.map((image) {
                            return Stack(
                              children: [
                                Image.file(
                                  File(image.path),
                                  width: 100,
                                  height: 100,
                                  fit: BoxFit.cover,
                                ),
                                Positioned(
                                  right: 0,
                                  top: 0,
                                  child: GestureDetector(
                                    onTap: () {
                                      setState(() {
                                        _selectedImages.remove(image);
                                        _removeFile(image.path);
                                      });
                                    },
                                    child: Container(
                                      color: Colors.red,
                                      child: const Icon(
                                        Icons.close,
                                        color: Colors.white,
                                      ),
                                    ),
                                  ),
                                ),
                              ],
                            );
                          }).toList(),
                        ),
                      )
                    : Container(),
                const SizedBox(height: 16.0),
                Row(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          'Upload Image',
                          style: TextStyle(
                            fontSize: 16.0,
                            color: Color.fromARGB(255, 61, 24, 109),
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        SizedBox(
                            width: 12.0), // Add space between text and icon
                        IconButton(
                          icon: Icon(Icons.file_upload,
                              color: Color.fromARGB(255, 61, 24, 109)),
                          iconSize: 36.0,
                          onPressed: pickImage,
                        ),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 16.0),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () => _submitRequest(
                      _subject.text,
                      _description.text,
                      _blockNumber.text,
                      _floor.text,
                      _roomNumber.text,
                      _isToilet,
                    ),
                    style: ElevatedButton.styleFrom(
                      padding: EdgeInsets.symmetric(vertical: 16.0),
                      primary: Color.fromARGB(255, 61, 24, 109), // Button color
                      onPrimary: Colors.white, // Text color
                      textStyle: TextStyle(
                        fontSize: 18.0,
                        fontWeight: FontWeight.bold,
                      ),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10.0),
                      ),
                    ),
                    child: const Text('Submit Request'),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
