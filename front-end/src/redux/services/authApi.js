import baseApi from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (body) => {
        const isFormData = body instanceof FormData;
        return {
          url: "auth/create-user",
          method: "POST",
          body: isFormData ? body : JSON.stringify(body),
          headers: isFormData ? {} : { "Content-Type": "application/json" },
        };
      },
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "auth/register",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (body) => ({
        url: "auth/verify-otp",
        method: "POST",
        body,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: `auth/request-otp/${body.email}`,
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "auth/reset-password",
        method: "POST",
        body,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (token) => ({
        url: `auth/verify-email/${token}`,
        method: "POST",
      }),
    }),
    requestVerificationEmail: builder.mutation({
      query: (email) => ({
        url: `auth/request-new-token-to-verify-email/${email}`,
        method: "GET",
      }),
    }),
    requestOtp: builder.mutation({
      query: (email) => ({
        url: `auth/request-otp/${email}`,
        method: "POST",
      }),
    }),
    updateMe: builder.mutation({
      query: (body) => {
        const isFormData = body instanceof FormData;
        return {
          url: "auth/logged-in-user",
          method: "PATCH",
          body: isFormData ? body : JSON.stringify(body),
          headers: isFormData ? {} : { "Content-Type": "application/json" },
        };
      },
    }),
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: `auth/refresh-token/${refreshToken}`,
        method: "GET",
      }),
    }),
  }),
});

export default authApi;
