import { createSlice } from "@reduxjs/toolkit";
import maintenanceRequestApi from "../services/maintenanceRequestApi";

const initialState = {
  requests: [],
  currentRequest: null,
  status: "idle", // can be 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

const maintenanceRequestSlice = createSlice({
  name: "maintenanceRequest",
  initialState,
  reducers: {
    setCurrentRequest: (state, action) => {
      state.currentRequest = action.payload;
    },
    clearCurrentRequest: (state) => {
      state.currentRequest = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        maintenanceRequestApi.endpoints.getMaintenanceRequests.matchPending,
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        maintenanceRequestApi.endpoints.getMaintenanceRequests.matchFulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.requests = action.payload;
        }
      )
      .addMatcher(
        maintenanceRequestApi.endpoints.getMaintenanceRequests.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      )
      .addMatcher(
        maintenanceRequestApi.endpoints.getMaintenanceRequestById.matchPending,
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        maintenanceRequestApi.endpoints.getMaintenanceRequestById
          .matchFulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.currentRequest = action.payload;
        }
      )
      .addMatcher(
        maintenanceRequestApi.endpoints.getMaintenanceRequestById.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      )
      .addMatcher(
        maintenanceRequestApi.endpoints.createMaintenanceRequest.matchPending,
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        maintenanceRequestApi.endpoints.createMaintenanceRequest.matchFulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.requests.push(action.payload);
        }
      )
      .addMatcher(
        maintenanceRequestApi.endpoints.createMaintenanceRequest.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      )
      .addMatcher(
        maintenanceRequestApi.endpoints.updateMaintenanceRequest.matchPending,
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        maintenanceRequestApi.endpoints.updateMaintenanceRequest.matchFulfilled,
        (state, action) => {
          state.status = "succeeded";
          const { id, ...updatedRequest } = action.payload;
          const existingRequest = state.requests.find((req) => req.id === id);
          if (existingRequest) {
            Object.assign(existingRequest, updatedRequest);
          }
        }
      )
      .addMatcher(
        maintenanceRequestApi.endpoints.updateMaintenanceRequest.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      )
      .addMatcher(
        maintenanceRequestApi.endpoints.deleteMaintenanceRequest.matchPending,
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        maintenanceRequestApi.endpoints.deleteMaintenanceRequest.matchFulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.requests = state.requests.filter(
            (req) => req.id !== action.payload
          );
        }
      )
      .addMatcher(
        maintenanceRequestApi.endpoints.deleteMaintenanceRequest.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      )
      .addMatcher(
        maintenanceRequestApi.endpoints.searchMaintenanceRequests.matchPending,
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        maintenanceRequestApi.endpoints.searchMaintenanceRequests
          .matchFulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.requests = action.payload;
        }
      )
      .addMatcher(
        maintenanceRequestApi.endpoints.searchMaintenanceRequests.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export const { setCurrentRequest, clearCurrentRequest } =
  maintenanceRequestSlice.actions;

export default maintenanceRequestSlice.reducer;
