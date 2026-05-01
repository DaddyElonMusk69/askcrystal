export const CHAT_COMPONENT_LIBRARY_VERSION = 1

export const CHAT_COMPONENTS = Object.freeze({
  product_card: 'product_card',
  product_carousel: 'product_carousel',
})

export const CHAT_COMPONENT_TOOL_NAMES = Object.freeze({
  [CHAT_COMPONENTS.product_card]: 'display_product_card',
  [CHAT_COMPONENTS.product_carousel]: 'display_product_carousel',
})

export const CHAT_COMPONENT_BY_TOOL_NAME = Object.freeze(
  Object.fromEntries(
    Object.entries(CHAT_COMPONENT_TOOL_NAMES).map(([component, toolName]) => [toolName, component]),
  ),
)

const createInlineFencePattern = () => /```askcrystal-ui\s*([\s\S]*?)```/gi
const createInlineTagPattern = () => /<askcrystal-ui>\s*([\s\S]*?)<\/askcrystal-ui>/gi
const INLINE_MANIFEST_MARKERS = Object.freeze([
  { marker: '```askcrystal-ui', minPrefixLength: 3 },
  { marker: '<askcrystal-ui>', minPrefixLength: 4 },
])

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

const normalizeProductRef = (value) => {
  if (!isRecord(value))
    return null

  const productRef = {
    product_id: asOptionalString(value.product_id),
    handle: asOptionalString(value.handle),
    variant_id: asOptionalString(value.variant_id),
  }

  if (!productRef.product_id && !productRef.handle && !productRef.variant_id)
    return null

  return productRef
}

const normalizeProductRefs = (value, limit = 4) => {
  if (!Array.isArray(value))
    return []

  return value
    .map(normalizeProductRef)
    .filter(Boolean)
    .slice(0, limit)
}

const normalizeProductCardProps = (value) => {
  if (!isRecord(value))
    return null

  const productRef = normalizeProductRef(value.product_ref)
  if (!productRef)
    return null

  return {
    eyebrow: asNonEmptyString(value.eyebrow || value.kicker || value.intent, 'Prescription'),
    reason: asOptionalString(value.reason),
    note: asOptionalString(value.note || value.ritual),
    ctaLabel: asNonEmptyString(value.cta_label, 'View crystal'),
    product_ref: productRef,
  }
}

const normalizeProductCarouselProps = (value) => {
  if (!isRecord(value))
    return null

  const productRefs = normalizeProductRefs(value.product_refs, 4)
  if (productRefs.length === 0)
    return null

  return {
    eyebrow: asNonEmptyString(value.eyebrow || value.kicker, 'Matched for you'),
    title: asNonEmptyString(value.title, 'Recommended crystals'),
    reason: asOptionalString(value.reason || value.description),
    product_refs: productRefs,
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
  const manifestComponents = Array.isArray(value)
    ? value
    : isRecord(value) && Array.isArray(value.components)
      ? value.components
      : []

  return mergeChatComponents([], manifestComponents)
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

export const extractInlineChatComponentPayloads = (answer = '') => {
  let cleanedAnswer = String(answer || '')
  const payloads = []

  const extractMatches = (pattern) => {
    const matches = [...cleanedAnswer.matchAll(pattern)]
    if (matches.length === 0)
      return

    for (const match of matches) {
      const parsed = parseInlineJson(match[1])
      if (parsed)
        payloads.push(parsed)
    }

    cleanedAnswer = cleanedAnswer.replace(pattern, '').trim()
  }

  extractMatches(createInlineFencePattern())
  extractMatches(createInlineTagPattern())

  return {
    answer: cleanedAnswer.replace(/\n{3,}/g, '\n\n').trim(),
    payloads,
  }
}

export const extractInlineChatComponentSegments = (answer = '') => {
  const source = String(answer || '')
  const segments = []
  const pattern = /```askcrystal-ui\s*([\s\S]*?)```|<askcrystal-ui>\s*([\s\S]*?)<\/askcrystal-ui>/gi
  let lastIndex = 0
  let match

  while ((match = pattern.exec(source)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        type: 'text',
        value: source.slice(lastIndex, match.index),
      })
    }

    const raw = match[0]
    const parsed = parseInlineJson(match[1] || match[2] || '')

    if (parsed) {
      segments.push({
        type: 'payload',
        value: parsed,
      })
    }
    else {
      segments.push({
        type: 'text',
        value: raw,
      })
    }

    lastIndex = match.index + raw.length
  }

  if (lastIndex < source.length) {
    segments.push({
      type: 'text',
      value: source.slice(lastIndex),
    })
  }

  return segments
}

export const extractInlineChatComponentManifest = (answer = '') => {
  const { answer: cleanedAnswer, payloads } = extractInlineChatComponentPayloads(answer)

  let components = []
  for (const payload of payloads)
    components = mergeChatComponents(components, extractChatComponentsFromPayload(payload))

  return {
    answer: cleanedAnswer,
    components,
  }
}

const findInlineManifestBoundary = (value = '') => {
  const preview = String(value || '').toLowerCase()

  for (let index = 0; index < preview.length; index += 1) {
    for (const { marker, minPrefixLength } of INLINE_MANIFEST_MARKERS) {
      if (preview[index] !== marker[0])
        continue

      const tail = preview.slice(index)
      if (tail.startsWith(marker))
        return index

      const candidate = tail.slice(0, marker.length)
      if (candidate.length >= minPrefixLength && marker.startsWith(candidate))
        return index
    }
  }

  return -1
}

export const stripInlineChatComponentManifestPreview = (answer = '') => {
  const fencePattern = createInlineFencePattern()
  const tagPattern = createInlineTagPattern()
  let preview = String(answer || '')
    .replace(fencePattern, '')
    .replace(tagPattern, '')

  const markerIndex = findInlineManifestBoundary(preview)
  if (markerIndex !== -1)
    preview = preview.slice(0, markerIndex)

  return preview.trimEnd()
}
