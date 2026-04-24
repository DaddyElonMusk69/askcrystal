# AskCrystal Shopify Workspace

This workspace now contains the first real scaffold for the Shopify integration layer described in the roadmap.

## What exists now

- `app/`
  - local app-proxy-style backend scaffold
  - Dify gateway contract
  - memory and identity planning modules
- `extensions/homepage-agent/`
  - Theme App Extension block scaffold
  - homepage storefront shell markup, CSS, and client-side behavior
- `packages/storefront-ui/`
  - shared storefront content and route constants for future React usage
- `docs/`
  - Shopify-specific scaffold notes and next steps

## Current intent

This is not yet a full Shopify CLI-generated production app.

Instead, it is the repo-aligned scaffold that lets us:

1. lock route contracts,
2. build the homepage agent surface,
3. wire local Dify next,
4. later swap in the official Shopify React Router app template without rethinking our contracts.

## Immediate next step after this scaffold

Wire three things in order:

1. Shopify app auth + official app shell
2. real App Proxy request validation and Storefront API calls
3. Dify app chat API integration using a real app API key
