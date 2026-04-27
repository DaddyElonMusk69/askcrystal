export const APP_PROXY_PREFIX = '/apps/askcrystal'

export const ROUTES = {
  health: '/api/health',
  chat: `${APP_PROXY_PREFIX}/chat`,
  chatParameters: `${APP_PROXY_PREFIX}/chat/parameters`,
  chatStream: `${APP_PROXY_PREFIX}/chat/stream`,
  chatSuggestions: `${APP_PROXY_PREFIX}/chat/suggestions`,
  chatStop: `${APP_PROXY_PREFIX}/chat/stop`,
  chatEmbed: `${APP_PROXY_PREFIX}/chat/embed`,
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
