# AskCrystal Horizon Theme

This folder is now the native Shopify theme workspace for AskCrystal.

## Install

```bash
cd deployables/storefront-theme
npm install
```

## Preview the theme

Run the Shopify preview server against your development store:

```bash
npm run theme:dev -- --store your-store.myshopify.com
```

If you prefer, you can also supply the store through the Shopify CLI environment variable:

```bash
SHOPIFY_FLAG_STORE=your-store.myshopify.com npm run theme:dev
```

Shopify CLI will then give you:

- a local preview URL, usually `http://127.0.0.1:9292`
- a theme editor URL
- a shareable preview URL

## Helpful commands

```bash
npm run theme:check
npm run theme:package
npm run theme:info -- --store your-store.myshopify.com
```

## Notes

- This is the customer-facing storefront codebase.
- Dify should stay behind the storefront as the agent backend, not the storefront UI.
- From here on, homepage/section/chat/product UI should be built natively in this theme.
