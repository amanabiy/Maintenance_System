import 'package:flutter/material.dart';
import 'package:mobile/models/RequestsModel.dart';
import 'package:mobile/network/endpoints.dart';
import 'package:mobile/providers/api_provider.dart';
import 'package:mobile/screens/util/custom_app_bar.dart';

class RequestDetailPage extends StatefulWidget {
  final int requestId;

  RequestDetailPage({required this.requestId});

  @override
  _RequestDetailPageState createState() => _RequestDetailPageState();
}

class _RequestDetailPageState extends State<RequestDetailPage> {
  Item? request;
  bool isLoading = true;
  final Api api = Api();

  @override
  void initState() {
    super.initState();
    fetchRequestDetails();
  }

  Future<void> fetchRequestDetails() async {
    try {
      final response =
          await api.get('${Endpoints.request}/${widget.requestId}');
      request = Item.fromJson(response.data);
      if (mounted) {
        setState(() {
          isLoading = false;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          isLoading = false;
        });
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to load request details: $e')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(title: 'Request Details'),
      body: isLoading
          ? Center(child: CircularProgressIndicator())
          : request == null
              ? Center(child: Text('No details available'))
              : Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: SingleChildScrollView(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _buildDetailSection('General Information', [
                          _buildDetailRow('Subject', request?.subject ?? 'N/A'),
                          _buildDetailRow(
                              'Description', request?.description ?? 'N/A'),
                          _buildDetailRow(
                              'Status', request?.verificationStatus ?? 'N/A'),
                          // _buildDetailRow('Priority', request?.priority?.toString() ?? 'N/A'),
                        ]),
                        _buildDetailSection('Requester Information', [
                          _buildDetailRow('Requester',
                              request?.requester?.fullName ?? 'N/A'),
                          _buildDetailRow(
                              'Assigned Persons',
                              request?.assignedPersons
                                      .map((p) => p.fullName)
                                      .join(', ') ??
                                  'N/A'),
                        ]),
                        _buildDetailSection('Request Details', [
                          _buildDetailRow(
                              'Maintenance Types',
                              request?.maintenanceRequestTypes
                                      .map((t) => t.name)
                                      .join(', ') ??
                                  'N/A'),
                          _buildDetailRow('Department',
                              request?.handlingDepartment?.name ?? 'N/A'),
                          _buildDetailRow('Location',
                              'Block ${request?.location?.blockNumber}, Floor ${request?.location?.floor}, Room ${request?.location?.roomNumber}'),
                          // _buildDetailRow('Equipments', request?.equipments.map((e) => e.name).join(', ') ?? 'N/A'),
                        ]),
                        _buildDetailSection(
                            'Request Statuses',
                            request!.requestStatuses
                                .map((status) => ListTile(
                                      title:
                                          Text(status.statusType?.name ?? ''),
                                      subtitle: Text(
                                          status.statusType?.description ?? ''),
                                      leading: Icon(Icons.info),
                                    ))
                                .toList()),
                        _buildDetailSection('Media Files',
                            _buildMediaFiles(request!.mediaFiles)),
                      ],
                    ),
                  ),
                ),
    );
  }

  Widget _buildDetailSection(String title, List<Widget> children) {
    return Card(
      elevation: 4.0,
      margin: const EdgeInsets.symmetric(vertical: 8.0),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10.0),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: Color.fromARGB(255, 123, 69, 193)),
            ),
            SizedBox(height: 8),
            ...children,
          ],
        ),
      ),
    );
  }

  Widget _buildDetailRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
          ),
          Expanded(
            child: Text(
              value,
              textAlign: TextAlign.end,
              style: TextStyle(fontSize: 16),
            ),
          ),
        ],
      ),
    );
  }

  List<Widget> _buildMediaFiles(List<MediaFile> mediaFiles) {
    return mediaFiles.map((media) {
      return Padding(
        padding: const EdgeInsets.symmetric(vertical: 4.0),
        child: Row(
          children: [
            media.mimetype!.startsWith('imagsdfe/')
                ? Image.network(
                    '${Endpoints.mediaServe}/${media.id}' ?? '',
                    width: 50,
                    height: 50,
                    fit: BoxFit.cover,
                  )
                : Icon(Icons.file_present),
            SizedBox(width: 8),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(media.filename ?? ''),
                  Text(media.mimetype ?? '',
                      style: TextStyle(color: Colors.grey)),
                ],
              ),
            ),
          ],
        ),
      );
    }).toList();
  }
}
