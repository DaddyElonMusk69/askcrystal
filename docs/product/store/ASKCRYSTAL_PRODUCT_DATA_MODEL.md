# AskCrystal Product Data Model

Date: 2026-04-28
Status: V1 source of truth, transitioning to repo-owned catalog

## Decision

AskCrystal should manage the product catalog locally and use Shopify as the final commerce host/deployment target.

- The repo owns product definitions, merchandising copy, collection membership, media references, and AskCrystal enrichment.
- Shopify hosts the deployed products, collections, product pages, cart, checkout, orders, and fulfillment-facing commerce runtime.
- Live inventory quantities and inventory levels are intentionally excluded from repo-managed catalog sync.
- Product descriptions remain customer-facing sales copy and should be authored locally before syncing.
- Product metafields under the `askcrystal` namespace provide product-specific structured content.
- Metaobjects provide reusable crystal-material and ritual profiles.
- Collection-facing facets are authored as canonical AskCrystal product fields, then mirrored to generated Shopify tags for reliable automated collection rules.
- CSV enrichment remains a bridge for the current product-detail metafield layer until full local catalog sync is implemented.

This avoids hidden JSON in product descriptions, makes the catalog versionable and agent-operable, and keeps Shopify focused on hosting and transaction state.

## Catalog Ownership Model

The repo owns:

- Product handles, titles, descriptions, vendor, product type, tags, collection membership, and product status.
- Variant definitions such as SKU, option values, price, compare-at price, taxable status, and requires-shipping flags.
- Product media references and alt text.
- AskCrystal enrichment fields under the `askcrystal` namespace.
- Crystal material and ritual references by stable handle.
- Human/AI review workflow statuses.

Shopify owns:

- Live inventory quantities and inventory levels.
- Orders, carts, checkout, fulfillment, returns, and transactional state.
- Runtime availability that changes because customers buy products.

Inventory quantities should not appear in local catalog product files. If inventory automation becomes necessary later, it should be designed as a separate system with its own explicit source of truth, reconciliation rules, and safeguards.

## Shopify Sources

- Shopify metafield types: https://shopify.dev/docs/apps/custom-data/metafields/types
- Shopify metafields overview: https://help.shopify.com/en/manual/custom-data/metafields
- Shopify metaobjects overview: https://help.shopify.com/en/manual/custom-data/metaobjects
- Shopify product CSV import/export: https://help.shopify.com/en/manual/products/import-export/using-csv

## Source Files

- `data/shopify/metafield-definitions.askcrystal.json`: product metafield definitions to create in Shopify.
- `data/shopify/metaobject-definitions.askcrystal.json`: reusable metaobject definitions.
- `data/shopify/metaobject-entries.askcrystal.json`: seed material and ritual metaobject entries.
- `data/shopify/catalog/`: planned local source of truth for products, collections, media references, and schemas.
- `data/shopify/catalog/facets.askcrystal.json`: canonical collection facets and generated Shopify tag/collection rules.
- `data/shopify/catalog/schemas/product.schema.json`: local product catalog schema, intentionally excluding inventory quantities.
- `data/shopify/catalog/schemas/collection.schema.json`: local collection catalog schema.
- `data/shopify/askcrystal-product-data-dictionary.csv`: field-by-field data dictionary.
- `data/shopify/templates/askcrystal-product-enrichment-template.csv`: human/AI enrichment workspace.
- `data/shopify/templates/askcrystal-shopify-product-metafield-import-template.csv`: Shopify-shaped product metafield CSV starter.
- `scripts/build/provision_shopify_custom_data.py`: creates missing Shopify custom-data definitions and seed metaobjects.
- `scripts/build/prepare_askcrystal_product_metafields.py`: validates enrichment rows and emits a Shopify-shaped CSV.
- `scripts/build/sync_askcrystal_product_metafields.py`: resolves products/material metaobjects, writes reviewed enrichment rows to Shopify product metafields, and can add generated collection facet tags.

## Product Metafield Strategy

Use `namespace = askcrystal` for all AskCrystal product-detail data.

Required launch fields:

- `primary_intention`: one canonical lowercase intent, such as `calm`, `love`, `protection`, or `abundance`.
- `secondary_intentions`: JSON list of supporting intents.
- `product_form`: one canonical form key, such as `bracelet`, `necklace`, `ring`, `earrings`, `anklet`, `pendant`, `tumbled_stone`, `raw_stone`, `set`, or `ritual_kit`.
- `crystal_materials`: references to `askcrystal_crystal_material` metaobjects.
- `chakras`: JSON list using canonical chakra keys.
- `color_families`: JSON list using canonical color-family keys.
- `ritual_uses`: JSON list using canonical ritual-use keys.
- `energetic_properties`: JSON list of concise energetic phrases.
- `story_headline`: one-line emotional hook for the product story module.
- `story_summary`: short product-specific story copy.
- `benefits`: JSON list of benefits for the accordion/list area.
- `ritual_title`: title for the ritual section.
- `ritual_steps`: JSON list of practical ritual steps.
- `care_steps`: JSON list of product care steps.
- `included_items`: JSON list of what ships with the product.
- `quality_notes`: JSON list for trust/integrity badges.
- `safety_note`: wellness boundary and product-specific warnings if needed.
- `agent_summary`: concise agent-facing recommendation guidance.
- `agent_tags`: JSON list for search/retrieval/recommendation logic.
- `data_status`: `draft`, `ai_filled`, `human_reviewed`, or `approved`.

Optional but useful fields:

- `western_elements`
- `five_elements`
- `zodiac_signs`
- `gift_for`
- `archetype_name`
- `pairing_notes`

## Collection Facet Strategy

The canonical source of truth is product data, not hand-maintained Shopify collection membership.

AskCrystal currently supports these collection-facing axes:

- `crystal_materials`: generated from `askcrystal.crystal_materials` material handles.
- `product_form`: generated from `askcrystal.product_form`.
- `intentions`: generated from `askcrystal.primary_intention` and `askcrystal.secondary_intentions`.
- `chakras`: generated from `askcrystal.chakras`.
- `zodiac_signs`: generated from `askcrystal.zodiac_signs`.
- `color_families`: generated from `askcrystal.color_families`.
- `ritual_uses`: generated from `askcrystal.ritual_uses`.
- `gift_for`: generated from `askcrystal.gift_for`.

For Shopify automated collections, the CLI generates stable namespaced tags from these fields:

```text
material:amethyst
form:necklace
intention:sleep
chakra:crown
zodiac:pisces
color:purple
ritual:bedside
gift:stress_relief
```

This keeps metafields clean and semantic while using Shopify's reliable tag-based smart collection rules. Do not author every possible permutation. Generate single-axis collections by default, then add a small number of curated intersection collections only when they are merchandised intentionally, such as `Sleep Necklaces` or `Protection Bracelets`.

## Metaobject Strategy

### `askcrystal_crystal_material`

Reusable material profile. One entry per material, such as `amethyst`, `rose_quartz`, `black_tourmaline`, or `moonstone`.

The stable material key is the metaobject entry handle itself. Do not create a custom field named `handle`; Shopify reserves that name for system use.

This powers:

- Product properties when product-specific fields are incomplete.
- Product filters and future material collection pages.
- Agent recommendation grounding.
- Consistent material care notes.

### `askcrystal_ritual`

Reusable ritual profile for common patterns such as sleep, self-love, protection, abundance, and cleansing.

Product-specific ritual metafields can override or specialize this content. The reusable ritual object gives us a scalable library for the assistant and future bundles.

## Product Detail UI Mapping

Current and planned product detail elements should read data in this order:

1. Product metafield value.
2. Referenced crystal material metaobject fallback.
3. Theme section fallback setting.
4. Hide the optional element if no trustworthy content exists.

Mapping:

| UI element | Primary source | Fallback |
| --- | --- | --- |
| Why this piece headline | `askcrystal.story_headline` | Product title |
| Why this piece body | `askcrystal.story_summary` | Product description excerpt |
| Benefits list | `askcrystal.benefits` | Theme fallback benefits |
| Details properties | Native Shopify product fields plus `askcrystal.energetic_properties` | Theme fallback |
| Associated chakra | `askcrystal.chakras` | Material metaobject chakras |
| Associated zodiac | `askcrystal.zodiac_signs` | Material metaobject zodiac signs |
| Ritual section | `askcrystal.ritual_title` and `askcrystal.ritual_steps` | Ritual metaobject by intention |
| Care guide | `askcrystal.care_steps` | Material metaobject care notes |
| Included card | `askcrystal.included_items` | Store default inclusion copy |
| Integrity badges | `askcrystal.quality_notes` | Store default trust badges |
| Agent recommendation grounding | `askcrystal.agent_summary` and `askcrystal.agent_tags` | Product tags and material metaobject |

## Shopify Provisioning Workflow

Run a no-network dry run first:

```bash
python3 scripts/build/provision_shopify_custom_data.py
```

Apply to Shopify after confirming `.env` or `.env.local` contains:

```bash
SHOPIFY_STORE_DOMAIN=askcrystal.myshopify.com
SHOPIFY_ADMIN_API_VERSION=2026-04
```

For older store-admin custom apps, add the permanent Admin API token:

```bash
SHOPIFY_ADMIN_ACCESS_TOKEN=shpat_...
```

For newer Shopify Dev Dashboard apps, there may be no `API credentials` tab and no permanent `shpat_...` token. In that case use the app's Client ID and Client secret instead:

```bash
SHOPIFY_CLIENT_ID=...
SHOPIFY_CLIENT_SECRET=...
```

The provisioning script will exchange those client credentials for a short-lived Admin API token when `--apply` runs. It also accepts the existing proxy variable names `SHOPIFY_API_KEY` and `SHOPIFY_API_SECRET` as fallbacks.

Then run:

```bash
python3 scripts/build/provision_shopify_custom_data.py --apply
```

The script creates missing resources only:

- Metaobject definitions from `data/shopify/metaobject-definitions.askcrystal.json`.
- Product metafield definitions from `data/shopify/metafield-definitions.askcrystal.json`.
- Seed material and ritual entries from `data/shopify/metaobject-entries.askcrystal.json`.

Existing definitions and entries are skipped rather than overwritten. If a definition exists but is missing fields, the script prints a warning so we can handle the schema migration deliberately.

If Shopify rejects public Storefront access for a development app/API version, rerun with:

```bash
python3 scripts/build/provision_shopify_custom_data.py --apply --private-storefront-access
```

That still works for Liquid-rendered product pages. Storefront API access can be added later through Shopify Admin or a follow-up migration.

## Local Catalog Workflow

Target workflow:

1. Create or update product JSON files under `data/shopify/catalog/products/`.
2. Create or update collection JSON files under `data/shopify/catalog/collections/`.
3. Validate local catalog files against `data/shopify/catalog/schemas/`.
4. Agents may create or update files with `workflow_status = ai_filled`, but should not sync or publish.
5. Humans review and promote files to `workflow_status = human_reviewed` or `workflow_status = approved`.
6. A future catalog sync command creates or updates Shopify products/collections as draft or active according to explicit status.
7. Publishing should remain explicit; no agent-created product should auto-publish without approval.

Planned command shape:

```bash
python3 scripts/askcrystal_shopify.py catalog validate
python3 scripts/askcrystal_shopify.py catalog diff
python3 scripts/askcrystal_shopify.py catalog provision-collections
python3 scripts/askcrystal_shopify.py catalog sync --apply
```

Current implemented command:

```bash
python3 scripts/askcrystal_shopify.py catalog validate
python3 scripts/askcrystal_shopify.py catalog diff
```

`catalog validate` checks schema shape, filename/handle alignment, material handle references, collection/product references, duplicate SKUs, and forbidden inventory fields.

`catalog diff` validates first, then compares local catalog files against Shopify without writing. It currently checks core product fields, effective tags, collection membership, options, variants by SKU, collection basics, manual/tag collection rules, and directly comparable `askcrystal` metafields. Effective tags include both hand-authored product tags and generated facet tags.

`catalog provision-collections` creates or updates Shopify automated collections from `data/shopify/catalog/facets.askcrystal.json` and tag-mode collection JSON files:

```bash
python3 scripts/askcrystal_shopify.py catalog provision-collections
python3 scripts/askcrystal_shopify.py catalog provision-collections --apply
```

The dry run prints the planned collections and required tags. The apply mode writes collections to Shopify. It does not delete stale remote collections.

Collections created through Admin API may need to be published to the Online Store publication before appearing live. To publish during provisioning, set `SHOPIFY_ONLINE_STORE_PUBLICATION_ID` or pass it explicitly:

```bash
python3 scripts/askcrystal_shopify.py catalog publications
python3 scripts/askcrystal_shopify.py catalog provision-collections --apply \
  --publication-id gid://shopify/Publication/...
```

Inventory is not part of this workflow. Product and variant files may define SKU, price, options, taxable status, and shipping behavior, but not stock counts or inventory levels.

## Current Enrichment Bridge

Until full local catalog sync exists:

1. Create products in Shopify or keep existing Shopify products as sync targets.
2. Fill `data/shopify/templates/askcrystal-product-enrichment-template.csv` manually or with an AI skill.
3. Validate and generate Shopify-shaped CSV:

```bash
python3 scripts/build/prepare_askcrystal_product_metafields.py \
  data/shopify/templates/askcrystal-product-enrichment-template.csv \
  --output data/shopify/generated/askcrystal-shopify-product-metafields.csv
```

4. Human review rows with `data_status = ai_filled`.
5. Promote approved rows to `human_reviewed` or `approved`.
6. Check remote Shopify product/material references:

```bash
python3 scripts/build/sync_askcrystal_product_metafields.py --check-remote
```

7. Sync reviewed rows to Shopify:

```bash
python3 scripts/build/sync_askcrystal_product_metafields.py --apply --sync-facet-tags
```

8. Storefront product page reads metafields directly with Liquid.
9. Shopify automated collections select products through the generated facet tags.

Generated CSVs under `data/shopify/generated/` are intentionally ignored by git. The templates, definitions, validator, and reviewed enrichment rows are the durable source of truth.

Note: `crystal_material_handles_json` is required in the enrichment sheet. The generated CSV remains useful for simple product metafield imports, but metaobject reference fields such as `askcrystal.crystal_materials` should be written through `scripts/build/sync_askcrystal_product_metafields.py`, which resolves stable handles such as `amethyst` to Shopify metaobject IDs before calling the Admin API.

## Future AI Skill Shape

A future product catalog skill should:

- Create or update local product JSON files under `data/shopify/catalog/products/`.
- Never write directly to Shopify.
- Never set live inventory quantities.
- Mark generated files with `workflow_status = ai_filled` and `askcrystal.data_status = ai_filled`.
- Use canonical keys for chakras, zodiac signs, elements, statuses, and material handles.
- Never invent operational claims such as shipping inclusions, sourcing, certifications, or stock availability.
- Run catalog validation before returning.

The current enrichment-only skill shape remains acceptable as a bridge:

- Read product title, description, type, tags, collections, and material metaobjects.
- Fill only the enrichment CSV columns when working in CSV bridge mode.
- Use canonical keys for chakras, zodiac signs, elements, and statuses.
- Never invent operational claims such as shipping inclusions, sourcing, or certifications.
- Mark `data_status = ai_filled` until a human reviews the row.
- Run `scripts/build/prepare_askcrystal_product_metafields.py` before returning.

## Theme Implementation Notes

The product detail story section is wired to the `askcrystal` namespace:

- `story_headline` and `story_summary` drive the opening story module.
- `benefits`, `ritual_title`, `ritual_steps`, `care_steps`, `included_items`, `quality_notes`, and `safety_note` populate the custom product-detail sections.
- `energetic_properties`, `chakras`, `zodiac_signs`, `western_elements`, and `five_elements` populate the properties panel.
- `crystal_materials` can provide fallback material meaning, chakra, zodiac, element, care, and safety data once metaobject references are provisioned.

Every visible storefront field should fall back in this order:

1. Product metafield value.
2. Referenced crystal material metaobject fallback.
3. Theme section fallback setting.
4. Hide optional element if no trustworthy content exists.

When updating the product-detail Liquid, prefer explicit metafield access:

```liquid
{{ product.metafields.askcrystal.story_headline.value }}
```

For list fields:

```liquid
{% for benefit in product.metafields.askcrystal.benefits.value %}
  <li>{{ benefit }}</li>
{% endfor %}
```

For metaobject references:

```liquid
{% assign materials = product.metafields.askcrystal.crystal_materials.value %}
{% for material in materials %}
  {{ material.name.value }}
{% endfor %}
```

Reference metafields may be easier to provision through Admin API than through CSV because the importer must know the target metaobject references. The enrichment template stores stable material handles so a future provisioning script can resolve handles to Shopify IDs safely.
