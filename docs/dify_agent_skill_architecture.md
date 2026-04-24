# Dify Agent Skill Architecture (AskCrystal)

## Goal

Build AskCrystal agent locally on Dify with:

- RAG grounded on prepared crystal KB,
- tool-based crystal retrieval,
- pluggable mythology skill expansion,
- clean migration path to Dify Cloud.

## Architecture

1. Shopify storefront app (later phase) talks to Dify app API.
2. Dify app orchestrates:
   - model response,
   - KB retrieval,
   - tools.
3. `dify_skill_bridge` exposes OpenAPI tools:
   - generic skill execution (`/skills/run`),
   - crystal KB lookup (`/crystals/search`, `/crystals/{slug}`).
4. Skill packs live as YAML files and can be expanded without changing Dify logic.

Current packs:

- `dify_skill_bridge/skills/cn_divination_pack.yml`
- `dify_skill_bridge/skills/astrology_crystal_pack.yml`
- `dify_skill_bridge/skills/mythology_pack.yml`

## Why this works for "skills" in Dify

Dify doesn't need a first-class "skill marketplace" concept for this use case.
We can model skills as external tool contracts and keep all skill semantics in a versioned local pack.

Benefits:

- easy add/remove of skills,
- explicit tool traces in Dify logs,
- deterministic integration with guardrails,
- same contract works in local and cloud.

## Local build sequence

1. Start Dify locally (Docker).
2. Start `dify_skill_bridge` on `:8010`.
3. Import bridge OpenAPI into Dify Custom Tools.
4. Build Dify agent prompt with tool policy:
   - call skill tools for mythology framing,
   - call crystal tools for grounded recommendations,
   - always include safety disclaimer.
5. Upload KB docs produced by `scripts/prepare_dify_kb.py`.
6. Run chat tests and tune routing thresholds.

## KB preparation workflow

Use:

```bash
python3 scripts/prepare_dify_kb.py \
  --input crystal_knowledge_base_final-90b679ba5d.json \
  --output dify_kb_docs
```

Then upload `dify_kb_docs` into Dify Knowledge as documents.

## Cloud migration checklist

1. Deploy bridge as a small API service (same endpoints).
2. Update Dify Custom Tool base URL.
3. Keep skill packs in git and CI publish with service deploy.
4. Repoint KB ingestion to cloud Dify dataset.
5. Keep prompt/tool policies identical to reduce behavior drift.

## How we will plug your mythology skill list later

When you share the list:

1. Add each skill as a YAML entry in `dify_skill_bridge/skills/`.
2. Group tags by function (`diagnosis`, `ritual`, `symbolism`, `archetype`).
3. Add strict required inputs so Dify calls stay high quality.
4. Optionally add separate skill packs per mythology system (Greek, Chinese, Norse).

This keeps expansion operationally simple: edit YAML, redeploy bridge, tools update automatically.

## Dify references

- Workspace tools overview (includes Custom Tools via OpenAPI/Swagger, Workflow Tools, MCP Tools): https://docs.dify.ai/en/use-dify/workspace/tools
- Dify MCP extended reading (transport/security behavior): https://docs.dify.ai/en/learn-more/extended-reading/dify-docs-mcp
