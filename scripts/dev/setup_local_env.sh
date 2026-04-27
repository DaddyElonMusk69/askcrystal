#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
ENV_FILE="$ROOT_DIR/.env"
EXAMPLE_FILE="$ROOT_DIR/.env.example"

log() { printf '[env] %s\n' "$*"; }

generate_secret() {
  if command -v openssl >/dev/null 2>&1; then
    openssl rand -hex 24
    return
  fi

  python3 -c 'import secrets; print(secrets.token_hex(24))'
}

has_line() {
  local pattern="$1"
  local file="$2"
  if command -v rg >/dev/null 2>&1; then
    rg -q "$pattern" "$file"
  else
    grep -Eq "$pattern" "$file"
  fi
}

set_env_var() {
  local key="$1"
  local value="$2"
  local escaped_value
  escaped_value="$(printf '%s' "$value" | sed 's/[\/&]/\\&/g')"

  if has_line "^${key}=" "$ENV_FILE"; then
    local tmp_file="$ENV_FILE.tmp.$$"
    sed "s/^${key}=.*/${key}=${escaped_value}/" "$ENV_FILE" > "$tmp_file"
    mv "$tmp_file" "$ENV_FILE"
  else
    printf '%s=%s\n' "$key" "$value" >> "$ENV_FILE"
  fi
}

get_env_value() {
  local key="$1"
  if ! has_line "^${key}=" "$ENV_FILE"; then
    return 0
  fi
  sed -n "s/^${key}=//p" "$ENV_FILE" | tail -n 1
}

ensure_not_placeholder() {
  local key="$1"
  local value
  value="$(get_env_value "$key")"
  case "$value" in
    ""|replace-*|your-*)
      set_env_var "$key" "$(generate_secret)"
      log "generated $key"
      ;;
  esac
}

if [ ! -f "$EXAMPLE_FILE" ]; then
  log "missing template: $EXAMPLE_FILE"
  exit 1
fi

if [ ! -f "$ENV_FILE" ]; then
  cp "$EXAMPLE_FILE" "$ENV_FILE"
  log "created $ENV_FILE from .env.example"
else
  log "$ENV_FILE already exists; preserving existing values"
fi

ensure_not_placeholder ASKCRYSTAL_SESSION_SECRET
ensure_not_placeholder DIFY_ADMIN_PASSWORD

if [ -z "$(get_env_value DIFY_ADMIN_EMAIL)" ]; then
  set_env_var DIFY_ADMIN_EMAIL "local-admin@askcrystal.local"
  log "set local DIFY_ADMIN_EMAIL"
fi

set_env_var DIFY_DEV_USE_CONSOLE "true"
set_env_var SHOPIFY_PROXY_SIGNATURE_REQUIRED "false"

log "local env is ready"
log "review $ENV_FILE and fill DIFY_APP_ID / DIFY_APP_API_KEY / Shopify values when available"
