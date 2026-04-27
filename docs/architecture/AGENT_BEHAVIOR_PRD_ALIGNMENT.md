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
   - Dify workflow tools tracked in `services/dify-agent/workflows/`
   - Workflow DSL exports in `services/dify-agent/dsl/`
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
| Chinese metaphysics + astrology + crystal synthesis | Dify workflow tools + routing prompt | Domain-specific behavior belongs in typed workflow tools |
| Catalog tagging schema (`element`, `chakra`, `intention`, etc.) | Shopify product tags + tool-query strategy | Retrieval quality depends on tags, not prompt text |
| In-chat product cards | Shopify frontend app block/section | UI responsibility, not Dify responsibility |
| Post-purchase care guidance | `pre_prompt` response contract + crystal care skills | Keeps retention behavior present |

## 3) Skill Placement Rules (Operational)

1. Keep domain execution in Dify workflow tools under `services/dify-agent/workflows/`.
2. Keep source material under `external_skills/`; do not treat source repos as runtime code unless a workflow explicitly wraps them.
3. Do not embed long persona/guardrail logic inside workflow internals; keep those global in `pre_prompt`.
4. If adding new workflow families, add strict inputs, bounded outputs, examples, and a DSL/provisioning path.

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
  --email "$DIFY_ADMIN_EMAIL" \
  --password "$DIFY_ADMIN_PASSWORD" \
  --provider langgenius/openai_api_compatible/openai_api_compatible \
  --endpoint-url "$MODEL_BASE_URL" \
  --model-id "$MODEL_ID" \
  --api-key "$OPENAI_API_KEY"

# Provision or resync workflow-native tools only when intentionally needed
python3 scripts/build/provision_bazi_workflow.py
```

## 6) Rule of Thumb

- Put stable policy in `pre_prompt`.
- Put domain transforms in Dify workflow tools.
- Put commerce truth in Shopify MCP tools.
- Put presentation in Shopify frontend.
