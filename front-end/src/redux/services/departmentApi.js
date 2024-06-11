import baseApi from "./baseApi";

const departmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDepartment: builder.mutation({
      query: (body) => ({
        url: "department",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Department"],
    }),
    getAllDepartments: builder.query({
      query: () => ({
        url: "department",
        method: "GET",
      }),
      providesTags: ["Department"],
    }),
    getDepartmentById: builder.query({
      query: (id) => ({
        url: `department/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Department", id }],
    }),
    updateDepartmentById: builder.mutation({
      query: ({ id, name }) => ({
        url: `department/${id}`,
        method: "PATCH",
        body: JSON.stringify({ name }),
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Department"],
    }),
    deleteDepartmentById: builder.mutation({
      query: (id) => ({
        url: `department/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Department"],
    }),
  }),
  tagTypes: ["Department"], 
});

export default departmentApi;
