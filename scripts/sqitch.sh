#!/bin/sh
set -eu

DOCKER_LOG_LEVEL=${DOCKER_LOG_LEVEL:-INFO}

. "$(dirname "$0")/utils/logger.sh"
. "$(dirname "$0")/utils/check-missing-env-vars.sh"
. "$(dirname "$0")/utils/check-unreadable-files.sh"
. "$(dirname "$0")/utils/wait-for-postgres.sh"

check_missing_env_vars \
  PGHOST PGUSER PGDATABASE \
  || exit 2

check_unreadable_files \
  "/run/secrets/db_password" \
  || exit 3

export PGPASSWORD=$(cat /run/secrets/db_password)

trap 'unset PGHOST PGUSER PGDATABASE PGPASSWORD' EXIT

wait_for_postgres

exec sqitch "$@"
