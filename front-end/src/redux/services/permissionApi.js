import baseApi from "./baseApi";

const permissionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllPermissions: builder.query({
            query: () => 'permission',
        }),
    }),
});

export default permissionApi;