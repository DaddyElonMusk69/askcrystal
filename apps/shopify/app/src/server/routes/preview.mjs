import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const serverDir = path.dirname(fileURLToPath(import.meta.url))
const extensionAssetsDir = path.resolve(serverDir, '../../../../extensions/homepage-agent/assets')

const previewHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>AskCrystal Local Homepage Preview</title>
    <link rel="stylesheet" href="/preview-assets/homepage-agent.css">
    <style>
      body {
        margin: 0;
        font-family: "Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif;
        background:
          radial-gradient(circle at top, rgba(233, 214, 193, 0.84), transparent 28%),
          linear-gradient(180deg, #f7efe6 0%, #efe3d5 100%);
        color: #221b16;
      }

      .preview-shell {
        min-height: 100vh;
      }

      .preview-stage {
        max-width: 1120px;
        margin: 0 auto;
      }
    </style>
    <script src="/preview-assets/homepage-agent.js" defer></script>
  </head>
  <body>
    <main class="preview-shell">
      <div class="preview-stage">
        <div
          id="askcrystal-homepage-agent-preview"
          class="askcrystal-homepage-agent"
          data-askcrystal-agent
          data-proxy-base="/apps/askcrystal"
          data-title="A spiritual crystal boutique guided by conversation"
          data-subtitle="Find a crystal, get a grounded reading, or browse by intention with a resident guide who understands both ritual and shopping intent."
        >
          <div class="askcrystal-shell">
            <header class="askcrystal-masthead">
              <p class="askcrystal-masthead__eyebrow">AskCrystal</p>
              <h2 class="askcrystal-title">A spiritual crystal boutique guided by conversation</h2>
            </header>

            <section class="askcrystal-chat-shell">
              <div class="askcrystal-welcome" data-askcrystal-welcome>
                <div class="askcrystal-welcome__grid">
                  <section class="askcrystal-welcome__guide">
                    <p class="askcrystal-section-label">Start with the guide</p>
                    <h3 class="askcrystal-welcome__title">Tell the guide what feels most important right now.</h3>
                    <p class="askcrystal-welcome__body">Choose a prompt or ask directly. Once the first answer comes back, this welcome layer gets out of the way and the chat takes over.</p>

                    <div class="askcrystal-guided-prompts" aria-label="Guided starters">
                      <button type="button" class="askcrystal-guided-prompt" data-askcrystal-message="Help me find a grounding crystal for an overwhelming week.">Grounding support</button>
                      <button type="button" class="askcrystal-guided-prompt" data-askcrystal-message="Show me protection crystals and tell me how to use them.">Protection crystals</button>
                      <button type="button" class="askcrystal-guided-prompt" data-askcrystal-message="Help me choose a crystal for love, softness, and emotional healing.">Love and healing</button>
                      <button type="button" class="askcrystal-guided-prompt" data-askcrystal-message="Give me a quick reading and then suggest something from the store.">Reading first</button>
                    </div>
                  </section>

                  <section class="askcrystal-welcome__feed">
                    <div class="askcrystal-feed-header">
                      <p class="askcrystal-section-label">Bestsellers</p>
                      <p class="askcrystal-feed-header__text">A short feed of easy starting points if you want to shop before you chat.</p>
                    </div>

                    <div class="askcrystal-bestsellers" aria-label="Short bestsellers feed">
                      <button type="button" class="askcrystal-bestseller-card" data-askcrystal-message="Tell me whether Black Tourmaline is the right crystal for me right now.">
                        <span class="askcrystal-bestseller-card__tag">Protection</span>
                        <strong class="askcrystal-bestseller-card__title">Black Tourmaline</strong>
                        <span class="askcrystal-bestseller-card__body">For heavy rooms, overstimulation, and stronger energetic boundaries.</span>
                        <span class="askcrystal-bestseller-card__price">$24</span>
                      </button>

                      <button type="button" class="askcrystal-bestseller-card" data-askcrystal-message="Tell me whether Rose Quartz fits what I need emotionally right now.">
                        <span class="askcrystal-bestseller-card__tag">Heart</span>
                        <strong class="askcrystal-bestseller-card__title">Rose Quartz</strong>
                        <span class="askcrystal-bestseller-card__body">A softer starting point for comfort, repair, tenderness, and receiving care.</span>
                        <span class="askcrystal-bestseller-card__price">$22</span>
                      </button>

                      <button type="button" class="askcrystal-bestseller-card" data-askcrystal-message="Would Citrine be a good crystal for confidence and abundance for me right now?">
                        <span class="askcrystal-bestseller-card__tag">Abundance</span>
                        <strong class="askcrystal-bestseller-card__title">Citrine</strong>
                        <span class="askcrystal-bestseller-card__body">Often chosen for brighter momentum, confidence, and forward energy.</span>
                        <span class="askcrystal-bestseller-card__price">$26</span>
                      </button>

                      <button type="button" class="askcrystal-bestseller-card" data-askcrystal-message="Would Moonstone be a good crystal for intuition and emotional balance for me?">
                        <span class="askcrystal-bestseller-card__tag">Intuition</span>
                        <strong class="askcrystal-bestseller-card__title">Moonstone</strong>
                        <span class="askcrystal-bestseller-card__body">Used when you want softer intuition, emotional steadiness, and reflective calm.</span>
                        <span class="askcrystal-bestseller-card__price">$28</span>
                      </button>
                    </div>
                  </section>
                </div>
              </div>

              <div class="askcrystal-stage" data-askcrystal-stage aria-live="polite"></div>
              <div class="askcrystal-embed" data-askcrystal-embed hidden></div>
            </section>

            <form class="askcrystal-composer" data-askcrystal-form>
              <label class="visually-hidden" for="askcrystal-input-preview">Ask AskCrystal</label>
              <div class="askcrystal-composer__field">
                <textarea
                  id="askcrystal-input-preview"
                  name="message"
                  rows="1"
                  placeholder="Ask about your mood, intention, or the crystal you want help choosing."
                ></textarea>
                <button type="submit">Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </body>
</html>
`

const contentTypeByFile = {
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
}

export const handlePreviewPage = async (_req, res) => {
  res.writeHead(200, {
    'content-type': 'text/html; charset=utf-8',
    'cache-control': 'no-store',
  })
  res.end(previewHtml)
}

export const handlePreviewAsset = async (assetName, res) => {
  const safeName = path.basename(assetName || '')
  const assetPath = path.join(extensionAssetsDir, safeName)
  const extension = path.extname(safeName)

  if (!contentTypeByFile[extension]) {
    return {
      statusCode: 404,
      payload: {
        ok: false,
        error: 'Preview asset not found',
      },
    }
  }

  try {
    const fileContents = await fs.readFile(assetPath)
    res.writeHead(200, {
      'content-type': contentTypeByFile[extension],
      'cache-control': 'no-store',
    })
    res.end(fileContents)
    return null
  }
  catch {
    return {
      statusCode: 404,
      payload: {
        ok: false,
        error: 'Preview asset not found',
      },
    }
  }
}
