import { createSlice } from "@reduxjs/toolkit";
import mediaApi from "../services/mediaApi";

const initialState = {
  media: [],
  loading: false,
  error: null,
};

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(mediaApi.endpoints.getAllMedia.matchPending, (state) => {
        state.loading = true;
      })
      .addMatcher(
        mediaApi.endpoints.getAllMedia.matchFulfilled,
        (state, action) => {
          state.loading = false;
          state.media = action.payload;
        }
      )
      .addMatcher(
        mediaApi.endpoints.getAllMedia.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      )
      .addMatcher(mediaApi.endpoints.getMediaById.matchPending, (state) => {
        state.loading = true;
      })
      .addMatcher(
        mediaApi.endpoints.getMediaById.matchFulfilled,
        (state, action) => {
          state.loading = false;
          state.media = action.payload;
        }
      )
      .addMatcher(
        mediaApi.endpoints.getMediaById.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      )
      .addMatcher(mediaApi.endpoints.deleteMediaById.matchPending, (state) => {
        state.loading = true;
      })
      .addMatcher(
        mediaApi.endpoints.deleteMediaById.matchFulfilled,
        (state, action) => {
          state.loading = false;
          state.media = state.media.filter(
            (item) => item.id !== action.meta.arg
          );
        }
      )
      .addMatcher(
        mediaApi.endpoints.deleteMediaById.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export default mediaSlice.reducer;
