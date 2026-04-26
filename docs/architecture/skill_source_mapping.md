# External Skill Source Mapping

This document maps external skill repositories to AskCrystal's Dify skill-bridge packs.

## Imported Sources

1. shushu: https://github.com/FANzR-arch/Numerologist_skills
2. bazi: https://github.com/jinchenma94/bazi-skill
3. marriage: https://github.com/Ming-H/yinyuan-skills
4. fengshui: https://github.com/voidforall/fengshui.skill
5. tarot: https://github.com/daman-ovo-0404/tarot-skill
6. taibu: https://github.com/hhszzzz/taibu

## How We Used Them

- We extracted trigger intent, workflow structure, and response guardrails.
- We converted these into Dify-tool-friendly skill templates in YAML.
- We did not directly execute repo scripts in this pass; this layer is prompt/workflow adaptation first.

## Pack Mapping

### `services/skill-bridge/src/dify_skill_bridge/skills/cn_divination_pack.yml`

- `shushu_numerology_profile`
  - Sources: Numerologist_skills (overall architecture + numerology direction)
- `bazi_chart_analysis`
  - Sources: bazi-skill, Numerologist_skills/bazi
- `yinyuan_matchmaking`
  - Sources: yinyuan-skills
- `fengshui_space_audit`
  - Sources: fengshui.skill
- `tarot_spread_interpretation_cn`
  - Sources: tarot-skill
- `taibu_structured_divination_router`
  - Sources: taibu/skills/divination
- `qimen_timing_direction_read`
  - Sources: Numerologist_skills/qimen-dunjia
- `ziwei_palace_theme_read`
  - Sources: Numerologist_skills/ziwei-doushu

### `services/skill-bridge/src/dify_skill_bridge/skills/astrology_crystal_pack.yml`

- Built specifically for AskCrystal requirements to add:
  - western astrology (natal, transit, synastry)
  - crystal healing (intention matching, chakra, cleansing, grid)
  - astrology + crystal synthesis

These are custom pack definitions designed to use AskCrystal crystal KB and RAG outputs.

## Next Integration Step

After you provide your finalized mythology skill shortlist, we can:

1. add exact equivalent skills,
2. tighten required inputs per skill,
3. add Chinese/English localized variants,
4. optionally split by channel (chat short form vs deep report mode).
