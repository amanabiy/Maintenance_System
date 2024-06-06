import baseApi from "./baseApi";

const departmentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({  
        getAllDepartments: builder.query({
            query: () => 'department',
        }),
    }),
});

export default departmentApi;