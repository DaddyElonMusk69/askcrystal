# AskCrystal Mobile Homepage UX Direction

## Purpose

Define the mobile-first homepage layout for AskCrystal so it balances:

- `AI spiritual guide`
- `real crystal store`

without collapsing into either:

- a generic chat app,
- or a standard ecommerce homepage with a tiny assistant.

## Core Decision

The mobile homepage should be a `guided boutique feed`, not a messenger screen.

That means:

- the page scrolls like a curated storefront,
- the guide is present immediately,
- product context appears from the first screen,
- conversation lives inside the homepage flow,
- the composer stays persistent,
- product cards appear in-flow as a natural part of the consultation.

## Design Conclusion

For mobile, AskCrystal should feel like:

- entering a small, beautiful spiritual boutique,
- being received by a guide,
- seeing a few meaningful products right away,
- then being drawn into a conversation that gradually becomes curation.

It should **not** feel like:

- opening WhatsApp,
- opening ChatGPT,
- opening Pinterest,
- opening a generic Shopify theme.

## Recommended Mobile Layout

## 1. Sticky Top Bar

Keep the top bar compact and commerce-legible.

Contents:

- brand mark
- cart
- search or browse trigger
- optional profile/sign-in later

Behavior:

- always visible
- shrinks slightly on scroll
- should read as `store navigation`, not app chrome

## 2. Receiving Hero

The first viewport should combine atmosphere + guide + immediate action.

Structure:

- strong headline
- one-sentence positioning
- guide intro card
- 3 to 4 quick-start chips
- subtle product presence below the fold

Recommended copy intent:

- “Tell us what you need today.”
- “Find a crystal, get a reading, or browse by intention.”

Important:

- the guide should be visible in the hero
- but the hero cannot be only mystical branding
- users must understand this is a shoppable place

## 3. Entry Card Stack

Immediately below the hero, use a short vertical stack of large tappable cards.

Recommended three-card model:

1. `Talk to the guide`
   - fate, reassurance, tarot, symbolism, emotional state
2. `Shop by intention`
   - love, focus, protection, abundance, grounding
3. `Browse bestsellers`
   - fast path for users already ready to shop

Why:

- this gives agency immediately
- it solves the tension between “fortune teller” and “store”
- it avoids forcing everyone into chat first

## 4. Conversation Section as Feed

The conversation should begin as part of the page, not as a separate full-screen mode.

Structure:

- assistant welcome message
- user messages
- assistant guidance
- inserted product cards
- inserted ritual cards

The conversation block should look like:

- warm
- editorial
- lightly structured

Not:

- dense chat bubbles filling the whole viewport

Recommendation:

- assistant responses should feel like generous cards or notes
- user responses can stay simpler and lighter

## 5. In-Flow Product Inserts

This is the key mobile pattern.

After 1 to 3 turns, insert product recommendations directly into the conversation flow.

Each insert should contain:

- product image
- product name
- why this item
- one practical ritual/use note
- price
- CTA

These should feel like `personal recommendations from the guide`, not generic catalog cards.

## 6. Persistent Bottom Composer

The composer should stay docked at the bottom of the viewport.

Contents:

- text field
- send action
- optional quick action icon for browse/intention picker later

Behavior:

- always available
- should not consume too much height
- should remain comfortable for thumb use

Why:

- keeps the guide “always present”
- supports quick re-entry into conversation
- prevents users from feeling lost in a long scroll

## 7. Horizontal Product Rails, Not Masonry

Use horizontal rails for product context.

Good uses:

- “Curated for you”
- “Shop by intention”
- “Popular protection stones”
- “Recently recommended”

Avoid masonry as a primary homepage pattern.

Reason:

- masonry feels discovery-first and visually noisy
- it weakens the consultation rhythm
- it makes products feel like content fragments rather than curation
- it competes with the guide for attention

Masonry could work later for:

- collection pages
- inspiration/editorial pages

But not as the main mobile homepage surface.

## 8. Ritual / Reading Inserts

Between conversation and commerce, add lightweight spiritual support cards.

Examples:

- today’s energy
- ritual suggestion
- symbolic note
- “why this crystal now”

These cards help bridge:

- advice
- identity
- product

They make the experience feel more than transactional without hiding the store.

## Best Mobile Pattern

The recommended mobile hierarchy is:

1. sticky top bar
2. receiving hero
3. entry card stack
4. active conversation feed
5. in-flow product recommendations
6. horizontal browse rails
7. persistent bottom composer

This creates the right balance:

- `fortune teller`: through the guide, ritual cards, symbolic framing
- `ecommerce store`: through visible product rails, cart access, browse pathways

## What To Avoid

## Avoid 1: Full-screen chat as the homepage

Why:

- too little store context
- too similar to generic AI apps
- harms the boutique identity

## Avoid 2: Masonry grid mixed into chat

Why:

- too visually fragmented
- reads as content discovery, not guided curation
- makes conversation feel secondary

## Avoid 3: Carousel as the main hero mechanic

Why:

- hidden content
- low scan efficiency
- feels promotional instead of intimate

Use horizontal rails for secondary merchandising, not for the core landing logic.

## Avoid 4: Product grid before any guide presence

Why:

- becomes generic crystal ecommerce
- loses the “resident spiritual companion” differentiator

## Avoid 5: Mysticism without shopping clarity

Why:

- users may think it is an astrology app, not a store
- weakens trust for actual buying behavior

## Interaction Principle

Mobile should support three immediate user modes without friction:

1. `I want guidance`
2. `I want to shop`
3. `I want both`

The layout should make all three available from the first screen.

## Visual Direction for Mobile

From current references:

- borrow from `Energy Muse`:
  - visible merchandise
  - browse legibility
  - store confidence
- borrow from `MyNaksh`:
  - calm spiritual authority
  - spaciousness
  - ceremonial feeling

AskCrystal should combine them like this:

- `store readability of Energy Muse`
- `ritual calm of MyNaksh`
- with a more intimate, conversational center

## Translation to Desktop Later

This mobile model should upscale cleanly into desktop:

- mobile conversation feed becomes a left-column consultation pane
- horizontal recommendation rails become a right-column curation shelf
- entry card stack becomes a richer hero/intent navigation zone

So the mobile structure is not a reduced version of desktop.
It is the base system.

## Final Recommendation

Use a `guided boutique feed` pattern.

If we need one sentence to guide implementation:

`Design the mobile homepage like a spiritual storefront scroll with a resident guide woven into it, not like a chat app with products attached.`
