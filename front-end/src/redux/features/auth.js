import authApi from "../services/authApi";

export const {
    useCreateUserMutation,
    useRegisterMutation,
    useLoginMutation,
    useVerifyOtpMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useVerifyEmailMutation,
    useRequestVerificationEmailMutation,
    useRequestOtpMutation,
    useUpdateMeMutation,
} = authApi;