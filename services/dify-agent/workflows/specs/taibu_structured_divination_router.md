# Taibu Structured Divination Router

## Purpose

This is the first workflow to rebuild because it stabilizes mixed-intent routing before the main agent calls a deeper reading workflow.

The Taibu router should not behave like a full divination engine in this phase.

Its job is narrower:

1. identify the best-fit supported method,
2. explain why that method fits,
3. identify the minimum missing inputs,
4. tell the main agent what workflow should run next,
5. avoid over-answering.

## Source

- Primary source: `external_skills/taibu/skills/divination/SKILL.md`
- Supporting references:
  - `external_skills/taibu/skills/divination/references/mcp-tool-matrix.md`
  - `external_skills/taibu/skills/divination/references/bazi-workflow.md`
  - `external_skills/taibu/skills/divination/references/tarot-workflow.md`

## Supported Routes In This Phase

The router may choose only from:

- `bazi`
- `tarot`
- `fengshui`
- `yinyuan`
- `numerology`
- `none`

It must not route to:

- astrology-only methods
- crystal-only methods
- qimen-only methods
- ziwei-only methods
- mythology-only methods

## Workflow Inputs

### Required

- `user_query`

### Optional

- `available_methods`
  - default: `bazi, tarot, fengshui, yinyuan, numerology`

## Workflow Output Contract

Return `askcrystal_skill_result_v1`.

Router-specific metadata expectations:

```json
{
  "metadata": {
    "intent_type": "mixed_reading",
    "primary_method": "bazi",
    "next_tool": "workflow_bazi_chart_analysis",
    "missing_inputs": ["birth_datetime", "gender"]
  }
}
```

## Intent Classes

The workflow should classify the query into one of these intent classes:

- `reading`
- `mixed_reading`
- `shopping_only`
- `policy_or_cart`
- `out_of_scope`

## Route Decision Table

### Bazi

Choose Bazi when the user asks about:

- 八字
- 四柱
- destiny pattern
- long-cycle life themes
- timing over years
- birth-chart style self-reading using Eastern metaphysics

Minimum missing inputs:

- `birth_datetime`
- `gender`

Next tool:

- `workflow_bazi_chart_analysis`

### Tarot

Choose tarot when the user asks about:

- an immediate emotional question
- a decision in the near term
- cards they already drew
- relationship or work guidance that is short-horizon and reflective

Minimum missing inputs:

- none if the question is already clear

Next tool:

- `workflow_tarot_spread_interpretation`

### Fengshui

Choose fengshui when the user asks about:

- room layout
- bed, desk, door, window placement
- home or workspace flow
- environmental friction or focus

Minimum missing inputs:

- `space_description`

Next tool:

- `workflow_fengshui_space_audit`

### Yinyuan

Choose yinyuan when the user asks about:

- compatibility
- marriage potential
- when they may meet the right person
- whether two people are a fit

Minimum missing inputs:

- `question`
- optionally `person_a` and `person_b`

Next tool:

- `workflow_yinyuan_matchmaking`

### Numerology

Choose numerology when the user asks about:

- number patterns
- a birthday-based profile
- a life-path or personal pattern reading without asking for a deeper classical chart

Minimum missing inputs:

- `birth_date`

Next tool:

- `workflow_shushu_numerology_profile`

### None

Choose `none` when:

- the question is purely about shopping,
- the question is purely about policy/cart operations,
- the requested system is out of phase scope and no supported alternative clearly fits.

Next tool:

- none

## Dify Workflow Shape

### Node 1: Start

Inputs:

- `user_query`
- `available_methods`

### Node 2: Normalize

Goal:

- trim noisy phrasing,
- preserve named systems and explicit intent,
- keep the user wording semantically intact.

Output:

- `normalized_query`

### Node 3: Route Classification LLM

Single job:

- classify the query into `intent_type`,
- choose `primary_method`,
- list `missing_inputs`,
- choose `next_tool`,
- give a short reason.

Hard constraints:

- must choose only from the supported routes in this phase,
- must not give a full reading,
- must not mention unsupported tools as if they are available.

### Node 4: JSON Formatter

Transform the classifier result into `askcrystal_skill_result_v1`.

### Node 5: End

Return JSON only.

## Suggested System Prompt For The Classification Node

```text
You are the AskCrystal route planner for a limited six-method workflow phase.

Your only job is to decide the best next supported method for the user's request.

Supported methods:
- bazi
- tarot
- fengshui
- yinyuan
- numerology
- none

Return a structured routing result, not a reading.

Rules:
- Choose one primary method only.
- If the query is mixed, choose the dominant method first.
- If the query is shopping-only, return primary_method=none.
- If the query is out of scope, return primary_method=none and suggest the closest supported direction in recommendations.
- Keep tone supportive and practical.
- Do not use deterministic language.
- Do not mention hidden reasoning or internal analysis.
```

## Good Output Example

```json
{
  "status": "ok",
  "skill": "taibu_structured_divination_router",
  "summary": "This request is best handled through Bazi first because it asks for long-cycle personal pattern and timing guidance.",
  "findings": [
    "The question is primarily about life pattern and timing, which fits Bazi better than tarot.",
    "Tarot can remain a later secondary method if the user wants short-horizon confirmation."
  ],
  "follow_up_questions": [],
  "recommendations": [
    "Ask for birth date, birth time, and gender before starting the reading."
  ],
  "safety_note": "For routing and reflection support only, not a final reading.",
  "metadata": {
    "confidence": "high",
    "missing_inputs": ["birth_datetime", "gender"],
    "source_family": "taibu",
    "mode": "router",
    "intent_type": "mixed_reading",
    "primary_method": "bazi",
    "next_tool": "workflow_bazi_chart_analysis"
  }
}
```

## Bad Output Patterns

Do not:

- give the user a full reading,
- list multiple equal primary methods,
- route to unsupported systems,
- emit storefront UI manifests,
- mix shopping recommendations into the router output.

## Definition Of Done

This workflow is ready when:

1. mixed reading prompts reliably choose one dominant method,
2. shopping-only prompts route to `none`,
3. missing-input lists are short and accurate,
4. output always validates against `askcrystal_skill_result_v1`,
5. the main agent can read `metadata.next_tool` and know what to do next.
