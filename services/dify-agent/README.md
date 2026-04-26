# AskCrystal Dify Assets

This folder stores the portable, version-controlled AskCrystal assets that should survive beyond the local `services/dify-runtime/` runtime.

## What belongs here

- exported Dify app DSL snapshots
- cloud migration artifacts
- future agent-level configuration that is portable across Dify environments

## What does not belong here

- the local Dify runtime itself
- Docker state
- local-only caches
- workspace secrets

## Current convention

- `dsl/`
  - versioned AskCrystal app exports for Cloud Dify import

The local runtime remains under `services/dify-runtime/`.
