import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { APP_PROXY_PREFIX } from './contracts.mjs'

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const repoRoot = path.resolve(appRoot, '../..')

const loadEnvFile = (filename) => {
  const filePath = path.isAbsolute(filename) ? filename : path.join(appRoot, filename)
  if (!fs.existsSync(filePath))
    return

  const source = fs.readFileSync(filePath, 'utf8')
  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#'))
      continue

    const separatorIndex = line.indexOf('=')
    if (separatorIndex === -1)
      continue

    const key = line.slice(0, separatorIndex).trim()
    if (!key || process.env[key] !== undefined)
      continue

    let value = line.slice(separatorIndex + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"'))
      || (value.startsWith('\'') && value.endsWith('\''))
    ) {
      value = value.slice(1, -1)
    }

    process.env[key] = value
  }
}

loadEnvFile(path.join(repoRoot, '.env'))
loadEnvFile(path.join(repoRoot, '.env.local'))
loadEnvFile('.env')
loadEnvFile('.env.local')

const asBoolean = (value, fallback = false) => {
  if (value === undefined || value === null || value === '')
    return fallback
  return ['1', 'true', 'yes', 'on'].includes(String(value).toLowerCase())
}

const asRequired = (value, key) => {
  if (!value)
    return { ok: false, error: `${key} is not configured` }
  return { ok: true, value }
}

const resolveUrl = (baseUrl, pathname) => new URL(pathname, `${baseUrl.replace(/\/$/, '')}/`).toString()

const asPositiveNumber = (value) => {
  const number = Number(value)
  return Number.isFinite(number) && number > 0 ? number : null
}

const resolveDifyRequestTimeoutMs = () => {
  const explicitTimeoutMs = asPositiveNumber(process.env.DIFY_REQUEST_TIMEOUT_MS)
  if (explicitTimeoutMs)
    return explicitTimeoutMs

  const appExecutionSeconds = asPositiveNumber(process.env.APP_MAX_EXECUTION_TIME)
  if (appExecutionSeconds)
    return appExecutionSeconds * 1000

  const workflowExecutionSeconds = asPositiveNumber(process.env.WORKFLOW_MAX_EXECUTION_TIME)
  if (workflowExecutionSeconds)
    return workflowExecutionSeconds * 1000

  return 1200 * 1000
}

const difyBaseUrl = process.env.DIFY_BASE_URL || 'http://localhost:18080'
const difyResolvedChatUrl = process.env.DIFY_APP_CHAT_URL || resolveUrl(difyBaseUrl, '/v1/chat-messages')

export const config = {
  port: Number(process.env.PORT || 8787),
  shopifyStoreDomain: process.env.SHOPIFY_STORE_DOMAIN || '',
  shopifyAppUrl: process.env.SHOPIFY_APP_URL || '',
  shopifyApiKey: process.env.SHOPIFY_API_KEY || '',
  shopifyApiSecret: process.env.SHOPIFY_API_SECRET || '',
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
  storefrontComponentPreviewFallback: asBoolean(process.env.ASKCRYSTAL_STOREFRONT_COMPONENT_PREVIEW_FALLBACK, false),
  appProxyPrefix: process.env.SHOPIFY_APP_PROXY_PREFIX || APP_PROXY_PREFIX,
  shopifyProxySignatureRequired: asBoolean(process.env.SHOPIFY_PROXY_SIGNATURE_REQUIRED, false),
  difyBaseUrl,
  difyAppChatUrl: process.env.DIFY_APP_CHAT_URL || '',
  difyResolvedChatUrl,
  difyAppApiKey: process.env.DIFY_APP_API_KEY || '',
  difyAppId: process.env.DIFY_APP_ID || '',
  difySiteAccessToken: process.env.DIFY_SITE_ACCESS_TOKEN || '',
  difySiteAppBaseUrl: process.env.DIFY_SITE_APP_BASE_URL || '',
  difyAdminEmail: process.env.DIFY_ADMIN_EMAIL || '',
  difyAdminPassword: process.env.DIFY_ADMIN_PASSWORD || '',
  difyDevUseConsole: asBoolean(process.env.DIFY_DEV_USE_CONSOLE, true),
  difyRequestTimeoutMs: resolveDifyRequestTimeoutMs(),
  defaultTimezone: process.env.ASKCRYSTAL_DEFAULT_TIMEZONE || 'Asia/Shanghai',
  sessionSecret: process.env.ASKCRYSTAL_SESSION_SECRET || '',
  memoryDatabaseUrl: process.env.ASKCRYSTAL_MEMORY_DATABASE_URL || '',
  memoryDatabaseSsl: asBoolean(process.env.ASKCRYSTAL_MEMORY_DATABASE_SSL, false),
}

export const configStatus = {
  shopify: {
    appUrl: Boolean(config.shopifyAppUrl),
    apiKey: Boolean(config.shopifyApiKey),
    apiSecret: Boolean(config.shopifyApiSecret),
    storefrontAccessToken: Boolean(config.storefrontAccessToken),
    storefrontComponentPreviewFallback: config.storefrontComponentPreviewFallback,
  },
  dify: {
    baseUrl: config.difyBaseUrl,
    appChatUrlConfigured: Boolean(config.difyAppChatUrl),
    resolvedChatUrl: config.difyResolvedChatUrl,
    appApiKey: Boolean(config.difyAppApiKey),
    appId: Boolean(config.difyAppId),
    siteAccessToken: Boolean(config.difySiteAccessToken),
    siteAppBaseUrl: Boolean(config.difySiteAppBaseUrl),
    adminEmail: Boolean(config.difyAdminEmail),
    adminPassword: Boolean(config.difyAdminPassword),
    devUseConsole: config.difyDevUseConsole,
    requestTimeoutMs: config.difyRequestTimeoutMs,
    defaultTimezone: config.defaultTimezone,
  },
  persistence: {
    sessionSecret: Boolean(config.sessionSecret),
    memoryDatabaseUrl: Boolean(config.memoryDatabaseUrl),
    memoryDatabaseSsl: config.memoryDatabaseSsl,
  },
}

export const requireDifyChatConfig = () => {
  const apiKey = asRequired(config.difyAppApiKey, 'DIFY_APP_API_KEY')
  if (!apiKey.ok)
    return apiKey

  return {
    ok: true,
    value: {
      chatUrl: config.difyResolvedChatUrl,
      apiKey: apiKey.value,
    },
  }
}

export const requireDifyConsoleDevConfig = () => {
  const appId = asRequired(config.difyAppId, 'DIFY_APP_ID')
  if (!appId.ok)
    return appId

  const email = asRequired(config.difyAdminEmail, 'DIFY_ADMIN_EMAIL')
  if (!email.ok)
    return email

  const password = asRequired(config.difyAdminPassword, 'DIFY_ADMIN_PASSWORD')
  if (!password.ok)
    return password

  return {
    ok: true,
    value: {
      baseUrl: config.difyBaseUrl,
      appId: appId.value,
      email: email.value,
      password: password.value,
    },
  }
}
