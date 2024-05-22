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


# docker exec -i "$CONTAINER_NAME" mysql -h "$MYSQL_HOST" -P "$MYSQL_PORT" -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE" -e "INSERT INTO request_status_type (name, isInitialStatus, hasSchedule, needsFile, needsSignatures, isInternal, allowsForwardToDepartment, allowsForwardToPerson, allowChangePriority, allowChangeconfirmationStatus, allowChangeverificationStatus, allowsChangeRequestTypes) VALUES \
#   ('SUBMITTED', true, false, false, false, false, false, false, false, false, false, false), \
#   ('VERIFIED', false, false, false, false, false, false, false, false, false, false, false), \
#   ('REVIEWED', false, false, false, false, false, false, false, false, false, false, false), \
#   ('MOVED_TO_DEPARTMENT', false, false, false, false, false, true, false, false, false, false, false), \
#   ('ASSIGNED_TO_PERSON', false, false, false, false, false, false, true, false, false, false, false), \
#   ('SCHEDULED_FOR_MAINTENANCE', false, true, false, false, false, false, false, false, false, false, false), \
#   ('DONE', false, false, false, false, false, false, false, false, false, false, false);"
# Insert initial RequestStatusType records
docker exec -i "$CONTAINER_NAME" mysql -h "$MYSQL_HOST" -P "$MYSQL_PORT" -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE" <<EOF
INSERT INTO request_status_type (name, isInitialStatus, hasSchedule, needsFile, needsSignatures, isInternal, allowsForwardToDepartment, allowsForwardToPerson, allowChangePriority, allowChangeconfirmationStatus, allowChangeverificationStatus, allowsChangeRequestTypes) VALUES 
('SUBMITTED', true, false, false, false, false, false, false, false, false, false, false),
('VERIFIED', false, false, false, false, false, false, false, false, false, false, false),
('REVIEWED', false, false, false, false, false, false, false, false, false, false, false),
('MOVED_TO_DEPARTMENT', false, false, false, false, false, true, false, false, false, false, false),
('ASSIGNED_TO_PERSON', false, false, false, false, false, false, true, false, false, false, false),
('SCHEDULED_FOR_MAINTENANCE', false, true, false, false, false, false, false, false, false, false, false),
('DONE', false, false, false, false, false, false, false, false, false, false, false);

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
EOF

echo "Database populated with default roles and departments."