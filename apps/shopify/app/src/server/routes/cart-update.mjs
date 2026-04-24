export const handleCartUpdate = async body => {
  return {
    statusCode: 501,
    payload: {
      ok: false,
      code: 'shopify_cart_update_not_wired',
      error: 'Cart update is scaffolded but not yet connected to Shopify cart APIs.',
      received: {
        cartId: body?.cartId || null,
        lines: body?.lines || [],
      },
      nextSteps: [
        'Normalize cart state in the backend.',
        'Use Shopify cart mutation APIs.',
        'Refresh homepage shelf and cart-aware recommendation state after success.',
      ],
    },
  }
}
