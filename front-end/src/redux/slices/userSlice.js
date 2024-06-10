import { createSlice } from "@reduxjs/toolkit";
import userApi from "../services/userApi"; // Correcting the import path

const initialState = {
  user: null,
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = action.payload;
    },
    clearCurrentUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.getAllUsers.matchPending, (state) => {
        state.loading = true;
      })
      .addMatcher(
        userApi.endpoints.getAllUsers.matchFulfilled,
        (state, action) => {
          state.loading = false;
          state.users = action.payload;
        }
      )
      .addMatcher(
        userApi.endpoints.getAllUsers.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      )
      .addMatcher(userApi.endpoints.getUserById.matchPending, (state) => {
        state.loading = true;
      })
      .addMatcher(
        userApi.endpoints.getUserById.matchFulfilled,
        (state, action) => {
          state.loading = false;
          state.user = action.payload;
        }
      )
      .addMatcher(
        userApi.endpoints.getUserById.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      )
      .addMatcher(userApi.endpoints.createUser.matchPending, (state) => {
        state.loading = true;
      })
      .addMatcher(
        userApi.endpoints.createUser.matchFulfilled,
        (state, action) => {
          state.loading = false;
          state.users = [...state.users, action.payload];
        }
      )
      .addMatcher(
        userApi.endpoints.createUser.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      )
      .addMatcher(userApi.endpoints.updateUserById.matchPending, (state) => {
        state.loading = true;
      })
      .addMatcher(
        userApi.endpoints.updateUserById.matchFulfilled,
        (state, action) => {
          state.loading = false;
          state.user = action.payload;
        }
      )
      .addMatcher(
        userApi.endpoints.updateUserById.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      )
      .addMatcher(userApi.endpoints.deleteUserById.matchPending, (state) => {
        state.loading = true;
      })
      .addMatcher(
        userApi.endpoints.deleteUserById.matchFulfilled,
        (state, action) => {
          state.loading = false;
          state.users = state.users.filter(
            (user) => user.id !== action.payload
          );
        }
      )
      .addMatcher(
        userApi.endpoints.deleteUserById.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      )
      .addMatcher(userApi.endpoints.getUsersFuzzy.matchPending, (state) => {
        state.loading = true;
      })
      .addMatcher(
        userApi.endpoints.getUsersFuzzy.matchFulfilled,
        (state, action) => {
          state.loading = false;
          state.users = action.payload;
        }
      )
      .addMatcher(
        userApi.endpoints.getUsersFuzzy.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export default userSlice.reducer;
