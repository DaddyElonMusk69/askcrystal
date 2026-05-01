import http from 'node:http'

import { config } from './config.mjs'
import { applyCors, json, methodNotAllowed, notFound } from './utils/http.mjs'
import { resolveRoute, validateRouteRequest } from './router.mjs'

const clientDisconnectErrorCodes = new Set([
  'ABORT_ERR',
  'ECONNABORTED',
  'ECONNRESET',
  'EPIPE',
  'ERR_STREAM_DESTROYED',
  'ERR_STREAM_PREMATURE_CLOSE',
  'ERR_STREAM_WRITE_AFTER_END',
])

const isClientDisconnectError = error => (
  clientDisconnectErrorCodes.has(error?.code)
  || /aborted|closed|disconnect|socket hang up|write after end/i.test(String(error?.message || ''))
)

const logProcessError = (label, error) => {
  if (isClientDisconnectError(error)) {
    console.warn(`[askcrystal-shopify] ${label}`, error?.code || error?.message || error)
    return
  }

  console.error(`[askcrystal-shopify] ${label}`, error)
}

process.on('unhandledRejection', error => {
  logProcessError('Unhandled promise rejection caught at process boundary.', error)
})

process.on('uncaughtException', error => {
  logProcessError('Uncaught exception caught at process boundary.', error)
})

const server = http.createServer(async (req, res) => {
  req.on('error', error => {
    logProcessError('Request stream error.', error)
  })
  res.on('error', error => {
    logProcessError('Response stream error.', error)
  })

  try {
    applyCors(req, res)

    if (req.method.toUpperCase() === 'OPTIONS') {
      res.writeHead(204)
      res.end()
      return
    }

    const validation = validateRouteRequest(req)
    if (!validation.ok) {
      return json(res, 401, {
        ok: false,
        error: validation.reason,
        mode: validation.mode,
      })
    }

    const handler = resolveRoute(req)
    if (!handler) {
      return notFound(res)
    }

    if (!['GET', 'POST'].includes(req.method.toUpperCase())) {
      return methodNotAllowed(res, ['GET', 'POST'])
    }

    const result = await handler(req, res)
    if (res.writableEnded || res.destroyed)
      return

    return json(res, result.statusCode || 200, result.payload)
  }
  catch (error) {
    console.error('[askcrystal-shopify] Request failed.', error)
    return json(res, 500, {
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown server error',
    })
  }
})

server.on('clientError', (error, socket) => {
  console.warn('[askcrystal-shopify] HTTP client error.', error?.code || error?.message || error)

  if (socket.destroyed)
    return

  try {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
  }
  catch {
    socket.destroy()
  }
})

server.on('error', error => {
  console.error('[askcrystal-shopify] HTTP server error.', error)

  if (error?.code === 'EADDRINUSE' || error?.code === 'EACCES' || error?.code === 'EPERM')
    process.exit(1)
})

const shutdown = (signal) => {
  console.log(`[askcrystal-shopify] received ${signal}; shutting down`)
  server.close(error => {
    if (error) {
      console.error('[askcrystal-shopify] graceful shutdown failed.', error)
      process.exit(1)
    }

    process.exit(0)
  })
}

process.once('SIGINT', () => shutdown('SIGINT'))
process.once('SIGTERM', () => shutdown('SIGTERM'))

server.listen(config.port, () => {
  console.log(`[askcrystal-shopify] scaffold server listening on http://localhost:${config.port}`)
  console.log(`[askcrystal-shopify] health endpoint: http://localhost:${config.port}/api/health`)
})
