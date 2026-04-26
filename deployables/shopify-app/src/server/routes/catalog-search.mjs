export const handleCatalogSearch = async body => {
  return {
    statusCode: 501,
    payload: {
      ok: false,
      code: 'shopify_catalog_not_wired',
      error: 'Catalog search is scaffolded but not yet wired to the Shopify Storefront API.',
      received: {
        query: body?.query || '',
        filters: body?.filters || {},
      },
      nextSteps: [
        'Map this route to the Storefront API or official Shopify MCP-backed backend flow.',
        'Normalize products into the shared product card contract before returning to the homepage block.',
      ],
    },
  }
}
