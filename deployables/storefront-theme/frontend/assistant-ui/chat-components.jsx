import React, { startTransition, useEffect, useState } from 'react'
import {
  CHAT_COMPONENT_TOOL_NAMES,
  createChatComponentToolPart,
  readChatComponentToolPayload,
} from '../../../../packages/storefront-ui-contract/src/chat-components.mjs'

const NATIVE_PRODUCT_CARD_SECTION_ID = 'section-rendering-askcrystal-chat-product-card'
const nativeProductCardMarkupCache = new Map()
const nativeProductCardRequestCache = new Map()
const productRefResolveCache = new Map()
const productRefResolveRequestCache = new Map()
const nativeProductCardLayoutStyle = {
  '--product-card-gap': '12px',
  '--product-card-alignment': 'stretch',
  '--padding-block-start': '0px',
  '--padding-block-end': '0px',
  '--padding-inline-start': '0px',
  '--padding-inline-end': '0px',
}

function resolveProxyEndpoint(path) {
  if (typeof window === 'undefined')
    return path

  if (/^(127\.0\.0\.1|localhost):9292$/.test(window.location.host) && path.startsWith('/apps/'))
    return `http://localhost:8787${path}`

  return path
}

function resolveComponentPayload(part) {
  return readChatComponentToolPayload({
    toolName: part.toolName,
    result: part.result,
    args: part.args,
    toolCallId: part.toolCallId,
  })
}

function asShopifyVariantQueryId(value) {
  const normalized = typeof value === 'string' ? value.trim() : ''
  if (!normalized)
    return null

  if (/^\d+$/.test(normalized))
    return normalized

  const match = normalized.match(/\/(\d+)(?:\?.*)?$/)
  return match ? match[1] : null
}

function normalizeProductRef(productRef) {
  if (!productRef || typeof productRef !== 'object')
    return null

  const handle = typeof productRef.handle === 'string' ? productRef.handle.trim() : ''
  const productId = typeof productRef.product_id === 'string' ? productRef.product_id.trim() : ''
  const variantId = typeof productRef.variant_id === 'string' ? productRef.variant_id.trim() : ''

  if (!handle && !productId && !variantId)
    return null

  return {
    handle,
    productId,
    variantId,
    title: typeof productRef.title === 'string' ? productRef.title.trim() : '',
    image: typeof productRef.image === 'string' ? productRef.image.trim() : '',
    imageAlt: typeof productRef.imageAlt === 'string' ? productRef.imageAlt.trim() : '',
    price: typeof productRef.price === 'string' ? productRef.price.trim() : '',
    compareAtPrice: typeof productRef.compareAtPrice === 'string' ? productRef.compareAtPrice.trim() : '',
  }
}

function getProductRefCacheKey(productRef) {
  const normalizedRef = normalizeProductRef(productRef)
  if (!normalizedRef)
    return ''

  return JSON.stringify({
    handle: normalizedRef.handle || '',
    product_id: normalizedRef.productId || '',
    variant_id: normalizedRef.variantId || '',
  })
}

async function resolveProductRef(productRef) {
  const normalizedRef = normalizeProductRef(productRef)
  if (!normalizedRef)
    throw new Error('Missing product reference')

  if (normalizedRef.handle)
    return normalizedRef

  const cacheKey = getProductRefCacheKey(productRef)
  if (!cacheKey)
    throw new Error('Missing product reference')

  const cachedRef = productRefResolveCache.get(cacheKey)
  if (cachedRef)
    return cachedRef

  if (!productRefResolveRequestCache.has(cacheKey)) {
    const request = fetch(resolveProxyEndpoint('/apps/askcrystal/catalog/resolve-product-card'), {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        product_ref: {
          ...(normalizedRef.productId ? { product_id: normalizedRef.productId } : {}),
          ...(normalizedRef.handle ? { handle: normalizedRef.handle } : {}),
          ...(normalizedRef.variantId ? { variant_id: normalizedRef.variantId } : {}),
        },
      }),
    })
      .then(async (response) => {
        const payload = await response.json().catch(() => null)
        if (!response.ok || !payload?.ok || !payload?.product?.handle)
          throw new Error(payload?.error || `Failed to resolve product reference (${response.status})`)

        const resolvedRef = normalizeProductRef({
          product_id: payload.product.product_id || normalizedRef.productId,
          handle: payload.product.handle,
          variant_id: payload.product.variant_id || normalizedRef.variantId,
          title: payload.product.title || '',
          image: payload.product.image || '',
          imageAlt: payload.product.imageAlt || '',
          price: payload.product.price || '',
          compareAtPrice: payload.product.compareAtPrice || '',
        })
        productRefResolveCache.set(cacheKey, resolvedRef)
        return resolvedRef
      })
      .finally(() => {
        productRefResolveRequestCache.delete(cacheKey)
      })

    productRefResolveRequestCache.set(cacheKey, request)
  }

  return productRefResolveRequestCache.get(cacheKey)
}

function buildNativeProductCardRequestUrl(productRef, ctaLabel) {
  const normalizedRef = normalizeProductRef(productRef)
  if (!normalizedRef?.handle || typeof window === 'undefined')
    return null

  const storefrontRoot = typeof window.Shopify?.routes?.root === 'string'
    ? window.Shopify.routes.root
    : '/'
  const requestUrl = new URL(`products/${normalizedRef.handle}`, new URL(storefrontRoot, window.location.origin))
  requestUrl.searchParams.set('section_id', NATIVE_PRODUCT_CARD_SECTION_ID)
  requestUrl.searchParams.set('askcrystal_handle', normalizedRef.handle)

  const variantQueryId = asShopifyVariantQueryId(normalizedRef.variantId)
  if (variantQueryId)
    requestUrl.searchParams.set('variant', variantQueryId)

  if (typeof ctaLabel === 'string' && ctaLabel.trim())
    requestUrl.searchParams.set('askcrystal_cta', ctaLabel.trim())

  return requestUrl.toString()
}

function resolveProductHref(productRef) {
  const handle = typeof productRef?.handle === 'string' ? productRef.handle.trim() : ''
  return handle ? `/products/${handle}` : null
}

function humanizeProductHandle(productRef) {
  const title = typeof productRef?.title === 'string' ? productRef.title.trim() : ''
  if (title)
    return title

  const handle = typeof productRef?.handle === 'string' ? productRef.handle.trim() : ''
  if (!handle)
    return 'Recommended crystal'

  return handle
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, character => character.toUpperCase())
}

function isRenderableNativeProductCard(cardElement) {
  if (!cardElement)
    return false

  const hasLink = Boolean(cardElement.querySelector('a[href]'))
  const hasMedia = Boolean(cardElement.querySelector('img, .askcrystal-chat-product-card__placeholder'))

  return hasLink && hasMedia
}

function extractNativeProductCardMarkup(responseText) {
  const document = new DOMParser().parseFromString(responseText, 'text/html')
  const nativeCard = document.querySelector('[data-askcrystal-native-product-card]')

  if (!isRenderableNativeProductCard(nativeCard))
    return null

  return nativeCard.outerHTML.trim()
}

async function loadNativeProductCardMarkup(requestUrl) {
  if (!requestUrl)
    throw new Error('Missing product card request URL')

  const cachedMarkup = nativeProductCardMarkupCache.get(requestUrl)
  if (cachedMarkup)
    return cachedMarkup

  if (!nativeProductCardRequestCache.has(requestUrl)) {
    const request = fetch(requestUrl, {
      headers: {
        accept: 'text/html',
      },
      credentials: 'same-origin',
    })
      .then(async (response) => {
        if (!response.ok)
          throw new Error(`Failed to load native product card (${response.status})`)

        const responseText = await response.text()
        const markup = extractNativeProductCardMarkup(responseText)
        if (!markup)
          throw new Error('Native product card markup was not found in the section response')

        nativeProductCardMarkupCache.set(requestUrl, markup)
        return markup
      })
      .finally(() => {
        nativeProductCardRequestCache.delete(requestUrl)
      })

    nativeProductCardRequestCache.set(requestUrl, request)
  }

  return nativeProductCardRequestCache.get(requestUrl)
}

function ToolShell({ eyebrow, title, children, className = '' }) {
  return (
    <section className={`ac-tool ${className}`.trim()}>
      <header className="ac-tool__header">
        {eyebrow ? <p className="ac-tool__eyebrow">{eyebrow}</p> : null}
        {title ? <h3 className="ac-tool__title">{title}</h3> : null}
      </header>
      {children}
    </section>
  )
}

function FallbackProductCard({ productRef, ctaLabel }) {
  const productHref = resolveProductHref(productRef)
  const productTitle = humanizeProductHandle(productRef)
  const ctaText = ctaLabel || 'View'
  const imageUrl = typeof productRef?.image === 'string' ? productRef.image.trim() : ''
  const imageAlt = typeof productRef?.imageAlt === 'string' ? productRef.imageAlt.trim() : productTitle

  const surface = (
    <>
      <div className="askcrystal-chat-product-card__media">
        {imageUrl
          ? <img className="askcrystal-chat-product-card__image" src={imageUrl} alt={imageAlt} loading="lazy" />
          : <div className="askcrystal-chat-product-card__placeholder">Crystal</div>}
      </div>

      <div className="askcrystal-chat-product-card__body">
        <product-title className="askcrystal-chat-product-card__title">
          <span className="title-text">{productTitle}</span>
        </product-title>

        <div className="askcrystal-chat-product-card__meta">
          {productRef?.price
            ? (
                <div className="askcrystal-chat-product-card__price-group">
                  <span className="askcrystal-chat-product-card__price askcrystal-chat-product-card__price--hydrated">{productRef.price}</span>
                  {productRef.compareAtPrice ? <span className="askcrystal-chat-product-card__compare">{productRef.compareAtPrice}</span> : null}
                </div>
              )
            : null}
          <span className="askcrystal-chat-product-card__cta">
            {ctaText}
          </span>
        </div>
      </div>
    </>
  )

  return (
    <div
      className="askcrystal-chat-product-card"
      data-askcrystal-native-product-card
      data-askcrystal-render-mode="hydrated"
    >
      <div
        className="product-card askcrystal-chat-product-card__card"
        data-product-id={productRef?.productId || undefined}
      >
        <div
          className="product-card__content product-grid__card askcrystal-chat-product-card__content"
          style={nativeProductCardLayoutStyle}
        >
          {productHref
            ? (
                <a className="askcrystal-chat-product-card__surface" href={productHref}>
                  {surface}
                </a>
              )
            : (
                <div className="askcrystal-chat-product-card__surface">
                  {surface}
                </div>
              )}
        </div>
      </div>
    </div>
  )
}

function NativeProductCardSkeleton() {
  return (
    <div
      className="askcrystal-chat-product-card ac-product-card-skeleton"
      data-askcrystal-native-product-card
      data-askcrystal-render-mode="loading"
      aria-hidden="true"
    >
      <div className="product-card askcrystal-chat-product-card__card">
        <div
          className="product-card__content product-grid__card askcrystal-chat-product-card__content"
          style={nativeProductCardLayoutStyle}
        >
          <div className="askcrystal-chat-product-card__surface">
            <div className="askcrystal-chat-product-card__media ac-product-card-skeleton__media">
              <span className="ac-product-card-skeleton__crystal" />
            </div>

            <div className="askcrystal-chat-product-card__body ac-product-card-skeleton__body">
              <span className="ac-product-card-skeleton__line ac-product-card-skeleton__line--title" />
              <span className="ac-product-card-skeleton__line ac-product-card-skeleton__line--short" />
              <span className="ac-product-card-skeleton__meta">
                <span className="ac-product-card-skeleton__line ac-product-card-skeleton__line--price" />
                <span className="ac-product-card-skeleton__pill" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function NativeProductCard({ productRef, ctaLabel, variant = 'block' }) {
  const [resolvedProductRef, setResolvedProductRef] = useState(() => normalizeProductRef(productRef))
  const requestUrl = buildNativeProductCardRequestUrl(resolvedProductRef, ctaLabel)
  const [markup, setMarkup] = useState(() => (requestUrl ? nativeProductCardMarkupCache.get(requestUrl) || null : null))
  const [loadError, setLoadError] = useState(null)
  const variantClassName = variant === 'carousel'
    ? ' ac-tool-product-native--carousel'
    : ''

  useEffect(() => {
    let isActive = true

    resolveProductRef(productRef)
      .then((nextProductRef) => {
        if (!isActive)
          return

        startTransition(() => {
          setResolvedProductRef(nextProductRef)
        })
      })
      .catch((error) => {
        if (!isActive)
          return

        startTransition(() => {
          setLoadError(error)
          setResolvedProductRef(normalizeProductRef(productRef))
        })
      })

    return () => {
      isActive = false
    }
  }, [productRef])

  useEffect(() => {
    let isActive = true

    if (!requestUrl) {
      startTransition(() => {
        setMarkup(null)
        setLoadError(new Error('Missing product card request URL'))
      })
      return () => {
        isActive = false
      }
    }

    const cachedMarkup = nativeProductCardMarkupCache.get(requestUrl)
    if (cachedMarkup) {
      startTransition(() => {
        setMarkup(cachedMarkup)
        setLoadError(null)
      })
      return () => {
        isActive = false
      }
    }

    startTransition(() => {
      setMarkup(null)
      setLoadError(null)
    })

    loadNativeProductCardMarkup(requestUrl)
      .then((nextMarkup) => {
        if (!isActive)
          return

        startTransition(() => {
          setMarkup(nextMarkup)
          setLoadError(null)
        })
      })
      .catch((error) => {
        if (!isActive)
          return

        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('[AskCrystal] Native product card render fell back to hydrated shell.', {
            requestUrl,
            error,
            productRef: resolvedProductRef,
          })
        }

        startTransition(() => {
          setMarkup(null)
          setLoadError(error)
        })
      })

    return () => {
      isActive = false
    }
  }, [requestUrl, resolvedProductRef])

  if (markup) {
    return (
      <div
        className={`ac-tool-product-native ac-tool-product-native--native${variantClassName}`}
        dangerouslySetInnerHTML={{ __html: markup }}
      />
    )
  }

  return (
    <div
      className={`ac-tool-product-native${variantClassName} ${loadError ? 'ac-tool-product-native--fallback' : 'ac-tool-product-native--loading'}`.trim()}
      aria-busy={loadError ? undefined : 'true'}
      aria-live="polite"
    >
      {loadError
        ? <FallbackProductCard productRef={resolvedProductRef || productRef} ctaLabel={ctaLabel} />
        : (
            <>
              <span className="ac-tool-product-native__loading-label">Polishing the storefront card...</span>
              <NativeProductCardSkeleton />
            </>
          )}
    </div>
  )
}

function ProductCardTool(part) {
  const payload = resolveComponentPayload(part)
  if (!payload)
    return null

  const { ctaLabel, eyebrow, note, product_ref: productRef, reason } = payload.props

  return (
    <section className="ac-tool-product-block">
      {eyebrow || reason || note
        ? (
            <div className="ac-tool-product-context">
              {eyebrow ? <p className="ac-tool-product-context__eyebrow">{eyebrow}</p> : null}
              {reason ? <p className="ac-tool-product-context__reason">{reason}</p> : null}
              {note ? <p className="ac-tool-product-context__note">{note}</p> : null}
            </div>
          )
        : null}
      <NativeProductCard productRef={productRef} ctaLabel={ctaLabel} />
    </section>
  )
}

function ProductCarouselTool(part) {
  const payload = resolveComponentPayload(part)
  if (!payload)
    return null

  const {
    eyebrow,
    title,
    reason,
    product_refs: productRefs,
  } = payload.props

  return (
    <ToolShell eyebrow={eyebrow} title={title} className="ac-tool--carousel">
      {reason ? <p className="ac-tool__lede">{reason}</p> : null}

      <div className="ac-tool-carousel" role="list" aria-label={title}>
        {productRefs.map((productRef, index) => {
          const key = productRef.product_id || productRef.handle || productRef.variant_id || index

          return (
            <div key={key} className="ac-tool-carousel__item" role="listitem">
              <NativeProductCard productRef={productRef} ctaLabel="View" variant="carousel" />
            </div>
          )
        })}
      </div>
    </ToolShell>
  )
}

function ToolFallback(part) {
  const payload = resolveComponentPayload(part)
  if (!payload)
    return null

  return (
    <ToolShell eyebrow="Storefront" title={payload.component.replace(/_/g, ' ')}>
      <p className="ac-tool__lede">This response includes a storefront component that has not been wired into the theme yet.</p>
    </ToolShell>
  )
}

function ToolGroup({ children }) {
  return <div className="ac-tool-group">{children}</div>
}

const TOOL_COMPONENTS_BY_NAME = {
  [CHAT_COMPONENT_TOOL_NAMES.product_card]: ProductCardTool,
  [CHAT_COMPONENT_TOOL_NAMES.product_carousel]: ProductCarouselTool,
}

function getDebugProductRef(product) {
  if (!product || typeof product !== 'object')
    return null

  const productRef = {
    ...(typeof product.id === 'string' && product.id.trim() ? { product_id: product.id.trim() } : {}),
    ...(typeof product.handle === 'string' && product.handle.trim() ? { handle: product.handle.trim() } : {}),
    ...(typeof product.variantId === 'string' && product.variantId.trim() ? { variant_id: product.variantId.trim() } : {}),
  }

  return productRef.product_id || productRef.handle || productRef.variant_id
    ? productRef
    : null
}

function buildDebugComponentPayloads(products = []) {
  const availableProducts = Array.isArray(products)
    ? products.filter(product => product?.title)
    : []
  const shelfProducts = availableProducts.slice(0, 4)
  const primaryProduct = shelfProducts[0]
  const primaryProductRef = getDebugProductRef(primaryProduct)
  const shelfProductRefs = shelfProducts.map(getDebugProductRef).filter(Boolean)

  return [
    primaryProductRef
      ? {
          component: 'product_card',
          id: 'debug-product-card',
          props: {
            eyebrow: 'Prescription',
            reason: 'Single-product recommendation card using a real product from the current Shopify shelf.',
            cta_label: 'View crystal',
            product_ref: primaryProductRef,
          },
        }
      : null,
    shelfProductRefs.length
      ? {
          component: 'product_carousel',
          id: 'debug-product-carousel',
          props: {
            eyebrow: 'Curated shelf',
            title: 'A few grounded options',
            reason: 'Carousel surface for 2-4 products when comparison is more useful than one answer.',
            product_refs: shelfProductRefs,
          },
        }
      : null,
  ].filter(Boolean)
}

export function AskCrystalComponentDebugShowcase({ products = [] }) {
  const debugComponents = buildDebugComponentPayloads(products)
  const parts = debugComponents
    .map((component, index) => createChatComponentToolPart(component, `debug-${index}`))
    .filter(Boolean)

  if (!parts.length)
    return null

  return (
    <div className="ac-component-debug" aria-label="AskCrystal component debug showcase">
      <ToolGroup>
        {parts.map((part) => {
          const ToolComponent = TOOL_COMPONENTS_BY_NAME[part.toolName] || ToolFallback

          return (
            <ToolComponent
              key={part.toolCallId || part.toolName}
              {...part}
            />
          )
        })}
      </ToolGroup>
    </div>
  )
}

export const askCrystalMessagePartComponents = {
  tools: {
    by_name: TOOL_COMPONENTS_BY_NAME,
    Fallback: ToolFallback,
  },
  ToolGroup,
}
