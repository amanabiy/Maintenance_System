import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http; // Import for making API requests
import 'dart:convert';

import 'package:mobile/models/RequestsModel.dart';
import 'package:mobile/network/endpoints.dart';
import 'package:mobile/providers/api_provider.dart';
import 'package:mobile/screens/authentication/login_page.dart';
import 'package:mobile/screens/request_page.dart';
import 'package:mobile/screens/util/custom_app_bar.dart';
import 'package:mobile/screens/util/custom_scaffold.dart'; // Import for JSON decoding

class RequestsPage extends StatefulWidget {
  const RequestsPage({super.key});

  @override
  // ignore: library_private_types_in_public_api
  _RequestsPageState createState() => _RequestsPageState();
}

class _RequestsPageState extends State<RequestsPage> {
  RequestsModel? requests; // Store the entire response data
  FlutterSecureStorage _storage = FlutterSecureStorage();
  String selectedFilter = 'Assigned to Me';

  // Define the mapping between filter names and endpoints
  final Map<String, String> filterEndpoints = {
    'Assigned to Me': Endpoints.assignedToMeRequests,
    'Handled by My Department': Endpoints.departmentRequests,
    'By My Role': Endpoints.requestsAssignedToMyRole,
    'My Requests': Endpoints.myRequests,
  };

  final Map<String, Color> statusTextColors = {
    'SUBMITTED': Colors.blue,
    'IN_PROGRESS': Colors.yellow[800]!,
    'CANCELLED': Colors.red,
    'DONE': Colors.green,
    'Unknown': Colors.grey,
  };

  final Map<String, Color> statusColors = {
    'SUBMITTED': Colors.blue.withOpacity(0.2),
    'IN_PROGRESS': Colors.yellow.withOpacity(0.2),
    'CANCELLED': Colors.red.withOpacity(0.2),
    'DONE': Colors.green.withOpacity(0.2),
    'Unknown': Colors.grey.withOpacity(0.2),
  };

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

  Future<void> fetchRequests() async {
    // Get the endpoint based on the selected filter
    String endpoint = filterEndpoints[selectedFilter] ?? Endpoints.myRequests;

    try {
      final response = await Api().get(endpoint);
      if (response.statusCode == 200) {
        print("Requests fetched successfully");
        try {
          requests = RequestsModel.fromJson(response.data);
        } catch (e) {
          print(e);
          throw Exception('Failed to decode requests: $e');
        }
        print("set fine");
        if (mounted) {
          setState(() {}); // Update UI after fetching data
        }
      } else if (response.statusCode == 401) {
        // Handle unauthorized requests here
        if (mounted) {
          showFailureSnackBar(context, 'Unauthorized request');
        }
        print("Unauthorized request");
        logout();
      }
    } catch (e) {
      // Handle API request errors here
      print('Error fetching requests: ${e}');
      if (mounted) {
        showFailureSnackBar(context, 'Failed to fetch requests: $e');
        // throw Exception('Failed to fetch requests: $e');
      }
    }
  }

  @override
  void initState() {
    super.initState();
    fetchRequests(); // Call fetch function on initialization
  }
 @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(title: 'Requests'),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          children: [
            DropdownButton<String>(
              value: selectedFilter,
              items: filterEndpoints.keys.map((String value) {
                return DropdownMenuItem<String>(
                  value: value,
                  child: Text(value),
                );
              }).toList(),
              onChanged: (String? newValue) {
                setState(() {
                  selectedFilter = newValue!;
                  fetchRequests();
                });
              },
            ),
            Expanded(
              child: requests == null
                  ? const Center(
                      child: CircularProgressIndicator(),
                    )
                  : (requests?.items == null || requests!.items.isEmpty)
                      ? const Center(
                          child: Text("No requests until now"),
                        )
                      : ListView.builder(
                          itemCount: requests!.items.length,
                          itemBuilder: (context, index) {
                            final request = requests!.items[index];
                            return Card(
                              margin: const EdgeInsets.symmetric(vertical: 8.0),
                              elevation: 4.0,
                              // color: getStatusCardColor(request?.requestStatuses?.first?.statusType?.name ?? "Unknown"),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(10.0),
                              ),
                              child: InkWell(
                                onTap: () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder: (context) => RequestDetailPage(
                                          requestId: request!.id!),
                                    ),
                                  );
                                },
                                child: Padding(
                                  padding: const EdgeInsets.all(12.0),
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Row(
                                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                        children: [
                                          Expanded(
                                            child: Text(
                                              request?.subject ?? "",
                                              style: const TextStyle(
                                                fontSize: 16.0,
                                                fontWeight: FontWeight.bold,
                                                color: Colors.black,
                                              ),
                                            ),
                                          ),
                                          Text(
                                            formatDate(request.createdAt ?? DateTime.now()),
                                            style: const TextStyle(
                                              fontSize: 12.0,
                                              color: Colors.grey,
                                            ),
                                          ),
                                        ],
                                      ),
                                      const SizedBox(height: 8.0),
                                      Text(
                                        request!.description!.length > 100
                                            ? '${request!.description?.substring(0, 100)}...'
                                            : request?.description ?? "",
                                        style: const TextStyle(
                                          fontSize: 14.0,
                                          color: Colors.black87,
                                        ),
                                      ),
                                      const SizedBox(height: 8.0),
                                      getStatusWidget(request?.requestStatuses?.first?.statusType?.name ?? "Unknown"),
                                      const SizedBox(height: 8.0),
                                      Wrap(
                                        children: request
                                                ?.maintenanceRequestTypes
                                                ?.map((type) => Container(
                                                      margin: const EdgeInsets.symmetric(horizontal: 4.0),
                                                      padding: const EdgeInsets.all(4.0),
                                                      decoration: BoxDecoration(
                                                        color: Colors.blue.withOpacity(0.2),
                                                        borderRadius: BorderRadius.circular(4.0),
                                                      ),
                                                      child: Text(
                                                        type.name ?? "",
                                                        style: const TextStyle(
                                                          fontSize: 12.0,
                                                          color: Colors.blue,
                                                        ),
                                                      ),
                                                    ))
                                                .toList() ??
                                            [],
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            );
                          },
                        ),
            ),
          ],
        ),
      ),
    );
  }

  Color getStatusCardColor(String status) {
    return statusColors[status] ?? statusColors['Unknown']!;
  }

  Widget getStatusWidget(String status) {
    Color backgroundColor = statusColors[status] ?? statusColors['Unknown']!;
    Color textColor = statusTextColors[status] ?? statusTextColors['Unknown']!;

    return Container(
      padding: const EdgeInsets.symmetric(vertical: 4.0, horizontal: 8.0),
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: BorderRadius.circular(4.0),
      ),
      child: Text(
        status,
        style: TextStyle(
          fontSize: 12.0,
          color: textColor,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }

  String formatDate(DateTime date) {
    String twoDigits(int n) => n.toString().padLeft(2, '0');
    String year = twoDigits(date.year % 100);
    String month = twoDigits(date.month);
    String day = twoDigits(date.day);
    String hour = twoDigits(date.hour);
    String minute = twoDigits(date.minute);
    return '$year-$month-$day $hour:$minute';
  }
}
