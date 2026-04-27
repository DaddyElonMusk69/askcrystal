# AskCrystal Local Runbook

This runbook describes the current local development stack after the repo migration.

## Current Runtime Shape

The active local system is:

- Shopify theme: `deployables/storefront-theme/`
- Shopify app/proxy: `deployables/shopify-app/`
- Dify runtime: `services/dify-runtime/`
- Dify agent and workflow-tool source: `services/dify-agent/`
- Shared chat/component contract: `packages/storefront-ui-contract/`

The live AskCrystal Dify app uses workflow-native tools (`provider_type: workflow`) for migrated skill families. The old FastAPI skill bridge has been removed from the repo and is no longer a supported local runtime.

## 1) Start The Local Stack

From the repo root:

```bash
cd /Users/haokaiqin/Desktop/AskCrystal
./scripts/dev/start_local_stack.sh
```

This starts:

- Dify Docker Compose runtime on `http://localhost:18080`
- idempotent Dify admin bootstrap, if setup is not finished yet
- Shopify app/proxy on `http://localhost:8787`
- Vite watch for the AskCrystal theme agent bundle

It does not start Shopify theme preview by default. The theme is expected to be deployed to Shopify, so local `shopify theme dev` is now opt-in only.

Logs are written to:

```text
tmp/local-stack-logs/
```

Useful variants:

```bash
./scripts/dev/start_local_stack.sh --backend-only
./scripts/dev/start_local_stack.sh --with-theme --theme-store your-store.myshopify.com
./scripts/dev/start_local_stack.sh --no-bootstrap-dify
```

Notes:

- Dify stays Docker-managed and detached.
- The Shopify app/proxy and any opt-in foreground child processes stop when you press `Ctrl-C`.
- Add `--stop-dify-on-exit` if you want the script to also run `docker compose down` for Dify on exit.
- `--with-theme` is only for local theme preview/debugging.

## 2) One-Time Dify Setup

The stack script runs this bootstrap step automatically by default:

```bash
python3 scripts/ops/bootstrap_dify_setup.py \
  --base-url http://localhost:18080 \
  --email "$DIFY_ADMIN_EMAIL" \
  --password "$DIFY_ADMIN_PASSWORD"
```

If setup already exists, the script is idempotent.

## 3) Knowledge Base

Build and ingest the local AskCrystal knowledge base when the Dify dataset needs to be created or refreshed:

```bash
cd /Users/haokaiqin/Desktop/AskCrystal
./scripts/ops/run_kb_ingestion.sh
```

This creates or reuses `AskCrystal-KB` and uploads markdown files from:

```text
data/knowledge-base/dify_kb_docs/
```

## 4) Workflow-Native Skill Tools

The current skill direction is Dify-native workflow tools, tracked in:

```text
workflow_skill_tracker.md
services/dify-agent/workflows/
```

The live AskCrystal app should expose these workflow tools:

- `workflow_taibu_structured_divination_router`
- `workflow_bazi_chart_analysis`
- `workflow_tarot_spread_interpretation`
- `workflow_yinyuan_matchmaking`
- `workflow_fengshui_space_audit`
- `workflow_shushu_numerology_profile`

Provisioning scripts live under `scripts/build/`:

```bash
python3 scripts/build/provision_bazi_workflow.py
python3 scripts/build/provision_tarot_workflow.py
python3 scripts/build/provision_yinyuan_workflow.py
python3 scripts/build/provision_fengshui_workflow.py
python3 scripts/build/provision_shushu_workflow.py
python3 scripts/build/provision_taibu_router_workflow.py
```

Run these only when you intentionally need to import, publish, or resync workflow tool wrappers in local Dify.

## 5) Shopify MCP

Shopify catalog grounding should stay connected through Dify's native MCP provider:

```bash
cd /Users/haokaiqin/Desktop/AskCrystal
python3 scripts/ops/setup_shopify_mcp_direct.py \
  --base-url http://localhost:18080 \
  --email "$DIFY_ADMIN_EMAIL" \
  --password "$DIFY_ADMIN_PASSWORD" \
  --app-id "$DIFY_APP_ID" \
  --server-url https://askcrystal.myshopify.com/api/mcp \
  --server-identifier shopify_storefront \
  --storefront-token "$SHOPIFY_STOREFRONT_ACCESS_TOKEN"
```

## 6) Model Configuration

Configure the local Dify app with an OpenAI-compatible model endpoint:

```bash
cd /Users/haokaiqin/Desktop/AskCrystal
python3 scripts/ops/configure_openai_compatible_model.py \
  --base-url http://localhost:18080 \
  --email "$DIFY_ADMIN_EMAIL" \
  --password "$DIFY_ADMIN_PASSWORD" \
  --provider langgenius/openai_api_compatible/openai_api_compatible \
  --endpoint-url https://integrate.api.nvidia.com/v1 \
  --model-id minimaxai/minimax-m2.7 \
  --api-key "$OPENAI_API_KEY" \
  --strategy react \
  --max-iteration 3
```

Use `--skip-prompt-update` if you need to keep the current prompt untouched.

## 7) Smoke Tests

Current default Dify smoke test:

```bash
cd /Users/haokaiqin/Desktop/AskCrystal
python3 scripts/dev/e2e_smoke_test.py
```

Pass criteria:

- setup endpoint is healthy,
- admin login succeeds,
- `AskCrystal-KB` exists and has documents,
- the AskCrystal app exposes all expected workflow-native tools,
- no removed `askcrystal_skill_bridge` API tools are enabled on the app.

Optional live chat smoke:

```bash
python3 scripts/dev/live_agent_chat_smoke.py
```

Optional Shopify storefront component proxy smoke:

```bash
python3 scripts/dev/smoke_storefront_component_proxy.py
```

Optional Shopify storefront STOP smoke:

```bash
node scripts/dev/shopify_stop_smoke.mjs
```

## Docker Boundary

The right local boundary for now is hybrid:

- Dify runs in Docker Compose because it is already a multi-container runtime.
- Shopify app/proxy runs on the host because it is currently a lightweight Node dev server.
- Shopify theme preview is not part of default local startup because the theme is deployed to Shopify. When local preview is explicitly needed, it remains a host process because Shopify CLI auth, preview URLs, and theme dev ergonomics are host-oriented.

A future root Compose setup can containerize the Shopify app/proxy once the deployable app shell is more mature. The theme preview should remain opt-in and host-run unless we have a strong reason to absorb Shopify CLI auth and preview behavior into Docker.
