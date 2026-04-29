---
name: askcrystal-shopify-coo
description: Product operations skill for AskCrystal's Shopify catalog. Use when Codex needs to create or update product listings, fill AskCrystal metafields, manage local catalog JSON, validate product data, generate collection facet tags, provision Shopify collections, sync approved metafields/tags to Shopify, or act as a product/catalog operations lead for AskCrystal.
---

# AskCrystal Shopify COO

Operate AskCrystal product data like a careful catalog lead: repo first, Shopify second, inventory never.

## Source Of Truth

Use the repo-local catalog as the source of truth:

- Products: `data/shopify/catalog/products/*.json`
- Collections: `data/shopify/catalog/collections/*.json`
- Product schema: `data/shopify/catalog/schemas/product.schema.json`
- Collection schema: `data/shopify/catalog/schemas/collection.schema.json`
- Facets/tags/automated collections: `data/shopify/catalog/facets.askcrystal.json`
- Custom data definitions: `data/shopify/metafield-definitions.askcrystal.json`, `data/shopify/metaobject-*.askcrystal.json`
- Product data model doc: `docs/product/store/ASKCRYSTAL_PRODUCT_DATA_MODEL.md`

Never put inventory counts, inventory levels, or stock quantities into local product files. Shopify or a future inventory system owns live inventory.

## First Move

1. Run or inspect:

```bash
python3 skills/askcrystal-shopify-coo/scripts/product_ops.py summary
```

2. Read `references/product-ops-contract.md` when creating, syncing, or debugging products.
3. Check existing product/collection files before adding new handles.
4. Preserve unrelated user changes. Do not bulk rewrite catalog files without being asked.

## Product Creation Workflow

When asked to create a product/listing:

1. Extract concrete commerce facts: title, form, material(s), price, SKU, variants/options, images/media, product type, and customer-facing description.
2. Extract AskCrystal facts: primary intention, secondary intentions, chakras, color families, ritual uses, zodiac signs, gift fit, story, benefits, ritual, care, included items, quality notes, safety note, and agent summary.
3. If price/SKU/material/form is missing and cannot be safely inferred, ask one focused question before creating a publishable listing.
4. Create or update `data/shopify/catalog/products/<handle>.json`. Use the helper for a valid skeleton, then improve the copy manually:

```bash
python3 skills/askcrystal-shopify-coo/scripts/product_ops.py draft-product \
  --title "Amethyst Raw Prescription Necklace" \
  --price 44.99 \
  --sku AC-AME-NECK-001 \
  --product-form necklace \
  --product-type Necklace \
  --material amethyst \
  --primary-intention calm \
  --secondary-intention sleep \
  --secondary-intention intuition \
  --chakra third_eye \
  --chakra crown \
  --color-family purple \
  --ritual-use bedside \
  --ritual-use daily_wear \
  --description "Customer-facing sales copy..."
```

5. Edit the generated JSON until it reads like a real product page, not placeholder data.
6. Keep new products as `workflow_status = "ai_filled"` and `shopify_status = "draft"` until human review.
7. Run validation:

```bash
python3 scripts/askcrystal_shopify.py catalog validate
```

## Facets And Collections

Product facets generate deployment tags for Shopify automated collections:

- `material:<value>` from crystal material handles
- `form:<value>` from `product_form`
- `intention:<value>` from primary and secondary intentions
- `chakra:<value>` from chakras
- `zodiac:<value>` from zodiac signs
- `color:<value>` from color families
- `ritual:<value>` from ritual uses
- `gift:<value>` from gift fit

Do not hand-author these generated tags unless you are repairing a live Shopify mismatch. The CLI/script should generate them from product data.

Preview generated automated collections:

```bash
python3 scripts/askcrystal_shopify.py catalog provision-collections
```

Apply collections only after dry-run review:

```bash
python3 scripts/askcrystal_shopify.py catalog provision-collections --apply
```

If collections need to appear on the live Online Store, list publications and pass the publication ID:

```bash
python3 scripts/askcrystal_shopify.py catalog publications
python3 scripts/askcrystal_shopify.py catalog provision-collections --apply --publication-id gid://shopify/Publication/...
```

## Shopify Push Workflow

Always dry-run or check remote before writing.

1. Provision custom data definitions after schema changes:

```bash
python3 scripts/build/provision_shopify_custom_data.py
python3 scripts/build/provision_shopify_custom_data.py --apply
```

2. For the current CSV bridge, sync reviewed metafields and generated collection tags:

```bash
python3 scripts/build/prepare_askcrystal_product_metafields.py \
  data/shopify/templates/askcrystal-product-enrichment-template.csv \
  --output data/shopify/generated/askcrystal-shopify-product-metafields.csv
python3 scripts/build/sync_askcrystal_product_metafields.py --check-remote
python3 scripts/build/sync_askcrystal_product_metafields.py --apply --sync-facet-tags
```

3. For repo-owned product JSON, first check whether `python3 scripts/askcrystal_shopify.py catalog sync` or another product sync command exists. If absent, do not invent one-off live mutations in a random script. Implement the sync in the repo CLI, using Shopify Admin GraphQL `productSet`, and keep inventory fields out of the payload.
4. Never publish an `ai_filled` product unless the user explicitly asks for that risk. Prefer `human_reviewed` or `approved`.

## Quality Bar

Before calling work done:

- Product JSON validates.
- No inventory fields are present.
- Product copy is customer-facing, non-medical, and non-fatalistic.
- Required AskCrystal metafields are filled with canonical keys.
- Generated facet tags make sense.
- Collections are dry-run checked.
- Shopify writes, if any, were explicitly requested or clearly implied by the user.
- Report exactly what was written locally and whether anything was pushed remotely.

## Useful Helper

The bundled helper is intentionally small and repo-aware:

```bash
python3 skills/askcrystal-shopify-coo/scripts/product_ops.py --help
python3 skills/askcrystal-shopify-coo/scripts/product_ops.py summary
python3 skills/askcrystal-shopify-coo/scripts/product_ops.py validate
python3 skills/askcrystal-shopify-coo/scripts/product_ops.py collection-plan
```

Use it for scaffolding and checks, but still use judgment for merchandising, copy quality, and user-facing product positioning.
