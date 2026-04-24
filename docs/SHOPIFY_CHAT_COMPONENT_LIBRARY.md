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
- `display_ritual_card`
- `display_reading_summary`
- `display_collection_link`
- `display_next_steps`

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

This fallback is for bridge mode only. The long-term contract should be structured events, not text parsing.

## Component Suite

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

### `display_ritual_card`

Use when:

- the agent gives a practice or care instruction
- a product recommendation needs a ritual context
- the experience should feel more companion-like and less transactional

Core props:

- `title`
- `summary`
- `steps`
- `linkedProducts`

### `display_reading_summary`

Use when:

- the agent has diagnosed the emotional or energetic state
- we want an "Energy Blueprint" moment before commerce
- the turn needs structure and trust before the recommendation

Core props:

- `title`
- `summary`
- `energyFocus`
- `highlights`

### `display_collection_link`

Use when:

- the user wants to browse rather than decide now
- the agent wants to hand off into Shopify-native discovery
- a recommendation should open a wider intention collection

Core props:

- `title`
- `description`
- `url`
- `label`

### `display_next_steps`

Use when:

- the agent wants to keep momentum after a recommendation
- the turn should end with a small guided checklist
- there is no immediate product card but the flow should still feel active

Core props:

- `title`
- `steps`
- `closing`

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
