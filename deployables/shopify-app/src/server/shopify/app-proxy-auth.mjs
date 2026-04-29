import crypto from 'node:crypto'

import { config } from '../config.mjs'

export const getShopifyProxyContext = requestUrl => {
  const url = new URL(requestUrl, config.shopifyAppUrl || 'http://localhost')
  return {
    shop: url.searchParams.get('shop') || config.shopifyStoreDomain || '',
    loggedInCustomerId: url.searchParams.get('logged_in_customer_id') || '',
    pathPrefix: url.searchParams.get('path_prefix') || '',
    timestamp: url.searchParams.get('timestamp') || '',
  }
}

export const validateShopifyProxyRequest = requestUrl => {
  if (!config.shopifyProxySignatureRequired) {
    return {
      ok: true,
      mode: 'development-bypass',
      reason: 'SHOPIFY_PROXY_SIGNATURE_REQUIRED=false',
    }
  }

  const secret = config.shopifyApiSecret
  if (!secret) {
    return {
      ok: false,
      mode: 'strict',
      reason: 'SHOPIFY_API_SECRET is missing',
    }
  }

  const url = new URL(requestUrl, config.shopifyAppUrl || 'http://localhost')
  const givenSignature = url.searchParams.get('signature') || url.searchParams.get('hmac')
  if (!givenSignature) {
    return {
      ok: false,
      mode: 'strict',
      reason: 'Missing Shopify proxy signature parameter',
    }
  }

  const sortedPairs = []
  for (const [key, value] of url.searchParams.entries()) {
    if (key === 'signature' || key === 'hmac')
      continue
    sortedPairs.push(`${key}=${value}`)
  }
  sortedPairs.sort()

  const digest = crypto
    .createHmac('sha256', secret)
    .update(sortedPairs.join(''))
    .digest('hex')

  return {
    ok: digest === givenSignature,
    mode: 'strict',
    reason: digest === givenSignature ? 'Signature valid' : 'Signature mismatch',
  }
}
