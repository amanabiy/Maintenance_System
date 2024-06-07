import roleApi from "../services/roleApi";

export const {
  useCreateRoleMutation,
  useGetAllRolesQuery,
  useGetRoleByIdMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useAddPermissionToRoleMutation,
  useRemovePermissionFromRoleMutation,
} = roleApi;
