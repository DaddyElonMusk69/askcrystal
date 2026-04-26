import { LocalDifyGateway } from '../dify/local-dify-gateway.mjs'

const gateway = new LocalDifyGateway()

export const handleChatEmbed = async (req) => {
  const url = new URL(req.url, 'http://localhost')
  const conversationId = url.searchParams.get('conversationId') || null
  const userId = url.searchParams.get('userId')
    || url.searchParams.get('sessionId')
    || 'shopify-guest'

  const difyResult = await gateway.getEmbedConfig({
    conversationId,
    userId,
  })

  if (!difyResult.ok) {
    return {
      statusCode: difyResult.status,
      payload: {
        ok: false,
        error: difyResult.message,
        code: difyResult.code,
        details: difyResult.details || null,
      },
    }
  }

  return {
    statusCode: 200,
    payload: {
      ok: true,
      ...difyResult.data,
    },
  }
}
