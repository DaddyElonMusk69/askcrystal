# AskCrystal Dify Skill Bridge

A local bridge that gives Dify a pluggable "skills" layer.

## What it solves

Dify tools are great, but many reusable agent skill packs are distributed as instruction templates, not native Dify artifacts. This bridge lets us:

- register skills as YAML files,
- call them from Dify as HTTP tools,
- expand capabilities by adding files (no code changes),
- keep local-first architecture compatible with cloud migration.

## Endpoints

- `GET /health`
- `GET /skills`
- `POST /skills/run`
- `GET /crystals`
- `GET /crystals/{slug}`
- `POST /crystals/search`

## Quick start

```bash
cd /Users/haokaiqin/Desktop/AskCrystal
python3 -m venv .venv
source .venv/bin/activate
pip install -r dify_skill_bridge/requirements.txt
uvicorn dify_skill_bridge.server:app --host 0.0.0.0 --port 8010
```

Optional overrides:

- `SKILL_BRIDGE_SKILLS_DIR=/abs/path/to/skills`
- `SKILL_BRIDGE_KB_PATH=/abs/path/to/crystal_kb.json`

OpenAPI doc will be available at:

- `http://localhost:8010/openapi.json`

## Connect to local Dify

If Dify runs in Docker, `localhost` inside Dify container is not your host machine.
Use one of:

- `http://host.docker.internal:8010/openapi.json` (macOS/Windows)
- or expose bridge and use LAN IP (Linux/macOS)

Then in Dify:

1. Go to **Tools** -> **Custom Tools**.
2. Import via OpenAPI URL.
3. Enable these tool actions for your app:
   - `list_skills` (`GET /skills`)
   - `run_skill` (`POST /skills/run`)
   - `search_crystals` (`POST /crystals/search`)
   - `get_crystal` (`GET /crystals/{slug}`)

## Skill file format

Add new files under `dify_skill_bridge/skills/*.yml` (or `.json`):

```yaml
skills:
  - id: your_skill_id
    name: Friendly Skill Name
    description: What this skill does
    when_to_use: Triggering conditions
    tags: [tag1, tag2]
    inputs:
      - name: user_context
        description: Input description
        required: true
    template: |
      Instruction text with placeholders like {user_context}
```

JSON follows the same schema (`{"skills": [...]}`).

No restart behavior note:

- If you add new files while server is running without `--reload`, restart the server.

## Included starter packs

- `skills/mythology_pack.yml`: generic mythology framing pack.
- `skills/cn_divination_pack.yml`: adapted from Chinese metaphysics skills (shushu/bazi/yinyuan/fengshui/tarot/taibu).
- `skills/astrology_crystal_pack.yml`: western astrology + crystal healing pack for AskCrystal.
- JSON mirrors of each pack are included for dependency-light runtime loading.

Source mapping and adaptation notes:

- `docs/skill_source_mapping.md`

## Suggested Dify agent policy

Add this to your system prompt rules:

1. If user intent is symbolic/mythological, call `list_skills` once if unsure which skill to use.
2. Call `run_skill` with best skill and pass concise variables.
3. Use skill output as structured reasoning scaffold, not as deterministic fate claims.
4. For crystal grounding, call `search_crystals` and `get_crystal` before final recommendations.
5. Include wellness disclaimer and avoid medical/fortune guarantees.
