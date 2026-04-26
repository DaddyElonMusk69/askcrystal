#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
VENV_DIR="$ROOT_DIR/.venv"
HOST="${SKILL_BRIDGE_HOST:-0.0.0.0}"
PORT="${SKILL_BRIDGE_PORT:-8010}"
PYTHON_BIN=""

if command -v docker >/dev/null 2>&1; then
  EXISTING_BRIDGE_CONTAINER=""
  if docker ps --format '{{.Names}}' | grep -qx 'askcrystal'; then
    EXISTING_BRIDGE_CONTAINER="askcrystal"
  elif docker ps --format '{{.Names}}' | grep -qx 'askcrystal-skill-bridge'; then
    EXISTING_BRIDGE_CONTAINER="askcrystal-skill-bridge"
  fi

  if [ -n "$EXISTING_BRIDGE_CONTAINER" ]; then
    printf '[bridge] docker service %s is already running on :%s\n' "$EXISTING_BRIDGE_CONTAINER" "$PORT"
    printf '[bridge] skipping local uvicorn startup to avoid port conflict\n'
    exit 0
  fi
fi

if command -v lsof >/dev/null 2>&1; then
  if lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
    printf '[bridge] port %s is already in use\n' "$PORT"
    lsof -nP -iTCP:"$PORT" -sTCP:LISTEN || true
    exit 1
  fi
fi

has_runtime() {
  local py_bin="$1"
  "$py_bin" - <<'PY' >/dev/null 2>&1
import importlib
for name in ("fastapi", "uvicorn", "pydantic"):
    importlib.import_module(name)
PY
}

if [ -x "$VENV_DIR/bin/python" ] && has_runtime "$VENV_DIR/bin/python"; then
  PYTHON_BIN="$VENV_DIR/bin/python"
elif has_runtime "python3"; then
  PYTHON_BIN="python3"
else
  if [ "${SKILL_BRIDGE_AUTO_INSTALL:-0}" = "1" ]; then
    if [ ! -d "$VENV_DIR" ]; then
      printf '[bridge] creating virtual environment at %s\n' "$VENV_DIR"
      python3 -m venv "$VENV_DIR"
    fi

    # shellcheck disable=SC1091
    source "$VENV_DIR/bin/activate"
      printf '[bridge] installing runtime deps\n'
      pip install -q -r "$ROOT_DIR/services/skill-bridge/requirements.txt"
      PYTHON_BIN="$VENV_DIR/bin/python"
  else
    printf '[bridge] missing dependencies (fastapi, uvicorn, pydantic)\n'
    printf '[bridge] set SKILL_BRIDGE_AUTO_INSTALL=1 to auto-install into .venv\n'
    exit 1
  fi
fi

printf '[bridge] using python runtime: %s\n' "$PYTHON_BIN"
printf '[bridge] starting skill bridge on %s:%s\n' "$HOST" "$PORT"
PYTHONPATH="$ROOT_DIR/services/skill-bridge/src${PYTHONPATH:+:$PYTHONPATH}" \
  exec "$PYTHON_BIN" -m uvicorn dify_skill_bridge.server:app --host "$HOST" --port "$PORT"
