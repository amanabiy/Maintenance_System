class Endpoints {
  static String baseUrl = "http://23.94.117.101:8081/api/v1";
  static String login = "$baseUrl/auth/login";
  static String signup = "$baseUrl/auth/register";
  static String refresh = "$baseUrl/auth/refresh-token";
  static String forgotPasswordRequestOtp = "$baseUrl/auth/request-otp";
  static String request = "$baseUrl/maintenance-request";
  static String createRequest = "$baseUrl/maintenance-request";
  static String uploadFile = "$baseUrl/media/upload";
  static String deleteFile = "$baseUrl/media";
}
