# AskCrystal Storefront Components For Dify

This folder defines the Dify-side contract for rich storefront components.

These files describe what Dify should output before the Shopify proxy hydrates the payload into the storefront render contract.

## Files

- `storefront-component-intent.schema.json`
  - machine-readable schema for Dify component intents
- `examples/sleep-grounding.json`
  - example multi-component response for a calm and sleep recommendation

## Important distinction

This schema is not the same as the frontend component payload shape.

Dify should return lightweight intent objects with product or collection references.

The Shopify proxy then:

1. validates the intent,
2. hydrates canonical Shopify fields,
3. emits the final storefront payload to the theme.

## Recommended Dify implementation

- Main app: `chatflow`
- Reusable tool: `build_storefront_components`
- Output variables:
  - `schema_version`
  - `components`

For the architectural rationale and rollout plan, see:

- `docs/DIFY_STOREFRONT_COMPONENT_ARCHITECTURE.md`
