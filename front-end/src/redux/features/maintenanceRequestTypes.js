import maintenanceRequestTypesApi from "../services/maintenanceRequestTypesApi";

export const {
  useCreateMaintenanceRequestTypeMutation,
  useGetAllMaintenanceRequestTypesQuery,
  useGetMaintenanceRequestTypeByIdQuery,
  useUpdateMaintenanceRequestTypeByIdMutation,
  useDeleteMaintenanceRequestTypeByIdMutation,
  useFuzzySearchMaintenanceRequestTypesQuery,
  useFuzzySearchMutation,
} = maintenanceRequestTypesApi;
