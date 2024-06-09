import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mobile/models/NotificationModel.dart';
import 'dart:convert';

import 'package:mobile/network/endpoints.dart';
import 'package:mobile/providers/api_provider.dart';
import 'package:mobile/screens/util/custom_app_bar.dart';
import 'package:mobile/screens/util/custom_scaffold.dart';

class NotificationsPage extends StatefulWidget {
  const NotificationsPage({super.key});

  @override
  _NotificationsPageState createState() => _NotificationsPageState();
}

class _NotificationsPageState extends State<NotificationsPage> {
  List<NotificationModel> notifications = [];
  bool showUnread = true;

Future<void> fetchNotifications(bool isRead) async {
  try {
    final response = await Api().get(Endpoints.getMyNotification);

    if (response.statusCode == 200) {
      final items = response.data['items'] as List;
      print(items);
      if (mounted) {
      setState(() {
        notifications = items.map((item) => NotificationModel.fromJson(item)).toList();
      });
      }
    } else {
      print(response.data);
      print('Failed to load notifications: ${response.statusCode}');
      throw Exception('Failed to load notifications');
    }
  } catch (e) {
    print('Error fetching notifications: $e');
    if (mounted) {
    showFailureSnackBar(context, 'Failed to fetch notifications: $e');

    }
  throw Exception('Failed to fetch notifications: $e');
  }
}


  @override
  void initState() {
    super.initState();
    fetchNotifications(showUnread); // Fetch unread notifications by default
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(title: 'Requests', 
        actions: [
          Switch(
            value: showUnread,
            onChanged: (value) {
              setState(() {
                showUnread = value;
                fetchNotifications(showUnread);
              });
            },
            activeColor: Colors.white,
            inactiveThumbColor: Colors.grey,
            inactiveTrackColor: Colors.white.withOpacity(0.3),
          ),
          const SizedBox(width: 16),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: notifications.isEmpty
            ? const Center(child: Text('No notifications'))
            : ListView.builder(
                itemCount: notifications.length,
                itemBuilder: (context, index) {
                  final notification = notifications[index];
                  return Card(
                    margin: const EdgeInsets.symmetric(vertical: 8.0),
                    elevation: 4.0,
                    color: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            notification.subject!,
                            style: const TextStyle(
                              fontSize: 16.0,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 8.0),
                          Text(
                            notification.message!,
                            style: const TextStyle(fontSize: 14.0),
                          ),
                          const SizedBox(height: 8.0),
                          Text(
                            "Created At: ${notification.createdAt}",
                            style: const TextStyle(fontSize: 12.0, color: Colors.grey),
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
      ),
    );
  }
}
