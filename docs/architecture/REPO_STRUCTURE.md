# AskCrystal Repo Structure

## Goal

Keep the repository organized by production ownership instead of by historical local experiments.

## Current Structure

### Deployables

- `deployables/storefront-theme/`
  - native Shopify theme source
- `deployables/shopify-app/`
  - Shopify proxy/backend runtime

### Services

- `services/dify-agent/`
  - versioned Dify DSL, prompts, manifests, and workflow assets
- `services/dify-runtime/`
  - local/self-hosted Dify runtime tree

### Shared Packages

- `packages/storefront-ui-contract/`
  - storefront manifest schema and shared UI parsing logic

### Data

- `data/knowledge-base/`
  - master knowledge JSON and generated Dify-ingestion corpus
- `data/fixtures/`
  - temporary or historical fixture assets used by scripts and migration work

### Scripts

- `scripts/dev/`
  - local bring-up, smoke tests, and developer utilities
- `scripts/build/`
  - DSL export, prompt sync, and build-time preparation scripts
- `scripts/ops/`
  - Dify setup, KB ingestion, tool registration, and runtime configuration
- `scripts/release/`
  - release and upload helpers
- `scripts/common/`
  - shared script modules

### Docs

- `docs/architecture/`
- `docs/runbooks/`
- `docs/product/`
- `docs/adr/`
- `docs/roadmaps/`

## Rule Of Thumb

If code belongs to a deployable or service in production, place it there directly.

- Dify agent/runtime work belongs under `services/`
- Shopify backend/proxy work belongs under `deployables/shopify-app/`
- Shopify theme work belongs under `deployables/storefront-theme/`
- Cross-surface contracts belong under `packages/`
- Runtime data and generated corpora belong under `data/`

## Active Cleanup Direction

The native homepage now lives entirely in `deployables/storefront-theme/`, while `deployables/shopify-app/` only exposes backend and app-proxy endpoints.
