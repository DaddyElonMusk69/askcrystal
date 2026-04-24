#!/usr/bin/env node

const DEFAULTS = {
  streamUrl: process.env.ASKCRYSTAL_STREAM_URL || 'http://localhost:8787/apps/askcrystal/chat/stream',
  stopUrl: process.env.ASKCRYSTAL_STOP_URL || 'http://localhost:8787/apps/askcrystal/chat/stop',
  message:
    process.env.ASKCRYSTAL_STOP_SMOKE_MESSAGE
    || 'Give me a long crystal guidance answer with practical ritual steps and product recommendations for deep rest and anxiety relief.',
  stopAfterChunks: Number.parseInt(process.env.ASKCRYSTAL_STOP_AFTER_CHUNKS || '3', 10),
  timeoutMs: Number.parseInt(process.env.ASKCRYSTAL_STOP_TIMEOUT_MS || '90000', 10),
  sessionId: process.env.ASKCRYSTAL_STOP_SESSION_ID || `shopify-stop-smoke-${Date.now()}`,
  verbose: process.env.ASKCRYSTAL_STOP_SMOKE_VERBOSE === '1',
}

function parseArgs(argv) {
  const config = { ...DEFAULTS }

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]
    const next = argv[index + 1]

    if (arg === '--stream-url' && next) {
      config.streamUrl = next
      index += 1
      continue
    }

    if (arg === '--stop-url' && next) {
      config.stopUrl = next
      index += 1
      continue
    }

    if (arg === '--message' && next) {
      config.message = next
      index += 1
      continue
    }

    if (arg === '--stop-after-chunks' && next) {
      config.stopAfterChunks = Number.parseInt(next, 10)
      index += 1
      continue
    }

    if (arg === '--timeout-ms' && next) {
      config.timeoutMs = Number.parseInt(next, 10)
      index += 1
      continue
    }

    if (arg === '--session-id' && next) {
      config.sessionId = next
      index += 1
      continue
    }

    if (arg === '--verbose') {
      config.verbose = true
      continue
    }

    if (arg === '--help' || arg === '-h') {
      printHelp()
      process.exit(0)
    }

    throw new Error(`Unknown argument: ${arg}`)
  }

  if (!Number.isInteger(config.stopAfterChunks) || config.stopAfterChunks < 1) {
    throw new Error('--stop-after-chunks must be an integer >= 1')
  }

  if (!Number.isInteger(config.timeoutMs) || config.timeoutMs < 1000) {
    throw new Error('--timeout-ms must be an integer >= 1000')
  }

  return config
}

function printHelp() {
  console.log(`AskCrystal Shopify STOP smoke test\n\nUsage:\n  node scripts/shopify_stop_smoke.mjs [options]\n\nOptions:\n  --stream-url <url>         Stream endpoint\n  --stop-url <url>           Stop endpoint\n  --message <text>           Prompt to send\n  --stop-after-chunks <n>    Abort after N streamed chunks (default: ${DEFAULTS.stopAfterChunks})\n  --timeout-ms <ms>          Overall timeout in milliseconds (default: ${DEFAULTS.timeoutMs})\n  --session-id <id>          Override generated session id\n  --verbose                  Print every status/chunk event\n  --help                     Show this message\n`)
}

function parseSseEvents(raw) {
  const events = []
  let remaining = raw.replace(/\r\n/g, '\n')

  while (true) {
    const separatorIndex = remaining.indexOf('\n\n')
    if (separatorIndex === -1)
      break

    const block = remaining.slice(0, separatorIndex)
    remaining = remaining.slice(separatorIndex + 2)

    const lines = block.split('\n')
    const eventLine = lines.find(line => line.startsWith('event:'))
    const payloadLines = lines
      .filter(line => line.startsWith('data:'))
      .map(line => line.slice(5).trim())

    if (!payloadLines.length)
      continue

    try {
      events.push({
        event: eventLine ? eventLine.slice(6).trim() : 'message',
        payload: JSON.parse(payloadLines.join('\n')),
      })
    }
    catch {
      // Ignore malformed SSE payloads so the smoke test can keep observing the stream.
    }
  }

  return { events, remaining }
}

function getPayloadTaskId(payload) {
  const value = payload?.taskId || payload?.task_id || payload?.data?.taskId || payload?.data?.task_id
  return typeof value === 'string' ? value : ''
}

function getPayloadText(payload) {
  const value = payload?.answer || payload?.text || payload?.message || payload?.data?.answer || payload?.data?.text
  return typeof value === 'string' ? value : ''
}

function createAbortError() {
  if (typeof DOMException !== 'undefined') {
    return new DOMException('The operation was aborted.', 'AbortError')
  }

  const error = new Error('The operation was aborted.')
  error.name = 'AbortError'
  return error
}

function throwIfAborted(signal) {
  if (signal?.aborted)
    throw createAbortError()
}

async function sendStop({ stopUrl, taskId, sessionId }) {
  const response = await fetch(stopUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ taskId, sessionId }),
  })

  const text = await response.text()
  let payload = null
  try {
    payload = JSON.parse(text)
  }
  catch {
    payload = null
  }

  return {
    status: response.status,
    ok: response.ok,
    payload,
    body: text,
  }
}

async function main() {
  const config = parseArgs(process.argv.slice(2))
  const startedAt = Date.now()
  const abortController = new AbortController()

  const summary = {
    sessionId: config.sessionId,
    streamUrl: config.streamUrl,
    stopUrl: config.stopUrl,
    taskId: '',
    statuses: [],
    deltaCount: 0,
    processedAfterAbort: 0,
    stopResponse: null,
    completed: false,
    errored: false,
    timedOut: false,
    durationMs: 0,
  }

  const timeoutHandle = setTimeout(() => {
    summary.timedOut = true
    abortController.abort()
  }, config.timeoutMs)

  try {
    const response = await fetch(config.streamUrl, {
      method: 'POST',
      headers: {
        accept: 'text/event-stream',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        message: config.message,
        sessionId: config.sessionId,
      }),
      signal: abortController.signal,
    })

    console.log(`[stop-smoke] stream_status=${response.status}`)

    if (!response.ok)
      throw new Error(`Stream request failed with status ${response.status}`)

    if (!response.body)
      throw new Error('Stream response body is not readable')

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      throwIfAborted(abortController.signal)
      const { done, value } = await reader.read()
      if (done)
        break

      throwIfAborted(abortController.signal)
      buffer += decoder.decode(value, { stream: true })
      const parsed = parseSseEvents(buffer)
      buffer = parsed.remaining

      for (const event of parsed.events) {
        throwIfAborted(abortController.signal)

        const nextTaskId = getPayloadTaskId(event.payload)
        if (nextTaskId && !summary.taskId) {
          summary.taskId = nextTaskId
          console.log(`[stop-smoke] task_id=${summary.taskId}`)
        }

        if (event.event === 'status') {
          const statusMessage = event.payload?.message || ''
          summary.statuses.push(statusMessage)
          if (config.verbose)
            console.log(`[stop-smoke] status=${JSON.stringify(event.payload)}`)
        }

        if (['delta', 'message', 'agent_message', 'replace'].includes(event.event)) {
          summary.deltaCount += 1
          const preview = getPayloadText(event.payload).slice(0, 32).replace(/\n/g, ' ')
          if (config.verbose)
            console.log(`[stop-smoke] chunk=${summary.deltaCount} text=${JSON.stringify(preview)}`)

          if (summary.taskId && summary.deltaCount >= config.stopAfterChunks) {
            abortController.abort()
            summary.stopResponse = await sendStop({
              stopUrl: config.stopUrl,
              taskId: summary.taskId,
              sessionId: config.sessionId,
            })
            console.log(
              `[stop-smoke] stop_status=${summary.stopResponse.status} upstream_ok=${Boolean(summary.stopResponse.payload?.upstreamStop)}`,
            )
            throwIfAborted(abortController.signal)
          }
        }

        if (abortController.signal.aborted)
          summary.processedAfterAbort += 1

        if (event.event === 'error') {
          summary.errored = true
          throw new Error(event.payload?.error || event.payload?.message || 'Proxy stream emitted an error event')
        }

        if (event.event === 'complete') {
          summary.completed = true
        }
      }
    }
  }
  catch (error) {
    if (!(error instanceof Error) || error.name !== 'AbortError') {
      throw error
    }
  }
  finally {
    clearTimeout(timeoutHandle)
    summary.durationMs = Date.now() - startedAt
  }

  const failures = []

  if (summary.timedOut)
    failures.push(`timed out after ${config.timeoutMs}ms`)

  if (!summary.taskId)
    failures.push('taskId was never observed in the stream')

  if (summary.deltaCount < config.stopAfterChunks)
    failures.push(`only observed ${summary.deltaCount} streamed chunks before abort; expected at least ${config.stopAfterChunks}`)

  if (!summary.stopResponse)
    failures.push('stop endpoint was never called')
  else {
    if (!summary.stopResponse.ok)
      failures.push(`stop endpoint returned HTTP ${summary.stopResponse.status}`)
    if (!summary.stopResponse.payload?.ok)
      failures.push('stop endpoint did not return ok=true')
    if (!summary.stopResponse.payload?.upstreamStop)
      failures.push('stop endpoint did not confirm upstreamStop=true')
  }

  if (summary.processedAfterAbort > 0)
    failures.push(`processed ${summary.processedAfterAbort} events after local abort`)

  console.log('[stop-smoke] summary=' + JSON.stringify(summary, null, 2))

  if (failures.length > 0) {
    for (const failure of failures)
      console.error(`[stop-smoke] failure=${failure}`)
    process.exit(1)
  }

  console.log('[stop-smoke] passed')
}

main().catch((error) => {
  console.error(`[stop-smoke] failed: ${error instanceof Error ? error.message : String(error)}`)
  process.exit(1)
})
