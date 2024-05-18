import baseApi from "./baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (body) => ({
                url: 'auth/register',
                method: 'POST',
                body,
            }),
        }),
        login: builder.mutation({
            query: (body) => ({
                url: 'auth/login',
                method: 'POST',
                body,
            }),
        }),
        verifyOtp: builder.mutation({
            query: (body) => ({
                url: 'auth/verify-otp',
                method: 'POST',
                body,
            }),
        }),
        forgotPassword: builder.mutation({
            query: (body) => ({
                url: `auth/request-otp/${body.email}`,
                method: 'POST',
                body,
            }),
        }),
        resetPassword: builder.mutation({
            query: (body) => ({
                url: 'auth/reset-password',
                method: 'POST',
                body,
            })
        }),
        verifyEmail: builder.mutation({
            query: (token) => ({
                url: `auth/verify-email/${token}`,
                method: 'POST',
            })
        }),
    }),
});

export default authApi;