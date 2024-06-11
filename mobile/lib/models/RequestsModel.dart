import 'package:mobile/models/MaintenanceRequestType.dart';
import 'package:mobile/models/MediaModel.dart';

class RequestsModel {
    RequestsModel({
        required this.page,
        required this.limit,
        required this.total,
        required this.items,
    });

    final int? page;
    final int? limit;
    final int? total;
    final List<Item> items;

    factory RequestsModel.fromJson(Map<String, dynamic> json){ 
        return RequestsModel(
            page: json["page"] is int ? json["page"] : int.parse(json["page"]),
            limit: json["limit"] is int ? json["limit"] : int.parse(json["limit"]),
            total: json["total"],
            items: json["items"] == null ? [] : List<Item>.from(json["items"]!.map((x) => Item.fromJson(x))),
        );
    }

}

class Item {
    Item({
        required this.id,
        required this.createdAt,
        required this.updatedAt,
        required this.subject,
        required this.description,
        required this.location,
        required this.verificationStatus,
        required this.verifiedBy,
        required this.verifiedAt,
        required this.confirmationStatus,
        required this.rating,
        required this.priority,
        required this.feedback,
        required this.requester,
        required this.assignedPersons,
        required this.maintenanceRequestTypes,
        required this.handlingDepartment,
        required this.mediaFiles,
        required this.requestStatuses,
        required this.equipments,
    });

    final int? id;
    final DateTime? createdAt;
    final DateTime? updatedAt;
    final String? subject;
    final String? description;
    final Location? location;
    final String? verificationStatus;
    final Requester? verifiedBy;
    final DateTime? verifiedAt;
    final String? confirmationStatus;
    final int? rating;
    final int? priority;
    final String? feedback;
    final Requester? requester;
    final List<Requester> assignedPersons;
    final List<MaintenanceRequestType> maintenanceRequestTypes;
    final Department? handlingDepartment;
    final List<MediaFile> mediaFiles;
    final List<RequestStatus> requestStatuses;
    final List<Equipment> equipments;

    factory Item.fromJson(Map<String, dynamic> json){ 
        return Item(
            id: json["id"],
            createdAt: DateTime.tryParse(json["createdAt"] ?? ""),
            updatedAt: DateTime.tryParse(json["updatedAt"] ?? ""),
            subject: json["subject"],
            description: json["description"],
            location: json["location"] == null ? null : Location.fromJson(json["location"]),
            verificationStatus: json["verificationStatus"],
            verifiedBy: json["verifiedBy"] == null ? null : Requester.fromJson(json["verifiedBy"]),
            verifiedAt: DateTime.tryParse(json["verifiedAt"] ?? ""),
            confirmationStatus: json["confirmationStatus"],
            rating: json["rating"],
            priority: json["priority"],
            feedback: json["feedback"],
            requester: json["requester"] == null ? null : Requester.fromJson(json["requester"]),
            assignedPersons: json["assignedPersons"] == null ? [] : List<Requester>.from(json["assignedPersons"]!.map((x) => Requester.fromJson(x))),
            maintenanceRequestTypes: json["maintenanceRequestTypes"] == null ? [] : List<MaintenanceRequestType>.from(json["maintenanceRequestTypes"]!.map((x) => MaintenanceRequestType.fromJson(x))),
            handlingDepartment: json["handlingDepartment"] == null ? null : Department.fromJson(json["handlingDepartment"]),
            mediaFiles: json["mediaFiles"] == null ? [] : List<MediaFile>.from(json["mediaFiles"]!.map((x) => MediaFile.fromJson(x))),
            requestStatuses: json["requestStatuses"] == null ? [] : List<RequestStatus>.from(json["requestStatuses"]!.map((x) => RequestStatus.fromJson(x))),
            equipments: json["equipments"] == null ? [] : List<Equipment>.from(json["equipments"]!.map((x) => Equipment.fromJson(x))),
        );
    }

}

class Requester {
    Requester({
        required this.id,
        required this.createdAt,
        required this.updatedAt,
        required this.role,
        required this.email,
        required this.fullName,
        required this.department,
        required this.isVerified,
        required this.lastPasswordUpdatedAt,
    });

    final DateTime? createdAt;
    final DateTime? updatedAt;
    final Role? role;
    final String? email;
    final String? fullName;
    final Department? department;
    final bool? isVerified;
    final DateTime? lastPasswordUpdatedAt;
    final int? id;

    factory Requester.fromJson(Map<String, dynamic> json){ 
        return Requester(
            id: json["id"],
            createdAt: DateTime.tryParse(json["createdAt"] ?? ""),
            updatedAt: DateTime.tryParse(json["updatedAt"] ?? ""),
            role: json["role"] == null ? null : Role.fromJson(json["role"]),
            email: json["email"],
            fullName: json["fullName"],
            department: json["department"] == null ? null : Department.fromJson(json["department"]),
            isVerified: json["isVerified"],
            lastPasswordUpdatedAt: DateTime.tryParse(json["lastPasswordUpdatedAt"] ?? ""),
        );
    }

}

class Department {
    Department({
        required this.id,
        required this.createdAt,
        required this.updatedAt,
        required this.name,
    });

    final DateTime? createdAt;
    final DateTime? updatedAt;
    final String? name;
    final int? id;

    factory Department.fromJson(Map<String, dynamic> json){ 
        return Department(
            id: json["id"],
            createdAt: DateTime.tryParse(json["createdAt"] ?? ""),
            updatedAt: DateTime.tryParse(json["updatedAt"] ?? ""),
            name: json["name"],
        );
    }

}

class Role {
    Role({
        required this.createdAt,
        required this.updatedAt,
        required this.roleName,
    });

    final DateTime? createdAt;
    final DateTime? updatedAt;
    final String? roleName;

    factory Role.fromJson(Map<String, dynamic> json){ 
        return Role(
            createdAt: DateTime.tryParse(json["createdAt"] ?? ""),
            updatedAt: DateTime.tryParse(json["updatedAt"] ?? ""),
            roleName: json["roleName"],
        );
    }

}

class Equipment {
    Equipment({
        required this.createdAt,
        required this.updatedAt,
        required this.name,
        required this.model,
        required this.category,
        required this.amount,
        required this.price,
        required this.clarification,
        required this.priority,
        required this.status,
    });

    final DateTime? createdAt;
    final DateTime? updatedAt;
    final String? name;
    final String? model;
    final String? category;
    final int? amount;
    final String? price;
    final String? clarification;
    final int? priority;
    final String? status;

    factory Equipment.fromJson(Map<String, dynamic> json){ 
        return Equipment(
            createdAt: DateTime.tryParse(json["createdAt"] ?? ""),
            updatedAt: DateTime.tryParse(json["updatedAt"] ?? ""),
            name: json["name"],
            model: json["model"],
            category: json["category"],
            amount: json["amount"],
            price: json["price"],
            clarification: json["clarification"],
            priority: json["priority"],
            status: json["status"],
        );
    }

}

class Location {
    Location({
        required this.createdAt,
        required this.updatedAt,
        required this.blockNumber,
        required this.floor,
        required this.latitude,
        required this.longitude,
        required this.roomNumber,
        required this.isToilet,
    });

    final DateTime? createdAt;
    final DateTime? updatedAt;
    final String? blockNumber;
    final num? floor;
    final num? latitude;
    final num? longitude;
    final String? roomNumber;
    final String? isToilet;

    factory Location.fromJson(Map<String, dynamic> json){ 
        return Location(
            createdAt: DateTime.tryParse(json["createdAt"] ?? ""),
            updatedAt: DateTime.tryParse(json["updatedAt"] ?? ""),
            blockNumber: json["blockNumber"],
            floor: json["floor"],
            latitude: json["latitude"],
            longitude: json["longitude"],
            roomNumber: json["roomNumber"],
            isToilet: json["isToilet"],
        );
    }

}

class MediaFile {
    MediaFile({
        required this.id,
        required this.createdAt,
        required this.updatedAt,
        required this.filename,
        required this.mimetype,
        required this.path,
        required this.uploadedBy,
    });

    final int? id;
    final DateTime? createdAt;
    final DateTime? updatedAt;
    final String? filename;
    final String? mimetype;
    final String? path;
    final UploadedBy? uploadedBy;

    factory MediaFile.fromJson(Map<String, dynamic> json){ 
        return MediaFile(
            id: json["id"],
            createdAt: DateTime.tryParse(json["createdAt"] ?? ""),
            updatedAt: DateTime.tryParse(json["updatedAt"] ?? ""),
            filename: json["filename"],
            mimetype: json["mimetype"],
            path: json["path"],
            uploadedBy: json["uploadedBy"] == null ? null : UploadedBy.fromJson(json["uploadedBy"]),
        );
    }

}

class UploadedBy {
    UploadedBy({required this.json});
    final Map<String,dynamic> json;

    factory UploadedBy.fromJson(Map<String, dynamic> json){ 
        return UploadedBy(
        json: json
        );
    }

}

class RequestStatus {
    RequestStatus({
        required this.createdAt,
        required this.updatedAt,
        required this.request,
        required this.statusType,
        required this.statusUpdatedBy,
        required this.scheduleMaintenanceStartDateTime,
        required this.scheduleMaintenanceEndDateTime,
        required this.internalNote,
        required this.internalVersionChanges,
        required this.externalNote,
        required this.mediaFiles,
        required this.signatureByName,
    });

    final DateTime? createdAt;
    final DateTime? updatedAt;
    final UploadedBy? request;
    final StatusType? statusType;
    final UploadedBy? statusUpdatedBy;
    final DateTime? scheduleMaintenanceStartDateTime;
    final DateTime? scheduleMaintenanceEndDateTime;
    final String? internalNote;
    final String? internalVersionChanges;
    final String? externalNote;
    final List<MediaModel> mediaFiles;
    final String? signatureByName;

    factory RequestStatus.fromJson(Map<String, dynamic> json){ 
        return RequestStatus(
            createdAt: DateTime.tryParse(json["createdAt"] ?? ""),
            updatedAt: DateTime.tryParse(json["updatedAt"] ?? ""),
            request: json["request"] == null ? null : UploadedBy.fromJson(json["request"]),
            statusType: json["statusType"] == null ? null : StatusType.fromJson(json["statusType"]),
            statusUpdatedBy: json["statusUpdatedBy"] == null ? null : UploadedBy.fromJson(json["statusUpdatedBy"]),
            scheduleMaintenanceStartDateTime: DateTime.tryParse(json["scheduleMaintenanceStartDateTime"] ?? ""),
            scheduleMaintenanceEndDateTime: DateTime.tryParse(json["scheduleMaintenanceEndDateTime"] ?? ""),
            internalNote: json["internalNote"],
            internalVersionChanges: json["internalVersionChanges"],
            externalNote: json["externalNote"],
            mediaFiles: (json["mediaFiles"] as List<dynamic>? ?? []).map((x) => MediaModel.fromJson(x)).toList(),
            signatureByName: json["signatureByName"],
        );
    }

}

class StatusType {
    StatusType({
        required this.id,
        required this.createdAt,
        required this.updatedAt,
        required this.name,
        required this.description,
        required this.isInitialStatus,
        required this.hasSchedule,
        required this.needsFile,
        required this.needsSignatures,
        required this.isInternal,
        required this.allowedTransitions,
        required this.allowChangePriority,
        required this.allowChangeconfirmationStatus,
        required this.allowChangeverificationStatus,
        required this.allowsChangeRequestTypes,
        required this.allowsForwardToDepartment,
        required this.allowsForwardToPerson,
        required this.allowsChangeLocation,
        required this.allowsChangeTitleAndDescription,
        required this.allowsChangeMedia,
        required this.allowsAddMoreMedia,
        required this.allowedRoles,
    });

    final DateTime? createdAt;
    final DateTime? updatedAt;
    final String? name;
    final String? description;
    final bool? isInitialStatus;
    final bool? hasSchedule;
    final bool? needsFile;
    final bool? needsSignatures;
    final bool? isInternal;
    final List<StatusType>? allowedTransitions;
    final bool? allowChangePriority;
    final bool? allowChangeconfirmationStatus;
    final bool? allowChangeverificationStatus;
    final bool? allowsChangeRequestTypes;
    final bool? allowsForwardToDepartment;
    final bool? allowsForwardToPerson;
    final bool? allowsChangeLocation;
    final bool? allowsChangeTitleAndDescription;
    final bool? allowsChangeMedia;
    final bool? allowsAddMoreMedia;
    final List<Role>? allowedRoles;
    final int? id;

    factory StatusType.fromJson(Map<String, dynamic> json){ 
        return StatusType(
            id: json["id"],
            createdAt: DateTime.tryParse(json["createdAt"] ?? ""),
            updatedAt: DateTime.tryParse(json["updatedAt"] ?? ""),
            name: json["name"],
            description: json["description"],
            isInitialStatus: json["isInitialStatus"],
            hasSchedule: json["hasSchedule"],
            needsFile: json["needsFile"],
            needsSignatures: json["needsSignatures"],
            isInternal: json["isInternal"],
            allowedTransitions: json["allowedTransitions"] == null ? [] : List<StatusType>.from(json["allowedTransitions"]!.map((x) => StatusType.fromJson(x))),
            allowChangePriority: json["allowChangePriority"],
            allowChangeconfirmationStatus: json["allowChangeconfirmationStatus"],
            allowChangeverificationStatus: json["allowChangeverificationStatus"],
            allowsChangeRequestTypes: json["allowsChangeRequestTypes"],
            allowsForwardToDepartment: json["allowsForwardToDepartment"],
            allowsForwardToPerson: json["allowsForwardToPerson"],
            allowsChangeLocation: json["allowsChangeLocation"],
            allowsChangeTitleAndDescription: json["allowsChangeTitleAndDescription"],
            allowsChangeMedia: json["allowsChangeMedia"],
            allowsAddMoreMedia: json["allowsAddMoreMedia"],
            allowedRoles: json["allowedRoles"] == null ? [] : List<Role>.from(json["allowedRoles"]!.map((x) => Role.fromJson(x))),
        );
    }

  get needSchedule => null;

}

class AllowedTransition {
    AllowedTransition({
        required this.id,
        required this.name,
    });

    final int? id;
    final String? name;

    factory AllowedTransition.fromJson(Map<String, dynamic> json){ 
        return AllowedTransition(
            id: json["id"],
            name: json["name"],
        );
    }

}
