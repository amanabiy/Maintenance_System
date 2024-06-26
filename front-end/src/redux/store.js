import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import authApi from "./services/authApi";
import maintenanceRequestSlice from "./slices/maintenanceRequestSlice";
import maintenanceRequestApi from "./services/maintenanceRequestApi";
import requestStatusSlice from "./slices/requestStatusSlice";
import requestStatusApi from "./services/requestStatusApi";
import requestStatusTypeSlice from "./slices/requestStatusTypeSlice";
import requestStatusTypeApi from "./services/requestStatusTypeApi";
import userSlice from "./slices/userSlice";
import userApi from "./services/userApi";
import departmentSlice from "./slices/departmentSlice";
import departmentApi from "./services/departmentApi";
import maintenanceRequestTypeSlice from "./slices/maintenanceRequestTypesSlice";
import maintenanceRequestTypeApi from "./services/maintenanceRequestTypesApi";
import mediaSlice from "./slices/mediaSlice";
import mediaApi from "./services/mediaApi";
import notificationApi from "./services/notificationApi";
import notificationSlice from "./slices/notificationSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    user: userSlice,
    [userApi.reducerPath]: userApi.reducer,
    maintenanceRequest: maintenanceRequestSlice,
    [maintenanceRequestApi.reducerPath]: maintenanceRequestApi.reducer,
    maintenanceRequestType: maintenanceRequestTypeSlice,
    [maintenanceRequestTypeApi.reducerPath]: maintenanceRequestTypeApi.reducer,
    requestStatus: requestStatusSlice,
    [requestStatusApi.reducerPath]: requestStatusApi.reducer,
    requestStatusType: requestStatusTypeSlice,
    [requestStatusTypeApi.reducerPath]: requestStatusTypeApi.reducer,
    department: departmentSlice,
    [departmentApi.reducerPath]: departmentApi.reducer,
    media: mediaSlice,
    [mediaApi.reducerPath]: mediaApi.reducer,
    notification: notificationSlice,
    [notificationApi.reducerPath]: notificationApi.reducer,
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
