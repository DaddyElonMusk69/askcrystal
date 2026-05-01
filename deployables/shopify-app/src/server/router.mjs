import { APP_PROXY_PREFIX, ROUTES } from './contracts.mjs'
import { readJson } from './utils/http.mjs'
import { handleCartAdd } from './routes/cart-add.mjs'
import { handleCartUpdate } from './routes/cart-update.mjs'
import { handleCatalogRecommend } from './routes/catalog-recommend.mjs'
import { handleCatalogResolveProductCard } from './routes/catalog-resolve-product-card.mjs'
import { handleCatalogSearch } from './routes/catalog-search.mjs'
import { handleChat, handleChatParameters, handleChatStop, handleChatStream } from './routes/chat.mjs'
import { handleChatEmbed } from './routes/chat-embed.mjs'
import { handleHealth } from './routes/health.mjs'
import { handleIdentityBootstrap } from './routes/identity.mjs'
import { handleThreadMessages, handleThreadsCreate, handleThreadsList } from './routes/threads.mjs'
import { validateShopifyProxyRequest } from './shopify/app-proxy-auth.mjs'

const routeTable = {
  [`GET ${ROUTES.health}`]: async (req, res) => handleHealth(req, res),
  [`GET ${ROUTES.proxyHealth}`]: async (req, res) => handleHealth(req, res),
  [`GET ${ROUTES.proxyApiHealth}`]: async (req, res) => handleHealth(req, res),
  [`GET ${ROUTES.chatEmbed}`]: async req => handleChatEmbed(req),
  [`GET ${ROUTES.chatParameters}`]: async req => handleChatParameters(req),
  [`GET ${ROUTES.chatIdentityBootstrap}`]: async req => handleIdentityBootstrap(req),
  [`GET ${ROUTES.identityBootstrap}`]: async req => handleIdentityBootstrap(req),
  [`GET ${ROUTES.threads}`]: async req => handleThreadsList(req),
  [`POST ${ROUTES.threads}`]: async req => handleThreadsCreate(req, await readJson(req)),
  [`GET ${ROUTES.chatThreadMessages}`]: async req => handleThreadMessages(req),
  [`GET ${ROUTES.threadMessages}`]: async req => handleThreadMessages(req),
  [`POST ${ROUTES.chat}`]: async req => handleChat(await readJson(req), req),
  [`POST ${ROUTES.chatStream}`]: async (req, res) => handleChatStream(await readJson(req), res, req),
  [`POST ${ROUTES.chatStop}`]: async req => handleChatStop(await readJson(req), req),
  [`POST ${ROUTES.catalogSearch}`]: async req => handleCatalogSearch(await readJson(req)),
  [`POST ${ROUTES.catalogRecommend}`]: async req => handleCatalogRecommend(await readJson(req)),
  [`POST ${ROUTES.catalogResolveProductCard}`]: async req => handleCatalogResolveProductCard(await readJson(req)),
  [`POST ${ROUTES.cartAdd}`]: async req => handleCartAdd(await readJson(req)),
  [`POST ${ROUTES.cartUpdate}`]: async req => handleCartUpdate(await readJson(req)),
}

export const resolveRoute = req => {
  const url = new URL(req.url, 'http://localhost')

  const key = `${req.method.toUpperCase()} ${url.pathname}`
  return routeTable[key] || null
}

export const isAppProxyRoute = req => {
  const url = new URL(req.url, 'http://localhost')
  return url.pathname.startsWith(APP_PROXY_PREFIX)
}

export const validateRouteRequest = req => {
  if (!isAppProxyRoute(req)) {
    return { ok: true }
  }

  return validateShopifyProxyRequest(req.url)
}
