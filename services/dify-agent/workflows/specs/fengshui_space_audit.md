# Fengshui Space Audit

## Purpose

This workflow should handle the most reliable fengshui audit path for the current AskCrystal phase:

1. validate the user's space question,
2. infer whether the request is about home flow, workspace support, or a room-specific issue,
3. extract lightweight deterministic signals from direction, move-in timing, and layout clues when possible,
4. translate those signals into grounded, practical fengshui guidance,
5. return stable JSON the main AskCrystal agent can wrap cleanly.

It should not pretend to run a full professional flying-star survey, Luo Pan degree reading, or construction-grade site selection analysis.

## Sources

- Primary source:
  - `external_skills/fengshui.skill/SKILL.md`
- Supporting references:
  - `external_skills/fengshui.skill/references/feixing.md`
  - `external_skills/fengshui.skill/references/wuxing-ganzhi.md`
- Supporting examples:
  - `external_skills/fengshui.skill/examples/yangzhai.md`

## Scope In This Phase

The Fengshui workflow covers:

- home or workspace layout audits,
- room-flow and clutter diagnostics,
- common interior fengshui risk patterns,
- direction-aware suggestions when facing data is available,
- light period framing using move-in year when provided.

It does not cover:

- full Luo Pan degree measurement,
- complete Xuan Kong flying-star chart calculation,
- landform or burial-site analysis,
- date selection workflows,
- storefront UI rendering,
- deterministic luck guarantees,
- safety, legal, or structural engineering advice.

## Workflow Inputs

### Required

- `space_description`

### Optional

- `facing_direction`
- `priority_goal`
- `move_in_year`

## Input Expectations

- `space_description` should describe the room, home, or workspace layout in plain language.
- `facing_direction` may be a compass direction such as north, south, southeast, or west.
- `priority_goal` may describe what the user wants to improve, such as sleep, focus, wealth flow, calm, or relationships.
- `move_in_year` helps the workflow frame whether the space belongs to Period 8 or Period 9, but it is optional.
- If the user does not provide enough layout detail to identify any real issue, return `needs_input`.

## Workflow Output Contract

Return `askcrystal_skill_result_v1`.

Expected success metadata:

```json
{
  "metadata": {
    "confidence": "medium",
    "missing_inputs": [],
    "source_family": "fengshui.skill",
    "mode": "space-audit",
    "intent_type": "audit",
    "primary_method": "fengshui",
    "space_type": "home",
    "goal_detected": "sleep",
    "facing_direction": "south",
    "move_in_period": "period-9",
    "issue_tags": "entrance-blocked, mirror-facing-bed"
  }
}
```

Expected intake metadata:

```json
{
  "metadata": {
    "confidence": "low",
    "missing_inputs": ["space_description"],
    "source_family": "fengshui.skill",
    "mode": "intake",
    "intent_type": "audit",
    "primary_method": "fengshui"
  }
}
```

## Reading Sequence

The workflow must follow this order.

### 1. Intake Check

- confirm the user actually described the space,
- infer whether this is a home, room, or workspace audit,
- detect the practical goal,
- decide whether the current detail level is enough to say something useful.

### 2. Signal Extraction

When possible, extract deterministic structure from the inputs:

- canonical facing direction,
- move-in period,
- common interior issue tags,
- likely audit scope such as entrance, bed, desk, kitchen, bathroom, or center of the space.

### 3. Interpretation Layer

The interpretation should:

- stay practical rather than mystical,
- separate observed issues from inferred tendencies,
- give 2-5 clear layout or environmental actions,
- explain limits when direction or timing data is missing,
- avoid fear-based language.

### 4. Output Layer

Return concise structured JSON only.

## Dify Workflow Shape

### Node 1: Start

Inputs:

- `space_description`
- `facing_direction`
- `priority_goal`
- `move_in_year`

### Node 2: Prepare Fengshui Audit

Purpose:

- validate input,
- normalize direction and timing,
- identify common layout patterns,
- build a compact fact brief for the LLM.

### Node 3: Fengshui Analysis LLM

Purpose:

- turn the structured facts into a calm audit,
- stay concise,
- avoid hidden reasoning and deterministic claims,
- return JSON only.

### Node 4: Finalize Contract

Purpose:

- parse the LLM JSON,
- inject workflow metadata when missing,
- return a stable `askcrystal_skill_result_v1` payload.

### Node 5: End

Return JSON only.

## Definition Of Done

This workflow is ready when:

1. missing-space prompts reliably return `needs_input`,
2. valid layout prompts produce a structured room or home audit,
3. direction-aware prompts add useful nuance without pretending to be a full survey,
4. the output validates against `askcrystal_skill_result_v1`,
5. the main AskCrystal agent can call it without extra prompt patchwork.
