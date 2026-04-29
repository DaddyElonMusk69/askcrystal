export const APP_PROXY_PREFIX = '/apps/askcrystal'

export const ROUTES = {
  health: '/api/health',
  proxyHealth: `${APP_PROXY_PREFIX}/health`,
  proxyApiHealth: `${APP_PROXY_PREFIX}/api/health`,
  chat: `${APP_PROXY_PREFIX}/chat`,
  chatParameters: `${APP_PROXY_PREFIX}/chat/parameters`,
  chatStream: `${APP_PROXY_PREFIX}/chat/stream`,
  chatStop: `${APP_PROXY_PREFIX}/chat/stop`,
  chatEmbed: `${APP_PROXY_PREFIX}/chat/embed`,
  chatIdentityBootstrap: `${APP_PROXY_PREFIX}/chat/identity/bootstrap`,
  chatThreadMessages: `${APP_PROXY_PREFIX}/chat/threads/messages`,
  identityBootstrap: `${APP_PROXY_PREFIX}/identity/bootstrap`,
  threads: `${APP_PROXY_PREFIX}/threads`,
  threadMessages: `${APP_PROXY_PREFIX}/threads/messages`,
  catalogSearch: `${APP_PROXY_PREFIX}/catalog/search`,
  catalogRecommend: `${APP_PROXY_PREFIX}/catalog/recommend`,
  cartAdd: `${APP_PROXY_PREFIX}/cart/add`,
  cartUpdate: `${APP_PROXY_PREFIX}/cart/update`,
}

export const QUICK_PROMPTS = [
  'I need a crystal for grounding and emotional protection.',
  'Help me find a gift based on someone\'s zodiac sign.',
  'Recommend a calming daily ritual and the right stone.',
  'I want to browse crystals for love, focus, or prosperity.',
]

export const BOUTIQUE_SECTIONS = [
  'Guided conversation',
  'Curated crystal shelf',
  'Ritual suggestions',
  'Cart-aware recommendations',
]
