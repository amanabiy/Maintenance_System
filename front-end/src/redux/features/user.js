import userApi from "../services/userApi";

export const {
  useCreateUserMutation,
  useGetAllUsersQuery,
  useGetUsersFuzzyQuery,
  useGetMeQuery,
  useUpdateMeMutation,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useUpdateUserByIdMutation,
  useDeleteUserByIdMutation,
} = userApi;
