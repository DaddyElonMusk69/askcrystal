# AskCrystal Repo Structure

## Goal

Keep the repository understandable while we transition from a Dify-first local agent project into a Shopify-integrated product.

## Decision

Yes, the Shopify implementation should live in a separate folder.

Recommended root-level split:

- `agent/`
- `dify-local/`
- `dify_skill_bridge/`
- `scripts/`
- `docs/`
- `apps/shopify/`

## Why This Split

1. The existing repository is mostly agent infrastructure.
2. The Shopify implementation will introduce a different runtime model:
   - Shopify app
   - theme extension
   - app proxy
   - storefront UI assets
3. Mixing those files into the root or into existing agent folders will make the project harder to reason about quickly.
4. We want to preserve the current runnable agent setup while creating a clean place for the next layer.

## What We Are Not Doing Yet

We are not doing a full repo migration right now.

That means:

- existing agent files remain where they are,
- current scripts keep working from their present paths,
- legacy research/store notes remain in place for now,
- only new Shopify implementation work starts in the new structure.

## Structure Going Forward

### Agent layer

- `agent/dify/`
  - versioned Dify app assets for cloud migration
- `dify-local/`
  - upstream/local Dify runtime
- `dify_skill_bridge/`
  - AskCrystal custom tools and skill bridge
- `scripts/`
  - Dify setup, sync, ingestion, and validation scripts

### Storefront layer

- `apps/shopify/app/`
  - Shopify app backend
- `apps/shopify/extensions/homepage-agent/`
  - homepage Theme App Extension
- `apps/shopify/packages/storefront-ui/`
  - reusable UI pieces for the storefront-facing agent experience
- `apps/shopify/docs/`
  - Shopify-app-specific implementation notes

## Rule Of Thumb

If code primarily talks to:

- Dify, KB ingestion, or the skill bridge: keep it in the existing agent layer.
- Shopify storefront, theme app extensions, app proxy, customer identity, or homepage UI: put it in `apps/shopify/`.

## Suggested Future Cleanup

After the Shopify app scaffolding exists and is stable, we can do a second cleanup pass for:

- legacy root files,
- `store/` research material,
- KB source assets,
- root utility scripts that may deserve subfolders.

For now, the right move is:

`create a clean storefront workspace without destabilizing the existing agent stack.`
