import { APP_PROXY_PREFIX, ROUTES } from './contracts.mjs'
import { readJson } from './utils/http.mjs'
import { handleCartAdd } from './routes/cart-add.mjs'
import { handleCartUpdate } from './routes/cart-update.mjs'
import { handleCatalogRecommend } from './routes/catalog-recommend.mjs'
import { handleCatalogSearch } from './routes/catalog-search.mjs'
import { handleChat, handleChatParameters, handleChatStop, handleChatStream } from './routes/chat.mjs'
import { handleChatEmbed } from './routes/chat-embed.mjs'
import { handleHealth } from './routes/health.mjs'
import { handlePreviewAsset, handlePreviewPage } from './routes/preview.mjs'
import { validateShopifyProxyRequest } from './shopify/app-proxy-auth.mjs'

const routeTable = {
  [`GET ${ROUTES.preview}`]: async (req, res) => handlePreviewPage(req, res),
  [`GET ${ROUTES.health}`]: async (req, res) => handleHealth(req, res),
  [`GET ${ROUTES.chatEmbed}`]: async req => handleChatEmbed(req),
  [`GET ${ROUTES.chatParameters}`]: async req => handleChatParameters(req),
  [`POST ${ROUTES.chat}`]: async req => handleChat(await readJson(req)),
  [`POST ${ROUTES.chatStream}`]: async (req, res) => handleChatStream(await readJson(req), res, req),
  [`POST ${ROUTES.chatStop}`]: async req => handleChatStop(await readJson(req)),
  [`POST ${ROUTES.catalogSearch}`]: async req => handleCatalogSearch(await readJson(req)),
  [`POST ${ROUTES.catalogRecommend}`]: async req => handleCatalogRecommend(await readJson(req)),
  [`POST ${ROUTES.cartAdd}`]: async req => handleCartAdd(await readJson(req)),
  [`POST ${ROUTES.cartUpdate}`]: async req => handleCartUpdate(await readJson(req)),
}

export const resolveRoute = req => {
  const url = new URL(req.url, 'http://localhost')

  if (req.method.toUpperCase() === 'GET' && url.pathname.startsWith(`${ROUTES.previewAssets}/`)) {
    const assetName = url.pathname.slice(`${ROUTES.previewAssets}/`.length)
    return async (_req, res) => handlePreviewAsset(assetName, res)
  }

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
