import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';
import {
  AssistantRuntimeProvider,
  ComposerPrimitive,
  MessagePrimitive,
  ThreadPrimitive,
  useMessage,
} from '@assistant-ui/react';
import { useExternalStoreRuntime } from '../../node_modules/@assistant-ui/react/dist/legacy-runtime/runtime-cores/external-store/useExternalStoreRuntime.js';
import {
  createChatComponentToolParts,
  extractChatComponentsFromPayload,
  extractInlineChatComponentManifest,
  mergeChatComponents,
  stripInlineChatComponentManifestPreview,
} from '../../../shopify/packages/storefront-ui/src/chat-components.mjs';
import { askCrystalMessagePartComponents } from './chat-components.jsx';
import './styles.css';
import './chat-components.css';

const MOUNT_SELECTOR = '[data-askcrystal-homepage-root]';
const rootRegistry = new Map();
const DEFAULT_THREAD_ID = 'askcrystal-main-thread';
const LOCAL_PROXY_ORIGIN = 'http://localhost:8787';
const SESSION_STORAGE_KEY = 'askcrystal-theme-session-id';
let messageSequence = 0;
const COMPOSER_MAX_ROWS = 7;

function readJsonScript(id) {
  const element = document.getElementById(id);
  if (!element) return null;

  try {
    return JSON.parse(element.textContent || '{}');
  } catch (error) {
    console.error('[AskCrystal] Failed to parse section config', error);
    return null;
  }
}

function extractTextFromParts(parts = []) {
  return parts
    .map((part) => {
      if (part.type === 'text') return part.text;
      if (part.type === 'reasoning') return part.text;
      return '';
    })
    .join(' ')
    .trim();
}

function getPayloadText(payload) {
  const value =
    payload?.answer ||
    payload?.delta ||
    payload?.text ||
    payload?.message ||
    payload?.reply ||
    payload?.output ||
    payload?.data?.answer ||
    payload?.data?.text;
  return typeof value === 'string' ? value : '';
}

function isSafeHref(href) {
  return /^(https?:\/\/|mailto:|\/)/i.test(href);
}

function parseInlineMarkdown(text, keyPrefix = 'inline') {
  const nodes = [];
  const pattern = /(\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
  let lastIndex = 0;
  let match;
  let index = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const key = `${keyPrefix}-${index}`;
    if (match[2] && match[3]) {
      const href = match[3].trim();
      nodes.push(
        isSafeHref(href) ? (
          <a key={key} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
            {match[2]}
          </a>
        ) : (
          match[2]
        ),
      );
    } else if (match[4]) {
      nodes.push(<code key={key}>{match[4]}</code>);
    } else if (match[5]) {
      nodes.push(<strong key={key}>{parseInlineMarkdown(match[5], `${key}-strong`)}</strong>);
    } else if (match[6]) {
      nodes.push(<em key={key}>{parseInlineMarkdown(match[6], `${key}-em`)}</em>);
    }

    lastIndex = pattern.lastIndex;
    index += 1;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function MarkdownContent({ text = '' }) {
  const lines = String(text).replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    const fenceMatch = line.match(/^```(\w+)?\s*$/);
    if (fenceMatch) {
      const codeLines = [];
      index += 1;

      while (index < lines.length && !/^```\s*$/.test(lines[index])) {
        codeLines.push(lines[index]);
        index += 1;
      }

      if (index < lines.length) index += 1;

      blocks.push(
        <pre key={`code-${index}`} className="ac-markdown__code-block">
          <code>{codeLines.join('\n')}</code>
        </pre>,
      );
      continue;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      const HeadingTag = `h${headingMatch[1].length + 2}`;
      blocks.push(
        <HeadingTag key={`heading-${index}`}>
          {parseInlineMarkdown(headingMatch[2], `heading-${index}`)}
        </HeadingTag>,
      );
      index += 1;
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      const items = [];
      while (index < lines.length && /^\s*[-*]\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*[-*]\s+/, ''));
        index += 1;
      }

      blocks.push(
        <ul key={`ul-${index}`}>
          {items.map((item, itemIndex) => (
            <li key={`ul-${index}-${itemIndex}`}>{parseInlineMarkdown(item, `ul-${index}-${itemIndex}`)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const items = [];
      while (index < lines.length && /^\s*\d+\.\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*\d+\.\s+/, ''));
        index += 1;
      }

      blocks.push(
        <ol key={`ol-${index}`}>
          {items.map((item, itemIndex) => (
            <li key={`ol-${index}-${itemIndex}`}>{parseInlineMarkdown(item, `ol-${index}-${itemIndex}`)}</li>
          ))}
        </ol>,
      );
      continue;
    }

    if (/^\s*>\s?/.test(line)) {
      const quoteLines = [];
      while (index < lines.length && /^\s*>\s?/.test(lines[index])) {
        quoteLines.push(lines[index].replace(/^\s*>\s?/, ''));
        index += 1;
      }

      blocks.push(
        <blockquote key={`quote-${index}`}>
          {quoteLines.map((quoteLine, quoteIndex) => (
            <p key={`quote-${index}-${quoteIndex}`}>{parseInlineMarkdown(quoteLine, `quote-${index}-${quoteIndex}`)}</p>
          ))}
        </blockquote>,
      );
      continue;
    }

    const paragraphLines = [];
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^```/.test(lines[index]) &&
      !/^(#{1,3})\s+/.test(lines[index]) &&
      !/^\s*[-*]\s+/.test(lines[index]) &&
      !/^\s*\d+\.\s+/.test(lines[index]) &&
      !/^\s*>\s?/.test(lines[index])
    ) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }

    const paragraphText = paragraphLines.join(' ');
    blocks.push(
      <p key={`p-${index}`}>{parseInlineMarkdown(paragraphText, `p-${index}`)}</p>,
    );
  }

  return <div className="ac-markdown">{blocks}</div>;
}

function ThinkingIndicator({ statusText }) {
  return (
    <div className="ac-thinking" role="status" aria-live="polite">
      <span className="ac-thinking__orb" aria-hidden="true" />
      <span className="ac-thinking__text">{statusText || 'Tuning in...'}</span>
      <span className="ac-thinking__dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
    </div>
  );
}

function LiveStatus({ statusText }) {
  if (!statusText) return null;

  return (
    <div className="ac-live-status" role="status" aria-live="polite">
      <span className="ac-live-status__dot" aria-hidden="true" />
      <span className="ac-live-status__text">{statusText}</span>
    </div>
  );
}

function normalizeStatusPayload(payload) {
  if (!payload) {
    return {
      stage: '',
      tool: '',
      message: '',
      taskId: '',
    };
  }

  if (typeof payload === 'string') {
    return {
      stage: '',
      tool: '',
      message: payload,
      taskId: '',
    };
  }

  return {
    stage: typeof payload.stage === 'string' ? payload.stage : '',
    tool: typeof payload.tool === 'string' ? payload.tool : '',
    message: typeof payload.message === 'string' ? payload.message : '',
    taskId: getPayloadTaskId(payload),
  };
}

function getLastUserPrompt(messages) {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index];
    if (message.role === 'user') {
      return extractTextFromParts(message.content);
    }
  }

  return '';
}

function chooseProduct(products, matcher) {
  return products.find((product) => matcher(product));
}

function buildDemoComponents({ matchedIntention, fallbackProduct, products }) {
  if (matchedIntention?.product) {
    return mergeChatComponents([], [
      {
        component: 'reading_summary',
        id: `summary-${matchedIntention.key}`,
        props: {
          title: 'What your energy is asking for',
          summary: matchedIntention.summary,
          energyFocus: matchedIntention.energyFocus,
          highlights: matchedIntention.highlights,
          disclaimer: 'Spiritual wellness guidance only. Let your own judgment lead the final choice.',
        },
      },
      {
        component: matchedIntention.key === 'calm' ? 'product_card' : 'product_carousel',
        id: `products-${matchedIntention.key}`,
        props: matchedIntention.key === 'calm'
          ? {
              eyebrow: 'Best first match',
              reason: matchedIntention.cardReason,
              note: matchedIntention.ritual,
              product: matchedIntention.product,
            }
          : {
              eyebrow: 'Curated shelf',
              title: matchedIntention.carouselTitle,
              reason: matchedIntention.cardReason,
              products: [
                matchedIntention.product,
                ...products.filter((product) => product.id !== matchedIntention.product.id).slice(0, 2),
              ],
            },
      },
      {
        component: 'ritual_card',
        id: `ritual-${matchedIntention.key}`,
        props: {
          title: matchedIntention.ritualTitle,
          summary: matchedIntention.ritualSummary,
          steps: matchedIntention.ritualSteps,
          linkedProducts: matchedIntention.product ? [matchedIntention.product] : [],
          note: matchedIntention.ritual,
        },
      },
    ]);
  }

  return mergeChatComponents([], [
    {
      component: 'collection_link',
      id: 'browse-collections',
      props: {
        title: 'Browse by intention while we learn more',
        description: 'If you already know the feeling or outcome you want, open the wider shelf and keep the conversation going.',
        url: '/collections/all',
        label: 'Shop all crystals',
      },
    },
    fallbackProduct
      ? {
          component: 'product_card',
          id: 'fallback-product',
          props: {
            eyebrow: 'A gentle starting point',
            reason: 'This is a strong first shelf item while the guide narrows your intention.',
            product: fallbackProduct,
          },
        }
      : null,
    {
      component: 'next_steps',
      id: 'guided-next-steps',
      props: {
        title: 'How this storefront works best',
        steps: [
          'Start with the feeling that is most present right now.',
          'Let the guide narrow the intention before shopping too broadly.',
          'Use the recommendation cards to move into a product or ritual without leaving the thread.',
        ],
      },
    },
  ]);
}

function buildDemoReply(prompt, products) {
  const normalizedPrompt = prompt.toLowerCase();
  const intentionMap = [
    {
      key: 'calm',
      test: /sleep|rest|anxious|stress|calm|ground|peace/,
      lead:
        'I would start by softening the energy around your nervous system before recommending anything too activating.',
      product:
        chooseProduct(products, (product) => /amethyst|selenite|moonstone|calm|sleep/i.test(`${product.title} ${product.summary || ''}`)) ||
        products[0],
      summary:
        'There is a strong need to reduce static first. The most supportive move is to favor calm, sleep, and grounding over anything intensely energizing.',
      energyFocus: 'Soften + ground',
      highlights: [
        'Your nervous system wants steadiness before action.',
        'Sleep, safety, and gentleness matter more than intensity right now.',
        'A quieter ritual will likely work better than a complicated one.',
      ],
      cardReason:
        'This recommendation leans calm, quiet, and easy to return to at the end of the day.',
      ritualTitle: 'A quick evening grounding ritual',
      ritualSummary: 'Keep the ritual simple enough that you can actually repeat it tonight.',
      ritualSteps: [
        'Hold the crystal somewhere visible or easy to reach.',
        'Take three slow breaths and let your shoulders drop.',
        'Name one thing you are releasing from today.',
      ],
      ritual:
        'A good starting ritual is one grounding breath, one clear intention, and one stone you can keep within reach tonight.',
    },
    {
      key: 'love',
      test: /love|relationship|heart|marriage|partner|friendship/,
      lead:
        'This sounds less like a product hunt and more like a heart-reading moment, so I would slow the recommendation down and keep it gentle.',
      product:
        chooseProduct(products, (product) => /rose|heart|love|pink/i.test(`${product.title} ${product.summary || ''}`)) ||
        products[0],
      summary:
        'This turn feels centered on tenderness, boundaries, and emotional clarity. The right recommendation should support the heart without forcing urgency.',
      energyFocus: 'Heart clarity',
      highlights: [
        'Gentleness matters more than intensity here.',
        'You may need reassurance and discernment at the same time.',
        'A ritual that centers boundaries can support the product recommendation.',
      ],
      cardReason:
        'These picks keep the energy soft, relational, and emotionally supportive rather than overly dramatic.',
      carouselTitle: 'Crystals for heart clarity',
      ritualTitle: 'A small heart-centering ritual',
      ritualSummary: 'Use a short reset that helps you notice what feels true before making any promises.',
      ritualSteps: [
        'Place the crystal near your heart or in your palm.',
        'Name the kind of love or safety you want more of.',
        'Choose one boundary that protects that intention this week.',
      ],
      ritual:
        'If you want, we can frame the next step around heart clarity, boundaries, or reconciliation instead of jumping straight to a purchase.',
    },
    {
      key: 'career',
      test: /money|career|work|abundance|business|confidence|success/,
      lead:
        'I would treat this as an intention and momentum question first, then narrow into stones that support focus, confidence, and abundance.',
      product:
        chooseProduct(products, (product) => /citrine|pyrite|tiger|success|abundance/i.test(`${product.title} ${product.summary || ''}`)) ||
        products[0],
      summary:
        'The energy here is not just about manifestation. It is about focus, self-trust, and practical momentum around work or money.',
      energyFocus: 'Clarity + momentum',
      highlights: [
        'Confidence works best when tied to a concrete next move.',
        'A visible object can act as a daily reset for intention and follow-through.',
        'The recommendation should feel energizing but still grounded in action.',
      ],
      cardReason:
        'These recommendations support focus, direction, and steady abundance rather than vague hype.',
      carouselTitle: 'Crystals for work and abundance',
      ritualTitle: 'A work-intention ritual',
      ritualSummary: 'Use the product as a prompt for action, not only a symbol for wishing.',
      ritualSteps: [
        'Place the crystal beside the task that matters most this week.',
        'Write one measurable outcome you want to move toward.',
        'Return to the crystal before you begin the work block.',
      ],
      ritual:
        'The strongest commerce-friendly flow here is intention first, then one practical object you can return to during work or planning.',
    },
  ];

  const matchedIntention = intentionMap.find((item) => item.test.test(normalizedPrompt));

  const fallbackProduct = products[0];
  const components = buildDemoComponents({
    matchedIntention,
    fallbackProduct,
    products,
  });

  if (matchedIntention?.product) {
    return {
      answer: `${matchedIntention.lead}\n\nA likely fit from the current shelf is ${matchedIntention.product.title}. ${matchedIntention.product.summary || 'It looks aligned with the intention you mentioned.'}\n\n${matchedIntention.ritual}`,
      components,
    };
  }

  const productLine = fallbackProduct
    ? `A natural first shelf item to explore is ${fallbackProduct.title}. ${fallbackProduct.summary || 'It is a strong general starting point while we learn more about the user.'}`
    : 'Once the catalog feed is connected, this space can surface a small set of best-fit crystals without leaving the thread.';

  return {
    answer: `I can already support the guided-storefront shape we want here: start with the feeling, clarify the intention, and only then move into product curation.\n\n${productLine}\n\nIf you tell me what is most present right now, I can narrow the reading and the recommendation together.`,
    components,
  };
}

function sanitizeAssistantAnswer(rawAnswer) {
  const answer = typeof rawAnswer === 'string' ? rawAnswer.trim() : '';
  if (!answer) return '';

  const hasRawToolMarkup = /<\/?(minimax:tool_call|invoke|action_input|parameter)\b/i.test(answer);
  if (!hasRawToolMarkup) {
    return answer;
  }

  const cleaned = answer
    .replace(/<minimax:tool_call>[\s\S]*?<\/minimax:tool_call>/gi, '')
    .replace(/<invoke\b[\s\S]*?<\/invoke>/gi, '')
    .replace(/<action_input\b[^>]*>[\s\S]*?<\/action_input>/gi, '')
    .replace(/<parameter\b[^>]*>[\s\S]*?<\/parameter>/gi, '')
    .replace(/<\/?[^>]+>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  if (cleaned && !/\b(search|browse|checking|catalog)\b/i.test(cleaned)) return cleaned;

  return [
    'I tried to check the shelf for you, but the live catalog result was not available in this moment.',
    'For calm and sleep tonight, start with amethyst. Keep it near your bedside, take three slow breaths, and set a simple intention: “I let the day soften, and I allow rest to come easily.”',
    'If you want, tell me whether this is more about anxiety, overthinking, or emotional heaviness, and I can narrow the stone and ritual more precisely.',
  ].join('\n\n');
}

function normalizeAssistantReply(rawAnswer, incomingComponents = []) {
  const manifest = extractInlineChatComponentManifest(rawAnswer);
  const components = mergeChatComponents(incomingComponents, manifest.components);
  const answer = sanitizeAssistantAnswer(manifest.answer);

  if (answer) {
    return {
      answer,
      components,
    };
  }

  if (components.length > 0) {
    return {
      answer: '',
      components,
    };
  }

  return {
    answer: 'AskCrystal finished the request, but no guidance text came back. Please try again.',
    components: [],
  };
}

function buildAssistantParts({ text = '', components = [] } = {}) {
  const parts = [];
  const answer = stripInlineChatComponentManifestPreview(text).trim();

  if (answer) {
    parts.push({
      type: 'text',
      text: answer,
    });
  }

  parts.push(...createChatComponentToolParts(components));
  return parts;
}

function isAbsoluteUrl(value) {
  return /^https?:\/\//i.test(value);
}

function resolveApiEndpoint(apiEndpoint) {
  if (!apiEndpoint) return '';
  if (isAbsoluteUrl(apiEndpoint)) return apiEndpoint;

  if (
    typeof window !== 'undefined' &&
    /^(127\.0\.0\.1|localhost):9292$/.test(window.location.host) &&
    apiEndpoint.startsWith('/apps/')
  ) {
    return `${LOCAL_PROXY_ORIGIN}${apiEndpoint}`;
  }

  return apiEndpoint;
}

function resolveStreamEndpoint(apiEndpoint) {
  if (!apiEndpoint) return '';

  if (apiEndpoint.endsWith('/stream')) {
    return resolveApiEndpoint(apiEndpoint);
  }

  return resolveApiEndpoint(`${apiEndpoint.replace(/\/$/, '')}/stream`);
}

function resolveStopEndpoint(apiEndpoint) {
  if (!apiEndpoint) return '';

  if (apiEndpoint.endsWith('/stop')) {
    return resolveApiEndpoint(apiEndpoint);
  }

  return resolveApiEndpoint(`${apiEndpoint.replace(/\/$/, '')}/stop`);
}

function getBrowserSessionId() {
  if (typeof window === 'undefined') {
    return 'askcrystal-theme-preview';
  }

  try {
    const existingId = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (existingId) return existingId;

    const sessionId = createMessageId('session');
    window.localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
    return sessionId;
  } catch {
    return createMessageId('session');
  }
}

function extractSseEvents(buffer) {
  const events = [];
  let remaining = buffer.replace(/\r\n/g, '\n');

  while (true) {
    const separatorIndex = remaining.indexOf('\n\n');
    if (separatorIndex === -1) break;

    const rawEvent = remaining.slice(0, separatorIndex);
    remaining = remaining.slice(separatorIndex + 2);

    let eventName = 'message';
    const payloadLines = [];

    rawEvent.split('\n').forEach((line) => {
      if (line.startsWith('event:')) {
        eventName = line.slice(6).trim() || eventName;
      }

      if (line.startsWith('data:')) {
        payloadLines.push(line.slice(5).trim());
      }
    });

    if (!payloadLines.length) continue;

    try {
      events.push({
        event: eventName,
        payload: JSON.parse(payloadLines.join('\n')),
      });
    } catch {}
  }

  return { events, remaining };
}

function getPayloadTaskId(payload) {
  const value = payload?.taskId || payload?.task_id || payload?.data?.taskId || payload?.data?.task_id;
  return typeof value === 'string' ? value : '';
}

function createAbortError() {
  if (typeof DOMException !== 'undefined') {
    return new DOMException('The operation was aborted.', 'AbortError');
  }

  const error = new Error('The operation was aborted.');
  error.name = 'AbortError';
  return error;
}

function throwIfAborted(signal) {
  if (signal?.aborted) {
    throw createAbortError();
  }
}

async function requestProxyStop({ apiEndpoint, taskId, sessionId, conversationId }) {
  if (!apiEndpoint || !taskId) return;

  try {
    await fetch(resolveStopEndpoint(apiEndpoint), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        taskId,
        sessionId,
        conversationId,
      }),
      keepalive: true,
    });
  } catch (error) {
    console.error('[AskCrystal] Stop request failed.', error);
  }
}

async function fetchProxyReply({ apiEndpoint, messages, abortSignal, conversationId, sessionId, onStatus, onDelta, onComponents }) {
  throwIfAborted(abortSignal);
  const response = await fetch(resolveStreamEndpoint(apiEndpoint), {
    method: 'POST',
    headers: {
      Accept: 'text/event-stream',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: getLastUserPrompt(messages),
      conversationId,
      sessionId,
    }),
    signal: abortSignal,
  });

  if (!response.ok) {
    let errorMessage = `Proxy returned ${response.status}`;
    try {
      const payload = await response.json();
      errorMessage = payload?.error || payload?.message || errorMessage;
    } catch {}
    throw new Error(errorMessage);
  }

  if (!response.body) {
    throw new Error('The proxy did not return a readable stream.');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let streamedAnswer = '';
  let streamedComponents = [];
  let latestConversationId = conversationId || null;

  while (true) {
    throwIfAborted(abortSignal);
    const { done, value } = await reader.read();
    if (done) break;

    throwIfAborted(abortSignal);
    buffer += decoder.decode(value, { stream: true });
    const parsed = extractSseEvents(buffer);
    buffer = parsed.remaining;

    for (const event of parsed.events) {
      throwIfAborted(abortSignal);

      if (event.event === 'status' && typeof event.payload?.message === 'string') {
        throwIfAborted(abortSignal);
        onStatus?.(event.payload);
      }

      if (event.event === 'error') {
        throw new Error(event.payload?.error || event.payload?.message || 'The proxy stream failed.');
      }

      const payloadComponents = extractChatComponentsFromPayload(event.payload);
      if (payloadComponents.length) {
        throwIfAborted(abortSignal);
        streamedComponents = mergeChatComponents(streamedComponents, payloadComponents);
        onComponents?.(streamedComponents, payloadComponents, event.payload);
        latestConversationId =
          event.payload?.conversationId || event.payload?.conversation_id || latestConversationId;
      }

      if (event.event === 'replace') {
        throwIfAborted(abortSignal);
        const replacement = getPayloadText(event.payload);
        if (replacement) {
          streamedAnswer = replacement;
          onDelta?.('', streamedAnswer, event.payload);
        }

        latestConversationId =
          event.payload?.conversationId || event.payload?.conversation_id || latestConversationId;
      }

      if (['delta', 'message', 'agent_message'].includes(event.event)) {
        throwIfAborted(abortSignal);
        const delta = getPayloadText(event.payload);
        if (delta) {
          streamedAnswer += delta;
          onDelta?.(delta, streamedAnswer, event.payload);
        }

        latestConversationId =
          event.payload?.conversationId || event.payload?.conversation_id || latestConversationId;
      }

      if (event.event === 'complete') {
        throwIfAborted(abortSignal);
        const completeAnswer = getPayloadText(event.payload);
        const finalAnswer = completeAnswer || streamedAnswer;
        const normalizedReply = normalizeAssistantReply(finalAnswer, streamedComponents);

        return {
          answer: normalizedReply.answer,
          components: normalizedReply.components,
          conversationId: event.payload?.conversationId || event.payload?.conversation_id || latestConversationId || null,
        };
      }
    }
  }

  if (streamedAnswer) {
    const normalizedReply = normalizeAssistantReply(streamedAnswer, streamedComponents);
    return {
      answer: normalizedReply.answer,
      components: normalizedReply.components,
      conversationId: latestConversationId,
    };
  }

  throw new Error('The proxy stream ended before a completion payload was received.');
}

function createMessageId(prefix = 'message') {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  messageSequence += 1;
  return `${prefix}-${Date.now()}-${messageSequence}`;
}

function createUserMessage(appendMessage) {
  return {
    id: createMessageId('user'),
    role: 'user',
    createdAt: new Date(),
    content: appendMessage.content || [],
    attachments: appendMessage.attachments || [],
    metadata: appendMessage.metadata || {
      custom: {},
    },
  };
}

function createAssistantMessage({
  id = createMessageId('assistant'),
  text = '',
  parts = null,
  components = [],
  status,
  error,
  statusText = '',
  statusStage = '',
  statusTool = '',
}) {
  return {
    id,
    role: 'assistant',
    createdAt: new Date(),
    content: Array.isArray(parts) ? parts : buildAssistantParts({ text, components }),
    status,
    metadata: {
      unstable_state: null,
      unstable_annotations: [],
      unstable_data: components,
      steps: [],
      custom: {
        ...(error ? { error } : {}),
        ...(statusText ? { statusText } : {}),
        ...(statusStage ? { statusStage } : {}),
        ...(statusTool ? { statusTool } : {}),
      },
    },
  };
}

function createCancelledAssistantMessage({ id, text = '', components = [] }) {
  const trimmedText = typeof text === 'string' ? text.trim() : '';
  const hasVisibleContent = Boolean(trimmedText) || components.length > 0;

  return createAssistantMessage({
    id,
    parts: buildAssistantParts({
      text: hasVisibleContent ? text : 'Reply stopped.',
      components,
    }),
    components,
    status: {
      type: 'incomplete',
      reason: 'cancelled',
    },
    statusText: '',
    statusStage: '',
    statusTool: '',
  });
}

function normalizeMessagesAfterCancel(nextMessages, cancelRequested) {
  if (!Array.isArray(nextMessages) || !cancelRequested || nextMessages.length === 0) {
    return Array.isArray(nextMessages) ? [...nextMessages] : [];
  }

  const normalizedMessages = [...nextMessages];
  const lastMessage = normalizedMessages[normalizedMessages.length - 1];

  if (lastMessage?.role === 'assistant' && lastMessage?.status?.type === 'running') {
    normalizedMessages[normalizedMessages.length - 1] = createCancelledAssistantMessage({
      id: lastMessage.id,
      text: extractTextFromParts(lastMessage.content || lastMessage.parts || []),
      components: lastMessage.metadata?.unstable_data || [],
    });
  }

  return normalizedMessages;
}

async function resolveReply({ config, messages, abortSignal, conversationId, sessionId, onStatus, onDelta, onComponents }) {
  const lastUserPrompt = getLastUserPrompt(messages);

  if (config.runtimeMode === 'proxy' && config.apiEndpoint) {
    try {
      return await fetchProxyReply({
        apiEndpoint: config.apiEndpoint,
        messages,
        abortSignal,
        conversationId,
        sessionId,
        onStatus,
        onDelta,
        onComponents,
      });
    } catch (error) {
      if (error?.name === 'AbortError') {
        throw error;
      }

      console.error('[AskCrystal] Proxy runtime failed.', error);
      throw error;
    }
  }

  const demoReply = buildDemoReply(lastUserPrompt, config.products);
  return {
    answer: demoReply.answer,
    components: demoReply.components || [],
    conversationId,
  };
}

function useAskCrystalRuntime(config) {
  const [messages, setMessages] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const activeRunRef = useRef(null);
  const activeAssistantIdRef = useRef('');
  const activeTaskIdRef = useRef('');
  const cancelRequestedRef = useRef(false);
  const conversationIdRef = useRef(null);
  const messagesRef = useRef(messages);
  const sessionIdRef = useRef(getBrowserSessionId());

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const replaceMessages = useCallback((nextMessages) => {
    setMessages(normalizeMessagesAfterCancel(nextMessages, cancelRequestedRef.current));
  }, []);

  const updateAssistantMessage = useCallback((assistantId, updater) => {
    setMessages((currentMessages) =>
      currentMessages.map((message) => {
        if (message.id !== assistantId) return message;
        return updater(message);
      }),
    );
  }, []);

  const onCancel = useCallback(async () => {
    const activeRun = activeRunRef.current;
    const assistantId = activeAssistantIdRef.current;
    const taskId = activeTaskIdRef.current;
    const conversationId = conversationIdRef.current;
    const sessionId = sessionIdRef.current;

    activeRun?.abort();
    cancelRequestedRef.current = true;
    setIsRunning(false);

    if (assistantId) {
      updateAssistantMessage(assistantId, (message) =>
        createCancelledAssistantMessage({
          id: message.id,
          text: extractTextFromParts(message.content || []),
          components: message.metadata?.unstable_data || [],
        }),
      );
    }

    if (!taskId || !config.apiEndpoint) return;

    await requestProxyStop({
      apiEndpoint: config.apiEndpoint,
      taskId,
      sessionId,
      conversationId,
    });
  }, [config.apiEndpoint, updateAssistantMessage]);

  const onNew = useCallback(
    async (appendMessage) => {
      if (appendMessage.role !== 'user') {
        throw new Error('AskCrystal homepage only supports user-authored messages.');
      }

      const userMessage = createUserMessage(appendMessage);
      const assistantId = createMessageId('assistant');
      const abortController = new AbortController();
      const assistantSeed = createAssistantMessage({
        id: assistantId,
        status: {
          type: 'running',
        },
        statusText: 'Tuning in...',
        statusStage: 'listen',
      });
      const conversationForReply = [...messagesRef.current, userMessage];

      activeRunRef.current = abortController;
      activeAssistantIdRef.current = assistantId;
      activeTaskIdRef.current = '';
      cancelRequestedRef.current = false;
      setIsRunning(true);
      setMessages([...conversationForReply, assistantSeed]);
      let streamedAnswer = '';
      let streamedComponents = [];

      try {
        const result = await resolveReply({
          config,
          messages: conversationForReply,
          abortSignal: abortController.signal,
          conversationId: conversationIdRef.current,
          sessionId: sessionIdRef.current,
          onStatus: (statusPayload) => {
            if (abortController.signal.aborted) return;
            const normalizedStatus = normalizeStatusPayload(statusPayload);
            if (normalizedStatus.taskId) {
              activeTaskIdRef.current = normalizedStatus.taskId;
            }
            updateAssistantMessage(assistantId, () =>
              createAssistantMessage({
                id: assistantId,
                parts: buildAssistantParts({
                  text: streamedAnswer,
                  components: streamedComponents,
                }),
                components: streamedComponents,
                status: {
                  type: 'running',
                },
                statusText: normalizedStatus.message,
                statusStage: normalizedStatus.stage,
                statusTool: normalizedStatus.tool,
              }),
            );
          },
          onDelta: (_delta, nextAnswer, eventPayload) => {
            if (abortController.signal.aborted) return;
            const nextTaskId = getPayloadTaskId(eventPayload);
            if (nextTaskId) {
              activeTaskIdRef.current = nextTaskId;
            }
            streamedAnswer = nextAnswer;
            updateAssistantMessage(assistantId, () =>
              createAssistantMessage({
                id: assistantId,
                parts: buildAssistantParts({
                  text: nextAnswer,
                  components: streamedComponents,
                }),
                components: streamedComponents,
                status: {
                  type: 'running',
                },
                statusText: '',
                statusStage: '',
                statusTool: '',
              }),
            );
          },
          onComponents: (nextComponents, _newComponents, eventPayload) => {
            if (abortController.signal.aborted) return;
            const nextTaskId = getPayloadTaskId(eventPayload);
            if (nextTaskId) {
              activeTaskIdRef.current = nextTaskId;
            }
            streamedComponents = nextComponents;
            updateAssistantMessage(assistantId, () =>
              createAssistantMessage({
                id: assistantId,
                parts: buildAssistantParts({
                  text: streamedAnswer,
                  components: nextComponents,
                }),
                components: nextComponents,
                status: {
                  type: 'running',
                },
                statusText: '',
                statusStage: '',
                statusTool: '',
              }),
            );
          },
        });

        conversationIdRef.current = result.conversationId || conversationIdRef.current;
        activeTaskIdRef.current = '';
        cancelRequestedRef.current = false;
        setMessages([
          ...conversationForReply,
          createAssistantMessage({
            id: assistantId,
            parts: buildAssistantParts({
              text: result.answer,
              components: result.components || streamedComponents,
            }),
            components: result.components || streamedComponents,
            status: {
              type: 'complete',
              reason: 'stop',
            },
          }),
        ]);
      } catch (error) {
        if (error?.name === 'AbortError') {
          activeTaskIdRef.current = '';
          setMessages([
            ...conversationForReply,
            createCancelledAssistantMessage({
              id: assistantId,
              text: streamedAnswer,
              components: streamedComponents,
            }),
          ]);
          return;
        }

        console.error('[AskCrystal] Assistant runtime failed.', error);
        activeTaskIdRef.current = '';
        cancelRequestedRef.current = false;
        setMessages([
          ...conversationForReply,
          createAssistantMessage({
            id: assistantId,
            text: 'The guide hit a runtime issue before finishing the reply. Please try again.',
            status: {
              type: 'incomplete',
              reason: 'error',
              error: error?.message || 'Unknown runtime error',
            },
            error: error?.message || 'Unknown runtime error',
          }),
        ]);
      } finally {
        if (activeRunRef.current === abortController) {
          activeRunRef.current = null;
        }
        if (activeAssistantIdRef.current === assistantId) {
          activeAssistantIdRef.current = '';
        }
        if (activeTaskIdRef.current && abortController.signal.aborted) {
          activeTaskIdRef.current = '';
        }
        setIsRunning(false);
      }
    },
    [config, updateAssistantMessage],
  );

  const store = useMemo(
    () => ({
      messages,
      isRunning,
      setMessages: replaceMessages,
      onImport: replaceMessages,
      onNew,
      onCancel,
      adapters: {
        threadList: {
          threadId: DEFAULT_THREAD_ID,
          threads: [
            {
              id: DEFAULT_THREAD_ID,
              remoteId: DEFAULT_THREAD_ID,
              title: 'AskCrystal',
            },
          ],
        },
      },
    }),
    [isRunning, messages, onCancel, onNew, replaceMessages],
  );

  return useExternalStoreRuntime(store);
}

function ProductCard({ product }) {
  return (
    <a className="ac-homepage__product-card" href={product.url} role="listitem">
      <div className="ac-homepage__product-media">
        {product.image ? (
          <img src={product.image} alt={product.title} loading="lazy" />
        ) : (
          <div className="ac-homepage__product-placeholder">Crystal</div>
        )}
      </div>
      <div className="ac-homepage__product-copy">
        <p className="ac-homepage__product-meta">{product.badge || 'Bestseller'}</p>
        <h3>{product.title}</h3>
        {product.summary ? <p>{product.summary}</p> : null}
        <div className="ac-homepage__product-row">
          <span className="ac-homepage__product-price">{product.price}</span>
          <span className="ac-homepage__product-link">View</span>
        </div>
      </div>
    </a>
  );
}

function WelcomeState({ config }) {
  const suggestions = config.suggestions.filter(Boolean);

  return (
    <div className="ac-homepage__welcome">
      <section className="ac-homepage__intro">
        <p className="ac-homepage__eyebrow">{config.eyebrow}</p>
        <h1>{config.heading}</h1>
        <p className="ac-homepage__description">{config.description}</p>

        <div className="ac-homepage__suggestions" role="list" aria-label="Suggested prompts">
          {suggestions.map((prompt) => (
            <ThreadPrimitive.Suggestion
              key={prompt}
              className="ac-homepage__suggestion"
              prompt={prompt}
              send
            >
              {prompt}
            </ThreadPrimitive.Suggestion>
          ))}
        </div>

        <div className="ac-homepage__note">
          <span className="ac-homepage__note-mark">Guide</span>
          <p>{config.note}</p>
        </div>
      </section>

      <section className="ac-homepage__shelf" aria-label="Featured products">
        <div className="ac-homepage__shelf-header">
          <div>
            <p className="ac-homepage__shelf-kicker">Storefront</p>
            <h2>{config.shelfHeading}</h2>
          </div>
          <a className="ac-homepage__browse-link" href={config.browseUrl}>
            Browse all
          </a>
        </div>

        {config.products.length ? (
          <div className="ac-homepage__product-carousel" role="list" aria-label="Featured store products">
            {config.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="ac-homepage__empty-shelf">
            Add a featured collection in the section settings to populate the welcome shelf.
          </div>
        )}
      </section>
    </div>
  );
}

function Composer() {
  const textareaRef = useRef(null);
  const [isInputOverflowing, setIsInputOverflowing] = useState(false);

  const syncComposerOverflow = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setIsInputOverflowing(false);
      return;
    }

    const nextOverflowing = textarea.scrollHeight > textarea.clientHeight + 2;
    setIsInputOverflowing((current) => (current === nextOverflowing ? current : nextOverflowing));
  }, []);

  useEffect(() => {
    const rafId = window.requestAnimationFrame(syncComposerOverflow);
    return () => window.cancelAnimationFrame(rafId);
  }, [syncComposerOverflow]);

  return (
    <ComposerPrimitive.Root className="ac-homepage__composer" aria-label="Message AskCrystal">
      <div
        className={`ac-homepage__composer-shell${isInputOverflowing ? ' ac-homepage__composer-shell--overflowing' : ''}`}
      >
        <ComposerPrimitive.Input
          ref={textareaRef}
          className="ac-homepage__composer-input"
          placeholder="What guidance or crystal do you need today?"
          minRows={1}
          maxRows={COMPOSER_MAX_ROWS}
          autoFocus={false}
          onChange={() => {
            window.requestAnimationFrame(syncComposerOverflow);
          }}
          onHeightChange={() => {
            window.requestAnimationFrame(syncComposerOverflow);
          }}
        />

        <div className="ac-homepage__composer-actions">
          <ThreadPrimitive.If running={false}>
            <ComposerPrimitive.Send className="ac-homepage__composer-send" aria-label="Send message">
              <span aria-hidden="true">↑</span>
            </ComposerPrimitive.Send>
          </ThreadPrimitive.If>

          <ThreadPrimitive.If running={true}>
            <ComposerPrimitive.Cancel className="ac-homepage__composer-cancel">
              Stop
            </ComposerPrimitive.Cancel>
          </ThreadPrimitive.If>
        </div>
      </div>
    </ComposerPrimitive.Root>
  );
}

function ComposerDock() {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className="ac-homepage__composer-dock">
      <Composer />
    </div>,
    document.body,
  );
}

function UserMessage() {
  return (
    <MessagePrimitive.Root className="ac-message ac-message--user">
      <div className="ac-message__bubble ac-message__bubble--user">
        <MessagePrimitive.Content />
      </div>
    </MessagePrimitive.Root>
  );
}

function AssistantMessage() {
  const assistantParts = useMessage((message) => message.content || message.parts || []);
  const assistantText = extractTextFromParts(assistantParts);
  const hasToolParts = assistantParts.some((part) => part.type === 'tool-call');
  const isRunning = useMessage((message) => message.status?.type === 'running');
  const statusText = useMessage((message) => message.metadata?.custom?.statusText || '');
  const statusStage = useMessage((message) => message.metadata?.custom?.statusStage || '');
  const isThinking = isRunning && !assistantText && !hasToolParts;
  const showInlineStatus = isRunning && (Boolean(assistantText) || hasToolParts) && statusStage === 'tool' && Boolean(statusText);

  return (
    <MessagePrimitive.Root className="ac-message ac-message--assistant">
      <div className="ac-message__label">AskCrystal Guide</div>
      <div className="ac-message__bubble ac-message__bubble--assistant">
        {isThinking ? (
          <ThinkingIndicator statusText={statusText} />
        ) : (
          <MessagePrimitive.Parts
            components={{
              Text: ({ text }) => <MarkdownContent text={text} />,
              ...askCrystalMessagePartComponents,
            }}
          />
        )}
      </div>
      {showInlineStatus ? (
        <div className="ac-message__status">
          <LiveStatus statusText={statusText} />
        </div>
      ) : null}
      <MessagePrimitive.Error>
        <div className="ac-message__error">The response was interrupted. You can retry from the composer below.</div>
      </MessagePrimitive.Error>
    </MessagePrimitive.Root>
  );
}

function AskCrystalThread({ config }) {
  const runtime = useAskCrystalRuntime(config);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="ac-homepage">
        <ThreadPrimitive.Root className="ac-homepage__thread">
          <ThreadPrimitive.Viewport className="ac-homepage__viewport">
            <WelcomeState config={config} />

            <div className="ac-homepage__messages">
              <ThreadPrimitive.Messages
                components={{
                  UserMessage,
                  AssistantMessage,
                }}
              />
            </div>

            <ComposerDock />
          </ThreadPrimitive.Viewport>
        </ThreadPrimitive.Root>
      </div>
    </AssistantRuntimeProvider>
  );
}

function mountElement(element) {
  const configId = element.getAttribute('data-config-id');
  const sectionId = element.getAttribute('data-section-id') || configId;

  if (!configId || rootRegistry.has(sectionId)) return;

  const config = readJsonScript(configId);
  if (!config) return;

  const root = createRoot(element);
  root.render(<AskCrystalThread config={config} />);
  rootRegistry.set(sectionId, root);
}

function unmountElement(element) {
  const sectionId = element.getAttribute('data-section-id');
  if (!sectionId) return;

  const root = rootRegistry.get(sectionId);
  if (!root) return;

  root.unmount();
  rootRegistry.delete(sectionId);
}

function mountAll(scope = document) {
  scope.querySelectorAll(MOUNT_SELECTOR).forEach((element) => mountElement(element));
}

function unmountAll(scope) {
  scope.querySelectorAll(MOUNT_SELECTOR).forEach((element) => unmountElement(element));
}

mountAll();

document.addEventListener('shopify:section:load', (event) => {
  mountAll(event.target);
});

document.addEventListener('shopify:section:unload', (event) => {
  unmountAll(event.target);
});
