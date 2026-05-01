import { createShopifyStorefrontClient } from '../shopify/storefront-client.mjs'

const isRecord = value => typeof value === 'object' && value !== null && !Array.isArray(value)

const asNonEmptyString = value => (typeof value === 'string' ? value.trim() : '')

const asOptionalString = value => {
  const normalized = asNonEmptyString(value)
  return normalized || null
}

const normalizeProductRef = (value) => {
  if (!isRecord(value))
    return null

  const ref = {
    product_id: asOptionalString(value.product_id),
    handle: asOptionalString(value.handle),
    variant_id: asOptionalString(value.variant_id),
  }

  if (!ref.product_id && !ref.handle && !ref.variant_id)
    return null

  return ref
}

const asShopifyGid = (resource, value) => {
  const normalized = asNonEmptyString(value)
  if (!normalized)
    return ''

  if (/^gid:\/\/shopify\//i.test(normalized))
    return normalized

  const numericMatch = normalized.match(/(\d+)(?:\?.*)?$/)
  if (numericMatch)
    return `gid://shopify/${resource}/${numericMatch[1]}`

  return normalized
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

const normalizeProduct = ({ product, variant = null, ref = null }) => {
  if (!isRecord(product))
    return null

  const selectedVariant = variant || product.selectedOrFirstAvailableVariant || null
  const handle = asOptionalString(product.handle || ref?.handle)
  if (!handle)
    return null

  return {
    product_id: asOptionalString(product.id || ref?.product_id),
    handle,
    variant_id: asOptionalString(selectedVariant?.id || ref?.variant_id),
    title: asNonEmptyString(product.title),
    url: `/products/${handle}`,
    image: asOptionalString(product.featuredImage?.url),
    imageAlt: asOptionalString(product.featuredImage?.altText),
    price: asMoneyText(selectedVariant?.price) || asMoneyText(product.priceRange?.minVariantPrice),
    compareAtPrice: asMoneyText(selectedVariant?.compareAtPrice) || asMoneyText(product.compareAtPriceRange?.minVariantPrice),
    available: typeof selectedVariant?.availableForSale === 'boolean'
      ? selectedVariant.availableForSale
      : Boolean(product.availableForSale ?? true),
  }
}

const resolveProduct = async (ref) => {
  const client = createShopifyStorefrontClient()

  if (ref.variant_id) {
    const variant = await client.getProductVariantById(asShopifyGid('ProductVariant', ref.variant_id))
    const product = variant?.product
    const normalized = normalizeProduct({ product, variant, ref })
    if (normalized)
      return normalized
  }

  if (ref.product_id) {
    const product = await client.getProductById(asShopifyGid('Product', ref.product_id))
    const normalized = normalizeProduct({ product, ref })
    if (normalized)
      return normalized
  }

  if (ref.handle) {
    const product = await client.getProductByHandle(ref.handle)
    const normalized = normalizeProduct({ product, ref })
    if (normalized)
      return normalized
  }

  return null
}

export const handleCatalogResolveProductCard = async body => {
  const ref = normalizeProductRef(body?.product_ref)
  if (!ref) {
    return {
      statusCode: 400,
      payload: {
        ok: false,
        code: 'invalid_product_ref',
        error: 'product_ref must include product_id, handle, or variant_id.',
      },
    }
  }

  try {
    const product = await resolveProduct(ref)
    if (!product) {
      return {
        statusCode: 404,
        payload: {
          ok: false,
          code: 'product_not_found',
          error: 'The referenced Shopify product could not be resolved.',
        },
      }
    }

    return {
      statusCode: 200,
      payload: {
        ok: true,
        product,
      },
    }
  }
  catch (error) {
    return {
      statusCode: 502,
      payload: {
        ok: false,
        code: error?.code || 'shopify_product_resolve_failed',
        error: error instanceof Error ? error.message : 'Failed to resolve Shopify product reference.',
      },
    }
  }
}
