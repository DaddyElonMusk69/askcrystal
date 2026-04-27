#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
DIFY_DIR="$ROOT_DIR/services/dify-runtime"
DIFY_DOCKER_DIR="$DIFY_DIR/docker"
DIFY_ENV="$DIFY_DOCKER_DIR/.env"

# shellcheck source=../common/load_env.sh
. "$ROOT_DIR/scripts/common/load_env.sh"
load_env_file "$ROOT_DIR/.env"
load_env_file "$ROOT_DIR/.env.local" override

log() { printf '[setup] %s\n' "$*"; }

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || {
    log "missing required command: $1"
    exit 1
  }
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
  if has_line "^${key}=" "$DIFY_ENV"; then
    local tmp_file="$DIFY_ENV.tmp.$$"
    sed "s#^${key}=.*#${key}=${value}#" "$DIFY_ENV" > "$tmp_file"
    mv "$tmp_file" "$DIFY_ENV"
  else
    printf '%s=%s\n' "$key" "$value" >> "$DIFY_ENV"
  fi
}

ensure_colima() {
  require_cmd colima
  if ! colima status >/dev/null 2>&1; then
    log "starting colima runtime"
    colima start --cpu 4 --memory 8 --disk 60 --runtime docker --network-address
  else
    log "colima already running"
  fi
}

ensure_dify_runtime_tree() {
  if [ -f "$DIFY_DOCKER_DIR/docker-compose.yaml" ]; then
    log "Dify runtime already present"
    return
  fi

  log "missing local Dify runtime at $DIFY_DIR"
  log "expected docker compose file: $DIFY_DOCKER_DIR/docker-compose.yaml"
  exit 1
}

prepare_env_file() {
  if [ ! -f "$DIFY_ENV" ]; then
    log "creating docker/.env from .env.example"
    cp "$DIFY_DOCKER_DIR/.env.example" "$DIFY_ENV"
  fi

  # Local-friendly defaults
  set_env_var EXPOSE_NGINX_PORT "${DIFY_EXPOSE_NGINX_PORT:-18080}"
  set_env_var EXPOSE_NGINX_SSL_PORT "${DIFY_EXPOSE_NGINX_SSL_PORT:-18443}"

  local public_dify_url="${DIFY_PUBLIC_URL:-http://localhost:${DIFY_EXPOSE_NGINX_PORT:-18080}}"

  set_env_var CONSOLE_WEB_URL "$public_dify_url"
  # Dify web entrypoint appends "/console/api" automatically.
  # Keep CONSOLE_API_URL as host root to avoid duplicate "/console/api/console/api".
  set_env_var CONSOLE_API_URL "$public_dify_url"
  set_env_var SERVICE_API_URL "$public_dify_url"
  set_env_var APP_WEB_URL "$public_dify_url"
  set_env_var FILES_URL "$public_dify_url"

  # Keep bootstrap simple for automation; no separate init validation step.
  set_env_var INIT_PASSWORD ""

  # Keep vector store consistent with docker defaults.
  set_env_var VECTOR_STORE "weaviate"
  set_env_var DB_TYPE "postgresql"

  log "prepared $DIFY_ENV"
}

main() {
  require_cmd docker
  require_cmd sed

  ensure_colima
  ensure_dify_runtime_tree
  prepare_env_file

  log "setup complete"
  log "next: $ROOT_DIR/scripts/dev/start_local_dify.sh"
}

main "$@"
