export enum RequestStatusEnum {
    SUBMITTED = 'SUBMITTED',
    VERIFIED = 'VERIFIED',
    REVIEWED = 'REVIEWED',
    MOVED_TO_DEPARTMENT = 'MOVED_TO_DEPARTMENT',
    ASSIGNED_TO_PERSON = 'ASSIGNED_TO_PERSON',
    SCHEDULED_FOR_MAINTENANCE = 'SCHEDULED_FOR_MAINTENANCE',
    DONE = 'DONE',
    INFO_REQUESTED_FROM_USER = 'INFO_REQUESTED_FROM_USER',
    CONFIRMATION_REQUIRED_FROM_USER = 'CONFIRMATION_REQUIRED_FROM_USER'
}


/**
 * 
INSERT INTO permissions (name, description) VALUES
('CAN_UPDATE_MAINTENANCE_REQUEST_STATUS', 'Permission to update the status of a maintenance request'),
('CAN_VIEW_ALL_STATUSES_FOR_REQUEST', 'Permission to view all statuses for a given request'),
('CAN_VIEW_SINGLE_STATUS_FOR_REQUEST', 'Permission to view a single status for a given request');

 */