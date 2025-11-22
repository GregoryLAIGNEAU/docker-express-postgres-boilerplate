wait_for_postgres() {
  max_attempts=60
  attempt=0

  log INFO "Waiting for PostgreSQL to be ready..."

  while [ "$attempt" -lt "$max_attempts" ]; do
    if pg_isready -h "$PGHOST" -U "$PGUSER" -d "$PGDATABASE" >/dev/null 2>&1; then
      log INFO "PostgreSQL is ready"
      return 0
    fi

    attempt=$((attempt + 1))

    if [ "$attempt" -eq "$max_attempts" ]; then
      log ERROR "PostgreSQL not ready after ${max_attempts} seconds"
      return 3
    fi

    sleep 1
  done
}
