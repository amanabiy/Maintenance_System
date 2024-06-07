class NotificationModel {
  NotificationModel({
    required this.id,
    required this.createdAt,
    required this.updatedAt,
    required this.type,
    required this.subject,
    required this.message,
    required this.isRead,
    required this.maintenanceRequest,
  });

  final int? id;
  static const String idKey = "id";

  final DateTime? createdAt;
  static const String createdAtKey = "createdAt";

  final DateTime? updatedAt;
  static const String updatedAtKey = "updatedAt";

  final String? type;
  static const String typeKey = "type";

  final String? subject;
  static const String subjectKey = "subject";

  final String? message;
  static const String messageKey = "message";

  final bool? isRead;
  static const String isReadKey = "isRead";

  final MaintenanceRequest? maintenanceRequest;
  static const String maintenanceRequestKey = "maintenanceRequest";

  NotificationModel copyWith({
    int? id,
    DateTime? createdAt,
    DateTime? updatedAt,
    String? type,
    String? subject,
    String? message,
    bool? isRead,
    MaintenanceRequest? maintenanceRequest,
  }) {
    return NotificationModel(
      id: id ?? this.id,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
      type: type ?? this.type,
      subject: subject ?? this.subject,
      message: message ?? this.message,
      isRead: isRead ?? this.isRead,
      maintenanceRequest: maintenanceRequest ?? this.maintenanceRequest,
    );
  }

  factory NotificationModel.fromJson(Map<String, dynamic> json) {
    return NotificationModel(
      id: json["id"],
      createdAt: json["createdAt"] != null ? DateTime.parse(json["createdAt"]) : null,
      updatedAt: json["updatedAt"] != null ? DateTime.parse(json["updatedAt"]) : null,
      type: json["type"],
      subject: json["subject"],
      message: json["message"],
      isRead: json["isRead"],
      maintenanceRequest: json["maintenanceRequest"] != null
          ? MaintenanceRequest.fromJson(json["maintenanceRequest"])
          : null,
    );
  }

  Map<String, dynamic> toJson() => {
        "id": id,
        "createdAt": createdAt?.toIso8601String(),
        "updatedAt": updatedAt?.toIso8601String(),
        "type": type,
        "subject": subject,
        "message": message,
        "isRead": isRead,
        "maintenanceRequest": maintenanceRequest?.toJson(),
      };

  @override
  String toString() {
    return "$id, $createdAt, $updatedAt, $type, $subject, $message, $isRead";
  }
}

class MaintenanceRequest {
  MaintenanceRequest({
    required this.id,
  });

  final int? id;
  static const String idKey = "id";

  MaintenanceRequest copyWith({
    int? id,
  }) {
    return MaintenanceRequest(
      id: id ?? this.id,
    );
  }

  factory MaintenanceRequest.fromJson(Map<String, dynamic> json) {
    return MaintenanceRequest(
      id: json["id"],
    );
  }

  Map<String, dynamic> toJson() => {
        "id": id,
      };

  @override
  String toString() {
    return "$id";
  }
}
