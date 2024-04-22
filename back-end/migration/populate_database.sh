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

echo "Database populated with default roles and departments."