import 'dart:developer';

import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../network/endpoints.dart';

class Api {
  Dio dio = Dio();
  final FlutterSecureStorage _storage = const FlutterSecureStorage();

  Api() {
    dio.options.connectTimeout = const Duration(milliseconds: 30000); //5s
    dio.options.receiveTimeout = const Duration(milliseconds: 20000);

    // add interceptro which handle refresh token

    dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) async {
        // add token to header
        options.headers["Authorization"] =
            "Bearer ${await _storage.read(key: 'accessToken')}";
        return handler.next(options); //continue
      },
      onResponse: (response, handler) {
        return handler.next(response); // continue
      },
      onError: (DioError e, handler) async {
        // handle refresh token if response return 401
        if (e.response?.statusCode == 401) {
          // retry request
          try {
            await refreshToken();
            await retryRequest(e.requestOptions);
          } catch (refreshTokenError) {
            DioException refreshTokenError = DioException(
              message: "refresh",
              requestOptions: e.requestOptions,
              response: e.response,
            );
            handler.next(refreshTokenError);
          }
        }
        return handler.next(e); //continue
      },
    ));
  }

  //  retry request function
  Future<Response> retryRequest(RequestOptions requestOptions) async {
    return dio.request(
      requestOptions.path,
      data: requestOptions.data,
      options: Options(
        method: requestOptions.method,
        headers: requestOptions.headers,
      ),
    );
  }

  // refresh token function
  Future<void> refreshToken() async {
    try {
      final token = await _storage.read(key: 'refreshToken');
      log(token.toString());
      final refreshTokenResponse = await dio.post(Endpoints.refresh, data: {
        "refreshToken": token,
      });

      if (refreshTokenResponse.statusCode == 200) {
        // save new token
        final accessToken = refreshTokenResponse.data["accessToken"];
        // save new token
        await _storage.write(key: 'accessToken', value: accessToken);
      } else {
        throw Exception();
      }
    } catch (e) {
      throw Exception();
      // throw Exception("expired");
    }
  }

  // post method with data
  Future<Response> post(String url, Map data) async {
    try {
      var res = await dio.post(url, data: data);
      return res;
    } on DioError catch (e) {
      // Empty body
      print(e.response?.data);
      var errorMessage = e.response?.data['message'];
      if (e.response?.data['message'].runtimeType != String) {
        errorMessage = e.response?.data['message'][0];
      }
      throw Exception(errorMessage);
    }
  }

  // get method
  Future<Response> get(String url) async {
    try {
      return await dio.get(url);
    } on DioError catch (e) {
      // Empty body
      print(e.response?.data);
      throw Exception(e.response?.data['message']);
    }
  }

  // put method
  Future<Response> put(String url, Map data) async {
    try {
      return await dio.put(url, data: data);
    } on DioError catch (e) {
      // Empty body
      throw Exception(e.response?.data['message']);
    }
  }

  // delete method
  Future<Response> delete(String url) async {
    try {
      return await dio.delete(url);
    } on DioError catch (e) {
      // Empty body
      throw Exception(e.response?.data['message']);
    }
  }

  // post multipartData
  Future<Response> upload(String url, FormData data) async {
    try {
      return await dio.post(url, data: data);
    } on DioError catch (e) {
      // Empty body
      throw Exception(e.response?.data['message']);
    }
  }

  // put multipartData
  Future<Response> edit(String url, FormData data) async {
    try {
      return await dio.put(url, data: data);
    } on DioError catch (e) {
      // Empty body
      throw Exception(e.response?.data['message']);
    }
  }

  
}
