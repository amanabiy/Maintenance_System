import baseApi from "./baseApi";

const requestStatusTypeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRequestStatusType: builder.mutation({
      query: (body) => ({
        url: "request-status-type",
        method: "POST",
        body,
      }),
      invalidatesTags: ["RequestStatusType"],
    }),
    getRequestStatusTypes: builder.query({
      query: () => ({
        url: "request-status-type",
        method: "GET",
      }),
      providesTags: ["RequestStatusType"],
    }),
    getRequestStatusTypeById: builder.query({
      query: (id) => ({
        url: `request-status-type/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "RequestStatusType", id }],
    }),
    deleteRequestStatusType: builder.mutation({
      query: (id) => ({
        url: `request-status-type/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["RequestStatusType"],
    }),
    markInitialRequestStatusType: builder.mutation({
      query: (id) => ({
        url: `request-status-type/${id}/mark-initial`,
        method: "PATCH",
      }),
      invalidatesTags: ["RequestStatusType"],
    }),
    updateRequestStatusTypeById: builder.mutation({
      query: ({ id, body }) => ({
        url: `request-status-type/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["RequestStatusType"],
    }),
  }),
  tagTypes: ["RequestStatusType"], // Add tagTypes here
});

export default requestStatusTypeApi;
