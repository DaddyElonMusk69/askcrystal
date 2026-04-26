export const handleCartAdd = async body => {
  return {
    statusCode: 501,
    payload: {
      ok: false,
      code: 'shopify_cart_add_not_wired',
      error: 'Add-to-cart is scaffolded but not yet connected to Shopify cart APIs.',
      received: {
        merchandiseId: body?.merchandiseId || null,
        quantity: body?.quantity || 1,
      },
      nextSteps: [
        'Resolve product variant IDs from Shopify search results.',
        'Call Shopify cart creation/update APIs on the backend.',
        'Return cart summary for nearby UI refresh.',
      ],
    },
  }
}
