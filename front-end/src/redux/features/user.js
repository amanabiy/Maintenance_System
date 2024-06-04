import userApi from "../services/userApi";

export const {
  useCreateUserMutation,
  useGetAllUsersQuery,
  useGetUsersFuzzyQuery,
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
  useDeleteUserByIdMutation,
} = userApi;
