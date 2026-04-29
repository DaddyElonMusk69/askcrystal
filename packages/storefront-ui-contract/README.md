# Storefront UI Package

This package now contains shared content and interface constants for the future React storefront layer.

It is intentionally lightweight until we introduce the full React island build pipeline.

## Chat Components

The V1 chat component contract is intentionally product-only:

- `product_card`
- `product_carousel`

Non-commerce guidance such as readings, rituals, next steps, and collection browsing prompts should be rendered as normal assistant prose or native Shopify UI instead of model-selected cards.
