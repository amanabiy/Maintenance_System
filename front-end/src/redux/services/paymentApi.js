import baseApi from "./baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation({
      query: (body) => {
        const isFormData = body instanceof FormData;
        return {
          url: 'payments',
          method: 'POST',
          body: isFormData ? body : JSON.stringify(body),
          headers: isFormData ? {} : { 'Content-Type': 'application/json' },
        };
      },
      invalidatesTags: ['Payment'],
    }),
    getAllPayments: builder.query({
      query: () => "payments",
      providesTags: ['Payment'],
    }),
    getPaymentById: builder.query({
      query: (paymentId) => `payments/${paymentId}`,
      providesTags: (result, error, paymentId) => [{ type: 'Payment', id: paymentId }],
    }),
    deletePayment: builder.mutation({
        query: (id) => ({
            url: `payments/${id}`,
            method: "DELETE",
        }),
        invalidatesTags: ['Payment'],
    }),
    AddReciept: builder.mutation({
      query: ({id, recieptId}) => ({
        url: `payments/${id}/reciept/${recieptId}`,
        method: "PATCH",
      }),
      invalidatesTags: ['Payment'],
    }),
    changeStatus: builder.mutation({
        query: ({id, body}) => ({
            url: `payments/${id}/change-status`,
            method: "PATCH",
            body,
        }),
        tagTypes: ["RequestStatusType"], 
    }),
  }),
  tagTypes: ['Payment'],
});

export default paymentApi;
