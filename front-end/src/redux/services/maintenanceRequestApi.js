import baseApi from "./baseApi";

const maintenanceRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMaintenanceRequest: builder.mutation({
      query: (body) => ({
        url: "maintenance-request",
        method: "POST",
        body,
      }),
    }),
    getMaintenanceRequests: builder.query({
      query: () => ({
        url: "maintenance-request",
        method: "GET",
      }),
    }),
    getMaintenanceRequestById: builder.query({
      query: (id) => ({
        url: `maintenance-request/${id}`,
        method: "GET",
      }),
    }),
    updateMaintenanceRequest: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `maintenance-request/${id}`,
        method: "PATCH",
        body,
      }),
    }),
    deleteMaintenanceRequest: builder.mutation({
      query: (id) => ({
        url: `maintenance-request/${id}`,
        method: "DELETE",
      }),
    }),
    searchMaintenanceRequests: builder.mutation({
      query: (body) => ({
        url: "maintenance-request/search",
        method: "POST",
        body,
      }),
    }),
  }),
});

export default maintenanceRequestApi;
