import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import authApi from "./services/authApi";
import maintenanceRequestSlice from "./slices/maintenanceRequestSlice";
import maintenanceRequestApi from "./services/maintenanceRequestApi";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    maintenanceRequest: maintenanceRequestSlice,
    [maintenanceRequestApi.reducerPath]: maintenanceRequestApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      maintenanceRequestApi.middleware
    ),
});
