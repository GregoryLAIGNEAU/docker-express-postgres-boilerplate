#!/bin/sh
set -eu

DOCKER_LOG_LEVEL=${DOCKER_LOG_LEVEL:-INFO}

. "$(dirname "$0")/utils/logger.sh"
. "$(dirname "$0")/utils/check-missing-env-vars.sh"
. "$(dirname "$0")/utils/check-unreadable-files.sh"
. "$(dirname "$0")/utils/wait-for-postgres.sh"

check_missing_env_vars \
  PGHOST PGUSER PGDATABASE RESTIC_RESTORE_TARGET \
  RESTIC_REPOSITORY_FILE RESTIC_PASSWORD_FILE RESTIC_HOST \
  || exit 2

check_unreadable_files \
  RESTIC_REPOSITORY_FILE RESTIC_PASSWORD_FILE \
  "/run/secrets/aws_access_key_id" \
  "/run/secrets/aws_secret_access_key" \
  "/run/secrets/db_password" \
  || exit 3

DB_PASSWORD=$(cat /run/secrets/db_password)
export AWS_ACCESS_KEY_ID=$(cat /run/secrets/aws_access_key_id)
export AWS_SECRET_ACCESS_KEY=$(cat /run/secrets/aws_secret_access_key)

trap 'unset PGHOST PGUSER PGDATABASE RESTIC_REPOSITORY_FILE RESTIC_PASSWORD_FILE AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY DB_PASSWORD' EXIT

if ! restic snapshots >/dev/null 2>&1; then
  log WARN "Restic repository not accessible, attempting unlock..."
  restic unlock >/dev/null 2>&1 || true

  if ! restic snapshots >/dev/null 2>&1; then
    log ERROR "Restic repository still not accessible or not initialized"
    exit 4
  fi
fi

log INFO "Starting Restic restore..."

if [ "$(level_to_num "$DOCKER_LOG_LEVEL")" -eq "$(level_to_num DEBUG)" ]; then
  RESTORE_ARGS="--verbose"
else
  RESTORE_ARGS="--quiet"
fi

if restic --host "main" $RESTORE_ARGS restore latest \
    --target "$RESTIC_RESTORE_TARGET" --overwrite always; then
  log INFO "Restore backup completed successfully"
else
  log ERROR "Restore backup failed"
  exit 6
fi

LATEST_BACKUP=$(ls -t "${RESTIC_RESTORE_TARGET}${BACKUP_DIR}/${PGDATABASE}"_*.dump 2>/dev/null | head -n1)

if [ -z "$LATEST_BACKUP" ]; then
  log ERROR "No backup found to restore"
  exit 7
fi

if [ ! -r "$LATEST_BACKUP" ]; then
  log ERROR "Backup file not readable"
  exit 7
fi

wait_for_postgres
log INFO "Restoring database..."

if PGPASSWORD="$DB_PASSWORD" pg_restore \
    --no-owner --clean --if-exists \
    -h "$PGHOST" -U "$PGUSER" -d "$PGDATABASE" \
    "$LATEST_BACKUP" 2>/dev/null; then

  log INFO "Database restore completed successfully"

  if [ -d "${RESTIC_RESTORE_TARGET}${BACKUP_DIR:?}" ]; then
    if rm -rf "${RESTIC_RESTORE_TARGET}${BACKUP_DIR:?}"/*; then
      log INFO "Backup directory cleaned successfully"
    else
      log WARN "Failed to clean backup directory: ${RESTIC_RESTORE_TARGET}${BACKUP_DIR}"
    fi
  else
    log WARN "Backup directory does not exist: ${RESTIC_RESTORE_TARGET}${BACKUP_DIR}"
  fi

else
  log ERROR "Database restore failed"
  exit 8
fi
