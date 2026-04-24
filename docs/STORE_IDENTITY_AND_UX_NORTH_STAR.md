# AskCrystal Store Identity and UX North Star

## Core Product Definition

AskCrystal is not a chatbot layered onto a store, and it is not a fate-telling app that happens to sell products.

AskCrystal is an AI-first spiritual crystal boutique where the resident guide is a commerce-aware spiritual companion.

This means:

- users should immediately understand they are inside a store,
- the experience should feel guided and intimate rather than transactional,
- the AI should behave like an in-store companion, not a floating support widget,
- product recommendation should feel like care and curation, not upsell pressure.

## Category Decision

We choose:

- `commerce-first identity`
- `guided diagnosis flow`

In practice, this means the business is presented as a crystal store with spiritual services built into the shopping journey.

We do not choose:

- a pure astrology/tarot app that later introduces products,
- a generic Shopify storefront with a small chat bubble assistant.

## Positioning Statement

AskCrystal is an AI-guided crystal store where users can be received, understood, and matched with products through a conversation that feels like meeting a trusted spiritual shopkeeper.

## Experience Thesis

The closest real-world analog is not a SaaS chatbot and not a mass-market ecommerce homepage.

The closest analog is:

- entering a well-curated crystal boutique,
- being welcomed by a knowledgeable guide,
- sharing what is going on in your life,
- receiving both interpretation and product guidance,
- leaving with an item, a ritual, and a sense of being cared for.

## UX Principles

1. The store must be visible from the first screen.
   Users should see that products, collections, and cart all exist without having to discover them through conversation.

2. The guide must feel present from the first screen.
   The AI should feel like the host of the store, not a secondary support mechanism.

3. Conversation should shape commerce, not replace it.
   The AI is how users get orientation and confidence. The storefront still needs browseable surfaces and visual merchandising.

4. Recommendations should arrive naturally.
   Product cards should appear after enough understanding has been built, but before the interaction starts to feel like endless intake.

5. The interface should feel like a boutique, not a dashboard.
   Avoid empty chat-canvas layouts, support-center patterns, or enterprise assistant UI conventions.

6. The user should always retain agency.
   They can talk, browse, compare, shop directly, or ask for spiritual interpretation at any time.

## Explicit UI Decision

The homepage should not be a lone chat bubble or a blank full-screen messenger UI.

Instead, the homepage should be a `storefront stage` with three things visible at once:

- a strong sense of brand and atmosphere,
- a living guide-led conversation surface,
- curated merchandise context.

## Recommended Homepage Model

## Desktop

Use a composed storefront layout rather than a single chat column.

Recommended structure:

1. `Top navigation`
   - Brand
   - Shop All
   - Collections or Intentions
   - Search
   - Cart

2. `Hero / Receiving stage`
   - Large branded environment
   - Guide intro
   - Quick-start intentions
   - Strong first interaction prompt

3. `Conversation and curation zone`
   - Primary conversation pane
   - Adjacent contextual product rail or recommendation shelf
   - Space for rituals, symbols, or reasoning chips

4. `Browseable store surfaces`
   - Featured collections by intention
   - Bestsellers / rituals / bundles
   - Social proof or editorial trust modules

## Mobile

Mobile should keep the same identity, but stack it more tightly:

1. atmospheric hero,
2. quick-start prompts,
3. active conversation thread,
4. in-flow product cards,
5. persistent composer,
6. easy access to cart and browsing.

The mobile experience should feel like a guided scrollable boutique, not a cramped messaging app.

## Interaction Model

The guide should support three parallel entry modes:

1. `Talk to the guide`
   For users who want diagnosis, reassurance, tarot, or interpretation.

2. `Browse the store`
   For users who already know they want products.

3. `Move between both`
   The ideal flow: start with conversation, continue with curated shopping, return to the guide for confidence.

## What The UI Must Communicate

At a glance, the homepage should communicate:

- this is a real store,
- this store is spiritually guided,
- the guide is available immediately,
- the products are part of a larger ritual and self-reflection experience.

## What To Avoid

Avoid these patterns:

- floating customer support bubble,
- blank chat-first canvas with no merchandise context,
- generic Shopify hero with a tiny AI badge,
- astrology app UI that hides store functions until late,
- overly mystical interface that obscures shopping actions,
- overly commercial interface that makes the spiritual layer feel fake.

## Commerce Behavior Principles

1. The agent should not recommend too early.
   One to three turns of context-building is usually enough before early curation begins.

2. The agent should not recommend too late.
   If the user has already shared intention, emotional state, or desired outcome, the store should begin showing relevant products.

3. Product presentation should feel editorial and personal.
   Each card should answer:
   - why this item,
   - why now,
   - how to use it.

4. Store browsing should remain first-class.
   The user should never feel trapped inside a conversation to access inventory.

## Voice of the Guide

The guide is:

- warm,
- grounded,
- gently insightful,
- commerce-aware,
- never pushy,
- never purely mystical,
- never purely transactional.

The guide is best understood as `resident companion + curator`.

## Design Implications

This product should visually borrow more from:

- boutique retail,
- editorial wellness brands,
- intimate hospitality,
- guided ritual spaces.

It should borrow less from:

- chat apps,
- support centers,
- AI copilots,
- SaaS dashboards.

## North Star Test

A homepage concept is on-strategy if a user can truthfully say:

"I feel like I walked into a beautiful crystal store where someone is already there to receive me."

A homepage concept is off-strategy if a user can truthfully say:

"This looks like a chatbot pasted onto a store."

## Design Consequence For The Next Phase

The next frontend milestone should not be "add chat to homepage."

The next frontend milestone should be:

`design and build an agent-led boutique storefront homepage with integrated conversation, merchandising, and cart pathways.`
