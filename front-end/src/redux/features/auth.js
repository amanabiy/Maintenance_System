import authApi from "../services/authApi";

export const {
    useRegisterMutation,
    useLoginMutation,
    useVerifyOtpMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useVerifyEmailMutation,
} = authApi;