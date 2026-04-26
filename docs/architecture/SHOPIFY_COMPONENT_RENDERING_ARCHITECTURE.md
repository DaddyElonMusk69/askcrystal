# Shopify Component Rendering Architecture

## Goal

AskCrystal should eventually answer with both guidance text and native storefront UI, such as product cards, product carousels, ritual kits, comparison shelves, or checkout-oriented CTAs. The model should not directly write arbitrary frontend markup. It should request one of our allowlisted components with structured props, and the Shopify theme should render that component safely.

For the Dify-native architecture that should produce those structured props, see:

- `docs/DIFY_STOREFRONT_COMPONENT_ARCHITECTURE.md`

## Core Principle

The agent does not call the browser. The agent calls tools or emits structured UI intents. Our backend validates, hydrates, and forwards those intents. The Shopify theme renders only components from our approved component library.

## Recommended Flow

1. User asks AskCrystal for guidance.
2. Dify agent reasons over the request, RAG, mythology skills, and Shopify tools.
3. When a storefront surface is useful, Dify emits a structured component intent through the standard component-builder path.
4. The Shopify app proxy validates the request, fetches trusted Shopify data, and returns a normalized component payload.
5. The Dify answer stream includes text deltas plus component events.
6. The theme receives the stream and renders text with Markdown plus component payloads using local React components.

## Component Payload Shape

```json
{
  "type": "component",
  "component": "product_carousel",
  "id": "rec_sleep_calm_001",
  "props": {
    "title": "Crystals for sleep and calm",
    "reason": "Chosen for soothing, grounding energy.",
    "products": [
      {
        "id": "gid://shopify/Product/123",
        "title": "Amethyst Cluster",
        "url": "/products/amethyst-cluster",
        "image": "https://cdn.shopify.com/...",
        "price": "$28",
        "badge": "Sleep"
      }
    ]
  }
}
```

## Initial Component Library

- `product_card`: Single product recommendation with image, price, reason, and link.
- `product_carousel`: Horizontal shelf of products for a specific intention.
- `ritual_card`: Short ritual instructions tied to one or more products.
- `reading_summary`: Tarot, astrology, bazi, or numerology summary with key takeaways.
- `collection_link`: Guided entry point into a Shopify collection.

## Dify Tooling Needed

- `shopify_product_search`: Searches Shopify products by intent, keyword, collection, tag, price range, and availability.
- `shopify_product_lookup`: Fetches canonical product data by product handle or id.
- `build_storefront_components`: Dify-native workflow tool that returns lightweight component intents using product and collection references.

In Dify, the recommended long-term form for this is a workflow tool inside a chatflow-based app. The important part is that the output is structured JSON intent data, not prose pretending to be UI.

## Frontend Contract

The Shopify theme should keep a registry like:

```js
const COMPONENTS = {
  product_card: ProductCardMessage,
  product_carousel: ProductCarouselMessage,
  ritual_card: RitualCardMessage,
  reading_summary: ReadingSummaryMessage,
};
```

If the stream receives an unknown component type, the frontend should ignore it or render a safe fallback. It should never execute HTML from the model.

## Why Build The Component Library First

We should build the component library before giving the model broad rendering tools. The model needs a clear menu of available UI surfaces and prop schemas. Otherwise it will invent component names, malformed props, or UX patterns we do not actually support.

## MVP Plan

1. Build frontend message components for `product_card` and `product_carousel`.
2. Define JSON schemas for those two payloads.
3. Add proxy support for `component` SSE events.
4. Add a local mock tool response to test rendering without Dify.
5. Add the Dify component-builder workflow tool and map its intent schema to hydrated storefront payloads.
6. Add prompt instructions telling the agent when to use text only vs. product UI.

## Safety Rules

- Only render allowlisted component names.
- Hydrate products from Shopify server-side whenever possible.
- Treat model-generated product IDs, prices, and URLs as hints, not truth.
- Do not render model-provided HTML.
- Keep checkout, cart mutation, and customer data actions server-mediated.
