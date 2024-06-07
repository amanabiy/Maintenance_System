import baseApi from "./baseApi";

const roleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRole: builder.mutation({
      query: (body) => ({
        url: "role",
        method: "POST",
        body,
      }),
      providesTags: ["Role"],
    }),
    getAllRoles: builder.mutation({
      query: () => ({
        url: "role",
        method: "GET",
      }),
    }),
    getAllRoles: builder.query({
      query: () => ({
        url: "role",
        method: "GET",
      }),
    }),
    getRoleById: builder.mutation({
      query: (id) => ({
        url: `role/${id}`,
        method: "GET",
      }),
    }),
    UpdateRole: builder.mutation({
      query: ({ id, roleName }) => ({
        url: `role/${id}`,
        method: "PATCH",
        body: { roleName },
      }),
    }),
    deleteRole: builder.mutation({
      query: (id) => ({
        url: `role/${id}`,
        method: "DELETE",
      }),
      providesTags: ["Role"],
    }),
    addPermissionToRole: builder.mutation({
      query: ({ roleId, permissionId }) => ({
        url: `role/${roleId}/permission/${permissionId}`,
        method: "POST",
      }),
    }),
    removePermissionFromRole: builder.mutation({
      query: ({ roleId, permissionId }) => ({
        url: `role/${roleId}/permission/${permissionId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export default roleApi;
