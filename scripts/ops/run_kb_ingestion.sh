#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

BASE_URL="${DIFY_BASE_URL:-http://localhost:18080}"
EMAIL="${DIFY_ADMIN_EMAIL:-askcrystal.admin@example.com}"
PASSWORD="${DIFY_ADMIN_PASSWORD:-Askcrystal123}"
DATASET_NAME="${DIFY_DATASET_NAME:-AskCrystal-KB}"
KB_DIR="${DIFY_KB_DIR:-$ROOT_DIR/data/knowledge-base/dify_kb_docs}"
INDEXING_TECHNIQUE="${DIFY_INDEXING_TECHNIQUE:-economy}"

printf '[ingest-run] bootstrapping setup if needed\n'
python3 "$ROOT_DIR/scripts/ops/bootstrap_dify_setup.py" \
  --base-url "$BASE_URL" \
  --email "$EMAIL" \
  --password "$PASSWORD"

printf '[ingest-run] starting KB ingestion\n'
python3 "$ROOT_DIR/scripts/ops/ingest_kb_to_dify.py" \
  --base-url "$BASE_URL" \
  --email "$EMAIL" \
  --password "$PASSWORD" \
  --dataset-name "$DATASET_NAME" \
  --kb-dir "$KB_DIR" \
  --indexing-technique "$INDEXING_TECHNIQUE" \
  --skip-existing
