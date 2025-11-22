check_unreadable_files() {
  unreadable_files=""

  for item in "$@"; do
    case "$item" in
      /*)
        if [ ! -r "$item" ]; then
          unreadable_files="$unreadable_files $item"
        fi
        ;;
      *)
        value=$(printenv "$item" 2>/dev/null || echo "")
        if [ -z "$value" ] || [ ! -r "$value" ]; then
          unreadable_files="$unreadable_files $item"
        fi
        ;;
    esac
  done

  if [ -n "$unreadable_files" ]; then
    log ERROR "Unreadable required files:" >&2
    printf '%s\n' "$unreadable_files" | while IFS= read -r file; do
      echo "  - $file" >&2
    done
    return 1
  fi
}
