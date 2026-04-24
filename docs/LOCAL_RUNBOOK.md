# AskCrystal Local Runbook (Dify + RAG + Skills)

## PRD behavior references

- PRD alignment map: `docs/AGENT_BEHAVIOR_PRD_ALIGNMENT.md`
- Routing prompt policy: `docs/dify_skill_routing_prompt.md`
- Canonical runtime prompt source: `scripts/configure_openai_compatible_model.py`

## 1) Start Dify local stack

```bash
cd /Users/haokaiqin/Desktop/AskCrystal
./scripts/start_local_dify.sh
./scripts/check_local_dify.sh
```

Default local URLs:

- Dify console: http://localhost:18080
- Dify API base: http://localhost:18080/console/api

## 2) Bootstrap one-time admin setup

```bash
cd /Users/haokaiqin/Desktop/AskCrystal
python3 scripts/bootstrap_dify_setup.py \
  --base-url http://localhost:18080 \
  --email askcrystal.admin@example.com \
  --password Askcrystal123
```

Notes:

- If setup already exists, this script is idempotent.
- Password rule: letters + digits, length >= 8.

## 3) Build RAG dataset from local KB docs

```bash
cd /Users/haokaiqin/Desktop/AskCrystal
./scripts/run_kb_ingestion.sh
```

This will:

1. ensure setup/login works,
2. create dataset `AskCrystal-KB` if missing,
3. upload markdown files from `dify_kb_docs/`,
4. create Dify documents with `economy` indexing.

## 4) Start skill bridge service

Run in a separate terminal and keep it running:

```bash
cd /Users/haokaiqin/Desktop/AskCrystal
# Optional Shopify MCP config:
# export SHOPIFY_STORE_DOMAIN=askcrystal.myshopify.com
# export SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token
./scripts/start_skill_bridge.sh
```

Note:

- If Docker service `askcrystal` is already running, this script exits early to avoid starting a duplicate local process on the same port.

Bridge URLs:

- Health: http://localhost:8010/health
- OpenAPI: http://localhost:8010/openapi.json

## 5) Register skill bridge as Dify custom tools

```bash
cd /Users/haokaiqin/Desktop/AskCrystal
python3 scripts/register_skill_bridge_tools.py \
  --base-url http://localhost:18080 \
  --email askcrystal.admin@example.com \
  --password Askcrystal123 \
  --bridge-openapi-url http://localhost:8010/openapi.json \
  --tool-server-url http://host.docker.internal:8010 \
  --provider askcrystal_skill_bridge
```

Notes:

- Use `http://host.docker.internal:8010` when the bridge is running on the host via `./scripts/start_skill_bridge.sh`.
- Only use `http://askcrystal:8010` if the bridge itself is running as a Docker service on the same Dify network.

## 6) Sync per-skill tools into AskCrystal app

```bash
cd /Users/haokaiqin/Desktop/AskCrystal
python3 scripts/sync_agent_skill_tools.py \
  --base-url http://localhost:18080 \
  --email askcrystal.admin@example.com \
  --password Askcrystal123 \
  --app-id 385c285a-0e61-4cf1-ba49-afde28c5ce12 \
  --provider askcrystal_skill_bridge
```

Note:

- Bridge-side Shopify MCP endpoints are disabled by default (`ENABLE_BRIDGE_SHOPIFY_MCP=0`).
- Shopify should be connected via Dify native MCP provider.

## 6.1) Configure Shopify MCP directly in Dify

```bash
cd /Users/haokaiqin/Desktop/AskCrystal
python3 scripts/setup_shopify_mcp_direct.py \
  --base-url http://localhost:18080 \
  --email askcrystal.admin@example.com \
  --password Askcrystal123 \
  --app-id 385c285a-0e61-4cf1-ba49-afde28c5ce12 \
  --server-url https://askcrystal.myshopify.com/api/mcp \
  --server-identifier shopify_storefront \
  --storefront-token "$SHOPIFY_STOREFRONT_ACCESS_TOKEN"
```

If no tools are discovered after setup, verify MCP access/auth requirements for the store and rerun with valid token/headers.

## 7) Configure real OpenAI-compatible model endpoint

```bash
cd /Users/haokaiqin/Desktop/AskCrystal
python3 scripts/configure_openai_compatible_model.py \
  --base-url http://localhost:18080 \
  --email askcrystal.admin@example.com \
  --password Askcrystal123 \
  --provider langgenius/openai_api_compatible/openai_api_compatible \
  --endpoint-url https://integrate.api.nvidia.com/v1 \
  --model-id minimaxai/minimax-m2.7 \
  --api-key "$OPENAI_API_KEY" \
  --strategy react \
  --max-iteration 3
```

Notes:

- For NVIDIA NIM, use full model id `minimaxai/minimax-m2.7` (not `minimax-m2.7`).
- Keep `max-iteration` low for local testing to avoid long agent loops.
- This script also applies AskCrystal response-style guardrails (no internal reasoning narration).
- If you need to keep existing prompt unchanged, add `--skip-prompt-update`.

## 8) End-to-end smoke test

```bash
cd /Users/haokaiqin/Desktop/AskCrystal
python3 scripts/e2e_smoke_test.py \
  --base-url http://localhost:18080 \
  --email askcrystal.admin@example.com \
  --password Askcrystal123 \
  --dataset-name AskCrystal-KB \
  --provider askcrystal_skill_bridge \
  --bridge-health-url http://localhost:8010/health
```

Pass criteria:

- setup endpoint is healthy,
- admin login succeeds,
- dataset exists and contains docs,
- skill bridge health is `ok`,
- provider `askcrystal_skill_bridge` exposes tools.

Optional live chat smoke (real model + streaming + tool usage):

```bash
cd /Users/haokaiqin/Desktop/AskCrystal
python3 scripts/live_agent_chat_smoke.py
```

Optional Shopify storefront STOP smoke (simulates the real homepage cancel path: local abort + proxy stop):

```bash
cd /Users/haokaiqin/Desktop/AskCrystal
node scripts/shopify_stop_smoke.mjs
```

Or, from the Shopify workspace:

```bash
cd /Users/haokaiqin/Desktop/AskCrystal/apps/shopify
npm run smoke:stop
```

Pass criteria:

- the stream yields a `taskId`,
- the script aborts after a few streamed chunks,
- the proxy stop endpoint returns `ok=true`,
- `upstreamStop=true`,
- no events are processed after the local abort.

## 9) Daily restart commands

```bash
cd /Users/haokaiqin/Desktop/AskCrystal
./scripts/start_local_dify.sh
./scripts/check_local_dify.sh
# in another terminal
./scripts/start_skill_bridge.sh
```

Optional validation:

```bash
python3 scripts/e2e_smoke_test.py
python3 scripts/live_agent_chat_smoke.py
node scripts/shopify_stop_smoke.mjs
```
