import baseApi from "./baseApi";

const requestStatusApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStatuses: builder.query({
      query: (requestId) => `maintenance-requests/${requestId}/statuses`,
    }),
    getStatusById: builder.query({
      query: ({ requestId, statusId }) =>
        `maintenance-requests/${requestId}/statuses/${statusId}`,
    }),
    updateStatusById: builder.mutation({
      query: ({ requestId, nextRequestTypeId, body }) => ({
        url: `maintenance-requests/${requestId}/statuses/${nextRequestTypeId}`,
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export default requestStatusApi;
