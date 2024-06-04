import baseApi from "./baseApi";

const requestStatusTypeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRequestStatusType: builder.mutation({
      query: (body) => ({
        url: "request-status-type",
        method: "POST",
        body,
      }),
    }),
    getRequestStatusTypes: builder.query({
      query: () => ({
        url: "request-status-type",
        method: "GET",
      }),
    }),
    getRequestStatusTypeById: builder.query({
      query: (id) => ({
        url: `request-status-type/${id}`,
        method: "GET",
      }),
    }),
    deleteRequestStatusType: builder.mutation({
      query: (id) => ({
        url: `request-status-type/${id}`,
        method: "DELETE",
      }),
    }),
    markInitialRequestStatusType: builder.mutation({
      query: (id) => ({
        url: `request-status-type/${id}/mark-initial`,
        method: "PATCH",
      }),
    }),
  }),
});

export default requestStatusTypeApi;
