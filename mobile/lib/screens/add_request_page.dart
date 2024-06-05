import 'package:flutter/material.dart';
import 'package:http/http.dart' as http; // Import for making API requests
import 'dart:convert';

import 'package:mobile/network/endpoints.dart';
import 'package:mobile/providers/api_provider.dart';
import 'package:mobile/screens/nav_bar.dart';
import 'package:mobile/screens/requests_list_page.dart';

class AddRequestPage extends StatefulWidget {
  const AddRequestPage({super.key});

  @override
  _AddRequestPageState createState() => _AddRequestPageState();
}

class _AddRequestPageState extends State<AddRequestPage> {
  final _formKey = GlobalKey<FormState>(); // Key for form validation
  TextEditingController _subject = TextEditingController();
  TextEditingController _description = TextEditingController();
  TextEditingController _blockNumber = TextEditingController();
  TextEditingController _floor = TextEditingController();
  TextEditingController _roomNumber = TextEditingController();
  bool _isToilet = false;

  Future<void> _submitRequest(String subject, String description,
      String blockNumber, String floor, String roomNumber, bool isToilet,
      [double latitude = 0.0, double longitude = 0.0]) async {
    try {
      if (!_formKey.currentState!.validate()) {
        return; // Don't submit if form is invalid
      }

      // cast blockNumber to int
      final blockNumberInt = int.parse(blockNumber);

      // cast floor to int
      final floorInt = int.parse(floor);

      _formKey.currentState!.save(); // Save form data

      final body = {
        "subject": subject,
        "description": description,
        "locationCreate": {
          "blockNumber": blockNumberInt,
          "floor": floorInt,
          "latitude": 0.0, // Replace with actual latitude if needed
          "longitude": 0.0, // Replace with actual longitude if needed
          "roomNumber": roomNumber,
          "isToilet": isToilet,
        },
      };
      print("data sent");
      print(body);

      final response = await Api().post(Endpoints.createRequest, body);
      print(response.data);
      print(response.statusCode);
      if (response.statusCode == 201 || response.statusCode == 200) {
        // Handle successful request creation
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Request submitted successfully')),
        );
        // Navigate to the RequestsPage after a short delay
        Future.delayed(const Duration(seconds: 1), () {
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (context) => HomePage()),
          );
        });
      } else {
        // Handle API request errors
        print('Error creating request: ${response.statusCode}');
        final errorMessage = response.data['message'] ??
            'Error submitting request. Please try again.';
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(errorMessage)),
        );
      }
    } catch (e) {
      print(e);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(e.toString())),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Add Maintenance Request'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: SingleChildScrollView(
            child: Column(
              children: [
                TextFormField(
                  decoration: const InputDecoration(
                    labelText: 'Subject',
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
                  decoration: const InputDecoration(
                    labelText: 'Description',
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter a description.';
                    }
                    return null;
                  },
                  controller: _description,
                ),
                const SizedBox(height: 16.0),
                Row(
                  children: [
                    const Text('Block Number:'),
                    const SizedBox(width: 8.0),
                    Expanded(
                      child: TextFormField(
                        keyboardType: TextInputType.number,
                        decoration: const InputDecoration(
                          hintText: 'Enter block number',
                        ),
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Please enter a block number.';
                          }
                          return null;
                        },
                        controller: _blockNumber,
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
                        decoration: const InputDecoration(
                          hintText: 'Enter floor number',
                        ),
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Please enter a floor number.';
                          }
                          return null;
                        },
                        controller: _floor,
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
                        decoration: const InputDecoration(
                          hintText: 'Enter room number (optional)',
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
                      onChanged: (value) => setState(() => _isToilet = value!),
                    ),
                  ],
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
    );
  }
}
