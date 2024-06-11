import { createSlice } from "@reduxjs/toolkit";
import notificationApi from "../services/notificationApi";

const initialState = {
  notifications: [],
  currentNotification: null,
  status: "idle", // can be 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setCurrentNotification: (state, action) => {
      state.currentNotification = action.payload;
    },
    clearCurrentNotification: (state) => {
      state.currentNotification = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        notificationApi.endpoints.getNotifications.matchPending,
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        notificationApi.endpoints.getNotifications.matchFulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.notifications = action.payload;
        }
      )
      .addMatcher(
        notificationApi.endpoints.getNotifications.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      )
      .addMatcher(
        notificationApi.endpoints.getNotificationById.matchPending,
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        notificationApi.endpoints.getNotificationById.matchFulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.currentNotification = action.payload;
        }
      )
      .addMatcher(
        notificationApi.endpoints.getNotificationById.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      )
      .addMatcher(
        notificationApi.endpoints.createNotification.matchPending,
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        notificationApi.endpoints.createNotification.matchFulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.notifications.push(action.payload);
        }
      )
      .addMatcher(
        notificationApi.endpoints.createNotification.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      )
      .addMatcher(
        notificationApi.endpoints.deleteNotificationById.matchPending,
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        notificationApi.endpoints.deleteNotificationById.matchFulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.notifications = state.notifications.filter(
            (notification) => notification.id !== action.payload
          );
        }
      )
      .addMatcher(
        notificationApi.endpoints.deleteNotificationById.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      )
      .addMatcher(
        notificationApi.endpoints.markNotificationAsRead.matchPending,
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        notificationApi.endpoints.markNotificationAsRead.matchFulfilled,
        (state, action) => {
          state.status = "succeeded";
          const updatedNotification = action.payload;
          const existingNotification = state.notifications.find(
            (notification) => notification.id === updatedNotification.id
          );
          if (existingNotification) {
            existingNotification.read = true;
          }
        }
      )
      .addMatcher(
        notificationApi.endpoints.markNotificationAsRead.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export const { setCurrentNotification, clearCurrentNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
