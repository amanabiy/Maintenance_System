import userApi from "../services/userApi";

export const {
    useCreateUserMutation,
    useGetAllUsersQuery,
    useGetUserByIdQuery,
    useUpdateUserByIdMutation,
    useDeleteUserByIdMutation,
} = userApi;