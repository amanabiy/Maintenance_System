import { createSlice } from "@reduxjs/toolkit";
import requestStatusTypeApi from "../services/requestStatusTypeApi";

const initialState = {
  statusTypes: [],
  currentStatusType: null,
  status: "idle", // can be 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

const requestStatusTypeSlice = createSlice({
  name: "requestStatusType",
  initialState,
  reducers: {
    setCurrentStatusType: (state, action) => {
      state.currentStatusType = action.payload;
    },
    clearCurrentStatusType: (state) => {
      state.currentStatusType = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        requestStatusTypeApi.endpoints.getRequestStatusTypes.matchPending,
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        requestStatusTypeApi.endpoints.getRequestStatusTypes.matchFulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.statusTypes = action.payload;
        }
      )
      .addMatcher(
        requestStatusTypeApi.endpoints.getRequestStatusTypes.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      )
      .addMatcher(
        requestStatusTypeApi.endpoints.getRequestStatusTypeById.matchPending,
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        requestStatusTypeApi.endpoints.getRequestStatusTypeById.matchFulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.currentStatusType = action.payload;
        }
      )
      .addMatcher(
        requestStatusTypeApi.endpoints.getRequestStatusTypeById.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      )
      .addMatcher(
        requestStatusTypeApi.endpoints.createRequestStatusType.matchPending,
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        requestStatusTypeApi.endpoints.createRequestStatusType.matchFulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.statusTypes.push(action.payload);
        }
      )
      .addMatcher(
        requestStatusTypeApi.endpoints.createRequestStatusType.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      )
      .addMatcher(
        requestStatusTypeApi.endpoints.deleteRequestStatusType.matchPending,
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        requestStatusTypeApi.endpoints.deleteRequestStatusType.matchFulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.statusTypes = state.statusTypes.filter(
            (type) => type.id !== action.payload
          );
        }
      )
      .addMatcher(
        requestStatusTypeApi.endpoints.deleteRequestStatusType.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      )
      .addMatcher(
        requestStatusTypeApi.endpoints.markInitialRequestStatusType
          .matchPending,
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        requestStatusTypeApi.endpoints.markInitialRequestStatusType
          .matchFulfilled,
        (state, action) => {
          state.status = "succeeded";
          const { id } = action.payload;
          state.statusTypes = state.statusTypes.map((type) =>
            type.id === id ? { ...type, isInitial: true } : type
          );
        }
      )
      .addMatcher(
        requestStatusTypeApi.endpoints.markInitialRequestStatusType
          .matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
    // .addMatcher(
    //   requestStatusTypeApi.endpoints.updateRequestStatusTypeById.matchPending,
    //   (state) => {
    //     state.status = "loading";
    //   }
    // )
    // .addMatcher(
    //   requestStatusTypeApi.endpoints.updateRequestStatusTypeById
    //     .matchFulfilled,
    //   (state, action) => {
    //     state.status = "succeeded";
    //     const updatedStatusType = action.payload;
    //     console.log(state, action, "updateRequestStatusTypeById");
    //     state.statusTypes = state?.statusTypes || [];
    //   }
    // )
    // .addMatcher(
    //   requestStatusTypeApi.endpoints.updateRequestStatusTypeById
    //     .matchRejected,
    //   (state, action) => {
    //     state.status = "failed";
    //     state.error = action.error.message;
    //   }
    // );
  },
});

export const { setCurrentStatusType, clearCurrentStatusType } =
  requestStatusTypeSlice.actions;

export default requestStatusTypeSlice.reducer;
