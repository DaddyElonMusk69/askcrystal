# AskCrystal PRD Alignment: Where Instructions and Skills Belong

This maps PRD requirements (`docs/product/prd/PRD.md`, `docs/product/prd/PRD_CN.md`) to the exact implementation layer so behavior is stable and maintainable.

## 1) Instruction Stack (Single Source of Truth)

1. Global agent behavior (`persona`, `guardrails`, `conversation flow`, `recommendation contract`):
   - Dify app `model_config.pre_prompt`
   - Canonical source in repo: `scripts/ops/configure_openai_compatible_model.py` (`DEFAULT_AGENT_PRE_PROMPT`)
2. Skill routing policy (`which skill when`):
   - Dify app `model_config.pre_prompt`
   - Canonical routing spec: `docs/architecture/dify_skill_routing_prompt.md`
3. Domain execution logic (`how each metaphysics skill responds`):
   - `services/skill-bridge/src/dify_skill_bridge/skills/*.yml`
4. Catalog/cart grounding (`real products only`):
   - Dify MCP provider + app tool attachment (Shopify MCP tools)
   - Setup script: `scripts/ops/setup_shopify_mcp_direct.py`
5. Knowledge grounding (`crystal properties and references`):
   - Dify dataset (`AskCrystal-KB`) from `data/knowledge-base/dify_kb_docs/`

## 2) PRD Requirement -> Placement Map

| PRD Requirement | Put It Here | Why |
|---|---|---|
| Numen persona (empathetic, wise, modern) | `pre_prompt` | Must apply to every reply |
| No medical claims / no deterministic fate | `pre_prompt` safety section | Non-negotiable global guardrail |
| Wellness disclaimer | `pre_prompt` + frontend footer/trust copy | Both conversational and legal UX surfaces |
| 4-step flow (onboarding -> diagnosis -> rec -> care) | `pre_prompt` flow contract | Keeps interaction consistent |
| Recommend only 1-3 products | `pre_prompt` response contract | Prevents overlong shopping lists |
| Ground all product recs via tools | `pre_prompt` tool policy + MCP tools enabled | Prevents hallucinated products |
| Chinese metaphysics + astrology + crystal synthesis | `skills/*.yml` + routing prompt | Domain-specific behavior belongs in skill packs |
| Catalog tagging schema (`element`, `chakra`, `intention`, etc.) | Shopify product tags + tool-query strategy | Retrieval quality depends on tags, not prompt text |
| In-chat product cards | Shopify frontend app block/section | UI responsibility, not Dify responsibility |
| Post-purchase care guidance | `pre_prompt` response contract + crystal care skills | Keeps retention behavior present |

## 3) Skill Placement Rules (Operational)

1. Keep CN divination skills in `services/skill-bridge/src/dify_skill_bridge/skills/cn_divination_pack.yml`.
2. Keep astrology + crystal + healing execution in `services/skill-bridge/src/dify_skill_bridge/skills/astrology_crystal_pack.yml`.
3. Keep mythic/archetype framing in `services/skill-bridge/src/dify_skill_bridge/skills/mythology_pack.yml`.
4. Do not embed long persona/guardrail logic inside skill templates; keep those global in `pre_prompt`.
5. If adding new skill families, add `id`, `when_to_use`, strict `inputs`, and bounded `template`.

## 4) Current Gaps vs PRD (and Fix Location)

1. Prompt was previously too generic for PRD conversion flow:
   - fixed in `scripts/ops/configure_openai_compatible_model.py`.
2. Routing doc lacked hard Shopify grounding rules:
   - fixed in `docs/architecture/dify_skill_routing_prompt.md`.
3. Frontend rendering contract for cards/quick buttons is still separate work:
   - implement in Shopify theme section/app block (see `docs/product/SHOPIFY_HOME_AGENT_PLAN.md`).

## 5) Apply/Sync Commands

```bash
cd /Users/haokaiqin/Desktop/AskCrystal

# Apply PRD-aligned prompt to Dify app model_config.pre_prompt
python3 scripts/ops/configure_openai_compatible_model.py \
  --base-url http://localhost:18080 \
  --email askcrystal.admin@example.com \
  --password Askcrystal123 \
  --provider langgenius/openai_api_compatible/openai_api_compatible \
  --endpoint-url "$MODEL_BASE_URL" \
  --model-id "$MODEL_ID" \
  --api-key "$OPENAI_API_KEY"

# Ensure per-skill tools remain attached to app
python3 scripts/ops/sync_agent_skill_tools.py \
  --base-url http://localhost:18080 \
  --email askcrystal.admin@example.com \
  --password Askcrystal123 \
  --app-id 385c285a-0e61-4cf1-ba49-afde28c5ce12 \
  --provider askcrystal_skill_bridge
```

## 6) Rule of Thumb

- Put stable policy in `pre_prompt`.
- Put domain transforms in skill YAMLs.
- Put commerce truth in Shopify MCP tools.
- Put presentation in Shopify frontend.
