import notificationApi from "../services/notificationApi";

export const {
  useCreateNotificationMutation,
  useGetNotificationsQuery,
  useGetNotificationsForUserQuery,
  useGetNotificationByIdQuery,
  useDeleteNotificationByIdMutation,
  useMarkNotificationAsReadMutation,
} = notificationApi;
