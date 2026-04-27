FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8787

COPY packages/storefront-ui-contract/package.json ./packages/storefront-ui-contract/package.json
COPY packages/storefront-ui-contract/src ./packages/storefront-ui-contract/src
COPY deployables/shopify-app/package.json ./deployables/shopify-app/package.json
COPY deployables/shopify-app/src ./deployables/shopify-app/src

WORKDIR /app/deployables/shopify-app

EXPOSE 8787

CMD ["node", "src/server/dev-server.mjs"]
