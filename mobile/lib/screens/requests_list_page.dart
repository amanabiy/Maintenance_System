import 'package:flutter/material.dart';
import 'package:http/http.dart' as http; // Import for making API requests
import 'dart:convert';

import 'package:mobile/models/RequestsModel.dart';
import 'package:mobile/network/endpoints.dart';
import 'package:mobile/providers/api_provider.dart'; // Import for JSON decoding

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
    print("requesting");
    final response = await Api().get(Endpoints.request);
    print("response");
    print(response.data);
    if (response.statusCode == 200) {
      requests = RequestsModel.fromJson(response.data);
      setState(() {}); // Update UI after fetching data
    } else {
      // Handle API request errors here
      print('Error fetching requests: ${response.statusCode}');
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
        title: const Text('Maintenance Requests'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              // Logout logic
            },
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: requests?.items.isEmpty ?? true
            ? const Center(child: CircularProgressIndicator()) // Check for null and empty list
            : ListView.builder(
                itemCount: requests?.items?.length ?? 0, // Handle null case for requests.items
                itemBuilder: (context, index) {
                  final request = requests!.items[index];
                  return Card(
                    margin: const EdgeInsets.symmetric(vertical: 8.0),
                    elevation: 4.0, // Add elevation for a shadow effect
                    color: Colors.white, // Set card background color
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10.0), // Rounded corners
                    ),
          
                    child: ListTile(
                      leading: Icon(
                        Icons.settings,
                        size: 50,
                        color: Colors.blue, // Adjust color based on request type
                      ),
                      title: Text(
                        request.subject ?? "",
                        style: const TextStyle(
                          fontSize: 16.0, // Adjust title font size
                          fontWeight: FontWeight.bold, // Make title bold
                        ),
                      ),
                    subtitle: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          request.description ?? "",
                          style: const TextStyle(fontSize: 14.0),
                        ),
                        const SizedBox(height: 4.0),
                        Text(
                          "Status: ${request.requestStatuses?.first?.statusType?.name ?? "Unknown"}",
                          style: const TextStyle(
                              fontSize: 12.0, color: Colors.grey),
                        ),
                        const SizedBox(height: 4.0), // Add spacing for chips
                        Wrap(
                          children: request.maintenanceRequestTypes?.map((type) => Container(
                                margin: const EdgeInsets.symmetric(horizontal: 4.0),
                                padding: const EdgeInsets.all(4.0),
                                decoration: BoxDecoration(
                                  color: Colors.blue.withOpacity(0.2), // Set a light blue background
                                  borderRadius: BorderRadius.circular(4.0),
                                ),
                                child: Text(
                                  type.name ?? "",
                                  style: const TextStyle(
                                    fontSize: 12.0, // Reduce font size
                                    color: Colors.blue, // Set text color to blue
                                  ),
                                ),
                              )).toList() ??
                              [], // Handle empty list
                        ),
                        Text(
                          "Created At: ${formatDate(request.createdAt ?? DateTime.now())}",
                          style: const TextStyle(
                              fontSize: 12.0, color: Colors.grey),
                        ),
                        // ... other subtitle elements
                      ],
                    ),
                      trailing: const Icon(Icons.arrow_forward),
                      onTap: () {
                        // Handle card tap logic (e.g., navigate to request detail)
                      },
                    ),
                  );
                },
              ),
      ),
    );
  }

  String formatDate(DateTime date) {
    // Implement your date formatting logic here (e.g., using DateFormat package)
    // This is a placeholder example, replace with your preferred formatting
    return date.toString();
  }
}
