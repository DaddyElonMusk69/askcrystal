export const CHAT_COMPONENT_LIBRARY_VERSION = 1

export const CHAT_COMPONENTS = Object.freeze({
  product_card: 'product_card',
  product_carousel: 'product_carousel',
  ritual_card: 'ritual_card',
  reading_summary: 'reading_summary',
  collection_link: 'collection_link',
  next_steps: 'next_steps',
})

export const CHAT_COMPONENT_TOOL_NAMES = Object.freeze({
  [CHAT_COMPONENTS.product_card]: 'display_product_card',
  [CHAT_COMPONENTS.product_carousel]: 'display_product_carousel',
  [CHAT_COMPONENTS.ritual_card]: 'display_ritual_card',
  [CHAT_COMPONENTS.reading_summary]: 'display_reading_summary',
  [CHAT_COMPONENTS.collection_link]: 'display_collection_link',
  [CHAT_COMPONENTS.next_steps]: 'display_next_steps',
})

export const CHAT_COMPONENT_BY_TOOL_NAME = Object.freeze(
  Object.fromEntries(
    Object.entries(CHAT_COMPONENT_TOOL_NAMES).map(([component, toolName]) => [toolName, component]),
  ),
)

const createInlineFencePattern = () => /```askcrystal-ui\s*([\s\S]*?)```/gi
const createInlineTagPattern = () => /<askcrystal-ui>\s*([\s\S]*?)<\/askcrystal-ui>/gi

const isRecord = (value) => typeof value === 'object' && value !== null && !Array.isArray(value)

const asNonEmptyString = (value, fallback = '') => {
  if (typeof value !== 'string')
    return fallback

  const next = value.trim()
  return next || fallback
}

const asOptionalString = (value) => {
  const next = asNonEmptyString(value)
  return next || null
}

const asUrlLike = (value) => {
  const next = asNonEmptyString(value)
  if (!next)
    return null

  if (/^(https?:\/\/|\/)/i.test(next))
    return next

  return `/${next.replace(/^\/+/, '')}`
}

const asBoolean = (value, fallback = true) => {
  if (typeof value === 'boolean')
    return value

  return fallback
}

const asStringList = (value, limit = 6) => {
  if (!Array.isArray(value))
    return []

  return value
    .map(item => asNonEmptyString(typeof item === 'string' ? item : item?.label || item?.title || item?.text))
    .filter(Boolean)
    .slice(0, limit)
}

const normalizeProduct = (value) => {
  if (!isRecord(value))
    return null

  const title = asNonEmptyString(value.title, 'Untitled crystal')
  const url = asUrlLike(value.url)
  const product = {
    id: asOptionalString(value.id || value.productId),
    handle: asOptionalString(value.handle),
    title,
    url: url || (value.handle ? `/products/${value.handle}` : null),
    image: asUrlLike(value.image || value.featuredImage || value.imageUrl),
    price: asOptionalString(value.price || value.priceText),
    compareAtPrice: asOptionalString(value.compareAtPrice || value.compareAt),
    badge: asOptionalString(value.badge || value.tag || value.intent || value.eyebrow),
    summary: asOptionalString(value.summary || value.description || value.body),
    reason: asOptionalString(value.reason),
    note: asOptionalString(value.note || value.ritual || value.howToUse || value.how_to_use),
    ctaLabel: asOptionalString(value.ctaLabel || value.buttonLabel || value.linkLabel),
    merchandiseId: asOptionalString(value.merchandiseId || value.variantId),
    variantId: asOptionalString(value.variantId || value.merchandiseId),
    available: asBoolean(value.available, true),
  }

  return product
}

const normalizeProductList = (value, limit = 6) => {
  if (!Array.isArray(value))
    return []

  return value
    .map(normalizeProduct)
    .filter(Boolean)
    .slice(0, limit)
}

const normalizeProductCardProps = (value) => {
  if (!isRecord(value))
    return null

  const product = normalizeProduct(value.product || value)
  if (!product)
    return null

  return {
    eyebrow: asNonEmptyString(value.eyebrow || value.kicker || value.intent, 'Prescription'),
    reason: asOptionalString(value.reason || product.reason),
    note: asOptionalString(value.note || value.ritual || product.note),
    ctaLabel: asNonEmptyString(value.ctaLabel || value.buttonLabel || product.ctaLabel, 'View crystal'),
    product,
  }
}

const normalizeProductCarouselProps = (value) => {
  if (!isRecord(value))
    return null

  const products = normalizeProductList(value.products, 8)
  if (products.length === 0)
    return null

  return {
    eyebrow: asNonEmptyString(value.eyebrow || value.kicker, 'Matched for you'),
    title: asNonEmptyString(value.title, 'Recommended crystals'),
    reason: asOptionalString(value.reason || value.description),
    browseUrl: asUrlLike(value.browseUrl || value.url),
    browseLabel: asNonEmptyString(value.browseLabel || value.ctaLabel, 'Browse all'),
    products,
  }
}

const normalizeRitualCardProps = (value) => {
  if (!isRecord(value))
    return null

  const steps = asStringList(value.steps, 6)
  if (steps.length === 0 && !asNonEmptyString(value.summary))
    return null

  return {
    eyebrow: asNonEmptyString(value.eyebrow || value.kicker, 'Ritual'),
    title: asNonEmptyString(value.title, 'How to work with this energy'),
    summary: asOptionalString(value.summary || value.reason || value.description),
    duration: asOptionalString(value.duration),
    steps,
    note: asOptionalString(value.note),
    disclaimer: asOptionalString(value.disclaimer),
    linkedProducts: normalizeProductList(value.linkedProducts || value.products, 3),
  }
}

const normalizeReadingSummaryProps = (value) => {
  if (!isRecord(value))
    return null

  const summary = asNonEmptyString(value.summary || value.description)
  if (!summary)
    return null

  return {
    eyebrow: asNonEmptyString(value.eyebrow || value.kicker, 'Energy blueprint'),
    title: asNonEmptyString(value.title, 'What your energy is asking for'),
    summary,
    energyFocus: asOptionalString(value.energyFocus || value.energy || value.focus),
    highlights: asStringList(value.highlights || value.bullets || value.keyPoints, 5),
    disclaimer: asOptionalString(value.disclaimer),
  }
}

const normalizeCollectionLinkProps = (value) => {
  if (!isRecord(value))
    return null

  const url = asUrlLike(value.url || value.browseUrl)
  if (!url)
    return null

  return {
    eyebrow: asNonEmptyString(value.eyebrow || value.kicker, 'Browse deeper'),
    title: asNonEmptyString(value.title, 'Open the full collection'),
    description: asOptionalString(value.description || value.reason),
    url,
    label: asNonEmptyString(value.label || value.ctaLabel, 'Shop collection'),
    image: asUrlLike(value.image || value.imageUrl),
  }
}

const normalizeNextStepsProps = (value) => {
  if (!isRecord(value))
    return null

  const steps = asStringList(value.steps, 5)
  if (steps.length === 0)
    return null

  return {
    eyebrow: asNonEmptyString(value.eyebrow || value.kicker, 'Next steps'),
    title: asNonEmptyString(value.title, 'What to do next'),
    steps,
    closing: asOptionalString(value.closing || value.note),
  }
}

const CHAT_COMPONENT_DEFINITIONS = Object.freeze({
  [CHAT_COMPONENTS.product_card]: {
    toolName: CHAT_COMPONENT_TOOL_NAMES.product_card,
    normalizeProps: normalizeProductCardProps,
  },
  [CHAT_COMPONENTS.product_carousel]: {
    toolName: CHAT_COMPONENT_TOOL_NAMES.product_carousel,
    normalizeProps: normalizeProductCarouselProps,
  },
  [CHAT_COMPONENTS.ritual_card]: {
    toolName: CHAT_COMPONENT_TOOL_NAMES.ritual_card,
    normalizeProps: normalizeRitualCardProps,
  },
  [CHAT_COMPONENTS.reading_summary]: {
    toolName: CHAT_COMPONENT_TOOL_NAMES.reading_summary,
    normalizeProps: normalizeReadingSummaryProps,
  },
  [CHAT_COMPONENTS.collection_link]: {
    toolName: CHAT_COMPONENT_TOOL_NAMES.collection_link,
    normalizeProps: normalizeCollectionLinkProps,
  },
  [CHAT_COMPONENTS.next_steps]: {
    toolName: CHAT_COMPONENT_TOOL_NAMES.next_steps,
    normalizeProps: normalizeNextStepsProps,
  },
})

export const normalizeChatComponent = (value, fallbackId = 'component') => {
  if (!isRecord(value))
    return null

  const component = asNonEmptyString(
    value.component || value.componentType || CHAT_COMPONENT_BY_TOOL_NAME[value.toolName],
  )
  const definition = CHAT_COMPONENT_DEFINITIONS[component]
  if (!definition)
    return null

  const props = definition.normalizeProps(
    value.props
    || value.result?.props
    || value.result
    || value.args?.props
    || value.args
    || value,
  )

  if (!props)
    return null

  const id = asNonEmptyString(value.id || value.toolCallId, `${definition.toolName}-${fallbackId}`)

  return {
    type: 'component',
    component,
    toolName: definition.toolName,
    id,
    version: CHAT_COMPONENT_LIBRARY_VERSION,
    props,
  }
}

export const mergeChatComponents = (current = [], incoming = []) => {
  const registry = new Map()

  for (const item of [...current, ...incoming]) {
    const normalized = normalizeChatComponent(item, registry.size)
    if (!normalized)
      continue

    const key = `${normalized.toolName}:${normalized.id}`
    registry.set(key, normalized)
  }

  return [...registry.values()]
}

export const extractChatComponentsFromPayload = (value) => {
  const components = []

  const visit = (candidate, depth = 0) => {
    if (depth > 3 || candidate == null)
      return

    if (Array.isArray(candidate)) {
      candidate.forEach((item, index) => {
        const normalized = normalizeChatComponent(item, `${depth}-${index}`)
        if (normalized)
          components.push(normalized)
      })
      return
    }

    const normalized = normalizeChatComponent(candidate, `${depth}`)
    if (normalized) {
      components.push(normalized)
      return
    }

    if (!isRecord(candidate))
      return

    visit(candidate.components, depth + 1)
    visit(candidate.component, depth + 1)
    visit(candidate.ui?.components, depth + 1)
    visit(candidate.payload?.components, depth + 1)
    visit(candidate.data?.components, depth + 1)
    visit(candidate.data?.ui?.components, depth + 1)
    visit(candidate.metadata?.components, depth + 1)
    visit(candidate.metadata?.ui?.components, depth + 1)
  }

  visit(value)

  return mergeChatComponents([], components)
}

export const createChatComponentToolPart = (value, fallbackId = 'component') => {
  const component = normalizeChatComponent(value, fallbackId)
  if (!component)
    return null

  const args = {
    component: component.component,
    version: component.version,
    props: component.props,
  }

  return {
    type: 'tool-call',
    toolCallId: component.id,
    toolName: component.toolName,
    args,
    argsText: JSON.stringify(args),
    result: {
      component: component.component,
      version: component.version,
      props: component.props,
    },
  }
}

export const createChatComponentToolParts = (values = []) => {
  if (!Array.isArray(values))
    return []

  return values
    .map((value, index) => createChatComponentToolPart(value, index))
    .filter(Boolean)
}

export const readChatComponentToolPayload = (value) => normalizeChatComponent(value)

const parseInlineJson = (raw) => {
  try {
    return JSON.parse(raw)
  }
  catch {
    return null
  }
}

export const extractInlineChatComponentManifest = (answer = '') => {
  let cleanedAnswer = String(answer || '')
  let components = []

  const extractMatches = (pattern) => {
    const matches = [...cleanedAnswer.matchAll(pattern)]
    if (matches.length === 0)
      return

    for (const match of matches) {
      const parsed = parseInlineJson(match[1])
      if (parsed)
        components = mergeChatComponents(components, extractChatComponentsFromPayload(parsed))
    }

    cleanedAnswer = cleanedAnswer.replace(pattern, '').trim()
  }

  extractMatches(createInlineFencePattern())
  extractMatches(createInlineTagPattern())

  return {
    answer: cleanedAnswer.replace(/\n{3,}/g, '\n\n').trim(),
    components,
  }
}

export const stripInlineChatComponentManifestPreview = (answer = '') => {
  const fencePattern = createInlineFencePattern()
  const tagPattern = createInlineTagPattern()
  let preview = String(answer || '')
    .replace(fencePattern, '')
    .replace(tagPattern, '')

  const lowerPreview = preview.toLowerCase()
  const fenceIndex = lowerPreview.indexOf('```askcrystal-ui')
  if (fenceIndex !== -1)
    preview = preview.slice(0, fenceIndex)

  const tagIndex = lowerPreview.indexOf('<askcrystal-ui>')
  if (tagIndex !== -1)
    preview = preview.slice(0, tagIndex)

  return preview.trimEnd()
}
