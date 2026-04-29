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

### Shared Packages

- `packages/storefront-ui-contract/`
  - storefront component schema, chat parsing, and shared UI contract code

### Data

- `data/knowledge-base/`
  - master crystal knowledge JSON and prepared Dify ingestion corpus
- `data/shopify/`
  - repo-owned Shopify catalog data, metafield/metaobject definitions, seed entries, enrichment templates, and generated import outputs

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

## Local Development

Start the current local stack from the repo root:

```bash
./scripts/dev/start_local_stack.sh
```

This brings up Dify, the Shopify app/proxy, and the theme agent bundle watcher. The Shopify theme preview is not started by default because the theme is expected to be deployed to Shopify; use `--with-theme` only when you intentionally need local `shopify theme dev`.

## Shopify Catalog And Product Custom Data

AskCrystal is moving toward a repo-owned product catalog where Shopify is the deployment target and commerce host.

- Local catalog files live under `data/shopify/catalog/`.
- Product operations skill lives at `skills/askcrystal-shopify-coo/` for future agents managing listings.
- The repo should own product definitions, prices, handles, descriptions, tags, collection membership, media references, and AskCrystal enrichment.
- Shopify should own live inventory quantities, orders, checkout, fulfillment, returns, and transactional state.
- Product metafields live under the `askcrystal` namespace.
- Collection facets live in `data/shopify/catalog/facets.askcrystal.json` and generate namespaced Shopify tags for automated collections.
- Reusable crystal and ritual profiles live as Shopify metaobjects.
- The product page reads `product.metafields.askcrystal.*` first, then falls back to metaobjects and theme settings.
- Current product enrichment can still be edited through CSV templates, validated, then imported or written through the Admin API while full catalog sync is being built.

Provision missing Shopify metafield/metaobject definitions and seed entries:

```bash
python3 scripts/build/provision_shopify_custom_data.py --apply
```

Validate enrichment rows and generate a Shopify-shaped metafield CSV:

```bash
python3 scripts/build/prepare_askcrystal_product_metafields.py \
  data/shopify/templates/askcrystal-product-enrichment-template.csv \
  --output data/shopify/generated/askcrystal-shopify-product-metafields.csv
```

Resolve products/material metaobjects without writing:

```bash
python3 scripts/build/sync_askcrystal_product_metafields.py --check-remote
```

Sync reviewed enrichment rows to Shopify product metafields:

```bash
python3 scripts/build/sync_askcrystal_product_metafields.py --apply --sync-facet-tags
```

Full data model and operating notes:

- `docs/product/store/ASKCRYSTAL_PRODUCT_DATA_MODEL.md`

Validate repo-owned catalog files:

```bash
python3 scripts/askcrystal_shopify.py catalog validate
```

Compare repo-owned catalog files against Shopify without writing:

```bash
python3 scripts/askcrystal_shopify.py catalog diff
```

Dry-run or apply Shopify automated collection provisioning from local facet rules:

```bash
python3 scripts/askcrystal_shopify.py catalog provision-collections
python3 scripts/askcrystal_shopify.py catalog provision-collections --apply
```

To publish newly-created collections to the live Online Store publication during the same run, also pass `--publication-id` or set `SHOPIFY_ONLINE_STORE_PUBLICATION_ID`.
Use `python3 scripts/askcrystal_shopify.py catalog publications` to list available publication IDs.

## Key Docs

- `mirgration.md`
- `docs/runbooks/LOCAL_RUNBOOK.md`
- `docs/roadmaps/INTEGRATED_SHOPIFY_AGENT_ROADMAP.md`
- `docs/adr/SHOPIFY_STOREFRONT_TECH_DECISIONS.md`
- `docs/architecture/USER_MEMORY_AND_PERSISTENCE_ARCHITECTURE.md`
- `docs/product/STORE_IDENTITY_AND_UX_NORTH_STAR.md`
- `docs/roadmaps/CLOUD_DIFY_TRANSITION_PLAN.md`
