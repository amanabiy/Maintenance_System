import maintenanceEquipmentsApi from "../services/maintenanceEquipmentsApi";

export const {
    useCreateMaintenanceEquipmentMutation,
    useGetMaintenanceEquipmentsQuery,
    useGetMaintenanceEquipmentByIdQuery,
    useUpdateMaintenanceEquipmentByIdMutation,
    useDeleteMaintenanceEquipmentByIdMutation,
    } = maintenanceEquipmentsApi;