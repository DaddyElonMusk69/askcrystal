import { Buffer } from 'node:buffer'
import { gzipSync } from 'node:zlib'

import { config, requireDifyChatConfig, requireDifyConsoleDevConfig } from '../config.mjs'

const TERMINAL_EVENTS = new Set([
  'message_end',
  'advanced_chat_message_end',
  'workflow_finished',
  'error',
])

const DEFAULT_STREAM_RETRY_ATTEMPTS = 2

const joinUrl = (baseUrl, path) => new URL(path, `${baseUrl.replace(/\/$/, '')}/`).toString()

const getSetCookies = (response) => {
  if (typeof response.headers.getSetCookie === 'function')
    return response.headers.getSetCookie()

  const single = response.headers.get('set-cookie')
  return single ? [single] : []
}

const parseCookiePair = (cookieString) => {
  const firstPart = cookieString.split(';', 1)[0] || ''
  const separatorIndex = firstPart.indexOf('=')
  if (separatorIndex === -1)
    return null

  const name = firstPart.slice(0, separatorIndex).trim()
  const value = firstPart.slice(separatorIndex + 1).trim()
  if (!name)
    return null

  return { name, value }
}

const parseTextPayload = (text) => {
  if (typeof text !== 'string' || !text.trim())
    return {}

  try {
    return JSON.parse(text)
  }
  catch {
    return text
  }
}

const createAbortError = (message = 'The Dify stream was aborted.') => {
  const error = new Error(message)
  error.name = 'AbortError'
  return error
}

const extractSseEvents = (buffer) => {
  const events = []
  let remaining = buffer.replace(/\r\n/g, '\n')

  while (true) {
    const separatorIndex = remaining.indexOf('\n\n')
    if (separatorIndex === -1)
      break

    const rawEvent = remaining.slice(0, separatorIndex)
    remaining = remaining.slice(separatorIndex + 2)

    const payload = rawEvent
      .split('\n')
      .filter(line => line.startsWith('data:'))
      .map(line => line.slice(5).trim())
      .join('\n')

    if (!payload || payload === '[DONE]')
      continue

    try {
      events.push(JSON.parse(payload))
    }
    catch {}
  }

  return { events, remaining }
}

const getEventText = (event) => {
  if (!event || typeof event !== 'object')
    return ''

  if (typeof event.answer === 'string')
    return event.answer

  if (typeof event.text === 'string')
    return event.text

  if (typeof event.delta === 'string')
    return event.delta

  if (typeof event?.data?.answer === 'string')
    return event.data.answer

  if (typeof event?.data?.text === 'string')
    return event.data.text

  return ''
}

const getEventConversationId = (event) => {
  if (typeof event?.conversation_id === 'string' && event.conversation_id)
    return event.conversation_id

  if (typeof event?.data?.conversation_id === 'string' && event.data.conversation_id)
    return event.data.conversation_id

  return null
}

const getEventTaskId = (event) => {
  if (typeof event?.task_id === 'string' && event.task_id)
    return event.task_id

  if (typeof event?.taskId === 'string' && event.taskId)
    return event.taskId

  if (typeof event?.data?.task_id === 'string' && event.data.task_id)
    return event.data.task_id

  if (typeof event?.data?.taskId === 'string' && event.data.taskId)
    return event.data.taskId

  return null
}

const getToolName = (event) => {
  if (!event || typeof event !== 'object')
    return ''

  if (typeof event.tool === 'string' && event.tool)
    return event.tool

  if (typeof event.tool_name === 'string' && event.tool_name)
    return event.tool_name

  if (event.tool_labels && typeof event.tool_labels === 'object') {
    const labelEntry = Object.values(event.tool_labels).find(value => typeof value === 'string' && value)
    if (typeof labelEntry === 'string')
      return labelEntry
  }

  return ''
}

const buildStatusPayload = ({ stage, event = null } = {}) => {
  const toolName = getToolName(event)
  const toolContext = `${toolName} ${event?.thought || ''} ${event?.observation || ''}`.toLowerCase()
  const taskId = getEventTaskId(event)

  if (stage === 'listen') {
    return {
      stage,
      tool: null,
      message: 'Tuning in...',
      taskId,
    }
  }

  if (stage === 'compose') {
    return {
      stage,
      tool: null,
      message: 'Gathering your reading...',
      taskId,
    }
  }

  if (/shopify|catalog|product|variant|collection|cart|storefront|inventory/.test(toolContext)) {
    return {
      stage: 'tool',
      tool: toolName || null,
      message: 'Checking the shelf...',
      taskId,
    }
  }

  if (/knowledge|dataset|retriev|document|archive|rag|kb|search/.test(toolContext)) {
    return {
      stage: 'tool',
      tool: toolName || null,
      message: 'Reading the archive...',
      taskId,
    }
  }

  if (/tarot|card|spread/.test(toolContext)) {
    return {
      stage: 'tool',
      tool: toolName || null,
      message: 'Laying the cards...',
      taskId,
    }
  }

  if (/astrology|natal|zodiac|planet|birth|horoscope|star/.test(toolContext)) {
    return {
      stage: 'tool',
      tool: toolName || null,
      message: 'Reading the stars...',
      taskId,
    }
  }

  if (/bazi|shushu|taibu|fengshui|yinyuan|marriage/.test(toolContext)) {
    return {
      stage: 'tool',
      tool: toolName || null,
      message: 'Reading the pattern...',
      taskId,
    }
  }

  if (/crystal|stone|chakra|healing|ritual/.test(toolContext)) {
    return {
      stage: 'tool',
      tool: toolName || null,
      message: 'Feeling the stone...',
      taskId,
    }
  }

  return {
    stage: 'tool',
    tool: toolName || null,
    message: 'Reading the signs...',
    taskId,
  }
}

const normalizeDifyAnswer = (payload) => {
  const references = payload?.retriever_resources
    || payload?.metadata?.retriever_resources
    || []

  if (typeof payload?.answer === 'string') {
    return {
      answer: payload.answer,
      conversationId: payload.conversation_id || null,
      metadata: payload.metadata || {},
      references,
    }
  }

  return {
    answer: null,
    conversationId: payload?.conversation_id || null,
    metadata: payload?.metadata || {},
    references,
  }
}

const normalizeDifyStream = (events) => {
  const errorEvent = events.find(event => event?.event === 'error')
  if (errorEvent) {
    const message = errorEvent.message || errorEvent.answer || 'Dify streaming request failed'
    throw new Error(message)
  }

  const streamedAnswer = events
    .filter(event => ['message', 'agent_message', 'text_chunk'].includes(event?.event))
    .map(getEventText)
    .filter(Boolean)
    .join('')

  const replacementAnswer = [...events]
    .reverse()
    .find(event => ['message_replace', 'text_replace'].includes(event?.event))

  const replacementText = getEventText(replacementAnswer)

  const answer = replacementText || streamedAnswer

  const conversationId = events
    .map(event => event?.conversation_id)
    .find(value => typeof value === 'string' && value)
    || null

  const taskId = events
    .map(getEventTaskId)
    .find(value => typeof value === 'string' && value)
    || null

  const messageEndEvent = [...events]
    .reverse()
    .find(event => ['message_end', 'advanced_chat_message_end'].includes(event?.event))

  const metadata = messageEndEvent?.metadata || {}
  const references = metadata?.retriever_resources || messageEndEvent?.retriever_resources || []

  return {
    answer: answer || null,
    conversationId,
    taskId,
    metadata,
    references,
  }
}

const fetchTextWithTimeout = async (url, options, timeoutMs) => {
  const controller = new AbortController()
  const timeoutHandle = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    const text = await response.text()
    return { response, text }
  }
  catch (error) {
    if (error instanceof Error && error.name === 'AbortError')
      throw new Error(`Dify request timed out after ${timeoutMs}ms`)
    throw error
  }
  finally {
    clearTimeout(timeoutHandle)
  }
}

const appendStreamMetadata = (payload, events) => ({
  ...payload,
  metadata: {
    ...(payload.metadata || {}),
    streamEvents: events.length,
  },
})

const compressToDifyParam = (value) => gzipSync(String(value), { level: 9 }).toString('base64')

const isRetryableDifyFailure = (result) => {
  if (!result || result.ok)
    return false

  const message = String(result.message || result.details?.message || '').toLowerCase()
  return (
    result.status >= 500
    || message.includes('timeout')
    || message.includes('timed out')
    || message.includes('connection error')
    || message.includes('connection reset')
    || message.includes('server unavailable')
    || message.includes('max retries')
    || message.includes('ssl')
    || message.includes('eof')
    || message.includes('temporarily')
  )
}

const buildEmbeddedChatUrl = ({ baseUrl, accessToken, userId, conversationId = null }) => {
  const iframeUrl = new URL(`/chatbot/${accessToken}`, `${baseUrl.replace(/\/$/, '')}/`)
  if (userId)
    iframeUrl.searchParams.set('sys.user_id', compressToDifyParam(userId))
  if (conversationId)
    iframeUrl.searchParams.set('sys.conversation_id', compressToDifyParam(conversationId))
  return iframeUrl.toString()
}

const buildServiceChatRequest = ({
  chatUrl,
  apiKey,
  message,
  conversationId,
  userId,
  memoryContext = null,
  controller,
  responseMode = 'streaming',
}) => ({
  url: chatUrl,
  options: {
    method: 'POST',
    headers: {
      accept: 'application/json, text/event-stream',
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      inputs: memoryContext ? { memory_context: memoryContext } : {},
      query: message,
      response_mode: responseMode,
      conversation_id: conversationId || undefined,
      user: userId || 'shopify-guest',
    }),
    signal: controller.signal,
  },
})

const buildServiceChatStopRequest = ({
  chatUrl,
  apiKey,
  taskId,
  userId,
  controller,
}) => ({
  url: new URL(`./${taskId}/stop`, `${chatUrl.replace(/\/$/, '')}/`).toString(),
  options: {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      user: userId || 'shopify-guest',
    }),
    signal: controller.signal,
  },
})

const sendServiceApiChat = async ({
  chatUrl,
  apiKey,
  message,
  conversationId,
  userId,
  memoryContext = null,
  onProgress = null,
  responseMode = 'streaming',
  emitErrors = true,
  externalAbortSignal = null,
}) => {
  const controller = new AbortController()
  const timeoutHandle = setTimeout(() => controller.abort(), config.difyRequestTimeoutMs)
  const handleExternalAbort = () => controller.abort()
  const throwIfAborted = () => {
    if (controller.signal.aborted || externalAbortSignal?.aborted)
      throw createAbortError()
  }

  if (externalAbortSignal) {
    if (externalAbortSignal.aborted)
      controller.abort()
    else
      externalAbortSignal.addEventListener('abort', handleExternalAbort, { once: true })
  }

  try {
    const request = buildServiceChatRequest({
      chatUrl,
      apiKey,
      message,
      conversationId,
      userId,
      memoryContext,
      controller,
      responseMode,
    })
    const response = await fetch(request.url, request.options)

    const contentType = response.headers.get('content-type') || ''

    if (!response.ok) {
      const text = await response.text()
      const payload = parseTextPayload(text)
      return {
        ok: false,
        status: response.status,
        code: 'dify_request_failed',
        message: payload?.message || 'Dify chat request failed',
        details: payload,
      }
    }

    if (!contentType.includes('text/event-stream') || !response.body) {
      const text = await response.text()
      const payload = normalizeDifyAnswer(parseTextPayload(text))
      onProgress?.({
        type: 'complete',
        payload,
      })
      return {
        ok: true,
        status: 200,
        data: payload,
      }
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    const events = []
    let buffer = ''
    let emittedResponseStatus = false
    let forwardedAnswer = ''
    let lastStatusKey = ''

    const emitStatus = (payload) => {
      if (!payload?.message)
        return

      const statusKey = `${payload.stage || 'status'}:${payload.tool || ''}:${payload.message}`
      if (statusKey === lastStatusKey)
        return

      lastStatusKey = statusKey
      onProgress?.({
        type: 'status',
        payload,
      })
    }

    while (true) {
      throwIfAborted()
      const { done, value } = await reader.read()
      if (done)
        break

      throwIfAborted()
      buffer += decoder.decode(value, { stream: true })
      const parsed = extractSseEvents(buffer)
      buffer = parsed.remaining

      for (const event of parsed.events) {
        throwIfAborted()
        events.push(event)

        if (event?.event === 'agent_thought') {
          throwIfAborted()
          emitStatus(buildStatusPayload({ stage: 'tool', event }))
        }

        const isChunkEvent = ['message', 'agent_message', 'text_chunk'].includes(event?.event)
        const isReplaceEvent = ['message_replace', 'text_replace'].includes(event?.event)
        const eventText = getEventText(event)

        if ((isChunkEvent || isReplaceEvent) && eventText) {
          if (!emittedResponseStatus) {
            throwIfAborted()
            emittedResponseStatus = true
            emitStatus(buildStatusPayload({ stage: 'compose' }))
          }

          if (isReplaceEvent) {
            throwIfAborted()
            forwardedAnswer = eventText
            onProgress?.({
              type: 'replace',
              payload: {
                answer: eventText,
                text: eventText,
                conversationId: getEventConversationId(event),
                taskId: getEventTaskId(event),
              },
            })
          }
          else {
            throwIfAborted()
            forwardedAnswer += eventText
            onProgress?.({
              type: 'delta',
              payload: {
                answer: eventText,
                text: eventText,
                conversationId: getEventConversationId(event),
                taskId: getEventTaskId(event),
              },
            })
          }
        }

        if (event?.event === 'error') {
          const messageText = event.message || event.answer || 'Dify streaming request failed'
          if (emitErrors) {
            onProgress?.({
              type: 'error',
              payload: {
                code: 'dify_request_failed',
                message: messageText,
              },
            })
          }
          return {
            ok: false,
            status: 502,
            code: 'dify_request_failed',
            message: messageText,
            details: event,
          }
        }

        if (['message_end', 'advanced_chat_message_end', 'workflow_finished'].includes(event?.event)) {
          const payload = appendStreamMetadata(normalizeDifyStream(events), events)
          if (!payload.answer && forwardedAnswer)
            payload.answer = forwardedAnswer
          onProgress?.({
            type: 'complete',
            payload,
          })
          await reader.cancel()
          return {
            ok: true,
            status: 200,
            data: payload,
          }
        }
      }
    }

    const tail = decoder.decode()
    if (tail) {
      buffer += tail
      const parsed = extractSseEvents(`${buffer}\n\n`)
      events.push(...parsed.events)
    }

    const payload = appendStreamMetadata(normalizeDifyStream(events), events)
    if (!payload.answer && forwardedAnswer)
      payload.answer = forwardedAnswer
    onProgress?.({
      type: 'complete',
      payload,
    })
    return {
      ok: true,
      status: 200,
      data: payload,
    }
  }
  catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return {
        ok: false,
        status: 499,
        code: 'dify_request_aborted',
        message: error.message,
      }
    }

    if (error instanceof Error) {
      if (emitErrors) {
        onProgress?.({
          type: 'error',
          payload: {
            code: 'dify_request_failed',
            message: error.message,
          },
        })
      }
      return {
        ok: false,
        status: 502,
        code: 'dify_request_failed',
        message: error.message,
      }
    }

    return {
      ok: false,
      status: 502,
      code: 'dify_request_failed',
      message: 'Dify chat request failed',
    }
  }
  finally {
    if (externalAbortSignal)
      externalAbortSignal.removeEventListener('abort', handleExternalAbort)
    clearTimeout(timeoutHandle)
  }
}

const stopServiceApiChat = async ({
  chatUrl,
  apiKey,
  taskId,
  userId,
}) => {
  const controller = new AbortController()
  const timeoutHandle = setTimeout(() => controller.abort(), config.difyRequestTimeoutMs)

  try {
    const request = buildServiceChatStopRequest({
      chatUrl,
      apiKey,
      taskId,
      userId,
      controller,
    })
    const response = await fetch(request.url, request.options)
    const text = await response.text()
    const payload = parseTextPayload(text)

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        code: 'dify_stop_failed',
        message: payload?.message || 'Dify stop request failed',
        details: payload,
      }
    }

    return {
      ok: true,
      status: response.status,
      data: payload,
    }
  }
  catch (error) {
    return {
      ok: false,
      status: 502,
      code: 'dify_stop_failed',
      message: error instanceof Error ? error.message : 'Dify stop request failed',
    }
  }
  finally {
    clearTimeout(timeoutHandle)
  }
}

class DifyConsoleDevClient {
  constructor({ baseUrl, email, password, appId }) {
    this.baseUrl = baseUrl.replace(/\/$/, '')
    this.email = email
    this.password = password
    this.appId = appId
    this.cookieJar = new Map()
    this.csrfToken = null
    this.appApiKey = null
    this.appDetail = null
  }

  _storeCookies(response) {
    for (const rawCookie of getSetCookies(response)) {
      const parsed = parseCookiePair(rawCookie)
      if (!parsed)
        continue
      this.cookieJar.set(parsed.name, parsed.value)
      if (parsed.name.endsWith('csrf_token'))
        this.csrfToken = parsed.value
    }
  }

  _cookieHeader() {
    return Array.from(this.cookieJar.entries())
      .map(([name, value]) => `${name}=${value}`)
      .join('; ')
  }

  async _request(path, { method = 'GET', headers = {}, body } = {}) {
    const finalHeaders = {
      accept: 'application/json',
      ...headers,
    }

    const cookieHeader = this._cookieHeader()
    if (cookieHeader)
      finalHeaders.cookie = cookieHeader

    const normalizedPath = path.startsWith('/') ? path : `/${path}`
    if (this.csrfToken && normalizedPath !== '/console/api/login' && normalizedPath !== '/console/api/setup')
      finalHeaders['x-csrf-token'] = this.csrfToken

    const { response, text } = await fetchTextWithTimeout(joinUrl(this.baseUrl, normalizedPath), {
      method,
      headers: finalHeaders,
      body,
    }, config.difyRequestTimeoutMs)
    this._storeCookies(response)

    const payload = parseTextPayload(text)
    if (!response.ok) {
      const message = typeof payload === 'object' && payload && payload.message
        ? payload.message
        : `Dify console request failed with status ${response.status}`
      throw new Error(message)
    }

    return payload
  }

  async login() {
    const encodedPassword = Buffer.from(this.password, 'utf8').toString('base64')
    await this._request('/console/api/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: this.email,
        password: encodedPassword,
        remember_me: true,
      }),
    })
  }

  async ensureSession() {
    if (!this.csrfToken || this.cookieJar.size === 0)
      await this.login()
  }

  async ensureAppApiKey() {
    if (this.appApiKey)
      return this.appApiKey

    await this.ensureSession()

    const existingKeys = await this._request(`/console/api/apps/${this.appId}/api-keys`)
    const firstExistingToken = existingKeys?.data?.[0]?.token
    if (firstExistingToken) {
      this.appApiKey = firstExistingToken
      return this.appApiKey
    }

    const createdKey = await this._request(`/console/api/apps/${this.appId}/api-keys`, {
      method: 'POST',
    })
    if (typeof createdKey?.token !== 'string' || !createdKey.token)
      throw new Error('Dify did not return an app API key')

    this.appApiKey = createdKey.token
    return this.appApiKey
  }

  async getAppDetail() {
    if (this.appDetail)
      return this.appDetail

    await this.ensureSession()
    this.appDetail = await this._request(`/console/api/apps/${this.appId}`)
    return this.appDetail
  }
}

export class LocalDifyGateway {
  constructor() {
    this.consoleClient = null
  }

  _getConsoleClient(consoleConfig) {
    if (!this.consoleClient)
      this.consoleClient = new DifyConsoleDevClient(consoleConfig)
    return this.consoleClient
  }

  async _resolveServiceApiConfig() {
    const configured = requireDifyChatConfig()
    if (configured.ok) {
      return {
        ok: true,
        value: {
          ...configured.value,
          mode: 'service-api',
        },
      }
    }

    if (!config.difyDevUseConsole) {
      return {
        ok: false,
        status: 501,
        code: 'dify_not_configured',
        message: configured.error,
        details: {
          expected: 'DIFY_APP_API_KEY or local console bootstrap credentials',
        },
      }
    }

    const consoleConfig = requireDifyConsoleDevConfig()
    if (!consoleConfig.ok) {
      return {
        ok: false,
        status: 501,
        code: 'dify_console_dev_not_configured',
        message: consoleConfig.error,
      }
    }

    try {
      const apiKey = await this._getConsoleClient(consoleConfig.value).ensureAppApiKey()
      return {
        ok: true,
        value: {
          chatUrl: config.difyResolvedChatUrl,
          apiKey,
          mode: 'service-api-bootstrap',
        },
      }
    }
    catch (error) {
      return {
        ok: false,
        status: 502,
        code: 'dify_console_bootstrap_failed',
        message: error instanceof Error ? error.message : 'Dify app API key bootstrap failed',
      }
    }
  }

  async sendChat({ message, conversationId, userId, memoryContext = null }) {
    const serviceApiConfig = await this._resolveServiceApiConfig()
    if (!serviceApiConfig.ok)
      return serviceApiConfig

    const difyResult = await sendServiceApiChat({
      chatUrl: serviceApiConfig.value.chatUrl,
      apiKey: serviceApiConfig.value.apiKey,
      message,
      conversationId,
      userId,
      memoryContext,
      responseMode: 'streaming',
    })

    if (!difyResult.ok)
      return difyResult

    return {
      ...difyResult,
      mode: serviceApiConfig.value.mode,
    }
  }

  async streamChat({ message, conversationId, userId, memoryContext = null, onProgress = null, externalAbortSignal = null }) {
    const serviceApiConfig = await this._resolveServiceApiConfig()
    if (!serviceApiConfig.ok)
      return serviceApiConfig

    let difyResult = null
    for (let attempt = 1; attempt <= DEFAULT_STREAM_RETRY_ATTEMPTS; attempt += 1) {
      difyResult = await sendServiceApiChat({
        chatUrl: serviceApiConfig.value.chatUrl,
        apiKey: serviceApiConfig.value.apiKey,
        message,
        conversationId,
        userId,
        memoryContext,
        onProgress,
        responseMode: 'streaming',
        emitErrors: false,
        externalAbortSignal,
      })

      if (difyResult.ok || attempt >= DEFAULT_STREAM_RETRY_ATTEMPTS || !isRetryableDifyFailure(difyResult))
        break

      onProgress?.({
        type: 'status',
        payload: {
          message: 'The model connection was slow, so AskCrystal is trying once more...',
        },
      })
    }

    if (!difyResult.ok)
      return difyResult

    return {
      ...difyResult,
      mode: serviceApiConfig.value.mode,
    }
  }

  async stopChat({ taskId, userId }) {
    const serviceApiConfig = await this._resolveServiceApiConfig()
    if (!serviceApiConfig.ok)
      return serviceApiConfig

    const difyResult = await stopServiceApiChat({
      chatUrl: serviceApiConfig.value.chatUrl,
      apiKey: serviceApiConfig.value.apiKey,
      taskId,
      userId,
    })

    if (!difyResult.ok)
      return difyResult

    return {
      ...difyResult,
      mode: serviceApiConfig.value.mode,
    }
  }

  async getEmbedConfig({ userId, conversationId = null }) {
    const normalizedUserId = userId || 'shopify-guest'

    if (config.difySiteAccessToken) {
      const baseUrl = config.difySiteAppBaseUrl || config.difyBaseUrl
      return {
        ok: true,
        status: 200,
        data: {
          mode: 'site-token',
          accessToken: config.difySiteAccessToken,
          baseUrl,
          userId: normalizedUserId,
          conversationId,
          iframeUrl: buildEmbeddedChatUrl({
            baseUrl,
            accessToken: config.difySiteAccessToken,
            userId: normalizedUserId,
            conversationId,
          }),
        },
      }
    }

    const consoleConfig = requireDifyConsoleDevConfig()
    if (!consoleConfig.ok) {
      return {
        ok: false,
        status: 501,
        code: 'dify_embed_not_configured',
        message: consoleConfig.error,
      }
    }

    try {
      const appDetail = await this._getConsoleClient(consoleConfig.value).getAppDetail()
      const accessToken = appDetail?.site?.access_token
      const baseUrl = appDetail?.site?.app_base_url || config.difyBaseUrl

      if (typeof accessToken !== 'string' || !accessToken) {
        return {
          ok: false,
          status: 502,
          code: 'dify_embed_token_missing',
          message: 'Dify app site access token is missing',
          details: {
            appId: consoleConfig.value.appId,
          },
        }
      }

      return {
        ok: true,
        status: 200,
        data: {
          mode: 'console-site-bootstrap',
          accessToken,
          baseUrl,
          userId: normalizedUserId,
          conversationId,
          iframeUrl: buildEmbeddedChatUrl({
            baseUrl,
            accessToken,
            userId: normalizedUserId,
            conversationId,
          }),
        },
      }
    }
    catch (error) {
      return {
        ok: false,
        status: 502,
        code: 'dify_embed_bootstrap_failed',
        message: error instanceof Error ? error.message : 'Failed to load Dify embed config',
      }
    }
  }
}
