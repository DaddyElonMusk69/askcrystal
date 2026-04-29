# AskCrystal Shopify Identity Bridge Design

## Purpose

AskCrystal needs a durable bridge between Shopify customer identity, storefront chat sessions, Dify conversations, future memory, and future membership entitlements.

This bridge is foundational for:

- cross-device chat history,
- personalized returning-user experiences,
- long-term user memory,
- product upsells based on known intent and purchases,
- paid membership access,
- safe subscription gating,
- keeping all customer-sensitive state under our control instead of inside Dify.

## Core Decision

Shopify, AskCrystal, and Dify should have separate responsibilities.

| System | Responsibility |
| --- | --- |
| Shopify | Commerce identity, customer accounts, orders, products, checkout, subscription purchases |
| AskCrystal Shopify app/proxy | Identity resolution, session persistence, message ownership, memory, entitlements, Dify orchestration |
| Dify | Agent execution, tool orchestration, short-term conversation continuation |

Dify must not be the source of truth for customer identity or long-term memory. It receives a stable `user` key and optional `conversation_id`, but those values are derived from AskCrystal's own persistence layer.

## Current State

The storefront currently creates a browser session ID in localStorage and sends it to the proxy with each chat request.

Current simplified flow:

```text
Browser localStorage sessionId
  -> POST /apps/askcrystal/chat/stream
  -> Shopify proxy derives userId from body.customer.id or body.sessionId
  -> Dify receives user + conversation_id
```

This works for prototype continuity, but it is not safe enough for customer identity, membership access, or durable personalization.

The weak point is that customer identity can be sent from the browser body. A browser-provided `customer.id` is forgeable and cannot be used for paid access or permanent memory ownership.

## Target State

The AskCrystal Shopify app/proxy becomes the identity gateway.

Target simplified flow:

```text
Storefront
  -> /apps/askcrystal/identity/bootstrap
  -> Shopify App Proxy signed request
  -> AskCrystal validates signature
  -> AskCrystal resolves guest or Shopify customer
  -> AskCrystal returns owned thread/session metadata

Storefront chat
  -> /apps/askcrystal/chat/stream with threadId
  -> AskCrystal resolves identity again
  -> AskCrystal verifies thread ownership
  -> AskCrystal loads Dify mapping and optional context
  -> Dify receives stable user + conversation_id
  -> AskCrystal persists response and metadata
```

## Trust Boundaries

### Trusted

- Shopify App Proxy signed query parameters after signature validation.
- Shopify Admin API responses from the backend.
- Server-side database records created by the AskCrystal app.
- Server-issued guest tokens and thread IDs after lookup.

### Not Trusted

- `customer.id` sent in JSON request body.
- email/name/customer data rendered into JavaScript and posted back.
- localStorage as proof of customer identity.
- frontend-only membership flags.
- Dify conversation ownership as proof of Shopify customer ownership.

## Shopify Customer Identity

When requests arrive through Shopify App Proxy, Shopify can include signed request parameters such as:

- `shop`
- `timestamp`
- `path_prefix`
- `logged_in_customer_id` when the customer is logged in
- `signature`

The proxy must validate the request signature before using any customer-related parameter.

For local development, `SHOPIFY_PROXY_SIGNATURE_REQUIRED=false` can continue to bypass signature checks. Production must require signature validation.

Liquid `customer.id` can still be useful for UI hints, but it should never be used as the backend authority.

## Identity Model

AskCrystal should model one canonical internal user that can be anonymous first and linked to Shopify later.

### Guest visitor

A guest visitor has:

- a server-known guest session,
- a browser-held guest token,
- zero or more chat threads,
- no trusted Shopify customer ID yet.

### Logged-in Shopify customer

A logged-in customer has:

- `shop_id`,
- `shopify_customer_id`,
- internal `askcrystal_user_id`,
- linked guest sessions after login,
- durable chat threads,
- future memory records,
- future entitlement records.

### Stable Dify user key

Dify should receive a non-PII key:

```text
askcrystal_user_<opaque_hash_or_uuid>
```

Do not send raw Shopify customer IDs, emails, names, or phone numbers as Dify `user`.

## Data Model

Production should use Postgres through `ASKCRYSTAL_MEMORY_DATABASE_URL`.

The first implementation can be adapter-based so local development can use a lightweight store if needed, but the schema should be production-shaped from the start.

### shops

Stores Shopify installation/shop context.

```sql
shops (
  id uuid primary key,
  shop_domain text not null unique,
  shopify_shop_id text,
  installed_at timestamptz,
  updated_at timestamptz
)
```

### askcrystal_users

Canonical AskCrystal identity.

```sql
askcrystal_users (
  id uuid primary key,
  shop_id uuid not null references shops(id),
  dify_user_key text not null unique,
  default_locale text,
  default_timezone text,
  created_at timestamptz not null,
  updated_at timestamptz not null,
  last_seen_at timestamptz
)
```

### user_identities

Links AskCrystal users to external identities.

```sql
user_identities (
  id uuid primary key,
  user_id uuid not null references askcrystal_users(id),
  shop_id uuid not null references shops(id),
  provider text not null,
  provider_subject text not null,
  verified_at timestamptz not null,
  created_at timestamptz not null,
  unique (shop_id, provider, provider_subject)
)
```

For Shopify customers:

```text
provider = "shopify_customer"
provider_subject = logged_in_customer_id
```

### guest_sessions

Tracks anonymous browsing sessions.

```sql
guest_sessions (
  id uuid primary key,
  shop_id uuid not null references shops(id),
  user_id uuid references askcrystal_users(id),
  guest_token_hash text not null unique,
  first_seen_at timestamptz not null,
  last_seen_at timestamptz not null,
  merged_into_user_id uuid references askcrystal_users(id),
  merged_at timestamptz
)
```

The browser stores only the raw guest token. The database stores a hash.

### conversation_threads

One visible chat session in the drawer.

```sql
conversation_threads (
  id uuid primary key,
  shop_id uuid not null references shops(id),
  owner_user_id uuid references askcrystal_users(id),
  guest_session_id uuid references guest_sessions(id),
  storefront_session_id text,
  title text,
  dify_user_key text not null,
  dify_conversation_id text,
  status text not null default 'active',
  created_at timestamptz not null,
  updated_at timestamptz not null,
  last_active_at timestamptz,
  last_message_preview text,
  last_summary_snapshot text
)
```

Important: store `dify_user_key` per thread. Dify conversations are scoped to a Dify user key, so a thread created as a guest may need to keep using the original Dify key even after it is linked to a logged-in customer.

### chat_messages

Local message snapshots for history, audit, migration, and future memory extraction.

```sql
chat_messages (
  id uuid primary key,
  thread_id uuid not null references conversation_threads(id),
  role text not null,
  content_text text,
  components_json jsonb,
  suggestions_json jsonb,
  dify_message_id text,
  dify_task_id text,
  metadata_json jsonb,
  created_at timestamptz not null
)
```

### entitlements

Membership/subscription access state.

```sql
entitlements (
  id uuid primary key,
  shop_id uuid not null references shops(id),
  user_id uuid not null references askcrystal_users(id),
  source text not null,
  status text not null,
  tier text not null,
  shopify_customer_id text,
  shopify_product_id text,
  shopify_variant_id text,
  shopify_order_id text,
  shopify_subscription_contract_id text,
  starts_at timestamptz,
  ends_at timestamptz,
  renewed_at timestamptz,
  created_at timestamptz not null,
  updated_at timestamptz not null
)
```

Entitlements are enforced by the proxy before calling Dify. The frontend can display access state, but it must not enforce access by itself.

### identity_merge_events

Audit log for guest-to-customer linking.

```sql
identity_merge_events (
  id uuid primary key,
  shop_id uuid not null references shops(id),
  guest_session_id uuid references guest_sessions(id),
  source_user_id uuid references askcrystal_users(id),
  target_user_id uuid references askcrystal_users(id),
  strategy text not null,
  metadata_json jsonb,
  created_at timestamptz not null
)
```

## API Surface

### GET /apps/askcrystal/identity/bootstrap

Called when the chat UI loads.

Responsibilities:

- validate Shopify App Proxy signature,
- resolve `shop`,
- resolve logged-in customer if present,
- create or update guest session,
- link guest to customer when applicable,
- return visible threads for the drawer,
- return current entitlement summary,
- return privacy/memory flags later.

Response shape:

```json
{
  "ok": true,
  "identity": {
    "mode": "customer",
    "guestSessionId": "gst_...",
    "userId": "usr_...",
    "customerLinked": true
  },
  "threads": [
    {
      "id": "thr_...",
      "title": "Sleep and calm",
      "updatedAt": "2026-04-27T10:00:00.000Z",
      "lastMessagePreview": "Try amethyst by the bedside..."
    }
  ],
  "activeThreadId": "thr_...",
  "entitlements": {
    "tier": "free",
    "status": "active",
    "premiumReadingsRemaining": 0
  }
}
```

### POST /apps/askcrystal/threads

Creates a new server-side chat thread.

Request:

```json
{
  "title": "New reading"
}
```

Response:

```json
{
  "ok": true,
  "thread": {
    "id": "thr_...",
    "title": "New reading",
    "difyConversationId": null
  }
}
```

### GET /apps/askcrystal/threads

Lists threads owned by the resolved identity.

### GET /apps/askcrystal/threads/:threadId/messages

Loads locally persisted message snapshots for a selected thread.

### POST /apps/askcrystal/chat/stream

Existing chat stream endpoint, upgraded to resolve identity server-side.

Request should move toward:

```json
{
  "threadId": "thr_...",
  "message": "What crystal should I use for sleep tonight?"
}
```

The proxy should ignore any browser-provided customer object.

## Chat Request Flow

```text
1. Storefront sends message + threadId.
2. Proxy validates App Proxy request or local dev bypass.
3. Proxy resolves shop.
4. Proxy resolves current identity:
   - customer if signed logged_in_customer_id exists
   - guest otherwise
5. Proxy loads thread by threadId.
6. Proxy checks the thread belongs to this identity or a linked guest session.
7. Proxy loads entitlement state.
8. Proxy loads memory context later.
9. Proxy calls Dify:
   - user = thread.dify_user_key
   - conversation_id = thread.dify_conversation_id
   - inputs.memory_context = later
   - inputs.entitlement_context = later
10. Proxy streams safe status events to the frontend.
11. Proxy receives final answer, components, suggestions, Dify IDs.
12. Proxy persists user and assistant messages locally.
13. Proxy updates thread.dify_conversation_id if Dify returns one.
14. Proxy returns final answer to the frontend.
```

## Dify Mapping Rules

### Rule 1: Dify user key is not customer identity

Dify `user` is an execution key only. AskCrystal owns the real identity mapping.

### Rule 2: Dify conversation ID belongs to a thread

Each visible chat thread maps to at most one Dify `conversation_id`.

### Rule 3: Thread ownership is checked before every Dify call

Never trust a frontend-provided `conversationId`. The frontend should eventually stop sending it entirely. It should send `threadId`, and the proxy should look up the matching Dify conversation.

### Rule 4: Guest-to-customer merge does not blindly rewrite Dify state

Dify may not support changing the owner of an existing conversation. We should preserve thread continuity by storing the original `dify_user_key` on the thread.

If we later need all logged-in customer threads under one Dify user key, migrate through summary:

```text
old guest Dify conversation
  -> local message snapshots
  -> conversation summary
  -> new customer Dify conversation seeded with summary
```

That migration can be a later optimization, not the first implementation.

## Guest-To-Customer Linking

When a guest logs in:

```text
1. Bootstrap request arrives with signed logged_in_customer_id.
2. Proxy finds or creates customer-linked askcrystal_user.
3. Proxy finds current guest session from guest token.
4. Proxy links guest threads to the customer user.
5. Proxy marks the guest session as merged.
6. Proxy records identity_merge_events.
7. Frontend drawer now shows the combined customer-owned threads.
```

Conflict policy:

- If guest threads exist and customer threads exist, show both sorted by recent activity.
- Do not delete guest history.
- Do not overwrite thread titles unless empty.
- Keep per-thread `dify_user_key` stable.

## Membership And Upsell Path

Membership state should be represented as entitlements in the AskCrystal backend.

Potential Shopify sources:

- customer tags,
- paid membership product purchase,
- Shopify subscription contract,
- order webhook,
- subscription app webhook,
- Admin API lookup.

Initial enforcement pattern:

```text
Chat request
  -> resolve identity
  -> load entitlements
  -> determine allowed capabilities
  -> pass safe tier context to Dify
  -> block or downgrade premium-only flows in proxy
```

Example safe Dify input:

```json
{
  "entitlement_context": {
    "tier": "free",
    "premium_readings_remaining": 0,
    "can_use_deep_astrology": false
  }
}
```

Dify can use this to phrase upsells, but the proxy must enforce access.

## Memory Path Later

Memory should come after identity and session persistence are stable.

First memory integration:

```text
Proxy loads profile summary and selected memory records
  -> sends concise memory_context to Dify inputs
  -> Dify personalizes response
  -> proxy stores message snapshots
  -> async memory extraction updates AskCrystal database
```

Do not let Dify write permanent memory directly until we have a reviewable memory policy and deletion/edit UI.

## Frontend Changes

The storefront should move from local-only sessions to server-owned sessions.

Phase 1 compatibility:

- keep localStorage guest token,
- call identity bootstrap on chat load,
- hydrate drawer from server threads when available,
- keep localStorage as fallback if backend is unavailable.

Phase 2:

- thread create/select/load uses proxy endpoints,
- frontend sends `threadId` instead of `conversationId`,
- frontend stops persisting full chat history locally except cache/fallback.

Phase 3:

- account-aware drawer:
  - show saved sessions when logged in,
  - show local guest sessions when anonymous,
  - merge automatically after login.

## Backend Changes

### Identity resolver module

Add a server module with a single high-level call:

```js
const identity = await resolveAskCrystalIdentity(req, {
  guestToken,
})
```

It should return:

```js
{
  shop,
  mode: 'guest' | 'customer',
  user,
  guestSession,
  shopifyCustomerId,
  entitlements
}
```

### Persistence module

Add a storage adapter around:

- shops,
- users,
- identities,
- guest sessions,
- threads,
- messages,
- entitlements.

Avoid scattering SQL inside route handlers.

### Chat route changes

Update chat validation to:

- require `message`,
- accept `threadId`,
- ignore `body.customer`,
- resolve identity from request context,
- load/authorize thread server-side,
- call Dify with thread-owned `dify_user_key`,
- persist messages and Dify metadata after completion.

## Security Requirements

- Production must set `SHOPIFY_PROXY_SIGNATURE_REQUIRED=true`.
- Production must set `SHOPIFY_API_SECRET`.
- The proxy must reject unsigned or invalid App Proxy requests.
- The proxy must never trust customer IDs in request JSON.
- Dify API keys must remain server-side only.
- Entitlement checks must happen server-side before premium tool execution.
- PII should not be sent to Dify unless explicitly needed and consented.
- Guest token database values should be hashed.
- Thread access must be checked on every read, write, and stream call.

## Observability

Add structured logs for:

- identity mode,
- shop domain,
- user ID hash or internal ID,
- thread ID,
- Dify conversation ID presence,
- entitlement tier,
- stream latency,
- Dify task ID,
- error category.

Do not log full user message content in production by default.

## Implementation Phases

### Phase 1: Identity bootstrap and server-owned threads

Goal:

- make sessions/history server-owned without memory yet.

Tasks:

- add persistence adapter,
- add identity resolver,
- add `GET /identity/bootstrap`,
- add thread list/create/message endpoints,
- update chat route to accept `threadId`,
- persist message snapshots,
- keep frontend localStorage fallback.

### Phase 2: Customer linking

Goal:

- logged-in Shopify customer gets durable cross-device sessions.

Tasks:

- use signed `logged_in_customer_id`,
- create `user_identities` records,
- merge guest session into customer,
- show merged sessions in drawer.

### Phase 3: Entitlements

Goal:

- support paid membership and premium gates.

Tasks:

- add entitlement lookup,
- sync from Shopify customer/order/subscription source,
- gate premium readings in proxy,
- pass safe entitlement context to Dify,
- add upsell components later.

### Phase 4: Memory

Goal:

- personalize across sessions.

Tasks:

- add profile/memory tables,
- build memory extraction job,
- inject concise `memory_context`,
- add user-facing memory controls.

## First Coding Slice Recommendation

Build Phase 1 first.

The smallest useful slice is:

1. Create persistence adapter with tables for shops, users, guest sessions, threads, and messages.
2. Add `GET /apps/askcrystal/identity/bootstrap`.
3. Add `POST /apps/askcrystal/threads`.
4. Update `POST /apps/askcrystal/chat/stream` to use `threadId` and server-owned Dify mapping.
5. Update the mobile drawer to hydrate sessions from bootstrap while preserving current local fallback.

This gives us the backbone for identity, history, customer linking, entitlements, and memory without overbuilding all of them at once.

## Open Decisions

1. Production database provider:
   - likely Postgres, using `ASKCRYSTAL_MEMORY_DATABASE_URL`.
2. Local database strategy:
   - Postgres through Docker, or SQLite/file adapter for easier local dev.
3. Membership source:
   - Shopify customer tag, membership product, subscription contract, or third-party subscription app.
4. Guest token transport:
   - localStorage in the first pass, HTTP-only cookie later if the app proxy path supports it cleanly.
5. Dify conversation migration:
   - keep original thread-level Dify key initially, summarize and migrate later only if needed.

## Non-Goals For The First Slice

- No long-term memory extraction yet.
- No paid subscription enforcement yet.
- No Dify prompt redesign unless needed for identity context.
- No customer account UI rebuild.
- No forced login before first chat.

## References

- Existing architecture doc: `docs/architecture/USER_MEMORY_AND_PERSISTENCE_ARCHITECTURE.md`
- Existing roadmap: `docs/roadmaps/INTEGRATED_SHOPIFY_AGENT_ROADMAP.md`
- Shopify app proxy auth: `https://shopify.dev/docs/apps/build/online-store/app-proxies/authenticate-app-proxies`
- Shopify Liquid customer object: `https://shopify.dev/docs/api/liquid/objects/customer`
- Dify chat API: `https://docs.dify.ai/api-reference/chats/send-chat-message`
