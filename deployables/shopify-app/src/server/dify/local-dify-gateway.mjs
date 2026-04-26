import { Buffer } from 'node:buffer'
import { gzipSync } from 'node:zlib'

import {
  mergeChatComponents,
  stripInlineChatComponentManifestPreview,
} from '../../../../../packages/storefront-ui-contract/src/chat-components.mjs'
import {
  createStorefrontComponentHydrationContext,
  describeStorefrontHydrationStatus,
  hydrateChatComponentsFromPayload,
} from './storefront-component-hydrator.mjs'
import { config, requireDifyChatConfig, requireDifyConsoleDevConfig } from '../config.mjs'

const TERMINAL_EVENTS = new Set([
  'message_end',
  'advanced_chat_message_end',
  'workflow_finished',
  'error',
])

const DEFAULT_STREAM_RETRY_ATTEMPTS = 2
const STREAM_DECISION_MIN_CHARS = 24
const STREAM_DECISION_AFTER_REASONING_MIN_CHARS = 48
const SUGGESTED_QUESTIONS_REQUEST_TIMEOUT_MS = 3500

const joinUrl = (baseUrl, path) => new URL(path, `${baseUrl.replace(/\/$/, '')}/`).toString()

const getSetCookies = (response) => {
  if (typeof response.headers.getSetCookie === 'function')
    return response.headers.getSetCookie()

  const single = response.headers.get('set-cookie')
  return single ? [single] : []
}

const parseCookiePair = (cookieString) => {
  const firstPart = cookieString.split(';', 1)[0] || ''
  const separatorIndex = firstPart.indexOf('=')
  if (separatorIndex === -1)
    return null

  const name = firstPart.slice(0, separatorIndex).trim()
  const value = firstPart.slice(separatorIndex + 1).trim()
  if (!name)
    return null

  return { name, value }
}

const parseTextPayload = (text) => {
  if (typeof text !== 'string' || !text.trim())
    return {}

  try {
    return JSON.parse(text)
  }
  catch {
    return text
  }
}

const createAbortError = (message = 'The Dify stream was aborted.') => {
  const error = new Error(message)
  error.name = 'AbortError'
  return error
}

const extractSseEvents = (buffer) => {
  const events = []
  let remaining = buffer.replace(/\r\n/g, '\n')

  while (true) {
    const separatorIndex = remaining.indexOf('\n\n')
    if (separatorIndex === -1)
      break

    const rawEvent = remaining.slice(0, separatorIndex)
    remaining = remaining.slice(separatorIndex + 2)

    const payload = rawEvent
      .split('\n')
      .filter(line => line.startsWith('data:'))
      .map(line => line.slice(5).trim())
      .join('\n')

    if (!payload || payload === '[DONE]')
      continue

    try {
      events.push(JSON.parse(payload))
    }
    catch {}
  }

  return { events, remaining }
}

const getEventText = (event) => {
  if (!event || typeof event !== 'object')
    return ''

  if (typeof event.answer === 'string')
    return event.answer

  if (typeof event.text === 'string')
    return event.text

  if (typeof event.delta === 'string')
    return event.delta

  if (typeof event?.data?.answer === 'string')
    return event.data.answer

  if (typeof event?.data?.text === 'string')
    return event.data.text

  return ''
}

const getEventConversationId = (event) => {
  if (typeof event?.conversation_id === 'string' && event.conversation_id)
    return event.conversation_id

  if (typeof event?.data?.conversation_id === 'string' && event.data.conversation_id)
    return event.data.conversation_id

  return null
}

const getEventMessageId = (event) => {
  if (typeof event?.message_id === 'string' && event.message_id)
    return event.message_id

  if (typeof event?.messageId === 'string' && event.messageId)
    return event.messageId

  if (typeof event?.data?.message_id === 'string' && event.data.message_id)
    return event.data.message_id

  if (typeof event?.data?.messageId === 'string' && event.data.messageId)
    return event.data.messageId

  return null
}

const getEventTaskId = (event) => {
  if (typeof event?.task_id === 'string' && event.task_id)
    return event.task_id

  if (typeof event?.taskId === 'string' && event.taskId)
    return event.taskId

  if (typeof event?.data?.task_id === 'string' && event.data.task_id)
    return event.data.task_id

  if (typeof event?.data?.taskId === 'string' && event.data.taskId)
    return event.data.taskId

  return null
}

const getEventVariableSelector = (event) => {
  const selector = event?.from_variable_selector || event?.data?.from_variable_selector
  if (!Array.isArray(selector))
    return []

  return selector
    .map(value => (typeof value === 'string' ? value.trim() : ''))
    .filter(Boolean)
}

const selectorToSearchText = (selector = []) => selector.join(' / ').toLowerCase()

const selectorLooksLikeInternalThought = (selector = []) => {
  const searchText = selectorToSearchText(selector)
  if (!searchText)
    return false

  const hasThoughtHint = /\b(agent[-_\s]?thought|thought|iteration|scratchpad|reasoning)\b/.test(searchText)
  const hasFinalAnswerHint = /\b(final[-_\s]?answer|finalanswer)\b/.test(searchText)
  return hasThoughtHint && !hasFinalAnswerHint
}

const selectorLooksLikeFinalAnswer = (selector = []) => {
  const searchText = selectorToSearchText(selector)
  if (!searchText)
    return false

  return /\b(final[-_\s]?answer|finalanswer)\b/.test(searchText)
}

const getChatComponentKey = (component) => {
  const toolName = typeof component?.toolName === 'string' ? component.toolName : ''
  const id = typeof component?.id === 'string' ? component.id : ''
  return `${toolName}:${id}`
}

const diffChatComponents = (current = [], incoming = []) => {
  const existingKeys = new Set(current.map(getChatComponentKey))
  return incoming.filter(component => !existingKeys.has(getChatComponentKey(component)))
}

const getToolName = (event) => {
  if (!event || typeof event !== 'object')
    return ''

  if (typeof event.tool === 'string' && event.tool)
    return event.tool

  if (typeof event.tool_name === 'string' && event.tool_name)
    return event.tool_name

  if (event.tool_labels && typeof event.tool_labels === 'object') {
    const labelEntry = Object.values(event.tool_labels).find(value => typeof value === 'string' && value)
    if (typeof labelEntry === 'string')
      return labelEntry
  }

  return ''
}

const mapToolNamesToDomain = (toolNames, domain) =>
  Object.fromEntries(toolNames.map(toolName => [toolName, domain]))

const TOOL_DOMAIN_MAP = {
  ...mapToolNamesToDomain([
    'search_catalog',
    'get_product_details',
  ], 'storefront_search'),
  ...mapToolNamesToDomain([
    'get_cart',
    'update_cart',
  ], 'storefront_cart'),
  ...mapToolNamesToDomain([
    'search_shop_policies_and_faqs',
  ], 'storefront_policy'),
  ...mapToolNamesToDomain([
    'search_crystals_crystals_search_post',
    'get_crystal_crystals__slug__get',
    'list_crystals_crystals_get',
  ], 'crystal_library'),
  ...mapToolNamesToDomain([
    'run_crystal_intention_matcher_skill_post',
    'run_crystal_chakra_balance_plan_skill_post',
    'run_crystal_cleansing_and_charging_skill_post',
    'run_crystal_grid_manifestation_design_skill_post',
    'run_astro_crystal_synthesis_skill_post',
  ], 'crystal_prescription'),
  ...mapToolNamesToDomain([
    'run_astrology_transit_checkin_skill_post',
    'run_western_natal_archetype_read_skill_post',
  ], 'astrology'),
  ...mapToolNamesToDomain([
    'run_synastry_relationship_map_skill_post',
    'run_yinyuan_matchmaking_skill_post',
  ], 'compatibility'),
  ...mapToolNamesToDomain([
    'run_bazi_chart_analysis_skill_post',
    'run_shushu_numerology_profile_skill_post',
    'run_qimen_timing_direction_read_skill_post',
    'run_ziwei_palace_theme_read_skill_post',
    'run_taibu_structured_divination_router_skill_post',
  ], 'eastern_metaphysics'),
  ...mapToolNamesToDomain([
    'run_fengshui_space_audit_skill_post',
  ], 'fengshui'),
  ...mapToolNamesToDomain([
    'run_tarot_spread_interpretation_cn_skill_post',
  ], 'tarot'),
  ...mapToolNamesToDomain([
    'run_cross_mythology_synthesis_skill_post',
    'run_deity_alignment_lookup_skill_post',
    'run_mythic_archetype_mapping_skill_post',
    'run_mythic_story_reframe_skill_post',
    'run_symbolic_omen_reader_skill_post',
    'run_moon_ritual_designer_skill_post',
  ], 'mythology_oracle'),
}

const TOOL_DOMAIN_PATTERNS = [
  { domain: 'storefront_search', pattern: /shopify|catalog|product|variant|collection|inventory|storefront/ },
  { domain: 'storefront_cart', pattern: /\bcart\b/ },
  { domain: 'storefront_policy', pattern: /polic|faq|shipping|return/ },
  { domain: 'crystal_library', pattern: /search_crystals|list_crystals|get_crystal|archive|dataset|retriev|document|knowledge|rag|kb/ },
  { domain: 'crystal_prescription', pattern: /crystal|stone|chakra|healing|ritual/ },
  { domain: 'astrology', pattern: /astrology|natal|zodiac|planet|birth|horoscope|star/ },
  { domain: 'compatibility', pattern: /synastry|relationship|yinyuan|matchmaking|marriage/ },
  { domain: 'eastern_metaphysics', pattern: /bazi|shushu|taibu|ziwei|qimen|numerology|element/ },
  { domain: 'fengshui', pattern: /fengshui|feng shui|space audit/ },
  { domain: 'tarot', pattern: /tarot|card|spread/ },
  { domain: 'mythology_oracle', pattern: /myth|deity|omen|moon|symbolic|archetype/ },
]

const TOOL_STATUS_LINE_BANKS = {
  storefront_search: [
    'Walking the crystal shelves for a close match...',
    'Comparing a few pieces against your question...',
    'Checking which storefront pieces answer most clearly...',
  ],
  storefront_cart: [
    'Looking over your tray...',
    'Checking what is already set aside for you...',
    'Adjusting the pieces resting in your tray...',
  ],
  storefront_policy: [
    'Checking the shop notes for a clear answer...',
    'Looking through the store guidance...',
    'Pulling the relevant store details into view...',
  ],
  crystal_library: [
    'Opening the crystal archive...',
    'Cross-checking the stone profiles...',
    'Reading the crystal notes before I answer...',
  ],
  crystal_prescription: [
    'Holding your intention against the right stones...',
    'Shaping the crystal prescription around your energy...',
    'Checking which stones answer with steadiness...',
  ],
  astrology: [
    'Tracing the sky-map behind your question...',
    'Checking where the planets press most strongly...',
    'Reading the chart for the clearest pattern...',
  ],
  compatibility: [
    'Reading how the two currents meet...',
    'Checking the harmony, friction, and pull between these energies...',
    'Following the thread between both charts...',
  ],
  eastern_metaphysics: [
    'Following the hidden stems beneath the surface...',
    'Reading the timing, element, and pattern in your chart...',
    'Checking the older map for the clearest structure...',
  ],
  fengshui: [
    'Walking the space for blocked and flowing areas...',
    'Checking how the room holds and redirects energy...',
    'Reading the shape and flow of the space...',
  ],
  tarot: [
    'Turning the cards slowly, one current at a time...',
    'Watching which symbol keeps returning to the surface...',
    'Letting the spread settle before reading the pattern...',
  ],
  mythology_oracle: [
    'Listening for the myth beneath this moment...',
    'Finding the symbolic thread that best fits your question...',
    'Reading the omen and archetype around this turning point...',
  ],
}

const deterministicIndex = (value, size) => {
  if (!size)
    return 0

  const source = String(value || '')
  let hash = 0
  for (let index = 0; index < source.length; index += 1)
    hash = ((hash * 31) + source.charCodeAt(index)) >>> 0

  return hash % size
}

const humanizeToolLabel = (toolName = '') => toolName
  .replace(/^run_/, '')
  .replace(/^get_/, '')
  .replace(/^list_/, '')
  .replace(/^search_/, '')
  .replace(/_skill_post$/, '')
  .replace(/_post$/, '')
  .replace(/_get$/, '')
  .replace(/_crystals__slug__/g, ' crystal')
  .replace(/_+/g, ' ')
  .trim()

const buildFallbackToolMessage = (toolName = '') => {
  const humanizedLabel = humanizeToolLabel(toolName)
  if (!humanizedLabel)
    return 'Listening for the signs...'

  if (/^search_/i.test(toolName))
    return `Searching ${humanizedLabel}...`
  if (/^get_/i.test(toolName))
    return `Checking ${humanizedLabel}...`
  if (/^list_/i.test(toolName))
    return `Surveying ${humanizedLabel}...`
  if (/^run_/i.test(toolName))
    return `Consulting ${humanizedLabel}...`

  return `Reading ${humanizedLabel}...`
}

const getToolDomain = ({ toolName = '', toolContext = '' } = {}) => {
  if (toolName && TOOL_DOMAIN_MAP[toolName])
    return TOOL_DOMAIN_MAP[toolName]

  const fallbackMatch = TOOL_DOMAIN_PATTERNS.find(({ pattern }) => pattern.test(toolContext))
  return fallbackMatch?.domain || ''
}

const buildToolStatusMessage = ({ toolName = '', toolContext = '' } = {}) => {
  const domain = getToolDomain({ toolName, toolContext })
  const messageBank = TOOL_STATUS_LINE_BANKS[domain]
  if (Array.isArray(messageBank) && messageBank.length > 0)
    return messageBank[deterministicIndex(toolName || toolContext, messageBank.length)]

  return buildFallbackToolMessage(toolName)
}

const stripModelToolMarkup = value => value
  .replace(/<minimax:tool_call>[\s\S]*?<\/minimax:tool_call>/gi, '')
  .replace(/<invoke\b[\s\S]*?<\/invoke>/gi, '')
  .replace(/<action_input\b[^>]*>[\s\S]*?<\/action_input>/gi, '')
  .replace(/<parameter\b[^>]*>[\s\S]*?<\/parameter>/gi, '')
  .replace(/\n{3,}/g, '\n\n')
  .trim()

const decodeJsonStringLiteral = (literal) => {
  if (typeof literal !== 'string' || !literal)
    return ''

  try {
    return JSON.parse(literal)
  }
  catch {
    return literal.replace(/^"/, '').replace(/"$/, '')
  }
}

const decodePartialJsonString = (rawValue) => {
  if (typeof rawValue !== 'string' || !rawValue)
    return ''

  let decoded = ''
  let escaped = false

  for (let index = 0; index < rawValue.length; index += 1) {
    const character = rawValue[index]

    if (escaped) {
      switch (character) {
        case 'n':
          decoded += '\n'
          break
        case 'r':
          decoded += '\r'
          break
        case 't':
          decoded += '\t'
          break
        case '"':
          decoded += '"'
          break
        case '\\':
          decoded += '\\'
          break
        case '/':
          decoded += '/'
          break
        case 'b':
          decoded += '\b'
          break
        case 'f':
          decoded += '\f'
          break
        case 'u': {
          const unicodeSlice = rawValue.slice(index + 1, index + 5)
          if (/^[0-9a-fA-F]{4}$/.test(unicodeSlice)) {
            decoded += String.fromCharCode(Number.parseInt(unicodeSlice, 16))
            index += 4
          }
          break
        }
        default:
          decoded += character
      }

      escaped = false
      continue
    }

    if (character === '\\') {
      escaped = true
      continue
    }

    decoded += character
  }

  return decoded
}

const extractPartialFinalAnswerJsonString = (value) => {
  if (typeof value !== 'string' || !value)
    return ''

  const actionInputPrefixMatch = [...value.matchAll(
    /"action"\s*:\s*"Final Answer"[\s\S]*?"action_input"\s*:\s*"/gi,
  )].pop()

  if (!actionInputPrefixMatch || typeof actionInputPrefixMatch.index !== 'number')
    return ''

  const valueStartIndex = actionInputPrefixMatch.index + actionInputPrefixMatch[0].length
  let cursor = valueStartIndex
  let escaped = false

  while (cursor < value.length) {
    const character = value[cursor]
    if (escaped) {
      escaped = false
      cursor += 1
      continue
    }

    if (character === '\\') {
      escaped = true
      cursor += 1
      continue
    }

    if (character === '"')
      break

    cursor += 1
  }

  const rawValue = value.slice(valueStartIndex, cursor)
  return decodePartialJsonString(rawValue).trim()
}

const extractStructuredFinalAnswer = (value) => {
  if (typeof value !== 'string')
    return ''

  const normalized = stripModelToolMarkup(stripInlineChatComponentManifestPreview(value))
  if (!normalized)
    return ''

  const finalActionStringMatch = [...normalized.matchAll(
    /"action"\s*:\s*"Final Answer"[\s\S]*?"action_input"\s*:\s*("(?:\\.|[^"\\])*")/gi,
  )].pop()

  if (finalActionStringMatch?.[1]) {
    const parsed = decodeJsonStringLiteral(finalActionStringMatch[1]).trim()
    if (parsed)
      return parsed
  }

  const partialJsonAnswer = extractPartialFinalAnswerJsonString(normalized)
  if (partialJsonAnswer)
    return partialJsonAnswer

  const finalAnswerLabelMatch = [...normalized.matchAll(
    /(?:^|\n)\s*final answer\s*:\s*/gim,
  )].pop()

  if (typeof finalAnswerLabelMatch?.index === 'number') {
    const parsed = normalized
      .slice(finalAnswerLabelMatch.index + finalAnswerLabelMatch[0].length)
      .trim()
    if (parsed)
      return parsed
  }

  return ''
}

const looksLikeReactTrace = (value) => {
  if (typeof value !== 'string')
    return false

  const normalized = value.toLowerCase()
  return (
    /\bthought:\b/.test(normalized)
    || /\bobservation:\b/.test(normalized)
    || /\baction:\b/.test(normalized)
    || /\bquestion:\b/.test(normalized)
    || /"action"\s*:/.test(normalized)
    || /\bfinal answer\b/.test(normalized)
  )
}

const looksLikeInternalStreamingLine = (value) => {
  if (typeof value !== 'string')
    return false

  const normalized = value.trim().toLowerCase()
  if (!normalized)
    return false

  return (
    /^(question:?|continue\b|the user wants\b|the user has provided\b|the user asked\b|user wants\b|analysis:|thought:|thinking:|observation:|action:)/.test(normalized)
    || /^(i am thinking about how to\b|i need to\b|i should\b|i have the skill guidance\b|i have the information needed\b|i have gathered information\b|i have found\b|i've found\b|i can now\b|let me\b|since the skill tool isn't available\b)/.test(normalized)
    || /^(the catalog|catalog search|previous catalog searches|the search results|searching with broader terms)\b/.test(normalized)
    || /^(search results:?|search_catalog\b|get_product_details\b|tool_call\b|catalog lookup:?|parameter name=)/.test(normalized)
    || /\bi have \w+ products?\b/.test(normalized)
    || /\bfrequent nighttime waking\b|\bcrystal healing principles\b/.test(normalized)
  )
}

const looksLikeInternalFinalParagraph = (value) => {
  if (typeof value !== 'string')
    return false

  const normalized = value.trim().toLowerCase()
  if (!normalized)
    return false

  return (
    /^(question:?|the user wants\b|user wants\b|i need to\b|first,\s*i\b|thought:|analysis:|observation:|action:)/.test(normalized)
    || /^```(?:json|xml)?\s*[\[{<]/.test(normalized)
    || /^<(?:invoke|action_input|parameter|minimax:tool_call)\b/.test(normalized)
    || /^"(?:action|tool|tool_name|action_input)"\s*:/.test(normalized)
  )
}

const getLeadingParagraph = (value) => {
  if (typeof value !== 'string')
    return ''

  return value
    .split(/\n{2,}/)
    .map(paragraph => paragraph.replace(/\s+/g, ' ').trim())
    .find(Boolean) || ''
}

const looksLikeDirectAnswerLead = (value) => {
  if (typeof value !== 'string')
    return false

  const normalized = value.trim().toLowerCase()
  if (!normalized)
    return false

  return (
    /^(yes\b|no\b|absolutely\b|certainly\b|of course\b|here(?:'s| is)\b|my top recommendation\b|the best crystal\b|for better\b|for sleep\b|to help\b|would you like\b|i recommend\b)/.test(normalized)
    || /^\*\*[^*]+\*\*\s+(?:is|for|can)\b/.test(normalized)
    || /^(amethyst|rose quartz|selenite|moonstone|howlite|lepidolite|clear quartz|black tourmaline)\b/.test(normalized)
  )
}

const trimLeadingInternalStreamingContent = (value) => {
  if (typeof value !== 'string')
    return ''

  let nextValue = value.trim()
  if (!nextValue)
    return ''

  const leadingLines = nextValue.split('\n')
  let lineIndex = 0

  while (lineIndex < leadingLines.length) {
    const candidateLine = leadingLines[lineIndex].trim()
    if (!candidateLine) {
      lineIndex += 1
      continue
    }

    if (!looksLikeInternalStreamingLine(candidateLine))
      break

    lineIndex += 1
  }

  nextValue = leadingLines.slice(lineIndex).join('\n').trim()
  if (!nextValue)
    return ''

  const paragraphs = nextValue
    .split(/\n{2,}/)
    .map(paragraph => paragraph.trim())
    .filter(Boolean)

  let paragraphIndex = 0
  while (paragraphIndex < paragraphs.length && looksLikeInternalStreamingLine(paragraphs[paragraphIndex]))
    paragraphIndex += 1

  return paragraphs.slice(paragraphIndex).join('\n\n').trim()
}

const cleanStreamingVisibleAnswer = (value, { sawReasoningActivity = false } = {}) => {
  if (typeof value !== 'string')
    return null

  const directFinalAnswer = extractStructuredFinalAnswer(value)
  if (directFinalAnswer)
    return directFinalAnswer

  const normalized = stripModelToolMarkup(stripInlineChatComponentManifestPreview(value))
  if (!normalized)
    return null

  const leadingParagraph = getLeadingParagraph(normalized)
  if (looksLikeReactTrace(normalized) || looksLikeInternalStreamingLine(leadingParagraph))
    return null

  const cleaned = trimLeadingInternalStreamingContent(normalized)
  const cleanedLeadingParagraph = getLeadingParagraph(cleaned)

  if (cleaned && looksLikeDirectAnswerLead(cleanedLeadingParagraph))
    return cleaned

  const decisionThreshold = sawReasoningActivity
    ? STREAM_DECISION_AFTER_REASONING_MIN_CHARS
    : STREAM_DECISION_MIN_CHARS

  if (normalized.length < decisionThreshold)
    return null

  if (sawReasoningActivity && !looksLikeDirectAnswerLead(cleanedLeadingParagraph))
    return null

  return cleaned || null
}

const sanitizeModelAnswerText = (value) => {
  if (typeof value !== 'string')
    return null

  const withoutToolMarkup = stripModelToolMarkup(value)

  if (!withoutToolMarkup)
    return null

  const energyBlueprintIndex = withoutToolMarkup.search(/(?:\*\*energy blueprint(?:\*\*)?|\benergy blueprint\s*:)/i)
  const candidateAnswer = energyBlueprintIndex >= 0
    ? withoutToolMarkup.slice(energyBlueprintIndex).trim()
    : withoutToolMarkup

  const paragraphs = candidateAnswer
    .split(/\n{2,}/)
    .map(paragraph => paragraph.trim())
    .filter(Boolean)

  const visibleParagraphs = paragraphs.filter((paragraph) => {
    return !looksLikeInternalFinalParagraph(paragraph)
  })

  const cleaned = (visibleParagraphs.length > 0 ? visibleParagraphs.join('\n\n') : candidateAnswer).trim()
  if (!cleaned)
    return null

  if (looksLikeInternalFinalParagraph(cleaned))
    return null

  return cleaned
}

const cleanVisibleAnswer = (value) => {
  if (typeof value !== 'string')
    return null

  const directFinalAnswer = extractStructuredFinalAnswer(value)
  if (directFinalAnswer)
    return sanitizeModelAnswerText(directFinalAnswer)

  const normalized = stripInlineChatComponentManifestPreview(value)
  if (looksLikeReactTrace(normalized))
    return null

  const trimmed = trimLeadingInternalStreamingContent(normalized)
  return sanitizeModelAnswerText(trimmed || normalized)
}

const buildThoughtStatusPayload = (event) => {
  const rawThought = typeof event?.thought === 'string' ? event.thought.replace(/\s+/g, ' ').trim() : ''
  if (!rawThought)
    return null

  const normalized = rawThought.toLowerCase()
  const taskId = getEventTaskId(event)

  if (/thinking about how to help/.test(normalized)) {
    return {
      stage: 'thought',
      tool: null,
      message: 'Tuning into the clearest thread...',
      taskId,
    }
  }

  if (/search|find|look up|catalog|archive|knowledge|dataset/.test(normalized)) {
    return {
      stage: 'thought',
      tool: null,
      message: 'Checking the archive for a steadier match...',
      taskId,
    }
  }

  if (/information needed|gathered information|provide|recommend/.test(normalized)) {
    return {
      stage: 'thought',
      tool: null,
      message: 'Bringing the guidance into focus...',
      taskId,
    }
  }

  return {
    stage: 'thought',
    tool: null,
    message: rawThought.slice(0, 180),
    taskId,
  }
}

const buildStatusPayload = ({ stage, event = null } = {}) => {
  const toolName = getToolName(event)
  const toolContext = `${toolName} ${event?.thought || ''} ${event?.observation || ''}`.toLowerCase()
  const taskId = getEventTaskId(event)

  if (stage === 'listen') {
    return {
      stage,
      tool: null,
      message: 'Settling into your energy...',
      taskId,
    }
  }

  if (stage === 'compose') {
    return {
      stage,
      tool: null,
      message: 'Letting your reading take shape...',
      taskId,
    }
  }

  return {
    stage: 'tool',
    tool: toolName || null,
    message: buildToolStatusMessage({ toolName, toolContext }),
    taskId,
  }
}

const normalizeDifyAnswer = async (payload, hydrationContext) => {
  const references = payload?.retriever_resources
    || payload?.metadata?.retriever_resources
    || []
  const components = await hydrateChatComponentsFromPayload(payload, hydrationContext)
  const storefrontHydration = describeStorefrontHydrationStatus(hydrationContext)

  if (typeof payload === 'string') {
    return {
      answer: cleanVisibleAnswer(payload),
      conversationId: null,
      messageId: null,
      metadata: {},
      references,
      components,
      storefrontHydration,
    }
  }

  if (typeof payload?.answer === 'string') {
    return {
      answer: cleanVisibleAnswer(payload.answer),
      conversationId: payload.conversation_id || null,
      messageId: typeof payload?.message_id === 'string' ? payload.message_id : null,
      metadata: payload.metadata || {},
      references,
      components,
      storefrontHydration,
    }
  }

  return {
    answer: null,
    conversationId: payload?.conversation_id || null,
    messageId: typeof payload?.message_id === 'string' ? payload.message_id : null,
    metadata: payload?.metadata || {},
    references,
    components,
    storefrontHydration,
  }
}

const normalizeDifyStream = (events) => {
  const errorEvent = events.find(event => event?.event === 'error')
  if (errorEvent) {
    const message = errorEvent.message || errorEvent.answer || 'Dify streaming request failed'
    throw new Error(message)
  }

  const streamedAnswer = events
    .filter(event => ['message', 'agent_message', 'text_chunk'].includes(event?.event))
    .map(getEventText)
    .filter(Boolean)
    .join('')

  const replacementAnswer = [...events]
    .reverse()
    .find(event => ['message_replace', 'text_replace'].includes(event?.event))

  const replacementText = getEventText(replacementAnswer)
  const terminalAnswerEvent = [...events]
    .reverse()
    .find(event => ['message_end', 'advanced_chat_message_end', 'workflow_finished'].includes(event?.event))
  const terminalAnswerText = getEventText(terminalAnswerEvent)

  const answer = terminalAnswerText || replacementText || streamedAnswer

  const conversationId = events
    .map(event => event?.conversation_id)
    .find(value => typeof value === 'string' && value)
    || null

  const messageId = [...events]
    .reverse()
    .map(getEventMessageId)
    .find(value => typeof value === 'string' && value)
    || null

  const taskId = events
    .map(getEventTaskId)
    .find(value => typeof value === 'string' && value)
    || null

  const messageEndEvent = [...events]
    .reverse()
    .find(event => ['message_end', 'advanced_chat_message_end'].includes(event?.event))

  const metadata = messageEndEvent?.metadata || {}
  const references = metadata?.retriever_resources || messageEndEvent?.retriever_resources || []
  return {
    answer: answer || null,
    conversationId,
    messageId,
    taskId,
    metadata,
    references,
    components: [],
  }
}

const fetchTextWithTimeout = async (url, options, timeoutMs) => {
  const controller = new AbortController()
  const timeoutHandle = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    const text = await response.text()
    return { response, text }
  }
  catch (error) {
    if (error instanceof Error && error.name === 'AbortError')
      throw new Error(`Dify request timed out after ${timeoutMs}ms`)
    throw error
  }
  finally {
    clearTimeout(timeoutHandle)
  }
}

const appendStreamMetadata = (payload, events, storefrontHydration = null) => ({
  ...payload,
  ...(storefrontHydration ? { storefrontHydration } : {}),
  metadata: {
    ...(payload.metadata || {}),
    streamEvents: events.length,
  },
})

const normalizeSuggestedQuestions = (value) => {
  const suggestions = Array.isArray(value?.data)
    ? value.data
    : Array.isArray(value?.suggestions)
      ? value.suggestions
      : Array.isArray(value)
        ? value
        : []

  const deduped = []
  const seen = new Set()

  for (const suggestion of suggestions) {
    const prompt = typeof suggestion === 'string' ? suggestion.trim() : ''
    if (!prompt)
      continue

    const dedupeKey = prompt.toLowerCase()
    if (seen.has(dedupeKey))
      continue

    seen.add(dedupeKey)
    deduped.push(prompt)
  }

  return deduped.slice(0, 6)
}

const buildFallbackSuggestedQuestions = (payload) => {
  const answer = typeof payload?.answer === 'string' ? payload.answer.toLowerCase() : ''
  const hasProductCard = Array.isArray(payload?.components)
    && payload.components.some(component => component?.component === 'product_card')
  const suggestions = []

  const pushSuggestion = (prompt) => {
    const normalizedPrompt = typeof prompt === 'string' ? prompt.trim() : ''
    if (!normalizedPrompt)
      return
    if (suggestions.some(existing => existing.toLowerCase() === normalizedPrompt.toLowerCase()))
      return
    suggestions.push(normalizedPrompt)
  }

  if (/sleep|bedtime|rest|anxious|anxiety|calm|overthink/.test(answer)) {
    pushSuggestion(hasProductCard ? 'Show me another crystal for sleep' : 'Recommend a sleep crystal from the store')
    pushSuggestion('Give me a 5-minute bedtime ritual')
    pushSuggestion('How should I cleanse and charge it?')
  }
  else if (/love|relationship|partner|compatibility|heart/.test(answer)) {
    pushSuggestion(hasProductCard ? 'Show me a softer alternative for love' : 'Recommend a love crystal from the store')
    pushSuggestion('Give me a simple love ritual')
    pushSuggestion('What should I pair it with?')
  }
  else if (/focus|clarity|abundance|career|work|study|confidence/.test(answer)) {
    pushSuggestion(hasProductCard ? 'Show me 2 alternatives for focus' : 'Recommend a crystal for focus from the store')
    pushSuggestion('Give me a daily intention ritual')
    pushSuggestion('How should I use it each morning?')
  }

  if (suggestions.length === 0) {
    pushSuggestion(hasProductCard ? 'Show me 2 alternatives from the store' : 'Recommend a crystal product from the store')
    pushSuggestion('Give me a short ritual for this')
    pushSuggestion('How do I cleanse and charge it?')
  }

  return suggestions.slice(0, 3)
}

const buildServiceSuggestedQuestionsRequest = ({
  chatUrl,
  apiKey,
  messageId,
  userId,
}) => {
  const suggestedUrl = new URL(`../messages/${messageId}/suggested`, `${chatUrl.replace(/\/$/, '')}/`)
  suggestedUrl.searchParams.set('user', userId || 'shopify-guest')

  return {
    url: suggestedUrl.toString(),
    options: {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${apiKey}`,
      },
    },
  }
}

const buildServiceAppParametersRequest = ({
  chatUrl,
  apiKey,
}) => ({
  url: new URL('../parameters', `${chatUrl.replace(/\/$/, '')}/`).toString(),
  options: {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${apiKey}`,
    },
  },
})

const normalizeServiceAppParameters = (value) => {
  const payload = value?.data && typeof value.data === 'object' ? value.data : value
  const suggestedQuestionsAfterAnswer = payload?.suggested_questions_after_answer

  return {
    openingStatement: typeof payload?.opening_statement === 'string' ? payload.opening_statement.trim() : '',
    suggestedQuestions: normalizeSuggestedQuestions(payload?.suggested_questions || []),
    suggestedQuestionsAfterAnswerEnabled: suggestedQuestionsAfterAnswer === true
      || suggestedQuestionsAfterAnswer?.enabled === true,
  }
}

const fetchServiceAppParameters = async ({
  chatUrl,
  apiKey,
}) => {
  try {
    const request = buildServiceAppParametersRequest({
      chatUrl,
      apiKey,
    })
    const { response, text } = await fetchTextWithTimeout(
      request.url,
      request.options,
      Math.min(SUGGESTED_QUESTIONS_REQUEST_TIMEOUT_MS, config.difyRequestTimeoutMs),
    )
    const payload = parseTextPayload(text)

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        code: 'dify_parameters_failed',
        message: payload?.message || 'Failed to load Dify app parameters',
        details: payload,
      }
    }

    return {
      ok: true,
      status: response.status,
      data: normalizeServiceAppParameters(payload),
    }
  }
  catch (error) {
    return {
      ok: false,
      status: 0,
      code: 'dify_parameters_failed',
      message: error instanceof Error ? error.message : 'Failed to load Dify app parameters',
    }
  }
}

const fetchServiceSuggestedQuestions = async ({
  chatUrl,
  apiKey,
  messageId,
  userId,
}) => {
  if (!messageId)
    return {
      ok: false,
      status: 0,
      suggestions: [],
    }

  try {
    const request = buildServiceSuggestedQuestionsRequest({
      chatUrl,
      apiKey,
      messageId,
      userId,
    })
    const { response, text } = await fetchTextWithTimeout(
      request.url,
      request.options,
      Math.min(SUGGESTED_QUESTIONS_REQUEST_TIMEOUT_MS, config.difyRequestTimeoutMs),
    )

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        suggestions: [],
      }
    }

    return {
      ok: true,
      status: response.status,
      suggestions: normalizeSuggestedQuestions(parseTextPayload(text)),
    }
  }
  catch {
    return {
      ok: false,
      status: 0,
      suggestions: [],
    }
  }
}

const attachSuggestedQuestions = async ({
  payload,
  chatUrl,
  apiKey,
  userId,
  onProgress = null,
}) => {
  if (!payload || typeof payload !== 'object')
    return payload

  const suggestedQuestionsResult = await fetchServiceSuggestedQuestions({
    chatUrl,
    apiKey,
    messageId: payload.messageId,
    userId,
  })
  const suggestions = suggestedQuestionsResult.suggestions.length > 0
    ? suggestedQuestionsResult.suggestions
    : (!suggestedQuestionsResult.ok ? buildFallbackSuggestedQuestions(payload) : [])

  const nextPayload = {
    ...payload,
    suggestions,
  }

  if (suggestions.length > 0 && onProgress) {
    onProgress({
      type: 'suggestions',
      payload: {
        suggestions,
        messageId: payload.messageId || null,
        conversationId: payload.conversationId || null,
      },
    })
  }

  return nextPayload
}

const compressToDifyParam = (value) => gzipSync(String(value), { level: 9 }).toString('base64')

const isRetryableDifyFailure = (result) => {
  if (!result || result.ok)
    return false

  const message = String(result.message || result.details?.message || '').toLowerCase()
  return (
    result.status >= 500
    || message.includes('timeout')
    || message.includes('timed out')
    || message.includes('connection error')
    || message.includes('connection reset')
    || message.includes('server unavailable')
    || message.includes('max retries')
    || message.includes('ssl')
    || message.includes('eof')
    || message.includes('temporarily')
  )
}

const buildEmbeddedChatUrl = ({ baseUrl, accessToken, userId, conversationId = null }) => {
  const iframeUrl = new URL(`/chatbot/${accessToken}`, `${baseUrl.replace(/\/$/, '')}/`)
  if (userId)
    iframeUrl.searchParams.set('sys.user_id', compressToDifyParam(userId))
  if (conversationId)
    iframeUrl.searchParams.set('sys.conversation_id', compressToDifyParam(conversationId))
  return iframeUrl.toString()
}

const buildServiceChatRequest = ({
  chatUrl,
  apiKey,
  message,
  conversationId,
  userId,
  memoryContext = null,
  controller,
  responseMode = 'streaming',
}) => ({
  url: chatUrl,
  options: {
    method: 'POST',
    headers: {
      accept: 'application/json, text/event-stream',
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      inputs: memoryContext ? { memory_context: memoryContext } : {},
      query: message,
      response_mode: responseMode,
      conversation_id: conversationId || undefined,
      user: userId || 'shopify-guest',
    }),
    signal: controller.signal,
  },
})

const buildServiceChatStopRequest = ({
  chatUrl,
  apiKey,
  taskId,
  userId,
  controller,
}) => ({
  url: new URL(`./${taskId}/stop`, `${chatUrl.replace(/\/$/, '')}/`).toString(),
  options: {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      user: userId || 'shopify-guest',
    }),
    signal: controller.signal,
  },
})

const sendServiceApiChat = async ({
  chatUrl,
  apiKey,
  message,
  conversationId,
  userId,
  memoryContext = null,
  onProgress = null,
  responseMode = 'streaming',
  emitErrors = true,
  externalAbortSignal = null,
}) => {
  const controller = new AbortController()
  const hydrationContext = createStorefrontComponentHydrationContext()
  const timeoutHandle = setTimeout(() => controller.abort(), config.difyRequestTimeoutMs)
  const handleExternalAbort = () => controller.abort()
  const throwIfAborted = () => {
    if (controller.signal.aborted || externalAbortSignal?.aborted)
      throw createAbortError()
  }

  if (externalAbortSignal) {
    if (externalAbortSignal.aborted)
      controller.abort()
    else
      externalAbortSignal.addEventListener('abort', handleExternalAbort, { once: true })
  }

  try {
    const request = buildServiceChatRequest({
      chatUrl,
      apiKey,
      message,
      conversationId,
      userId,
      memoryContext,
      controller,
      responseMode,
    })
    const response = await fetch(request.url, request.options)

    const contentType = response.headers.get('content-type') || ''

    if (!response.ok) {
      const text = await response.text()
      const payload = parseTextPayload(text)
      return {
        ok: false,
        status: response.status,
        code: 'dify_request_failed',
        message: payload?.message || 'Dify chat request failed',
        details: payload,
      }
    }

    if (!contentType.includes('text/event-stream') || !response.body) {
      const text = await response.text()
      let payload = await normalizeDifyAnswer(parseTextPayload(text), hydrationContext)
      payload = await attachSuggestedQuestions({
        payload,
        chatUrl,
        apiKey,
        userId,
      })
      onProgress?.({
        type: 'complete',
        payload,
      })
      return {
        ok: true,
        status: 200,
        data: payload,
      }
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    const events = []
    let buffer = ''
    let emittedResponseStatus = false
    let forwardedAnswer = ''
    let forwardedVisibleAnswer = ''
    let forwardedComponents = []
    let lastStatusKey = ''
    let sawReasoningActivity = false
    let hasForwardedVisibleDelta = false

    const emitStatus = (payload) => {
      if (!payload?.message)
        return

      const statusKey = `${payload.stage || 'status'}:${payload.tool || ''}:${payload.message}`
      if (statusKey === lastStatusKey)
        return

      lastStatusKey = statusKey
      onProgress?.({
        type: 'status',
        payload,
      })
    }

    while (true) {
      throwIfAborted()
      const { done, value } = await reader.read()
      if (done)
        break

      throwIfAborted()
      buffer += decoder.decode(value, { stream: true })
      const parsed = extractSseEvents(buffer)
      buffer = parsed.remaining

      for (const event of parsed.events) {
        throwIfAborted()
        events.push(event)

        const eventComponents = await hydrateChatComponentsFromPayload(event, hydrationContext)
        if (eventComponents.length > 0) {
          const nextComponents = diffChatComponents(forwardedComponents, eventComponents)
          forwardedComponents = mergeChatComponents(forwardedComponents, eventComponents)

          if (nextComponents.length > 0) {
            onProgress?.({
              type: 'component',
              payload: {
                conversationId: getEventConversationId(event),
                taskId: getEventTaskId(event),
                sourceEvent: event.event || null,
                nodeId: event?.data?.node_id || null,
                nodeType: event?.data?.node_type || null,
                storefrontHydration: describeStorefrontHydrationStatus(hydrationContext),
                components: nextComponents,
              },
            })
          }
        }

        if (event?.event === 'agent_thought') {
          throwIfAborted()
          const toolName = getToolName(event)
          if (typeof event?.thought === 'string' && event.thought.trim())
            sawReasoningActivity = true
          if (toolName)
            sawReasoningActivity = true

          const thoughtPayload = buildThoughtStatusPayload(event)
          if (thoughtPayload)
            emitStatus(thoughtPayload)

          if (toolName)
            emitStatus(buildStatusPayload({ stage: 'tool', event }))
        }

        const isChunkEvent = ['message', 'agent_message', 'text_chunk'].includes(event?.event)
        const isReplaceEvent = ['message_replace', 'text_replace'].includes(event?.event)
        const eventText = getEventText(event)
        const eventSelector = getEventVariableSelector(event)
        const selectorMarkedInternal = selectorLooksLikeInternalThought(eventSelector)
        const selectorMarkedFinal = selectorLooksLikeFinalAnswer(eventSelector)

        if ((isChunkEvent || isReplaceEvent) && eventText) {
          if (selectorMarkedInternal && !selectorMarkedFinal) {
            continue
          }

          if (isReplaceEvent) {
            throwIfAborted()
            forwardedAnswer = eventText
          }
          else {
            throwIfAborted()
            forwardedAnswer += eventText
          }

          const nextVisibleAnswer = cleanStreamingVisibleAnswer(forwardedAnswer, {
            sawReasoningActivity,
          }) || ''

          if (nextVisibleAnswer && !emittedResponseStatus) {
            throwIfAborted()
            emittedResponseStatus = true
            emitStatus(buildStatusPayload({ stage: 'compose' }))
          }

          const shouldBufferVisibleStreaming = sawReasoningActivity && !hasForwardedVisibleDelta
          const previousVisibleAnswer = forwardedVisibleAnswer
          if (nextVisibleAnswer)
            forwardedVisibleAnswer = nextVisibleAnswer

          if (!shouldBufferVisibleStreaming && nextVisibleAnswer !== previousVisibleAnswer) {
            const shouldReplace = isReplaceEvent || !nextVisibleAnswer.startsWith(previousVisibleAnswer)
            const visibleText = shouldReplace
              ? nextVisibleAnswer
              : nextVisibleAnswer.slice(previousVisibleAnswer.length)
            if (visibleText)
              hasForwardedVisibleDelta = true

            onProgress?.({
              type: shouldReplace ? 'replace' : 'delta',
              payload: {
                answer: visibleText,
                text: visibleText,
                reason: typeof event?.reason === 'string' ? event.reason : null,
                selector: eventSelector,
                conversationId: getEventConversationId(event),
                taskId: getEventTaskId(event),
              },
            })
          }
        }

        if (event?.event === 'error') {
          const messageText = event.message || event.answer || 'Dify streaming request failed'
          if (emitErrors) {
            onProgress?.({
              type: 'error',
              payload: {
                code: 'dify_request_failed',
                message: messageText,
              },
            })
          }
          return {
            ok: false,
            status: 502,
            code: 'dify_request_failed',
            message: messageText,
            details: event,
          }
        }

        if (['message_end', 'advanced_chat_message_end', 'workflow_finished'].includes(event?.event)) {
          let payload = appendStreamMetadata(
            normalizeDifyStream(events),
            events,
            describeStorefrontHydrationStatus(hydrationContext),
          )
          payload.answer = cleanVisibleAnswer(payload.answer)
          if (!payload.answer && forwardedVisibleAnswer)
            payload.answer = forwardedVisibleAnswer
          if (forwardedComponents.length > 0)
            payload.components = mergeChatComponents(payload.components, forwardedComponents)
          payload = await attachSuggestedQuestions({
            payload,
            chatUrl,
            apiKey,
            userId,
            onProgress,
          })
          onProgress?.({
            type: 'complete',
            payload,
          })
          await reader.cancel()
          return {
            ok: true,
            status: 200,
            data: payload,
          }
        }
      }
    }

    const tail = decoder.decode()
    if (tail) {
      buffer += tail
      const parsed = extractSseEvents(`${buffer}\n\n`)
      events.push(...parsed.events)
    }

    let payload = appendStreamMetadata(
      normalizeDifyStream(events),
      events,
      describeStorefrontHydrationStatus(hydrationContext),
    )
    payload.answer = cleanVisibleAnswer(payload.answer)
    if (!payload.answer && forwardedVisibleAnswer)
      payload.answer = forwardedVisibleAnswer
    if (forwardedComponents.length > 0)
      payload.components = mergeChatComponents(payload.components, forwardedComponents)
    payload = await attachSuggestedQuestions({
      payload,
      chatUrl,
      apiKey,
      userId,
      onProgress,
    })
    onProgress?.({
      type: 'complete',
      payload,
    })
    return {
      ok: true,
      status: 200,
      data: payload,
    }
  }
  catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return {
        ok: false,
        status: 499,
        code: 'dify_request_aborted',
        message: error.message,
      }
    }

    if (error instanceof Error) {
      if (emitErrors) {
        onProgress?.({
          type: 'error',
          payload: {
            code: 'dify_request_failed',
            message: error.message,
          },
        })
      }
      return {
        ok: false,
        status: 502,
        code: 'dify_request_failed',
        message: error.message,
      }
    }

    return {
      ok: false,
      status: 502,
      code: 'dify_request_failed',
      message: 'Dify chat request failed',
    }
  }
  finally {
    if (externalAbortSignal)
      externalAbortSignal.removeEventListener('abort', handleExternalAbort)
    clearTimeout(timeoutHandle)
  }
}

const stopServiceApiChat = async ({
  chatUrl,
  apiKey,
  taskId,
  userId,
}) => {
  const controller = new AbortController()
  const timeoutHandle = setTimeout(() => controller.abort(), config.difyRequestTimeoutMs)

  try {
    const request = buildServiceChatStopRequest({
      chatUrl,
      apiKey,
      taskId,
      userId,
      controller,
    })
    const response = await fetch(request.url, request.options)
    const text = await response.text()
    const payload = parseTextPayload(text)

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        code: 'dify_stop_failed',
        message: payload?.message || 'Dify stop request failed',
        details: payload,
      }
    }

    return {
      ok: true,
      status: response.status,
      data: payload,
    }
  }
  catch (error) {
    return {
      ok: false,
      status: 502,
      code: 'dify_stop_failed',
      message: error instanceof Error ? error.message : 'Dify stop request failed',
    }
  }
  finally {
    clearTimeout(timeoutHandle)
  }
}

class DifyConsoleDevClient {
  constructor({ baseUrl, email, password, appId }) {
    this.baseUrl = baseUrl.replace(/\/$/, '')
    this.email = email
    this.password = password
    this.appId = appId
    this.cookieJar = new Map()
    this.csrfToken = null
    this.appApiKey = null
    this.appDetail = null
  }

  _storeCookies(response) {
    for (const rawCookie of getSetCookies(response)) {
      const parsed = parseCookiePair(rawCookie)
      if (!parsed)
        continue
      this.cookieJar.set(parsed.name, parsed.value)
      if (parsed.name.endsWith('csrf_token'))
        this.csrfToken = parsed.value
    }
  }

  _cookieHeader() {
    return Array.from(this.cookieJar.entries())
      .map(([name, value]) => `${name}=${value}`)
      .join('; ')
  }

  async _request(path, { method = 'GET', headers = {}, body } = {}) {
    const finalHeaders = {
      accept: 'application/json',
      ...headers,
    }

    const cookieHeader = this._cookieHeader()
    if (cookieHeader)
      finalHeaders.cookie = cookieHeader

    const normalizedPath = path.startsWith('/') ? path : `/${path}`
    if (this.csrfToken && normalizedPath !== '/console/api/login' && normalizedPath !== '/console/api/setup')
      finalHeaders['x-csrf-token'] = this.csrfToken

    const { response, text } = await fetchTextWithTimeout(joinUrl(this.baseUrl, normalizedPath), {
      method,
      headers: finalHeaders,
      body,
    }, config.difyRequestTimeoutMs)
    this._storeCookies(response)

    const payload = parseTextPayload(text)
    if (!response.ok) {
      const message = typeof payload === 'object' && payload && payload.message
        ? payload.message
        : `Dify console request failed with status ${response.status}`
      throw new Error(message)
    }

    return payload
  }

  async login() {
    const encodedPassword = Buffer.from(this.password, 'utf8').toString('base64')
    await this._request('/console/api/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: this.email,
        password: encodedPassword,
        remember_me: true,
      }),
    })
  }

  async ensureSession() {
    if (!this.csrfToken || this.cookieJar.size === 0)
      await this.login()
  }

  async ensureAppApiKey() {
    if (this.appApiKey)
      return this.appApiKey

    await this.ensureSession()

    const existingKeys = await this._request(`/console/api/apps/${this.appId}/api-keys`)
    const firstExistingToken = existingKeys?.data?.[0]?.token
    if (firstExistingToken) {
      this.appApiKey = firstExistingToken
      return this.appApiKey
    }

    const createdKey = await this._request(`/console/api/apps/${this.appId}/api-keys`, {
      method: 'POST',
    })
    if (typeof createdKey?.token !== 'string' || !createdKey.token)
      throw new Error('Dify did not return an app API key')

    this.appApiKey = createdKey.token
    return this.appApiKey
  }

  async getAppDetail() {
    if (this.appDetail)
      return this.appDetail

    await this.ensureSession()
    this.appDetail = await this._request(`/console/api/apps/${this.appId}`)
    return this.appDetail
  }
}

export class LocalDifyGateway {
  constructor() {
    this.consoleClient = null
  }

  _getConsoleClient(consoleConfig) {
    if (!this.consoleClient)
      this.consoleClient = new DifyConsoleDevClient(consoleConfig)
    return this.consoleClient
  }

  async _resolveServiceApiConfig() {
    const configured = requireDifyChatConfig()
    if (configured.ok) {
      return {
        ok: true,
        value: {
          ...configured.value,
          mode: 'service-api',
        },
      }
    }

    if (!config.difyDevUseConsole) {
      return {
        ok: false,
        status: 501,
        code: 'dify_not_configured',
        message: configured.error,
        details: {
          expected: 'DIFY_APP_API_KEY or local console bootstrap credentials',
        },
      }
    }

    const consoleConfig = requireDifyConsoleDevConfig()
    if (!consoleConfig.ok) {
      return {
        ok: false,
        status: 501,
        code: 'dify_console_dev_not_configured',
        message: consoleConfig.error,
      }
    }

    try {
      const apiKey = await this._getConsoleClient(consoleConfig.value).ensureAppApiKey()
      return {
        ok: true,
        value: {
          chatUrl: config.difyResolvedChatUrl,
          apiKey,
          mode: 'service-api-bootstrap',
        },
      }
    }
    catch (error) {
      return {
        ok: false,
        status: 502,
        code: 'dify_console_bootstrap_failed',
        message: error instanceof Error ? error.message : 'Dify app API key bootstrap failed',
      }
    }
  }

  async sendChat({ message, conversationId, userId, memoryContext = null }) {
    const serviceApiConfig = await this._resolveServiceApiConfig()
    if (!serviceApiConfig.ok)
      return serviceApiConfig

    const difyResult = await sendServiceApiChat({
      chatUrl: serviceApiConfig.value.chatUrl,
      apiKey: serviceApiConfig.value.apiKey,
      message,
      conversationId,
      userId,
      memoryContext,
      responseMode: 'streaming',
    })

    if (!difyResult.ok)
      return difyResult

    return {
      ...difyResult,
      mode: serviceApiConfig.value.mode,
    }
  }

  async getChatParameters() {
    const serviceApiConfig = await this._resolveServiceApiConfig()
    if (!serviceApiConfig.ok)
      return serviceApiConfig

    const difyResult = await fetchServiceAppParameters({
      chatUrl: serviceApiConfig.value.chatUrl,
      apiKey: serviceApiConfig.value.apiKey,
    })

    if (!difyResult.ok)
      return difyResult

    return {
      ...difyResult,
      mode: serviceApiConfig.value.mode,
    }
  }

  async streamChat({ message, conversationId, userId, memoryContext = null, onProgress = null, externalAbortSignal = null }) {
    const serviceApiConfig = await this._resolveServiceApiConfig()
    if (!serviceApiConfig.ok)
      return serviceApiConfig

    let difyResult = null
    for (let attempt = 1; attempt <= DEFAULT_STREAM_RETRY_ATTEMPTS; attempt += 1) {
      difyResult = await sendServiceApiChat({
        chatUrl: serviceApiConfig.value.chatUrl,
        apiKey: serviceApiConfig.value.apiKey,
        message,
        conversationId,
        userId,
        memoryContext,
        onProgress,
        responseMode: 'streaming',
        emitErrors: false,
        externalAbortSignal,
      })

      if (difyResult.ok || attempt >= DEFAULT_STREAM_RETRY_ATTEMPTS || !isRetryableDifyFailure(difyResult))
        break

      onProgress?.({
        type: 'status',
        payload: {
          message: 'The model connection was slow, so AskCrystal is trying once more...',
        },
      })
    }

    if (!difyResult.ok)
      return difyResult

    return {
      ...difyResult,
      mode: serviceApiConfig.value.mode,
    }
  }

  async stopChat({ taskId, userId }) {
    const serviceApiConfig = await this._resolveServiceApiConfig()
    if (!serviceApiConfig.ok)
      return serviceApiConfig

    const difyResult = await stopServiceApiChat({
      chatUrl: serviceApiConfig.value.chatUrl,
      apiKey: serviceApiConfig.value.apiKey,
      taskId,
      userId,
    })

    if (!difyResult.ok)
      return difyResult

    return {
      ...difyResult,
      mode: serviceApiConfig.value.mode,
    }
  }

  async getEmbedConfig({ userId, conversationId = null }) {
    const normalizedUserId = userId || 'shopify-guest'

    if (config.difySiteAccessToken) {
      const baseUrl = config.difySiteAppBaseUrl || config.difyBaseUrl
      return {
        ok: true,
        status: 200,
        data: {
          mode: 'site-token',
          accessToken: config.difySiteAccessToken,
          baseUrl,
          userId: normalizedUserId,
          conversationId,
          iframeUrl: buildEmbeddedChatUrl({
            baseUrl,
            accessToken: config.difySiteAccessToken,
            userId: normalizedUserId,
            conversationId,
          }),
        },
      }
    }

    const consoleConfig = requireDifyConsoleDevConfig()
    if (!consoleConfig.ok) {
      return {
        ok: false,
        status: 501,
        code: 'dify_embed_not_configured',
        message: consoleConfig.error,
      }
    }

    try {
      const appDetail = await this._getConsoleClient(consoleConfig.value).getAppDetail()
      const accessToken = appDetail?.site?.access_token
      const baseUrl = appDetail?.site?.app_base_url || config.difyBaseUrl

      if (typeof accessToken !== 'string' || !accessToken) {
        return {
          ok: false,
          status: 502,
          code: 'dify_embed_token_missing',
          message: 'Dify app site access token is missing',
          details: {
            appId: consoleConfig.value.appId,
          },
        }
      }

      return {
        ok: true,
        status: 200,
        data: {
          mode: 'console-site-bootstrap',
          accessToken,
          baseUrl,
          userId: normalizedUserId,
          conversationId,
          iframeUrl: buildEmbeddedChatUrl({
            baseUrl,
            accessToken,
            userId: normalizedUserId,
            conversationId,
          }),
        },
      }
    }
    catch (error) {
      return {
        ok: false,
        status: 502,
        code: 'dify_embed_bootstrap_failed',
        message: error instanceof Error ? error.message : 'Failed to load Dify embed config',
      }
    }
  }
}
