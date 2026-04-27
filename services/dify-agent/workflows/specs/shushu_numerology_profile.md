# Shushu Numerology Profile

## Purpose

This workflow should handle the most reliable numerology-style profile path for the current AskCrystal phase:

1. validate the user's birth-date profile request,
2. extract lightweight deterministic number patterns from the birth date,
3. use optional name and focus as context rather than fake hard calculation,
4. translate the pattern set into grounded, reflective guidance,
5. return stable JSON the main AskCrystal agent can wrap cleanly.

It should not pretend to be a full Bazi chart, Ziwei chart, or deterministic fate engine.

## Sources

- Primary source family:
  - `external_skills/Numerologist_skills/README.md`
- Supporting spirit from the family:
  - `external_skills/Numerologist_skills/bazi/SKILL.md`
  - `external_skills/Numerologist_skills/ziwei-doushu/SKILL.md`
- Scope note:
  - the source family contains engineered Chinese metaphysics modules rather than a dedicated western numerology package, so this workflow intentionally stays narrow and transparent as a birthday-pattern profile.

## Scope In This Phase

The Shushu workflow covers:

- birthday-based profile requests,
- light number-pattern reflection,
- short growth guidance,
- optional contextualization using a provided name or focus area,
- personal-year style present-cycle framing.

It does not cover:

- full Bazi analysis,
- full Ziwei charting,
- name-stroke or language-specific naming systems,
- deterministic prediction,
- storefront UI rendering,
- medical, legal, or financial advice.

## Workflow Inputs

### Required

- `birth_date`

### Optional

- `name`
- `analysis_focus`

## Input Expectations

- `birth_date` should be parseable as a calendar date, ideally `YYYY-MM-DD`.
- `name` is optional and should be treated as contextual personalization rather than strict deterministic calculation.
- `analysis_focus` may specify a theme such as career, love, confidence, reset, or emotional pattern.
- If the birth date is missing or invalid, return `needs_input`.

## Workflow Output Contract

Return `askcrystal_skill_result_v1`.

Expected success metadata:

```json
{
  "metadata": {
    "confidence": "medium",
    "missing_inputs": [],
    "source_family": "Numerologist_skills",
    "mode": "profile",
    "intent_type": "reading",
    "primary_method": "numerology",
    "birth_date": "1991-08-14",
    "life_path_number": "6",
    "birthday_number": "5",
    "attitude_number": "4",
    "personal_year_number": "5",
    "zodiac_sign": "Goat"
  }
}
```

Expected intake metadata:

```json
{
  "metadata": {
    "confidence": "low",
    "missing_inputs": ["birth_date"],
    "source_family": "Numerologist_skills",
    "mode": "intake",
    "intent_type": "reading",
    "primary_method": "numerology"
  }
}
```

## Reading Sequence

The workflow must follow this order.

### 1. Intake Check

- confirm the user actually provided a birth date,
- normalize the date format,
- identify whether a focus theme was supplied,
- decide whether there is enough information to generate a profile.

### 2. Pattern Extraction

When possible, extract deterministic structure from the inputs:

- life-path style reduction from the full birth date,
- birthday number from the day of month,
- attitude number from month plus day,
- current personal-year style number,
- zodiac sign from birth year,
- seasonal tone from birth month.

### 3. Interpretation Layer

The interpretation should:

- stay reflective rather than predictive,
- explain the pattern set in plain language,
- keep optional name context lightweight,
- give 2-4 practical next steps,
- avoid overclaiming precision.

### 4. Output Layer

Return concise structured JSON only.

## Dify Workflow Shape

### Node 1: Start

Inputs:

- `birth_date`
- `name`
- `analysis_focus`

### Node 2: Prepare Numerology Profile

Purpose:

- validate input,
- normalize the birth date,
- compute deterministic number patterns,
- build a compact fact brief for the LLM.

### Node 3: Numerology Analysis LLM

Purpose:

- turn the structured facts into a warm profile,
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

1. missing or invalid birth dates reliably return `needs_input`,
2. valid birthday prompts produce a structured reflective profile,
3. optional focus and name improve tone without pretending to add hard certainty,
4. the output validates against `askcrystal_skill_result_v1`,
5. the main AskCrystal agent can call it without extra prompt patchwork.
