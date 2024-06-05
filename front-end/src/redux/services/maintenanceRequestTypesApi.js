import baseApi from "./baseApi";

const maintenanceRequestTypesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMaintenanceRequestType: builder.mutation({
      query: (body) => ({
        url: "maintenance-request-types",
        method: "POST",
        body,
      }),
    }),
    getAllMaintenanceRequestTypes: builder.query({
      query: () => `maintenance-request-types`,
    }),
    getMaintenanceRequestTypeById: builder.query({
      query: (id) => `maintenance-request-types/${id}`,
    }),
    updateMaintenanceRequestTypeById: builder.mutation({
      query: ({ id, body }) => ({
        url: `maintenance-request-types/${id}`,
        method: "PATCH",
        body,
      }),
    }),
    deleteMaintenanceRequestTypeById: builder.mutation({
      query: (id) => ({
        url: `maintenance-request-types/${id}`,
        method: "DELETE",
      }),
    }),
    fuzzySearchMaintenanceRequestTypes: builder.query({
      query: (term) => `maintenance-request-types/fuzzy-search/${term}`,
    }),
    fuzzySearch: builder.mutation({
      query: (term) => ({
        url: `maintenance-request-types/fuzzy-search/${term}`,
        method: "GET",
      }),
    }),
  }),
});

export default maintenanceRequestTypesApi;
