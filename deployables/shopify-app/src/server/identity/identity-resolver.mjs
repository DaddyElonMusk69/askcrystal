import { config } from '../config.mjs'
import { identityStore } from '../persistence/postgres-identity-store.mjs'
import { getShopifyProxyContext } from '../shopify/app-proxy-auth.mjs'

const normalizeString = value => (typeof value === 'string' ? value.trim() : '')

const getBodyGuestToken = body => (
  normalizeString(body?.guestToken)
  || normalizeString(body?.sessionId)
  || normalizeString(body?.browserSessionId)
)

const getRequestGuestToken = (req, body = {}) => {
  const bodyGuestToken = getBodyGuestToken(body)
  if (bodyGuestToken)
    return bodyGuestToken

  if (!req?.url)
    return ''

  const url = new URL(req.url, config.shopifyAppUrl || 'http://localhost')
  return normalizeString(url.searchParams.get('guestToken'))
}

const getShopDomain = (req) => {
  const context = getShopifyProxyContext(req?.url || '/')
  return (
    normalizeString(context.shop)
    || normalizeString(req?.headers?.['x-shopify-shop-domain'])
    || normalizeString(config.shopifyStoreDomain)
    || 'local-dev-shop'
  )
}

export const resolveAskCrystalIdentity = async (req, body = {}) => {
  const proxyContext = getShopifyProxyContext(req?.url || '/')
  const shopDomain = getShopDomain(req)
  const shopifyCustomerId = normalizeString(proxyContext.loggedInCustomerId)
  const guestToken = getRequestGuestToken(req, body)

  if (!identityStore.enabled) {
    return {
      persistenceEnabled: false,
      mode: shopifyCustomerId ? 'customer' : 'guest',
      shop: {
        id: shopDomain,
        shopDomain,
      },
      user: null,
      guestSession: null,
      guestToken,
      shopifyCustomerId: shopifyCustomerId || null,
      legacyUserId: guestToken || shopifyCustomerId || 'shopify-guest',
      entitlements: {
        tier: 'free',
        status: 'active',
        source: 'persistence-disabled',
        premiumReadingsRemaining: 0,
      },
    }
  }

  return identityStore.resolveIdentity({
    shopDomain,
    shopifyCustomerId,
    guestToken,
  })
}

export const getDifyUserIdForIdentity = identity => (
  identity?.user?.difyUserKey
  || identity?.legacyUserId
  || identity?.guestToken
  || 'shopify-guest'
)

export const resolveAskCrystalThread = async ({
  identity,
  body = {},
  initialMessage = '',
}) => {
  if (!identity?.persistenceEnabled)
    return null

  return identityStore.findOrCreateThread({
    identity,
    threadId: normalizeString(body.threadId),
    storefrontSessionId: normalizeString(body.storefrontSessionId || body.localThreadId),
    initialMessage,
    initialDifyConversationId: normalizeString(body.conversationId),
    legacyDifyUserKey: getBodyGuestToken(body),
  })
}

export const getDifyUserIdForThread = ({ identity, thread }) => (
  thread?.difyUserKey
  || getDifyUserIdForIdentity(identity)
)
