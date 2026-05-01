import { LocalDifyGateway } from '../dify/local-dify-gateway.mjs'
import {
  getDifyUserIdForIdentity,
  getDifyUserIdForThread,
  resolveAskCrystalIdentity,
  resolveAskCrystalThread,
} from '../identity/identity-resolver.mjs'
import { identityStore } from '../persistence/postgres-identity-store.mjs'
import { sseEvent, sseStart } from '../utils/http.mjs'

const gateway = new LocalDifyGateway()
const activeStreamControllers = new Map()
const STATUS_HEARTBEAT_INTERVAL_MS = 7000

const normalizeString = value => (typeof value === 'string' ? value.trim() : '')

const getPayloadTaskId = payload => {
  const taskId = payload?.taskId || payload?.task_id || payload?.data?.taskId || payload?.data?.task_id
  return typeof taskId === 'string' ? taskId : ''
}

const registerActiveStream = ({ taskId, userId, controller, res }) => {
  if (!taskId || !userId || !controller || !res)
    return

  activeStreamControllers.set(taskId, {
    userId,
    controller,
    res,
  })
}

const clearActiveStream = ({ taskId, controller }) => {
  if (!taskId)
    return

  const currentEntry = activeStreamControllers.get(taskId)
  if (!currentEntry)
    return

  if (!controller || currentEntry.controller === controller)
    activeStreamControllers.delete(taskId)
}

const stopActiveStream = ({ taskId, userId }) => {
  const currentEntry = activeStreamControllers.get(taskId)
  if (!currentEntry || currentEntry.userId !== userId)
    return false

  currentEntry.controller.abort()
  if (!currentEntry.res.destroyed) {
    currentEntry.res.end()
    currentEntry.res.destroy()
  }
  activeStreamControllers.delete(taskId)
  return true
}

const getPayloadMessageId = payload => (
  payload?.messageId
  || payload?.message_id
  || payload?.data?.messageId
  || payload?.data?.message_id
  || ''
)

const getPreviewText = text => normalizeString(text).replace(/\s+/g, ' ').slice(0, 240)

const validateChatBody = (body) => {
  if (!body?.message || typeof body.message !== 'string') {
    return {
      ok: false,
      statusCode: 400,
      error: 'message is required',
    }
  }

  return {
    ok: true,
    memoryContext: body?.memoryContext || null,
    message: body.message,
    conversationId: body.conversationId || null,
  }
}

const validateChatStopBody = (body) => {
  if (!body?.taskId || typeof body.taskId !== 'string') {
    return {
      ok: false,
      statusCode: 400,
      error: 'taskId is required',
    }
  }

  return {
    ok: true,
    taskId: body.taskId,
  }
}

const resolveChatExecution = async (body, req) => {
  const validation = validateChatBody(body)
  if (!validation.ok)
    return validation

  const identity = await resolveAskCrystalIdentity(req, body)
  const thread = await resolveAskCrystalThread({
    identity,
    body,
    initialMessage: validation.message,
  })

  return {
    ...validation,
    identity,
    thread,
    userId: getDifyUserIdForThread({ identity, thread }),
    conversationId: thread?.difyConversationId || validation.conversationId || null,
  }
}

const resolveAuxiliaryChatUser = async (body, req) => {
  const identity = await resolveAskCrystalIdentity(req, body)
  const thread = await resolveAskCrystalThread({
    identity,
    body,
  })

  return {
    identity,
    thread,
    userId: getDifyUserIdForThread({ identity, thread }) || getDifyUserIdForIdentity(identity),
  }
}

const persistChatTurn = async ({
  thread,
  userMessage,
  assistantAnswer,
  components = [],
  suggestions = [],
  metadata = {},
  conversationId = '',
  messageId = '',
  taskId = '',
}) => {
  if (!thread?.id || !identityStore.enabled)
    return

  try {
    await identityStore.insertMessage({
      threadId: thread.id,
      role: 'user',
      contentText: userMessage,
      metadata: {
        source: 'storefront_chat',
      },
    })
    await identityStore.insertMessage({
      threadId: thread.id,
      role: 'assistant',
      contentText: assistantAnswer,
      components,
      suggestions,
      difyMessageId: messageId,
      difyTaskId: taskId,
      metadata,
    })
    await identityStore.updateThreadAfterDify({
      threadId: thread.id,
      difyConversationId: conversationId,
      lastMessagePreview: getPreviewText(assistantAnswer),
    })
  }
  catch (error) {
    console.error('[AskCrystal] Failed to persist chat turn.', error)
  }
}

export const handleChatParameters = async (_req) => {
  const difyResult = await gateway.getChatParameters()

  if (!difyResult.ok) {
    return {
      statusCode: difyResult.status,
      payload: {
        ok: false,
        error: difyResult.message,
        code: difyResult.code,
        details: difyResult.details || null,
      },
    }
  }

  return {
    statusCode: 200,
    payload: {
      ok: true,
      ...difyResult.data,
    },
  }
}

export const handleChat = async (body, req = null) => {
  const validation = await resolveChatExecution(body, req)
  if (!validation.ok) {
    return {
      statusCode: validation.statusCode,
      payload: {
        ok: false,
        error: validation.error,
      },
    }
  }

  const difyResult = await gateway.sendChat({
    message: validation.message,
    conversationId: validation.conversationId,
    userId: validation.userId,
    memoryContext: validation.memoryContext,
  })

  if (!difyResult.ok) {
    return {
      statusCode: difyResult.status,
      payload: {
        ok: false,
        error: difyResult.message,
        code: difyResult.code,
        details: difyResult.details || null,
        nextSteps: [
          'Set DIFY_APP_CHAT_URL to the Dify app chat endpoint.',
          'Set DIFY_APP_API_KEY to the published app API key.',
          'Pass memory context from the backend once persistence is wired.',
        ],
      },
    }
  }

  await persistChatTurn({
    thread: validation.thread,
    userMessage: validation.message,
    assistantAnswer: difyResult.data.answer,
    components: difyResult.data.components || [],
    suggestions: difyResult.data.suggestions || [],
    metadata: difyResult.data.metadata || {},
    conversationId: difyResult.data.conversationId || validation.conversationId || '',
    messageId: difyResult.data.messageId || '',
  })

  return {
    statusCode: 200,
    payload: {
      ok: true,
      mode: difyResult.mode || 'dify-live',
      conversationId: difyResult.data.conversationId,
      messageId: difyResult.data.messageId || null,
      answer: difyResult.data.answer,
      references: difyResult.data.references,
      metadata: difyResult.data.metadata,
      components: difyResult.data.components || [],
      suggestions: difyResult.data.suggestions || [],
      products: [],
    },
  }
}

export const handleChatStop = async (body, req = null) => {
  const validation = validateChatStopBody(body)
  if (!validation.ok) {
    return {
      statusCode: validation.statusCode,
      payload: {
        ok: false,
        error: validation.error,
      },
    }
  }
  const execution = await resolveAuxiliaryChatUser(body, req)

  const localStopped = stopActiveStream({
    taskId: validation.taskId,
    userId: execution.userId,
  })

  const difyResult = await gateway.stopChat({
    taskId: validation.taskId,
    userId: execution.userId,
  })

  if (!difyResult.ok && !localStopped) {
    return {
      statusCode: difyResult.status,
      payload: {
        ok: false,
        error: difyResult.message,
        code: difyResult.code,
        details: difyResult.details || null,
      },
    }
  }

  return {
    statusCode: 200,
    payload: {
      ok: true,
      mode: difyResult.mode || (localStopped ? 'local-proxy-stop' : 'dify-live'),
      stopped: true,
      localStopped,
      upstreamStop: difyResult.ok,
      taskId: validation.taskId,
    },
  }
}

export const handleChatStream = async (body, res, req = null) => {
  const validation = await resolveChatExecution(body, req)
  if (!validation.ok) {
    return {
      statusCode: validation.statusCode,
      payload: {
        ok: false,
        error: validation.error,
      },
    }
  }

  const streamStartedAt = Date.now()
  let latestStatusPayload = {
    stage: 'listen',
    tool: null,
    message: 'Settling into your energy...',
  }
  const enrichStatusPayload = (payload, { heartbeat = false } = {}) => ({
    ...(payload || {}),
    heartbeat,
    elapsedMs: Date.now() - streamStartedAt,
  })

  const clientAbortController = new AbortController()
  let clientConnected = true
  const canWriteToClient = () => clientConnected && !res.writableEnded && !res.destroyed
  const emitStatusEvent = (payload, options) => {
    if (clientAbortController.signal.aborted)
      return false

    latestStatusPayload = {
      ...latestStatusPayload,
      ...(payload || {}),
    }
    if (!canWriteToClient())
      return false

    return sseEvent(res, 'status', enrichStatusPayload(latestStatusPayload, options))
  }

  let streamClosed = false
  const detachClientStream = () => {
    if (streamClosed)
      return

    clientConnected = false
  }
  req?.on?.('aborted', detachClientStream)
  req?.on?.('error', detachClientStream)
  res.on?.('close', () => {
    if (!res.writableEnded)
      detachClientStream()
  })
  res.on?.('error', detachClientStream)

  if (!sseStart(res))
    return

  emitStatusEvent(latestStatusPayload)

  let statusHeartbeatHandle = setInterval(() => {
    if (clientAbortController.signal.aborted || !canWriteToClient()) {
      clearInterval(statusHeartbeatHandle)
      statusHeartbeatHandle = null
      return
    }

    emitStatusEvent({
      stage: latestStatusPayload.stage || 'listen',
      tool: latestStatusPayload.tool || null,
      message: latestStatusPayload.message || 'Still preparing your reading...',
    }, { heartbeat: true })
  }, STATUS_HEARTBEAT_INTERVAL_MS)
  const clearStatusHeartbeat = () => {
    if (!statusHeartbeatHandle)
      return

    clearInterval(statusHeartbeatHandle)
    statusHeartbeatHandle = null
  }
  let activeTaskId = ''
  let streamedAnswer = ''
  let streamedSuggestions = []
  let sawVisibleStream = false
  let latestConversationId = validation.conversationId
  let latestMetadata = null

  let difyResult
  try {
    difyResult = await gateway.streamChat({
      message: validation.message,
      conversationId: validation.conversationId,
      userId: validation.userId,
      memoryContext: validation.memoryContext,
      externalAbortSignal: clientAbortController.signal,
      onProgress: ({ type, payload }) => {
        const nextTaskId = getPayloadTaskId(payload)
        if (nextTaskId && nextTaskId !== activeTaskId) {
          clearActiveStream({
            taskId: activeTaskId,
            controller: clientAbortController,
          })
          activeTaskId = nextTaskId
          registerActiveStream({
            taskId: activeTaskId,
            userId: validation.userId,
            controller: clientAbortController,
            res,
          })
        }

        if (clientAbortController.signal.aborted)
          return

        if (payload?.conversationId || payload?.conversation_id)
          latestConversationId = payload.conversationId || payload.conversation_id

        if (type === 'delta' || type === 'message' || type === 'agent_message') {
          const deltaText = payload?.answer || payload?.text || ''
          if (typeof deltaText === 'string' && deltaText) {
            streamedAnswer += deltaText
            sawVisibleStream = true
          }
        }

        if (type === 'replace') {
          const replacementText = payload?.answer || payload?.text || ''
          if (typeof replacementText === 'string') {
            streamedAnswer = replacementText
            sawVisibleStream = Boolean(replacementText)
          }
        }

        if (type === 'suggestions') {
          const nextSuggestions = Array.isArray(payload?.suggestions) ? payload.suggestions : []
          if (nextSuggestions.length > 0)
            streamedSuggestions = nextSuggestions
        }

        if (type === 'complete' && payload && typeof payload === 'object')
          latestMetadata = payload.metadata || latestMetadata

        if (type === 'status') {
          emitStatusEvent(payload)
          return
        }

        if (!canWriteToClient())
          return

        sseEvent(res, type, payload)
      },
    })
  }
  finally {
    streamClosed = true
    clearStatusHeartbeat()
    clearActiveStream({
      taskId: activeTaskId,
      controller: clientAbortController,
    })
  }

  if (clientAbortController.signal.aborted) {
    if (canWriteToClient())
      res.end()
    return
  }

  if (!difyResult.ok) {
    if (sawVisibleStream) {
      const partialMetadata = {
        ...(latestMetadata || {}),
        fallback: 'partial-upstream-failure',
        partial: true,
        upstreamError: difyResult.message,
        upstreamCode: difyResult.code || null,
      }

      await persistChatTurn({
        thread: validation.thread,
        userMessage: validation.message,
        assistantAnswer: streamedAnswer,
        components: [],
        suggestions: [],
        metadata: partialMetadata,
        conversationId: latestConversationId || validation.conversationId || '',
        taskId: activeTaskId,
      })

      if (canWriteToClient()) {
        sseEvent(res, 'complete', {
          answer: streamedAnswer,
          conversationId: latestConversationId,
          metadata: partialMetadata,
          references: [],
          components: [],
          suggestions: [],
        })
        res.end()
      }
      return
    }

    if (canWriteToClient()) {
      sseEvent(res, 'error', {
        ok: false,
        error: difyResult.message,
        code: difyResult.code,
        details: difyResult.details || null,
      })
      res.end()
    }
    return
  }

  await persistChatTurn({
    thread: validation.thread,
    userMessage: validation.message,
    assistantAnswer: difyResult.data?.answer || streamedAnswer,
    components: difyResult.data?.components || [],
    suggestions: streamedSuggestions.length ? streamedSuggestions : difyResult.data?.suggestions || [],
    metadata: difyResult.data?.metadata || latestMetadata || {},
    conversationId: difyResult.data?.conversationId || latestConversationId || validation.conversationId || '',
    messageId: getPayloadMessageId(difyResult.data) || '',
    taskId: activeTaskId,
  })

  if (canWriteToClient())
    res.end()
}
