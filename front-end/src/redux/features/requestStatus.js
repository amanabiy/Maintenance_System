import requestStatusApi from "../services/requestStatusApi";

export const {
  useGetAllStatusesQuery,
  useGetStatusByIdQuery,
  useUpdateStatusByIdMutation,
} = requestStatusApi;
