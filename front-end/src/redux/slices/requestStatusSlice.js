import { createSlice } from "@reduxjs/toolkit";
import requestStatusApi from "../services/requestStatusApi"; // Correcting the import path

const initialState = {
  statuses: [],
  status: null,
  loading: false,
  error: null,
};

const requestStatusSlice = createSlice({
  name: "requestStatus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        requestStatusApi.endpoints.getAllStatuses.matchPending,
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        requestStatusApi.endpoints.getAllStatuses.matchFulfilled,
        (state, action) => {
          state.loading = false;
          state.statuses = action.payload;
        }
      )
      .addMatcher(
        requestStatusApi.endpoints.getAllStatuses.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      )
      .addMatcher(
        requestStatusApi.endpoints.getStatusById.matchPending,
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        requestStatusApi.endpoints.getStatusById.matchFulfilled,
        (state, action) => {
          state.loading = false;
          state.status = action.payload;
        }
      )
      .addMatcher(
        requestStatusApi.endpoints.getStatusById.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      )
      .addMatcher(
        requestStatusApi.endpoints.updateStatusById.matchPending,
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        requestStatusApi.endpoints.updateStatusById.matchFulfilled,
        (state, action) => {
          state.loading = false;
          // Assuming the payload contains the updated status
          const index = state.statuses.findIndex(
            (status) => status.id === action.payload.id
          );
          if (index !== -1) {
            state.statuses[index] = action.payload;
          } else {
            state.statuses.push(action.payload);
          }
        }
      )
      .addMatcher(
        requestStatusApi.endpoints.updateStatusById.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export default requestStatusSlice.reducer;
