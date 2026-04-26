export const handleCatalogRecommend = async body => {
  return {
    statusCode: 501,
    payload: {
      ok: false,
      code: 'shopify_recommend_not_wired',
      error: 'Catalog recommendation is scaffolded but not yet wired to Shopify product retrieval.',
      received: {
        intention: body?.intention || '',
        budget: body?.budget || null,
        modality: body?.modality || null,
      },
      nextSteps: [
        'Call AskCrystal chat orchestration first.',
        'Translate the resulting recommendation intent into Shopify catalog filters.',
        'Return normalized product cards for the homepage shelf.',
      ],
    },
  }
}
