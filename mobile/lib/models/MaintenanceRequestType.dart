class MaintenanceRequestType {
    MaintenanceRequestType({
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
    

    MaintenanceRequestType copyWith({
        int? id,
        DateTime? createdAt,
        DateTime? updatedAt,
        String? name,
        String? description,
    }) {
        return MaintenanceRequestType(
            id: id ?? this.id,
            createdAt: createdAt ?? this.createdAt,
            updatedAt: updatedAt ?? this.updatedAt,
            name: name ?? this.name,
            description: description ?? this.description,
        );
    }

    factory MaintenanceRequestType.fromJson(Map<String, dynamic> json){ 
        return MaintenanceRequestType(
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
