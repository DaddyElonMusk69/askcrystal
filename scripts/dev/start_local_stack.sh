#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
DIFY_DOCKER_DIR="$ROOT_DIR/services/dify-runtime/docker"
SHOPIFY_APP_DIR="$ROOT_DIR/deployables/shopify-app"
THEME_DIR="$ROOT_DIR/deployables/storefront-theme"

# shellcheck source=../common/load_env.sh
. "$ROOT_DIR/scripts/common/load_env.sh"
load_env_file "$ROOT_DIR/.env"
load_env_file "$ROOT_DIR/.env.local" override
load_env_file "$SHOPIFY_APP_DIR/.env.local" override

LOG_DIR="${ASKCRYSTAL_STACK_LOG_DIR:-$ROOT_DIR/tmp/local-stack-logs}"

DIFY_BASE_URL="${DIFY_BASE_URL:-http://localhost:18080}"
SHOPIFY_APP_PORT="${ASKCRYSTAL_SHOPIFY_APP_PORT:-${PORT:-8787}}"
THEME_PORT="${SHOPIFY_THEME_PORT:-9292}"
THEME_STORE="${SHOPIFY_FLAG_STORE:-}"

START_DIFY=1
CHECK_DIFY=1
BOOTSTRAP_DIFY=1
START_PROXY=1
START_AGENT_WATCH=1
START_THEME=0
STOP_DIFY_ON_EXIT=0

child_names=()
child_pids=()
child_logs=()

log() { printf '[stack] %s\n' "$*"; }

die() {
  log "$*"
  exit 1
}

usage() {
  cat <<'EOF'
AskCrystal local stack supervisor

Usage:
  ./scripts/dev/start_local_stack.sh [options]

Starts the active local development stack:
  - Dify runtime via services/dify-runtime/docker compose
  - Shopify app/proxy on http://localhost:8787
  - AskCrystal agent bundle watcher

Options:
  --backend-only              Start Dify + Shopify app/proxy only
  --no-dify                   Do not start/check/bootstrap local Dify
  --no-dify-check             Skip Dify readiness check
  --no-bootstrap-dify         Skip idempotent Dify admin bootstrap
  --no-proxy                  Do not start the Shopify app/proxy
  --no-agent-watch            Do not start Vite watch for the theme agent bundle
  --with-theme                Also start Shopify theme dev preview
  --no-theme                  Alias for the default: do not start Shopify theme dev
  --theme-store <store>       Pass SHOPIFY_FLAG_STORE to Shopify CLI
  --stop-dify-on-exit         Run docker compose down for Dify when this exits
  -h, --help                  Show this help

Environment:
  DIFY_BASE_URL               Default: http://localhost:18080
  DIFY_ADMIN_EMAIL            Required when bootstrapping local Dify
  DIFY_ADMIN_PASSWORD         Required when bootstrapping local Dify
  ASKCRYSTAL_SHOPIFY_APP_PORT Default: 8787
  SHOPIFY_THEME_PORT          Default: 9292, used only with --with-theme
  SHOPIFY_FLAG_STORE          Shopify dev store for --with-theme preview
  ASKCRYSTAL_STACK_LOG_DIR    Default: tmp/local-stack-logs
EOF
}

while [ $# -gt 0 ]; do
  case "$1" in
    --backend-only)
      START_AGENT_WATCH=0
      START_THEME=0
      shift
      ;;
    --no-dify)
      START_DIFY=0
      CHECK_DIFY=0
      BOOTSTRAP_DIFY=0
      shift
      ;;
    --no-dify-check)
      CHECK_DIFY=0
      shift
      ;;
    --no-bootstrap-dify)
      BOOTSTRAP_DIFY=0
      shift
      ;;
    --no-proxy)
      START_PROXY=0
      shift
      ;;
    --no-agent-watch)
      START_AGENT_WATCH=0
      shift
      ;;
    --with-theme)
      START_THEME=1
      shift
      ;;
    --no-theme)
      START_THEME=0
      shift
      ;;
    --theme-store)
      [ $# -ge 2 ] || die "--theme-store requires a store domain"
      THEME_STORE="$2"
      shift 2
      ;;
    --theme-store=*)
      THEME_STORE="${1#*=}"
      shift
      ;;
    --stop-dify-on-exit)
      STOP_DIFY_ON_EXIT=1
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
  [ -n "$value" ] || die "missing required env: $key. Run ./scripts/dev/setup_local_env.sh or set it in .env"
}

port_in_use() {
  local port="$1"
  command -v lsof >/dev/null 2>&1 || return 1
  lsof -nP -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1
}

wait_url() {
  local label="$1"
  local url="$2"
  local timeout_seconds="${3:-60}"
  local sleep_seconds=2
  local attempts=$((timeout_seconds / sleep_seconds))

  for ((i=0; i<=attempts; i++)); do
    if curl -fsS "$url" >/dev/null 2>&1; then
      log "$label is healthy: $url"
      return 0
    fi
    sleep "$sleep_seconds"
  done

  log "$label did not become healthy within ${timeout_seconds}s: $url"
  return 1
}

ensure_node_modules() {
  local dir="$1"
  local label="$2"
  if [ -f "$dir/package.json" ] && [ ! -d "$dir/node_modules" ]; then
    die "$label dependencies are missing. Run: cd $dir && npm install"
  fi
}

start_child() {
  local name="$1"
  local cwd="$2"
  shift 2

  local log_file="$LOG_DIR/$name.log"
  (
    cd "$cwd"
    exec "$@"
  ) >"$log_file" 2>&1 &

  local pid=$!
  child_names+=("$name")
  child_pids+=("$pid")
  child_logs+=("$log_file")
  log "started $name (pid=$pid, log=$log_file)"
}

cleanup_children() {
  if [ "${#child_pids[@]}" -eq 0 ]; then
    return
  fi

  log "stopping foreground services"
  for pid in "${child_pids[@]}"; do
    if kill -0 "$pid" >/dev/null 2>&1; then
      kill "$pid" >/dev/null 2>&1 || true
    fi
  done

  for pid in "${child_pids[@]}"; do
    wait "$pid" >/dev/null 2>&1 || true
  done
}

stop_dify_if_requested() {
  if [ "$STOP_DIFY_ON_EXIT" != "1" ] || [ "$START_DIFY" != "1" ]; then
    return
  fi

  log "stopping Dify docker compose stack"
  (
    cd "$DIFY_DOCKER_DIR"
    docker compose down
  ) || true
}

on_exit() {
  local exit_code=$?
  trap - EXIT INT TERM
  cleanup_children
  stop_dify_if_requested
  exit "$exit_code"
}

on_interrupt() {
  trap - EXIT INT TERM
  cleanup_children
  stop_dify_if_requested
  exit 130
}

trap on_exit EXIT
trap on_interrupt INT TERM

mkdir -p "$LOG_DIR"

if [ "$START_DIFY" = "1" ]; then
  require_cmd docker
  log "starting Dify runtime"
  "$ROOT_DIR/scripts/dev/start_local_dify.sh"

  if [ "$CHECK_DIFY" = "1" ]; then
    "$ROOT_DIR/scripts/dev/check_local_dify.sh" "$DIFY_BASE_URL"
  fi

  if [ "$BOOTSTRAP_DIFY" = "1" ]; then
    require_cmd python3
    require_env DIFY_ADMIN_EMAIL
    require_env DIFY_ADMIN_PASSWORD
    log "bootstrapping Dify admin setup if needed"
    python3 "$ROOT_DIR/scripts/ops/bootstrap_dify_setup.py" --base-url "$DIFY_BASE_URL"
  fi
fi

if [ "$START_PROXY" = "1" ]; then
  require_cmd npm
  require_cmd curl

  if wait_url "Shopify app/proxy" "http://localhost:$SHOPIFY_APP_PORT/api/health" 2; then
    log "Shopify app/proxy already running; not starting a duplicate"
  elif port_in_use "$SHOPIFY_APP_PORT"; then
    die "port $SHOPIFY_APP_PORT is already in use, but /api/health is not healthy"
  else
    start_child \
      shopify-proxy \
      "$SHOPIFY_APP_DIR" \
      env PORT="$SHOPIFY_APP_PORT" DIFY_BASE_URL="$DIFY_BASE_URL" npm run dev:proxy
    wait_url "Shopify app/proxy" "http://localhost:$SHOPIFY_APP_PORT/api/health" 60
  fi
fi

if [ "$START_AGENT_WATCH" = "1" ]; then
  require_cmd npm
  ensure_node_modules "$THEME_DIR" "storefront theme"
  start_child agent-watch "$THEME_DIR" npm run agent:watch
fi

if [ "$START_THEME" = "1" ]; then
  require_cmd npm
  ensure_node_modules "$THEME_DIR" "storefront theme"

  if port_in_use "$THEME_PORT"; then
    log "theme preview port $THEME_PORT already in use; assuming Shopify theme dev is running"
  elif [ -n "$THEME_STORE" ]; then
    start_child theme-dev "$THEME_DIR" env SHOPIFY_FLAG_STORE="$THEME_STORE" npm run theme:dev
  else
    start_child theme-dev "$THEME_DIR" npm run theme:dev
  fi
fi

if [ "${#child_pids[@]}" -eq 0 ]; then
  log "no foreground services were started"
  log "Dify may still be running in Docker because it is managed in detached mode"
  exit 0
fi

log "stack is running"
log "logs: $LOG_DIR"
log "Dify console: $DIFY_BASE_URL"
log "Shopify app/proxy: http://localhost:$SHOPIFY_APP_PORT"
if [ "$START_THEME" = "1" ]; then
  log "Theme preview: usually http://127.0.0.1:$THEME_PORT"
fi
log "press Ctrl-C to stop foreground services"

while true; do
  for index in "${!child_pids[@]}"; do
    pid="${child_pids[$index]}"
    if ! kill -0 "$pid" >/dev/null 2>&1; then
      status=0
      wait "$pid" || status=$?
      log "${child_names[$index]} exited with status $status"
      log "last log lines from ${child_logs[$index]}:"
      tail -n 40 "${child_logs[$index]}" || true
      exit "$status"
    fi
  done
  sleep 2
done
