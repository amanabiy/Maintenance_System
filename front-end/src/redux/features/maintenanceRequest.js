import maintenanceRequestApi from "../services/maintenanceRequestApi";

export const {
  useCreateMaintenanceRequestMutation,
  useGetMaintenanceRequestsQuery,
  useGetMaintenanceRequestByIdQuery,
  useUpdateMaintenanceRequestMutation,
  useDeleteMaintenanceRequestMutation,
  useSearchMaintenanceRequestsMutation,
} = maintenanceRequestApi;
