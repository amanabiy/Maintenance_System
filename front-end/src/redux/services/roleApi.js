import baseApi from "./baseApi";

const roleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRole: builder.mutation({
      query: (body) => ({
        url: "role",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Role"],
    }),
    // getAllRoles: builder.mutation({
    //   query: () => ({
    //     url: "role",
    //     method: "GET",
    //   }),
    // }),
    getAllRoles: builder.query({
      query: () => ({
        url: "role",
        method: "GET",
      }),
      providesTags: ["Role"],
    }),
    getRoleById: builder.mutation({
      query: (id) => ({
        url: `role/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Role"],
    }),
    UpdateRole: builder.mutation({
      query: ({ id, roleName }) => ({
        url: `role/${id}`,
        method: "PATCH",
        body: { roleName },
      }),
      invalidatesTags: ["Role"],
    }),
    deleteRole: builder.mutation({
      query: (id) => ({
        url: `role/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Role"],
    }),
    addPermissionToRole: builder.mutation({
      query: ({ roleId, permissionId }) => ({
        url: `role/${roleId}/permission/${permissionId}`,
        method: "POST",
      }),
      invalidatesTags: ["Role"],
    }),
    removePermissionFromRole: builder.mutation({
      query: ({ roleId, permissionId }) => ({
        url: `role/${roleId}/permission/${permissionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Role"],
    }),
  }),
  tagTypes: ['Role'],
});

export default roleApi;
