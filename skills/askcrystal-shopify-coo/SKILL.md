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
- Product image generation reference: `references/product-image-generation.md`

Never put inventory counts, inventory levels, or stock quantities into local product files. Shopify or a future inventory system owns live inventory.
Product media is also repo-owned: approved generated local image paths belong in local product JSON `media`; raw source/reference photos belong under `data/shopify/catalog/assets/products/<handle>/source/`; Shopify staged upload URLs, media IDs, and CDN details belong only in generated sync caches.

## First Move

1. Run or inspect:

```bash
python3 skills/askcrystal-shopify-coo/scripts/product_ops.py summary
```

2. Read `references/product-ops-contract.md` when creating, syncing, or debugging products.
3. Read `references/product-image-generation.md` when creating image prompts, generated product assets, or product media plans.
4. Check existing product/collection files before adding new handles.
5. Preserve unrelated user changes. Do not bulk rewrite catalog files without being asked.

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

## Product Image Workflow

When creating a product/listing with provided or reference images, the media workflow is mandatory unless the user explicitly asks for product-data-only upload, no image generation, or raw source image upload. Do not silently skip image generation.

When asked to create product images or prompts, generate a nine-shot image manifest for the local product. Do not treat Shopify CDN URLs as source of truth.
AskCrystal uses Jimeng/Dreamina for generation through the local `dreamina` CLI.

Canonical local image location:

```text
data/shopify/catalog/assets/products/<product-handle>/
```

Put raw/provided source product photos in:

```text
data/shopify/catalog/assets/products/<product-handle>/source/
```

Raw/provided source photos are references only. Do not add files from `source/` to product JSON `media`, and do not upload them to Shopify, unless the user explicitly asks to use raw source images.

When source photos exist, use Jimeng `image2image` so the exact product design, materials, and colors are preserved. Use `text2image` only for products without source photos or when the user explicitly asks for `--text-only`.

Generate the manifest:

```bash
python3 skills/askcrystal-shopify-coo/scripts/product_ops.py image-plan --product <handle>
```

The manifest contains exactly 9 portrait 3:4 prompts using the AskCrystal luxury product base prompt:

- hero front view
- three-quarter view
- side/back/detail view
- macro crystal close-up
- scale-in-hand shot
- faceless wearing close-up for jewelry, or hands close-up for non-jewelry
- lifestyle context
- ritual still life
- packaging flat lay

Each shot includes `alt`, `seo_title`, `seo_description`, `caption`, and `keywords`. Shopify upload uses `alt`; the other metadata stays local for SEO/content workflows and future storefront use.
Wearable shots must place the jewelry on the correct body part: bracelet on wrist, necklace on neck/collarbone, ring on finger, earrings on ear, anklet on ankle, pendant on chain/chest.

After generated files are reviewed, add approved generated local paths to the product media list. Never substitute raw supplier/source images for reviewed generated assets.

If Jimeng/Dreamina is not installed, the user can install it with:

```bash
curl -s https://jimeng.jianying.com/cli | bash
```

Because the installer writes a `dreamina` binary, shell PATH updates, and login support outside this repo, do not run it silently. After installation, inspect the local CLI:

```bash
python3 skills/askcrystal-shopify-coo/scripts/product_ops.py jimeng-status
```

Submit image jobs only with an explicit apply:

```bash
python3 skills/askcrystal-shopify-coo/scripts/product_ops.py jimeng-generate --product <handle> --credit
python3 skills/askcrystal-shopify-coo/scripts/product_ops.py jimeng-generate --product <handle> --apply --credit
```

Jimeng/Dreamina generation consumes credits. Prefer generating one or two shots first with `--shot <shot_id>` before a full nine-shot batch. Query/download async results:

```bash
python3 skills/askcrystal-shopify-coo/scripts/product_ops.py jimeng-query --product <handle>
python3 skills/askcrystal-shopify-coo/scripts/product_ops.py jimeng-query --product <handle> --apply
```

```bash
python3 skills/askcrystal-shopify-coo/scripts/product_ops.py image-plan --product <handle> --force --update-product-media
```

Shopify media sync uploads these reviewed local files through staged uploads and attaches them to the product. Shopify CDN URLs/media IDs are deployment artifacts, not hand-authored truth.
Use `--skip-media` only when the user explicitly asks to defer media or perform a product-data-only sync, and state that no media will be uploaded. If Jimeng is unavailable, approval for credit spend is missing, or generated images cannot be reviewed, stop and report the blocker instead of uploading raw source photos or quietly omitting media.

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

3. For repo-owned product JSON, use the skill helper for a single-product push. It validates first and dry-runs by default:

```bash
python3 skills/askcrystal-shopify-coo/scripts/product_ops.py product-upload --product <handle> --show-payload
```

4. Apply only after review:

```bash
python3 skills/askcrystal-shopify-coo/scripts/product_ops.py product-upload --product <handle> --apply
```

5. The upload command uses Shopify Admin GraphQL `productSet`, maps AskCrystal metafields, generates facet tags, sets product SEO, resolves collection and material references, stages local image files with `stagedUploadsCreate`, and writes deployment cache data to `data/shopify/generated/product-upload-cache.<handle>.json`.
6. Never publish or upload an `ai_filled` product unless the user explicitly asks for that risk. Prefer `human_reviewed` or `approved`. If a deliberate test push is needed, pass `--include-unreviewed`.

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
python3 skills/askcrystal-shopify-coo/scripts/product_ops.py image-plan --product <handle>
python3 skills/askcrystal-shopify-coo/scripts/product_ops.py jimeng-status
python3 skills/askcrystal-shopify-coo/scripts/product_ops.py jimeng-generate --product <handle>
python3 skills/askcrystal-shopify-coo/scripts/product_ops.py jimeng-query --product <handle>
python3 skills/askcrystal-shopify-coo/scripts/product_ops.py product-upload --product <handle> --show-payload
```

Use it for scaffolding and checks, but still use judgment for merchandising, copy quality, and user-facing product positioning.
