import { config } from '../config.mjs'

const STOREFRONT_API_VERSION = '2024-10'

const PRODUCT_FIELDS = `
  id
  handle
  title
  description
  onlineStoreUrl
  availableForSale
  tags
  featuredImage {
    url
    altText
  }
  priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
  compareAtPriceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
  selectedOrFirstAvailableVariant {
    id
    availableForSale
    price {
      amount
      currencyCode
    }
    compareAtPrice {
      amount
      currencyCode
    }
  }
`

const COLLECTION_FIELDS = `
  id
  handle
  title
  description
  onlineStoreUrl
  image {
    url
    altText
  }
`

const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      ${PRODUCT_FIELDS}
    }
  }
`

const PRODUCT_BY_ID_QUERY = `
  query ProductById($id: ID!) {
    node(id: $id) {
      ... on Product {
        ${PRODUCT_FIELDS}
      }
    }
  }
`

const PRODUCT_VARIANT_BY_ID_QUERY = `
  query ProductVariantById($id: ID!) {
    node(id: $id) {
      ... on ProductVariant {
        id
        availableForSale
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        product {
          ${PRODUCT_FIELDS}
        }
      }
    }
  }
`

const COLLECTION_BY_HANDLE_QUERY = `
  query CollectionByHandle($handle: String!) {
    collection(handle: $handle) {
      ${COLLECTION_FIELDS}
    }
  }
`

const SEARCH_PRODUCTS_QUERY = `
  query SearchProducts($query: String!, $first: Int!) {
    products(first: $first, query: $query, sortKey: RELEVANCE) {
      nodes {
        ${PRODUCT_FIELDS}
      }
    }
  }
`

const isConfiguredString = value => typeof value === 'string' && value.trim().length > 0

const createStorefrontEndpoint = (storeDomain) =>
  `https://${storeDomain}/api/${STOREFRONT_API_VERSION}/graphql.json`

const getGraphQLErrors = (payload) => {
  if (!Array.isArray(payload?.errors))
    return []

  return payload.errors
    .map(error => (typeof error?.message === 'string' ? error.message : 'Shopify Storefront API error'))
    .filter(Boolean)
}

export const hasShopifyStorefrontConfig = () =>
  isConfiguredString(config.shopifyStoreDomain) && isConfiguredString(config.storefrontAccessToken)

export class ShopifyStorefrontClient {
  constructor({
    storeDomain = config.shopifyStoreDomain,
    storefrontAccessToken = config.storefrontAccessToken,
  } = {}) {
    this.storeDomain = storeDomain
    this.storefrontAccessToken = storefrontAccessToken
  }

  get isConfigured() {
    return isConfiguredString(this.storeDomain) && isConfiguredString(this.storefrontAccessToken)
  }

  async query(query, variables = {}) {
    if (!this.isConfigured) {
      const error = new Error('Shopify Storefront API is not configured')
      error.code = 'shopify_storefront_not_configured'
      throw error
    }

    const response = await fetch(createStorefrontEndpoint(this.storeDomain), {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        'x-shopify-storefront-access-token': this.storefrontAccessToken,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })

    let payload = null
    try {
      payload = await response.json()
    }
    catch {
      payload = null
    }

    if (!response.ok) {
      const message = getGraphQLErrors(payload)[0] || `Shopify Storefront API request failed with status ${response.status}`
      const error = new Error(message)
      error.code = 'shopify_storefront_request_failed'
      error.status = response.status
      error.details = payload
      throw error
    }

    const errors = getGraphQLErrors(payload)
    if (errors.length > 0) {
      const error = new Error(errors[0])
      error.code = 'shopify_storefront_graphql_error'
      error.details = payload
      throw error
    }

    return payload?.data || {}
  }

  async getProductByHandle(handle) {
    const data = await this.query(PRODUCT_BY_HANDLE_QUERY, { handle })
    return data?.product || null
  }

  async getProductById(id) {
    const data = await this.query(PRODUCT_BY_ID_QUERY, { id })
    return data?.node || null
  }

  async getProductVariantById(id) {
    const data = await this.query(PRODUCT_VARIANT_BY_ID_QUERY, { id })
    return data?.node || null
  }

  async getCollectionByHandle(handle) {
    const data = await this.query(COLLECTION_BY_HANDLE_QUERY, { handle })
    return data?.collection || null
  }

  async searchProducts(query, first = 8) {
    const data = await this.query(SEARCH_PRODUCTS_QUERY, { query, first })
    return data?.products?.nodes || []
  }
}

export const createShopifyStorefrontClient = (options = {}) => new ShopifyStorefrontClient(options)
