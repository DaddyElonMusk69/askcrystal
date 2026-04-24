import React, { startTransition, useEffect, useState } from 'react'
import {
  CHAT_COMPONENT_TOOL_NAMES,
  readChatComponentToolPayload,
} from '../../../shopify/packages/storefront-ui/src/chat-components.mjs'

const NATIVE_PRODUCT_CARD_SECTION_ID = 'section-rendering-askcrystal-chat-product-card'
const nativeProductCardMarkupCache = new Map()
const nativeProductCardRequestCache = new Map()

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
  const productPath = product?.url || (product?.handle ? `/products/${product.handle}` : null)
  if (!productPath || typeof window === 'undefined')
    return null

  const requestUrl = new URL(productPath, window.location.origin)
  requestUrl.searchParams.set('section_id', NATIVE_PRODUCT_CARD_SECTION_ID)

  const variantQueryId = asShopifyVariantQueryId(product?.variantId || product?.merchandiseId)
  if (variantQueryId)
    requestUrl.searchParams.set('variant', variantQueryId)

  return requestUrl.toString()
}

function extractNativeProductCardMarkup(responseText) {
  const document = new DOMParser().parseFromString(responseText, 'text/html')
  const nativeCard = document.querySelector('[data-askcrystal-native-product-card]')
  return nativeCard?.outerHTML?.trim() || null
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
  const content = (
    <>
      <ProductMedia image={product.image} title={product.title} />
      <div className="ac-tool-product__body">
        <div className="ac-tool-product__heading">
          {product.badge ? <p className="ac-tool-product__badge">{product.badge}</p> : null}
          <h4 className="ac-tool-product__title">{product.title}</h4>
        </div>
        <ProductMeta product={product} ctaLabel={ctaLabel} />
      </div>
    </>
  )

  return product.url
    ? (
        <a className="ac-tool-product ac-tool-product--single" href={product.url}>
          {content}
        </a>
      )
    : (
        <div className="ac-tool-product ac-tool-product--single">
          {content}
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
        className="ac-tool-product-native"
        dangerouslySetInnerHTML={{ __html: markup }}
      />
    )
  }

  if (loadError) {
    return (
      <div className="ac-tool-product-native">
        <FallbackProductCard product={product} ctaLabel={ctaLabel} />
      </div>
    )
  }

  return (
    <div className="ac-tool-product-native ac-tool-product-native--loading" aria-busy="true" aria-live="polite">
      <span className="ac-tool-product-native__loading-label">Loading product card...</span>
    </div>
  )
}

function ProductCardTool(part) {
  const payload = resolveComponentPayload(part)
  if (!payload)
    return null

  const {
    eyebrow,
    reason,
    note,
    ctaLabel,
    product,
  } = payload.props

  return (
    <ToolShell eyebrow={eyebrow} className="ac-tool--product-card">
      {reason ? <p className="ac-tool-product__reason">{reason}</p> : null}
      <NativeProductCard product={product} ctaLabel={ctaLabel} />
      {product.summary ? <p className="ac-tool-product__summary">{product.summary}</p> : null}
      {note ? <p className="ac-tool-product__note">{note}</p> : null}
    </ToolShell>
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
