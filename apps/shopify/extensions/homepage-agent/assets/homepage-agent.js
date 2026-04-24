(() => {
  const randomId = () => {
    if (globalThis.crypto?.randomUUID)
      return globalThis.crypto.randomUUID()

    return `ac-${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`
  }

  const getScopedStorageKey = (root, suffix) => {
    const base = root.id || 'askcrystal-homepage-agent'
    return `${base}:${suffix}`
  }

  const getStoredValue = (root, suffix) => {
    try {
      return window.sessionStorage.getItem(getScopedStorageKey(root, suffix))
    }
    catch {
      return null
    }
  }

  const getEmbedUrl = (proxyBase, userId, conversationId) => {
    const url = new URL(`${proxyBase}/chat/embed`, window.location.origin)
    if (userId)
      url.searchParams.set('userId', userId)
    if (conversationId)
      url.searchParams.set('conversationId', conversationId)
    return url.toString()
  }

  const setStoredValue = (root, suffix, value) => {
    try {
      if (!value)
        window.sessionStorage.removeItem(getScopedStorageKey(root, suffix))
      else
        window.sessionStorage.setItem(getScopedStorageKey(root, suffix), value)
    }
    catch {}
  }

  const scrollStageToBottom = (stage) => {
    if (!stage)
      return

    try {
      stage.scrollTo({ top: stage.scrollHeight, behavior: 'smooth' })
    }
    catch {
      stage.scrollTop = stage.scrollHeight
    }
  }

  const appendParagraphs = (container, text) => {
    const segments = String(text || '')
      .split(/\n{2,}/)
      .map(segment => segment.trim())
      .filter(Boolean)

    if (!segments.length)
      segments.push('...')

    segments.forEach((segment) => {
      const paragraph = document.createElement('p')
      paragraph.textContent = segment.replace(/\n/g, ' ')
      container.appendChild(paragraph)
    })
  }

  const createMessage = (text, role, options = {}) => {
    const message = document.createElement('article')
    message.className = `askcrystal-stage__message askcrystal-stage__message--${role}`

    const showKicker = options.kicker !== false && (options.kicker || role === 'assistant')
    if (showKicker) {
      const kicker = document.createElement('p')
      kicker.className = 'askcrystal-stage__kicker'
      kicker.textContent = options.kicker || 'Guide'
      message.appendChild(kicker)
    }

    const body = document.createElement('div')
    body.className = 'askcrystal-stage__body'
    appendParagraphs(body, text)
    message.appendChild(body)

    return message
  }

  const replaceMessage = (currentMessage, text, role, options = {}) => {
    const nextMessage = createMessage(text, role, options)
    currentMessage.replaceWith(nextMessage)
    return nextMessage
  }

  const parseSseBlocks = (buffer) => {
    const events = []
    let remaining = buffer.replace(/\r\n/g, '\n')

    while (true) {
      const separatorIndex = remaining.indexOf('\n\n')
      if (separatorIndex === -1)
        break

      const rawBlock = remaining.slice(0, separatorIndex)
      remaining = remaining.slice(separatorIndex + 2)

      const eventNameLine = rawBlock
        .split('\n')
        .find(line => line.startsWith('event:'))
      const payloadLine = rawBlock
        .split('\n')
        .filter(line => line.startsWith('data:'))
        .map(line => line.slice(5).trim())
        .join('\n')

      if (!payloadLine)
        continue

      try {
        events.push({
          event: eventNameLine ? eventNameLine.slice(6).trim() : 'message',
          payload: JSON.parse(payloadLine),
        })
      }
      catch {}
    }

    return { events, remaining }
  }

  const getProductUrl = (product) => {
    if (typeof product?.url === 'string' && product.url.trim())
      return product.url.trim()

    if (typeof product?.handle === 'string' && product.handle.trim())
      return `/products/${product.handle.trim()}`

    return ''
  }

  const getComponentKey = (component) => {
    const toolName = typeof component?.toolName === 'string' && component.toolName.trim()
      ? component.toolName.trim()
      : typeof component?.component === 'string' && component.component.trim()
        ? component.component.trim()
        : 'component'
    const id = typeof component?.id === 'string' && component.id.trim()
      ? component.id.trim()
      : toolName
    return `${toolName}:${id}`
  }

  const createCopyBlock = (className, text) => {
    const block = document.createElement('div')
    block.className = className
    appendParagraphs(block, text)
    return block
  }

  const createActionLink = (url, label, className = 'askcrystal-component-link') => {
    if (!url)
      return null

    const link = document.createElement('a')
    link.className = className
    link.href = url
    link.textContent = label || 'Open'
    return link
  }

  const createPill = (text) => {
    if (!text)
      return null

    const pill = document.createElement('span')
    pill.className = 'askcrystal-component-pill'
    pill.textContent = text
    return pill
  }

  const createProductCard = (product, options = {}) => {
    const card = document.createElement('article')
    card.className = 'askcrystal-product-card'
    if (options.variant)
      card.classList.add(`askcrystal-product-card--${options.variant}`)

    const productUrl = getProductUrl(product)
    if (product?.image) {
      const media = productUrl
        ? document.createElement('a')
        : document.createElement('div')
      media.className = 'askcrystal-product-card__media'
      if (productUrl)
        media.href = productUrl

      const image = document.createElement('img')
      image.src = product.image
      image.alt = product?.title || 'Crystal'
      image.loading = 'lazy'

      media.appendChild(image)
      card.appendChild(media)
    }

    const tag = document.createElement('p')
    tag.className = 'askcrystal-product-card__tag'
    tag.textContent = options.tag || product?.badge || 'Suggested now'
    card.appendChild(tag)

    const title = document.createElement('h3')
    title.className = 'askcrystal-product-card__title'
    title.textContent = product?.title || 'Untitled crystal'
    card.appendChild(title)

    const body = document.createElement('p')
    body.className = 'askcrystal-product-card__body'
    body.textContent = options.reason || product?.reason || product?.summary || product?.description || 'A curated crystal suggestion from the guide.'
    card.appendChild(body)

    const noteText = options.note || product?.ritual || product?.usage || product?.how_to_use || product?.howToUse || product?.note
    if (noteText) {
      const note = document.createElement('p')
      note.className = 'askcrystal-product-card__body'
      note.textContent = noteText
      card.appendChild(note)
    }

    if (product?.price || product?.compareAtPrice) {
      const pricing = document.createElement('div')
      pricing.className = 'askcrystal-product-card__pricing'

      if (product?.price) {
        const price = document.createElement('p')
        price.className = 'askcrystal-product-card__price'
        price.textContent = product.price
        pricing.appendChild(price)
      }

      if (product?.compareAtPrice) {
        const compareAtPrice = document.createElement('p')
        compareAtPrice.className = 'askcrystal-product-card__compare-price'
        compareAtPrice.textContent = product.compareAtPrice
        pricing.appendChild(compareAtPrice)
      }

      card.appendChild(pricing)
    }

    if (productUrl) {
      const link = createActionLink(productUrl, options.ctaLabel || product?.ctaLabel || 'View item', 'askcrystal-product-card__link')
      if (link)
        card.appendChild(link)
    }

    return card
  }

  const createComponentHeader = (eyebrow, title) => {
    const header = document.createElement('div')
    header.className = 'askcrystal-component-card__header'

    if (eyebrow) {
      const kicker = document.createElement('p')
      kicker.className = 'askcrystal-stage__kicker'
      kicker.textContent = eyebrow
      header.appendChild(kicker)
    }

    if (title) {
      const heading = document.createElement('h3')
      heading.className = 'askcrystal-component-card__title'
      heading.textContent = title
      header.appendChild(heading)
    }

    return header
  }

  const createList = (items, ordered = false) => {
    if (!Array.isArray(items) || items.length === 0)
      return null

    const list = document.createElement(ordered ? 'ol' : 'ul')
    list.className = 'askcrystal-component-card__list'

    items.forEach((item) => {
      if (!item)
        return
      const listItem = document.createElement('li')
      listItem.textContent = item
      list.appendChild(listItem)
    })

    return list.childElementCount > 0 ? list : null
  }

  const createLinkedProducts = (products) => {
    if (!Array.isArray(products) || products.length === 0)
      return null

    const row = document.createElement('div')
    row.className = 'askcrystal-linked-products'

    products.forEach((product) => {
      if (!product?.title)
        return

      const productUrl = getProductUrl(product)
      const chip = productUrl
        ? document.createElement('a')
        : document.createElement('span')
      chip.className = 'askcrystal-linked-product'
      chip.textContent = product.title
      if (productUrl)
        chip.href = productUrl
      row.appendChild(chip)
    })

    return row.childElementCount > 0 ? row : null
  }

  const createComponentCard = (variant) => {
    const card = document.createElement('article')
    card.className = `askcrystal-component-card askcrystal-component-card--${variant}`
    return card
  }

  const createReadingSummaryCard = (props) => {
    const card = createComponentCard('reading-summary')
    card.appendChild(createComponentHeader(props?.eyebrow, props?.title))
    card.appendChild(createCopyBlock('askcrystal-component-card__copy', props?.summary || ''))

    const meta = document.createElement('div')
    meta.className = 'askcrystal-component-meta'
    const energyFocusPill = createPill(props?.energyFocus)
    if (energyFocusPill)
      meta.appendChild(energyFocusPill)
    if (meta.childElementCount > 0)
      card.appendChild(meta)

    const highlights = createList(props?.highlights)
    if (highlights)
      card.appendChild(highlights)

    if (props?.disclaimer) {
      const disclaimer = document.createElement('p')
      disclaimer.className = 'askcrystal-component-note'
      disclaimer.textContent = props.disclaimer
      card.appendChild(disclaimer)
    }

    return card
  }

  const createProductCardComponent = (props) => createProductCard(props?.product || {}, {
    tag: props?.eyebrow,
    reason: props?.reason,
    note: props?.note,
    ctaLabel: props?.ctaLabel,
    variant: 'featured',
  })

  const createRitualCard = (props) => {
    const card = createComponentCard('ritual')
    card.appendChild(createComponentHeader(props?.eyebrow, props?.title))

    if (props?.summary)
      card.appendChild(createCopyBlock('askcrystal-component-card__copy', props.summary))

    const meta = document.createElement('div')
    meta.className = 'askcrystal-component-meta'
    const durationPill = createPill(props?.duration)
    if (durationPill)
      meta.appendChild(durationPill)
    if (meta.childElementCount > 0)
      card.appendChild(meta)

    const steps = createList(props?.steps, true)
    if (steps)
      card.appendChild(steps)

    if (props?.note) {
      const note = document.createElement('p')
      note.className = 'askcrystal-component-note'
      note.textContent = props.note
      card.appendChild(note)
    }

    const linkedProducts = createLinkedProducts(props?.linkedProducts)
    if (linkedProducts)
      card.appendChild(linkedProducts)

    return card
  }

  const createProductCarouselCard = (props) => {
    const card = createComponentCard('carousel')
    card.appendChild(createComponentHeader(props?.eyebrow, props?.title))

    if (props?.reason)
      card.appendChild(createCopyBlock('askcrystal-component-card__copy', props.reason))

    const grid = document.createElement('div')
    grid.className = 'askcrystal-product-grid askcrystal-product-grid--carousel'
    ;(props?.products || []).forEach((product) => {
      grid.appendChild(createProductCard(product, {
        tag: product?.badge || 'Crystal direction',
        ctaLabel: 'View crystal',
        variant: 'compact',
      }))
    })
    if (grid.childElementCount > 0)
      card.appendChild(grid)

    const browseLink = createActionLink(props?.browseUrl, props?.browseLabel || 'Browse all')
    if (browseLink) {
      const actions = document.createElement('div')
      actions.className = 'askcrystal-component-actions'
      actions.appendChild(browseLink)
      card.appendChild(actions)
    }

    return card
  }

  const createCollectionLinkCard = (props) => {
    const card = createComponentCard('collection-link')
    card.appendChild(createComponentHeader(props?.eyebrow, props?.title))

    if (props?.description)
      card.appendChild(createCopyBlock('askcrystal-component-card__copy', props.description))

    const actions = document.createElement('div')
    actions.className = 'askcrystal-component-actions'
    const link = createActionLink(props?.url, props?.label || 'Open collection')
    if (link)
      actions.appendChild(link)
    if (actions.childElementCount > 0)
      card.appendChild(actions)

    return card
  }

  const createNextStepsCard = (props) => {
    const card = createComponentCard('next-steps')
    card.appendChild(createComponentHeader(props?.eyebrow, props?.title))

    const steps = createList(props?.steps, true)
    if (steps)
      card.appendChild(steps)

    if (props?.closing) {
      const closing = document.createElement('p')
      closing.className = 'askcrystal-component-note'
      closing.textContent = props.closing
      card.appendChild(closing)
    }

    return card
  }

  const createComponentSurface = (component) => {
    const props = component?.props || {}

    switch (component?.component) {
      case 'reading_summary':
        return createReadingSummaryCard(props)
      case 'product_card':
        return createProductCardComponent(props)
      case 'ritual_card':
        return createRitualCard(props)
      case 'product_carousel':
        return createProductCarouselCard(props)
      case 'collection_link':
        return createCollectionLinkCard(props)
      case 'next_steps':
        return createNextStepsCard(props)
      default:
        return null
    }
  }

  const renderConversationComponents = (container, components, storefrontHydration = null) => {
    if (!container || !Array.isArray(components) || components.length === 0)
      return

    container.replaceChildren()
    container.dataset.storefrontHydration = storefrontHydration?.mode || ''

    const stack = document.createElement('div')
    stack.className = 'askcrystal-component-stack'

    components.forEach((component) => {
      const element = createComponentSurface(component)
      if (element)
        stack.appendChild(element)
    })

    if (stack.childElementCount > 0)
      container.appendChild(stack)
  }

  const renderConversationProducts = (container, products) => {
    if (!container || !Array.isArray(products) || products.length === 0)
      return

    container.replaceChildren()

    const header = document.createElement('div')
    header.className = 'askcrystal-stage__insert-header'

    const kicker = document.createElement('p')
    kicker.className = 'askcrystal-stage__kicker'
    kicker.textContent = 'Store picks'
    header.appendChild(kicker)

    const title = document.createElement('p')
    title.className = 'askcrystal-stage__insert-title'
    title.textContent = 'A few products that match this turn'
    header.appendChild(title)

    const grid = document.createElement('div')
    grid.className = 'askcrystal-product-grid'
    products.forEach((product) => {
      grid.appendChild(createProductCard(product, { variant: 'compact' }))
    })

    container.appendChild(header)
    container.appendChild(grid)
  }

  const initBlock = (root) => {
    if (root.dataset.askcrystalReady === 'true')
      return
    root.dataset.askcrystalReady = 'true'

    const proxyBase = root.dataset.proxyBase || '/apps/askcrystal'
    const welcome = root.querySelector('[data-askcrystal-welcome]')
    const stage = root.querySelector('[data-askcrystal-stage]')
    const embed = root.querySelector('[data-askcrystal-embed]')
    const form = root.querySelector('[data-askcrystal-form]')
    const textarea = form?.querySelector('textarea[name="message"]')
    const submitButton = form?.querySelector('button[type="submit"]')
    const actionButtons = root.querySelectorAll('[data-askcrystal-message]')
    let conversationId = getStoredValue(root, 'conversation-id')
    let sessionId = getStoredValue(root, 'session-id')
    let welcomeDismissed = false

    if (!sessionId) {
      sessionId = randomId()
      setStoredValue(root, 'session-id', sessionId)
    }

    const dismissWelcome = () => {
      if (welcomeDismissed)
        return

      welcomeDismissed = true
      root.dataset.welcome = 'dismissed'
      if (welcome)
        welcome.hidden = true
    }

    const renderEmbedLoading = (message = 'AskCrystal is opening the full guided conversation view.') => {
      if (!embed)
        return

      embed.hidden = false
      embed.replaceChildren()

      const loading = document.createElement('div')
      loading.className = 'askcrystal-embed__loading'

      const kicker = document.createElement('p')
      kicker.className = 'askcrystal-section-label'
      kicker.textContent = 'Live guidance'

      const status = document.createElement('p')
      status.className = 'askcrystal-embed__status'
      status.textContent = message

      loading.appendChild(kicker)
      loading.appendChild(status)
      embed.appendChild(loading)
    }

    const mountEmbeddedChat = async () => {
      if (!embed || !sessionId)
        return false

      const existingFrame = embed.querySelector('iframe.askcrystal-embed__frame')
      if (existingFrame && root.dataset.mode === 'embedded')
        return true

      root.dataset.mode = 'embedding'
      renderEmbedLoading('AskCrystal is switching into its full conversation workspace.')

      try {
        const response = await fetch(getEmbedUrl(proxyBase, sessionId, conversationId), {
          method: 'GET',
          headers: {
            accept: 'application/json',
          },
        })

        const payload = await response.json().catch(() => ({}))
        if (!response.ok || !payload?.iframeUrl) {
          root.dataset.mode = 'custom'
          embed.hidden = true
          return false
        }

        const frame = document.createElement('iframe')
        frame.className = 'askcrystal-embed__frame'
        frame.src = payload.iframeUrl
        frame.title = 'AskCrystal embedded chat'
        frame.allow = 'microphone'
        frame.hidden = true

        const loading = embed.firstElementChild
        embed.appendChild(frame)

        await new Promise((resolve, reject) => {
          const timeoutHandle = window.setTimeout(() => reject(new Error('iframe_load_timeout')), 12000)

          frame.addEventListener('load', () => {
            window.clearTimeout(timeoutHandle)
            resolve()
          }, { once: true })

          frame.addEventListener('error', () => {
            window.clearTimeout(timeoutHandle)
            reject(new Error('iframe_load_error'))
          }, { once: true })
        })

        embed.hidden = false
        if (loading?.parentNode === embed)
          loading.remove()
        frame.hidden = false
        root.dataset.mode = 'embedded'
        stage?.replaceChildren()
        return true
      }
      catch {
        root.dataset.mode = 'custom'
        embed.hidden = true
        embed.replaceChildren()
        return false
      }
    }

    const setBusy = (isBusy) => {
      root.dataset.busy = isBusy ? 'true' : 'false'
      if (textarea)
        textarea.disabled = isBusy
      if (submitButton)
        submitButton.disabled = isBusy
    }

    const send = async (message) => {
      if (!message || !stage || root.dataset.busy === 'true')
        return

      setBusy(true)

      stage.appendChild(createMessage(message, 'user', { kicker: false }))
      let assistantMessage = createMessage('AskCrystal is listening for the clearest path through this.', 'assistant')
      stage.appendChild(assistantMessage)
      scrollStageToBottom(stage)
      let assistantText = ''
      let hasStreamedAnswer = false
      let turnInsert = null
      let currentStorefrontHydration = null
      const componentRegistry = new Map()

      const updateAssistant = (text, options = {}) => {
        assistantMessage = replaceMessage(assistantMessage, text, 'assistant', options)
        scrollStageToBottom(stage)
      }

      const ensureTurnInsert = () => {
        if (turnInsert?.isConnected)
          return turnInsert

        turnInsert = document.createElement('section')
        turnInsert.className = 'askcrystal-stage__insert'
        stage.appendChild(turnInsert)
        return turnInsert
      }

      const updateComponents = (components, storefrontHydration = null) => {
        if (storefrontHydration)
          currentStorefrontHydration = storefrontHydration

        let hasIncoming = false
        if (Array.isArray(components)) {
          components.forEach((component) => {
            if (!component?.component)
              return
            componentRegistry.set(getComponentKey(component), component)
            hasIncoming = true
          })
        }

        if (!hasIncoming && componentRegistry.size === 0)
          return

        const insert = ensureTurnInsert()
        renderConversationComponents(insert, [...componentRegistry.values()], currentStorefrontHydration)
        scrollStageToBottom(stage)
      }

      try {
        const response = await fetch(`${proxyBase}/chat/stream`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            message,
            conversationId,
            sessionId,
            source: 'homepage-agent-block',
          }),
        })

        if (!response.ok) {
          const payload = await response.json().catch(() => ({}))
          updateAssistant(payload.error || 'The AskCrystal backend is not ready yet.')
          return
        }

        const contentType = response.headers.get('content-type') || ''
        if (!contentType.includes('text/event-stream') || !response.body) {
          const payload = await response.json().catch(() => ({}))

          if (payload.conversationId) {
            conversationId = payload.conversationId
            setStoredValue(root, 'conversation-id', conversationId)
          }

          updateAssistant(payload.answer || payload.error || 'AskCrystal responded without answer text.')
          updateComponents(payload.components, payload.storefrontHydration)
          if ((!payload.components || payload.components.length === 0) && Array.isArray(payload.products) && payload.products.length > 0)
            renderConversationProducts(ensureTurnInsert(), payload.products)
          if (payload.answer)
            dismissWelcome()
          return
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done)
            break

          buffer += decoder.decode(value, { stream: true })
          const parsed = parseSseBlocks(buffer)
          buffer = parsed.remaining

          for (const { event, payload } of parsed.events) {
            if (event === 'status' && !hasStreamedAnswer) {
              updateAssistant(payload.message || 'AskCrystal is thinking through the best path.')
            }

            if (event === 'delta') {
              const nextText = payload.answer || payload.text || ''
              if (nextText) {
                if (!hasStreamedAnswer) {
                  assistantText = ''
                  hasStreamedAnswer = true
                }
                assistantText += nextText
                updateAssistant(assistantText)
              }
            }

            if (event === 'replace') {
              const nextText = payload.answer || payload.text || ''
              if (nextText) {
                assistantText = nextText
                hasStreamedAnswer = true
                updateAssistant(assistantText)
              }
            }

            if (event === 'component')
              updateComponents(payload.components, payload.storefrontHydration)

            if (event === 'complete') {
              if (payload.conversationId) {
                conversationId = payload.conversationId
                setStoredValue(root, 'conversation-id', conversationId)
              }

              if (payload.answer) {
                assistantText = payload.answer
                hasStreamedAnswer = true
              }

              updateAssistant(assistantText || payload.answer || 'AskCrystal responded without answer text.')
              updateComponents(payload.components, payload.storefrontHydration)
              if ((!payload.components || payload.components.length === 0) && Array.isArray(payload.products) && payload.products.length > 0)
                renderConversationProducts(ensureTurnInsert(), payload.products)
              dismissWelcome()
            }

            if (event === 'error') {
              updateAssistant(payload.error || payload.message || 'The AskCrystal backend ran into an issue.')
            }
          }
        }
      }
      catch {
        updateAssistant('The homepage block could not reach the AskCrystal backend. Check the app proxy server first.')
      }
      finally {
        setBusy(false)
        scrollStageToBottom(stage)
      }
    }

    if (conversationId)
      dismissWelcome()

    form?.addEventListener('submit', (event) => {
      event.preventDefault()
      const message = textarea?.value?.trim()
      if (!message)
        return

      textarea.value = ''
      send(message)
    })

    actionButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const message = button.dataset.askcrystalMessage?.trim() || button.textContent.trim()
        if (textarea)
          textarea.value = ''
        send(message)
      })
    })
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-askcrystal-agent]').forEach(initBlock)
  })
})()
