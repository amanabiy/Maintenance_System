USE maintenance

-- Insert default roless
INSERT INTO roles (roleName) VALUES ('ADMIN'), ('USER'), ('STAFF'), ('STUDENT'), ('WORKER');

-- Insert default departments
INSERT INTO departments (name) VALUES ('GENERAL'), ('MAINTENANCE'), ('ELECTRICITY'), ('SANITARY'), ('VERIFIER');

-- Insert default request types
INSERT INTO request_status_type (name, isInitialStatus, hasSchedule, needsFile, needsSignatures, isInternal, allowsForwardToDepartment, allowsForwardToPerson, allowChangePriority, allowChangeconfirmationStatus, allowChangeverificationStatus, allowsChangeRequestTypes) VALUES 
('SUBMITTED', true, false, false, false, false, false, false, false, false, false, false),
('VERIFIED', false, false, false, false, false, false, false, false, false, false, false),
('REVIEWED', false, false, false, false, false, false, false, false, false, false, false),
('MOVED_TO_DEPARTMENT', false, false, false, false, false, true, false, false, false, false, false),
('ASSIGNED_TO_PERSON', false, false, false, false, false, false, true, false, false, false, false),
('SCHEDULED_FOR_MAINTENANCE', false, true, false, false, false, false, false, false, false, false, false),
('DONE', false, false, false, false, false, false, false, false, false, false, false);


-- Populate the allowedTransitions for each RequestStatusType
-- Note: Adjust the IDs based on your actual database values

-- Example IDs, replace these with actual IDs from your database after initial insertions
SET @submitted_id = (SELECT id FROM request_status_type WHERE name = 'SUBMITTED');
SET @verified_id = (SELECT id FROM request_status_type WHERE name = 'VERIFIED');
SET @reviewed_id = (SELECT id FROM request_status_type WHERE name = 'REVIEWED');
SET @moved_to_department_id = (SELECT id FROM request_status_type WHERE name = 'MOVED_TO_DEPARTMENT');
SET @assigned_to_person_id = (SELECT id FROM request_status_type WHERE name = 'ASSIGNED_TO_PERSON');
SET @scheduled_for_maintenance_id = (SELECT id FROM request_status_type WHERE name = 'SCHEDULED_FOR_MAINTENANCE');
SET @done_id = (SELECT id FROM request_status_type WHERE name = 'DONE');

-- SUBMITTED can transition to VERIFIED
INSERT INTO request_status_type_next_options (request_status_type_id, next_status_type_id) VALUES 
(@submitted_id, @verified_id);

-- VERIFIED can transition to REVIEWED or MOVED_TO_DEPARTMENT
INSERT INTO request_status_type_next_options (request_status_type_id, next_status_type_id) VALUES 
(@verified_id, @reviewed_id), 
(@verified_id, @moved_to_department_id);

-- REVIEWED can transition to ASSIGNED_TO_PERSON or SCHEDULED_FOR_MAINTENANCE
INSERT INTO request_status_type_next_options (request_status_type_id, next_status_type_id) VALUES 
(@reviewed_id, @assigned_to_person_id), 
(@reviewed_id, @scheduled_for_maintenance_id);

-- MOVED_TO_DEPARTMENT can transition to ASSIGNED_TO_PERSON
INSERT INTO request_status_type_next_options (request_status_type_id, next_status_type_id) VALUES 
(@moved_to_department_id, @assigned_to_person_id);

-- ASSIGNED_TO_PERSON can transition to SCHEDULED_FOR_MAINTENANCE
INSERT INTO request_status_type_next_options (request_status_type_id, next_status_type_id) VALUES 
(@assigned_to_person_id, @scheduled_for_maintenance_id);

-- SCHEDULED_FOR_MAINTENANCE can transition to DONE
INSERT INTO request_status_type_next_options (request_status_type_id, next_status_type_id) VALUES 
(@scheduled_for_maintenance_id, @done_id);





INSERT INTO permissions (name, description) VALUES 
('CAN_CREATE_USER', 'Allows roles with this permission to create users'),
('CAN_VIEW_USERS', 'Allows roles with this permission to view a list of users'),
('CAN_VIEW_USER', 'Allows roles with this permission to view a single user'),
('CAN_UPDATE_USER', 'Allows roles with this permission to update user details'),
('CAN_DELETE_USER', 'Allows roles with this permission to delete a user');

INSERT INTO permissions (name, description) VALUES 
('CAN_CREATE_ROLE', 'Allows roles with this permission to create roles'),
('CAN_VIEW_ROLES', 'Allows roles with this permission to view a list of roles'),
('CAN_VIEW_ROLE', 'Allows roles with this permission to view a single role'),
('CAN_UPDATE_ROLE', 'Allows roles with this permission to update role details'),
('CAN_DELETE_ROLE', 'Allows roles with this permission to delete a role');

INSERT INTO permissions (name, description) VALUES
('CAN_CREATE_MAINTENANCE_REQUEST', 'Permission to create a new maintenance request'),
('CAN_VIEW_ALL_MAINTENANCE_REQUESTS', 'Permission to view all maintenance requests'),
('CAN_VIEW_ASSIGNED_TO_ME_MAINTENANCE_REQUESTS', 'Permission to view maintenance requests assigned to the current user'),
('CAN_VIEW_MY_MAINTENANCE_REQUESTS', 'Permission to view maintenance requests created by the current user'),
('CAN_VIEW_MY_DEPARTMENT_MAINTENANCE_REQUESTS', 'Permission to view maintenance requests assigned to the current user department'),
('CAN_VIEW_MAINTENANCE_REQUEST_BY_ID', 'Permission to view a maintenance request by its ID'),
('CAN_UPDATE_MAINTENANCE_REQUEST', 'Permission to update a maintenance request by its ID'),
('CAN_DELETE_MAINTENANCE_REQUEST', 'Permission to delete a maintenance request by its ID'),
('CAN_SEARCH_MAINTENANCE_REQUESTS', 'Permission to search maintenance requests'),
('CAN_SEARCH_MAINTENANCE_REQUESTS_BY_ASSIGNED_PERSON_IDS', 'Permission to search maintenance requests by assigned person IDs'),
('CAN_SEARCH_MAINTENANCE_REQUESTS_BY_REQUEST_TYPE_IDS', 'Permission to search maintenance requests by request type IDs'),
('CAN_SEARCH_MAINTENANCE_REQUESTS_BY_HANDLING_DEPARTMENT_ID', 'Permission to search maintenance requests by handling department ID'),
('CAN_SEARCH_MAINTENANCE_REQUESTS_BY_REQUESTER_ID', 'Permission to search maintenance requests by requester ID'),
('CAN_SEARCH_MAINTENANCE_REQUESTS_BY_CONFIRMATION_STATUS', 'Permission to search maintenance requests by confirmation status'),
('CAN_SEARCH_MAINTENANCE_REQUESTS_BY_VERIFICATION_STATUS', 'Permission to search maintenance requests by verification status'),
('CAN_SEARCH_MAINTENANCE_REQUESTS_BY_VERIFIED_BY_ID', 'Permission to search maintenance requests by verified by ID'),
('CAN_SEARCH_MAINTENANCE_REQUESTS_BY_PRIORITY', 'Permission to search maintenance requests by priority');