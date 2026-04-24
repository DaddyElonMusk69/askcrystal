# AskCrystal Dify DSL Snapshots

This directory stores versioned AskCrystal app exports from the working local Dify instance.

## Naming

- `<app-name>-<date>.dsl.yml`
- `<app-name>-<date>.metadata.json`

Example:

- `askcrystal-agent-2026-04-23.dsl.yml`
- `askcrystal-agent-2026-04-23.metadata.json`

## How to refresh the snapshot

From the repository root:

```bash
python3 scripts/export_dify_app_dsl.py
```

## How to use in Cloud Dify

1. Open the target Cloud Dify workspace.
2. Use the app import flow and select the `.dsl.yml` file from this folder.
3. Re-provision the environment pieces that DSL does not fully carry:
   - model credentials
   - knowledge base content
   - skill bridge provider
   - Shopify MCP connection
4. Validate the imported app against the matching `.metadata.json` file.

## Important note

Snapshots exported by the current script are intentionally created without secrets by default.

That is the safe default for version control and for cross-environment migration.
