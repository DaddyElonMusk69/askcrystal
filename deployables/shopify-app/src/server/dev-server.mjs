import http from 'node:http'

import { config } from './config.mjs'
import { applyCors, json, methodNotAllowed, notFound } from './utils/http.mjs'
import { resolveRoute, validateRouteRequest } from './router.mjs'

const server = http.createServer(async (req, res) => {
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
    if (res.writableEnded)
      return

    return json(res, result.statusCode || 200, result.payload)
  }
  catch (error) {
    return json(res, 500, {
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown server error',
    })
  }
})

server.listen(config.port, () => {
  console.log(`[askcrystal-shopify] scaffold server listening on http://localhost:${config.port}`)
  console.log(`[askcrystal-shopify] health endpoint: http://localhost:${config.port}/api/health`)
})
