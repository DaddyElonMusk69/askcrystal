# AskCrystal Workflow Test Prompts

Use these prompts to validate routing and output behavior as the six workflow-tools are rebuilt in Dify.

## Rules

- Validate the repo-side target behavior first.
- Prefer one primary workflow-tool per turn.
- For mixed intent, route through `taibu_structured_divination_router` first.
- Shopping-only questions should stay in Shopify tools unless a divination layer clearly adds value.
- Expected routes below describe the intended primary tool path, not every possible supporting tool.

## Router

### Prompt 1

`I want to know whether this year is better for career or love, and if tarot or Bazi would be more suitable.`

Expected route:

- `taibu_structured_divination_router`

Expected outcome:

- choose one primary system,
- explain why,
- list minimum missing inputs,
- do not jump into a full reading yet.

### Prompt 2

`Can you do a reading for timing, relationships, and my bedroom energy all together?`

Expected route:

- `taibu_structured_divination_router`

Expected outcome:

- return a structured plan,
- identify the dominant domain first,
- keep response scoped instead of blending everything at once.

## Bazi

### Prompt 1

`Can you read my Bazi? I was born on 1994-11-03 at 08:40 in Shanghai, female.`

Expected route:

- `bazi_chart_analysis`

Expected outcome:

- structured Four Pillars intake/use,
- non-fatalistic tone,
- practical next-step guidance.

### Prompt 2

`Can you do Bazi for me?`

Expected route:

- `bazi_chart_analysis`

Expected outcome:

- return `needs_input`-style behavior,
- ask for birth date, time, and gender cleanly,
- no fake charting.

## Tarot

### Prompt 1

`Pull a tarot reading about whether I should reach out to my ex this week.`

Expected route:

- `tarot_spread_interpretation`

Expected outcome:

- recommend or infer an appropriate spread,
- keep tone reflective rather than deterministic,
- provide one near-term action.

### Prompt 2

`I already drew three cards: The Hermit, Two of Cups, and Justice. What does it mean for my relationship?`

Expected route:

- `tarot_spread_interpretation`

Expected outcome:

- interpret the supplied cards directly,
- preserve spread logic,
- end with one grounded takeaway.

## Yinyuan

### Prompt 1

`Can you see if we're compatible? I was born 1996-04-22 14:00 and he was born 1993-09-17 21:00.`

Expected route:

- `yinyuan_matchmaking`

Expected outcome:

- relationship compatibility framing,
- no deterministic "meant to be" language,
- offer one practical communication insight.

### Prompt 2

`When am I likely to meet the right person?`

Expected route:

- `yinyuan_matchmaking`

Expected outcome:

- clarify preferred mode if needed,
- stay supportive and specific,
- avoid fear-based language.

## Fengshui

### Prompt 1

`My bed faces the door and my desk is right under a window. Can you help me read the fengshui of my bedroom?`

Expected route:

- `fengshui_space_audit`

Expected outcome:

- diagnose the current layout,
- suggest low-cost fixes first,
- clearly separate certain advice from directional assumptions.

### Prompt 2

`I want to improve focus and reduce friction at home. The apartment entrance opens into the living room and the desk faces the kitchen.`

Expected route:

- `fengshui_space_audit`

Expected outcome:

- prioritize flow and placement changes,
- keep advice practical and plain-language.

## Shushu Numerology

### Prompt 1

`Can you build me a numerology-style profile from my birthday 1991-08-14?`

Expected route:

- `shushu_numerology_profile`

Expected outcome:

- reflective profile output,
- practical habit or growth suggestions,
- avoid overclaiming precision.

### Prompt 2

`My birthday is 1988-01-06 and my name is Lina. What pattern do you see?`

Expected route:

- `shushu_numerology_profile`

Expected outcome:

- combine birth date with optional name context,
- return a compact profile rather than a sprawling reading.

## Shopping Without Divination

### Prompt 1

`Show me a few amethyst necklaces under $60.`

Expected route:

- Shopify tools only

Expected outcome:

- no divination workflow-tool,
- grounded catalog response,
- storefront UI manifest allowed if product grounding is complete.

## Shopping With Divination

### Prompt 1

`I keep waking up at night. Can you recommend a crystal and explain the energy behind it?`

Expected route:

- optionally one supported workflow-tool if it genuinely sharpens the diagnosis,
- then Shopify tools for product grounding

Expected outcome:

- no unsupported crystal-only skill call,
- product recommendation must still be grounded in Shopify tools,
- prose should remain clean if no storefront UI manifest is emitted.
