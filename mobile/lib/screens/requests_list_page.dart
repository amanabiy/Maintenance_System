import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'dart:convert';

import 'package:mobile/models/RequestsModel.dart';
import 'package:mobile/network/endpoints.dart';
import 'package:mobile/providers/api_provider.dart';
import 'package:mobile/screens/authentication/login_page.dart';
import 'package:mobile/screens/request_page.dart';
import 'package:mobile/screens/util/custom_app_bar.dart';
import 'package:mobile/screens/util/custom_scaffold.dart';

class RequestsPage extends StatefulWidget {
  const RequestsPage({super.key});

  @override
  _RequestsPageState createState() => _RequestsPageState();
}

class _RequestsPageState extends State<RequestsPage> {
  RequestsModel? requests;
  FlutterSecureStorage _storage = FlutterSecureStorage();
  String selectedFilter = 'Needs my Attention';
  Set<String> selectedStatusTypes = Set();
  bool isLoading = true;

  final Map<String, String> filterEndpoints = {
    'Needs my Attention': Endpoints.assignedToMeRequests,
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

  List<String> statusTypes = [];

  void logout() async {
    await _storage.delete(key: 'accessToken');
    await _storage.delete(key: 'refreshToken');
    Navigator.pushAndRemoveUntil(
        context,
        MaterialPageRoute(builder: (context) => const LoginPage()),
        (route) => false);
  }

  Future<void> fetchRequests() async {
    isLoading = true;
    String endpoint = filterEndpoints[selectedFilter] ?? Endpoints.myRequests;

    try {
      final response = await Api().get(endpoint);
      if (response.statusCode == 200) {
        try {
          requests = RequestsModel.fromJson(response.data);
          extractStatusTypes();
        } catch (e) {
          throw Exception('Failed to decode requests: $e');
        }
        if (mounted) {
          setState(() {}); // Update UI after fetching data
        }
        isLoading = false;
      } else if (response.statusCode == 401) {
        if (mounted) {
          showFailureSnackBar(context, 'Unauthorized request');
        }
        logout();
      }
    } catch (e) {
      if (mounted) {
        showFailureSnackBar(context, 'Failed to fetch requests: $e');
      }
    }
  }

  void extractStatusTypes() {
    Set<String> statusTypeSet = {};
    if (requests?.items != null) {
      for (var request in requests!.items) {
        if (request.requestStatuses != null &&
            request.requestStatuses!.isNotEmpty) {
          var lastStatus = request.requestStatuses!.last;
          if (lastStatus.statusType != null) {
            statusTypeSet.add(lastStatus.statusType!.name!);
          }
        }
      }
    }
    statusTypes = statusTypeSet.toList();
  }

  @override
  void initState() {
    super.initState();
    fetchRequests();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(title: 'Requests'),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          children: [
            Wrap(
              spacing: 8.0, // Adjust the spacing between elements as needed
              runSpacing: 4.0, // Adjust the spacing between lines as needed
              children: [
                SizedBox(
                  width: 150, // Adjust the width as needed
                  child: DropdownButton<String>(
                    isExpanded:
                        true, // Ensures the dropdown uses the full width of the SizedBox
                    value: selectedFilter,
                    items: filterEndpoints.keys.map((String value) {
                      return DropdownMenuItem<String>(
                        value: value,
                        child: Text(
                          value,
                          overflow: TextOverflow.ellipsis,
                        ),
                      );
                    }).toList(),
                    onChanged: (String? newValue) {
                      setState(() {
                        selectedFilter = newValue!;
                        fetchRequests();
                      });
                    },
                  ),
                ),
                SizedBox(
                  width: 150, // Adjust the width as needed
                  child: DropdownButton<String>(
                    isExpanded:
                        true, // Ensures the dropdown uses the full width of the SizedBox
                    hint: Text("Select a status"),
                    items: statusTypes.map((String status) {
                      return DropdownMenuItem<String>(
                        value: status,
                        child: Text(
                          status,
                          overflow: TextOverflow.ellipsis,
                        ),
                      );
                    }).toList(),
                    onChanged: (String? newValue) {
                      setState(() {
                        if (newValue != null) {
                          if (selectedStatusTypes.contains(newValue)) {
                            selectedStatusTypes.remove(newValue);
                          } else {
                            selectedStatusTypes.add(newValue);
                          }
                        }
                      });
                    },
                    value: null, // Ensures dropdown resets after selection
                  ),
                ),
              ],
            ),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 8.0),
              child: Wrap(
                spacing: 8.0,
                runSpacing:
                    4.0, // Added run spacing to control vertical space between rows
                children: selectedStatusTypes.map((status) {
                  return ChoiceChip(
                    label: Text(
                      status,
                      style: TextStyle(
                        color: selectedStatusTypes.contains(status)
                            ? Colors.white
                            : Colors.black,
                        fontSize: 10.0, // Smaller text size
                      ),
                    ),
                    selected: selectedStatusTypes.contains(status),
                    backgroundColor: getStatusCardColor(status),
                    selectedColor: getStatusCardColor(status).withOpacity(0.5),
                    shape: StadiumBorder(
                      side: BorderSide(
                        color: getStatusCardColor(
                            status), // Border color same as background color
                        width: 0.5,
                      ),
                    ),
                    onSelected: (bool selected) {
                      setState(() {
                        if (selected) {
                          selectedStatusTypes.add(status);
                        } else {
                          selectedStatusTypes.remove(status);
                        }
                      });
                    },
                  );
                }).toList(),
              ),
            ),
            Expanded(
              child: isLoading 
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
                            // Filter requests based on selected status types
                            final length = request.requestStatuses!.length;
                            bool shouldDisplay = selectedStatusTypes.isEmpty ||
                                selectedStatusTypes.contains(request
                                    .requestStatuses.last.statusType!.name!);
                            // request.requestStatuses![length -].((status) =>
                            //     selectedStatusTypes
                            //         .contains(status.statusType!.name));
                            if (!shouldDisplay) return Container();

                            return Card(
                              margin: const EdgeInsets.symmetric(vertical: 8.0),
                              elevation: 4.0,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(10.0),
                              ),
                              child: InkWell(
                                onTap: () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder: (context) => RequestDetailPage(
                                          requestId: request.id!),
                                    ),
                                  );
                                },
                                child: Padding(
                                  padding: const EdgeInsets.all(12.0),
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Row(
                                        mainAxisAlignment:
                                            MainAxisAlignment.spaceBetween,
                                        children: [
                                          Expanded(
                                            child: Text(
                                              request.subject ?? "",
                                              style: const TextStyle(
                                                fontSize: 16.0,
                                                fontWeight: FontWeight.bold,
                                                color: Colors.black,
                                              ),
                                            ),
                                          ),
                                          Text(
                                            formatDate(request.createdAt ??
                                                DateTime.now()),
                                            style: const TextStyle(
                                              fontSize: 12.0,
                                              color: Colors.grey,
                                            ),
                                          ),
                                        ],
                                      ),
                                      const SizedBox(height: 8.0),
                                      Text(
                                        request.description!.length > 100
                                            ? '${request.description?.substring(0, 100)}...'
                                            : request.description ?? "",
                                        style: const TextStyle(
                                          fontSize: 14.0,
                                          color: Colors.black87,
                                        ),
                                      ),
                                      const SizedBox(height: 8.0),
                                      getStatusWidget(request.requestStatuses
                                              ?.last.statusType?.name ??
                                          "Unknown"),
                                      const SizedBox(height: 8.0),
                                      Wrap(
                                        children: request
                                                .maintenanceRequestTypes
                                                ?.map((type) => Container(
                                                      margin: const EdgeInsets
                                                          .symmetric(
                                                          horizontal: 4.0),
                                                      padding:
                                                          const EdgeInsets.all(
                                                              4.0),
                                                      decoration: BoxDecoration(
                                                        color: Colors.blue
                                                            .withOpacity(0.2),
                                                        borderRadius:
                                                            BorderRadius
                                                                .circular(4.0),
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
