# Dify Skill Integration (AskCrystal)

## Goal

Expose local skill packs as Dify custom tools through `services/skill-bridge`.

As of April 22, 2026, the bridge supports two layers:

1. Generic router endpoints (`list_skills`, `run_skill`), and
2. Per-skill endpoints (`/skill-tools/<skill_id>`) so each skill can appear as an explicit Dify tool.

## Components

- Bridge app: `services/skill-bridge/src/dify_skill_bridge/server.py`
- Skill packs:
  - `services/skill-bridge/src/dify_skill_bridge/skills/mythology_pack.(yml|json)`
  - `services/skill-bridge/src/dify_skill_bridge/skills/cn_divination_pack.(yml|json)`
  - `services/skill-bridge/src/dify_skill_bridge/skills/astrology_crystal_pack.(yml|json)`
- Registration script: `scripts/ops/register_skill_bridge_tools.py`
- App tool sync script: `scripts/ops/sync_agent_skill_tools.py`

## Start bridge

```bash
cd /Users/haokaiqin/Desktop/AskCrystal
./scripts/dev/start_skill_bridge.sh
```

Health check:

```bash
curl -fsS http://localhost:8010/health
```

## Register into Dify

```bash
cd /Users/haokaiqin/Desktop/AskCrystal
python3 scripts/ops/register_skill_bridge_tools.py \
  --base-url http://localhost:18080 \
  --email askcrystal.admin@example.com \
  --password Askcrystal123 \
  --bridge-openapi-url http://localhost:8010/openapi.json \
  --tool-server-url http://host.docker.internal:8010 \
  --provider askcrystal_skill_bridge

# Then sync all per-skill endpoints into AskCrystal app's agent tool list:
python3 scripts/ops/sync_agent_skill_tools.py \
  --base-url http://localhost:18080 \
  --email askcrystal.admin@example.com \
  --password Askcrystal123 \
  --app-id 385c285a-0e61-4cf1-ba49-afde28c5ce12 \
  --provider askcrystal_skill_bridge
```

Notes:

- `bridge-openapi-url` is fetched by this local script.
- `tool-server-url` is embedded into the OpenAPI `servers` section so Dify containers can call the bridge.
- Script is idempotent: creates provider first, updates if it already exists.

## Registered tool endpoints

Current provider exposes:

1. `health_health_get`
2. `list_skills_skills_get`
3. `run_skill_skills_run_post`
4. `list_crystals_crystals_get`
5. `get_crystal_crystals__slug__get`
6. `search_crystals_crystals_search_post`
7. One generated operation per skill in the form:
   - `run_<skill_id>_skill_post`
   - Example: `run_shushu_numerology_profile_skill_post`
8. (Optional) Shopify Storefront MCP bridge operations when `ENABLE_BRIDGE_SHOPIFY_MCP=1`:
   - `shopify_storefront_tools_list_post`
   - `shopify_storefront_tools_call_post`
   - `shopify_storefront_search_catalog_post`
   - `shopify_storefront_search_policies_post`
   - `shopify_storefront_get_cart_post`
   - `shopify_storefront_update_cart_post`

## Loaded skill inventory

Current bridge load count: 22 skills.

- Chinese metaphysics/divination:
  - `shushu_numerology_profile`
  - `bazi_chart_analysis`
  - `yinyuan_matchmaking`
  - `fengshui_space_audit`
  - `tarot_spread_interpretation_cn`
  - `taibu_structured_divination_router`
- Astrology + crystal:
  - `western_natal_archetype_read`
  - `astrology_transit_checkin`
  - `synastry_relationship_map`
  - `crystal_intention_matcher`
  - `crystal_chakra_balance_plan`
  - `crystal_cleansing_and_charging`
  - `crystal_grid_manifestation_design`
  - `astro_crystal_synthesis`
- Mythology/oracle framing:
  - `mythic_archetype_mapping`
  - `deity_alignment_lookup`
  - `symbolic_omen_reader`
  - `moon_ritual_designer`
  - `mythic_story_reframe`
  - `cross_mythology_synthesis`

## Connectivity check from Dify container

```bash
cd /Users/haokaiqin/Desktop/AskCrystal/services/dify-runtime/docker
docker compose exec -T api python - <<'PY'
import urllib.request
with urllib.request.urlopen('http://host.docker.internal:8010/health', timeout=10) as r:
    print(r.status)
    print(r.read().decode())
PY
```

## Prompt/routing references

- `docs/architecture/dify_skill_routing_prompt.md`
- `docs/skill_source_mapping.md`

These docs define when to call mythology/divination vs astrology/crystal skills and how to keep outputs safely framed.

## Why source skills may not appear in app tools

If the app only has generic `run_skill_skills_run_post`, Dify will not show each source skill as a separate tool.

Fix:

1. Restart bridge (if needed) so `/skill-tools/*` routes are in OpenAPI.
2. Re-run `register_skill_bridge_tools.py`.
3. Run `sync_agent_skill_tools.py` to inject all per-skill tools into app config.

## Shopify MCP Environment

Set in skill-bridge runtime:

- `SHOPIFY_STORE_DOMAIN` (default: `askcrystal.myshopify.com`)
- `SHOPIFY_STOREFRONT_MCP_PATH` (default: `/api/mcp`)
- Optional: `SHOPIFY_STOREFRONT_MCP_URL` to override full URL
- Optional: `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
- Optional: `SHOPIFY_STOREFRONT_MCP_BEARER_TOKEN`

Default behavior:

- `ENABLE_BRIDGE_SHOPIFY_MCP` defaults to `0`, so bridge-side Shopify endpoints are disabled.
- Recommended path is direct MCP provider configuration in Dify.

Direct MCP setup helper:

```bash
cd /Users/haokaiqin/Desktop/AskCrystal
python3 scripts/ops/setup_shopify_mcp_direct.py \
  --base-url http://localhost:18080 \
  --email askcrystal.admin@example.com \
  --password Askcrystal123 \
  --app-id 385c285a-0e61-4cf1-ba49-afde28c5ce12 \
  --server-url https://askcrystal.myshopify.com/api/mcp \
  --server-identifier shopify_storefront
```
