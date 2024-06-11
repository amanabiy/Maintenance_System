class Endpoints {
  static String baseUrl = "http://23.94.117.101:8081/api/v1";

  // Auth
  static String login = "$baseUrl/auth/login";
  static String signup = "$baseUrl/auth/register";
  static String refresh = "$baseUrl/auth/refresh-token";
  static String forgotPasswordRequestOtp = "$baseUrl/auth/request-otp";

  // Users
  static String fuzzySearchUsers = "$baseUrl/users/fuzzy-search";

  // Requests
  static String request = "$baseUrl/maintenance-request";
  static String myRequests = "$baseUrl/maintenance-request/my-requests";
  static String createRequest = "$baseUrl/maintenance-request";
  static String requestById= "$baseUrl/maintenance-request";
  static String updateRequest = "$baseUrl/maintenance-request";
  static String assignedToMeRequests = "$baseUrl/maintenance-request/assigned-to-me?page=1&limit=10000";
  static String requestsAssignedToMyRole = "$baseUrl/maintenance-request/by-my-role";
  static String departmentRequests = "$baseUrl/maintenance-request/my-department";

  // Media
  static String uploadFile = "$baseUrl/media/upload";
  static String deleteFile = "$baseUrl/media";

  // Profile
  static String getMyProfile = "$baseUrl/users/me";
  static String updateMyProfile = "$baseUrl/auth/logged-in-user";

  // Media
  static String mediaServe = "$baseUrl/media/server";

  // Notifications
  static String getMyNotification = '${Endpoints.baseUrl}/notifications/logged-in-user';

  // Maintenance Request Type
  static String maintenanceRequestTypeFuzzy = "$baseUrl/maintenance-request-types/fuzzy-search";

  // Request Status Type
  static String RequestStatusTypeById = "$baseUrl/request-status-type";

  // change status of a request
  static String changeRequestStatus = "$baseUrl/maintenance-requests";

  

}
