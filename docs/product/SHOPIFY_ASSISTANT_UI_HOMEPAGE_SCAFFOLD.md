# AskCrystal Assistant UI Homepage Scaffold

## Goal

Scaffold `assistant-ui` into the native Shopify homepage so we can:

- keep the storefront rooted at Shopify `/`,
- keep SEO-critical rendering inside the theme,
- reuse a mature chat runtime instead of rebuilding message handling from scratch,
- leave a clean path to later connect the homepage chat to our real AskCrystal backend and user persistence layer.

This is a scaffold milestone, not the final production architecture.

## Decision

Use `assistant-ui` as a small React island mounted inside the Horizon homepage section.

This means:

1. Shopify theme still owns the page shell, navigation, crawlable content, and product URLs.
2. A dedicated homepage section provides the mount point and passes Shopify-authored data into the island.
3. `assistant-ui` handles thread state, message rendering, composer behavior, and streaming-ready runtime primitives.
4. The current scaffold starts with a demo/local runtime adapter, then upgrades to an app-proxy-backed adapter later.

## Why This Is The Right Intermediate Step

It lets us move quickly without locking ourselves into the wrong final shape.

What we avoid:

- embedding the Dify UI directly into the storefront,
- rebuilding chat threading, composer handling, and streaming UX by hand,
- turning the whole homepage into a React SPA,
- blocking on the full Shopify app proxy and persistence layer before we can iterate on storefront UX.

## Architecture

## Layer 1: Shopify Theme Shell

Lives in:

- `deployables/storefront-theme/`

Responsibilities:

- homepage route `/`,
- header/footer/navigation,
- merchant-editable section settings,
- SEO-visible structure,
- featured collection data passed into the agent homepage island.

## Layer 2: Assistant UI Island

Lives in:

- `deployables/storefront-theme/frontend/assistant-ui/`

Responsibilities:

- thread rendering,
- welcome state,
- suggestion chips,
- sticky composer,
- assistant/user message presentation,
- future tool/data UI rendering for product cards and rituals.

Implementation choice:

- `@assistant-ui/react`
- bundled with `React` via `Vite`
- built into Shopify theme assets

## Layer 3: Runtime Adapter

Current scaffold:

- `LocalRuntime`
- demo adapter with deterministic seeded responses

Next upgrade:

- replace demo adapter with fetch calls to `/apps/askcrystal/chat`
- keep the same `assistant-ui` primitives and message UI

Final upgrade:

- runtime connects to Shopify app proxy backend
- backend orchestrates Dify, Shopify APIs, customer identity, thread persistence, and long-term memory

## Data Flow In This Scaffold

1. Shopify section renders Liquid shell.
2. Liquid serializes homepage config and featured products into JSON.
3. React island reads that JSON and mounts `assistant-ui`.
4. `assistant-ui` runs in local/demo mode for now.
5. Empty thread state shows:
   - AskCrystal title and intro,
   - guided suggestion prompts,
   - short 2-column product feed.
6. Once the first message is sent, the welcome state disappears and the thread becomes a normal conversation surface.

## UX Shape For This Phase

This scaffold intentionally follows the product direction we already agreed on:

- storefront-first,
- spiritually guided,
- not a floating support bubble,
- mobile-first with a persistent bottom composer,
- a visible store context from the first screen.

Homepage behavior in this scaffold:

1. Welcome screen is part boutique landing, part guided entry.
2. Product feed is visible before chatting, using Shopify collection data.
3. Suggestion chips help users start with intentions instead of blank-input anxiety.
4. The composer stays fixed at the bottom like a mobile storefront nav bar.
5. After chat begins, the experience simplifies into a focused conversation thread.

## File Layout

## Theme / Liquid

- `deployables/storefront-theme/sections/askcrystal-home.liquid`
- `deployables/storefront-theme/templates/index.json`

## Frontend Source

- `deployables/storefront-theme/frontend/assistant-ui/main.jsx`
- `deployables/storefront-theme/frontend/assistant-ui/styles.css`

## Build Config

- `deployables/storefront-theme/vite.askcrystal.config.mjs`
- `deployables/storefront-theme/package.json`

## Built Theme Assets

- `deployables/storefront-theme/assets/askcrystal-homepage.js`
- `deployables/storefront-theme/assets/askcrystal-homepage.css`

## Development Workflow

Run two processes during theme work:

1. Theme preview
   - `npm run theme:dev -- --store <your-store>.myshopify.com`

2. Frontend bundle watcher
   - `npm run agent:watch`

For a one-time build:

- `npm run agent:build`

## What This Scaffold Does Not Solve Yet

Not yet included in this step:

- real backend chat calls,
- authenticated Shopify customer identity handoff,
- server-side thread persistence,
- cross-device memory,
- structured tool UI for Shopify product/result cards in-message,
- Dify run resumption,
- cart actions from chat.

Those belong in the next integration wave.

## Upgrade Path After Scaffold

## Phase 1: Replace Demo Runtime

Swap the demo adapter for a proxy-backed adapter:

- POST `/apps/askcrystal/chat`
- stream assistant output back into `assistant-ui`

## Phase 2: Add Customer Identity + Persistence

When user is logged in, bind threads to:

- Shopify customer ID,
- backend thread ID,
- long-term profile + preference memory.

Persistence should live in our backend, not in Dify alone.

## Phase 3: Add Structured Product / Ritual UI

Use assistant-ui tool/data UI for:

- product cards,
- recommendation shelves,
- ritual steps,
- reading summaries,
- daily guidance widgets.

Important rule:

- Dify/tool output decides *what* to show
- Shopify frontend decides *how* to render it

## Phase 4: Multi-Thread + Returning User Surfaces

Add:

- saved sessions,
- returning-user pickup flow,
- daily check-in entry points,
- persistent care plans.

## Technical Notes

## Why `assistant-ui` here instead of Dify chat UI

Because we need:

- Shopify-native homepage ownership,
- custom boutique presentation,
- control over product rendering,
- a path to custom persistence and commerce behaviors.

Dify is still useful as orchestration, but not as the final storefront renderer.

## Why a React island instead of a React homepage takeover

Because we want:

- native Shopify SEO,
- native theme rendering,
- native theme editor control,
- minimal JS scope,
- easier migration into an app block later if needed.

## Future Migration Safety

This scaffold is intentionally portable.

Later, the same React island can move from:

- native theme section

to:

- theme app extension block

without rewriting the `assistant-ui` message layer.

## Success Criteria For This Milestone

The scaffold is considered successful when:

1. homepage renders inside the native Shopify theme,
2. `assistant-ui` mounts cleanly inside the homepage section,
3. welcome state shows branded intro + suggestions + product feed,
4. first message hides the welcome merchandising state,
5. composer stays persistent on mobile,
6. theme remains previewable with Shopify CLI,
7. build path is simple enough for fast iteration.
