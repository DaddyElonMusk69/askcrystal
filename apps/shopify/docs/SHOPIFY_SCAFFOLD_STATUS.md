# Shopify Scaffold Status

## What is scaffolded now

### Backend contract

- local scaffold server under `app/src/server/`
- app proxy route contracts for chat, catalog, and cart actions
- Dify gateway contract for future app API integration
- local Dify app API integration that prefers `/v1/chat-messages` and can bootstrap a real app API key from the console when running locally
- streamed storefront chat route at `/apps/askcrystal/chat/stream` so the homepage can surface progress while long Dify runs are still in flight
- persistence table planning module aligned with the memory architecture doc

### Storefront extension

- theme app extension folder
- homepage block markup
- boutique-style CSS shell
- client-side JS that posts to `/apps/askcrystal/chat`

### Shared package

- shared homepage identity and entry-point content constants

## What still needs to be wired

1. official Shopify React Router app template
2. Shopify app auth and session storage
3. production-grade App Proxy signature verification
4. Storefront API product search and cart mutations
5. lock the local Dify bridge against the real AskCrystal app with end-to-end smoke coverage
6. memory database and write-back pipeline
7. React island build pipeline for the homepage block

## Why this scaffold is still useful

It freezes the important product and integration contracts before framework bootstrapping:

- route names
- homepage information architecture
- proxy boundary
- Dify integration boundary
- persistence ownership boundary
