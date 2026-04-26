#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
DIFY_DOCKER_DIR="$ROOT_DIR/services/dify-runtime/docker"
BASE_URL="${1:-http://localhost:18080}"
MAX_WAIT_SECONDS="${DIFY_CHECK_TIMEOUT:-120}"
SLEEP_SECONDS=2

log() { printf '[check] %s\n' "$*"; }

matches_step_payload() {
  local payload="$1"
  local pattern='"step"[[:space:]]*:[[:space:]]*"(not_started|finished)"'
  if command -v rg >/dev/null 2>&1; then
    printf '%s' "$payload" | rg -q "$pattern"
  else
    printf '%s' "$payload" | grep -Eq "$pattern"
  fi
}

if ! command -v curl >/dev/null 2>&1; then
  log "curl not found"
  exit 1
fi

if [ -d "$DIFY_DOCKER_DIR" ]; then
  log "docker compose service summary"
  (cd "$DIFY_DOCKER_DIR" && docker compose ps) || true
fi

log "checking setup status endpoint: $BASE_URL/console/api/setup"
setup_json=""
deadline=$((MAX_WAIT_SECONDS / SLEEP_SECONDS))
for ((i=0; i<=deadline; i++)); do
  setup_json="$(curl -fsS "$BASE_URL/console/api/setup" || true)"
  if [ -n "$setup_json" ] && matches_step_payload "$setup_json"; then
    break
  fi
  sleep "$SLEEP_SECONDS"
done

if [ -z "$setup_json" ]; then
  log "setup endpoint unreachable after ${MAX_WAIT_SECONDS}s"
  exit 1
fi

printf '%s\n' "$setup_json"

if matches_step_payload "$setup_json"; then
  log "setup endpoint healthy"
else
  log "unexpected setup payload after ${MAX_WAIT_SECONDS}s"
  exit 1
fi

log "Dify appears reachable"
