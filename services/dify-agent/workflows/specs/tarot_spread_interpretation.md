# Tarot Spread Interpretation

## Purpose

This workflow should handle the most reliable tarot path for the current AskCrystal phase:

1. validate the user's reading request,
2. choose or normalize an appropriate spread,
3. generate or normalize a card draw,
4. interpret the spread in grounded, non-fatalistic language,
5. return stable JSON the main AskCrystal agent can wrap cleanly.

It should not behave like a theatrical freeform fortune-telling blob.

## Sources

- Primary source:
  - `external_skills/tarot-skill/SKILL.md`
- Supporting references:
  - `external_skills/tarot-skill/references/spreads.md`
  - `external_skills/tarot-skill/references/cards.md`
  - `external_skills/tarot-skill/references/card-relations.md`
  - `external_skills/tarot-skill/references/combinations.md`
- Supporting implementation logic:
  - `external_skills/tarot-skill/scripts/draw.py`

## Scope In This Phase

The Tarot workflow covers:

- question validation,
- spread selection,
- card draw generation or provided-card normalization,
- concise interpretation,
- practical next-step guidance.

It does not cover:

- storefront UI rendering,
- product grounding,
- cart operations,
- deterministic fate claims,
- medical or legal guidance.

## Workflow Inputs

### Required

- `question`

### Optional

- `spread_type`
- `cards_drawn`
- `context_anchor`

## Input Expectations

- `question` should contain the topic or dilemma the user wants reflected back.
- `spread_type` may be omitted; the workflow should choose a sensible default.
- `cards_drawn` may be omitted; the workflow should generate a draw when not provided.
- `context_anchor` is optional but should be used when available to make the reading more specific.

If `question` is missing or empty, return `needs_input`.

## Workflow Output Contract

Return `askcrystal_skill_result_v1`.

Expected success metadata:

```json
{
  "metadata": {
    "confidence": "medium",
    "missing_inputs": [],
    "source_family": "tarot-skill",
    "mode": "reading",
    "intent_type": "reading",
    "primary_method": "tarot",
    "spread_type": "three",
    "spread_name": "三牌阵",
    "draw_mode": "generated"
  }
}
```

Expected intake metadata:

```json
{
  "metadata": {
    "confidence": "low",
    "missing_inputs": ["question"],
    "source_family": "tarot-skill",
    "mode": "intake",
    "intent_type": "reading",
    "primary_method": "tarot"
  }
}
```

## Reading Sequence

The workflow must follow this order.

### 1. Intake Check

- confirm the question is actually present,
- normalize the requested spread,
- check whether provided cards can be used,
- decide whether to generate a fresh draw.

### 2. Spread Selection

When the user does not specify a spread clearly:

- `single` for daily guidance or very narrow reflection,
- `three` as the default general-purpose reading,
- `diamond` for dilemma or root-cause style questions,
- `moon` for monthly cycle/planning framing,
- `horseshoe` for timeline arc questions,
- `celtic` only for clearly complex multi-layer situations.

### 3. Card Draw Layer

When `cards_drawn` is absent:

- perform a real randomized draw using logic aligned with `draw.py`,
- preserve `seed`, `time_factor`, and per-card orientation.

When `cards_drawn` is present:

- normalize it if possible,
- otherwise treat it as raw provided-card context and reduce confidence slightly.

### 4. Interpretation Layer

The interpretation should:

- stay reflective rather than predictive,
- identify the core energy of the spread,
- surface one main tension or pattern,
- give 2-4 grounded next steps,
- use the context anchor when available.

### 5. Output Layer

Return concise structured JSON only.

## Dify Workflow Shape

### Node 1: Start

Inputs:

- `question`
- `spread_type`
- `cards_drawn`
- `context_anchor`

### Node 2: Prepare Tarot Draw

Purpose:

- validate input,
- normalize spread choice,
- generate a draw if needed,
- format compact card context for the LLM.

### Node 3: Needs-Input Gate

Branch:

- if `status == needs_input` -> return intake payload,
- else continue.

### Node 4: Tarot Analysis LLM

Purpose:

- interpret the draw,
- stay concise,
- avoid hidden reasoning and deterministic claims,
- return JSON only.

### Node 5: Finalize Contract

Purpose:

- parse the LLM JSON,
- inject workflow metadata when missing,
- return a stable `askcrystal_skill_result_v1` payload.

### Node 6: End

Return JSON only.

## Definition Of Done

This workflow is ready when:

1. missing-question prompts reliably return `needs_input`,
2. valid prompts produce a spread-aware tarot payload,
3. the output validates against `askcrystal_skill_result_v1`,
4. the main AskCrystal agent can use it without significant rewriting.
