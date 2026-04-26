import React, { startTransition, useEffect, useState } from 'react'
import {
  CHAT_COMPONENT_TOOL_NAMES,
  readChatComponentToolPayload,
} from '../../../../packages/storefront-ui-contract/src/chat-components.mjs'

const NATIVE_PRODUCT_CARD_SECTION_ID = 'section-rendering-askcrystal-chat-product-card'
const nativeProductCardMarkupCache = new Map()
const nativeProductCardRequestCache = new Map()
const nativeProductCardLayoutStyle = {
  '--product-card-gap': '12px',
  '--product-card-alignment': 'stretch',
  '--padding-block-start': '0px',
  '--padding-block-end': '0px',
  '--padding-inline-start': '0px',
  '--padding-inline-end': '0px',
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

function buildNativeProductCardRequestUrl(product) {
  if (!product?.handle || typeof window === 'undefined')
    return null

  const storefrontRoot = typeof window.Shopify?.routes?.root === 'string'
    ? window.Shopify.routes.root
    : '/'
  const requestUrl = new URL(`products/${product.handle}`, new URL(storefrontRoot, window.location.origin))
  requestUrl.searchParams.set('section_id', NATIVE_PRODUCT_CARD_SECTION_ID)
  requestUrl.searchParams.set('askcrystal_handle', product.handle)

  const variantQueryId = asShopifyVariantQueryId(product?.variantId || product?.merchandiseId)
  if (variantQueryId)
    requestUrl.searchParams.set('variant', variantQueryId)

  return requestUrl.toString()
}

function resolveProductHref(product) {
  const candidate = typeof product?.url === 'string' ? product.url.trim() : ''
  if (candidate)
    return candidate

  const handle = typeof product?.handle === 'string' ? product.handle.trim() : ''
  return handle ? `/products/${handle}` : null
}

function resolveProductImageUrl(product) {
  const image = product?.image
  if (typeof image === 'string' && image.trim())
    return image.trim()

  if (image && typeof image === 'object') {
    const candidate = image.url || image.src
    if (typeof candidate === 'string' && candidate.trim())
      return candidate.trim()
  }

  const featuredImage = product?.featuredImage || product?.featured_image
  if (featuredImage && typeof featuredImage === 'object') {
    const candidate = featuredImage.url || featuredImage.src
    if (typeof candidate === 'string' && candidate.trim())
      return candidate.trim()
  }

  return null
}

function resolveProductImageAlt(product) {
  const image = product?.image
  if (image && typeof image === 'object') {
    const candidate = image.alt || image.altText
    if (typeof candidate === 'string' && candidate.trim())
      return candidate.trim()
  }

  const featuredImage = product?.featuredImage || product?.featured_image
  if (featuredImage && typeof featuredImage === 'object') {
    const candidate = featuredImage.alt || featuredImage.altText
    if (typeof candidate === 'string' && candidate.trim())
      return candidate.trim()
  }

  return product?.title || 'Product image'
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

function ProductMedia({ image, title, compact = false }) {
  return (
    <div className={`ac-tool-product__media${compact ? ' ac-tool-product__media--compact' : ''}`}>
      {image
        ? <img src={image} alt={title} loading="lazy" />
        : <div className="ac-tool-product__placeholder">Crystal</div>}
    </div>
  )
}

function ProductMeta({ product, ctaLabel }) {
  return (
    <div className="ac-tool-product__meta">
      <div className="ac-tool-product__price-group">
        {product.price ? <span className="ac-tool-product__price">{product.price}</span> : null}
        {product.compareAtPrice ? <span className="ac-tool-product__compare">{product.compareAtPrice}</span> : null}
      </div>
      <span className="ac-tool-product__cta">{ctaLabel || 'View crystal'}</span>
    </div>
  )
}

function FallbackProductCard({ product, ctaLabel }) {
  const productHref = resolveProductHref(product)
  const imageUrl = resolveProductImageUrl(product)
  const imageAlt = resolveProductImageAlt(product)
  const ctaText = ctaLabel || 'View'

  const media = imageUrl
    ? <img className="askcrystal-chat-product-card__image" src={imageUrl} alt={imageAlt} loading="lazy" />
    : <div className="askcrystal-chat-product-card__placeholder">Crystal</div>

  const surface = (
    <>
      <div className="askcrystal-chat-product-card__media">
        {media}
      </div>

      <div className="askcrystal-chat-product-card__body">
        <product-title className="askcrystal-chat-product-card__title">
          <span className="title-text">{product.title}</span>
        </product-title>

        <div className="askcrystal-chat-product-card__meta">
          <div className="askcrystal-chat-product-card__price-group">
            {product.price ? <span className="askcrystal-chat-product-card__price askcrystal-chat-product-card__price--hydrated">{product.price}</span> : null}
            {product.compareAtPrice ? <span className="askcrystal-chat-product-card__compare">{product.compareAtPrice}</span> : null}
          </div>

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
        data-product-id={product.id || undefined}
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

function NativeProductCard({ product, ctaLabel }) {
  const requestUrl = buildNativeProductCardRequestUrl(product)
  const [markup, setMarkup] = useState(() => (requestUrl ? nativeProductCardMarkupCache.get(requestUrl) || null : null))
  const [loadError, setLoadError] = useState(null)

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
            product,
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
  }, [requestUrl])

  if (markup) {
    return (
      <div
        className="ac-tool-product-native ac-tool-product-native--native"
        dangerouslySetInnerHTML={{ __html: markup }}
      />
    )
  }

  return (
    <div
      className={`ac-tool-product-native ${loadError ? 'ac-tool-product-native--fallback' : 'ac-tool-product-native--loading'}`.trim()}
      aria-busy={loadError ? undefined : 'true'}
      aria-live="polite"
    >
      <FallbackProductCard product={product} ctaLabel={ctaLabel} />
    </div>
  )
}

function ProductCardTool(part) {
  const payload = resolveComponentPayload(part)
  if (!payload)
    return null

  const { ctaLabel, product } = payload.props

  return (
    <section className="ac-tool-product-block">
      <NativeProductCard product={product} ctaLabel={ctaLabel} />
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
    browseUrl,
    browseLabel,
    products,
  } = payload.props

  return (
    <ToolShell eyebrow={eyebrow} title={title} className="ac-tool--carousel">
      {reason ? <p className="ac-tool__lede">{reason}</p> : null}

      <div className="ac-tool-carousel" role="list" aria-label={title}>
        {products.map((product, index) => {
          const card = (
            <>
              <ProductMedia image={product.image} title={product.title} compact />
              <div className="ac-tool-carousel__copy">
                {product.badge ? <p className="ac-tool-product__badge">{product.badge}</p> : null}
                <h4 className="ac-tool-product__title">{product.title}</h4>
                {product.reason || product.summary
                  ? (
                      <p className="ac-tool-product__summary">
                        {product.reason || product.summary}
                      </p>
                    )
                  : null}
                <ProductMeta product={product} ctaLabel={product.ctaLabel || 'View'} />
              </div>
            </>
          )

          return product.url
            ? (
                <a key={product.id || product.handle || index} className="ac-tool-carousel__card" href={product.url} role="listitem">
                  {card}
                </a>
              )
            : (
                <div key={product.id || product.handle || index} className="ac-tool-carousel__card" role="listitem">
                  {card}
                </div>
              )
        })}
      </div>

      {browseUrl
        ? (
            <div className="ac-tool__footer">
              <a className="ac-tool__footer-link" href={browseUrl}>
                {browseLabel}
              </a>
            </div>
          )
        : null}
    </ToolShell>
  )
}

function RitualCardTool(part) {
  const payload = resolveComponentPayload(part)
  if (!payload)
    return null

  const {
    eyebrow,
    title,
    summary,
    duration,
    steps,
    note,
    disclaimer,
    linkedProducts,
  } = payload.props

  return (
    <ToolShell eyebrow={eyebrow} title={title} className="ac-tool--ritual">
      {summary ? <p className="ac-tool__lede">{summary}</p> : null}

      {duration
        ? (
            <p className="ac-tool__detail">
              {duration}
            </p>
          )
        : null}

      <ol className="ac-ritual-steps">
        {steps.map(step => (
          <li key={step} className="ac-ritual-steps__item">
            <span className="ac-ritual-steps__dot" aria-hidden="true" />
            <span>{step}</span>
          </li>
        ))}
      </ol>

      {linkedProducts.length > 0
        ? (
            <div className="ac-tool-chip-row" role="list" aria-label="Linked products">
              {linkedProducts.map((product, index) => (
                product.url
                  ? (
                      <a key={product.id || product.handle || index} className="ac-tool-chip" href={product.url} role="listitem">
                        {product.title}
                      </a>
                    )
                  : (
                      <span key={product.id || product.handle || index} className="ac-tool-chip" role="listitem">
                        {product.title}
                      </span>
                    )
              ))}
            </div>
          )
        : null}

      {note ? <p className="ac-tool__note">{note}</p> : null}
      {disclaimer ? <p className="ac-tool__disclaimer">{disclaimer}</p> : null}
    </ToolShell>
  )
}

function ReadingSummaryTool(part) {
  const payload = resolveComponentPayload(part)
  if (!payload)
    return null

  const {
    eyebrow,
    title,
    summary,
    energyFocus,
    highlights,
    disclaimer,
  } = payload.props

  return (
    <ToolShell eyebrow={eyebrow} title={title} className="ac-tool--summary">
      {energyFocus
        ? (
            <p className="ac-summary__focus">
              {energyFocus}
            </p>
          )
        : null}

      <p className="ac-tool__lede">{summary}</p>

      {highlights.length > 0
        ? (
            <ul className="ac-summary__list">
              {highlights.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )
        : null}

      {disclaimer ? <p className="ac-tool__disclaimer">{disclaimer}</p> : null}
    </ToolShell>
  )
}

function CollectionLinkTool(part) {
  const payload = resolveComponentPayload(part)
  if (!payload)
    return null

  const {
    eyebrow,
    title,
    description,
    url,
    label,
    image,
  } = payload.props

  const content = (
    <>
      <div className="ac-tool-collection__copy">
        {eyebrow ? <p className="ac-tool__eyebrow">{eyebrow}</p> : null}
        <h3 className="ac-tool__title">{title}</h3>
        {description ? <p className="ac-tool__lede">{description}</p> : null}
      </div>
      <div className="ac-tool-collection__action">
        <span>{label}</span>
      </div>
      {image
        ? (
            <div className="ac-tool-collection__image" aria-hidden="true">
              <img src={image} alt="" loading="lazy" />
            </div>
          )
        : null}
    </>
  )

  return (
    <section className="ac-tool ac-tool--collection">
      {url
        ? <a className="ac-tool-collection" href={url}>{content}</a>
        : <div className="ac-tool-collection">{content}</div>}
    </section>
  )
}

function NextStepsTool(part) {
  const payload = resolveComponentPayload(part)
  if (!payload)
    return null

  const {
    eyebrow,
    title,
    steps,
    closing,
  } = payload.props

  return (
    <ToolShell eyebrow={eyebrow} title={title} className="ac-tool--next-steps">
      <ul className="ac-next-steps">
        {steps.map((step, index) => (
          <li key={step} className="ac-next-steps__item">
            <span className="ac-next-steps__index">{index + 1}</span>
            <span>{step}</span>
          </li>
        ))}
      </ul>
      {closing ? <p className="ac-tool__note">{closing}</p> : null}
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

export const askCrystalMessagePartComponents = {
  tools: {
    by_name: {
      [CHAT_COMPONENT_TOOL_NAMES.product_card]: ProductCardTool,
      [CHAT_COMPONENT_TOOL_NAMES.product_carousel]: ProductCarouselTool,
      [CHAT_COMPONENT_TOOL_NAMES.ritual_card]: RitualCardTool,
      [CHAT_COMPONENT_TOOL_NAMES.reading_summary]: ReadingSummaryTool,
      [CHAT_COMPONENT_TOOL_NAMES.collection_link]: CollectionLinkTool,
      [CHAT_COMPONENT_TOOL_NAMES.next_steps]: NextStepsTool,
    },
    Fallback: ToolFallback,
  },
  ToolGroup,
}
