#!/bin/sh
set -eu

DOCKER_LOG_LEVEL=${DOCKER_LOG_LEVEL:-INFO}

. "$(dirname "$0")/utils/logger.sh"
. "$(dirname "$0")/utils/check-missing-env-vars.sh"
. "$(dirname "$0")/utils/check-unreadable-files.sh"
. "$(dirname "$0")/utils/wait-for-postgres.sh"

check_missing_env_vars \
  PGHOST PGUSER PGDATABASE BACKUP_DIR \
  || exit 2

check_unreadable_files \
  "/run/secrets/db_password" \
  || exit 3

DB_PASSWORD=$(cat /run/secrets/db_password)

trap 'unset PGHOST PGUSER PGDATABASE DB_PASSWORD' EXIT

wait_for_postgres

if ! mkdir -p "$BACKUP_DIR"; then
  log ERROR "Failed to create backup directory"
  exit 5
fi

LATEST_BACKUP=$(ls -t "${BACKUP_DIR}/${PGDATABASE}"_*.dump 2>/dev/null | head -n1)

if [ -z "$LATEST_BACKUP" ]; then
  log ERROR "No backup found to restore"
  exit 6
fi

if [ ! -r "$LATEST_BACKUP" ]; then
  log ERROR "Backup file not readable"
  exit 7
fi

if [ ! -s "$LATEST_BACKUP" ]; then
  log ERROR "Backup file is empty or invalid"
  exit 8
fi

log INFO "Restoring database..."

if PGPASSWORD="$DB_PASSWORD" pg_restore \
    --no-owner --clean --if-exists \
    -h "$PGHOST" -U "$PGUSER" -d "$PGDATABASE" \
    "$LATEST_BACKUP" 2>/dev/null
then
  log INFO "Database restore completed successfully"
else
  log ERROR "Database restore failed"
  exit 9
fi
