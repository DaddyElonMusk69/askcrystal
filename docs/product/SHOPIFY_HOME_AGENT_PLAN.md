# AskCrystal Shopify Homepage Plan

## Goal

Make the Shopify home page (`/`) primarily an AI agent experience, while preserving Shopify SEO structure and adding catalog browsing/purchase flows.

Related positioning document:

- `docs/INTEGRATED_SHOPIFY_AGENT_ROADMAP.md`
- `docs/product/STORE_IDENTITY_AND_UX_NORTH_STAR.md`
- `docs/adr/SHOPIFY_STOREFRONT_TECH_DECISIONS.md`
- `docs/architecture/USER_MEMORY_AND_PERSISTENCE_ARCHITECTURE.md`

## Execution Roadmap (Current Working Plan)

1. Stabilize local intelligence layer (Dify + RAG + skills):
   - Keep Dify as orchestration backend.
   - Ensure KB retrieval quality and citation behavior are stable.
   - Expose full skill inventory as callable tools (not only generic router endpoints).
2. Build Shopify integration backend:
   - App Proxy endpoints for chat + catalog + cart.
   - Session mapping from Shopify visitor/customer to Dify conversation.
   - User profile and long-term memory persistence outside Dify.
3. Build storefront homepage experience:
   - Agent-first hero and conversational UI on `/`.
   - Product browsing surfaces and add-to-cart actions directly from chat context.
4. Harden for production:
   - Guardrails, analytics, retries, and cost controls.
5. Prepare cloud migration:
   - Move local Dify + bridge setup to managed environment with identical contracts.

## Deliverables by Milestone

1. `M1` Local runtime parity:
   - Dify app responds reliably with KB + skill calls.
   - Skill coverage audit shows source mapping + visible tool endpoints.
2. `M2` Shopify-connected beta:
   - Homepage chat can recommend and add products to cart.
   - SEO/canonical paths remain fully under Shopify domain.
3. `M3` Launch-ready storefront agent:
   - Tracking, policy guardrails, and failover behavior validated.

## Recommended Architecture

1. Shopify storefront remains the public website and SEO surface.
2. Homepage renders an agent-led boutique storefront, not a simple chat widget.
3. Frontend calls Shopify App Proxy routes under store domain (e.g. `/apps/askcrystal/*`).
4. Backend (our service) validates proxy requests, resolves user/session identity, and orchestrates:
   - Dify chat API (agent reasoning, skills, RAG)
   - Shopify product/catalog/cart APIs
5. Dify is agent orchestration backend only, not customer-facing UI.

## Framework Baseline

1. Public storefront:
   - Shopify Online Store 2.0 theme
2. Homepage integration:
   - Theme App Extension app block
3. Backend app:
   - Shopify React Router app template
4. Interactive UI layer:
   - React island inside the app block
   - Radix primitives, with optional selective shadcn usage for implementation speed

## Shopify MCP Decision

Use Shopify official MCP for storefront catalog + cart abilities.

1. `Storefront MCP` is the right first integration for AskCrystal home-page agent.
2. Keep a thin AskCrystal backend/bridge layer so we can:
   - normalize tool contracts for Dify,
   - enforce policy/guardrails,
   - preserve session mapping and observability.
3. Do not block on checkout-MCP maturity; keep checkout handoff through Shopify storefront/cart flow.

## Why This Path

- Preserves Shopify URL/canonical/SEO structure.
- Keeps all sensitive credentials server-side.
- Enables custom branded UX while reusing Dify for agent intelligence.
- Allows deterministic catalog/cart actions alongside open-ended agent chat.

## Delivery Phases

## Phase 1: Foundation (Backend + Integration Contracts)

1. Create backend endpoints behind App Proxy:
   - `POST /apps/askcrystal/chat`
   - `POST /apps/askcrystal/catalog/search`
   - `POST /apps/askcrystal/catalog/recommend`
   - `POST /apps/askcrystal/cart/add`
2. Standardize identity model:
   - logged-in customer: stable `shop_id + customer_id`
   - guest: stable cookie/session ID
3. Define Dify session mapping:
   - one Dify `conversation_id` per storefront user session
4. Add observability:
   - request IDs
   - latency/error logs
   - Dify tool-call traces

## Phase 2: Shopify Homepage UX

1. Implement Homepage section/app block:
   - hero / receiving stage (SEO text remains in Liquid)
   - conversation surface integrated into the storefront layout
   - dynamic product shelf from agent responses
   - visible browse/cart pathways from the first screen
2. Add interaction primitives:
   - quick prompts (e.g. mood/intention/product goals)
   - product card actions (view product, add to cart)
   - streaming response rendering
   - persistent sense of store navigation, not chat-only navigation
3. Add fallback states:
   - backend unavailable
   - rate limited model response
   - no product matches

## Phase 3: Catalog-Aware Agent Behaviors

1. Add tool contract in backend for catalog search + filters:
   - product type
   - price range
   - tags/benefits
   - availability
2. Prompt/policy updates so agent:
   - gives narrative guidance first
   - returns structured product candidates second
3. Add safe behavior:
   - no medical/guaranteed claims
   - confidence + alternatives when uncertain

## Phase 4: Commerce Hardening

1. Cart/checkout handoff polish:
   - one-click add-to-cart
   - preserve variant selection
2. Analytics:
   - chat-to-product click-through
   - add-to-cart conversion from agent sessions
3. Reliability controls:
   - request retries/backoff
   - cached product snapshots for degraded mode

## Phase 5: Launch Controls

1. Soft launch behind theme flag.
2. A/B test agent-first homepage vs control hero.
3. Rollout guardrails:
   - per-shop traffic throttle
   - model cost guardrails
   - abuse/rate controls

## API/Security Requirements

1. Never expose Dify API key in storefront JavaScript.
2. Validate Shopify App Proxy signatures on backend.
3. Enforce per-shop authorization boundary in every request.
4. Use server-issued session token for guest continuity.

## Data Boundaries

1. Dify stores conversation state and agent outputs.
2. Shopify remains source of truth for catalog, price, inventory, cart, orders.
3. Backend maps between Dify intent outputs and Shopify commerce actions.

## Build Order (Practical)

1. App Proxy + backend `chat` endpoint.
2. Homepage boutique storefront shell and conversation stage.
3. Catalog search/recommend endpoint + product cards.
4. Cart add endpoint and UX polish.
5. Analytics + rollout flags.
