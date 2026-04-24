import { LocalDifyGateway } from '../dify/local-dify-gateway.mjs'
import { sseEvent, sseStart } from '../utils/http.mjs'

const gateway = new LocalDifyGateway()
const activeStreamControllers = new Map()

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

const isTimeoutLikeFailure = result => {
  const message = String(result?.message || result?.details?.message || '').toLowerCase()
  return (
    message.includes('timeout')
    || message.includes('timed out')
    || message.includes('aborted')
    || message.includes('connection error')
    || message.includes('connection reset')
    || message.includes('server unavailable')
    || message.includes('max retries')
    || message.includes('ssl')
    || message.includes('eof')
  )
}

const buildTimeoutFallbackAnswer = message => {
  const normalizedMessage = String(message || '').toLowerCase()

  if (/sleep|calm|anxious|anxiety|rest|overthink/.test(normalizedMessage)) {
    return [
      'The live reading model is taking longer than expected, so I will give you a simple grounding recommendation instead of leaving you waiting.',
      'For calm and sleep tonight, start with amethyst. Keep it near your bedside, place one hand on your chest, and take three slow breaths before setting the intention: “I let the day soften, and I allow rest to come easily.”',
      'If you want a more personal match, send one more detail: is this mostly anxiety, overthinking, emotional heaviness, or restless energy?',
    ].join('\n\n')
  }

  return [
    'The live reading model is taking longer than expected, so I will give you a simple grounding recommendation instead of leaving you waiting.',
    'Start with clear quartz if you want a flexible everyday stone, or black tourmaline if the main need is protection and grounding.',
    'If you share the situation you are shopping for, I can narrow the recommendation once the live guide is responsive again.',
  ].join('\n\n')
}

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
    userId: body?.customer?.id || body?.sessionId || 'shopify-guest',
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
    userId: body?.customer?.id || body?.sessionId || 'shopify-guest',
  }
}

export const handleChat = async (body) => {
  const validation = validateChatBody(body)
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

  return {
    statusCode: 200,
    payload: {
      ok: true,
      mode: difyResult.mode || 'dify-live',
      conversationId: difyResult.data.conversationId,
      answer: difyResult.data.answer,
      references: difyResult.data.references,
      metadata: difyResult.data.metadata,
      products: [],
    },
  }
}

export const handleChatStop = async (body) => {
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

  const localStopped = stopActiveStream({
    taskId: validation.taskId,
    userId: validation.userId,
  })

  const difyResult = await gateway.stopChat({
    taskId: validation.taskId,
    userId: validation.userId,
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
  const validation = validateChatBody(body)
  if (!validation.ok) {
    return {
      statusCode: validation.statusCode,
      payload: {
        ok: false,
        error: validation.error,
      },
    }
  }

  sseStart(res)
  sseEvent(res, 'status', {
    stage: 'listen',
    tool: null,
    message: 'Tuning in...',
  })

  const clientAbortController = new AbortController()
  const abortUpstream = () => clientAbortController.abort()
  req?.on?.('close', abortUpstream)
  res?.on?.('close', abortUpstream)
  let activeTaskId = ''

  const difyResult = await gateway.streamChat({
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

      if (clientAbortController.signal.aborted || res.writableEnded || res.destroyed)
        return

      sseEvent(res, type, payload)
    },
  })

  req?.off?.('close', abortUpstream)
  res?.off?.('close', abortUpstream)
  clearActiveStream({
    taskId: activeTaskId,
    controller: clientAbortController,
  })

  if (clientAbortController.signal.aborted) {
    if (!res.writableEnded)
      res.end()
    return
  }

  if (!difyResult.ok) {
    if (isTimeoutLikeFailure(difyResult)) {
      sseEvent(res, 'complete', {
        answer: buildTimeoutFallbackAnswer(validation.message),
        conversationId: validation.conversationId,
        metadata: {
          fallback: 'dify-timeout',
          upstreamError: difyResult.message,
        },
        references: [],
      })
      res.end()
      return
    }

    sseEvent(res, 'error', {
      ok: false,
      error: difyResult.message,
      code: difyResult.code,
      details: difyResult.details || null,
    })
    res.end()
    return
  }

  res.end()
}
