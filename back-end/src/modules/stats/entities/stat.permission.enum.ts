export enum StatsPermissionEnum {
    CAN_VIEW_EQUIPMENTS_USED_BY_CATEGORY = 'CAN_VIEW_EQUIPMENTS_USED_BY_CATEGORY',
    CAN_VIEW_EQUIPMENTS_USED_BY_MODEL = 'CAN_VIEW_EQUIPMENTS_USED_BY_MODEL',
    CAN_VIEW_MAINTENANCE_COUNT = 'CAN_VIEW_MAINTENANCE_COUNT',
    CAN_VIEW_USER_STATS_BY_ROLE = 'CAN_VIEW_USER_STATS_BY_ROLE',
    CAN_VIEW_USER_STATS_BY_DEPARTMENT = 'CAN_VIEW_USER_STATS_BY_DEPARTMENT',
    CAN_VIEW_TIME_SPENT_BY_STAGE = 'CAN_VIEW_TIME_SPENT_BY_STAGE',
  }

  
  /**

  INSERT INTO permissions (name, description) VALUES
('CAN_VIEW_EQUIPMENTS_USED_BY_CATEGORY', 'Permission to view equipments used by category within a date range'),
('CAN_VIEW_EQUIPMENTS_USED_BY_MODEL', 'Permission to view equipments used by model within a date range'),
('CAN_VIEW_MAINTENANCE_COUNT', 'Permission to view the number of maintenance requests within a date range'),
('CAN_VIEW_USER_STATS_BY_ROLE', 'Permission to view user stats by role'),
('CAN_VIEW_USER_STATS_BY_DEPARTMENT', 'Permission to view user stats by department'),
('CAN_VIEW_TIME_SPENT_BY_STAGE', 'Permission to view time spent by stage within a date range');

   */