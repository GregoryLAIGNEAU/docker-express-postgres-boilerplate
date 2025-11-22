#!/bin/sh
set -eu

DOCKER_LOG_LEVEL=${DOCKER_LOG_LEVEL:-INFO}

. "$(dirname "$0")/utils/logger.sh"
. "$(dirname "$0")/utils/check-missing-env-vars.sh"
. "$(dirname "$0")/utils/check-unreadable-files.sh"
. "$(dirname "$0")/utils/wait-for-postgres.sh"

check_missing_env_vars \
  PGHOST PGUSER PGDATABASE BACKUP_LOCAL_RETENTION_COUNT BACKUP_DIR \
  || exit 2

check_unreadable_files \
  "/run/secrets/db_password" \
  || exit 3

DB_PASSWORD=$(cat /run/secrets/db_password)

trap 'unset PGHOST PGUSER PGDATABASE DB_PASSWORD' EXIT

wait_for_postgres

if ! mkdir -p "$BACKUP_DIR"; then
  log ERROR "Failed to create backup directory"
  exit 4
fi

log INFO "Starting database backup..."

DATESTAMP=$(date +'%Y%m%d')
TIMESTAMP=$(date +'%H%M%S')
BACKUP_PATH="${BACKUP_DIR}/${PGDATABASE}_${DATESTAMP}_${TIMESTAMP}.dump"

if PGPASSWORD="$DB_PASSWORD" pg_dump \
    -Fc -h "$PGHOST" -U "$PGUSER" -d "$PGDATABASE" \
    -f "$BACKUP_PATH" 2>/dev/null
then
  if [ ! -s "$BACKUP_PATH" ]; then
    log ERROR "Backup file is empty or invalid"
    rm -f "$BACKUP_PATH"
    exit 5
  fi

  log INFO "Database backup completed successfully"

  log INFO "Applying retention policy: keep last ${BACKUP_LOCAL_RETENTION_COUNT} backups"

  ls -1t "$BACKUP_DIR"/${PGDATABASE}_*.dump 2>/dev/null \
    | tail -n +$((BACKUP_LOCAL_RETENTION_COUNT+1)) \
    | while IFS= read -r file; do
        [ -n "$file" ] || continue
        rm -f -- "$file"
      done

  log INFO "Retention policy applied and pruned successfully"

else
  log ERROR "Database backup failed"
  exit 8
fi
