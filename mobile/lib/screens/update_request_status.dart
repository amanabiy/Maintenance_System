import 'dart:convert';
import 'dart:io';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:image_picker/image_picker.dart';
import 'package:mobile/models/MaintenanceRequestType.dart';
import 'package:mobile/models/RequestsModel.dart';
import 'package:mobile/models/UserModel.dart';
import 'package:mobile/network/endpoints.dart';
import 'package:mobile/providers/api_provider.dart';
import 'package:mobile/screens/util/custom_app_bar.dart';
import 'package:mobile/screens/util/custom_scaffold.dart';
import 'package:http_parser/http_parser.dart';

enum ConfirmationStatus { NOT_COMPLETED, DONE }

enum VerificationStatus { PASSED, FAILED }

class Department {
  int id;
  DateTime createdAt;
  DateTime updatedAt;
  String name;

  Department({
    required this.id,
    required this.createdAt,
    required this.updatedAt,
    required this.name,
  });

  factory Department.fromJson(Map<String, dynamic> json) {
    return Department(
      id: json['id'],
      createdAt: DateTime.parse(json['createdAt']),
      updatedAt: DateTime.parse(json['updatedAt']),
      name: json['name'],
    );
  }
}

class UpdateRequestPage extends StatefulWidget {
  final int requestId;

  const UpdateRequestPage({super.key, required this.requestId});

  @override
  _UpdateRequestPageState createState() => _UpdateRequestPageState();
}

class _UpdateRequestPageState extends State<UpdateRequestPage> {
  final _formKey = GlobalKey<FormState>();
  final FlutterSecureStorage _storage = FlutterSecureStorage();
  late TextEditingController _subjectController;
  late TextEditingController _descriptionController;
  late TextEditingController _blockNumberController;
  late TextEditingController _floorController;
  late TextEditingController _roomNumberController;
  late TextEditingController _feedbackController;
  late TextEditingController _internalNoteController;
  late TextEditingController _externalNoteController;
  late TextEditingController _signatureByNameController;
  late TextEditingController _departmentController;

  // statuses status
  ConfirmationStatus? _selectedConfirmationStatus;
  VerificationStatus? _selectedVerificationStatus;
  int? _selectedPriority;
  StatusType? _selectedRequestStatusType;
  List<StatusType>? _possibleRequestStatusTypes = [];

  final TextEditingController _startDateController = TextEditingController();
  final TextEditingController _endDateController = TextEditingController();

  DateTime? _selectedStartDate;
  DateTime? _selectedEndDate;

  late List<String> selectedDepartments = [];
  final List<String> handlingDepartments = [];
  int _currentStep = 0;
  bool _isLoading = true;
  Item? _request;
  String _searchUserQuery = '';
  late FocusNode _focusNodeUserFetch;
  late FocusNode _focusNodeMaintenanceRequestTypeFetch;
  String _searchMaintenanceRequestTypeQuery = '';

  bool isLoadingUserFetch = false;
  bool isLoadingDepartmentFetch = false;

  List<User> filteredUsers = [];
  List<User> selectedUsers = [];

  List<MaintenanceRequestType> filteredMaintenanceRequestType = [];
  List<MaintenanceRequestType> selectedMaintenanceRequestType = [];
  late List<Department> departments = [];

  List<String> filteredDepartments = [];
  Department? selectedDepartment;

  List<XFile> _selectedImages = [];
  List<Map<String, dynamic>> _uploadedFiles = [];

  void _searchUsers(String query) async {
    if (query.isNotEmpty) {
      List<User> users = await fetchUsers(query);
      setState(() {
        filteredUsers = users;
      });
    } else {
      setState(() {
        filteredUsers = [];
      });
    }
  }

  void _searchMaintenanceRequestType(String query) async {
    if (query.isNotEmpty) {
      List<MaintenanceRequestType> types =
          await fetchMaintenanceRequestTypes(query);
      setState(() {
        filteredMaintenanceRequestType = types;
      });
    } else {
      setState(() {
        filteredMaintenanceRequestType = [];
      });
    }
  }

  void _selectUser(User user) {
    setState(() {
      bool userExists =
          selectedUsers.any((selectedUser) => selectedUser.id == user.id);

      if (!userExists) {
        selectedUsers.add(user);
      }
    });
  }

  void _removeUser(User user) {
    setState(() {
      selectedUsers.remove(user);
    });
  }

  void _selectMaintenanceRequestType(MaintenanceRequestType type) {
    setState(() {
      bool typeExists = selectedMaintenanceRequestType
          .any((selectedType) => selectedType.id == type.id);

      if (!typeExists) {
        selectedMaintenanceRequestType.add(type);
      }
    });
  }

  void _removeMaintenanceRequestType(MaintenanceRequestType type) {
    setState(() {
      selectedMaintenanceRequestType.remove(type);
    });
  }

  void _searchDepartments(String query) {
    if (query.isNotEmpty) {
      List<String> departments = handlingDepartments
          .where((dept) => dept.toLowerCase().contains(query.toLowerCase()))
          .toList();
      setState(() {
        filteredDepartments = departments;
      });
    } else {
      setState(() {
        filteredDepartments = [];
      });
    }
  }

  void _selectDepartment(String department) {
    setState(() {
      selectedDepartment =
          departments.firstWhere((dept) => dept.name == department);
      filteredDepartments = [];
    });
  }

  @override
  void initState() {
    super.initState();
    _subjectController = TextEditingController();
    _descriptionController = TextEditingController();
    _blockNumberController = TextEditingController();
    _floorController = TextEditingController();
    _roomNumberController = TextEditingController();
    _feedbackController = TextEditingController();
    _internalNoteController = TextEditingController();
    _externalNoteController = TextEditingController();
    _signatureByNameController = TextEditingController();
    _departmentController = TextEditingController();

    _focusNodeUserFetch = FocusNode();
    _focusNodeUserFetch.addListener(() {
      if (!_focusNodeUserFetch.hasFocus) {
        setState(() {
          _searchUserQuery = '';
        });
      }
    });

    _focusNodeMaintenanceRequestTypeFetch = FocusNode();
    _focusNodeMaintenanceRequestTypeFetch.addListener(() {
      if (!_focusNodeMaintenanceRequestTypeFetch.hasFocus) {
        setState(() {
          _searchMaintenanceRequestTypeQuery = '';
        });
      }
    });

    final String jsonData = '''
    [
      {
        "id": 1,
        "createdAt": "2024-06-06T20:13:03.007Z",
        "updatedAt": "2024-06-11T04:33:27.000Z",
        "name": "GENERAL H"
      },
      {
        "id": 2,
        "createdAt": "2024-06-06T20:13:03.007Z",
        "updatedAt": "2024-06-06T20:13:03.007Z",
        "name": "MAINTENANCE"
      },
      {
        "id": 3,
        "createdAt": "2024-06-06T20:13:03.007Z",
        "updatedAt": "2024-06-06T20:13:03.007Z",
        "name": "ELECTRICITY"
      },
      {
        "id": 4,
        "createdAt": "2024-06-06T20:13:03.007Z",
        "updatedAt": "2024-06-06T20:13:03.007Z",
        "name": "SANITARY"
      },
      {
        "id": 5,
        "createdAt": "2024-06-06T20:13:03.007Z",
        "updatedAt": "2024-06-06T20:13:03.007Z",
        "name": "VERIFIER"
      }
    ]
    ''';

    List<dynamic> jsonList = json.decode(jsonData);
    departments = jsonList.map((json) => Department.fromJson(json)).toList();

    fetchRequestById(widget.requestId);
  }

  Future<List<User>> fetchUsers(String term) async {
    try {
      final response = await Api().get('${Endpoints.fuzzySearchUsers}/$term');

      if (response.statusCode == 200) {
        List<dynamic> body = response.data;
        List<User> users =
            body.map((dynamic item) => User.fromJson(item)).toList();
        return users;
      } else {
        throw Exception('Failed to load users');
      }
    } catch (e) {
      throw Exception('Failed to load users');
    }
  }

  Future<List<MaintenanceRequestType>> fetchMaintenanceRequestTypes(
      String query) async {
    try {
      final response =
          await Api().get('${Endpoints.maintenanceRequestTypeFuzzy}/$query');

      if (response.statusCode == 200) {
        List<dynamic> body = response.data;
        List<MaintenanceRequestType> types = body
            .map((dynamic item) => MaintenanceRequestType.fromJson(item))
            .toList();
        return types;
      } else {
        throw Exception('Failed to load maintenance request types');
      }
    } catch (e) {
      throw Exception('Failed to load maintenance request types');
    }
  }

  Future<void> fetchRequestById(int requestId) async {
    try {
      final response = await Api().get('${Endpoints.requestById}/$requestId');
      print("fetched request by id");
      print(response.data);
      if (response.statusCode == 200) {
        print("requestStatuses");
        print(response.data['requestStatuses'].last['statusType']);
        int? id = response.data['requestStatuses'].last['statusType']['id'];
        final resStatusType =
            await Api().get('${Endpoints.RequestStatusTypeById}/$id');

        setState(() {
          _request = Item.fromJson(response.data);
          print("request is fetched");
          if (resStatusType.statusCode == 200) {
            final body = resStatusType.data;
            final currentStatus = StatusType.fromJson(body);
            _possibleRequestStatusTypes =
                currentStatus.allowedTransitions ?? [];
            if (_possibleRequestStatusTypes?.length == 1) {
              _selectedRequestStatusType = _possibleRequestStatusTypes!.first;
            }
          }
          print("possible states");
          print(_possibleRequestStatusTypes);
          _populateFormFields();
          _isLoading = false;
        });
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to fetch request')),
        );
        Navigator.pop(context);
      }
    } catch (e) {
      if (mounted) {
        print("Failed to fetch request $e");
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: $e')),
        );
        Navigator.pop(context);
      }
    }
  }

  String? _validatePriority(String? value) {
    if (value == null || value.isEmpty) {
      return 'Please enter a priority';
    }
    final int? priority = int.tryParse(value);
    if (priority == null || priority < 1 || priority > 5) {
      return 'Priority must be an integer between 1 and 5';
    }
    return null;
  }

  void _populateFormFields() {
    if (_request != null) {
      _subjectController.text = _request!.subject ?? '';
      _descriptionController.text = _request!.description ?? '';
      _blockNumberController.text =
          _request!.location?.blockNumber.toString() ?? '';
      _floorController.text = _request!.location?.floor.toString() ?? '';
      _roomNumberController.text = _request!.location?.roomNumber ?? '';
      _feedbackController.text = _request!.feedback ?? '';
      _internalNoteController.text = '';
      _externalNoteController.text = '';
      _signatureByNameController.text = '';
      _departmentController.text = selectedDepartment?.name ?? '';
    }
  }

  @override
  void dispose() {
    _subjectController.dispose();
    _descriptionController.dispose();
    _blockNumberController.dispose();
    _floorController.dispose();
    _roomNumberController.dispose();
    _feedbackController.dispose();
    _internalNoteController.dispose();
    _externalNoteController.dispose();
    _signatureByNameController.dispose();
    _departmentController.dispose();
    _focusNodeUserFetch.dispose();
    super.dispose();
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

  Future<void> _selectDateTime(BuildContext context,
      TextEditingController controller, bool isStart) async {
    final DateTime? pickedDate = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(2000),
      lastDate: DateTime(2101),
    );

    if (pickedDate != null) {
      final TimeOfDay? pickedTime = await showTimePicker(
        context: context,
        initialTime: TimeOfDay.now(),
      );

      if (pickedTime != null) {
        final DateTime selectedDateTime = DateTime(
          pickedDate.year,
          pickedDate.month,
          pickedDate.day,
          pickedTime.hour,
          pickedTime.minute,
        );

        // if (!isStart ||
        //     !isStart &&
        //         _selectedStartDate != null &&
        //         selectedDateTime.isBefore(_selectedStartDate!)) {
        //   // ignore: use_build_context_synchronously
        //   showFailureSnackBar(context, "End time must be after start time.");
        //   return;
        // }

        setState(() {
          if (isStart) {
            _selectedStartDate = selectedDateTime;
          } else {
            _selectedEndDate = selectedDateTime;
          }
          controller.text = selectedDateTime.toString();
        });
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

  Future<void> updateRequest() async {
    final data = {
      "updateMaintenance": {
        "subject": _subjectController.text,
        "description": _descriptionController.text,
        "locationCreate": {
          "blockNumber": int.tryParse(_blockNumberController.text),
          "floor": int.tryParse(_floorController.text),
          "roomNumber": _roomNumberController.text,
          "isToilet": false // Update this based on actual data if necessary
        },
        "maintenanceRequestTypeIds":
            selectedMaintenanceRequestType.map((type) => type.id).toList(),
        "mediaIds": _uploadedFiles.map((file) => file['id']).toList(),
        "priority": _selectedPriority,
        "verificationStatus":
            _selectedVerificationStatus.toString().split('.').last,
        "confirmationStatus":
            _selectedConfirmationStatus.toString().split('.').last,
        "rating": 0, // Update this if you have a rating system
        "feedback": _feedbackController.text,
        "assignedPersonIds": selectedUsers.map((user) => user.id).toList(),
        "handlingDepartmentId":
            handlingDepartments.indexOf(selectedDepartment?.name ?? '')
      },
      "updateRequestStatus": {
        "scheduleMaintenanceStartDateTime":
            _selectedStartDate?.toIso8601String(),
        "scheduleMaintenanceEndDateTime": _selectedEndDate?.toIso8601String(),
        "internalNote": _internalNoteController.text,
        "externalNote": _externalNoteController.text,
        "mediaFiles": _uploadedFiles.map((file) => file['id']).toList(),
        "signatureByName": _signatureByNameController.text
      }
    };

    try {
      print("sending data");
      print(data);
      final response = await Api().patch(
          '${Endpoints.changeRequestStatus}/${_request?.id}/statuses/${_selectedRequestStatusType?.id}',
          data);
      print("received");
      print(response.data);
      print(response.statusCode);
      if (response.statusCode == 200) {
        showSuccessSnackBar(context, 'Request updated successfully');
        Navigator.pop(context);
      } else {
        showSuccessSnackBar(context, 'Failed to update request');
      }
    } catch (e) {
      showFailureSnackBar(context, '$e');
    }
  }

  List<Step> getSteps() {
    return [
      if (_possibleRequestStatusTypes!.length > 1)
        Step(
            title: Text('Choose state of request'),
            content: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                    'Change status from ${_request?.requestStatuses.last.statusType?.name ?? 'Unknown'} to:'),
                DropdownButtonFormField<StatusType>(
                  decoration: InputDecoration(labelText: 'Next Step'),
                  value: _selectedRequestStatusType,
                  items:
                      _possibleRequestStatusTypes?.map((StatusType statusType) {
                    return DropdownMenuItem<StatusType>(
                      value: statusType,
                      child: Text(statusType.name ?? 'Unknown'),
                    );
                  }).toList(),
                  onChanged: (StatusType? newValue) {
                    setState(() {
                      _selectedRequestStatusType = newValue;
                      print(_selectedRequestStatusType?.name ?? 'Unknown');
                      print(_selectedRequestStatusType
                              ?.allowsChangeTitleAndDescription ??
                          'Unknown');
                      print(_selectedRequestStatusType.toString());
                    });
                  },
                  validator: (value) =>
                      value == null ? 'Please select a status type' : null,
                ),
              ],
            )),
      Step(
        title: Text('Update Maintenance'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Visibility(
              visible:
                  _selectedRequestStatusType?.allowsChangeTitleAndDescription ??
                      false,
              child: TextFormField(
                controller: _subjectController,
                decoration: InputDecoration(labelText: 'Subject'),
              ),
            ),
            Visibility(
              visible:
                  _selectedRequestStatusType?.allowsChangeTitleAndDescription ??
                      false,
              child: TextFormField(
                controller: _descriptionController,
                decoration: InputDecoration(labelText: 'Description'),
                maxLines: 3,
              ),
            ),
            Visibility(
              visible:
                  _selectedRequestStatusType?.allowsChangeLocation ?? false,
              child: TextFormField(
                controller: _blockNumberController,
                decoration: InputDecoration(labelText: 'Block Number'),
                keyboardType: TextInputType.number,
                inputFormatters: <TextInputFormatter>[
                  FilteringTextInputFormatter.digitsOnly
                ],
              ),
            ),
            Visibility(
              visible:
                  _selectedRequestStatusType?.allowsChangeLocation ?? false,
              child: TextFormField(
                controller: _floorController,
                decoration: InputDecoration(labelText: 'Floor'),
                keyboardType: TextInputType.number,
                inputFormatters: <TextInputFormatter>[
                  FilteringTextInputFormatter.digitsOnly
                ],
              ),
            ),
            Visibility(
              visible:
                  _selectedRequestStatusType?.allowsChangeLocation ?? false,
              child: TextFormField(
                controller: _roomNumberController,
                decoration: InputDecoration(labelText: 'Room Number'),
              ),
            ),
            Visibility(
              visible:
                  _selectedRequestStatusType?.allowChangeconfirmationStatus ??
                      false,
              child: TextFormField(
                controller: _feedbackController,
                decoration: InputDecoration(labelText: 'Feedback'),
                maxLines: 3,
              ),
            ),
            Visibility(
              visible:
                  _selectedRequestStatusType?.allowsChangeRequestTypes ?? false,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(height: 30),
                  Text('Selected Types:'),
                  Wrap(
                    children: selectedMaintenanceRequestType.map((type) {
                      return Chip(
                        label: Text(type.name!),
                        onDeleted: () {
                          _removeMaintenanceRequestType(type);
                        },
                      );
                    }).toList(),
                  ),
                  TextFormField(
                    focusNode: _focusNodeMaintenanceRequestTypeFetch,
                    decoration: InputDecoration(
                        labelText: 'Select Maintenance Request Type'),
                    onChanged: (value) {
                      setState(() {
                        _searchMaintenanceRequestTypeQuery = value;
                        _searchMaintenanceRequestType(value);
                      });
                    },
                  ),
                  _isLoading
                      ? Center(child: CircularProgressIndicator())
                      : _searchMaintenanceRequestTypeQuery.isNotEmpty
                          ? SizedBox(
                              height:
                                  200, // Bounded height for the ListView.builder
                              child: ListView.builder(
                                itemCount:
                                    filteredMaintenanceRequestType.length,
                                itemBuilder: (context, index) {
                                  final type =
                                      filteredMaintenanceRequestType[index];
                                  return ListTile(
                                    title: Text(type.name!),
                                    onTap: () {
                                      _selectMaintenanceRequestType(type);
                                    },
                                  );
                                },
                              ),
                            )
                          : Container(),
                ],
              ),
            ),
            Visibility(
              visible: _selectedRequestStatusType?.allowChangePriority ?? false,
              child: DropdownButtonFormField<int>(
                decoration: InputDecoration(labelText: 'Priority'),
                value: _selectedPriority,
                items:
                    List.generate(5, (index) => index + 1).map((int priority) {
                  return DropdownMenuItem<int>(
                    value: priority,
                    child: Text(priority.toString()),
                  );
                }).toList(),
                onChanged: (int? newValue) {
                  setState(() {
                    _selectedPriority = newValue;
                  });
                },
                validator: (value) =>
                    value == null ? 'Please select a priority' : null,
              ),
            ),
            SizedBox(height: 20),
            Visibility(
              visible:
                  _selectedRequestStatusType?.allowChangeverificationStatus ??
                      false,
              child: DropdownButtonFormField<VerificationStatus>(
                decoration: InputDecoration(labelText: 'Verification Status'),
                value: _selectedVerificationStatus,
                items:
                    VerificationStatus.values.map((VerificationStatus status) {
                  return DropdownMenuItem<VerificationStatus>(
                    value: status,
                    child: Text(
                      status.toString().split('.').last,
                      style: TextStyle(
                        color: status == VerificationStatus.FAILED
                            ? const Color.fromARGB(255, 133, 28, 20)
                            : const Color.fromARGB(255, 33, 113, 36),
                      ),
                    ),
                  );
                }).toList(),
                onChanged: (VerificationStatus? newValue) {
                  setState(() {
                    _selectedVerificationStatus = newValue;
                  });
                },
                validator: (value) =>
                    value == null ? 'Please select a status' : null,
              ),
            ),
            Visibility(
              visible:
                  _selectedRequestStatusType?.allowChangeconfirmationStatus ??
                      false,
              child: DropdownButtonFormField<ConfirmationStatus>(
                decoration: InputDecoration(labelText: 'Confirmation Status'),
                value: _selectedConfirmationStatus,
                items:
                    ConfirmationStatus.values.map((ConfirmationStatus status) {
                  return DropdownMenuItem<ConfirmationStatus>(
                    value: status,
                    child: Text(
                      status.toString().split('.').last,
                      style: TextStyle(
                        color: status == ConfirmationStatus.NOT_COMPLETED
                            ? const Color.fromARGB(255, 133, 28, 20)
                            : const Color.fromARGB(255, 33, 113, 36),
                      ),
                    ),
                  );
                }).toList(),
                onChanged: (ConfirmationStatus? newValue) {
                  setState(() {
                    _selectedConfirmationStatus = newValue;
                  });
                },
              ),
            ),
            SizedBox(height: 30),
            Visibility(
              visible:
                  _selectedRequestStatusType?.allowsForwardToPerson ?? false,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Assigned Persons:'),
                  Wrap(
                    children: selectedUsers.map((user) {
                      return Chip(
                        label: Text(user.fullName!),
                        onDeleted: () {
                          _removeUser(user);
                        },
                      );
                    }).toList(),
                  ),
                  TextFormField(
                    focusNode: _focusNodeUserFetch,
                    decoration:
                        InputDecoration(labelText: 'Assigned Person IDs'),
                    onChanged: (value) {
                      setState(() {
                        _searchUserQuery = value;
                        _searchUsers(value);
                      });
                    },
                  ),
                  _isLoading
                      ? Center(child: CircularProgressIndicator())
                      : _searchUserQuery.isNotEmpty
                          ? SizedBox(
                              height:
                                  200, // Bounded height for the ListView.builder
                              child: ListView.builder(
                                itemCount: filteredUsers.length,
                                itemBuilder: (context, index) {
                                  final user = filteredUsers[index];
                                  return ListTile(
                                    title: Text(user.fullName!),
                                    subtitle: Text(
                                        '${user.email} - ${user.phoneNumber}'),
                                    onTap: () {
                                      _selectUser(user);
                                    },
                                  );
                                },
                              ),
                            )
                          : Container(),
                ],
              ),
            ),
            Visibility(
              visible: _selectedRequestStatusType?.allowsForwardToDepartment ??
                  false,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(height: 30),
                  Text('Selected Departments:'),
                  Wrap(
                    spacing: 8.0,
                    runSpacing: 4.0,
                    children: selectedDepartments.map((item) {
                      return Chip(
                        label: Text(item),
                        onDeleted: () {
                          setState(() {
                            selectedDepartments.remove(item);
                          });
                        },
                      );
                    }).toList(),
                  ),
                  if (selectedDepartment != null)
                    Chip(
                      label: Text(selectedDepartment!.name),
                      onDeleted: () {
                        setState(() {
                          selectedDepartment = null;
                        });
                      },
                    ),
                  TextFormField(
                    controller: _departmentController,
                    decoration: InputDecoration(labelText: 'Search Department'),
                    onChanged: (value) {
                      _searchDepartments(value);
                    },
                  ),
                  if (filteredDepartments.isNotEmpty)
                    SizedBox(
                      height: 200,
                      child: ListView.builder(
                        itemCount: filteredDepartments.length,
                        itemBuilder: (context, index) {
                          final department = filteredDepartments[index];
                          return ListTile(
                            title: Text(department),
                            onTap: () {
                              _selectDepartment(department);
                            },
                          );
                        },
                      ),
                    ),
                ],
              ),
            ),
            Visibility(
              visible:
                  _selectedRequestStatusType?.allowChangeconfirmationStatus ??
                      false,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(height: 20),
                  ListTile(
                    title: Text(
                      'Rate How it Went',
                      style: TextStyle(
                        fontSize: 20,
                      ),
                    ),
                    subtitle: Text(
                      'Give us your rating from 1 to 5 stars.',
                      style: TextStyle(
                        fontSize: 16,
                        color: Colors.grey[600],
                      ),
                    ),
                  ),
                  RatingBar.builder(
                    initialRating: 1,
                    minRating: 1,
                    direction: Axis.horizontal,
                    allowHalfRating: true,
                    itemCount: 5,
                    itemPadding: EdgeInsets.symmetric(horizontal: 4.0),
                    itemBuilder: (context, _) => Icon(
                      Icons.star,
                      color: Colors.amber,
                    ),
                    onRatingUpdate: (rating) {
                      print(rating);
                    },
                  ),
                ],
              ),
            ),
          ],
        ),
        isActive: _currentStep == 0,
        state: _currentStep > 0 ? StepState.complete : StepState.indexed,
      ),
      Step(
        title: Text('Update Request Status'),
        content: Column(
          children: [
            TextFormField(
              controller: _externalNoteController,
              decoration: InputDecoration(labelText: 'Comment'),
              maxLines: 2,
            ),
            Visibility(
              visible: _selectedRequestStatusType?.needsSignatures ?? false,
              child: TextFormField(
                controller: _signatureByNameController,
                decoration: InputDecoration(labelText: 'Signature By Name'),
              ),
            ),
            Visibility(
              visible: _selectedRequestStatusType?.hasSchedule ?? false,
              child: Column(
                children: [
                  TextFormField(
                    controller: _startDateController,
                    decoration: InputDecoration(
                      labelText: 'Start Date & Time',
                      suffixIcon: IconButton(
                        icon: Icon(Icons.calendar_today),
                        onPressed: () => _selectDateTime(
                            context, _startDateController, true),
                      ),
                    ),
                    readOnly: true,
                  ),
                  TextFormField(
                    controller: _endDateController,
                    decoration: InputDecoration(
                      labelText: 'End Date & Time',
                      suffixIcon: IconButton(
                        icon: Icon(Icons.calendar_today),
                        onPressed: () =>
                            _selectDateTime(context, _endDateController, false),
                      ),
                    ),
                    readOnly: true,
                  ),
                ],
              ),
            ),
            Visibility(
              visible: true,
              child: Column(
                children: [
                  const SizedBox(height: 16.0),
                  SingleChildScrollView(
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
                  ),
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
                ],
              ),
            )
          ],
        ),
        isActive: _currentStep == 1,
        state: _currentStep > 1 ? StepState.complete : StepState.indexed,
      ),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(title: 'Update Request Status'),
      body: _isLoading
          ? Center(child: CircularProgressIndicator())
          : Stepper(
              currentStep: _currentStep,
              steps: getSteps(),
              onStepContinue: () {
                if (_currentStep == 0) {
                  setState(() {
                    _currentStep++;
                  });
                } else if (_currentStep == getSteps().length - 1) {
                  updateRequest();
                }
              },
              onStepCancel: () {
                if (_currentStep > 0) {
                  setState(() {
                    _currentStep--;
                  });
                } else {
                  Navigator.pop(context);
                }
              },
              onStepTapped: (step) => setState(() => _currentStep = step),
              controlsBuilder: (BuildContext context, ControlsDetails details) {
                return Row(
                  children: <Widget>[
                    const SizedBox(height: 30),
                    ElevatedButton(
                      onPressed: details.onStepContinue,
                      child: Text(_currentStep == getSteps().length - 1
                          ? 'Submit'
                          : 'Next'),
                    ),
                    if (_currentStep > 0)
                      TextButton(
                        onPressed: details.onStepCancel,
                        child: Text('Back'),
                      ),
                  ],
                );
              },
            ),
    );
  }
}
