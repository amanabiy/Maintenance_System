import baseApi from "./baseApi";

const maintenanceEquipmentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMaintenanceEquipment: builder.mutation({
      query: ({ maintenanceRequestId }) => ({
        url: `maintenance-requests/${maintenanceRequestId}/maintenance-equipments`,
        method: "POST",
      }),
    }),
    getMaintenanceEquipments: builder.query({
      query: ({ maintenanceRequestId }) => `maintenance-requests/${maintenanceRequestId}/maintenance-equipments`,
    }),
    getMaintenanceEquipmentById: builder.query({
      query: ({ maintenanceRequestId, id }) => `maintenance-requests/${maintenanceRequestId}/maintenance-equipments/${id}`,
    }),
    updateMaintenanceEquipmentById: builder.mutation({
        query: ({ maintenanceRequestId, id }) => ({
          url: `maintenance-requests/${maintenanceRequestId}/maintenance-equipments/${id}`,
          method: "PUT",
        }),
    }),
    deleteMaintenanceEquipmentById: builder.mutation({
        query: ({ maintenanceRequestId, id }) => ({
          url: `maintenance-requests/${maintenanceRequestId}/maintenance-equipments/${id}`,
          method: "DELETE",
        }),
    }),
  }),
});

export default maintenanceEquipmentsApi;
