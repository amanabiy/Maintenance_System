class MediaModel {
    MediaModel({
        required this.id,
        required this.createdAt,
        required this.updatedAt,
        required this.filename,
        required this.mimetype,
        required this.path,
        required this.uploadedBy,
    });

    final int? id;
    static const String idKey = "id";
    
    final DateTime? createdAt;
    static const String createdAtKey = "createdAt";
    
    final DateTime? updatedAt;
    static const String updatedAtKey = "updatedAt";
    
    final String? filename;
    static const String filenameKey = "filename";
    
    final String? mimetype;
    static const String mimetypeKey = "mimetype";
    
    final String? path;
    static const String pathKey = "path";
    
    final dynamic uploadedBy;
    static const String uploadedByKey = "__uploadedBy__";
    

    MediaModel copyWith({
        int? id,
        DateTime? createdAt,
        DateTime? updatedAt,
        String? filename,
        String? mimetype,
        String? path,
        dynamic? uploadedBy,
    }) {
        return MediaModel(
            id: id ?? this.id,
            createdAt: createdAt ?? this.createdAt,
            updatedAt: updatedAt ?? this.updatedAt,
            filename: filename ?? this.filename,
            mimetype: mimetype ?? this.mimetype,
            path: path ?? this.path,
            uploadedBy: uploadedBy ?? this.uploadedBy,
        );
    }

    factory MediaModel.fromJson(Map<String, dynamic> json){ 
        return MediaModel(
            id: json["id"],
            createdAt: DateTime.tryParse(json["createdAt"] ?? ""),
            updatedAt: DateTime.tryParse(json["updatedAt"] ?? ""),
            filename: json["filename"],
            mimetype: json["mimetype"],
            path: json["path"],
            uploadedBy: json["__uploadedBy__"],
        );
    }

    Map<String, dynamic> toJson() => {
        "id": id,
        "createdAt": createdAt?.toIso8601String(),
        "updatedAt": updatedAt?.toIso8601String(),
        "filename": filename,
        "mimetype": mimetype,
        "path": path,
        "__uploadedBy__": uploadedBy,
    };

    @override
    String toString(){
        return "$id, $createdAt, $updatedAt, $filename, $mimetype, $path, $uploadedBy, ";
    }
}
