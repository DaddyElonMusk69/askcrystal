# AskCrystal Workflow Specs

This directory stores repo-side specifications for Dify workflow-tools.

Important:

- These files are not live Dify exports yet.
- They are the source-of-truth specs we use while rebuilding the current pseudo-skill layer into Dify-native workflow-tools.
- The live Dify workflow definitions may be created in the Dify UI first, then exported back into this directory later.

Current direction:

- main agent runtime: Dify chat agent
- domain execution: Dify workflow-tools
- source material: `external_skills/`
- removed runtime path: old FastAPI skill bridge

Primary catalog:

- `workflow-skill-catalog.json`
- `askcrystal_skill_result_v1.schema.json`
- `examples/askcrystal_skill_result_v1.examples.json`
- `test-prompts.md`
- `specs/shushu_numerology_profile.md`
- `specs/taibu_structured_divination_router.md`
- `specs/bazi_chart_analysis.md`
- `specs/fengshui_space_audit.md`
- `specs/tarot_spread_interpretation.md`
- `specs/yinyuan_matchmaking.md`
- `specs/horoscope_daily_guidance.md`

Current Bazi note:

- the repo-side Bazi workflow now uses the runnable `external_skills/bazi-mingli-main/` lane as its deterministic calculator base
- the richer `external_skills/yuan-main/references/bazi/` engine remains a future-upgrade reference rather than the current operational base

Build rule for this phase:

- the six original source families under `external_skills/`, plus the explicit horoscope follow-up workflow
- no new crystal-only or extra astrology workflow-tools in this phase
