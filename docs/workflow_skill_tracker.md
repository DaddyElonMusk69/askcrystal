# AskCrystal Workflow Skill Tracker

Temporary working doc for tracking the Dify-native workflow tool migration after retiring the old pseudo-skill bridge.

## Why This Exists

- We want one simple source of truth for the next phase of agent work.
- We are staying on Dify for now and taking the pragmatic route: port the external skill families we actually need into Dify workflows/tools.

## Current Reality

- `external_skills/` contains the real source material and workflow ideas.
- The retired bridge acted more like a prompt-pack adapter than a true skill system.
- The main AskCrystal agent should not grow on top of that retired abstraction.
- Keeping both old pseudo-skills and new workflow-tools active at the same time made routing and debugging messy.
- The current exported Dify agent used to reference a much larger legacy skill-bridge tool surface than the workflow-tool plan, so Phase 0 explicitly narrowed that surface.

## Decision

For now, we will:

1. Keep Dify as the main agent runtime.
2. Treat `external_skills/` as source material, not runtime.
3. Keep the old pseudo-skills removed from the active agent tool surface.
4. Rebuild the needed skills as Dify workflow-tools with strict JSON contracts.
5. Keep workflow specs and DSL exports as the operational source of truth.

For now, we will not:

- build a full Codex/OpenHands-style native skills runtime,
- port every skill at once.

## Scope Lock

For this phase, we are building workflow-tools derived from the six original source families under `external_skills/`, plus the explicit horoscope follow-up the product now needs.

That means:

- yes: source families from `external_skills/`
- no: new crystal-only skills
- no: extra astrology-only skills beyond the horoscope workflow
- no: extra mythology packs outside the current source list

Crystal recommendation, Shopify grounding, cart operations, and storefront UI rendering remain in the main AskCrystal agent layer for now.

## What We Are Building First

We are not rebuilding the whole skill universe first.

We are building a narrow, production-oriented first wave based on the original external source families, now expanded with horoscope as a seventh workflow:

### Foundation

- [x] Narrow the repo-side exported Dify agent spec to the workflow-tool target surface
- [x] Remove the retired skill bridge service and bridge-only scripts
- [x] Define one shared workflow output contract for all new Dify workflow-tools
- [x] Define one naming convention for workflow-tools and their input/output schemas
- [x] Define one test prompt set for validating workflow behavior end-to-end

### First-Wave Workflow Tools

- [x] `shushu_numerology_profile`
  - Source: `external_skills/Numerologist_skills/`
  - Role: birth/date/name numerology-style profile
- [x] `bazi_chart_analysis`
  - Source: `external_skills/bazi-mingli-main/`
  - Role: structured Bazi/Four Pillars reading
- [x] `yinyuan_matchmaking`
  - Source: `external_skills/yinyuan-skills/`
  - Role: relationship compatibility / matchmaking path
- [x] `fengshui_space_audit`
  - Source: `external_skills/fengshui.skill/`
  - Role: home/workspace fengshui review
- [x] `tarot_spread_interpretation`
  - Source: `external_skills/tarot-skill/`
  - Role: tarot reading and interpretation
- [x] `taibu_structured_divination_router`
  - Source: `external_skills/taibu/`
  - Role: mixed-intent routing and structured divination orchestration
- [x] `horoscope_daily_guidance`
  - Source: `external_skills/horoscope-daily-2.3.0/`
  - Role: Western zodiac daily/weekly/monthly guidance

### Explicitly Out Of Scope For This Phase

- [ ] crystal-only workflow-tools
- [x] western horoscope workflow-tool
- [ ] separate qimen-only workflow-tool
- [ ] separate ziwei-only workflow-tool
- [ ] full native skills runtime

## Target Architecture

```text
Shopify theme
  -> Shopify app/proxy
    -> Dify main chat agent
      -> Dify workflow-tools
        -> Shopify tools / knowledge / structured logic
```

Key rule:

- The main agent orchestrates.
- Workflow-tools do focused domain work.
- Storefront rendering still happens through the final answer contract, not inside workflow internals.
- Shopify product grounding stays outside these workflow-tools unless we later choose to explicitly wrap a commerce search flow.

## Source Mapping

| Source family | Source path | Initial workflow-tool | Notes |
| --- | --- | --- | --- |
| Numerologist_skills | `external_skills/Numerologist_skills/` | `shushu_numerology_profile` | Start with the numerology/profile slice only; do not split into qimen/ziwei yet |
| bazi-mingli-main | `external_skills/bazi-mingli-main/` | `bazi_chart_analysis` | Use as the current deterministic Bazi workflow base; keep `yuan-main/references/bazi/` as the higher-fidelity future engine reference |
| yinyuan-skills | `external_skills/yinyuan-skills/` | `yinyuan_matchmaking` | Focus on matchmaking / compatibility flow first |
| fengshui.skill | `external_skills/fengshui.skill/` | `fengshui_space_audit` | Practical home/workspace guidance only |
| tarot-skill | `external_skills/tarot-skill/` | `tarot_spread_interpretation` | Keep spread selection + interpretation together |
| taibu | `external_skills/taibu/skills/divination/` | `taibu_structured_divination_router` | Acts as routing/meta-workflow, not a content-heavy reading tool |
| horoscope-daily-2.3.0 | `external_skills/horoscope-daily-2.3.0/` | `horoscope_daily_guidance` | Explicit follow-up workflow for Western zodiac horoscope requests |

## Removed Legacy Tool Surface

The exported Dify agent used to reference many legacy bridge tools, including:

- the original six legacy skill paths we still cared about:
  - `run_shushu_numerology_profile_skill_post`
  - `run_bazi_chart_analysis_skill_post`
  - `run_yinyuan_matchmaking_skill_post`
  - `run_fengshui_space_audit_skill_post`
  - `run_tarot_spread_interpretation_cn_skill_post`
  - `run_taibu_structured_divination_router_skill_post`
- plus extra legacy tools that are outside the current bounded workflow scope:
  - crystal-only tools
  - astrology-only tools
  - mythology-only tools
  - qimen / ziwei standalone tools

Those old API tools are no longer a supported runtime path. The active tool surface should remain workflow-native plus Shopify MCP.

## Workflow Tool Contract

Each workflow-tool should return structured JSON, not loose prose blobs.

Baseline shape:

```json
{
  "status": "ok",
  "skill": "bazi_chart_analysis",
  "summary": "Short plain-language outcome",
  "findings": [
    "Key insight 1",
    "Key insight 2"
  ],
  "follow_up_questions": [],
  "recommendations": [
    "Practical action 1"
  ],
  "safety_note": "Light non-medical / non-deterministic boundary",
  "metadata": {
    "confidence": "medium",
    "missing_inputs": []
  }
}
```

Rules:

- `summary` should be short and model-friendly.
- `findings` should carry the real payload.
- `follow_up_questions` should be empty unless more data is truly required.
- `metadata.missing_inputs` must be explicit so the main agent can ask the user cleanly.
- Router-style tools may also set `metadata.intent_type`, `metadata.primary_method`, and `metadata.next_tool`.
- No storefront UI manifests should come from these workflow-tools directly.
- No chain-of-thought or hidden reasoning should be returned.
- These workflow-tools are domain engines, not commerce presenters.

## Tool Design Rules

- One workflow-tool should do one domain job well.
- If the tool needs too much branching, split it.
- If the tool requires product grounding, let the main agent call Shopify tools separately unless the workflow explicitly owns that search step.
- Every workflow-tool should be safe to call independently.
- Output should be stable enough that the main agent can wrap it in AskCrystal tone without hallucinating.
- The workflow list is intentionally bounded; do not add new workflow-tools outside this list during this phase.

## Migration Strategy

### Phase 0: Clean Separation

- [x] Disable old pseudo-skills in the active Dify agent
- [x] Remove `services/skill-bridge/` and bridge-only scripts from the repo
- [x] Remove out-of-scope legacy tool references from the repo-side exported Dify agent config/prompt

### Phase 1: Shared Contract

- [ ] Finalize the shared JSON return shape
- [ ] Create example outputs for each first-wave skill
- [ ] Document error and missing-input behavior

### Phase 2: Port the First Wave

- [x] Build first Dify workflow-tool
- [ ] Validate it from Dify UI directly
- [x] Wire the first workflow-tool into the AskCrystal chat agent tool surface
- [ ] Validate it through the AskCrystal chat agent with a live routing prompt
- [ ] Repeat for the remaining first-wave tools

Current drafted implementation spec:

- [x] `shushu_numerology_profile`
  - Repo spec drafted at `services/dify-agent/workflows/specs/shushu_numerology_profile.md`
- [x] `taibu_structured_divination_router`
  - Repo spec drafted at `services/dify-agent/workflows/specs/taibu_structured_divination_router.md`
- [x] `bazi_chart_analysis`
  - Repo spec drafted at `services/dify-agent/workflows/specs/bazi_chart_analysis.md`
- [x] `tarot_spread_interpretation`
  - Repo spec drafted at `services/dify-agent/workflows/specs/tarot_spread_interpretation.md`
- [x] `yinyuan_matchmaking`
  - Repo spec drafted at `services/dify-agent/workflows/specs/yinyuan_matchmaking.md`
- [x] `fengshui_space_audit`
  - Repo spec drafted at `services/dify-agent/workflows/specs/fengshui_space_audit.md`
- [x] `horoscope_daily_guidance`
  - Repo spec drafted at `services/dify-agent/workflows/specs/horoscope_daily_guidance.md`

Recommended port order:

1. `taibu_structured_divination_router`
2. `bazi_chart_analysis`
3. `tarot_spread_interpretation`
4. `yinyuan_matchmaking`
5. `fengshui_space_audit`
6. `shushu_numerology_profile`

### Phase 3: Agent Prompt Alignment

- [x] Remove legacy pseudo-skill references from the agent prompt
- [x] Teach the main agent when to call each workflow-tool
- [x] Keep the tool-selection policy concise and strict

### Phase 4: Stabilization

- [ ] Run regression prompts across all first-wave tools
- [ ] Check tool-heavy conversations for routing drift
- [ ] Confirm the storefront final-answer flow still behaves correctly
- [x] Retire the legacy bridge path

## Open Questions

- Should any workflow-tool be allowed to perform Shopify catalog grounding directly, or should commerce grounding stay exclusively in the main agent layer?
- Do we want one shared "divination router" workflow forever, or is it only a temporary bridge while we tighten the main agent prompt?
- Which workflow families need deterministic workflow branching versus mostly prompt-driven structured output?
- The repo now has a practical deterministic Bazi path via `external_skills/bazi-mingli-main/scripts/bazi_calc.py`, but its upstream license means we should still plan a cleaner long-term replacement before treating it as the final commercial engine.

## Working Rule For Now

Until the first-wave workflow-tools are stable:

- do not delete `external_skills/`,
- do not attempt a full native skill runtime rebuild,
- do not port anything outside the current bounded workflow shortlist.

## Progress Notes

- [x] Repo reorganized around deployables and services
- [x] Retired skill bridge removed from repo
- [x] Workflow scope locked to the bounded `external_skills/` source families
- [x] Repo-side exported Dify agent spec narrowed to the workflow-tool target surface
- [x] Live Dify app tool surface narrowed to the workflow-tool target surface
- [x] First shared workflow-tool contract drafted in repo
- [x] Initial workflow test prompt set drafted in repo
- [x] First workflow-tool implemented
- [x] First workflow-tool wired live into the AskCrystal agent as `provider_type: workflow`
- [x] Second workflow-tool implemented: `workflow_tarot_spread_interpretation`
- [x] Second workflow-tool wired live into the AskCrystal agent as `provider_type: workflow`
- [x] Third workflow-tool implemented: `workflow_yinyuan_matchmaking`
- [x] Third workflow-tool wired live into the AskCrystal agent as `provider_type: workflow`
- [x] Fourth workflow-tool implemented: `workflow_fengshui_space_audit`
- [x] Fourth workflow-tool wired live into the AskCrystal agent as `provider_type: workflow`
- [x] Fifth workflow-tool implemented: `workflow_shushu_numerology_profile`
- [x] Fifth workflow-tool wired live into the AskCrystal agent as `provider_type: workflow`
- [x] Repo-side sixth workflow-tool implemented: `workflow_bazi_chart_analysis`
- [x] Sixth workflow-tool wired live into the AskCrystal agent as `provider_type: workflow`
- [x] Live AskCrystal app now uses workflow-native skill tools and no legacy API skill tools
- [x] Repo-side seventh workflow-tool implemented: `workflow_horoscope_daily_guidance`
- [x] Seventh workflow-tool wired live into the AskCrystal agent as `provider_type: workflow`
- [x] Horoscope live chat smoke passed through the main AskCrystal agent
- [x] Yinyuan live chat smoke passed after resyncing the stale Dify workflow-tool wrapper (`synced: false` -> `synced: true`)
- [x] Tarot workflow-tool wrapper resync logic added and live wrapper resynced (`synced: false` -> `synced: true`)
- [x] Fengshui live chat smoke passed through the main AskCrystal agent
- [x] Shushu numerology live chat smoke passed through the main AskCrystal agent
- [ ] Mixed-intent live chat smoke fully validated end-to-end across all workflow-native tools
- [x] Repo-side Bazi deterministic calculator path restored through `external_skills/bazi-mingli-main/scripts/bazi_calc.py`
- [x] Duplicate local Dify workflow app imports cleaned up for older Yinyuan and Taibu copies
