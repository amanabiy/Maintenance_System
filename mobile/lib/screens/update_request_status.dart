import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:mobile/models/MaintenanceRequestType.dart';
import 'package:mobile/models/RequestsModel.dart';
import 'package:mobile/models/UserModel.dart';
import 'package:mobile/network/endpoints.dart';
import 'package:mobile/providers/api_provider.dart';

enum ConfirmationStatus { NOT_COMPLETED, DONE }

enum VerificationStatus { PASSED, FAILED }

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

  late List<String> selectedDepartments = [];
  final List<String> handlingDepartments = [
    'Electrical',
    'Plumbing',
    'Computers',
    'Furniture',
    'Lighting',
    'Windows',
    'Doors',
  ];
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

  List<String> filteredDepartments = [];
  String? selectedDepartment;

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
      selectedDepartment = department;
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
          // int? id =
          //     _request!.requestStatuses.last.statusType!.id;
          // final resStatusType = await Api().get('${Endpoints.RequestStatusTypeById}/$id');
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
      _departmentController.text = selectedDepartment ?? '';
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

  Future<void> updateRequest() async {
    final data = {
      "updateMaintenance": {
        "subject": _subjectController.text,
        "description": _descriptionController.text,
        "locationCreate": {
          "blockNumber": int.tryParse(_blockNumberController.text),
          "floor": int.tryParse(_floorController.text),
          "latitude": 0,
          "longitude": 0,
          "roomNumber": _roomNumberController.text,
          "isToilet": false
        },
        "maintenanceRequestTypeIds": [1], // Replace with actual data
        "mediaIds": [1], // Replace with actual data
        "priority": -1, // Replace with actual data
        "verificationStatus": "PASSED", // Replace with actual data
        "confirmationStatus": "NOT_COMPLETED", // Replace with actual data
        "rating": 0, // Replace with actual data
        "feedback": _feedbackController.text,
        "assignedPersonIds": ["string"], // Replace with actual data
        "handlingDepartmentId": handlingDepartments
            .indexOf(selectedDepartment ?? '') // Replace with actual data
      },
      "updateRequestStatus": {
        "scheduleMaintenanceStartDateTime": DateTime.now().toIso8601String(),
        "scheduleMaintenanceEndDateTime": DateTime.now().toIso8601String(),
        "internalNote": _internalNoteController.text,
        "externalNote": _externalNoteController.text,
        "mediaFiles": [0], // Replace with actual data
        "signatureByName": _signatureByNameController.text
      }
    };

    try {
      final response = await Api().post(Endpoints.updateRequest, data);
      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Request updated successfully')),
        );
        Navigator.pop(context);
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to update request')),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: $e')),
      );
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
            TextFormField(
              controller: _subjectController,
              decoration: InputDecoration(labelText: 'Subject'),
            ),
            TextFormField(
              controller: _descriptionController,
              decoration: InputDecoration(labelText: 'Description'),
              maxLines: 3,
            ),
            TextFormField(
              controller: _blockNumberController,
              decoration: InputDecoration(labelText: 'Block Number'),
              keyboardType: TextInputType.number,
              inputFormatters: <TextInputFormatter>[
                FilteringTextInputFormatter.digitsOnly
              ],
            ),
            TextFormField(
              controller: _floorController,
              decoration: InputDecoration(labelText: 'Floor'),
              keyboardType: TextInputType.number,
              inputFormatters: <TextInputFormatter>[
                FilteringTextInputFormatter.digitsOnly
              ],
            ),
            TextFormField(
              controller: _roomNumberController,
              decoration: InputDecoration(labelText: 'Room Number'),
            ),
            TextFormField(
              controller: _feedbackController,
              decoration: InputDecoration(labelText: 'Feedback'),
              maxLines: 3,
            ),
            // TextFormField(
            //   decoration:
            //       InputDecoration(labelText: 'Maintenance Request Type IDs'),
            // ),

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
              decoration:
                  InputDecoration(labelText: 'Select Maintenance Request Type'),
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
                        height: 200, // Bounded height for the ListView.builder
                        child: ListView.builder(
                          itemCount: filteredMaintenanceRequestType.length,
                          itemBuilder: (context, index) {
                            final type = filteredMaintenanceRequestType[index];
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

            // TextFormField(
            //   decoration: InputDecoration(labelText: 'Media IDs'),
            // ),
            DropdownButtonFormField<int>(
              decoration: InputDecoration(labelText: 'Priority'),
              value: _selectedPriority,
              items: List.generate(5, (index) => index + 1).map((int priority) {
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
            SizedBox(height: 20),
            DropdownButtonFormField<VerificationStatus>(
              decoration: InputDecoration(labelText: 'Verification Status'),
              value: _selectedVerificationStatus,
              items: VerificationStatus.values.map((VerificationStatus status) {
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
            DropdownButtonFormField<ConfirmationStatus>(
              decoration: InputDecoration(labelText: 'Confirmation Status'),
              value: _selectedConfirmationStatus,
              items: ConfirmationStatus.values.map((ConfirmationStatus status) {
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
              // validator: (value) =>
              //     value == null ? 'Please select a status' : null,
            ),
            SizedBox(height: 30),
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
              decoration: InputDecoration(labelText: 'Assigned Person IDs'),
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
                        height: 200, // Bounded height for the ListView.builder
                        child: ListView.builder(
                          itemCount: filteredUsers.length,
                          itemBuilder: (context, index) {
                            final user = filteredUsers[index];
                            return ListTile(
                              title: Text(user.fullName!),
                              subtitle:
                                  Text('${user.email} - ${user.phoneNumber}'),
                              onTap: () {
                                _selectUser(user);
                              },
                            );
                          },
                        ),
                      )
                    : Container(),
            SizedBox(height: 30),
            Text('Selected Departments:'),
            Wrap(
              spacing: 8.0,
              runSpacing: 4.0,
              children: selectedDepartments.map((item) {
                return Chip(
                  label: Text(item!),
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
                label: Text(selectedDepartment!),
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
        isActive: _currentStep == 0,
        state: _currentStep > 0 ? StepState.complete : StepState.indexed,
      ),
      Step(
        title: Text('Update Request Status'),
        content: Column(
          children: [
            TextFormField(
              controller: _internalNoteController,
              decoration: InputDecoration(labelText: 'Internal Note'),
              maxLines: 2,
            ),
            TextFormField(
              controller: _externalNoteController,
              decoration: InputDecoration(labelText: 'External Note'),
              maxLines: 2,
            ),
            TextFormField(
              controller: _signatureByNameController,
              decoration: InputDecoration(labelText: 'Signature By Name'),
            ),
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
      appBar: AppBar(
        title: Text('Update Request'),
      ),
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
                } else if (_currentStep == 1) {
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
