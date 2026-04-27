# Horoscope Daily Guidance

## Purpose

This workflow ports `external_skills/horoscope-daily-2.3.0` into a Dify-native workflow tool.

The workflow should provide lightweight Western zodiac guidance for AskCrystal users who ask for:

- daily horoscope guidance,
- weekly or monthly horoscope guidance,
- sign-based reflection for love, work, finance, health, or general energy,
- a sun-sign reading inferred from birthday.

It should stay reflective and practical. It should not perform precise astronomical chart calculation, natal chart interpretation, Vedic astrology, Bazi, tarot, Ziwei, Qimen, or fengshui.

## Sources

- Primary source:
  - `external_skills/horoscope-daily-2.3.0/SKILL.md`
- Supporting references:
  - `external_skills/horoscope-daily-2.3.0/references/zodiac-index.md`
  - `external_skills/horoscope-daily-2.3.0/references/signs/*.md`

## Scope In This Phase

The horoscope workflow covers:

- sign detection from explicit zodiac sign or birthday,
- daily, weekly, and monthly period framing,
- optional focus area detection,
- compact sign trait grounding,
- balanced dimension guidance,
- lucky guide and practical next step.

It does not cover:

- precise transits or birth charts,
- house placements, ascendant, moon sign, or aspect calculation,
- deterministic prediction,
- storefront UI rendering,
- medical, legal, or financial advice.

## Workflow Inputs

### Required

- `question`

### Optional

- `zodiac_sign`
- `birth_date`
- `target_date`
- `period`
- `focus_area`

## Input Expectations

- `zodiac_sign` may be a standard Western zodiac sign.
- `birth_date` may be used when the sign is not stated directly.
- `target_date` defaults to today when omitted.
- `period` defaults to `daily`; accepted values are `daily`, `weekly`, and `monthly`.
- `focus_area` may be `love`, `career`, `finance`, `health`, or `general`.
- If neither sign nor birth date can be inferred, return `needs_input`.

## Workflow Output Contract

Return `askcrystal_skill_result_v1`.

Expected success metadata:

```json
{
  "metadata": {
    "confidence": "medium",
    "missing_inputs": [],
    "source_family": "horoscope-daily-2.3.0",
    "mode": "daily",
    "intent_type": "reading",
    "primary_method": "horoscope",
    "zodiac_sign": "Scorpio",
    "period": "daily",
    "focus_area": "career",
    "target_date": "2026-04-26"
  }
}
```

Expected intake metadata:

```json
{
  "metadata": {
    "confidence": "low",
    "missing_inputs": ["zodiac_sign"],
    "source_family": "horoscope-daily-2.3.0",
    "mode": "intake",
    "intent_type": "reading",
    "primary_method": "horoscope"
  }
}
```

## Reading Sequence

### 1. Intake Check

- parse explicit sign, birthday, period, target date, and focus area,
- infer the sign from birthday when possible,
- ask for sign or birthday when missing.

### 2. Sign Grounding

Use the zodiac reference material to anchor the reading in:

- element,
- modality,
- ruling planet,
- core traits,
- love/career/finance/health tendencies,
- lucky guide fields.

### 3. Interpretation Layer

The interpretation should:

- keep the AskCrystal tone calm and modern,
- sound like symbolic reflection rather than certainty,
- include concrete action guidance,
- use the same language as the user's request,
- avoid fear-based language and fatalism.

### 4. Output Layer

Return concise structured JSON only.

## Dify Workflow Shape

### Node 1: Start

Inputs:

- `question`
- `zodiac_sign`
- `birth_date`
- `target_date`
- `period`
- `focus_area`

### Node 2: Prepare Horoscope Context

Purpose:

- normalize inputs,
- infer sign and period,
- assemble a compact sign brief.

### Node 3: Horoscope Guidance LLM

Purpose:

- produce a warm, structured horoscope result,
- preserve `needs_input` when intake is incomplete,
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

1. missing sign/birthday requests return `needs_input`,
2. explicit sign prompts produce structured horoscope guidance,
3. birthday-only prompts infer a sign,
4. period and focus fields affect the result without creating deterministic claims,
5. the main AskCrystal agent can call it as `workflow_horoscope_daily_guidance`.
