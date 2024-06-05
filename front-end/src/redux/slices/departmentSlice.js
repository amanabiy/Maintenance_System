import { createSlice } from "@reduxjs/toolkit";
import departmentApi from "../services/departmentApi";

const initialState = {
  departments: [],
  currentDepartment: null,
  status: "idle",
  error: null,
};

const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {
    setCurrentDepartment: (state, action) => {
      state.currentDepartment = action.payload;
    },
    clearCurrentDepartment: (state) => {
      state.currentDepartment = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        departmentApi.endpoints.getAllDepartments.matchPending,
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        departmentApi.endpoints.getAllDepartments.matchFulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.departments = action.payload;
        }
      )
      .addMatcher(
        departmentApi.endpoints.getAllDepartments.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      )
      .addMatcher(
        departmentApi.endpoints.getDepartmentById.matchPending,
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        departmentApi.endpoints.getDepartmentById.matchFulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.currentDepartment = action.payload;
        }
      )
      .addMatcher(
        departmentApi.endpoints.getDepartmentById.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      )
      .addMatcher(
        departmentApi.endpoints.createDepartment.matchPending,
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        departmentApi.endpoints.createDepartment.matchFulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.departments.push(action.payload);
        }
      )
      .addMatcher(
        departmentApi.endpoints.createDepartment.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      )
      .addMatcher(
        departmentApi.endpoints.updateDepartmentById.matchPending,
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        departmentApi.endpoints.updateDepartmentById.matchFulfilled,
        (state, action) => {
          state.status = "succeeded";
          const { id, ...updatedDepartment } = action.payload;
          const existingDepartment = state.departments.find(
            (dep) => dep.id === id
          );
          if (existingDepartment) {
            Object.assign(existingDepartment, updatedDepartment);
          }
        }
      )
      .addMatcher(
        departmentApi.endpoints.updateDepartmentById.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      )
      .addMatcher(
        departmentApi.endpoints.deleteDepartmentById.matchPending,
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        departmentApi.endpoints.deleteDepartmentById.matchFulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.departments = state.departments.filter(
            (dep) => dep.id !== action.payload
          );
        }
      )
      .addMatcher(
        departmentApi.endpoints.deleteDepartmentById.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export const { setCurrentDepartment, clearCurrentDepartment } =
  departmentSlice.actions;

export default departmentSlice.reducer;
