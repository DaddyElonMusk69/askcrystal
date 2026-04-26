# Bazi Chart Analysis

## Purpose

This workflow is the first deep-reading path that the Taibu router should hand off into.

In this phase, the Bazi workflow should do one job well:

1. collect or validate the minimum charting inputs,
2. structure the reading in a fixed order,
3. avoid deterministic or fear-based language,
4. return a stable JSON result the main agent can wrap cleanly.

It should not behave like a loose "fortune telling" prompt blob.

## Sources

- Primary source:
  - `external_skills/bazi-skill/SKILL.md`
- Secondary source:
  - `external_skills/Numerologist_skills/bazi/SKILL.md`
- Supporting references:
  - `external_skills/taibu/skills/divination/references/bazi-workflow.md`
  - `external_skills/taibu/skills/divination/references/dayun-workflow.md`
  - `external_skills/taibu/skills/divination/references/mcp-tool-matrix.md`

## Scope In This Phase

The Bazi workflow covers:

- intake validation,
- Bazi-oriented structure and tone,
- day-master and chart-pattern interpretation,
- DaYun / timing framing,
- practical guidance.

It does not cover:

- storefront UI rendering,
- product grounding,
- cart operations,
- ziwei cross-validation,
- qimen expansion,
- unsupported metaphysics systems.

## Workflow Inputs

### Required

- `birth_datetime`
- `gender`

### Optional

- `birth_place`
- `calendar_note`
- `user_goal`

## Input Expectations

`birth_datetime` can arrive in several forms:

- exact timestamp,
- natural language date + time,
- approximate time window.

The workflow should normalize to structured charting fields before any interpretation:

- `birthYear`
- `birthMonth`
- `birthDay`
- `birthHour`
- `birthMinute` if known
- `calendarType`
- `isLeapMonth`

If the input is too vague to normalize responsibly, return `needs_input`.

## Workflow Output Contract

Return `askcrystal_skill_result_v1`.

Expected metadata shape for a successful Bazi result:

```json
{
  "metadata": {
    "confidence": "medium",
    "missing_inputs": [],
    "source_family": "bazi-skill",
    "mode": "reading",
    "intent_type": "reading",
    "primary_method": "bazi"
  }
}
```

Expected metadata shape for incomplete intake:

```json
{
  "metadata": {
    "confidence": "low",
    "missing_inputs": ["birth_datetime", "gender"],
    "source_family": "bazi-skill",
    "mode": "intake",
    "intent_type": "reading",
    "primary_method": "bazi"
  }
}
```

## Reading Sequence

The workflow must follow this order.

### 1. Intake Check

Confirm:

- enough date information exists,
- enough time information exists,
- gender is present,
- lunar/solar ambiguity is surfaced,
- leap-month ambiguity is surfaced when relevant.

If critical input is missing:

- stop,
- return `needs_input`,
- ask only the minimum necessary follow-up questions.

### 2. Charting Basis

Before interpretation, establish the charting basis in plain language:

- whether the workflow is treating the date as solar or lunar,
- whether the birth time is exact or approximate,
- whether any assumptions were used.

This keeps the reading auditable and lowers hallucination risk.

### 3. Day Master and Strength

Core question:

- what is the day master,
- what seasonal/background context shapes it,
- does the chart appear stronger, weaker, balanced, or structurally special.

Output should stay concise and evidence-oriented.

### 4. Useful / Challenging Elements

Explain:

- what appears supportive,
- what appears excessive or depleting,
- what that means behaviorally rather than fatalistically.

### 5. Life Themes

Translate the chart into a few grounded themes such as:

- work / direction,
- relationships,
- energy management,
- decision style,
- pressure points.

Do not try to explain every possible domain in one pass.

### 6. DaYun / Timing Layer

If timing can be inferred responsibly, explain:

- current ten-year theme,
- near-term shift or tension,
- one meaningful timing note for the next 1-3 years.

If timing cannot be inferred confidently, say so clearly instead of filling gaps.

### 7. Practical Advice

Close with:

- 2-4 practical next steps,
- one framing boundary,
- no deterministic certainty claims.

## Dify Workflow Shape

### Node 1: Start

Inputs:

- `birth_datetime`
- `gender`
- `birth_place`
- `calendar_note`
- `user_goal`

### Node 2: Intake Parser

Purpose:

- normalize raw birth input,
- identify missing fields,
- identify lunar/solar ambiguity,
- flag whether the workflow can continue.

Output:

- normalized intake object

### Node 3: Needs-Input Gate

Branch:

- if critical fields are missing -> return `needs_input`
- else continue

### Node 4: Reading Analysis LLM

Purpose:

- perform the Bazi reading in the fixed order,
- stay concise,
- avoid hidden reasoning and overclaiming.

Hard constraints:

- do not give medical, legal, or financial directives,
- do not use deterministic fate language,
- do not pretend missing chart facts are known.

### Node 5: JSON Formatter

Transform the reading into `askcrystal_skill_result_v1`.

### Node 6: End

Return JSON only.

## Suggested System Prompt For The Analysis Node

```text
You are the AskCrystal Bazi analysis workflow for a structured six-skill phase.

Your job is to produce a concise, grounded Bazi reading using a fixed order:
1. charting basis and assumptions,
2. day master and strength,
3. useful and challenging elements,
4. life themes,
5. DaYun / timing frame,
6. practical next steps.

Rules:
- Be precise but not theatrical.
- Do not use fear-based or deterministic language.
- If input quality is weak, reduce confidence and say so clearly.
- Use modern plain language when possible.
- Return analysis that can be wrapped by the main AskCrystal agent without extra cleanup.
```

## Good Output Example

```json
{
  "status": "ok",
  "skill": "bazi_chart_analysis",
  "summary": "This chart points to a thoughtful but pressure-sensitive pattern, with the current cycle emphasizing disciplined growth rather than speed.",
  "findings": [
    "The day master appears to do better with steadiness and structure than with chaotic environments.",
    "The chart suggests growth comes from balancing intensity with recovery rather than forcing momentum at all times.",
    "The current timing layer favors deliberate planning and skill-building over abrupt leaps."
  ],
  "follow_up_questions": [],
  "recommendations": [
    "Focus on one medium-term goal instead of splitting energy across too many fronts.",
    "Track where external pressure makes you override your natural pacing.",
    "Revisit major career decisions only after a clearer information window if possible."
  ],
  "safety_note": "For self-reflection and planning support only, not deterministic fate analysis.",
  "metadata": {
    "confidence": "medium",
    "missing_inputs": [],
    "source_family": "bazi-skill",
    "mode": "reading",
    "intent_type": "reading",
    "primary_method": "bazi"
  }
}
```

## Bad Output Patterns

Do not:

- jump straight into prophecy language,
- mix in storefront product recommendations,
- ask for unnecessary follow-up inputs when the chart can already be read,
- dump raw metaphysics jargon without translation,
- output a giant essay that the main agent has to compress afterward.

## Definition Of Done

This workflow is ready when:

1. incomplete-input prompts reliably return `needs_input`,
2. complete prompts return a stable structured reading,
3. the reading follows the fixed order every time,
4. the output validates against `askcrystal_skill_result_v1`,
5. the main AskCrystal agent can use it without significant rewriting.
