check_missing_env_vars() {
  missing_vars=""

  for var in "$@"; do
    value=$(printenv "$var" 2>/dev/null || echo "")
    if [ -z "$value" ]; then
      missing_vars="$missing_vars $var"
    fi
  done

  if [ -n "$missing_vars" ]; then
    log ERROR "Missing required environment variables:" >&2
    printf '%s\n' "$missing_vars" | while IFS= read -r var; do
      echo "  - $var" >&2
    done
    return 1
  fi
}
