import { LocalDifyGateway } from '../dify/local-dify-gateway.mjs'
import { getDifyUserIdForThread, resolveAskCrystalIdentity } from '../identity/identity-resolver.mjs'
import { identityStore } from '../persistence/postgres-identity-store.mjs'

const gateway = new LocalDifyGateway()

const serializeThread = thread => ({
  id: thread.id,
  title: thread.title || 'New reading',
  updatedAt: thread.updatedAt,
  lastActiveAt: thread.lastActiveAt,
  lastMessagePreview: thread.lastMessagePreview || '',
  storefrontSessionId: thread.storefrontSessionId || null,
  conversationId: thread.difyConversationId || null,
  hasDifyConversation: Boolean(thread.difyConversationId),
})

const serializeDifyBackedMessage = message => ({
  id: message.id,
  role: message.role,
  text: message.contentText || '',
  components: Array.isArray(message.components) ? message.components : [],
  suggestions: Array.isArray(message.suggestions) ? message.suggestions : [],
  createdAt: message.createdAt,
})

const serializeMessage = message => ({
  id: message.id,
  role: message.role,
  text: message.contentText,
  components: message.components,
  suggestions: message.suggestions,
  createdAt: message.createdAt,
})

const mergeDifyMessagesWithLocalHints = (difyMessages = [], localMessages = []) => {
  const localAssistantMessages = localMessages.filter(message => message?.role === 'assistant')
  const localByDifyMessageId = new Map()

  for (const message of localAssistantMessages) {
    if (message.difyMessageId)
      localByDifyMessageId.set(message.difyMessageId, message)
  }

  let assistantIndex = 0
  return difyMessages.map((message) => {
    if (message?.role !== 'assistant')
      return message

    const localMatch = (
      localByDifyMessageId.get(message.difyMessageId)
      || localAssistantMessages[assistantIndex]
      || null
    )
    assistantIndex += 1

    if (!localMatch)
      return message

    return {
      ...message,
      suggestions: Array.isArray(message.suggestions) && message.suggestions.length
        ? message.suggestions
        : localMatch.suggestions || [],
      components: Array.isArray(message.components) && message.components.length
        ? message.components
        : localMatch.components || [],
    }
  })
}

export const handleThreadsList = async (req) => {
  const identity = await resolveAskCrystalIdentity(req)
  if (!identity.persistenceEnabled) {
    return {
      statusCode: 200,
      payload: {
        ok: true,
        persistenceEnabled: false,
        threads: [],
      },
    }
  }

  const threads = await identityStore.listThreads({ identity })
  return {
    statusCode: 200,
    payload: {
      ok: true,
      persistenceEnabled: true,
      threads: threads.map(serializeThread),
    },
  }
}

export const handleThreadsCreate = async (req, body) => {
  const identity = await resolveAskCrystalIdentity(req, body)
  if (!identity.persistenceEnabled) {
    return {
      statusCode: 503,
      payload: {
        ok: false,
        error: 'AskCrystal persistence is not configured.',
      },
    }
  }

  const thread = await identityStore.createThread({
    identity,
    storefrontSessionId: body?.storefrontSessionId || '',
    title: body?.title || 'New reading',
  })

  return {
    statusCode: 200,
    payload: {
      ok: true,
      thread: serializeThread(thread),
    },
  }
}

export const handleThreadMessages = async (req) => {
  const identity = await resolveAskCrystalIdentity(req)
  if (!identity.persistenceEnabled) {
    return {
      statusCode: 200,
      payload: {
        ok: true,
        persistenceEnabled: false,
        messages: [],
      },
    }
  }

  const url = new URL(req.url, 'http://localhost')
  const threadId = url.searchParams.get('threadId') || ''
  const storefrontSessionId = url.searchParams.get('storefrontSessionId') || ''
  if (!threadId && !storefrontSessionId) {
    return {
      statusCode: 400,
      payload: {
        ok: false,
        error: 'threadId or storefrontSessionId is required',
      },
    }
  }

  const thread = threadId
    ? await identityStore.getThreadById({ identity, threadId })
    : await identityStore.findThreadByStorefrontSession({ identity, storefrontSessionId })
  const localMessages = thread
    ? await identityStore.getThreadMessages({ identity, threadId: thread.id })
    : []

  if (thread?.difyConversationId) {
    const difyResult = await gateway.getConversationMessages({
      conversationId: thread.difyConversationId,
      userId: getDifyUserIdForThread({ identity, thread }),
      limit: 80,
    })

    if (difyResult.ok && Array.isArray(difyResult.data?.messages) && difyResult.data.messages.length > 0) {
      return {
        statusCode: 200,
        payload: {
          ok: true,
          persistenceEnabled: true,
          historySource: 'dify',
          thread: serializeThread(thread),
          messages: mergeDifyMessagesWithLocalHints(difyResult.data.messages, localMessages)
            .map(serializeDifyBackedMessage),
        },
      }
    }

    if (!difyResult.ok) {
      console.warn('[AskCrystal] Dify history recovery failed; falling back to local thread messages.', {
        conversationId: thread.difyConversationId,
        code: difyResult.code,
        status: difyResult.status,
        message: difyResult.message,
      })
    }
  }

  return {
    statusCode: 200,
    payload: {
      ok: true,
      persistenceEnabled: true,
      historySource: thread?.difyConversationId ? 'local-fallback' : 'local',
      thread: thread ? serializeThread(thread) : null,
      messages: localMessages.map(serializeMessage),
    },
  }
}
