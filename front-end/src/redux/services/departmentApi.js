import baseApi from "./baseApi";

const departmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDepartment: builder.mutation({
      query: (body) => ({
        url: "department",
        method: "POST",
        body,
      }),
    }),
    getAllDepartments: builder.query({
      query: () => ({
        url: "department",
        method: "GET",
      }),
    }),
    getDepartmentById: builder.query({
      query: (id) => ({
        url: `department/${id}`,
        method: "GET",
      }),
    }),
    updateDepartmentById: builder.mutation({
      query: ({ id, body }) => ({
        url: `department/${id}`,
        method: "PATCH",
        body,
      }),
    }),
    deleteDepartmentById: builder.mutation({
      query: (id) => ({
        url: `department/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export default departmentApi;
