# AskCrystal User Memory and Persistence Architecture

## Goal

Design user persistence so AskCrystal can become more personalized over time without making Dify the system of record for customer identity or long-term memory.

This architecture must support:

- user registration and login,
- persistent cross-session personalization,
- long-term spiritual and commerce preferences,
- conversation continuity,
- daily check-ins and recurring guidance,
- product recommendations that improve over time.

## Core Decision

User persistence should not live primarily in Dify.

Instead:

1. `Shopify` is the identity and commerce system of record.
2. `AskCrystal backend database` is the long-term memory and user profile system of record.
3. `Dify` is the orchestration and generation layer that consumes memory context during each interaction.

## Why Not Use Dify As Primary Memory

Dify is strong at:

- orchestrating agent responses,
- managing conversation context,
- calling tools,
- using RAG,
- continuing a given conversation thread.

But it is not the right primary home for:

- customer identity,
- cross-session user profile state,
- durable structured memory,
- recurring automation scheduling,
- product affinity history,
- lifecycle CRM-style logic.

Dify should be treated as `memory consumer`, not `memory source of truth`.

## System Responsibilities

## Shopify

Owns:

- customer account identity,
- authentication state,
- customer IDs,
- orders,
- cart,
- product and catalog data.

Primary key recommendation:

- `shop_id + customer_id`

## AskCrystal Backend

Owns:

- user profile,
- memory extraction and storage,
- guest-to-user merge logic,
- conversation mapping,
- recurring guidance jobs,
- observability and audit trails,
- agent context assembly before calling Dify.

## Dify

Owns:

- live conversation orchestration,
- tool execution,
- response generation,
- short- to medium-range conversation continuity through `conversation_id`,
- skill and knowledge use.

## Identity Model

Use two identity modes:

1. `Guest session`
   - temporary ID stored in first-party cookie or session token
   - supports anonymous browsing and early conversation continuity

2. `Registered customer`
   - linked to Shopify customer account
   - durable profile and memory owner

When a guest registers or logs in:

- merge guest conversation history and extracted preferences into the customer profile,
- attach the active conversation mapping to the customer record,
- preserve continuity rather than starting over.

## Persistence Layers

## 1) Conversation persistence

Purpose:

- keep continuity within and across related chat sessions.

Recommended stored fields:

- internal conversation record ID,
- user ID,
- Dify `conversation_id`,
- storefront session ID,
- last active timestamp,
- conversation status,
- last summary snapshot.

## 2) Structured user profile

Purpose:

- hold durable user traits and preferences.

Recommended fields:

- account basics:
  - name
  - email
  - locale
  - timezone
- spiritual profile:
  - birth date
  - birth time
  - birth place
  - preferred systems (tarot, bazi, astrology, crystals)
- product preferences:
  - preferred form factor
  - preferred stones
  - disliked stones
  - budget band
  - metal/material preferences
- behavioral profile:
  - primary intentions
  - recurring concerns
  - ritual style
  - buying readiness level

## 3) Memory records

Purpose:

- store extracted facts and higher-signal user learnings over time.

Recommended record shape:

- `id`
- `user_id`
- `type`
- `key`
- `value`
- `confidence`
- `source`
- `created_at`
- `last_confirmed_at`

Example memory types:

- `preference`
- `concern`
- `ritual_style`
- `allergy_or_material_avoidance`
- `product_affinity`
- `spiritual_interest`
- `life_context`

## 4) Long-term summary

Purpose:

- give Dify a concise user snapshot without replaying all historical messages.

Recommended fields:

- `profile_summary_short`
- `profile_summary_full`
- `current_focus`
- `last_updated_at`

This summary should be regenerated periodically or after important conversations.

## Interaction Flow

For each user message:

1. Storefront UI sends request to AskCrystal backend.
2. Backend resolves identity:
   - guest session or logged-in customer.
3. Backend loads:
   - user profile,
   - relevant memories,
   - recent conversation summary,
   - active Dify `conversation_id` if available.
4. Backend assembles context package.
5. Backend calls Dify with:
   - user identifier,
   - current input,
   - conversation ID,
   - injected memory context.
6. Dify generates response and uses tools.
7. Backend stores:
   - request/response trace,
   - updated conversation mapping,
   - extracted memory candidates.
8. Memory extraction pipeline updates user profile and summaries.

## Memory Write-Back Pipeline

After each meaningful interaction, run a write-back step.

This step should:

1. inspect the latest user and assistant messages,
2. detect durable information worth remembering,
3. normalize it into structured memory records,
4. update profile summary fields,
5. avoid saving low-signal noise.

Examples of good memory writes:

- preferred product form factor,
- budget range,
- recurring emotional theme,
- crystal preferences,
- recurring spiritual modality,
- birthday or birth details,
- "do not recommend" constraints.

Examples of bad memory writes:

- one-off casual wording,
- repeated generic emotions with no signal,
- every single question asked,
- speculative inferences presented as facts.

## How Memory Reaches Dify

Preferred pattern:

1. AskCrystal backend assembles memory context before Dify call.
2. Dify receives a concise, structured memory payload.
3. Dify uses this as part of prompt context or through a dedicated memory/profile tool.

Two acceptable implementation approaches:

## Approach A: Prompt injection

Backend sends a memory block alongside each message.

Good for:

- speed,
- simple first implementation,
- limited profile size.

## Approach B: Memory tool

Backend exposes a tool such as:

- `get_user_profile`
- `get_user_memory`
- `get_today_guidance_context`

Dify calls these tools when needed.

Good for:

- larger profiles,
- modularity,
- better separation of concerns,
- easier future upgrades.

Recommended path:

- start with `Approach A`,
- move to `Approach B` once the profile model grows.

## Daily Check-In Architecture

Daily guidance should not be scheduled inside Dify as the primary system.

Instead:

1. scheduler runs in AskCrystal backend,
2. user timezone determines send window,
3. backend loads user profile and memory,
4. backend assembles today's context,
5. backend calls Dify to generate the check-in,
6. result is delivered through site inbox, email, or future push channels.

Daily context can include:

- current date and timezone,
- recent user focus,
- active intentions,
- astrology or divination inputs,
- recent purchases,
- outstanding rituals or care tasks.

## Registration Strategy

We want registration early, but not in a way that damages initial engagement.

Recommended approach:

1. allow first interaction as guest,
2. establish value in the first few turns,
3. introduce sign-up when the user wants persistence:
   - save my reading,
   - get daily check-ins,
   - keep my energy profile,
   - receive weekly guidance.

This is usually better than forcing account creation before first contact.

If the business later decides that registration must happen immediately, the architecture still holds.

## Suggested Data Model

Minimum tables:

1. `users`
2. `guest_sessions`
3. `conversation_threads`
4. `memory_records`
5. `user_profile_snapshots`
6. `daily_guidance_jobs`
7. `daily_guidance_messages`

## Privacy and Trust Requirements

Because this product handles emotional and spiritual context, we should treat memory carefully.

Requirements:

1. users should be able to understand that memory improves personalization,
2. users should be able to edit or clear saved profile data,
3. highly sensitive details should be minimized,
4. profile summaries should avoid medical or legal framing,
5. recurring guidance should respect timezone and consent settings.

## Final Rule

Identity and long-term memory belong to Shopify + AskCrystal backend.

Dify should use memory, not own it.

## Recommended Build Sequence

1. implement identity resolution:
   - guest session
   - logged-in Shopify customer
2. create conversation mapping table:
   - user <-> Dify conversation
3. add basic profile summary storage
4. add post-chat memory extraction
5. inject memory into Dify calls
6. add daily check-in scheduler
7. add memory management UI later
