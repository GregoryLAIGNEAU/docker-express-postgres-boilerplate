level_to_num() {
  case "$1" in
    DEBUG) echo 0 ;;
    INFO)  echo 1 ;;
    WARN)  echo 2 ;;
    ERROR) echo 3 ;;
    *)     echo 1 ;;
  esac
}

log() {
  level=${1:-INFO}
  shift
  timestamp=$(date +"%Y-%m-%d %H:%M:%S")

  if [ "$(level_to_num "$level")" -ge "$(level_to_num "$DOCKER_LOG_LEVEL")" ]; then
    if [ "$level" = "ERROR" ] || [ "$level" = "WARN" ]; then
      echo "[$timestamp] [$level]" "$@" >&2
    else
      echo "[$timestamp] [$level]" "$@"
    fi
  fi
}
