# Skill Coverage Audit (Against Requested 6 Repos)

## Scope

Requested sources:

1. shushu: `FANzR-arch/Numerologist_skills`
2. bazi: `jinchenma94/bazi-skill`
3. marriage: `Ming-H/yinyuan-skills`
4. fengshui: `voidforall/fengshui.skill`
5. tarot: `daman-ovo-0404/tarot-skill`
6. taibu: `hhszzzz/taibu`

Current runtime pack files:

- `services/skill-bridge/src/dify_skill_bridge/skills/cn_divination_pack.yml`
- `services/skill-bridge/src/dify_skill_bridge/skills/astrology_crystal_pack.yml`
- `services/skill-bridge/src/dify_skill_bridge/skills/mythology_pack.yml`

## Current Status Summary

The 6 requested families are present as **adapted prompt skills**, but not as full direct imports of each upstream repo's full capability surface.

In short:

1. Coverage exists at intent/template level.
2. Deep workflow/script/tool features from upstream repos are mostly not yet wired in.
3. Naming differs from original repo names, so they may appear "missing" in Dify UI even when mapped.

## Runtime Verification Snapshot (April 22, 2026)

Verified against local runtime:

1. Bridge health: `skills_loaded = 22`
2. Bridge skill list includes all requested families:
   - `shushu_numerology_profile`
   - `bazi_chart_analysis`
   - `yinyuan_matchmaking`
   - `fengshui_space_audit`
   - `tarot_spread_interpretation_cn`
   - `taibu_structured_divination_router`
3. AskCrystal app tool references were previously generic:
   - `list_skills_skills_get`
   - `run_skill_skills_run_post`
   - `search_crystals_crystals_search_post`
   - `get_crystal_crystals__slug__get`

This is the key reason source skills can feel "not installed": they were loaded in bridge runtime but not exposed as explicit per-skill app tools.

## Visibility Remediation Added

Codebase now includes:

1. Generated per-skill endpoints in bridge:
   - path pattern: `/skill-tools/<skill_id>`
   - operation pattern: `run_<skill_id>_skill_post`
2. App sync utility:
   - `scripts/ops/sync_agent_skill_tools.py`
   - injects all per-skill operations into AskCrystal app `agent_mode.tools`

## Post-Remediation Runtime Result (April 22, 2026)

After bridge restart + provider schema update + app sync:

1. Provider tool count: `28`
2. AskCrystal app active agent tools: `25`
3. Confirmed present in app tool list:
   - `run_shushu_numerology_profile_skill_post`
   - `run_bazi_chart_analysis_skill_post`
   - `run_yinyuan_matchmaking_skill_post`
   - `run_fengshui_space_audit_skill_post`
   - `run_tarot_spread_interpretation_cn_skill_post`
   - `run_taibu_structured_divination_router_skill_post`

## Mapping: Requested Family -> Current Skill IDs

1. shushu -> `shushu_numerology_profile`
2. bazi -> `bazi_chart_analysis`
3. marriage -> `yinyuan_matchmaking`
4. fengshui -> `fengshui_space_audit`
5. tarot -> `tarot_spread_interpretation_cn`
6. taibu -> `taibu_structured_divination_router`

Additional derived skills currently present:

- `qimen_timing_direction_read`
- `ziwei_palace_theme_read`

## Gap Analysis by Source

## 1) Numerologist_skills (shushu/bazi/qimen/ziwei)

What exists now:

- Single-skill templates for shushu/bazi/qimen/ziwei outputs.

Main gaps:

- Upstream multi-step engineering flow is compressed into simple templates.
- No fixed-calculation script execution path in current Dify bridge.
- Limited validation and uncertainty handling vs upstream guidance.

## 2) bazi-skill

What exists now:

- `bazi_chart_analysis` template skill.

Main gaps:

- Upstream requires strict staged intake and explicit calculation/validation discipline.
- Missing richer reference-driven sections (classic texts, detailed charting checkpoints).
- No separate "light vs deep report" mode.

## 3) yinyuan-skills (marriage)

What exists now:

- `yinyuan_matchmaking` template skill.

Main gaps:

- Upstream supports multiple sub-modes (bazi matching, zodiac, ziwei, fortune stick, peach blossom).
- Current pack collapses these into one generic matchmaking output.

## 4) fengshui.skill

What exists now:

- `fengshui_space_audit` template skill.

Main gaps:

- Upstream includes richer model/flow for classical systems and environment diagnostics.
- Current output is practical but not comprehensive across upstream depth.

## 5) tarot-skill

What exists now:

- `tarot_spread_interpretation_cn` template skill.

Main gaps:

- Upstream includes richer spread workflows and script-driven draw process.
- Current bridge does not execute tarot draw scripts or full relation analysis logic.

## 6) taibu

What exists now:

- `taibu_structured_divination_router` (routing/meta-planning style).

Main gaps:

- Upstream TaiBu supports a broad multi-system engine (bazi, ziwei, qimen, liuyao, tarot, etc.).
- Current bridge does not expose TaiBu MCP/tool surface as callable operations.
- Effectively only a lightweight router abstraction is active now.

## Why It Feels Incomplete in Agent UI

1. Skill names were normalized/renamed for bridge packs.
2. Current implementation favors compact templates over full upstream workflow parity.
3. Some upstream repos are framework-style skill systems, not directly drop-in Dify tools.

## Recommended Next Upgrade Track

## Track A: Visibility and Naming Alignment (quick win)

1. Add aliases/labels in skill metadata so source names appear in Dify-facing descriptions.
2. Add `source_repo` metadata field to every skill.

## Track B: Decompose Monolithic Skills (medium)

1. Split `yinyuan_matchmaking` into dedicated subskills.
2. Split `taibu_structured_divination_router` into executable sub-domain skills.
3. Add separate "short answer" and "deep report" variants.

## Track C: Execution Parity with Upstream (advanced)

1. Add optional script-backed execution endpoints for deterministic parts.
2. Introduce strict input validators and missing-field interview flow.
3. Add test prompts + expected output snapshots per skill.

## Definition of Done for "Comprehensive"

1. Every requested source has at least one visible skill with source label.
2. High-value sub-modes are split into dedicated callable skills.
3. At least one deterministic/script-backed path is enabled where upstream expects it.
4. Skill audit script reports source coverage and missing parity items.
