# Yinyuan Matchmaking

## Purpose

This workflow should handle the most reliable relationship-guidance path for the current AskCrystal phase:

1. validate the user's relationship question,
2. infer whether the request is about compatibility, timing, or general romantic guidance,
3. extract lightweight deterministic signals when possible,
4. turn those signals into a warm, non-fatalistic read,
5. return stable JSON the main AskCrystal agent can wrap cleanly.

It should not pretend to run a full Bazi marriage engine, Ziwei spouse-palace chart, or deterministic soulmate prediction.

## Sources

- Primary source:
  - `external_skills/yinyuan-skills/SKILL.md`
- Supporting references:
  - `external_skills/yinyuan-skills/references/zodiac-compatibility.md`
  - `external_skills/yinyuan-skills/references/taohua-luck.md`
  - `external_skills/yinyuan-skills/references/bazi-matching.md`

## Scope In This Phase

The Yinyuan workflow covers:

- compatibility questions,
- "when will I meet the right person" timing reads,
- general relationship-pattern guidance,
- lightweight zodiac-based structure when birth years or zodiac signs are available.

It does not cover:

- full Bazi marriage charting,
- full Ziwei spouse-palace calculation,
- storefront UI rendering,
- deterministic fate claims,
- medical, legal, or mental-health advice.

## Workflow Inputs

### Required

- `question`

### Optional

- `person_a`
- `person_b`

## Input Expectations

- `question` should contain the actual romantic or relationship question.
- `person_a` may contain a birth date, birth year, zodiac sign, or short profile for the user.
- `person_b` may contain the comparison person's birth date, birth year, zodiac sign, or short profile.
- If the question is clearly about compatibility but `person_b` is missing, return `needs_input`.

## Workflow Output Contract

Return `askcrystal_skill_result_v1`.

Expected success metadata:

```json
{
  "metadata": {
    "confidence": "medium",
    "missing_inputs": [],
    "source_family": "yinyuan-skills",
    "mode": "compatibility",
    "intent_type": "reading",
    "primary_method": "yinyuan",
    "person_a_zodiac": "Rat",
    "person_b_zodiac": "Dragon",
    "signal_type": "zodiac-compatibility"
  }
}
```

Expected intake metadata:

```json
{
  "metadata": {
    "confidence": "low",
    "missing_inputs": ["person_b"],
    "source_family": "yinyuan-skills",
    "mode": "intake",
    "intent_type": "reading",
    "primary_method": "yinyuan"
  }
}
```

## Reading Sequence

The workflow must follow this order.

### 1. Intake Check

- confirm the relationship question is actually present,
- infer the read mode,
- identify whether comparison data is required,
- collect only the missing data that genuinely matters.

### 2. Signal Extraction

When possible, extract deterministic structure from the inputs:

- zodiac sign from birth year,
- pair relation type such as harmony, clash, or general fit,
- peach-blossom direction and timing windows for single-person timing reads.

### 3. Interpretation Layer

The interpretation should:

- stay supportive rather than fatalistic,
- explain what is known versus assumed,
- name one or two likely strengths,
- name one or two likely friction points,
- give practical next-step guidance.

### 4. Output Layer

Return concise structured JSON only.

## Dify Workflow Shape

### Node 1: Start

Inputs:

- `question`
- `person_a`
- `person_b`

### Node 2: Prepare Yinyuan Signals

Purpose:

- validate input,
- infer mode,
- extract zodiac or timing signals when available,
- build a compact fact brief for the LLM.

### Node 3: Needs-Input Gate

Branch:

- if `status == needs_input` -> return intake payload,
- else continue.

### Node 4: Yinyuan Analysis LLM

Purpose:

- translate the structured facts into a relationship read,
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

1. missing comparison data reliably returns `needs_input`,
2. compatibility prompts produce a structured supportive output,
3. timing prompts can return a useful trend-based reading without pretending to know a fixed date,
4. the output validates against `askcrystal_skill_result_v1`,
5. the main AskCrystal agent can call it without extra prompt patchwork.
