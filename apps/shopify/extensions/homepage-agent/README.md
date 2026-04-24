# Homepage Agent Extension Scaffold

This extension now includes the first storefront-facing homepage block scaffold.

## What it does today

- renders an agent-led boutique stage inside a Shopify homepage section
- exposes quick prompts and a chat form
- streams responses from `/apps/askcrystal/chat/stream`
- renders assistant text deltas inline in the native storefront stage
- renders storefront chat components such as `reading_summary`, `product_card`, `ritual_card`, `product_carousel`, `collection_link`, and `next_steps`
- keeps the first-turn experience native instead of immediately switching to the embedded Dify UI

## What it does not do yet

- real Shopify theme CLI packaging and preview wiring
- real cart mutations
- real catalog search results
- React bundle mounting

The current JS is intentionally lightweight so we can validate the surface and contracts before introducing the full React island build pipeline.
