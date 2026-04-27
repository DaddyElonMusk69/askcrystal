#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
DIFY_DOCKER_DIR="$ROOT_DIR/services/dify-runtime/docker"

# shellcheck source=../common/load_env.sh
. "$ROOT_DIR/scripts/common/load_env.sh"
load_env_file "$ROOT_DIR/.env"
load_env_file "$ROOT_DIR/.env.local" override

log() { printf '[start] %s\n' "$*"; }

if ! command -v docker >/dev/null 2>&1; then
  log "docker CLI not found"
  exit 1
fi

"$ROOT_DIR/scripts/ops/setup_local_dify.sh"

log "starting Dify docker compose stack"
cd "$DIFY_DOCKER_DIR"
docker compose up -d

log "current compose status"
docker compose ps

log "done"
