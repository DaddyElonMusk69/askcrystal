import {
  extractInlineChatComponentPayloads,
  mergeChatComponents,
  normalizeChatComponent,
} from '../../../../packages/storefront-ui/src/chat-components.mjs'
import {
  createShopifyStorefrontClient,
  hasShopifyStorefrontConfig,
} from '../shopify/storefront-client.mjs'
import { config } from '../config.mjs'

const MAX_VISIT_DEPTH = 6
const PREVIEW_PRODUCT_TITLE = 'Recommended crystal'

const isRecord = value => typeof value === 'object' && value !== null && !Array.isArray(value)

const asNonEmptyString = (value, fallback = '') => {
  if (typeof value !== 'string')
    return fallback

  const normalized = value.trim()
  return normalized || fallback
}

const asOptionalString = value => {
  const normalized = asNonEmptyString(value)
  return normalized || null
}

const asStringList = (value, limit = 8) => {
  if (!Array.isArray(value))
    return []

  return value
    .map(item => asNonEmptyString(typeof item === 'string' ? item : item?.label || item?.title || item?.text))
    .filter(Boolean)
    .slice(0, limit)
}

const getNestedRecord = (...values) => values.find(isRecord) || null

const getNestedArray = (...values) => values.find(Array.isArray) || []

const humanizeHandle = (handle) => {
  const normalized = asNonEmptyString(handle)
  if (!normalized)
    return ''

  return normalized
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, character => character.toUpperCase())
}

const trimSummary = (value, limit = 160) => {
  const normalized = asNonEmptyString(value)
  if (!normalized)
    return null

  if (normalized.length <= limit)
    return normalized

  return `${normalized.slice(0, limit - 1).trimEnd()}...`
}

const asMoneyText = (value) => {
  const amount = Number.parseFloat(value?.amount)
  const currencyCode = asNonEmptyString(value?.currencyCode)
  if (!Number.isFinite(amount) || !currencyCode)
    return null

  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
    }).format(amount)
  }
  catch {
    return `${currencyCode} ${amount}`
  }
}

const formatMoneyText = (amountValue, currencyCode) => {
  const amount = Number.parseFloat(amountValue)
  const normalizedCurrency = asNonEmptyString(currencyCode)
  if (!Number.isFinite(amount) || !normalizedCurrency)
    return null

  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: normalizedCurrency,
      maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
    }).format(amount)
  }
  catch {
    return `${normalizedCurrency} ${amount}`
  }
}

const asUrlPath = (value, fallback = null) => {
  const normalized = asNonEmptyString(value)
  if (!normalized)
    return fallback

  try {
    const url = new URL(normalized)
    if (url.pathname)
      return `${url.pathname}${url.search || ''}${url.hash || ''}`
  }
  catch {}

  if (/^(https?:\/\/|\/)/i.test(normalized))
    return normalized

  return fallback
}

const asJson = (value) => {
  if (typeof value !== 'string')
    return null

  const normalized = value.trim()
  if (!normalized || !/^[\[{]/.test(normalized))
    return null

  try {
    return JSON.parse(normalized)
  }
  catch {
    return null
  }
}

const stripHtml = (value) => {
  const normalized = asNonEmptyString(value)
  if (!normalized)
    return ''

  return normalized
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, '\'')
    .replace(/\s+/g, ' ')
    .trim()
}

const asDescriptionText = (value) => {
  if (typeof value === 'string')
    return stripHtml(value)

  if (isRecord(value))
    return stripHtml(value?.plain_text || value?.text || value?.html || value?.body || '')

  return ''
}

const deriveHandleFromUrl = (value) => {
  const normalized = asNonEmptyString(value)
  if (!normalized)
    return null

  const path = asUrlPath(normalized, normalized)
  const match = path.match(/\/products\/([^/?#]+)/i)
  return match ? asOptionalString(match[1]) : null
}

const deriveCollectionHandleFromUrl = (value) => {
  const normalized = asNonEmptyString(value)
  if (!normalized)
    return null

  const path = asUrlPath(normalized, normalized)
  const match = path.match(/\/collections\/([^/?#]+)/i)
  return match ? asOptionalString(match[1]) : null
}

const asFlexibleMoneyText = (value, currencyHint = null) => {
  if (value == null)
    return null

  if (typeof value === 'string') {
    const normalized = value.trim()
    if (!normalized)
      return null

    if (/[$€£¥]|^[A-Z]{3}\s*\d/i.test(normalized))
      return normalized

    return formatMoneyText(normalized, currencyHint)
  }

  if (!isRecord(value))
    return null

  const amount = value?.amount ?? value?.value ?? value?.price ?? value?.min ?? value?.max
  const currencyCode = value?.currencyCode || value?.currency_code || value?.currency || currencyHint
  if (amount != null)
    return formatMoneyText(amount, currencyCode)

  return null
}

const asFlexibleAvailability = (...values) => {
  for (const value of values) {
    if (typeof value === 'boolean')
      return value

    if (typeof value === 'string') {
      const normalized = value.trim().toLowerCase()
      if (!normalized)
        continue
      if (['true', 'available', 'in_stock', 'in stock'].includes(normalized))
        return true
      if (['false', 'unavailable', 'out_of_stock', 'out of stock', 'sold_out', 'sold out'].includes(normalized))
        return false
    }
  }

  return true
}

const getFirstRecord = (value) => {
  if (!Array.isArray(value))
    return null
  return value.find(isRecord) || null
}

const getCatalogToolProductVariant = (product) => getNestedRecord(
  product?.selectedOrFirstAvailableVariant,
  getFirstRecord(product?.variants),
)

const getCatalogToolProductImage = (product, variant = null) => asOptionalString(
  variant?.image_url
  || variant?.image?.url
  || product?.image_url
  || product?.featured_image?.url
  || getFirstRecord(product?.images)?.url
  || getFirstRecord(product?.media)?.url
  || getFirstRecord(product?.media)?.image?.url,
)

const getCatalogToolProductPrice = (product, variant = null) => {
  const currencyHint = asNonEmptyString(
    variant?.currency
    || variant?.price?.currency
    || product?.price_range?.currency
    || product?.priceRange?.currencyCode,
  )

  return (
    asFlexibleMoneyText(variant?.price, currencyHint)
    || asFlexibleMoneyText(product?.price_range, currencyHint)
    || asFlexibleMoneyText(product?.priceRange?.minVariantPrice)
  )
}

const normalizeProductFromToolPayload = ({ product, ref = null }) => {
  if (!isRecord(product))
    return null

  const selectedVariant = getCatalogToolProductVariant(product)
  const handle = asOptionalString(product?.handle || ref?.handle) || deriveHandleFromUrl(product?.url || product?.onlineStoreUrl)
  const url = asUrlPath(product?.url || product?.onlineStoreUrl, handle ? `/products/${handle}` : null)

  return {
    id: asOptionalString(product?.product_id || product?.id || ref?.product_id || ref?.productId),
    handle,
    title: asNonEmptyString(product?.title, humanizeHandle(handle) || PREVIEW_PRODUCT_TITLE),
    url,
    image: getCatalogToolProductImage(product, selectedVariant),
    price: getCatalogToolProductPrice(product, selectedVariant),
    compareAtPrice: null,
    badge: null,
    summary: trimSummary(asDescriptionText(product?.description)),
    reason: null,
    note: null,
    ctaLabel: null,
    merchandiseId: asOptionalString(selectedVariant?.variant_id || selectedVariant?.id || ref?.variant_id || ref?.variantId),
    variantId: asOptionalString(selectedVariant?.variant_id || selectedVariant?.id || ref?.variant_id || ref?.variantId),
    available: asFlexibleAvailability(
      selectedVariant?.available,
      selectedVariant?.availability,
      selectedVariant?.availableForSale,
      product?.available,
      product?.availableForSale,
    ),
  }
}

const normalizeCollectionFromToolPayload = ({ collection, ref = null }) => {
  if (!isRecord(collection))
    return null

  const handle = asOptionalString(collection?.handle || ref?.handle) || deriveCollectionHandleFromUrl(collection?.url || collection?.onlineStoreUrl)

  return {
    id: asOptionalString(collection?.collection_id || collection?.id),
    handle,
    title: asNonEmptyString(collection?.title, humanizeHandle(handle) || 'Collection'),
    description: trimSummary(asDescriptionText(collection?.description)),
    url: asUrlPath(collection?.url || collection?.onlineStoreUrl, asOptionalString(ref?.url) || (handle ? `/collections/${handle}` : null)),
    image: asOptionalString(collection?.image_url || collection?.image?.url || getFirstRecord(collection?.images)?.url),
  }
}

const mergeDefinedProperties = (current = {}, incoming = {}) => {
  const merged = { ...current }
  for (const [key, value] of Object.entries(incoming)) {
    if (value !== null && value !== undefined && value !== '')
      merged[key] = value
  }
  return merged
}

const getVerifiedProductAliases = product => ([
  asOptionalString(product?.id),
  asOptionalString(product?.handle),
  asOptionalString(product?.variantId),
  asOptionalString(product?.merchandiseId),
  asOptionalString(product?.url),
  asOptionalString(asUrlPath(product?.url)),
  deriveHandleFromUrl(product?.url),
]).filter(Boolean)

const getVerifiedCollectionAliases = collection => ([
  asOptionalString(collection?.id),
  asOptionalString(collection?.handle),
  asOptionalString(collection?.url),
  asOptionalString(asUrlPath(collection?.url)),
  deriveCollectionHandleFromUrl(collection?.url),
]).filter(Boolean)

const registerVerifiedProduct = (product, hydrationContext, { detailed = false } = {}) => {
  if (!product)
    return null

  const aliases = getVerifiedProductAliases(product)
  if (aliases.length === 0)
    return null

  const existingKey = aliases.find(alias => hydrationContext.verifiedProductAliases.has(alias))
  const canonicalKey = existingKey || aliases[0]
  const existingProduct = hydrationContext.verifiedProducts.get(canonicalKey)
  const mergedProduct = mergeDefinedProperties(existingProduct, product)

  hydrationContext.verifiedProducts.set(canonicalKey, mergedProduct)
  aliases.forEach(alias => hydrationContext.verifiedProductAliases.set(alias, canonicalKey))
  if (detailed)
    hydrationContext.verifiedDetailedProductKeys.add(canonicalKey)

  return canonicalKey
}

const registerVerifiedCollection = (collection, hydrationContext) => {
  if (!collection)
    return null

  const aliases = getVerifiedCollectionAliases(collection)
  if (aliases.length === 0)
    return null

  const existingKey = aliases.find(alias => hydrationContext.verifiedCollectionAliases.has(alias))
  const canonicalKey = existingKey || aliases[0]
  const existingCollection = hydrationContext.verifiedCollections.get(canonicalKey)
  const mergedCollection = mergeDefinedProperties(existingCollection, collection)

  hydrationContext.verifiedCollections.set(canonicalKey, mergedCollection)
  aliases.forEach(alias => hydrationContext.verifiedCollectionAliases.set(alias, canonicalKey))
  return canonicalKey
}

const ingestCatalogTruthFromObservation = (observation, hydrationContext) => {
  const parsedObservation = typeof observation === 'string' ? asJson(observation) : observation
  if (!isRecord(parsedObservation))
    return

  for (const [toolName, rawToolPayload] of Object.entries(parsedObservation)) {
    const toolPayload = typeof rawToolPayload === 'string'
      ? asJson(rawToolPayload) || rawToolPayload
      : rawToolPayload

    if (!isRecord(toolPayload))
      continue

    const detailed = /get_product_details/i.test(toolName)
    const products = []
    const collections = []

    if (Array.isArray(toolPayload?.products))
      products.push(...toolPayload.products.filter(isRecord))
    if (isRecord(toolPayload?.product))
      products.push(toolPayload.product)

    if (Array.isArray(toolPayload?.collections))
      collections.push(...toolPayload.collections.filter(isRecord))
    if (isRecord(toolPayload?.collection))
      collections.push(toolPayload.collection)

    for (const candidate of products) {
      const normalizedProduct = normalizeProductFromToolPayload({ product: candidate })
      if (normalizedProduct)
        registerVerifiedProduct(normalizedProduct, hydrationContext, { detailed })
    }

    for (const candidate of collections) {
      const normalizedCollection = normalizeCollectionFromToolPayload({ collection: candidate })
      if (normalizedCollection)
        registerVerifiedCollection(normalizedCollection, hydrationContext)
    }
  }
}

const ingestCatalogTruthFromValue = (value, hydrationContext, depth = 0) => {
  if (depth > MAX_VISIT_DEPTH || value == null)
    return

  if (Array.isArray(value)) {
    value.forEach(item => ingestCatalogTruthFromValue(item, hydrationContext, depth + 1))
    return
  }

  if (!isRecord(value))
    return

  if ('observation' in value)
    ingestCatalogTruthFromObservation(value.observation, hydrationContext)

  if ('tool_output' in value)
    ingestCatalogTruthFromObservation(value.tool_output, hydrationContext)

  if (isRecord(value?.tool_raw) && 'outputs' in value.tool_raw)
    ingestCatalogTruthFromObservation(value.tool_raw.outputs, hydrationContext)

  if (Array.isArray(value?.tool_calls)) {
    value.tool_calls.forEach((toolCall) => {
      ingestCatalogTruthFromObservation(toolCall?.tool_output, hydrationContext)
    })
  }

  for (const nestedValue of Object.values(value))
    ingestCatalogTruthFromValue(nestedValue, hydrationContext, depth + 1)
}

const getProductRef = (props) => getNestedRecord(props?.product_ref, props?.productRef)
const getProductRefs = (props) => getNestedArray(props?.product_refs, props?.productRefs)
const getLinkedProductRefs = (props) => getNestedArray(props?.linked_product_refs, props?.linkedProductRefs)
const getCollectionRef = (props) => getNestedRecord(props?.collection_ref, props?.collectionRef)

const isIntentComponent = (candidate) => {
  if (!isRecord(candidate))
    return false

  const component = asNonEmptyString(candidate.component)
  const props = candidate.props
  if (!component || !isRecord(props))
    return false

  switch (component) {
    case 'product_card':
      return isRecord(getProductRef(props))
    case 'product_carousel':
      return Array.isArray(getProductRefs(props))
    case 'ritual_card':
      return Array.isArray(getLinkedProductRefs(props)) || asStringList(props.steps, 1).length > 0 || Boolean(asNonEmptyString(props.summary))
    case 'reading_summary':
      return Boolean(asNonEmptyString(props.summary))
    case 'collection_link':
      return isRecord(getCollectionRef(props))
    case 'next_steps':
      return asStringList(props.steps, 1).length > 0
    default:
      return false
  }
}

const createPreviewProduct = (ref = {}) => {
  const handle = asOptionalString(ref.handle)
  const variantId = asOptionalString(ref.variant_id || ref.variantId)
  const title = humanizeHandle(handle) || PREVIEW_PRODUCT_TITLE

  return {
    id: asOptionalString(ref.product_id || ref.productId),
    handle,
    title,
    url: handle ? `/products/${handle}` : null,
    image: null,
    price: null,
    compareAtPrice: null,
    badge: null,
    summary: null,
    reason: null,
    note: null,
    ctaLabel: null,
    merchandiseId: variantId,
    variantId,
    available: true,
  }
}

const createPreviewCollection = (ref = {}) => {
  const handle = asOptionalString(ref.handle)
  const url = asOptionalString(ref.url) || (handle ? `/collections/${handle}` : null)

  return {
    id: null,
    handle,
    title: humanizeHandle(handle) || 'Collection',
    description: null,
    url,
    image: null,
  }
}

const normalizeProductFromStorefront = ({ product, variant = null, ref = null }) => {
  const handle = asOptionalString(product?.handle || ref?.handle)
  const selectedVariant = variant || product?.selectedOrFirstAvailableVariant || null
  const price = asMoneyText(selectedVariant?.price) || asMoneyText(product?.priceRange?.minVariantPrice)
  const compareAtPrice = asMoneyText(selectedVariant?.compareAtPrice) || asMoneyText(product?.compareAtPriceRange?.minVariantPrice)

  return {
    id: asOptionalString(product?.id || ref?.product_id || ref?.productId),
    handle,
    title: asNonEmptyString(product?.title, humanizeHandle(handle) || PREVIEW_PRODUCT_TITLE),
    url: asUrlPath(product?.onlineStoreUrl, handle ? `/products/${handle}` : null),
    image: asOptionalString(product?.featuredImage?.url),
    price,
    compareAtPrice,
    badge: null,
    summary: trimSummary(product?.description),
    reason: null,
    note: null,
    ctaLabel: null,
    merchandiseId: asOptionalString(selectedVariant?.id || ref?.variant_id || ref?.variantId),
    variantId: asOptionalString(selectedVariant?.id || ref?.variant_id || ref?.variantId),
    available: typeof selectedVariant?.availableForSale === 'boolean'
      ? selectedVariant.availableForSale
      : Boolean(product?.availableForSale ?? true),
  }
}

const normalizeCollectionFromStorefront = ({ collection, ref = null }) => {
  const handle = asOptionalString(collection?.handle || ref?.handle)

  return {
    id: asOptionalString(collection?.id),
    handle,
    title: asNonEmptyString(collection?.title, humanizeHandle(handle) || 'Collection'),
    description: trimSummary(collection?.description),
    url: asUrlPath(collection?.onlineStoreUrl, asOptionalString(ref?.url) || (handle ? `/collections/${handle}` : null)),
    image: asOptionalString(collection?.image?.url),
  }
}

const createHydrationErrorNote = (error, fallback) => {
  if (!error)
    return fallback

  const message = asNonEmptyString(error.message, fallback)
  return message || fallback
}

export const createStorefrontComponentHydrationContext = ({
  client = createShopifyStorefrontClient(),
  allowPreviewFallback = config.storefrontComponentPreviewFallback,
} = {}) => ({
  client,
  allowPreviewFallback,
  productCache: new Map(),
  collectionCache: new Map(),
  verifiedProducts: new Map(),
  verifiedProductAliases: new Map(),
  verifiedDetailedProductKeys: new Set(),
  verifiedCollections: new Map(),
  verifiedCollectionAliases: new Map(),
  storefrontConfigAvailable: hasShopifyStorefrontConfig(),
})

const getProductCacheKey = (ref) =>
  asNonEmptyString(ref?.variant_id || ref?.variantId || ref?.product_id || ref?.productId || ref?.handle)

const getCollectionCacheKey = (ref) => asNonEmptyString(ref?.handle || ref?.url)

const getProductLookupAliases = (ref) => ([
  asOptionalString(ref?.variant_id || ref?.variantId),
  asOptionalString(ref?.product_id || ref?.productId),
  asOptionalString(ref?.handle),
  asOptionalString(ref?.url),
  asOptionalString(asUrlPath(ref?.url)),
  deriveHandleFromUrl(ref?.url),
]).filter(Boolean)

const getCollectionLookupAliases = (ref) => ([
  asOptionalString(ref?.handle),
  asOptionalString(ref?.url),
  asOptionalString(asUrlPath(ref?.url)),
  deriveCollectionHandleFromUrl(ref?.url),
]).filter(Boolean)

const getVerifiedProductFromContext = (ref, hydrationContext) => {
  const aliases = getProductLookupAliases(ref)
  for (const alias of aliases) {
    const canonicalKey = hydrationContext.verifiedProductAliases.get(alias)
    if (canonicalKey && hydrationContext.verifiedProducts.has(canonicalKey))
      return hydrationContext.verifiedProducts.get(canonicalKey)
  }

  if (
    hydrationContext.verifiedDetailedProductKeys.size === 1
    && !asNonEmptyString(ref?.variant_id || ref?.variantId)
    && !asNonEmptyString(ref?.product_id || ref?.productId)
  ) {
    const [canonicalKey] = hydrationContext.verifiedDetailedProductKeys
    if (canonicalKey && hydrationContext.verifiedProducts.has(canonicalKey))
      return hydrationContext.verifiedProducts.get(canonicalKey)
  }

  return null
}

const getVerifiedCollectionFromContext = (ref, hydrationContext) => {
  const aliases = getCollectionLookupAliases(ref)
  for (const alias of aliases) {
    const canonicalKey = hydrationContext.verifiedCollectionAliases.get(alias)
    if (canonicalKey && hydrationContext.verifiedCollections.has(canonicalKey))
      return hydrationContext.verifiedCollections.get(canonicalKey)
  }

  return null
}

const resolveProductRef = async (ref, hydrationContext) => {
  if (!isRecord(ref))
    return null

  const cacheKey = getProductCacheKey(ref)
  if (!cacheKey)
    return null

  if (hydrationContext.productCache.has(cacheKey))
    return hydrationContext.productCache.get(cacheKey)

  let hydratedProduct = getVerifiedProductFromContext(ref, hydrationContext)

  if (!hydratedProduct && hydrationContext.storefrontConfigAvailable) {
    try {
      if (asNonEmptyString(ref.variant_id || ref.variantId)) {
        const variant = await hydrationContext.client.getProductVariantById(ref.variant_id || ref.variantId)
        hydratedProduct = variant?.product
          ? normalizeProductFromStorefront({ product: variant.product, variant, ref })
          : null
      }

      if (!hydratedProduct && asNonEmptyString(ref.product_id || ref.productId)) {
        const product = await hydrationContext.client.getProductById(ref.product_id || ref.productId)
        hydratedProduct = product ? normalizeProductFromStorefront({ product, ref }) : null
      }

      if (!hydratedProduct && asNonEmptyString(ref.handle)) {
        const product = await hydrationContext.client.getProductByHandle(ref.handle)
        hydratedProduct = product ? normalizeProductFromStorefront({ product, ref }) : null
      }
    }
    catch (error) {
      if (!hydrationContext.allowPreviewFallback)
        throw error
    }
  }

  if (!hydratedProduct && hydrationContext.allowPreviewFallback)
    hydratedProduct = createPreviewProduct(ref)

  hydrationContext.productCache.set(cacheKey, hydratedProduct)
  return hydratedProduct
}

const resolveCollectionRef = async (ref, hydrationContext) => {
  if (!isRecord(ref))
    return null

  const cacheKey = getCollectionCacheKey(ref)
  if (!cacheKey)
    return null

  if (hydrationContext.collectionCache.has(cacheKey))
    return hydrationContext.collectionCache.get(cacheKey)

  let hydratedCollection = getVerifiedCollectionFromContext(ref, hydrationContext)

  if (!hydratedCollection && hydrationContext.storefrontConfigAvailable) {
    try {
      if (asNonEmptyString(ref.handle)) {
        const collection = await hydrationContext.client.getCollectionByHandle(ref.handle)
        hydratedCollection = collection ? normalizeCollectionFromStorefront({ collection, ref }) : null
      }
    }
    catch (error) {
      if (!hydrationContext.allowPreviewFallback)
        throw error
    }
  }

  if (!hydratedCollection && hydrationContext.allowPreviewFallback)
    hydratedCollection = createPreviewCollection(ref)

  hydrationContext.collectionCache.set(cacheKey, hydratedCollection)
  return hydratedCollection
}

const normalizeHydratedComponent = (component, fallbackId) => normalizeChatComponent(component, fallbackId)

const hydrateIntentComponent = async (intentComponent, hydrationContext, fallbackId) => {
  const component = asNonEmptyString(intentComponent?.component)
  const props = isRecord(intentComponent?.props) ? intentComponent.props : {}
  const id = asNonEmptyString(intentComponent?.id, fallbackId)

  switch (component) {
    case 'product_card': {
      const product = await resolveProductRef(getProductRef(props), hydrationContext)
      if (!product)
        return null

      return normalizeHydratedComponent({
        component,
        id,
        props: {
          eyebrow: asOptionalString(props.eyebrow),
          reason: asOptionalString(props.reason),
          note: asOptionalString(props.note),
          ctaLabel: asOptionalString(props.cta_label || props.ctaLabel),
          product,
        },
      }, fallbackId)
    }

    case 'product_carousel': {
      const productRefs = getProductRefs(props)
      const products = []
      for (const productRef of productRefs) {
        const product = await resolveProductRef(productRef, hydrationContext)
        if (product)
          products.push(product)
      }

      const collection = await resolveCollectionRef(getCollectionRef(props?.browse_collection ? { collection_ref: props.browse_collection } : props), hydrationContext)
      if (products.length === 0)
        return null

      return normalizeHydratedComponent({
        component,
        id,
        props: {
          eyebrow: asOptionalString(props.eyebrow),
          title: asOptionalString(props.title),
          reason: asOptionalString(props.reason),
          browseUrl: asOptionalString(collection?.url),
          browseLabel: asOptionalString(props.browse_label || props.browseLabel),
          products,
        },
      }, fallbackId)
    }

    case 'ritual_card': {
      const linkedProducts = []
      for (const productRef of getLinkedProductRefs(props)) {
        const product = await resolveProductRef(productRef, hydrationContext)
        if (product)
          linkedProducts.push(product)
      }

      return normalizeHydratedComponent({
        component,
        id,
        props: {
          eyebrow: asOptionalString(props.eyebrow),
          title: asOptionalString(props.title),
          summary: asOptionalString(props.summary),
          duration: asOptionalString(props.duration),
          steps: asStringList(props.steps, 6),
          note: asOptionalString(props.note),
          disclaimer: asOptionalString(props.disclaimer),
          linkedProducts,
        },
      }, fallbackId)
    }

    case 'reading_summary':
      return normalizeHydratedComponent({
        component,
        id,
        props: {
          eyebrow: asOptionalString(props.eyebrow),
          title: asOptionalString(props.title),
          summary: asOptionalString(props.summary),
          energyFocus: asOptionalString(props.energyFocus || props.energy_focus || props.energy || props.focus),
          highlights: asStringList(props.highlights, 5),
          disclaimer: asOptionalString(props.disclaimer),
        },
      }, fallbackId)

    case 'collection_link': {
      const collection = await resolveCollectionRef(getCollectionRef(props), hydrationContext)
      if (!collection)
        return null

      return normalizeHydratedComponent({
        component,
        id,
        props: {
          eyebrow: asOptionalString(props.eyebrow),
          title: asOptionalString(props.title || collection.title),
          description: asOptionalString(props.description || collection.description),
          url: collection.url,
          label: asOptionalString(props.label || props.cta_label || props.ctaLabel),
          image: asOptionalString(collection.image),
        },
      }, fallbackId)
    }

    case 'next_steps':
      return normalizeHydratedComponent({
        component,
        id,
        props: {
          eyebrow: asOptionalString(props.eyebrow),
          title: asOptionalString(props.title),
          steps: asStringList(props.steps, 5),
          closing: asOptionalString(props.closing),
        },
      }, fallbackId)

    default:
      return null
  }
}

const collectPayloadComponents = (value, state, depth = 0) => {
  if (depth > MAX_VISIT_DEPTH || value == null)
    return

  if (typeof value === 'string') {
    const { payloads } = extractInlineChatComponentPayloads(value)
    for (const payload of payloads)
      collectPayloadComponents(payload, state, depth + 1)
    return
  }

  if (Array.isArray(value)) {
    value.forEach(item => collectPayloadComponents(item, state, depth + 1))
    return
  }

  if (!isRecord(value))
    return

  if (isIntentComponent(value)) {
    state.intentComponents.push(value)
    return
  }

  const normalized = normalizeChatComponent(value, `${depth}-${state.directComponents.length}`)
  if (normalized) {
    state.directComponents.push(normalized)
    return
  }

  for (const nestedValue of Object.values(value))
    collectPayloadComponents(nestedValue, state, depth + 1)
}

export const hydrateChatComponentsFromPayload = async (
  value,
  hydrationContext = createStorefrontComponentHydrationContext(),
) => {
  const state = {
    directComponents: [],
    intentComponents: [],
  }

  ingestCatalogTruthFromValue(value, hydrationContext)
  collectPayloadComponents(value, state)

  let hydratedComponents = [...state.directComponents]
  for (const [index, intentComponent] of state.intentComponents.entries()) {
    const hydratedComponent = await hydrateIntentComponent(intentComponent, hydrationContext, `${index}`)
    if (!hydratedComponent)
      continue
    hydratedComponents = mergeChatComponents(hydratedComponents, [hydratedComponent])
  }

  return mergeChatComponents([], hydratedComponents)
}

export const hydrateChatComponentsOrThrow = async (
  value,
  hydrationContext = createStorefrontComponentHydrationContext({ allowPreviewFallback: false }),
) => hydrateChatComponentsFromPayload(value, hydrationContext)

export const describeStorefrontHydrationStatus = (hydrationContext) => {
  if (hydrationContext.storefrontConfigAvailable)
    return { mode: 'shopify-storefront' }

  if (hydrationContext.verifiedProducts.size > 0 || hydrationContext.verifiedCollections.size > 0) {
    return {
      mode: 'dify-tool-catalog',
      products: hydrationContext.verifiedProducts.size,
      collections: hydrationContext.verifiedCollections.size,
    }
  }

  if (hydrationContext.allowPreviewFallback) {
    return {
      mode: 'preview-fallback',
      message: createHydrationErrorNote(null, 'Shopify storefront credentials are not configured, using preview hydration.'),
    }
  }

  return {
    mode: 'catalog-verification-required',
    message: 'Commerce components require verified Shopify catalog data from Dify tool output or Storefront API credentials.',
  }
}
