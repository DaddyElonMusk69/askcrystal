# AskCrystal Chat Page Design

## Feature Summary
AskCrystal needs two clear storefront modes: the homepage as a guided front door, and a dedicated chat page as the focused reading room. The homepage should teach first-time visitors what AskCrystal can do, while the chat page should preserve longer conversations without burying the entry guide behind a mobile drawer.

## Primary User Action
Users should be able to start with a guided prompt or free-form question on the homepage, then continue naturally in a dedicated chat page without feeling like they changed products or lost context.

## Design Direction
The experience should feel like entering a dark, refined crystal shop with a resident cosmic guide: quiet, premium, personal, and slightly mystical without becoming theatrical. The core palette remains deep ink `#020c14`, antique gold `#b99560`, warm cream text, soft rounded surfaces, and restrained glow only where it improves focus.

## Route Model
- `/` is the guided entry page.
- `/?askcrystal=chat` is the dev-safe dedicated chat view because it does not require a Shopify Page object.
- `/pages/askcrystal` is the eventual canonical dedicated chat page once Shopify admin has a page with handle `askcrystal` assigned to the `askcrystal` page template.
- `/collections` is the shop/catalog page.
- The header switch should treat homepage and chat as different destinations: from shopping pages it should go to chat, from chat/home it should offer the shop.

## Layout Strategy
- Homepage keeps the welcome guide cards, best-seller shelf, and a lightweight composer.
- Chat page removes the full welcome guide from the conversation flow and starts directly in the reading room.
- Chat page includes a small top rail with a return link to the guide/homepage so mobile users do not need to open the drawer to rediscover the guided entry.
- The composer remains docked and consistent across both modes.
- Conversation content should use the same message rendering, product cards, progress indicators, and suggestion chips across both modes.

## Interaction Model
- Tapping a homepage guide card stores the selected prompt and routes to `/?askcrystal=chat` by default.
- Sending from the homepage composer stores the typed prompt and routes to `/?askcrystal=chat` by default.
- When the chat page opens with a pending homepage prompt, it sends that prompt into the active AskCrystal session once.
- Starting a new chat from the drawer keeps working as-is.
- Existing stored conversations remain available because the runtime still uses the current local session registry.

## Key States
- Fresh homepage: guide cards and shelf are visible from the top; no forced autoscroll.
- Fresh chat page with no messages: focused empty reading room with a short invitation and visible home/guide return.
- Homepage prompt handoff: navigate immediately, then send once on chat page.
- Active run: show current lyric/progress state and stop control.
- Completed answer: show simulated final-answer reveal, storefront UI components, and suggestions.
- Error/interruption: keep the existing retry-ready error message.

## Content Requirements
- Homepage title: “Find the crystal, ritual, or reading that meets you where you are.”
- Chat page title: “AskCrystal reading room.”
- Chat page helper line: “Ask a question, name a feeling, or continue your last thread.”
- Return link label: “Guide.”
- Shop link label: “Shop crystals.”
- Composer placeholder remains: “ask me anything”.

## Implementation Plan
- [x] Add a `displayMode` setting to the AskCrystal React config.
- [x] Create a dedicated `askcrystal-chat-page` Shopify section that mounts the existing bundle in `chat` mode.
- [x] Create `templates/page.askcrystal.json` using that section.
- [x] Update the homepage section config to point prompt handoff at `/?askcrystal=chat` by default.
- [x] Update the React app so homepage sends store a pending prompt and navigate to the chat page.
- [x] Update the React app so chat mode consumes the pending prompt exactly once and hides the homepage guide.
- [x] Update header switch destination so non-home/non-collection pages route to the dedicated chat page.

## Build Status
- Implemented in the Shopify theme.
- `npm run agent:build` passes.
- `npm run theme:check` passes with the existing unrelated `snippets/header-drawer.liquid` unused `ratio` warning.
- Local dev can use `/?askcrystal=chat` immediately.
- Shopify admin still needs a page with handle `askcrystal` assigned to the `askcrystal` page template before `/pages/askcrystal` is live on the store.

## Open Questions For Later
- Whether the homepage should keep the composer permanently or become card/CTA-only after v1 data proves where users start.
- Whether `/pages/askcrystal` should be created and managed manually in Shopify admin or provisioned by a future Shopify app install flow.
- Whether chat history should eventually be server-backed instead of browser-local before public launch.
