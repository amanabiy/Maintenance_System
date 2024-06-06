import requestStatusTypeApi from "../services/requestStatusTypeApi";

export const {
  useCreateRequestStatusTypeMutation,
  useGetRequestStatusTypesQuery,
  useGetRequestStatusTypeByIdQuery,
  useDeleteRequestStatusTypeMutation,
  useMarkInitialRequestStatusTypeMutation,
  useUpdateRequestStatusTypeByIdMutation,
} = requestStatusTypeApi;
