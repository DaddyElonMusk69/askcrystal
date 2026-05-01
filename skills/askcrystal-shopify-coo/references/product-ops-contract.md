# AskCrystal Product Ops Contract

## Operating Model

AskCrystal manages product/catalog data locally and deploys to Shopify. Shopify hosts commerce, checkout, orders, fulfillment state, and live inventory. Local catalog files must not contain inventory quantities or stock levels.

Product imagery is also repo-owned. Local image assets and prompt manifests live under `data/shopify/catalog/assets/products/<handle>/`. Shopify CDN URLs/media IDs are deployment artifacts.
Image SEO metadata is repo-owned too. Store shot-level titles, descriptions, captions, and keywords in the product asset manifest; Shopify media upload currently consumes the `alt` text.
Image generation is powered by Jimeng/Dreamina through the local `dreamina` CLI. Generated task logs live under `data/shopify/generated/jimeng-tasks/`.
Raw/provided product source photos live under `data/shopify/catalog/assets/products/<handle>/source/` and must be used for Jimeng `image2image` whenever available. They are references, not product media, unless the user explicitly asks to upload raw source images.

## Product Lifecycle

- `draft`: incomplete or human-authored early work.
- `ai_filled`: AI generated enough structure for review, but not approved.
- `human_reviewed`: reviewed by a human and safe to sync as draft/store data.
- `approved`: approved for publishing or live merchandising.

Use `workflow_status` at the product root and `askcrystal.data_status` inside the AskCrystal block. Keep them aligned unless there is a deliberate reason not to.

## Required AskCrystal Fields

Required for launch in product JSON:

- `primary_intention`
- `secondary_intentions`
- `product_form`
- `crystal_material_handles`
- `chakras`
- `color_families`
- `ritual_uses`
- `energetic_properties`
- `story_headline`
- `story_summary`
- `benefits`
- `ritual_title`
- `ritual_steps`
- `care_steps`
- `included_items`
- `quality_notes`
- `safety_note`
- `agent_summary`
- `agent_tags`
- `data_status`

Optional but useful:

- `gift_for`
- `western_elements`
- `five_elements`
- `zodiac_signs`
- `archetype_name`
- `pairing_notes`

## Canonical Facets

Use lowercase snake_case keys.

Product forms:

- `bracelet`, `necklace`, `ring`, `earrings`, `anklet`, `pendant`, `tumbled_stone`, `raw_stone`, `set`, `ritual_kit`

Launch intentions:

- `calm`, `protection`, `love`, `sleep`, `grounding`, `focus`, `abundance`, `clarity`, `confidence`, `emotional_healing`

Additional allowed intention-like keys in current schema:

- `intuition`, `self_love`, `emotional_balance`

Chakras:

- `root`, `sacral`, `solar_plexus`, `heart`, `throat`, `third_eye`, `crown`

Zodiac:

- `aries`, `taurus`, `gemini`, `cancer`, `leo`, `virgo`, `libra`, `scorpio`, `sagittarius`, `capricorn`, `aquarius`, `pisces`

Color families:

- `purple`, `pink`, `black`, `clear`, `green`, `blue`, `gold`, `white`

Ritual uses:

- `meditation`, `bedside`, `daily_wear`, `cleansing`, `manifestation`, `travel`, `work_desk`

Gift fit:

- `partner`, `friend`, `mother`, `birthday`, `breakup_support`, `new_beginning`, `stress_relief`

Crystal material handles come from `data/shopify/metaobject-entries.askcrystal.json`; do not invent them without adding a matching metaobject seed and definition-safe fields.

## Copy Rules

- Use wellness and self-reflection language only.
- Do not diagnose, treat, cure, or guarantee outcomes.
- Keep product claims grounded in tradition, form factor, and customer use.
- Avoid mystical overpromising. Tone can be cosmic, but not fatalistic.
- Write descriptions as customer-facing commerce copy; do not hide structured JSON in descriptions.

## Product Image Rules

- Generate 9 images per product by default.
- Use portrait 3:4 aspect ratio for every generated product image.
- Include product angle views, crystal/material detail, scale context, ritual/lifestyle context, and packaging/gifting context.
- For jewelry pieces, include a faceless close-up of a model wearing the product. Crop out identifiable faces.
- Keep styling generic until the user provides the final brand prompt.
- Save generated images under `data/shopify/catalog/assets/products/<handle>/`.
- Save source/reference product photos under `data/shopify/catalog/assets/products/<handle>/source/`.
- Add only reviewed/approved generated local paths to product JSON media.
- Do not add files from `source/` to product JSON media or upload them to Shopify unless the user explicitly asks for raw source images.
- Do not hand-maintain Shopify CDN URLs in source product JSON.
- Use Jimeng/Dreamina via `product_ops.py jimeng-generate` and `product_ops.py jimeng-query`; use `image2image` with source photos, falling back to `text2image` only when source photos are absent or the user explicitly asks for `--text-only`.
- Real Jimeng generation consumes credits, so dry-run first and use `--apply` only when the user has approved generation.
- Wearable model shots must place jewelry correctly: bracelet on wrist, necklace on neck/collarbone, ring on finger, earrings on ear, anklet on ankle, pendant on chain/chest.
- Include image metadata for every generated shot:
  - `alt`: accessibility text and Shopify media alt.
  - `seo_title`: concise title for future SEO/content surfaces.
  - `seo_description`: concise image description for future SEO/content surfaces.
  - `caption`: customer-facing caption candidate.
  - `keywords`: short searchable metadata list.

## Safe Push Rules

- Run local validation before any remote write.
- Run dry-run or remote check before apply.
- Do not push products with `workflow_status = ai_filled` unless the user explicitly asks.
- Do not mutate inventory.
- Do not delete remote products/collections unless the user explicitly asks and the deletion path is reviewed.
- Use `product_ops.py product-upload` or the repo catalog CLI for product sync. Do not write ad hoc one-off GraphQL mutations for product uploads.
- Upload local image files through Shopify staged uploads; never paste Shopify CDN URLs back into source product JSON as truth.
- Use `--skip-media` only when the user explicitly asks for product-data-only sync or media deferral. State that no media will be uploaded.
- Generated sync caches under `data/shopify/generated/` may contain Shopify product IDs, media IDs, and staged resource URLs.

## Recommended Command Sequence

For local product drafting:

```bash
python3 skills/askcrystal-shopify-coo/scripts/product_ops.py summary
python3 skills/askcrystal-shopify-coo/scripts/product_ops.py draft-product ...
python3 skills/askcrystal-shopify-coo/scripts/product_ops.py image-plan --product <handle>
python3 skills/askcrystal-shopify-coo/scripts/product_ops.py jimeng-generate --product <handle>
python3 skills/askcrystal-shopify-coo/scripts/product_ops.py jimeng-generate --product <handle> --shot 01_hero_front --apply --credit
python3 skills/askcrystal-shopify-coo/scripts/product_ops.py jimeng-query --product <handle> --apply
python3 scripts/askcrystal_shopify.py catalog validate
python3 skills/askcrystal-shopify-coo/scripts/product_ops.py product-upload --product <handle> --show-payload
```

For custom data and collections:

```bash
python3 scripts/build/provision_shopify_custom_data.py --apply
python3 scripts/askcrystal_shopify.py catalog provision-collections
python3 scripts/askcrystal_shopify.py catalog provision-collections --apply
```

For current metafield/tag bridge:

```bash
python3 scripts/build/prepare_askcrystal_product_metafields.py \
  data/shopify/templates/askcrystal-product-enrichment-template.csv \
  --output data/shopify/generated/askcrystal-shopify-product-metafields.csv
python3 scripts/build/sync_askcrystal_product_metafields.py --check-remote
python3 scripts/build/sync_askcrystal_product_metafields.py --apply --sync-facet-tags
```

For product upload from local JSON:

```bash
python3 skills/askcrystal-shopify-coo/scripts/product_ops.py product-upload --product <handle> --show-payload
python3 skills/askcrystal-shopify-coo/scripts/product_ops.py product-upload --product <handle> --apply
```

Use `--skip-media` only when the user explicitly asks for product facts to sync before images are ready. Use `--include-unreviewed` only for an explicit test push of `draft` or `ai_filled` data.
