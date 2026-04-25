# AskCrystal Dify DSL Snapshots

This directory stores versioned AskCrystal app exports from the working local Dify instance.

## Naming

- `<app-name>-<date>.dsl.yml`
- `<app-name>-<date>.metadata.json`

Example:

- `askcrystal-agent-2026-04-23.dsl.yml`
- `askcrystal-agent-2026-04-23.metadata.json`

## How to refresh the snapshot

From the repository root:

```bash
python3 scripts/export_dify_app_dsl.py
```

## Storefront Component Bootstrap

The current component-render bootstrap app lives here:

- `askcrystal-storefront-components-chatflow-2026-04-24.dsl.yml`
- `askcrystal-storefront-components-chatflow-2026-04-24.metadata.json`

This snapshot is intentionally a bridge artifact:

- it is an `advanced-chat` app,
- it emits reference-based storefront component intents from a deterministic Dify code node,
- it is meant to validate the Shopify chat rendering loop, including proxy-side hydration.

Provision it into local Dify with:

```bash
python3 scripts/provision_storefront_component_flow.py
```

Smoke-test the proxy component stream after starting the Shopify proxy with `DIFY_APP_ID` set to the provisioned app id:

```bash
python3 scripts/smoke_storefront_component_proxy.py --proxy-base-url http://localhost:8787
```

Current local default:

- this bootstrap flow emits component intents with `product_ref` / `collection_ref`, not render-ready props
- broad conversational turns now stay text-only unless the prompt is explicitly shopping/comparison oriented
- when `SHOPIFY_STORE_DOMAIN` and `SHOPIFY_STOREFRONT_ACCESS_TOKEN` are not configured, the Shopify proxy hydrates preview fallback cards from those refs so rendering can still be validated locally
- the retained local bootstrap app id is `609d694c-7064-425d-bdc8-6f76d9f62141`

## Live Agent Component Bridge

The real AskCrystal app remains:

- `askcrystal-agent-2026-04-23.dsl.yml`

For April 24, 2026, that agent snapshot now carries the temporary storefront-component bridge contract:

- the agent stays `agent-chat`
- shopping/comparison turns may append one inline ````askcrystal-ui` fenced manifest at the end of the answer
- the Shopify proxy extracts and hydrates `product_ref` / `collection_ref` from that manifest
- the visible answer is stripped back to prose before the theme renders it

To sync the original local AskCrystal `agent-chat` app in place without breaking its existing app id, update the app model config directly from the snapshot:

```bash
python3 scripts/sync_dify_prompt_from_dsl.py \
  --dsl agent/dify/dsl/askcrystal-agent-2026-04-23.dsl.yml \
  --app-id 385c285a-0e61-4cf1-ba49-afde28c5ce12
```

Current local workspace expectation:

- one live agent app: `385c285a-0e61-4cf1-ba49-afde28c5ce12`
- one retained bootstrap app: `609d694c-7064-425d-bdc8-6f76d9f62141`

After that, smoke-test an explicit storefront turn through the Shopify proxy:

```bash
python3 scripts/smoke_storefront_component_proxy.py \
  --proxy-base-url http://localhost:8787 \
  --message "I am shopping for a crystal for sleep. Recommend one real product and show it as a product card."
```

## How to use in Cloud Dify

1. Open the target Cloud Dify workspace.
2. Use the app import flow and select the `.dsl.yml` file from this folder.
3. Re-provision the environment pieces that DSL does not fully carry:
   - model credentials
   - knowledge base content
   - skill bridge provider
   - Shopify MCP connection
4. Validate the imported app against the matching `.metadata.json` file.

## Important note

Snapshots exported by the current script are intentionally created without secrets by default.

That is the safe default for version control and for cross-environment migration.
