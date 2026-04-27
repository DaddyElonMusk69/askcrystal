# AskCrystal Integrated Shopify Agent Roadmap

## Goal

Convert the existing local Dify-based AskCrystal agent into a production-oriented Shopify homepage experience that:

- lives on the real Shopify homepage `/`,
- preserves Shopify SEO and native storefront routing,
- feels like an agent-led crystal boutique rather than a chatbot widget,
- supports persistent user identity and long-term memory,
- can evolve into recurring personalized guidance such as daily check-ins.

## Current Starting Point

Today we already have:

1. a locally runnable Dify agent,
2. a crystal RAG knowledge base,
3. workflow-native Dify tools for metaphysics and guidance flows,
4. Shopify MCP tool access inside Dify,
5. PRD-aligned prompt and tool-routing behavior,
6. documented storefront positioning and memory architecture decisions.

This means the intelligence layer exists.
What does not exist yet is the customer-facing Shopify implementation layer and the persistence layer that turns repeated conversations into a real user relationship.

## End State

The finished system should look like this:

1. `Shopify homepage`
   - the public SEO surface and primary storefront shell.

2. `Theme App Extension homepage block`
   - renders the agent-led boutique storefront experience on `/`.

3. `AskCrystal backend`
   - handles app proxy routes, user identity resolution, memory, and orchestration.

4. `Dify`
   - continues to act as the agent engine, tool orchestrator, and response generator.

5. `User persistence layer`
   - stores customer profile, memory, conversation mappings, and recurring guidance state outside Dify.

## Guiding Principles

1. Do not replace Shopify as the public storefront.
2. Do not use Dify as the long-term system of record for users.
3. Do not ship a homepage that feels like a chat bubble pasted onto ecommerce.
4. Build in layers so each milestone is testable before the next one starts.
5. Keep local development and cloud migration paths aligned from the beginning.

## Related Documents

This roadmap depends on:

- `docs/architecture/REPO_STRUCTURE.md`
- `docs/roadmaps/CLOUD_DIFY_TRANSITION_PLAN.md`
- `docs/roadmaps/LOCAL_DIFY_ROADMAP.md`
- `docs/architecture/AGENT_BEHAVIOR_PRD_ALIGNMENT.md`
- `docs/product/SHOPIFY_HOME_AGENT_PLAN.md`
- `docs/product/STORE_IDENTITY_AND_UX_NORTH_STAR.md`
- `docs/adr/SHOPIFY_STOREFRONT_TECH_DECISIONS.md`
- `docs/architecture/USER_MEMORY_AND_PERSISTENCE_ARCHITECTURE.md`

## Workstreams

We should treat the build as five parallel but ordered workstreams:

1. `Agent behavior`
   - prompts, tools, skill routing, product grounding.

2. `Storefront integration`
   - Shopify app, app proxy, homepage block, and any temporary extension bridge.
   - backend workspace: `deployables/shopify-app/`
   - storefront theme workspace: `deployables/storefront-theme/`

3. `Homepage UI/UX`
   - boutique storefront shell, conversation stage, merchandising surfaces.

4. `Persistence and personalization`
   - identity, memory, conversation mapping, daily guidance.

5. `Production hardening`
   - analytics, guardrails, failover, deployment, cloud migration.

6. `Cloud Dify transition`
   - DSL export/import
   - KB re-ingestion
   - tool and MCP reprovisioning
   - cloud behavior parity validation

## Delivery Phases

## Phase 0: Freeze Direction

Purpose:

- align product, UX, and technical decisions before building the storefront layer.

Tasks:

1. finalize product category definition,
2. freeze storefront technical path,
3. freeze memory ownership decision,
4. consolidate roadmap and dependencies.

Deliverables:

- `docs/product/STORE_IDENTITY_AND_UX_NORTH_STAR.md`
- `docs/adr/SHOPIFY_STOREFRONT_TECH_DECISIONS.md`
- `docs/architecture/USER_MEMORY_AND_PERSISTENCE_ARCHITECTURE.md`
- this roadmap

Exit criteria:

- no unresolved disagreement on whether the homepage is Shopify-native,
- no unresolved disagreement on whether memory lives outside Dify,
- no unresolved disagreement on whether the final UI is custom.

## Phase 1: Stabilize the Intelligence Layer

Purpose:

- make the existing Dify agent reliable enough to become the intelligence backend for the storefront.

Tasks:

1. keep local Dify, KB, and workflow-native tools healthy,
2. finalize prompt and tool playbook behavior,
3. verify Shopify MCP tools are correctly routed,
4. produce representative smoke-test scenarios,
5. keep the agent grounded to real products only.

Deliverables:

- stable local Dify runtime,
- synced skill tools,
- synced Shopify MCP tools,
- prompt and routing docs,
- repeatable smoke tests.

Exit criteria:

- AskCrystal can complete product recommendation flows in Dify,
- tool usage is traceable and grounded,
- no hallucinated product recommendations,
- the agent can handle crystal + divination + Shopify flows coherently.

## Phase 2: Scaffold the Shopify Integration Layer

Purpose:

- create the application skeleton that will sit between Shopify storefront and Dify.

Tasks:

1. scaffold Shopify app using the React Router template,
2. add Theme App Extension,
3. add App Proxy routes,
4. define environment/config structure,
5. add local dev scripts and preview workflow.

Primary backend endpoints:

- `/apps/askcrystal/chat`
- `/apps/askcrystal/catalog/search`
- `/apps/askcrystal/catalog/recommend`
- `/apps/askcrystal/cart/*`

Deliverables:

- Shopify app codebase,
- homepage integration scaffold,
- app proxy scaffold,
- local development instructions.

Exit criteria:

- dev store can load the app block,
- homepage can call app proxy endpoints on the same domain,
- backend can proxy to Dify successfully.

## Phase 3: Build the Homepage Storefront Shell

Purpose:

- put the agent inside a real Shopify homepage without sacrificing merchandising or SEO.

Tasks:

1. implement homepage section/app block structure,
2. build the receiving stage and conversation zone,
3. keep visible browse/cart pathways,
4. add product shelf surfaces and recommendation slots,
5. support mobile and desktop layouts.

Important constraint:

- do not start with a bare messenger-style canvas,
- start with a composed storefront shell.

Deliverables:

- homepage app block UI,
- React conversation island,
- product card rendering,
- responsive storefront layout.

Exit criteria:

- homepage feels like a boutique storefront,
- users can talk and browse without mode-switch friction,
- product cards and navigation coexist naturally.

## Phase 4: Wire Real Storefront Interaction Flows

Purpose:

- move from static homepage shell to working commerce-aware interaction.

Tasks:

1. stream chat responses into the homepage UI,
2. insert product recommendations into the conversation surface,
3. support product detail expansion/comparison,
4. support add-to-cart through the backend,
5. synchronize cart-related UI states.

Optional support pattern:

- use Shopify Section Rendering API for nearby section refreshes when needed.

Deliverables:

- end-to-end homepage interaction flow,
- product recommendation cards,
- add-to-cart loop,
- error/loading/fallback states.

Exit criteria:

- user can start on `/`, chat, receive products, and add to cart,
- all critical actions remain on the Shopify domain,
- no reliance on Dify's default web UI in the customer-facing path.

## Phase 5: Add User Identity and Persistence

Purpose:

- turn one-off chat sessions into a persistent relationship.

Tasks:

1. resolve identity:
   - guest session
   - logged-in Shopify customer
2. map user to Dify conversations,
3. create long-term profile and memory storage,
4. implement post-chat memory extraction,
5. inject memory context into Dify calls,
6. implement guest-to-customer merge logic.

Recommended persistence objects:

- users
- guest_sessions
- conversation_threads
- memory_records
- user_profile_snapshots

Deliverables:

- user identity mapping layer,
- memory write-back pipeline,
- profile summary generation,
- Dify memory context injection.

Exit criteria:

- user can return and continue with persistent personalization,
- the agent remembers preferences and constraints across sessions,
- Dify remains the consumer of memory, not the owner.

## Phase 6: Launch Recurring Guidance Features

Purpose:

- unlock the "spiritual companion" layer beyond transactional shopping.

Tasks:

1. design daily check-in logic,
2. add scheduler/job system,
3. generate time-zone-aware daily guidance,
4. choose delivery channels:
   - onsite inbox
   - email
   - future push or messaging channels
5. connect recurring guidance to product and ritual continuity.

Deliverables:

- daily check-in pipeline,
- user-facing saved profile and guidance flows,
- recurring guidance content generation path.

Exit criteria:

- a returning user can receive tailored daily guidance,
- recurring content uses persistent profile and recent context,
- system respects consent and timezone.

## Phase 7: Harden, Measure, and Prepare Cloud Migration

Purpose:

- prepare the integrated system for launch and scale.

Tasks:

1. add analytics for conversation-to-commerce funnel,
2. add logging and trace correlation,
3. add rate-limits, retries, and fallbacks,
4. test degraded modes,
5. move Dify and backend config toward cloud-ready deployment,
6. validate that cloud behavior matches local behavior.

Deliverables:

- launch checklist,
- observability layer,
- cloud migration plan,
- rollout controls.

Exit criteria:

- homepage is launchable on Shopify,
- agent behavior is observable and debuggable,
- cloud migration path is understood and low-risk.

## Recommended Build Order

This is the order we should actually execute:

1. Phase 0
2. Phase 1
3. Phase 2
4. Phase 3
5. Phase 4
6. Phase 5
7. Phase 6
8. Phase 7

## Why This Order

1. We already have enough agent capability to stop debating the intelligence layer.
2. The largest unknown now is the Shopify integration and homepage experience.
3. Persistence should be added after the storefront path exists, but before launch.
4. Recurring guidance should come after persistence, not before it.

## Risks To Watch

1. `UI drift`
   - risk: homepage slowly collapses into a generic chat widget.
   - mitigation: keep checking against the north-star document.

2. `Too much logic inside Dify`
   - risk: user persistence and app logic become trapped in Dify.
   - mitigation: keep memory and identity in the backend.

3. `Shopify-native constraints ignored`
   - risk: convenience leads to a quasi-headless experience that harms SEO.
   - mitigation: keep `/` rendered by Shopify and dynamic behavior inside app blocks and app proxy routes.

4. `Overbuilding the frontend too early`
   - risk: building polished surfaces before the integration contract is real.
   - mitigation: scaffold app/backend and homepage shell before heavy design polish.

## Definition of Success

This roadmap succeeds when:

1. AskCrystal remains a real Shopify storefront,
2. the homepage feels like an agent-led boutique,
3. the agent is powered by Dify but not trapped inside Dify,
4. returning users get increasingly personalized guidance,
5. the system can evolve from product recommendation into an ongoing companion experience.

## Immediate Next Step

The next build step after this roadmap should be:

`scaffold the Shopify app/backend layer and theme app extension, because that is the smallest step that unlocks real storefront integration without committing prematurely to final UI polish.`
