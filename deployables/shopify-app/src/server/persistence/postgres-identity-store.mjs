import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import pg from 'pg'

import { config } from '../config.mjs'

const { Pool } = pg

const localSecret = 'askcrystal-local-development-secret'
const shopifyCustomerProvider = 'shopify_customer'

const normalizeString = value => (typeof value === 'string' ? value.trim() : '')

const normalizeShopDomain = value => {
  const next = normalizeString(value).toLowerCase()
  return next || 'local-dev-shop'
}

const hashValue = value => crypto
  .createHmac('sha256', config.sessionSecret || localSecret)
  .update(String(value || ''))
  .digest('hex')

const createId = () => crypto.randomUUID()

const createGuestToken = () => `guest_${crypto.randomBytes(24).toString('base64url')}`

const createDifyUserKey = userId => `askcrystal_user_${String(userId).replace(/-/g, '')}`

const migrationPath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../../db/001_identity_bridge.sql',
)

const mapShop = row => row && ({
  id: row.id,
  shopDomain: row.shop_domain,
  shopifyShopId: row.shopify_shop_id,
})

const mapUser = row => row && ({
  id: row.id,
  shopId: row.shop_id,
  difyUserKey: row.dify_user_key,
  defaultLocale: row.default_locale,
  defaultTimezone: row.default_timezone,
})

const mapGuestSession = row => row && ({
  id: row.id,
  shopId: row.shop_id,
  userId: row.user_id,
  mergedIntoUserId: row.merged_into_user_id,
  mergedAt: row.merged_at,
})

const mapThread = row => row && ({
  id: row.id,
  shopId: row.shop_id,
  ownerUserId: row.owner_user_id,
  guestSessionId: row.guest_session_id,
  storefrontSessionId: row.storefront_session_id,
  title: row.title || 'New reading',
  difyUserKey: row.dify_user_key,
  difyConversationId: row.dify_conversation_id,
  status: row.status,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  lastActiveAt: row.last_active_at,
  lastMessagePreview: row.last_message_preview,
  lastSummarySnapshot: row.last_summary_snapshot,
})

const mapMessage = row => row && ({
  id: row.id,
  threadId: row.thread_id,
  role: row.role,
  contentText: row.content_text || '',
  components: row.components_json || [],
  suggestions: row.suggestions_json || [],
  difyMessageId: row.dify_message_id,
  difyTaskId: row.dify_task_id,
  metadata: row.metadata_json || {},
  createdAt: row.created_at,
})

const createFreeEntitlementSummary = () => ({
  tier: 'free',
  status: 'active',
  source: 'default',
  premiumReadingsRemaining: 0,
})

const buildThreadTitle = message => {
  const normalized = normalizeString(message).replace(/\s+/g, ' ')
  if (!normalized)
    return 'New reading'

  return normalized.length > 48 ? `${normalized.slice(0, 45)}...` : normalized
}

export class PostgresIdentityStore {
  constructor({ databaseUrl = config.memoryDatabaseUrl } = {}) {
    this.databaseUrl = databaseUrl
    this.pool = databaseUrl
      ? new Pool({
          connectionString: databaseUrl,
          ssl: config.memoryDatabaseSsl ? { rejectUnauthorized: false } : undefined,
        })
      : null
    this.readyPromise = null
  }

  get enabled() {
    return Boolean(this.pool)
  }

  async ensureReady() {
    if (!this.pool)
      return false

    if (!this.readyPromise) {
      this.readyPromise = fs
        .readFile(migrationPath, 'utf8')
        .then(sql => this.pool.query(sql))
    }

    await this.readyPromise
    return true
  }

  async query(sql, params = []) {
    await this.ensureReady()
    return this.pool.query(sql, params)
  }

  async resolveShop(shopDomain) {
    const normalizedShopDomain = normalizeShopDomain(shopDomain)
    const id = createId()
    const result = await this.query(
      `
        INSERT INTO askcrystal_shops (id, shop_domain, installed_at, created_at, updated_at)
        VALUES ($1, $2, now(), now(), now())
        ON CONFLICT (shop_domain)
        DO UPDATE SET updated_at = now()
        RETURNING *
      `,
      [id, normalizedShopDomain],
    )

    return mapShop(result.rows[0])
  }

  async createUser(shopId) {
    const id = createId()
    const difyUserKey = createDifyUserKey(id)
    const result = await this.query(
      `
        INSERT INTO askcrystal_users (
          id,
          shop_id,
          dify_user_key,
          created_at,
          updated_at,
          last_seen_at
        )
        VALUES ($1, $2, $3, now(), now(), now())
        RETURNING *
      `,
      [id, shopId, difyUserKey],
    )

    return mapUser(result.rows[0])
  }

  async getUser(userId) {
    if (!userId)
      return null

    const result = await this.query(
      `
        SELECT *
        FROM askcrystal_users
        WHERE id = $1
      `,
      [userId],
    )

    return mapUser(result.rows[0])
  }

  async touchUser(userId) {
    if (!userId)
      return null

    const result = await this.query(
      `
        UPDATE askcrystal_users
        SET last_seen_at = now(), updated_at = now()
        WHERE id = $1
        RETURNING *
      `,
      [userId],
    )

    return mapUser(result.rows[0])
  }

  async resolveGuestSession({ shopId, guestToken }) {
    const rawGuestToken = normalizeString(guestToken) || createGuestToken()
    const tokenHash = hashValue(rawGuestToken)
    const id = createId()
    const result = await this.query(
      `
        INSERT INTO askcrystal_guest_sessions (
          id,
          shop_id,
          guest_token_hash,
          first_seen_at,
          last_seen_at
        )
        VALUES ($1, $2, $3, now(), now())
        ON CONFLICT (shop_id, guest_token_hash)
        DO UPDATE SET last_seen_at = now()
        RETURNING *
      `,
      [id, shopId, tokenHash],
    )

    return {
      guestToken: rawGuestToken,
      guestSession: mapGuestSession(result.rows[0]),
    }
  }

  async resolveGuestUser(guestSession) {
    if (guestSession?.mergedIntoUserId)
      return this.touchUser(guestSession.mergedIntoUserId)

    if (guestSession?.userId)
      return this.touchUser(guestSession.userId)

    const user = await this.createUser(guestSession.shopId)
    await this.query(
      `
        UPDATE askcrystal_guest_sessions
        SET user_id = $1, last_seen_at = now()
        WHERE id = $2
      `,
      [user.id, guestSession.id],
    )

    return user
  }

  async findCustomerUser({ shopId, shopifyCustomerId }) {
    const result = await this.query(
      `
        SELECT u.*
        FROM askcrystal_user_identities i
        JOIN askcrystal_users u ON u.id = i.user_id
        WHERE i.shop_id = $1
          AND i.provider = $2
          AND i.provider_subject = $3
        LIMIT 1
      `,
      [shopId, shopifyCustomerProvider, shopifyCustomerId],
    )

    return mapUser(result.rows[0])
  }

  async linkCustomerIdentity({ shopId, userId, shopifyCustomerId }) {
    await this.query(
      `
        INSERT INTO askcrystal_user_identities (
          id,
          user_id,
          shop_id,
          provider,
          provider_subject,
          verified_at,
          created_at
        )
        VALUES ($1, $2, $3, $4, $5, now(), now())
        ON CONFLICT (shop_id, provider, provider_subject)
        DO UPDATE SET verified_at = now()
      `,
      [createId(), userId, shopId, shopifyCustomerProvider, shopifyCustomerId],
    )
  }

  async mergeGuestIntoUser({ shopId, guestSession, targetUser, strategy }) {
    if (!guestSession?.id || !targetUser?.id)
      return

    const sourceUserId = guestSession.userId || null
    await this.query(
      `
        UPDATE askcrystal_conversation_threads
        SET owner_user_id = $1, updated_at = now()
        WHERE shop_id = $2
          AND guest_session_id = $3
          AND (owner_user_id IS NULL OR owner_user_id <> $1)
      `,
      [targetUser.id, shopId, guestSession.id],
    )
    await this.query(
      `
        UPDATE askcrystal_guest_sessions
        SET merged_into_user_id = $1, merged_at = COALESCE(merged_at, now()), last_seen_at = now()
        WHERE id = $2
      `,
      [targetUser.id, guestSession.id],
    )
    await this.query(
      `
        INSERT INTO askcrystal_identity_merge_events (
          id,
          shop_id,
          guest_session_id,
          source_user_id,
          target_user_id,
          strategy,
          metadata_json,
          created_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, now())
      `,
      [
        createId(),
        shopId,
        guestSession.id,
        sourceUserId,
        targetUser.id,
        strategy,
        JSON.stringify({ preservedThreadDifyUserKeys: true }),
      ],
    )
  }

  async resolveCustomerUser({ shopId, shopifyCustomerId, guestSession = null }) {
    const existingUser = await this.findCustomerUser({ shopId, shopifyCustomerId })
    if (existingUser) {
      const touchedUser = await this.touchUser(existingUser.id)
      if (guestSession?.id && guestSession.userId !== touchedUser.id) {
        await this.mergeGuestIntoUser({
          shopId,
          guestSession,
          targetUser: touchedUser,
          strategy: 'signed_shopify_customer_login',
        })
      }
      return touchedUser
    }

    let targetUser = null
    const guestTargetUserId = guestSession?.mergedIntoUserId || guestSession?.userId
    if (guestTargetUserId)
      targetUser = await this.touchUser(guestTargetUserId)

    if (!targetUser)
      targetUser = await this.createUser(shopId)

    await this.linkCustomerIdentity({
      shopId,
      userId: targetUser.id,
      shopifyCustomerId,
    })

    if (guestSession?.id) {
      await this.mergeGuestIntoUser({
        shopId,
        guestSession,
        targetUser,
        strategy: 'promote_guest_to_shopify_customer',
      })
    }

    return targetUser
  }

  async getEntitlementSummary(userId) {
    if (!userId)
      return createFreeEntitlementSummary()

    const result = await this.query(
      `
        SELECT *
        FROM askcrystal_entitlements
        WHERE user_id = $1
          AND status = 'active'
          AND (starts_at IS NULL OR starts_at <= now())
          AND (ends_at IS NULL OR ends_at > now())
        ORDER BY updated_at DESC
        LIMIT 1
      `,
      [userId],
    )

    const entitlement = result.rows[0]
    if (!entitlement)
      return createFreeEntitlementSummary()

    return {
      tier: entitlement.tier || 'free',
      status: entitlement.status || 'active',
      source: entitlement.source || 'unknown',
      premiumReadingsRemaining: 0,
    }
  }

  async resolveIdentity({ shopDomain, shopifyCustomerId = '', guestToken = '' }) {
    const shop = await this.resolveShop(shopDomain)
    const { guestToken: resolvedGuestToken, guestSession } = await this.resolveGuestSession({
      shopId: shop.id,
      guestToken,
    })
    const normalizedCustomerId = normalizeString(shopifyCustomerId)
    const user = normalizedCustomerId
      ? await this.resolveCustomerUser({
          shopId: shop.id,
          shopifyCustomerId: normalizedCustomerId,
          guestSession,
        })
      : await this.resolveGuestUser(guestSession)

    return {
      persistenceEnabled: true,
      mode: normalizedCustomerId ? 'customer' : 'guest',
      shop,
      user,
      guestSession,
      guestToken: resolvedGuestToken,
      shopifyCustomerId: normalizedCustomerId || null,
      entitlements: await this.getEntitlementSummary(user.id),
    }
  }

  async getThreadById({ identity, threadId }) {
    if (!threadId)
      return null

    const result = await this.query(
      `
        SELECT *
        FROM askcrystal_conversation_threads
        WHERE id = $1
          AND shop_id = $2
          AND (
            owner_user_id = $3
            OR ($4::uuid IS NOT NULL AND guest_session_id = $4)
          )
        LIMIT 1
      `,
      [
        threadId,
        identity.shop.id,
        identity.user.id,
        identity.guestSession?.id || null,
      ],
    )

    return mapThread(result.rows[0])
  }

  async findThreadByStorefrontSession({ identity, storefrontSessionId }) {
    if (!storefrontSessionId)
      return null

    const result = await this.query(
      `
        SELECT *
        FROM askcrystal_conversation_threads
        WHERE shop_id = $1
          AND storefront_session_id = $2
          AND (
            owner_user_id = $3
            OR ($4::uuid IS NOT NULL AND guest_session_id = $4)
          )
        ORDER BY updated_at DESC
        LIMIT 1
      `,
      [
        identity.shop.id,
        storefrontSessionId,
        identity.user.id,
        identity.guestSession?.id || null,
      ],
    )

    return mapThread(result.rows[0])
  }

  async findThreadByDifyConversation({ identity, difyConversationId }) {
    if (!difyConversationId)
      return null

    const result = await this.query(
      `
        SELECT *
        FROM askcrystal_conversation_threads
        WHERE shop_id = $1
          AND dify_conversation_id = $2
          AND (
            owner_user_id = $3
            OR ($4::uuid IS NOT NULL AND guest_session_id = $4)
          )
        ORDER BY updated_at DESC
        LIMIT 1
      `,
      [
        identity.shop.id,
        difyConversationId,
        identity.user.id,
        identity.guestSession?.id || null,
      ],
    )

    return mapThread(result.rows[0])
  }

  async createThread({
    identity,
    storefrontSessionId = '',
    title = '',
    initialMessage = '',
    initialDifyConversationId = '',
    initialDifyUserKey = '',
  }) {
    const id = createId()
    const result = await this.query(
      `
        INSERT INTO askcrystal_conversation_threads (
          id,
          shop_id,
          owner_user_id,
          guest_session_id,
          storefront_session_id,
          title,
          dify_user_key,
          dify_conversation_id,
          status,
          created_at,
          updated_at,
          last_active_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'active', now(), now(), now())
        RETURNING *
      `,
      [
        id,
        identity.shop.id,
        identity.user.id,
        identity.guestSession?.id || null,
        normalizeString(storefrontSessionId) || null,
        normalizeString(title) || buildThreadTitle(initialMessage),
        normalizeString(initialDifyUserKey) || identity.user.difyUserKey,
        normalizeString(initialDifyConversationId) || null,
      ],
    )

    return mapThread(result.rows[0])
  }

  async findOrCreateThread({
    identity,
    threadId = '',
    storefrontSessionId = '',
    initialMessage = '',
    initialDifyConversationId = '',
    legacyDifyUserKey = '',
  }) {
    const byId = await this.getThreadById({ identity, threadId })
    if (byId)
      return byId

    const byStorefrontSession = await this.findThreadByStorefrontSession({
      identity,
      storefrontSessionId,
    })
    if (byStorefrontSession)
      return byStorefrontSession

    const byDifyConversation = await this.findThreadByDifyConversation({
      identity,
      difyConversationId: initialDifyConversationId,
    })
    if (byDifyConversation)
      return byDifyConversation

    return this.createThread({
      identity,
      storefrontSessionId,
      initialMessage,
      initialDifyConversationId,
      initialDifyUserKey: initialDifyConversationId ? legacyDifyUserKey : '',
    })
  }

  async updateThreadAfterDify({ threadId, difyConversationId = '', lastMessagePreview = '' }) {
    if (!threadId)
      return null

    const result = await this.query(
      `
        UPDATE askcrystal_conversation_threads
        SET
          dify_conversation_id = COALESCE($2, dify_conversation_id),
          last_message_preview = COALESCE($3, last_message_preview),
          last_active_at = now(),
          updated_at = now()
        WHERE id = $1
        RETURNING *
      `,
      [
        threadId,
        normalizeString(difyConversationId) || null,
        normalizeString(lastMessagePreview).slice(0, 240) || null,
      ],
    )

    return mapThread(result.rows[0])
  }

  async listThreads({ identity, limit = 30 }) {
    const result = await this.query(
      `
        SELECT *
        FROM askcrystal_conversation_threads
        WHERE shop_id = $1
          AND status = 'active'
          AND (
            owner_user_id = $2
            OR ($3::uuid IS NOT NULL AND guest_session_id = $3)
          )
        ORDER BY updated_at DESC
        LIMIT $4
      `,
      [
        identity.shop.id,
        identity.user.id,
        identity.guestSession?.id || null,
        Math.max(1, Math.min(Number(limit) || 30, 100)),
      ],
    )

    return result.rows.map(mapThread)
  }

  async getThreadMessages({ identity, threadId, limit = 80 }) {
    const thread = await this.getThreadById({ identity, threadId })
    if (!thread)
      return []

    const result = await this.query(
      `
        SELECT *
        FROM askcrystal_chat_messages
        WHERE thread_id = $1
        ORDER BY created_at ASC
        LIMIT $2
      `,
      [thread.id, Math.max(1, Math.min(Number(limit) || 80, 200))],
    )

    return result.rows.map(mapMessage)
  }

  async insertMessage({
    threadId,
    role,
    contentText = '',
    components = [],
    suggestions = [],
    difyMessageId = '',
    difyTaskId = '',
    metadata = {},
  }) {
    if (!threadId || !role)
      return null

    const result = await this.query(
      `
        INSERT INTO askcrystal_chat_messages (
          id,
          thread_id,
          role,
          content_text,
          components_json,
          suggestions_json,
          dify_message_id,
          dify_task_id,
          metadata_json,
          created_at
        )
        VALUES ($1, $2, $3, $4, $5::jsonb, $6::jsonb, $7, $8, $9::jsonb, now())
        RETURNING *
      `,
      [
        createId(),
        threadId,
        role,
        normalizeString(contentText) || null,
        JSON.stringify(Array.isArray(components) ? components : []),
        JSON.stringify(Array.isArray(suggestions) ? suggestions : []),
        normalizeString(difyMessageId) || null,
        normalizeString(difyTaskId) || null,
        JSON.stringify(metadata && typeof metadata === 'object' ? metadata : {}),
      ],
    )

    return mapMessage(result.rows[0])
  }
}

export const identityStore = new PostgresIdentityStore()
