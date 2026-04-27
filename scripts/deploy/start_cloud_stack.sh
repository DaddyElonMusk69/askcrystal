#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
DIFY_DOCKER_DIR="$ROOT_DIR/services/dify-runtime/docker"
PROXY_COMPOSE="$ROOT_DIR/infra/docker/askcrystal-proxy.compose.yml"
ENV_FILE="${ASKCRYSTAL_ENV_FILE:-$ROOT_DIR/.env}"

# shellcheck source=../common/load_env.sh
. "$ROOT_DIR/scripts/common/load_env.sh"

START_DIFY=1
START_PROXY=1
BUILD_PROXY=1

log() { printf '[cloud] %s\n' "$*"; }

die() {
  log "$*"
  exit 1
}

usage() {
  cat <<'EOF'
AskCrystal cloud stack starter

Usage:
  ./scripts/deploy/start_cloud_stack.sh [options]

Options:
  --no-dify          Do not start the Dify Docker Compose stack
  --no-proxy         Do not start the AskCrystal Shopify proxy container
  --no-build         Do not rebuild the Shopify proxy image
  --env-file <path>  Use a specific env file instead of ./.env
  -h, --help         Show this help
EOF
}

while [ $# -gt 0 ]; do
  case "$1" in
    --no-dify)
      START_DIFY=0
      shift
      ;;
    --no-proxy)
      START_PROXY=0
      shift
      ;;
    --no-build)
      BUILD_PROXY=0
      shift
      ;;
    --env-file)
      [ $# -ge 2 ] || die "--env-file requires a path"
      ENV_FILE="$2"
      shift 2
      ;;
    --env-file=*)
      ENV_FILE="${1#*=}"
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      die "unknown option: $1"
      ;;
  esac
done

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || die "missing required command: $1"
}

require_env() {
  local key="$1"
  local value="${!key:-}"
  [ -n "$value" ] || die "missing required env: $key"
  case "$value" in
    replace-*|your-*|https://your-*)
      die "placeholder value still configured for env: $key"
      ;;
  esac
}

[ -f "$ENV_FILE" ] || die "missing env file: $ENV_FILE; copy .env.example to .env first"
load_env_file "$ENV_FILE" override

require_cmd docker

if [ "$START_PROXY" = "1" ]; then
  require_env DIFY_APP_API_KEY
  require_env SHOPIFY_APP_URL
  require_env SHOPIFY_API_SECRET
  require_env ASKCRYSTAL_SESSION_SECRET
fi

if [ "$START_DIFY" = "1" ]; then
  [ -f "$DIFY_DOCKER_DIR/docker-compose.yaml" ] || die "missing Dify compose file: $DIFY_DOCKER_DIR/docker-compose.yaml"
  log "starting Dify runtime"
  (
    cd "$DIFY_DOCKER_DIR"
    docker compose up -d
  )
fi

if [ "$START_PROXY" = "1" ]; then
  log "starting Shopify proxy"
  compose_args=(--env-file "$ENV_FILE" -f "$PROXY_COMPOSE" up -d)
  if [ "$BUILD_PROXY" = "1" ]; then
    compose_args+=(--build)
  fi
  docker compose "${compose_args[@]}"
fi

log "stack started"
log "proxy health: http://localhost:${ASKCRYSTAL_SHOPIFY_APP_PORT:-8787}/api/health"
