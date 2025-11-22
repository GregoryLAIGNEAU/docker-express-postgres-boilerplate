#!/bin/sh
set -eu

DOCKER_LOG_LEVEL=${DOCKER_LOG_LEVEL:-INFO}

. "$(dirname "$0")/utils/logger.sh"
. "$(dirname "$0")/utils/check-missing-env-vars.sh"
. "$(dirname "$0")/utils/check-unreadable-files.sh"

check_missing_env_vars \
  RESTIC_REPOSITORY_FILE RESTIC_PASSWORD_FILE \
  || exit 2

check_unreadable_files \
  RESTIC_REPOSITORY_FILE RESTIC_PASSWORD_FILE \
  "/run/secrets/aws_access_key_id" \
  "/run/secrets/aws_secret_access_key" \
  || exit 3

export AWS_ACCESS_KEY_ID=$(cat /run/secrets/aws_access_key_id)
export AWS_SECRET_ACCESS_KEY=$(cat /run/secrets/aws_secret_access_key)

trap 'unset AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY RESTIC_REPOSITORY_FILE RESTIC_PASSWORD_FILE' EXIT

if restic snapshots >/dev/null 2>&1; then
  log INFO "Restic repository already exists and is accessible"

elif restic cat config >/dev/null 2>&1; then
  log INFO "Restic repository exists (verified via config)"

else
  log WARN "Repository not accessible, attempting unlock..."
  restic unlock >/dev/null 2>&1 || true

  if restic cat config >/dev/null 2>&1; then
    log INFO "Restic repository exists (after unlock)"

  elif restic init; then
    log INFO "Repository initialized successfully"

  else
    log ERROR "Failed to initialize Restic repository"
    exit 6
  fi
fi
