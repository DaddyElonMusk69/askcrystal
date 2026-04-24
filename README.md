# AskCrystal

This repository contains the AskCrystal agent stack and the future Shopify storefront integration.

## Repo Direction

The repository is now organized around two major product layers:

1. `Agent intelligence`
   - local Dify runtime
   - portable Dify app DSL snapshots
   - skill bridge
   - knowledge base ingestion
   - prompt and tool orchestration

2. `Shopify storefront integration`
   - homepage app block
   - app proxy backend
   - customer identity and persistence
   - future storefront UI implementation

## Where New Code Should Go

### Existing agent layer

- `dify-local/`
  - local Dify source/runtime
- `agent/dify/`
  - versioned Dify app assets for cloud migration
- `dify_skill_bridge/`
  - custom skill bridge service
- `scripts/`
  - local setup, sync, ingestion, and operational scripts
- `dify_kb_docs/`
  - generated KB source docs for Dify datasets

### New storefront layer

- `apps/shopify/`
  - future Shopify app and homepage integration code

Within `apps/shopify/`:

- `app/`
  - Shopify app backend built on the React Router template
- `extensions/homepage-agent/`
  - Theme App Extension for the homepage agent block
- `packages/storefront-ui/`
  - shared storefront React components and primitives if needed
- `docs/`
  - Shopify-app-specific implementation notes

## Current Rule

Do not add new Shopify storefront code to the repository root.

All new Shopify-facing implementation should start inside `apps/shopify/`.

## Key Documents

- `docs/INTEGRATED_SHOPIFY_AGENT_ROADMAP.md`
- `docs/SHOPIFY_STOREFRONT_TECH_DECISIONS.md`
- `docs/USER_MEMORY_AND_PERSISTENCE_ARCHITECTURE.md`
- `docs/STORE_IDENTITY_AND_UX_NORTH_STAR.md`
- `docs/CLOUD_DIFY_TRANSITION_PLAN.md`
