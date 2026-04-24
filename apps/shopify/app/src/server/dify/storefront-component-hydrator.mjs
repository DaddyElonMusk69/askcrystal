import {
  mergeChatComponents,
  normalizeChatComponent,
} from '../../../../packages/storefront-ui/src/chat-components.mjs'
import {
  createShopifyStorefrontClient,
  hasShopifyStorefrontConfig,
} from '../shopify/storefront-client.mjs'

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
  allowPreviewFallback = true,
} = {}) => ({
  client,
  allowPreviewFallback,
  productCache: new Map(),
  collectionCache: new Map(),
  storefrontConfigAvailable: hasShopifyStorefrontConfig(),
})

const getProductCacheKey = (ref) =>
  asNonEmptyString(ref?.variant_id || ref?.variantId || ref?.product_id || ref?.productId || ref?.handle)

const getCollectionCacheKey = (ref) => asNonEmptyString(ref?.handle || ref?.url)

const resolveProductRef = async (ref, hydrationContext) => {
  if (!isRecord(ref))
    return null

  const cacheKey = getProductCacheKey(ref)
  if (!cacheKey)
    return null

  if (hydrationContext.productCache.has(cacheKey))
    return hydrationContext.productCache.get(cacheKey)

  let hydratedProduct = null

  if (hydrationContext.storefrontConfigAvailable) {
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

  let hydratedCollection = null

  if (hydrationContext.storefrontConfigAvailable) {
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

  return {
    mode: 'preview-fallback',
    message: createHydrationErrorNote(null, 'Shopify storefront credentials are not configured, using preview hydration.'),
  }
}
