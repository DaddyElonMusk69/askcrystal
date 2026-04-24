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

  const createProductCard = (product) => {
    const card = document.createElement('article')
    card.className = 'askcrystal-product-card'

    const tag = document.createElement('p')
    tag.className = 'askcrystal-product-card__tag'
    tag.textContent = 'Suggested now'
    card.appendChild(tag)

    const title = document.createElement('h3')
    title.className = 'askcrystal-product-card__title'
    title.textContent = product?.title || 'Untitled crystal'
    card.appendChild(title)

    const body = document.createElement('p')
    body.className = 'askcrystal-product-card__body'
    body.textContent = product?.reason || product?.description || 'A curated crystal suggestion from the guide.'
    card.appendChild(body)

    const noteText = product?.ritual || product?.usage || product?.how_to_use || product?.howToUse || product?.note
    if (noteText) {
      const note = document.createElement('p')
      note.className = 'askcrystal-product-card__body'
      note.textContent = noteText
      card.appendChild(note)
    }

    if (product?.price) {
      const price = document.createElement('p')
      price.className = 'askcrystal-product-card__price'
      price.textContent = product.price
      card.appendChild(price)
    }

    const productUrl = getProductUrl(product)
    if (productUrl) {
      const link = document.createElement('a')
      link.className = 'askcrystal-product-card__link'
      link.href = productUrl
      link.textContent = 'View item'
      card.appendChild(link)
    }

    return card
  }

  const renderConversationProducts = (stage, products) => {
    if (!stage || !Array.isArray(products) || products.length === 0)
      return

    const insert = document.createElement('section')
    insert.className = 'askcrystal-stage__insert'

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
      grid.appendChild(createProductCard(product))
    })

    insert.appendChild(header)
    insert.appendChild(grid)
    stage.appendChild(insert)
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

      const updateAssistant = (text, options = {}) => {
        assistantMessage = replaceMessage(assistantMessage, text, 'assistant', options)
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
          if (payload.answer) {
            dismissWelcome()
            await mountEmbeddedChat()
          }
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
            if (event === 'status') {
              updateAssistant(payload.message || 'AskCrystal is thinking through the best path.')
            }

            if (event === 'complete') {
              if (payload.conversationId) {
                conversationId = payload.conversationId
                setStoredValue(root, 'conversation-id', conversationId)
              }

              updateAssistant(payload.answer || 'AskCrystal responded without answer text.')
              dismissWelcome()
              await mountEmbeddedChat()
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

    if (conversationId) {
      dismissWelcome()
      setBusy(true)
      mountEmbeddedChat()
        .finally(() => {
          setBusy(false)
        })
    }

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
