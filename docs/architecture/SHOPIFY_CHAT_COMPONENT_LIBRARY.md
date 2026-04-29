# AskCrystal Chat Component Library

## Goal

Give the homepage assistant a safe, native way to render storefront UI inside the conversation without asking the model to invent HTML.

For the Dify-side architecture that should produce these components, see:

- `docs/DIFY_STOREFRONT_COMPONENT_ARCHITECTURE.md`

The right primitive for this theme is:

1. Dify decides **when** a storefront surface is useful.
2. The Shopify proxy validates and hydrates that surface into canonical Shopify data.
3. The theme renders it as an allowlisted `assistant-ui` tool UI component.

This keeps the model in charge of guidance while the storefront stays in charge of presentation.

## Why `assistant-ui` Tool UI Is The Best Fit

`assistant-ui` already has first-class rendering for message parts of type `tool-call`, plus a component registry keyed by tool name. That means we do not need to fake cards inside markdown or invent a parallel message system.

Our frontend should treat rich storefront surfaces as completed tool-call parts:

- `display_product_card`
- `display_product_carousel`

Each tool-call part carries normalized result data. The frontend picks the renderer from the allowlist and displays it inline with the assistant's text.

## Primary Contract

Preferred backend payload:

```json
{
  "type": "component",
  "component": "product_card",
  "id": "sleep-card-1",
  "props": {
    "eyebrow": "Prescription",
    "reason": "Chosen for quieter evenings and gentler nervous-system support.",
    "product": {
      "id": "gid://shopify/Product/123",
      "title": "Amethyst Pendant",
      "url": "/products/amethyst-pendant",
      "image": "https://cdn.shopify.com/...",
      "price": "$48",
      "badge": "Calm"
    }
  }
}
```

The proxy or theme converts that into an `assistant-ui` tool-call part:

```json
{
  "type": "tool-call",
  "toolCallId": "sleep-card-1",
  "toolName": "display_product_card",
  "args": {
    "component": "product_card",
    "version": 1,
    "props": {
      "...": "..."
    }
  },
  "result": {
    "component": "product_card",
    "version": 1,
    "props": {
      "...": "..."
    }
  }
}
```

## Streaming Recommendations

Preferred live path:

1. Dify tool or workflow node returns structured JSON.
2. Shopify proxy hydrates product ids, urls, prices, and images from Shopify.
3. Proxy emits:
   - `delta` / `replace` events for answer text
   - `component` events for storefront UI payloads
   - `complete` event with final answer and optional component payload replay

This lets cards appear during the turn instead of only at the end.

## Temporary Compatibility Fallback

If Dify cannot yet emit dedicated component events, use a temporary inline manifest inside the final answer:

````md
You sound overstimulated, so I would begin with something gentler and easier to return to tonight.

```askcrystal-ui
{
  "components": [
    {
      "component": "product_card",
      "id": "sleep-card-1",
      "props": {
        "product": {
          "title": "Amethyst Pendant",
          "url": "/products/amethyst-pendant",
          "price": "$48"
        },
        "reason": "Chosen for calmer evenings."
      }
    }
  ]
}
```
````

The theme now strips this block from visible copy, parses the JSON, validates the component, and renders it safely.

For the current live AskCrystal `agent-chat` bridge, the Shopify proxy also reads this inline manifest, hydrates `product_ref` / `collection_ref` into canonical Shopify payloads, and re-emits them as standard `component` SSE events so the Horizon theme still receives the same render contract as the structured-event path.

This fallback is for bridge mode only. The long-term contract should be structured events, not text parsing.

## Component Suite

V1 intentionally exposes only product-focused components to the model. Reading
summaries, rituals, next steps, and browse prompts should be normal assistant
prose or native storefront/navigation UI, not additional model-selected cards.

### `display_product_card`

Use when:

- the agent has one strongest match
- the user sounds ready to click through
- a single recommendation will convert better than a shelf

Core props:

- `product`
- `reason`
- `note`
- `ctaLabel`

### `display_product_carousel`

Use when:

- the agent wants to show 2–4 options
- the user is still browsing or comparing
- one intention maps to multiple valid stones

Core props:

- `title`
- `reason`
- `products`
- `browseUrl`

## Dify Guidance

Dify should not fabricate component names or frontend markup.

The recommended long-term Dify path is:

- a `chatflow` main app,
- a reusable workflow tool named `build_storefront_components`,
- a lightweight component-intent schema on the Dify side,
- Shopify proxy hydration into this frontend render contract.

That workflow tool should return structured component intents, not final storefront cards. The proxy can then:

1. reject unknown component names
2. re-hydrate Shopify product data
3. emit safe component payloads to the theme

If the team needs a short-term bridge before that chatflow migration lands, per-component Dify tools are still acceptable temporarily, but they should emit the same intent schema rather than inventing a separate payload shape.

The full Dify-native design is documented separately:

- `docs/DIFY_STOREFRONT_COMPONENT_ARCHITECTURE.md`

## Rules

- Never render raw model HTML.
- Treat model-provided price, inventory, and URL fields as hints, not source of truth.
- Keep component names allowlisted.
- Keep cart and checkout actions server-mediated.
- Prefer text + component together, not component-only, unless the UI is self-explanatory.
