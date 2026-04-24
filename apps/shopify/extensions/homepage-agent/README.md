# Homepage Agent Extension Scaffold

This extension now includes the first storefront-facing homepage block scaffold.

## What it does today

- renders an agent-led boutique stage inside a Shopify homepage section
- exposes quick prompts and a chat form
- calls `/apps/askcrystal/chat` when the proxy backend is available
- renders assistant messages and a recommendation shelf container

## What it does not do yet

- real Shopify theme CLI packaging and preview wiring
- real cart mutations
- real catalog search results
- streaming responses
- React bundle mounting

The current JS is intentionally lightweight so we can validate the surface and contracts before introducing the full React island build pipeline.
