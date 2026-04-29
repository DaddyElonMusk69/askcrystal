import { config } from '../config.mjs'

const isAllowedOrigin = (origin) => {
  if (!origin || typeof origin !== 'string')
    return false

  if (/^https?:\/\/(127\.0\.0\.1|localhost):9292$/.test(origin))
    return true

  const allowedOrigins = [
    config.shopifyStoreDomain ? `https://${config.shopifyStoreDomain}` : '',
    config.shopifyAppUrl,
  ].filter(Boolean)

  return allowedOrigins.some((allowedOrigin) => {
    try {
      return new URL(allowedOrigin).origin === new URL(origin).origin
    }
    catch {
      return false
    }
  })
}

export const applyCors = (req, res) => {
  const origin = req.headers.origin
  if (!isAllowedOrigin(origin))
    return false

  res.setHeader('access-control-allow-origin', origin)
  res.setHeader('access-control-allow-methods', 'GET,POST,OPTIONS')
  res.setHeader('access-control-allow-headers', 'content-type')
  res.setHeader('access-control-max-age', '600')
  res.setHeader('vary', 'Origin')
  return true
}

export const json = (res, statusCode, payload) => {
  if (res.destroyed || res.writableEnded)
    return false

  try {
    if (!res.headersSent) {
      res.writeHead(statusCode, {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store',
      })
    }
    res.end(JSON.stringify(payload, null, 2))
    return true
  }
  catch (error) {
    console.error('[askcrystal-shopify] Failed to write JSON response.', error)
    return false
  }
}

export const sseStart = (res) => {
  if (res.destroyed || res.writableEnded)
    return false

  try {
    if (!res.headersSent) {
      res.writeHead(200, {
        'content-type': 'text/event-stream; charset=utf-8',
        'cache-control': 'no-store',
        connection: 'keep-alive',
        'x-accel-buffering': 'no',
        'x-content-type-options': 'nosniff',
      })
    }
    res.flushHeaders?.()
    res.write(':\n\n')
    return true
  }
  catch (error) {
    console.error('[askcrystal-shopify] Failed to start SSE response.', error)
    return false
  }
}

export const sseEvent = (res, eventName, payload) => {
  if (res.destroyed || res.writableEnded)
    return false

  try {
    const eventPrefix = eventName ? `event: ${eventName}\n` : ''
    const chunk = `${eventPrefix}data: ${JSON.stringify(payload)}\n\n`
    res.write(chunk)
    return true
  }
  catch (error) {
    console.error('[askcrystal-shopify] Failed to write SSE event.', error)
    return false
  }
}

export const notFound = res => json(res, 404, {
  ok: false,
  error: 'Route not found',
})

export const methodNotAllowed = (res, allowed) => json(res, 405, {
  ok: false,
  error: 'Method not allowed',
  allowed,
})

export const readJson = async req => {
  const chunks = []
  for await (const chunk of req)
    chunks.push(chunk)

  const raw = Buffer.concat(chunks).toString('utf8')
  if (!raw)
    return {}

  return JSON.parse(raw)
}
