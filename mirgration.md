# Repository Migration Tracker

Note: this file intentionally uses the requested filename `mirgration.md` for now.

## Goal

Reshape the repo around the final production architecture, organized by deployable boundary rather than by local experimentation history.

The repo root is now the source of truth for the new structure. We will migrate into it gradually without creating a second long-lived copy of the project.

## Locked Decisions

- Structure the repo by deployable/service boundary.
- Keep Shopify theme, Shopify app, Dify runtime, and skill bridge as separate units.
- Host the Shopify theme on Shopify.
- Host the Shopify app/proxy on our own cloud/server.
- Host Dify and the skill bridge on our own cloud/server.
- Keep shared contracts and schemas in `packages/`.
- Remove nested Git metadata from vendored runtime trees before they join the main repo.

## Target Structure

```text
askcrystal/
├─ deployables/
│  ├─ storefront-theme/
│  └─ shopify-app/
├─ services/
│  ├─ dify-agent/
│  ├─ dify-runtime/
│  └─ skill-bridge/
├─ packages/
│  ├─ storefront-ui-contract/
│  ├─ chat-protocol/
│  ├─ shared-types/
│  ├─ shared-config/
│  └─ design-tokens/
├─ data/
│  ├─ knowledge-base/
│  └─ fixtures/
├─ infra/
│  ├─ environments/
│  ├─ docker/
│  ├─ terraform/
│  └─ ci/
├─ docs/
│  ├─ architecture/
│  ├─ runbooks/
│  ├─ product/
│  ├─ adr/
│  └─ roadmaps/
└─ scripts/
   ├─ dev/
   ├─ build/
   ├─ release/
   └─ ops/
```

## Migration Rules

1. Use `git mv` when moving tracked files.
2. Do not create a second competing source tree.
3. Move one subsystem at a time and get it stable before the next move.
4. Leave temporary compatibility shims only when necessary, then remove them quickly.
5. Update imports, scripts, and docs in the same phase as the move.

## Service Stop Strategy

Do not stop the full AskCrystal stack up front.

Instead, stop only the services affected by the current migration phase, perform the move, then restart and verify before continuing.

### General Rule

1. Keep services running until a phase is about to modify their live paths.
2. Stop only the directly affected services for that phase.
3. Complete the move and path updates.
4. Restart the affected services.
5. Run a quick verification before starting the next phase.

### Phase-by-Phase Stop Plan

#### Phase 1: Shared Contracts

- Stop: Shopify theme dev server
- Stop: Shopify app/proxy server
- Reason: both may import or depend on storefront UI contracts

#### Phase 2: Shopify Theme

- Stop: Shopify theme dev server
- Reason: avoid watcher confusion and broken asset path assumptions during the move

#### Phase 3: Shopify App

- Stop: Shopify app/proxy server
- Reason: avoid stale runtime paths and route/import mismatches

#### Phase 4: Dify Assets

- Stop: scripts or local processes that read agent DSL/prompts/tools during the move
- Prefer stopping: Shopify app/proxy server if it references agent-exported assets directly
- Reason: portable agent assets may be read by tooling during sync/export operations

#### Phase 5: Dify Runtime

- Stop: local Dify stack
- Reason: compose files, env paths, and runtime scripts will be moving

#### Phase 6: Skill Bridge

- Stop: skill bridge
- Reason: avoid path/import/runtime conflicts while relocating the service

#### Phase 7: Data, Scripts, and Docs

- Stop: only the services whose startup or runtime depends on files being moved in this phase
- Reason: this phase is mixed; shutdown should be narrow and intentional

## Progress

### Phase 0: Scaffold

- [x] Create final top-level architecture folders.
- [x] Add placeholder subdirectories for major deployables/services/packages.
- [x] Create this migration tracker.
- [x] Announce the scaffold as the working destination for future moves.

### Phase 1: Shared Contracts

- [x] Move `apps/shopify/packages/storefront-ui` -> `packages/storefront-ui-contract`
- [x] Keep chat event parsing in the same package for now; defer `packages/chat-protocol` extraction until transport concerns are separated more clearly
- [x] Fix import paths after the move
- [x] Smoke-test the theme/app integration

### Phase 2: Shopify Theme

- [x] Move `apps/askcrystal-horizon` -> `deployables/storefront-theme`
- [x] Repoint theme build/dev commands and path references
- [x] Verify Shopify theme dev still works

### Phase 3: Shopify App

- [x] Move `apps/shopify/app` -> `deployables/shopify-app`
- [x] Repoint proxy/server scripts
- [x] Verify chat proxy routes still work

### Phase 4: Dify Assets

- [x] Move `agent/dify` -> `services/dify-agent`
- [x] Separate portable agent assets from local runtime assumptions
- [x] Update export/sync scripts and path references

### Phase 5: Dify Runtime

- [x] Remove nested Git metadata from the vendored Dify runtime before moving it
- [x] Move `dify-local` -> `services/dify-runtime`
- [x] Repoint local Dify bootstrap scripts
- [x] Verify Docker compose commands still work

### Phase 6: Skill Bridge

- [x] Move `dify_skill_bridge` -> `services/skill-bridge`
- [x] Repoint bridge start scripts
- [x] Verify bridge health and Dify tool calls still work

### Phase 7: Data, Scripts, and Docs

- [x] Move crystal knowledge base artifacts into `data/knowledge-base`
- [x] Move stray theme patch fixture files into `data/fixtures`
- [x] Rehome scripts into `scripts/dev`, `scripts/build`, `scripts/release`, `scripts/ops`
- [x] Sort docs into `docs/architecture`, `docs/runbooks`, `docs/product`, `docs/adr`, `docs/roadmaps`
- [ ] Archive or delete obsolete root-level files and folders

## Current Path Mapping

| Current path | Target path | Status | Notes |
| --- | --- | --- | --- |
| `apps/askcrystal-horizon` | `deployables/storefront-theme` | Complete | Theme/Liquid/frontend bundle |
| `apps/shopify/app` | `deployables/shopify-app` | Complete | App proxy, auth, persistence edge |
| `apps/shopify/packages/storefront-ui` | `packages/storefront-ui-contract` | Complete | Shared storefront manifest/schema/parser |
| `agent/dify` | `services/dify-agent` | Complete | Portable agent assets only |
| `dify-local` | `services/dify-runtime` | Complete | Local/self-hosted Dify runtime |
| `dify_skill_bridge` | `services/skill-bridge` | Complete | FastAPI tool bridge |
| `crystal_knowledge_base_final-90b679ba5d.json` | `data/knowledge-base/crystal_knowledge_base_final-90b679ba5d.json` | Complete | Remains a single master JSON for now |
| `dify_kb_docs/` | `data/knowledge-base/dify_kb_docs/` | Complete | Prepared markdown corpus for Dify ingestion |
| `scripts/*` | `scripts/dev|build|release|ops` | Complete | Shared helper kept under `scripts/common/` |
| `docs/*.md` | `docs/*/...` | Complete | Rebucketed by architecture, runbook, product, ADR, roadmap |
| `prd/` | `docs/product/prd/` | Complete | Historical PRD material moved under product docs |
| `store/` | `docs/product/store/` | Complete | Store planning and copy assets moved under product docs |
| `index*.json`, `settings_data*.json` | `data/fixtures/shopify-theme-patch/` | Complete | Historical theme patch fixtures moved off the repo root |

## Open Decisions

- Whether `external_skills/` becomes part of `services/skill-bridge` or stays as external source material

## Next Recommended Move

1. Decide the long-term home for `external_skills/`.
2. Clean the remaining stale move artifacts from earlier theme migration history.
