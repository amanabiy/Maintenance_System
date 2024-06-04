import departmentApi from "../services/departmentApi";

export const {
  useCreateDepartmentMutation,
  useGetAllDepartmentsQuery,
  useGetDepartmentByIdQuery,
  useUpdateDepartmentByIdMutation,
  useDeleteDepartmentByIdMutation,
} = departmentApi;
