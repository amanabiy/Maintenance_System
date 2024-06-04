import baseApi from "./baseApi";

const maintenanceRequestTypesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        fuzzySearch: builder.mutation({
            query: (term) => ({
                url: `maintenance-request-types/fuzzy-search/${term}`,
                method: 'GET',
            })
        }),
    }),
});

export default maintenanceRequestTypesApi;