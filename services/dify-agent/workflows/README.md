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
- legacy reference only: `services/skill-bridge/`

Primary catalog:

- `workflow-skill-catalog.json`
- `askcrystal_skill_result_v1.schema.json`
- `examples/askcrystal_skill_result_v1.examples.json`
- `test-prompts.md`
- `specs/taibu_structured_divination_router.md`
- `specs/bazi_chart_analysis.md`

Build rule for this phase:

- only the six source families under `external_skills/`
- no new crystal-only or astrology-only workflow-tools in this phase
