class User {
    User({
        required this.id,
        required this.createdAt,
        required this.updatedAt,
        required this.email,
        required this.fullName,
        required this.phoneNumber,
        required this.isVerified,
        required this.lastPasswordUpdatedAt,
        required this.role,
        required this.department,
    });

    final int? id;
    static const String idKey = "id";
    
    final DateTime? createdAt;
    static const String createdAtKey = "createdAt";
    
    final DateTime? updatedAt;
    static const String updatedAtKey = "updatedAt";
    
    final String? email;
    static const String emailKey = "email";
    
    final String? fullName;
    static const String fullNameKey = "fullName";
    
    final String? phoneNumber;
    static const String phoneNumberKey = "phoneNumber";
    
    final bool? isVerified;
    static const String isVerifiedKey = "isVerified";
    
    final DateTime? lastPasswordUpdatedAt;
    static const String lastPasswordUpdatedAtKey = "lastPasswordUpdatedAt";
    
    final Role? role;
    static const String roleKey = "role";
    
    final dynamic department;
    static const String departmentKey = "department";
    

    User copyWith({
        int? id,
        DateTime? createdAt,
        DateTime? updatedAt,
        String? email,
        String? fullName,
        String? phoneNumber,
        bool? isVerified,
        DateTime? lastPasswordUpdatedAt,
        Role? role,
        dynamic? department,
    }) {
        return User(
            id: id ?? this.id,
            createdAt: createdAt ?? this.createdAt,
            updatedAt: updatedAt ?? this.updatedAt,
            email: email ?? this.email,
            fullName: fullName ?? this.fullName,
            phoneNumber: phoneNumber ?? this.phoneNumber,
            isVerified: isVerified ?? this.isVerified,
            lastPasswordUpdatedAt: lastPasswordUpdatedAt ?? this.lastPasswordUpdatedAt,
            role: role ?? this.role,
            department: department ?? this.department,
        );
    }

    factory User.fromJson(Map<String, dynamic> json){ 
        return User(
            id: json["id"],
            createdAt: DateTime.tryParse(json["createdAt"] ?? ""),
            updatedAt: DateTime.tryParse(json["updatedAt"] ?? ""),
            email: json["email"],
            fullName: json["fullName"],
            phoneNumber: json["phoneNumber"],
            isVerified: json["isVerified"],
            lastPasswordUpdatedAt: DateTime.tryParse(json["lastPasswordUpdatedAt"] ?? ""),
            role: json["role"] == null ? null : Role.fromJson(json["role"]),
            department: json["department"],
        );
    }

    Map<String, dynamic> toJson() => {
        "id": id,
        "createdAt": createdAt?.toIso8601String(),
        "updatedAt": updatedAt?.toIso8601String(),
        "email": email,
        "fullName": fullName,
        "phoneNumber": phoneNumber,
        "isVerified": isVerified,
        "lastPasswordUpdatedAt": lastPasswordUpdatedAt?.toIso8601String(),
        "role": role?.toJson(),
        "department": department,
    };

    @override
    String toString(){
        return "$id, $createdAt, $updatedAt, $email, $fullName, $phoneNumber, $isVerified, $lastPasswordUpdatedAt, $role, $department, ";
    }
}

class Role {
    Role({
        required this.id,
        required this.createdAt,
        required this.updatedAt,
        required this.roleName,
        required this.permissions,
    });

    final int? id;
    static const String idKey = "id";
    
    final DateTime? createdAt;
    static const String createdAtKey = "createdAt";
    
    final DateTime? updatedAt;
    static const String updatedAtKey = "updatedAt";
    
    final String? roleName;
    static const String roleNameKey = "roleName";
    
    final List<Permission> permissions;
    static const String permissionsKey = "permissions";
    

    Role copyWith({
        int? id,
        DateTime? createdAt,
        DateTime? updatedAt,
        String? roleName,
        List<Permission>? permissions,
    }) {
        return Role(
            id: id ?? this.id,
            createdAt: createdAt ?? this.createdAt,
            updatedAt: updatedAt ?? this.updatedAt,
            roleName: roleName ?? this.roleName,
            permissions: permissions ?? this.permissions,
        );
    }

    factory Role.fromJson(Map<String, dynamic> json){ 
        return Role(
            id: json["id"],
            createdAt: DateTime.tryParse(json["createdAt"] ?? ""),
            updatedAt: DateTime.tryParse(json["updatedAt"] ?? ""),
            roleName: json["roleName"],
            permissions: json["permissions"] == null ? [] : List<Permission>.from(json["permissions"]!.map((x) => Permission.fromJson(x))),
        );
    }

    Map<String, dynamic> toJson() => {
        "id": id,
        "createdAt": createdAt?.toIso8601String(),
        "updatedAt": updatedAt?.toIso8601String(),
        "roleName": roleName,
        "permissions": permissions.map((x) => x?.toJson()).toList(),
    };

    @override
    String toString(){
        return "$id, $createdAt, $updatedAt, $roleName, $permissions, ";
    }
}

class Permission {
    Permission({
        required this.id,
        required this.createdAt,
        required this.updatedAt,
        required this.name,
        required this.description,
    });

    final int? id;
    static const String idKey = "id";
    
    final DateTime? createdAt;
    static const String createdAtKey = "createdAt";
    
    final DateTime? updatedAt;
    static const String updatedAtKey = "updatedAt";
    
    final String? name;
    static const String nameKey = "name";
    
    final String? description;
    static const String descriptionKey = "description";
    

    Permission copyWith({
        int? id,
        DateTime? createdAt,
        DateTime? updatedAt,
        String? name,
        String? description,
    }) {
        return Permission(
            id: id ?? this.id,
            createdAt: createdAt ?? this.createdAt,
            updatedAt: updatedAt ?? this.updatedAt,
            name: name ?? this.name,
            description: description ?? this.description,
        );
    }

    factory Permission.fromJson(Map<String, dynamic> json){ 
        return Permission(
            id: json["id"],
            createdAt: DateTime.tryParse(json["createdAt"] ?? ""),
            updatedAt: DateTime.tryParse(json["updatedAt"] ?? ""),
            name: json["name"],
            description: json["description"],
        );
    }

    Map<String, dynamic> toJson() => {
        "id": id,
        "createdAt": createdAt?.toIso8601String(),
        "updatedAt": updatedAt?.toIso8601String(),
        "name": name,
        "description": description,
    };

    @override
    String toString(){
        return "$id, $createdAt, $updatedAt, $name, $description, ";
    }
}
