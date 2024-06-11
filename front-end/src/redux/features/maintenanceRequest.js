import maintenanceRequestApi from "../services/maintenanceRequestApi";

export const {
  useCreateMaintenanceRequestMutation,
  useGetMaintenanceRequestsQuery,
  useGetMaintenanceRequestByIdQuery,
  useLazyGetMaintenanceRequestByIdQuery,
  useUpdateMaintenanceRequestMutation,
  useDeleteMaintenanceRequestMutation,
  useSearchMaintenanceRequestsMutation,
} = maintenanceRequestApi;
