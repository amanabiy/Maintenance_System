import baseApi from "./baseApi";

const statsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        usersByDepartment: builder.query({
            query: () => 'stats/users/by-department',
        }),
        timeSpentByStage: builder.query({
            query: ({startDate, endDate}) => 'stats/time-spent-by-stage',
        }),
        maintenanceCost: builder.query({
            query: ({startDate, endDate, groupBy, maintenanceRequestTypeId}) => `stats/maintenance-count?startDate=${startDate}&endDate=${endDate}&groupBy=${groupBy}`,
        }),
    }),
});

export default statsApi;
