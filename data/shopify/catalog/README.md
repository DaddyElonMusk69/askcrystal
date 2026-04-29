# AskCrystal Local Catalog

Status: planned V1 source of truth

This directory is the future home of the repo-owned Shopify catalog. Shopify should be treated as the deployment target and checkout host, not the place where AskCrystal product definitions are authored.

## Ownership Model

The repo owns:

- Product handles, titles, descriptions, vendor, product type, tags, and collection membership.
- Variant definitions such as SKU, option values, price, compare-at price, taxable status, and requires-shipping flags.
- Product media references and alt text.
- AskCrystal enrichment fields under the `askcrystal` namespace.
- Crystal material and ritual references by stable handle.
- Review workflow status such as `draft`, `ai_filled`, `human_reviewed`, and `approved`.

Shopify owns:

- Live inventory quantities and inventory levels.
- Orders, carts, checkout, fulfillment, returns, and transactional state.
- Runtime availability that changes because customers buy products.

Inventory quantities are intentionally out of scope for local catalog files. If inventory becomes automated later, it should live in a separate inventory system with its own source of truth and sync rules.

## Directory Shape

- `products/`: one JSON file per product, keyed by product handle.
- `collections/`: one JSON file per collection, keyed by collection handle.
- `assets/`: optional local product media files or stable asset references.
- `schemas/`: JSON schemas for catalog validation.
- `templates/`: copyable starter JSON files for humans and future agents.
- `facets.askcrystal.json`: canonical collection facets used to generate Shopify tags and automated collection rules.

## Draft Flow

1. A human or agent creates/updates a product JSON file under `products/`.
2. The product starts with `workflow_status = "ai_filled"` or `workflow_status = "draft"`.
3. A validator checks schema, canonical metafield values, material handles, and missing required commerce fields.
4. A human promotes the file to `workflow_status = "human_reviewed"` or `workflow_status = "approved"`.
5. A sync command creates or updates Shopify as a draft product and writes metafields.
6. Publishing remains explicit and separate from catalog sync.

## Current Bridge

The current production bridge still uses:

- `data/shopify/templates/askcrystal-product-enrichment-template.csv`
- `scripts/build/sync_askcrystal_product_metafields.py`

The next catalog milestone is to add a validator and sync command that reads `products/*.json` directly.

Current validator:

```bash
python3 scripts/askcrystal_shopify.py catalog validate
```

Current remote diff:

```bash
python3 scripts/askcrystal_shopify.py catalog diff
```

The diff command validates first, then compares local products and collections against Shopify. It does not write. It currently checks core product fields, tags, collection membership, options, variants by SKU, collection basics, manual collection membership, and directly comparable `askcrystal` metafields.

Collection facet provisioning:

```bash
python3 scripts/askcrystal_shopify.py catalog provision-collections
python3 scripts/askcrystal_shopify.py catalog provision-collections --apply
```

Products should not duplicate generated facet tags by hand. The CLI treats tags like `material:amethyst`, `form:necklace`, `intention:sleep`, `chakra:crown`, `zodiac:pisces`, `color:purple`, `ritual:bedside`, and `gift:stress_relief` as deployment tags derived from local AskCrystal fields.

Pass `--publication-id` or set `SHOPIFY_ONLINE_STORE_PUBLICATION_ID` when collection creation should also publish to the live Online Store publication.
Run `python3 scripts/askcrystal_shopify.py catalog publications` to list available publication IDs.

While the CSV bridge is still in use, add generated facet tags during product metafield sync:

```bash
python3 scripts/build/sync_askcrystal_product_metafields.py --apply --sync-facet-tags
```

The validator checks:

- Product and collection JSON schema shape.
- Product/collection filename and handle alignment.
- Product collection references.
- Collection manual product references.
- Crystal material handles against `data/shopify/metaobject-entries.askcrystal.json`.
- Duplicate SKUs across local product files.
- Forbidden inventory fields anywhere in product JSON.
- Missing local media paths as warnings.

To start a new product or collection, copy:

- `templates/product.template.json`
- `templates/collection.template.json`

Then rename the copied file so the filename stem matches its `handle`.
