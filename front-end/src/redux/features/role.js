import roleApi from "../services/roleApi";

export const {
    useCreateRoleMutation,
    useGetAllRolesMutation,
    useGetRoleByIdMutation,
    useUpdateRoleMutation,
    useDeleteRoleMutation,
    useAddPermissionToRoleMutation,
    useRemovePermissionFromRoleMutation,
} = roleApi;