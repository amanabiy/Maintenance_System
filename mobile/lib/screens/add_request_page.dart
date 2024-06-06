// ignore_for_file: use_build_context_synchronously

import 'dart:io';
import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:mobile/network/endpoints.dart';
import 'package:mobile/providers/api_provider.dart';
import 'package:mobile/screens/nav_bar.dart';
import 'package:mobile/screens/requests_list_page.dart';
import 'package:dio/dio.dart';
import 'package:http_parser/http_parser.dart';
import 'package:mobile/screens/util/custom_scaffold.dart';

class AddRequestPage extends StatefulWidget {
  const AddRequestPage({super.key});

  @override
  _AddRequestPageState createState() => _AddRequestPageState();
}

class _AddRequestPageState extends State<AddRequestPage> {
  final _formKey = GlobalKey<FormState>();
  TextEditingController _subject = TextEditingController();
  TextEditingController _description = TextEditingController();
  TextEditingController _blockNumber = TextEditingController();
  TextEditingController _floor = TextEditingController();
  TextEditingController _roomNumber = TextEditingController();
  bool _isToilet = false;
  List<XFile> _selectedImages = [];
  List<Map<String, dynamic>> _uploadedFiles = [];

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
        setState(() {
          _uploadedFiles.add(
              {'id': response.data['id'], 'name': file.name, 'path': fileUrl});
        });
        showSuccessSnackBar(context, 'File uploaded successfully');
      } else {
        showFailureSnackBar(context, 'Error uploading file: ${response.statusMessage}');
      }
    } catch (e) {
      print('Error uploading file: $e');
      showFailureSnackBar(context, 'Error uploading file: ${e}');
    }
  }

  Future<void> _submitRequest(String subject, String description,
      String blockNumber, String floor, String roomNumber, bool isToilet,
      [double latitude = 0.0, double longitude = 0.0]) async {
    if (!_formKey.currentState!.validate()) {
      return;
    }

    try {
      final blockNumberInt = int.parse(blockNumber);
      final floorInt = int.parse(floor);

      _formKey.currentState!.save();

      await _uploadImages();

      final body = {
        "subject": subject,
        "description": description,
        "locationCreate": {
          "blockNumber": blockNumberInt,
          "floor": floorInt,
          "latitude": latitude,
          "longitude": longitude,
          "roomNumber": roomNumber,
          "isToilet": isToilet,
        },
        "mediaIds": _uploadedFiles.map((file) => file['id']!).toList(),
      };

      final response = await Api().post(Endpoints.createRequest, body);
      if (response.statusCode == 201 || response.statusCode == 200) {
        showSuccessSnackBar(context, 'Request submitted successfully');
        Future.delayed(const Duration(seconds: 1), () {
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (context) => HomePage()),
          );
        });
      } else {
        final errorMessage = response.data['message'] ??
            'Error submitting request. Please try again.';
        showFailureSnackBar(context, 'Failed to add request: $errorMessage');
      }
    } catch (e) {
      print(e);
      showFailureSnackBar(context, 'Failed to add request: $e');
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
      appBar: AppBar(
        title: const Text('Add Maintenance Request'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Card(
          elevation: 8.0,
          shape:
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Form(
              key: _formKey,
              child: SingleChildScrollView(
                child: Column(
                  children: [
                    TextFormField(
                      decoration: InputDecoration(
                        labelText: 'Subject',
                        border: OutlineInputBorder(),
                        prefixIcon: Icon(Icons.subject),
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
                        labelText: 'Description',
                        border: OutlineInputBorder(),
                        prefixIcon: Icon(Icons.description),
                      ),
                      controller: _description,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter a description.';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 16.0),
                    Row(
                      children: [
                        const Text('Block Number:'),
                        const SizedBox(width: 8.0),
                        Expanded(
                          child: TextFormField(
                            keyboardType: TextInputType.number,
                            decoration: InputDecoration(
                              hintText: 'Enter block number',
                              border: OutlineInputBorder(),
                              prefixIcon: Icon(Icons.location_city),
                            ),
                            controller: _blockNumber,
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return 'Please enter a block number.';
                              }
                              return null;
                            },
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8.0),
                    Row(
                      children: [
                        const Text('Floor:'),
                        const SizedBox(width: 8.0),
                        Expanded(
                          child: TextFormField(
                            keyboardType: TextInputType.number,
                            decoration: InputDecoration(
                              hintText: 'Enter floor number',
                              border: OutlineInputBorder(),
                              prefixIcon: Icon(Icons.layers),
                            ),
                            controller: _floor,
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return 'Please enter a floor number.';
                              }
                              return null;
                            },
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8.0),
                    Row(
                      children: [
                        const Text('Room Number:'),
                        const SizedBox(width: 8.0),
                        Expanded(
                          child: TextFormField(
                            decoration: InputDecoration(
                              hintText: 'Enter room number (optional)',
                              border: OutlineInputBorder(),
                              prefixIcon: Icon(Icons.meeting_room),
                            ),
                            controller: _roomNumber,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8.0),
                    Row(
                      children: [
                        const Text('Is Toilet:'),
                        const SizedBox(width: 8.0),
                        Checkbox(
                          value: _isToilet,
                          onChanged: (value) =>
                              setState(() => _isToilet = value!),
                        ),
                      ],
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
                    IconButton(
                      icon: Icon(Icons.upload_file),
                      onPressed: pickImage,
                    ),
                    const SizedBox(height: 16.0),
                    ElevatedButton(
                      onPressed: () => _submitRequest(
                          _subject.text,
                          _description.text,
                          _blockNumber.text,
                          _floor.text,
                          _roomNumber.text,
                          _isToilet),
                      child: const Text('Submit Request'),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
