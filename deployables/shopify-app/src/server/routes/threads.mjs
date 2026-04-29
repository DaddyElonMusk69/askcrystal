import { resolveAskCrystalIdentity } from '../identity/identity-resolver.mjs'
import { identityStore } from '../persistence/postgres-identity-store.mjs'

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

const serializeMessage = message => ({
  id: message.id,
  role: message.role,
  text: message.contentText,
  components: message.components,
  suggestions: message.suggestions,
  createdAt: message.createdAt,
})

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
  const messages = thread
    ? await identityStore.getThreadMessages({ identity, threadId: thread.id })
    : []
  return {
    statusCode: 200,
    payload: {
      ok: true,
      persistenceEnabled: true,
      thread: thread ? serializeThread(thread) : null,
      messages: messages.map(serializeMessage),
    },
  }
}
