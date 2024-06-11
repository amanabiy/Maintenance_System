export enum NotificationPermissionEnum {
    CAN_CREATE_NOTIFICATION = 'CAN_CREATE_NOTIFICATION',
    CAN_VIEW_ALL_NOTIFICATIONS = 'CAN_VIEW_ALL_NOTIFICATIONS',
    CAN_VIEW_USER_NOTIFICATIONS = 'CAN_VIEW_USER_NOTIFICATIONS',
    CAN_VIEW_NOTIFICATION_BY_ID = 'CAN_VIEW_NOTIFICATION_BY_ID',
    CAN_MARK_NOTIFICATION_AS_READ = 'CAN_MARK_NOTIFICATION_AS_READ',
    CAN_DELETE_NOTIFICATION = 'CAN_DELETE_NOTIFICATION',
}


/**
 *
INSERT INTO permissions (name, description) VALUES
('CAN_CREATE_NOTIFICATION', 'Permission to create a new notification'),
('CAN_VIEW_ALL_NOTIFICATIONS', 'Permission to view all notifications'),
('CAN_VIEW_USER_NOTIFICATIONS', 'Permission to view notifications for the current user'),
('CAN_VIEW_NOTIFICATION_BY_ID', 'Permission to view a notification by its ID'),
('CAN_MARK_NOTIFICATION_AS_READ', 'Permission to mark a notification as read'),
('CAN_DELETE_NOTIFICATION', 'Permission to delete a notification by its ID');
 */