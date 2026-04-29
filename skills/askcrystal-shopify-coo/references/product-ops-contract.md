# AskCrystal Product Ops Contract

## Operating Model

AskCrystal manages product/catalog data locally and deploys to Shopify. Shopify hosts commerce, checkout, orders, fulfillment state, and live inventory. Local catalog files must not contain inventory quantities or stock levels.

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

## Safe Push Rules

- Run local validation before any remote write.
- Run dry-run or remote check before apply.
- Do not push products with `workflow_status = ai_filled` unless the user explicitly asks.
- Do not mutate inventory.
- Do not delete remote products/collections unless the user explicitly asks and the deletion path is reviewed.
- Do not use ad hoc one-off GraphQL mutations for product sync if the repo CLI lacks a command. Add the capability to the CLI first so future agents inherit it.

## Recommended Command Sequence

For local product drafting:

```bash
python3 skills/askcrystal-shopify-coo/scripts/product_ops.py summary
python3 skills/askcrystal-shopify-coo/scripts/product_ops.py draft-product ...
python3 scripts/askcrystal_shopify.py catalog validate
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
