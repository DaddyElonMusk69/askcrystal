import { resolveAskCrystalIdentity } from '../identity/identity-resolver.mjs'
import { identityStore } from '../persistence/postgres-identity-store.mjs'

const serializeThread = thread => ({
  id: thread.id,
  title: thread.title || 'New reading',
  updatedAt: thread.updatedAt,
  lastActiveAt: thread.lastActiveAt,
  lastMessagePreview: thread.lastMessagePreview || '',
  storefrontSessionId: thread.storefrontSessionId || null,
  hasDifyConversation: Boolean(thread.difyConversationId),
})

export const handleIdentityBootstrap = async (req) => {
  const identity = await resolveAskCrystalIdentity(req)
  const threads = identity.persistenceEnabled
    ? await identityStore.listThreads({ identity })
    : []

  return {
    statusCode: 200,
    payload: {
      ok: true,
      persistenceEnabled: identity.persistenceEnabled,
      identity: {
        mode: identity.mode,
        shopDomain: identity.shop?.shopDomain || identity.shop?.id || null,
        userId: identity.user?.id || null,
        guestSessionId: identity.guestSession?.id || null,
        guestToken: identity.guestToken || null,
        customerLinked: identity.mode === 'customer',
      },
      threads: threads.map(serializeThread),
      activeThreadId: threads[0]?.id || null,
      entitlements: identity.entitlements,
    },
  }
}
