#!/bin/sh
set -eu

DOCKER_LOG_LEVEL=${DOCKER_LOG_LEVEL:-INFO}

. "$(dirname "$0")/utils/logger.sh"
. "$(dirname "$0")/utils/check-missing-env-vars.sh"
. "$(dirname "$0")/utils/check-unreadable-files.sh"

check_missing_env_vars \
  RESTIC_REPOSITORY_FILE RESTIC_PASSWORD_FILE \
  AWS_ACCESS_KEY_ID_FILE AWS_SECRET_ACCESS_KEY_FILE \
  || exit 2

check_unreadable_files \
  RESTIC_REPOSITORY_FILE RESTIC_PASSWORD_FILE \
  AWS_ACCESS_KEY_ID_FILE AWS_SECRET_ACCESS_KEY_FILE \
  || exit 3

if [ ! -d "$BACKUP_DIR" ]; then
  log ERROR "Backup directory does not exist"
  exit 4
fi

if [ -z "$(ls -A "$BACKUP_DIR" 2>/dev/null)" ]; then
  log WARN "Backup directory is empty, nothing to back up"
  exit 5
fi

export AWS_ACCESS_KEY_ID=$(cat "$AWS_ACCESS_KEY_ID_FILE")
export AWS_SECRET_ACCESS_KEY=$(cat "$AWS_SECRET_ACCESS_KEY_FILE")

trap 'unset RESTIC_REPOSITORY_FILE RESTIC_PASSWORD_FILE AWS_ACCESS_KEY_ID_FILE AWS_SECRET_ACCESS_KEY_FILE AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY' EXIT

if ! restic snapshots >/dev/null 2>&1; then
  log WARN "Restic repository not accessible, attempting unlock..."
  restic unlock >/dev/null 2>&1 || true

  if ! restic snapshots >/dev/null 2>&1; then
    log ERROR "Restic repository still not accessible or not initialized"
    exit 6
  fi
fi

log INFO "Starting Restic backup..."

if [ "$(level_to_num "$DOCKER_LOG_LEVEL")" -eq "$(level_to_num DEBUG)" ]; then
  BACKUP_ARGS="--verbose"
else
  BACKUP_ARGS="--quiet"
fi

if restic --host "main" $BACKUP_ARGS backup "$BACKUP_DIR" --tag "$BACKUP_TAG" \
    2>&1 | while read -r line; do
      log DEBUG "$line"
    done
then
  log INFO "Backup completed successfully"
else
  log ERROR "Backup failed"
  exit 7
fi

log INFO "Applying retention policy (daily: $BACKUP_KEEP_DAILY, weekly: $BACKUP_KEEP_WEEKLY, monthly: $BACKUP_KEEP_MONTHLY)..."

if [ "$(level_to_num "$DOCKER_LOG_LEVEL")" -eq "$(level_to_num DEBUG)" ]; then
  FORGET_ARGS="--verbose"
else
  FORGET_ARGS="--quiet"
fi

if restic forget $FORGET_ARGS \
    --keep-daily "$BACKUP_KEEP_DAILY" \
    --keep-weekly "$BACKUP_KEEP_WEEKLY" \
    --keep-monthly "$BACKUP_KEEP_MONTHLY" \
    --prune \
    2>&1 | while read -r line; do
      log DEBUG "$line"
    done
then
  log INFO "Retention policy applied and pruned successfully"
else
  log ERROR "Failed to apply retention policy"
  exit 8
fi

if [ "${RESTIC_CHECK:-false}" = "true" ]; then
  log INFO "Running repository check..."

  if [ "$(level_to_num "$DOCKER_LOG_LEVEL")" -eq "$(level_to_num DEBUG)" ]; then
    CHECK_ARGS="--verbose"
  else
    CHECK_ARGS="--quiet"
  fi

  if restic check $CHECK_ARGS \
      2>&1 | while read -r line; do
        log DEBUG "$line"
      done
  then
    log INFO "Repository check passed"
  else
    log WARN "Repository check failed"
    exit 9
  fi
fi
