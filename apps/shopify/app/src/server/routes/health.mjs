import { configStatus } from '../config.mjs'

export const handleHealth = async (_req, res) => {
  return {
    statusCode: 200,
    payload: {
      ok: true,
      service: 'askcrystal-shopify-proxy-scaffold',
      status: 'ready-for-integration',
      config: configStatus,
    },
  }
}
