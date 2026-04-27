#!/usr/bin/env bash

load_env_file() {
  local env_file="$1"
  local mode="${2:-preserve}"

  [ -f "$env_file" ] || return 0

  while IFS= read -r raw_line || [ -n "$raw_line" ]; do
    local line key value
    line="${raw_line#"${raw_line%%[![:space:]]*}"}"
    line="${line%"${line##*[![:space:]]}"}"

    case "$line" in
      ""|\#*) continue ;;
    esac

    key="${line%%=*}"
    value="${line#*=}"
    key="${key%"${key##*[![:space:]]}"}"

    case "$key" in
      ""|*[!A-Za-z0-9_]*)
        continue
        ;;
    esac

    if [ "$mode" != "override" ] && [ -n "${!key+x}" ]; then
      continue
    fi

    value="${value#"${value%%[![:space:]]*}"}"
    value="${value%"${value##*[![:space:]]}"}"
    if {
      [ "${value#\"}" != "$value" ] && [ "${value%\"}" != "$value" ]
    } || {
      [ "${value#\'}" != "$value" ] && [ "${value%\'}" != "$value" ]
    }; then
      value="${value:1:${#value}-2}"
    fi

    export "$key=$value"
  done < "$env_file"
}
