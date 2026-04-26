# AskCrystal

This repository contains the AskCrystal storefront, agent, and local runtime stack.

## Source Of Truth

The repo is being normalized around deployable boundaries instead of legacy local experiment folders.

### Deployables

- `deployables/storefront-theme/`
  - Shopify theme source
- `deployables/shopify-app/`
  - Shopify app / proxy backend

### Services

- `services/dify-agent/`
  - versioned Dify DSL, prompts, manifests, and workflow assets
- `services/dify-runtime/`
  - local/self-hosted Dify runtime tree
- `services/skill-bridge/`
  - FastAPI skill bridge and local tool runtime

### Shared Packages

- `packages/storefront-ui-contract/`
  - storefront component schema, chat parsing, and shared UI contract code

### Data

- `data/knowledge-base/`
  - master crystal knowledge JSON and prepared Dify ingestion corpus

### Scripts

- `scripts/dev/`
  - local bring-up, smoke tests, and developer utilities
- `scripts/build/`
  - export, prompt sync, and knowledge-base preparation
- `scripts/ops/`
  - Dify setup, ingestion, tool registration, and agent configuration
- `scripts/release/`
  - release helpers and store upload utilities

### Docs

- `docs/architecture/`
- `docs/runbooks/`
- `docs/product/`
- `docs/adr/`
- `docs/roadmaps/`

## Working Rule

Place new code in the deployable or service that will actually own it in production.

## Key Docs

- `mirgration.md`
- `docs/roadmaps/INTEGRATED_SHOPIFY_AGENT_ROADMAP.md`
- `docs/adr/SHOPIFY_STOREFRONT_TECH_DECISIONS.md`
- `docs/architecture/USER_MEMORY_AND_PERSISTENCE_ARCHITECTURE.md`
- `docs/product/STORE_IDENTITY_AND_UX_NORTH_STAR.md`
- `docs/roadmaps/CLOUD_DIFY_TRANSITION_PLAN.md`
