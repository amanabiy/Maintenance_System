import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import authApi from "./services/authApi";
import maintenanceRequestSlice from "./slices/maintenanceRequestSlice";
import maintenanceRequestApi from "./services/maintenanceRequestApi";
import requestStatusTypeSlice from "./slices/requestStatusTypeSlice";
import requestStatusTypeApi from "./services/requestStatusTypeApi";
import userSlice from "./slices/userSlice";
import userApi from "./services/userApi";
import departmentSlice from "./slices/departmentSlice";
import departmentApi from "./services/departmentApi";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    user: userSlice,
    [userApi.reducerPath]: userApi.reducer,
    maintenanceRequest: maintenanceRequestSlice,
    [maintenanceRequestApi.reducerPath]: maintenanceRequestApi.reducer,
    requestStatusType: requestStatusTypeSlice,
    [requestStatusTypeApi.reducerPath]: requestStatusTypeApi.reducer,
    department: departmentSlice,
    [departmentApi.reducerPath]: departmentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      maintenanceRequestApi.middleware,
      requestStatusTypeApi.middleware,
      departmentApi.middleware
    ),
});
