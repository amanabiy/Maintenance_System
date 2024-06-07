import roleApi from "../services/roleApi";

export const {
  useCreateRoleMutation,
  useGetAllRolesMutation,
  useGetAllRolesQuery,
  useGetRoleByIdMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useAddPermissionToRoleMutation,
  useRemovePermissionFromRoleMutation,
} = roleApi;
