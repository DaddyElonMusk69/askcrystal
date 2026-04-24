# Shopify App Backend Scaffold

This folder now holds the first AskCrystal backend scaffold for Shopify integration.

## What is implemented

- local development HTTP server for app-proxy-style routes
- route contracts for:
  - `GET /api/health`
  - `POST /apps/askcrystal/chat`
  - `POST /apps/askcrystal/chat/stream`
  - `POST /apps/askcrystal/catalog/search`
  - `POST /apps/askcrystal/catalog/recommend`
  - `POST /apps/askcrystal/cart/add`
  - `POST /apps/askcrystal/cart/update`
- Dify gateway contract for future local Dify / cloud Dify calls
- local Dify bootstrap mode, so the scaffold can create or reuse a real app API key through the Dify console and then talk to the official `/v1/chat-messages` app API
- memory-schema planning module aligned with the persistence architecture doc
- Shopify app-proxy validation stub with explicit TODO boundary

## Local development

Run the scaffold server:

```bash
cd /Users/haokaiqin/Desktop/AskCrystal/apps/shopify/app
npm run dev:proxy
```

Health check:

```bash
curl http://localhost:8787/api/health
```

Local Dify integration modes:

1. `Preferred production-shaped mode`
   - set `DIFY_APP_API_KEY`
   - optionally override `DIFY_APP_CHAT_URL`

2. `Local development mode`
   - keep `DIFY_DEV_USE_CONSOLE=true`
   - set `DIFY_APP_ID`
   - set `DIFY_ADMIN_EMAIL`
   - set `DIFY_ADMIN_PASSWORD`
   - optionally tune `DIFY_REQUEST_TIMEOUT_MS` for fail-fast local testing

The app now auto-loads `.env` and `.env.local`, so the committed local scaffold can boot without manually exporting variables.

This second mode no longer chats through the console debug API. Instead, it uses the console only to bootstrap or reuse a real app API key, then sends the actual message through Dify's service API at `http://localhost:18080/v1/chat-messages`.

For storefront UX, prefer `POST /apps/askcrystal/chat/stream`.
It keeps the request open and emits status updates while Dify is still thinking, which is much safer for this agent than waiting for a short blocking JSON timeout.

## Important note

This is intentionally a roadmap-aligned scaffold, not the final official Shopify app shell yet.

The next implementation step is to map these route contracts into the official Shopify React Router template and wire real Shopify auth, App Proxy signature validation, Storefront API calls, and Dify app chat credentials.
