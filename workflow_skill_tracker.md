# AskCrystal Workflow Skill Tracker

Temporary working doc for replacing the current pseudo-skill bridge with Dify-native workflow tools.

## Why This Exists

- We want one simple source of truth for the next phase of agent work.
- The current `services/skill-bridge` is useful as reference, but it is not a real skills runtime.
- We are staying on Dify for now and taking the pragmatic route: port the six external skill families we actually need into Dify workflows/tools.

## Current Reality

- `external_skills/` contains the real source material and workflow ideas.
- `services/skill-bridge/` currently acts more like a prompt-pack adapter than a true skill system.
- The main AskCrystal agent should not keep growing on top of that legacy abstraction.
- If both the old pseudo-skills and new workflow-tools stay active at the same time, routing and debugging will get messy fast.
- The current exported Dify agent still references a much larger legacy skill-bridge tool surface than the six-source plan, so Phase 0 must explicitly narrow that surface.

## Decision

For now, we will:

1. Keep Dify as the main agent runtime.
2. Treat `external_skills/` as source material, not runtime.
3. Soft-dismount the current pseudo-skills from the active agent tool surface.
4. Rebuild the needed skills as Dify workflow-tools with strict JSON contracts.
5. Keep the legacy bridge in the repo until the new workflow-tools are stable.

For now, we will not:

- build a full Codex/OpenHands-style native skills runtime,
- keep expanding the YAML prompt-pack bridge as if it were the final architecture,
- port every skill at once.

## Scope Lock

For this phase, we are only building workflow-tools derived from the six source families under `external_skills/`.

That means:

- yes: source families from `external_skills/`
- no: new crystal-only skills
- no: western astrology-only skills
- no: extra mythology packs outside those six sources

Crystal recommendation, Shopify grounding, cart operations, and storefront UI rendering remain in the main AskCrystal agent layer for now.

## What We Are Building First

We are not rebuilding the whole skill universe first.

We are building a narrow, production-oriented first wave based on the six current external source families:

### Foundation

- [x] Narrow the repo-side exported Dify agent spec to the six-skill target tool surface
- [ ] Mark `services/skill-bridge/` as legacy in docs/comments where relevant
- [x] Define one shared workflow output contract for all new Dify workflow-tools
- [x] Define one naming convention for workflow-tools and their input/output schemas
- [x] Define one test prompt set for validating workflow behavior end-to-end

### First-Wave Workflow Tools

- [ ] `shushu_numerology_profile`
  - Source: `external_skills/Numerologist_skills/`
  - Role: birth/date/name numerology-style profile
- [ ] `bazi_chart_analysis`
  - Source: `external_skills/bazi-skill/`
  - Role: structured Bazi/Four Pillars reading
- [ ] `yinyuan_matchmaking`
  - Source: `external_skills/yinyuan-skills/`
  - Role: relationship compatibility / matchmaking path
- [ ] `fengshui_space_audit`
  - Source: `external_skills/fengshui.skill/`
  - Role: home/workspace fengshui review
- [ ] `tarot_spread_interpretation`
  - Source: `external_skills/tarot-skill/`
  - Role: tarot reading and interpretation
- [ ] `taibu_structured_divination_router`
  - Source: `external_skills/taibu/`
  - Role: mixed-intent routing and structured divination orchestration

### Explicitly Out Of Scope For This Phase

- [ ] crystal-only workflow-tools
- [ ] western astrology workflow-tools
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
- Shopify product grounding stays outside these six workflow-tools unless we later choose to explicitly wrap a commerce search flow.

## Six-Source Mapping

| Source family | Source path | Initial workflow-tool | Notes |
| --- | --- | --- | --- |
| Numerologist_skills | `external_skills/Numerologist_skills/` | `shushu_numerology_profile` | Start with the numerology/profile slice only; do not split into qimen/ziwei yet |
| bazi-skill | `external_skills/bazi-skill/` | `bazi_chart_analysis` | Use as the main classical Bazi workflow |
| yinyuan-skills | `external_skills/yinyuan-skills/` | `yinyuan_matchmaking` | Focus on matchmaking / compatibility flow first |
| fengshui.skill | `external_skills/fengshui.skill/` | `fengshui_space_audit` | Practical home/workspace guidance only |
| tarot-skill | `external_skills/tarot-skill/` | `tarot_spread_interpretation` | Keep spread selection + interpretation together |
| taibu | `external_skills/taibu/skills/divination/` | `taibu_structured_divination_router` | Acts as routing/meta-workflow, not a content-heavy reading tool |

## Current Legacy Tool Surface

The current exported Dify agent still references many legacy bridge tools, including:

- the six we still care about:
  - `run_shushu_numerology_profile_skill_post`
  - `run_bazi_chart_analysis_skill_post`
  - `run_yinyuan_matchmaking_skill_post`
  - `run_fengshui_space_audit_skill_post`
  - `run_tarot_spread_interpretation_cn_skill_post`
  - `run_taibu_structured_divination_router_skill_post`
- plus extra legacy tools that are outside the current six-source scope:
  - crystal-only tools
  - astrology-only tools
  - mythology-only tools
  - qimen / ziwei standalone tools

This means "soft dismount" is not only about replacing old behavior later.
It also means narrowing the active tool surface now so the model stops seeing tools we no longer intend to support in this phase.

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
- The six-source limit is intentional; do not add new workflow-tools outside this list during this phase.

## Migration Strategy

### Phase 0: Clean Separation

- [ ] Disable old pseudo-skills in the active Dify agent
- [ ] Keep `services/skill-bridge/` in repo as legacy reference
- [ ] Stop adding new behavior to the legacy bridge
- [x] Remove out-of-scope legacy tool references from the repo-side exported Dify agent config/prompt

### Phase 1: Shared Contract

- [ ] Finalize the shared JSON return shape
- [ ] Create example outputs for each first-wave skill
- [ ] Document error and missing-input behavior

### Phase 2: Port the First Wave

- [ ] Build first Dify workflow-tool
- [ ] Validate it from Dify UI directly
- [ ] Validate it through the AskCrystal chat agent
- [ ] Repeat for the remaining first-wave tools

Current drafted implementation spec:

- [x] `taibu_structured_divination_router`
  - Repo spec drafted at `services/dify-agent/workflows/specs/taibu_structured_divination_router.md`
- [x] `bazi_chart_analysis`
  - Repo spec drafted at `services/dify-agent/workflows/specs/bazi_chart_analysis.md`

Recommended port order:

1. `taibu_structured_divination_router`
2. `bazi_chart_analysis`
3. `tarot_spread_interpretation`
4. `yinyuan_matchmaking`
5. `fengshui_space_audit`
6. `shushu_numerology_profile`

### Phase 3: Agent Prompt Alignment

- [ ] Remove legacy pseudo-skill references from the agent prompt
- [ ] Teach the main agent when to call each workflow-tool
- [ ] Keep the tool-selection policy concise and strict

### Phase 4: Stabilization

- [ ] Run regression prompts across all first-wave tools
- [ ] Check tool-heavy conversations for routing drift
- [ ] Confirm the storefront final-answer flow still behaves correctly
- [ ] Decide whether the legacy bridge can be retired

## Open Questions

- Should any workflow-tool be allowed to perform Shopify catalog grounding directly, or should commerce grounding stay exclusively in the main agent layer?
- Do we want one shared "divination router" workflow forever, or is it only a temporary bridge while we tighten the main agent prompt?
- Which of the six source families need deterministic workflow branching versus mostly prompt-driven structured output?

## Working Rule For Now

Until the first-wave workflow-tools are stable:

- do not expand the legacy prompt-pack bridge,
- do not delete `external_skills/`,
- do not attempt a full native skill runtime rebuild,
- do not port anything outside the six-source shortlist.

## Progress Notes

- [x] Repo reorganized around deployables and services
- [x] Legacy skill bridge preserved in repo for reference
- [x] Workflow scope locked to the six `external_skills/` source families
- [x] Repo-side exported Dify agent spec narrowed to the six-skill target surface
- [ ] Live Dify app tool surface narrowed to the six-skill target surface
- [x] First shared workflow-tool contract drafted in repo
- [x] Initial workflow test prompt set drafted in repo
- [ ] First workflow-tool implemented
