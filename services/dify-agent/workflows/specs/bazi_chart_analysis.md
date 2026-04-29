# Bazi Chart Analysis

## Purpose

This workflow is the deep-reading Bazi lane that the Taibu router should hand off into when the user clearly wants Four Pillars analysis.

In the current phase, it should do four things reliably:

1. validate the minimum charting intake,
2. compute a deterministic chart brief from solar birth input,
3. return stable JSON in `askcrystal_skill_result_v1` for the main AskCrystal agent to interpret.

It should not behave like a loose fortune-telling prompt blob.

## Sources

### Current implementation base

- `external_skills/bazi-mingli-main/SKILL.md`
- `external_skills/bazi-mingli-main/scripts/bazi_calc.py`

### Supporting references

- `external_skills/yuan-main/references/bazi/README.md`
- `external_skills/yuan-main/references/bazi/examples/sample_output.json`
- `external_skills/taibu/skills/divination/references/bazi-workflow.md`
- `external_skills/taibu/skills/divination/references/dayun-workflow.md`

### Why this source won for now

- `bazi-skill-main` is effectively a duplicate prompt-pack of the older `bazi-skill` lane.
- `yuan-main/references/bazi` is the richer engine reference, but it currently depends on `swisseph` and is heavier to operationalize.
- `bazi-mingli-main` gives us a self-contained deterministic calculator we can adapt directly into a Dify code node.

### Important licensing note

`bazi-mingli-main` is a practical implementation base for this migration phase, but its upstream license is not the same as the MIT-style prompt-pack lanes. Treat it as a transitional source and keep the long-term replacement path open.

## Scope In This Phase

The Bazi workflow covers:

- intake validation,
- solar/Gregorian birth parsing,
- approximate time-window handling,
- deterministic Four Pillars brief generation,
- day-master, strength, useful/challenging element framing,
- simplified DaYun preview,
- concise practical guidance.

It does not cover:

- storefront UI rendering,
- product grounding,
- cart operations,
- lunar-date normalization,
- ziwei or qimen expansion,
- final production-grade chart-engine fidelity.

## Workflow Inputs

### Required

- `birth_datetime`
- `gender`

### Optional

- `birth_place`
- `calendar_note`
- `user_goal`

## Input Expectations

The current workflow expects solar/Gregorian birth input.

Accepted intake patterns:

- explicit timestamp such as `1994-11-03 08:40`,
- Chinese date + time such as `1994年11月3日 上午8:40`,
- Chinese shichen such as `辰時`,
- broad time windows such as `early morning`, `上午`, or `下午`.

Current limitation:

- if the user provides a lunar date, the workflow should return `needs_input` and ask for the solar/Gregorian equivalent rather than pretending it can normalize that path already.

If the hour pillar cannot be established responsibly, return `needs_input`.

## Workflow Output Contract

Return `askcrystal_skill_result_v1`.

Expected metadata shape for a successful Bazi result:

```json
{
  "metadata": {
    "confidence": "medium",
    "missing_inputs": [],
    "source_family": "bazi-mingli-main",
    "mode": "reading",
    "intent_type": "reading",
    "primary_method": "bazi",
    "birth_datetime": "1994-11-03T08:40",
    "calendar_mode": "solar",
    "day_master": "癸（水）",
    "strength": "中和",
    "useful_elements": "金、水",
    "challenging_elements": "木、火、土",
    "year_pillar": "甲戌",
    "month_pillar": "甲戌",
    "day_pillar": "癸亥",
    "hour_pillar": "丙辰",
    "time_basis": "exact",
    "parse_confidence": "high"
  }
}
```

Expected metadata shape for incomplete intake:

```json
{
  "metadata": {
    "confidence": "low",
    "missing_inputs": ["birth_datetime", "gender"],
    "source_family": "bazi-mingli-main",
    "mode": "intake",
    "intent_type": "reading",
    "primary_method": "bazi"
  }
}
```

## Master-Agent Reading Sequence

The workflow should not write the final user-facing reading. It should return chart facts and seed guidance; the main AskCrystal agent should interpret in this order:

1. charting basis and assumptions,
2. day master and strength,
3. useful and challenging elements,
4. grounded life themes,
5. simplified DaYun/timing frame,
6. practical next steps.

## Dify Workflow Shape

### Node 1: Start

Inputs:

- `birth_datetime`
- `gender`
- `birth_place`
- `calendar_note`
- `user_goal`

### Node 2: Prepare Bazi Chart

Purpose:

- normalize intake,
- reject lunar-only input for now,
- parse exact or approximate birth time,
- calculate a deterministic chart brief,
- output compact chart facts plus stable seed findings.

Implementation note:

- this code node is adapted from `external_skills/bazi-mingli-main/scripts/bazi_calc.py`, not from the older prompt-pack-only Bazi sources.

### Node 3: Finalize Bazi Contract

Purpose:

- normalize the result into `askcrystal_skill_result_v1`,
- preserve chart facts, chart-basis notes, and seed findings for the main AskCrystal agent.

### Node 4: End

Return JSON only.

## Good Output Example

```json
{
  "status": "ok",
  "skill": "bazi_chart_analysis",
  "summary": "The Bazi chart is ready for interpretation.",
  "findings": [
    "Four Pillars resolve to 甲戌 / 甲戌 / 癸亥 / 丙辰.",
    "Day master is 癸（水）, and the current strength read is 中和.",
    "Supportive elements currently lean toward 金、水, while the more challenging load leans toward 木、火、土."
  ],
  "follow_up_questions": [],
  "recommendations": [
    "Use the reading for pattern recognition and planning, not as a rigid prediction about fate.",
    "Let the main AskCrystal agent interpret these facts in the user's conversational context."
  ],
  "safety_note": "For self-reflection and wellness support only, not deterministic fate analysis.",
  "metadata": {
    "confidence": "medium",
    "missing_inputs": [],
    "source_family": "bazi-mingli-main",
    "mode": "reading",
    "intent_type": "reading",
    "primary_method": "bazi",
    "day_master": "癸（水）",
    "strength": "中和",
    "year_pillar": "甲戌",
    "month_pillar": "甲戌",
    "day_pillar": "癸亥",
    "hour_pillar": "丙辰",
    "fact_brief": "- Birth timestamp: 1994-11-03T08:40\n- Four Pillars: 甲戌 / 甲戌 / 癸亥 / 丙辰"
  }
}
```

## Bad Output Patterns

Do not:

- jump into prophecy language,
- accept lunar-only input as if it were already normalized,
- mix in storefront product recommendations,
- dump un-translated metaphysics jargon,
- output a giant essay the main agent has to compress,
- invent precision that the deterministic chart brief did not support.

## Definition Of Done

This workflow is ready for the repo phase when:

1. complete solar input produces a deterministic chart brief,
2. incomplete or vague input reliably returns `needs_input`,
3. approximate time windows reduce certainty instead of being hidden,
4. output validates against `askcrystal_skill_result_v1`,
5. the provisioner can import the workflow into Dify as `workflow_bazi_chart_analysis`.
