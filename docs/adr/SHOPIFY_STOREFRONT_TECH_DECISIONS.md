# AskCrystal Shopify Storefront Technical Decisions

## Goal

Choose a technical stack for the customer-facing experience that:

- preserves Shopify SEO and native storefront routing,
- avoids rebuilding generic UI primitives from scratch,
- supports an agent-led homepage experience,
- keeps commerce, content, and conversation working as one product.

## Decision Summary

We will use three distinct layers:

1. `Storefront shell`
   - Shopify Online Store 2.0 theme
   - Homepage remains `/` inside Shopify
   - Product and collection pages remain native Shopify pages

2. `Interactive agent UI layer`
   - Native Shopify theme section
   - Homepage section renders the agent-led storefront stage
   - Theme assets mount the conversation UI directly inside the storefront

3. `App/backend layer`
   - Shopify app built on the React Router template
   - App Proxy routes under `/apps/askcrystal/*`
   - Backend orchestrates Dify, Shopify APIs, sessions, observability, and long-term user memory

Repo location for this layer:

- backend/proxy: `deployables/shopify-app/`
- native storefront theme: `deployables/storefront-theme/`

## Framework Choices

## 1) Public storefront framework

Use:

- `Shopify OS 2.0 theme`
- start from a proven reference theme structure rather than building a fully headless storefront

Why:

- keeps homepage, collections, product pages, and canonical URLs inside Shopify,
- preserves native theme rendering and merchant editing workflows,
- supports app blocks and JSON templates,
- avoids rebuilding the entire storefront stack.

Practical recommendation:

- use a stable OS 2.0 theme baseline for development,
- keep the homepage shell and browseable merchandising in native theme sections,
- treat the agent as a first-class section of the homepage rather than the only thing on the page.

## 2) App framework

Use:

- `Shopify React Router app template`

Why:

- it is Shopify's current recommended template path for new apps,
- it gives us the right foundation for auth, app proxy handling, and extension development,
- it is a better long-term base than starting a custom Express app from scratch.

This app is not the public storefront.
It is the backend and integration layer behind the storefront.

## 3) Storefront interaction framework

Use:

- `Theme-owned JavaScript` for the homepage agent surface today,
- optional `React` islands only if a later interaction truly benefits from it,
- `Radix Primitives` for accessible low-level interactions,
- optional selective `shadcn/ui` code adoption for reusable primitives, not as a visual design system.

Why:

- we should not rebuild drawers, dialogs, tabs, scroll containers, and popovers from scratch if we later need richer islands,
- Radix gives accessible primitives without forcing a visual style,
- shadcn can accelerate implementation where useful, but its default look should not dictate the storefront identity.

Important constraint:

- do not let the storefront become a generic shadcn dashboard or AI chat app,
- use these tools only as interaction primitives,
- keep the visual language bespoke and boutique-driven.

## SEO Preservation Strategy

The homepage must remain the real Shopify homepage.

That means:

1. `Homepage HTML ownership`
   - owned by Shopify theme rendering, not by Dify
   - hero, trust signals, collection links, featured merchandising, and crawlable copy live in Liquid/theme sections

2. `Conversation data ownership`
   - owned by our app/backend and Dify
   - loaded dynamically through app proxy endpoints

3. `Canonical SEO surfaces`
   - homepage `/`
   - product pages
   - collection pages
   - editorial/store content pages

We should not move the customer-facing experience to a separate headless domain or to a full-page external app route if SEO is a priority.

## Homepage Delivery Model

The homepage should be assembled like this:

1. `Native Shopify section shell`
   - navigation
   - hero / receiving stage
   - featured collections
   - trust/editorial sections

2. `Agent theme section`
   - mounted directly inside the homepage template
   - renders the conversation stage and dynamic curation surface
   - loads its own JS/CSS from native theme assets

3. `App proxy API`
   - the agent UI calls `/apps/askcrystal/chat`
   - and related catalog/cart endpoints under the same Shopify domain path

This gives us same-domain UX while keeping the SEO-critical page itself native to Shopify.

## Why We Are Not Choosing Other Routes

## Not a full headless Hydrogen storefront

Reason:

- it would make the agent experience easier to control technically,
- but it would move us away from the "Shopify-native homepage" requirement and increase SEO and storefront rebuild scope.

Hydrogen React can still be selectively borrowed for React-side Shopify utilities if needed, but we are not choosing a headless rebuild as the primary path.

## Not a floating app embed as the main experience

Reason:

- app embeds are right for floating or overlaid UI,
- but our homepage experience is supposed to be the main storefront stage, not a chat bubble or support widget.

## Not a separate app-proxy-rendered homepage

Reason:

- app proxy is excellent for dynamic same-domain requests,
- but it should serve data and interactions, not replace Shopify as the primary renderer of `/`.

## Implementation Consequences

1. Build a Shopify app/backend with:
   - React Router template
   - app proxy
   - inside `deployables/shopify-app/`

2. Put the homepage storefront experience into:
   - native theme code inside `deployables/storefront-theme/`

3. Put dynamic agent endpoints into:
   - `/apps/askcrystal/chat`
   - `/apps/askcrystal/catalog/search`
   - `/apps/askcrystal/catalog/recommend`
   - `/apps/askcrystal/cart/*`

4. Keep homepage SEO assets in theme:
   - headline copy
   - intro copy
   - featured collection links
   - trust statements
   - crawlable merchandising modules

5. Keep agent intelligence outside theme:
   - Dify orchestration
   - skill routing
   - tool calls
   - conversation persistence

## Optional Supporting Pattern

If we need adjacent Shopify-rendered sections to refresh after agent actions, use:

- `Section Rendering API`

This is useful for:

- refreshing curated shelves,
- updating cart-adjacent fragments,
- syncing nearby merchandising sections without reloading the full page.

## Final Recommendation

The correct technical path is:

`Shopify OS 2.0 theme + native homepage agent section + App Proxy backend + Dify orchestration`

For the UI implementation inside that homepage section:

`React + Radix primitives`, with optional selective `shadcn/ui` code usage only where it saves time without imposing a generic visual language.
