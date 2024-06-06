import { createSlice } from "@reduxjs/toolkit";
import maintenanceRequestTypesApi from "../services/maintenanceRequestTypesApi"; // Correcting the import path

const initialState = {
  maintenanceRequestType: null,
  maintenanceRequestTypes: [],
  loading: false,
  error: null,
};

const maintenanceRequestTypesSlice = createSlice({
  name: "maintenanceRequestTypes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        maintenanceRequestTypesApi.endpoints.getAllMaintenanceRequestTypes
          .matchPending,
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        maintenanceRequestTypesApi.endpoints.getAllMaintenanceRequestTypes
          .matchFulfilled,
        (state, action) => {
          state.loading = false;
          state.maintenanceRequestTypes = action.payload;
        }
      )
      .addMatcher(
        maintenanceRequestTypesApi.endpoints.getAllMaintenanceRequestTypes
          .matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      )
      .addMatcher(
        maintenanceRequestTypesApi.endpoints.getMaintenanceRequestTypeById
          .matchPending,
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        maintenanceRequestTypesApi.endpoints.getMaintenanceRequestTypeById
          .matchFulfilled,
        (state, action) => {
          state.loading = false;
          state.maintenanceRequestType = action.payload;
        }
      )
      .addMatcher(
        maintenanceRequestTypesApi.endpoints.getMaintenanceRequestTypeById
          .matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      )
      .addMatcher(
        maintenanceRequestTypesApi.endpoints.createMaintenanceRequestType
          .matchPending,
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        maintenanceRequestTypesApi.endpoints.createMaintenanceRequestType
          .matchFulfilled,
        (state, action) => {
          state.loading = false;
          state.maintenanceRequestTypes.push(action.payload);
        }
      )
      .addMatcher(
        maintenanceRequestTypesApi.endpoints.createMaintenanceRequestType
          .matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      )
      .addMatcher(
        maintenanceRequestTypesApi.endpoints.updateMaintenanceRequestTypeById
          .matchPending,
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        maintenanceRequestTypesApi.endpoints.updateMaintenanceRequestTypeById
          .matchFulfilled,
        (state, action) => {
          state.loading = false;
          const index = state.maintenanceRequestTypes.findIndex(
            (type) => type.id === action.payload.id
          );
          if (index !== -1) {
            state.maintenanceRequestTypes[index] = action.payload;
          }
        }
      )
      .addMatcher(
        maintenanceRequestTypesApi.endpoints.updateMaintenanceRequestTypeById
          .matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      )
      .addMatcher(
        maintenanceRequestTypesApi.endpoints.deleteMaintenanceRequestTypeById
          .matchPending,
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        maintenanceRequestTypesApi.endpoints.deleteMaintenanceRequestTypeById
          .matchFulfilled,
        (state, action) => {
          state.loading = false;
          state.maintenanceRequestTypes = state.maintenanceRequestTypes.filter(
            (type) => type.id !== action.meta.arg
          );
        }
      )
      .addMatcher(
        maintenanceRequestTypesApi.endpoints.deleteMaintenanceRequestTypeById
          .matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      )
      .addMatcher(
        maintenanceRequestTypesApi.endpoints.fuzzySearchMaintenanceRequestTypes
          .matchPending,
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        maintenanceRequestTypesApi.endpoints.fuzzySearchMaintenanceRequestTypes
          .matchFulfilled,
        (state, action) => {
          state.loading = false;
          state.maintenanceRequestTypes = action.payload;
        }
      )
      .addMatcher(
        maintenanceRequestTypesApi.endpoints.fuzzySearchMaintenanceRequestTypes
          .matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export default maintenanceRequestTypesSlice.reducer;
