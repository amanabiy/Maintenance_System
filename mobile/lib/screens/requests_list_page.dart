import 'package:flutter/material.dart';
import 'package:http/http.dart' as http; // Import for making API requests
import 'dart:convert';

import 'package:mobile/models/RequestsModel.dart';
import 'package:mobile/network/endpoints.dart';
import 'package:mobile/providers/api_provider.dart';
import 'package:mobile/screens/request_page.dart';
import 'package:mobile/screens/util/custom_scaffold.dart'; // Import for JSON decoding

// Assuming your RequestsModel class definition is similar to this:
// ... (unchanged)

class RequestsPage extends StatefulWidget {
  const RequestsPage({super.key});

  @override
  // ignore: library_private_types_in_public_api
  _RequestsPageState createState() => _RequestsPageState();
}

class _RequestsPageState extends State<RequestsPage> {
  RequestsModel? requests; // Store the entire response data

  Future<void> fetchRequests() async {
    try {
      final response = await Api().get(Endpoints.myRequests);
      if (response.statusCode == 200) {
        print("Requests fetched successfully");
        try {
          requests = RequestsModel.fromJson(response.data);
        } catch (e) {
          print(e);
          throw Exception('Failed to decode requests: $e');
        }
        print("set fine");
        setState(() {}); // Update UI after fetching data
      }
    } catch (e) {
      // Handle API request errors here
      print('Error fetching requests: ${e}');
      showFailureSnackBar(context, 'Failed to fetch requests: $e');
      throw Exception('Failed to fetch requests: $e');
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
        appBar: AppBar(
          title: const Text('Requests'), // Set application title here
        ),
        body: Padding(
          padding: const EdgeInsets.all(8.0),
          child: requests == null
              ? const Center(
                  child:
                      CircularProgressIndicator()) // Show loading indicator if requests is null
              : (requests?.items == null || requests!.items.isEmpty)
                  ? const Center(
                      child: Text(
                          "No requests until now")) // Show message if items list is null or empty
                  : ListView.builder(
                      itemCount: requests!.items.length,
                      itemBuilder: (context, index) {
                        final request = requests!.items[index];
                        return Card(
                          margin: const EdgeInsets.symmetric(vertical: 8.0),
                          elevation: 4.0, // Add elevation for a shadow effect
                          color: Colors.white, // Set card background color
                          shape: RoundedRectangleBorder(
                            borderRadius:
                                BorderRadius.circular(10.0), // Rounded corners
                          ),
                          child: ListTile(
                            leading: Icon(
                              Icons.settings,
                              size: 50,
                              color: Colors
                                  .blue, // Adjust color based on request type
                            ),
                            title: Text(
                              request?.subject ?? "",
                              style: const TextStyle(
                                fontSize: 16.0, // Adjust title font size
                                fontWeight: FontWeight.bold, // Make title bold
                              ),
                            ),
                            subtitle: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  request?.description ?? "",
                                  style: const TextStyle(fontSize: 14.0),
                                ),
                                const SizedBox(height: 4.0),
                                Text(
                                  "Status: ${request?.requestStatuses?.first?.statusType?.name ?? "Unknown"}",
                                  style: const TextStyle(
                                      fontSize: 12.0, color: Colors.grey),
                                ),
                                const SizedBox(
                                    height: 4.0), // Add spacing for chips
                                Wrap(
                                  children: request?.maintenanceRequestTypes
                                          ?.map((type) => Container(
                                                margin:
                                                    const EdgeInsets.symmetric(
                                                        horizontal: 4.0),
                                                padding:
                                                    const EdgeInsets.all(4.0),
                                                decoration: BoxDecoration(
                                                  color: Colors.blue.withOpacity(
                                                      0.2), // Set a light blue background
                                                  borderRadius:
                                                      BorderRadius.circular(
                                                          4.0),
                                                ),
                                                child: Text(
                                                  type.name ?? "",
                                                  style: const TextStyle(
                                                    fontSize:
                                                        12.0, // Reduce font size
                                                    color: Colors
                                                        .blue, // Set text color to blue
                                                  ),
                                                ),
                                              ))
                                          .toList() ??
                                      [], // Handle empty list
                                ),
                                Text(
                                  "Created At: ${formatDate(request?.createdAt ?? DateTime.now())}",
                                  style: const TextStyle(
                                      fontSize: 12.0, color: Colors.grey),
                                ),
                                // ... other subtitle elements
                              ],
                            ),
                            trailing: const Icon(Icons.arrow_forward),
                            onTap: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => RequestDetailPage(
                                      requestId: request!.id!),
                                ),
                              );
                            },
                          ),
                        );
                      },
                    ),
        ));
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
