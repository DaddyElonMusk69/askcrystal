const isAllowedOrigin = (origin) => {
  if (!origin || typeof origin !== 'string')
    return false

  return /^https?:\/\/(127\.0\.0\.1|localhost):9292$/.test(origin)
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
  res.writeHead(statusCode, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  })
  res.end(JSON.stringify(payload, null, 2))
}

export const sseStart = (res) => {
  res.writeHead(200, {
    'content-type': 'text/event-stream; charset=utf-8',
    'cache-control': 'no-store',
    connection: 'keep-alive',
    'x-accel-buffering': 'no',
    'x-content-type-options': 'nosniff',
  })
  res.flushHeaders?.()
  res.write(':\n\n')
}

export const sseEvent = (res, eventName, payload) => {
  if (eventName)
    res.write(`event: ${eventName}\n`)
  res.write(`data: ${JSON.stringify(payload)}\n\n`)
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
