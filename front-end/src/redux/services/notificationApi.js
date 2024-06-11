import baseApi from "./baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNotification: builder.mutation({
      query: (body) => ({
        url: "notifications",
        method: "POST",
        body,
      }),
    }),
    getNotifications: builder.query({
      query: () => ({
        url: "notifications",
        method: "GET",
      }),
    }),
    getNotificationsForUser: builder.query({
      query: (isUnread) => ({
        url: `notifications/logged-in-user?isRead=${isUnread}`,
        method: "GET",
      }),
    }),
    getNotificationById: builder.query({
      query: (id) => ({
        url: `notifications/${id}`,
        method: "GET",
      }),
    }),
    deleteNotificationById: builder.mutation({
      query: (id) => ({
        url: `notifications/${id}`,
        method: "DELETE",
      }),
    }),
    markNotificationAsRead: builder.mutation({
      query: (id) => ({
        url: `notifications/${id}/mark-as-read`,
        method: "PATCH",
      }),
    }),
  }),
});

export default notificationApi;
