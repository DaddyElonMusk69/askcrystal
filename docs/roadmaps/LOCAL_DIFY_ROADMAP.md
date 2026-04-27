# AskCrystal Local Dify Roadmap

For the broader Shopify homepage integration path, see:

- `docs/INTEGRATED_SHOPIFY_AGENT_ROADMAP.md`

## Goal

Bring up a fully runnable local Dify environment for AskCrystal, load the crystal KB as RAG data, and integrate workflow-native Dify tools.

## Principles

- Local-first and reproducible (one-command scripts where possible)
- Keep cloud migration straightforward (same configs, different base URLs/secrets)
- Deterministic ingestion pipeline from `data/knowledge-base/crystal_knowledge_base_final-90b679ba5d.json`

## Phase 1: Runtime Foundation

1. Install local container runtime and CLI (`colima` + `docker` if missing)
2. Place the Dify runtime tree in project (`services/dify-runtime/`)
3. Start Dify services via Docker Compose
4. Health-check Dify API/web/worker stack

Deliverables:

- `services/dify-runtime/` scaffolded
- `scripts/ops/setup_local_dify.sh`
- `scripts/dev/start_local_dify.sh`
- `scripts/dev/check_local_dify.sh`

## Phase 2: KB -> Dify RAG Pipeline

1. Reuse/generated markdown corpus from JSON (`data/knowledge-base/dify_kb_docs/`)
2. Create API-based ingestion script for Dify datasets/documents
3. Add idempotent behavior (skip/reuse existing dataset by name)
4. Trigger indexing and verify document counts

Deliverables:

- `scripts/ops/ingest_kb_to_dify.py`
- `scripts/ops/run_kb_ingestion.sh`
- `docs/DIFY_KB_INGESTION.md`

## Phase 3: Workflow Tool Integration

1. Provision Dify workflow apps from `services/dify-agent/dsl/`
2. Publish workflow apps and create workflow-tool wrappers
3. Enable workflow tools for AskCrystal app
4. Add routing/system prompt template for workflow-family orchestration

Deliverables:

- `services/dify-agent/workflows/`
- `scripts/build/provision_*_workflow.py`
- Prompt template reference wired from `docs/architecture/dify_skill_routing_prompt.md`

## Phase 4: End-to-End App Assembly

1. Create AskCrystal agent app (or update existing) via API/manual guided steps
2. Attach dataset(s) + toolset
3. Validate representative scenarios:
   - crystal-only query
   - CN divination query
   - western astrology + crystal query
4. Record runbook + troubleshooting

Deliverables:

- `docs/LOCAL_RUNBOOK.md`
- `docs/TROUBLESHOOTING_LOCAL_DIFY.md`
- `scripts/dev/e2e_smoke_test.py`

## Execution Order

1. Foundation (runtime up)
2. KB ingestion (RAG ready)
3. Skills/tool integration
4. E2E validation + docs hardening

## Exit Criteria

- `./scripts/dev/start_local_dify.sh` brings Dify up locally
- KB dataset exists and is indexed from project JSON-derived docs
- Workflow-native tools are callable from Dify
- End-to-end sample prompts return grounded, tool-aided results

## Status Update (2026-04-22)

- Phase 1 complete:
  - Local Dify stack boots via scripts and passes health checks.
- Phase 2 complete:
  - `AskCrystal-KB` dataset created and loaded from `data/knowledge-base/dify_kb_docs/` (52 docs).
- Phase 3 has moved to workflow-native tools:
  - The old skill bridge has been removed.
  - Domain tools are registered as Dify workflow tools.
- Phase 4 core validation complete:
  - End-to-end smoke test passes (`scripts/dev/e2e_smoke_test.py`).
