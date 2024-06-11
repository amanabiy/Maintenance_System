import paymentApi from "../services/paymentApi";

export const {
    useCreatePaymentMutation,
    useGetAllPaymentsQuery,
    useGetPaymentByIdQuery,
    useDeletePaymentMutation,
    useAddRecieptMutation,
    useChangeStatusMutation,
} = paymentApi;