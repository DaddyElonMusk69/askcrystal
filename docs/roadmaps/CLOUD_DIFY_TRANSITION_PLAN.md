# AskCrystal Cloud Dify Transition Plan

## Goal

Move AskCrystal from the current local Dify runtime to a cloud Dify runtime without losing the behavior we have already built locally.

This transition should preserve:

- prompt behavior,
- skill routing,
- Shopify tool usage,
- crystal RAG grounding,
- product recommendation quality,
- migration continuity for the future Shopify storefront integration.

## Core Decision

The primary migration path should use `Dify app DSL import/export`.

But DSL is not the entire deployment package.

We should treat the cloud transition as four separate asset migrations:

1. `App DSL`
2. `Knowledge base assets`
3. `Tool and MCP provisioning`
4. `Secrets and environment configuration`

## Why DSL Should Be The Main Path

Use DSL as the primary application blueprint because it is the closest thing Dify provides to a portable app definition.

DSL is the right home for:

- app metadata,
- prompt and orchestration configuration,
- model parameters,
- app-level workflow structure,
- knowledge connections,
- application definition portability between environments.

## What DSL Does Not Fully Solve

We should not treat DSL export as a full backup of the working agent environment.

DSL does not replace:

- knowledge base source files,
- actual uploaded KB content,
- external tool services,
- workspace-level tool credentials,
- MCP credentials,
- model API keys,
- environment variables,
- runtime validation.

## Migration Strategy

We will migrate to cloud Dify in two layers:

## Layer 1: Portable app definition

Use:

- Dify DSL export/import

Purpose:

- reproduce the app's core definition in cloud Dify.

## Layer 2: Environment reconstruction

Use:

- our own scripts,
- our own KB source assets,
- our own tool services,
- our own secrets configuration.

Purpose:

- rebuild the parts DSL does not reliably carry.

## Asset Inventory

## 1) App DSL

Cloud-migration role:

- primary application blueprint

Repository location:

- `services/dify-agent/dsl/`

Should include:

- app definition,
- prompts,
- app-level orchestration settings,
- knowledge connections where supported,
- model configuration references where supported.

What we should do:

1. export the AskCrystal app DSL from the working local Dify app,
2. version the DSL in `services/dify-agent/dsl/`,
3. treat it as the canonical cloud import artifact for the app itself.

## 2) Knowledge base assets

Cloud-migration role:

- reproducible RAG source

Current local sources:

- `data/knowledge-base/crystal_knowledge_base_final-90b679ba5d.json`
- `data/knowledge-base/dify_kb_docs/`

What we should do:

1. keep the source JSON and generated markdown docs under version control where appropriate,
2. re-ingest KB content into cloud Dify instead of assuming DSL carries the actual knowledge data,
3. use the same ingestion logic where possible so local and cloud stay aligned.

## 3) Tool and MCP provisioning

Cloud-migration role:

- recreate operational tool access in the cloud workspace

Current local ingredients:

- `services/skill-bridge/`
- `scripts/ops/register_skill_bridge_tools.py`
- `scripts/ops/sync_agent_skill_tools.py`
- `scripts/ops/setup_shopify_mcp_direct.py`

What we should do:

1. deploy the skill bridge as a real hosted service,
2. register it into cloud Dify,
3. configure Shopify MCP again in cloud Dify,
4. re-sync app tool bindings after import.

## 4) Secrets and environment

Cloud-migration role:

- restore operational connectivity

Examples:

- model API keys,
- Shopify storefront token,
- MCP auth headers,
- bridge service URL,
- cloud Dify base URL,
- admin credentials and workspace references.

What we should do:

1. maintain an explicit environment checklist,
2. never assume DSL will carry secrets,
3. validate every critical external dependency after import.

## Recommended Transition Phases

## Phase 1: Freeze Local App Definition

Purpose:

- ensure the local Dify app is stable before exporting DSL.

Tasks:

1. confirm prompt and routing behavior,
2. confirm Shopify MCP tool availability,
3. confirm skill tool availability,
4. run representative smoke tests,
5. avoid exporting from a half-configured state.

Exit criteria:

- local agent behavior is stable enough to be treated as the source version.

## Phase 2: Export and Version the DSL

Purpose:

- create a portable application definition artifact.

Tasks:

1. export app DSL from local Dify,
2. save it as a versioned repo artifact under `services/dify-agent/dsl/`,
3. document which local app ID it came from,
4. tie it to a known prompt/tool/KB revision.

Recommended metadata to record alongside the export:

- export date,
- source Dify version,
- app ID,
- expected model provider,
- expected tool providers,
- expected dataset names.

Exit criteria:

- DSL export is committed and traceable.

Suggested command:

```bash
python3 scripts/build/export_dify_app_dsl.py
```

## Phase 3: Provision Cloud Workspace

Purpose:

- prepare the cloud Dify environment before import.

Tasks:

1. create or access the cloud workspace,
2. configure model provider credentials,
3. prepare workspace naming conventions,
4. prepare environment variable and secret inventory,
5. identify any provider/plugin differences from local.

Exit criteria:

- cloud workspace can accept import and external integrations.

## Phase 4: Import DSL Into Cloud Dify

Purpose:

- recreate the app definition in cloud Dify.

Tasks:

1. import DSL,
2. review imported app settings,
3. verify prompt and app mode,
4. verify imported knowledge links and placeholders,
5. identify any missing bindings after import.

Exit criteria:

- cloud app exists and matches the intended local app definition structurally.

## Phase 5: Rebuild Knowledge and Tools

Purpose:

- make the imported app operational rather than merely present.

Tasks:

1. upload or re-ingest knowledge base content,
2. deploy and register the skill bridge,
3. configure Shopify MCP in cloud Dify,
4. re-sync app tool references,
5. verify all critical tool operations exist.

Exit criteria:

- cloud app has working KB access and tool access.

## Phase 6: Validate Behavior Parity

Purpose:

- confirm cloud behavior matches local expectations.

Test cases should include:

1. crystal recommendation flow,
2. mythology or divination flow,
3. Shopify product retrieval flow,
4. recommendation with product grounding,
5. safety and disclaimer checks.

Validation dimensions:

- correct tools called,
- no hallucinated products,
- prompt tone preserved,
- recommendation structure preserved,
- acceptable latency.

Exit criteria:

- cloud Dify is good enough to become the official agent backend for Shopify integration work.

## Phase 7: Make Cloud Dify the Official Runtime

Purpose:

- stop treating local Dify as the future backend and start treating it as a development aid.

After this phase:

- cloud Dify becomes the official target for storefront integration,
- local Dify remains useful for experimentation and recovery,
- Shopify implementation should integrate against the cloud-ready agent contract.

## What We Should Keep In The Repo

The long-term repo assets for Dify should be:

1. prompt and routing definitions,
2. KB source assets,
3. KB generation/ingestion scripts,
4. tool bridge service,
5. cloud provisioning scripts,
6. exported DSL files,
7. migration documentation.

## What We Should Not Treat As Product Core

These are useful, but not the long-term product center:

- the entire local `services/dify-runtime/` runtime tree,
- local-only Docker startup routines,
- local-only troubleshooting state,
- machine-specific runtime setup.

## Recommended Validation Checklist

Before saying cloud Dify is ready, confirm:

1. app imported successfully,
2. expected prompt text is present,
3. expected tool list is present,
4. expected KB is connected,
5. model provider works,
6. Shopify MCP works,
7. skill bridge works,
8. smoke prompts behave correctly.

## Relationship To Shopify Work

Once cloud Dify is stable:

- Shopify implementation in `deployables/shopify-app/` and `deployables/storefront-theme/` should target the cloud-ready agent contract,
- local Dify becomes optional for storefront implementation progress,
- repo cleanup becomes easier because the real deployable Dify assets are clearer.

## Final Recommendation

Use DSL as the main cloud migration artifact, but never as the only migration artifact.

The correct mental model is:

`DSL imports the app definition; scripts, KB assets, tools, and secrets make the app actually work.`

## References

- Dify App import/export and app management
- Dify app creation from DSL
- Dify knowledge pipeline DSL import
