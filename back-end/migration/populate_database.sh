#!/bin/bash

# Load environment variables from .env file
set -a
source .env
set +a

# Define variables
CONTAINER_NAME="back-end-mysql-1"

echo "Script started"

export MYSQL_HOST="$MYSQL_HOST"
export MYSQL_PORT="$MYSQL_PORT"
export MYSQL_USER="$MYSQL_USER"
export MYSQL_PASSWORD="$MYSQL_PASSWORD"
export MYSQL_DATABASE="$MYSQL_DATABASE"
# INIT_SQL_FILE="./migration/init.sql"
echo "Database will be populated with role, and department"

Execute the first MySQL command to insert roles
docker exec -i "$CONTAINER_NAME" mysql -h "$MYSQL_HOST" -P "$MYSQL_PORT" -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE" -e "INSERT INTO roles (roleName) VALUES ('ADMIN'), ('USER'), ('STAFF'), ('STUDENT'), ('WORKER');"

# Execute the second MySQL command to insert departments
docker exec -i "$CONTAINER_NAME" mysql -h "$MYSQL_HOST" -P "$MYSQL_PORT" -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE" -e "INSERT INTO departments (name) VALUES ('GENERAL'), ('MAINTENANCE'), ('ELECTRICITY'), ('SANITARY'), ('VERIFIER');"
# docker exec -i "$CONTAINER_NAME" mysql -h "$MYSQL_HOST" -P "$MYSQL_PORT" -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE" < "$INIT_SQL_FILE"

# Insert a default admin user into the database
docker exec -i "$CONTAINER_NAME" mysql -h "$MYSQL_HOST" -P "$MYSQL_PORT" -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE" -e "
INSERT INTO users (email, fullName, password, role_id, isVerified) 
VALUES ('admin@example.com', 'Admin User', 'admin1234!', 
(SELECT id FROM roles WHERE roleName = 'ADMIN'), 1);
"

# Insert initial RequestStatusType records
docker exec -i "$CONTAINER_NAME" mysql -h "$MYSQL_HOST" -P "$MYSQL_PORT" -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE" <<EOF
-- Insert status types
INSERT INTO request_status_type (name, createdAt, updatedAt, description, isInitialStatus, hasSchedule, needsFile, needsSignatures, isInternal, allowChangePriority, allowChangeconfirmationStatus, allowChangeverificationStatus, allowsChangeRequestTypes, allowsForwardToDepartment, allowsForwardToPerson, allowsChangeLocation, allowsChangeTitleAndDescription, allowsChangeMedia, allowsAddMoreMedia)
VALUES 
('SUBMITTED', NOW(), NOW(), NULL, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false),
('Verified', NOW(), NOW(), NULL, true, false, true, true, false, true, false, true, true, true, true, false, false, false, false),
('MaintenancePersonal', NOW(), NOW(), 'Maintenance personal they can assigne the request, forward to department or person, schedule it or change it done', false, false, true, false, false, false, false, false, false, true, true, false, false, false, false),
('Scheduled for Maintenance', NOW(), NOW(), NULL, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false),
('Done', NOW(), NOW(), 'When the request is fullfilled', false, false, true, true, false, false, false, false, false, false, false, false, false, false, false),
('Confirmed By the requester', NOW(), NOW(), 'When the request is fullfilled', false, false, false, false, false, false, true, false, false, false, false, false, false, false, false),
('Returned To Requester', NOW(), NOW(), 'When their is a need to ask for more information, and the user needs to fill the request again will lead back to Submitted. Assign it to the requester', false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false),
('Rejected', NOW(), NOW(), NULL, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false),
('Feedback Given', NOW(), NOW(), 'Feedback given by the user after the request is returned to them.', false, false, false, false, false, false, false, false, false, false, false, false, false, false, false);


-- Example IDs, replace these with actual IDs from your database after initial insertions
SET @submitted_id = (SELECT id FROM request_status_type WHERE name = 'SUBMITTED');
SET @verified_id = (SELECT id FROM request_status_type WHERE name = 'Verified');
SET @maintenance_personal_id = (SELECT id FROM request_status_type WHERE name = 'MaintenancePersonal');
SET @scheduled_for_maintenance_id = (SELECT id FROM request_status_type WHERE name = 'Scheduled for Maintenance');
SET @done_id = (SELECT id FROM request_status_type WHERE name = 'Done');
SET @confirmed_by_requester_id = (SELECT id FROM request_status_type WHERE name = 'Confirmed By the requester');
SET @returned_to_requester_id = (SELECT id FROM request_status_type WHERE name = 'Returned To Requester');
SET @rejected_id = (SELECT id FROM request_status_type WHERE name = 'Rejected');
SET @feedback_given_id = (SELECT id FROM request_status_type WHERE name = 'Feedback Given');

-- Establish relations
INSERT INTO request_status_type_next_options (request_status_type_id, next_status_type_id)
VALUES 
(@submitted_id, @verified_id),
(@submitted_id, @returned_to_requester_id),
(@verified_id, @scheduled_for_maintenance_id),
(@verified_id, @done_id),
(@verified_id, @confirmed_by_requester_id),
(@maintenance_personal_id, @submitted_id),
(@maintenance_personal_id, @scheduled_for_maintenance_id),
(@maintenance_personal_id, @done_id),
(@scheduled_for_maintenance_id, @done_id),
(@done_id, @confirmed_by_requester_id),
(@confirmed_by_requester_id, @returned_to_requester_id),
(@returned_to_requester_id, @submitted_id),
(@returned_to_requester_id, @feedback_given_id); -- Assuming Feedback Given status can transition from Returned To Requester status

EOF

echo "Database populated with default roles and departments."