#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIFY_DIR="$ROOT_DIR/dify-local"
DIFY_DOCKER_DIR="$DIFY_DIR/docker"
DIFY_ENV="$DIFY_DOCKER_DIR/.env"

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
    sed -i '' "s#^${key}=.*#${key}=${value}#" "$DIFY_ENV"
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

ensure_dify_repo() {
  require_cmd git
  if [ ! -d "$DIFY_DIR/.git" ]; then
    log "cloning Dify source into $DIFY_DIR"
    git clone --depth 1 https://github.com/langgenius/dify.git "$DIFY_DIR"
  else
    log "Dify source already present"
  fi
}

prepare_env_file() {
  if [ ! -f "$DIFY_ENV" ]; then
    log "creating docker/.env from .env.example"
    cp "$DIFY_DOCKER_DIR/.env.example" "$DIFY_ENV"
  fi

  # Local-friendly defaults
  set_env_var EXPOSE_NGINX_PORT 18080
  set_env_var EXPOSE_NGINX_SSL_PORT 18443

  set_env_var CONSOLE_WEB_URL "http://localhost:18080"
  # Dify web entrypoint appends "/console/api" automatically.
  # Keep CONSOLE_API_URL as host root to avoid duplicate "/console/api/console/api".
  set_env_var CONSOLE_API_URL "http://localhost:18080"
  set_env_var SERVICE_API_URL "http://localhost:18080"
  set_env_var APP_WEB_URL "http://localhost:18080"
  set_env_var FILES_URL "http://localhost:18080"

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
  ensure_dify_repo
  prepare_env_file

  log "setup complete"
  log "next: $ROOT_DIR/scripts/start_local_dify.sh"
}

main "$@"
