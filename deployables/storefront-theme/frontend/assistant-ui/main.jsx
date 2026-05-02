import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';
import {
  AssistantRuntimeProvider,
  ComposerPrimitive,
  MessagePrimitive,
  ThreadPrimitive,
  useAssistantState,
  useMessage,
} from '@assistant-ui/react';
import { useExternalStoreRuntime } from '../../node_modules/@assistant-ui/react/dist/legacy-runtime/runtime-cores/external-store/useExternalStoreRuntime.js';
import {
  createChatComponentToolPart,
  extractChatComponentsFromPayload,
  extractInlineChatComponentManifest,
  extractInlineChatComponentSegments,
  mergeChatComponents,
  stripInlineChatComponentManifestPreview,
} from '../../../../packages/storefront-ui-contract/src/chat-components.mjs';
import { askCrystalMessagePartComponents } from './chat-components.jsx';
import './styles.css';
import './chat-components.css';

const MOUNT_SELECTOR = '[data-askcrystal-homepage-root]';
const rootRegistry = new Map();
const DEFAULT_THREAD_ID = 'askcrystal-main-thread';
const LOCAL_PROXY_ORIGIN = 'http://localhost:8787';
const EMPTY_ARRAY = Object.freeze([]);
const SESSION_STORAGE_KEY = 'askcrystal-theme-session-id';
const CHAT_SESSIONS_STORAGE_KEY = 'askcrystal-theme-chat-sessions-v1';
const ACTIVE_CHAT_SESSION_STORAGE_KEY = 'askcrystal-theme-active-session-id';
const PENDING_PROMPT_STORAGE_KEY = 'askcrystal-theme-pending-prompt-v1';
const SESSION_REGISTRY_EVENT = 'askcrystal:session-registry';
const SESSION_SELECT_EVENT = 'askcrystal:session-select';
const SESSION_CREATE_EVENT = 'askcrystal:session-create';
const SESSION_DELETE_EVENT = 'askcrystal:session-delete';
const MAX_STORED_CHAT_SESSIONS = 24;
const HOMEPAGE_BACKDROP_URL = 'https://cdn.shopify.com/s/files/1/0981/4786/0843/files/backdrop.png?v=1777102538';
let messageSequence = 0;
const COMPOSER_MAX_ROWS = 7;
const AskCrystalActionsContext = React.createContext({
  sendPrompt: () => {},
  onCancel: () => {},
  isRunning: false,
});

function useAskCrystalActions() {
  return React.useContext(AskCrystalActionsContext);
}

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
    payload?.data?.text ||
    payload?.data?.outputs?.answer ||
    payload?.data?.outputs?.text ||
    payload?.data?.outputs?.output;
  return typeof value === 'string' ? value : '';
}

function normalizeThreadSuggestions(value) {
  const rawSuggestions = Array.isArray(value)
    ? value
    : Array.isArray(value?.suggestions)
      ? value.suggestions
      : Array.isArray(value?.data)
        ? value.data
        : [];
  const seen = new Set();

  return rawSuggestions
    .map((entry) => {
      if (typeof entry === 'string') {
        return {
          prompt: entry.trim(),
        };
      }

      if (entry && typeof entry === 'object' && typeof entry.prompt === 'string') {
        return {
          prompt: entry.prompt.trim(),
        };
      }

      return null;
    })
    .filter((entry) => entry?.prompt)
    .filter((entry) => {
      const dedupeKey = entry.prompt.toLowerCase();
      if (seen.has(dedupeKey)) return false;
      seen.add(dedupeKey);
      return true;
    })
    .slice(0, 6);
}

const INLINE_SUGGESTIONS_PATTERN = /```askcrystal-suggestions\s*([\s\S]*?)```|<askcrystal-suggestions>\s*([\s\S]*?)<\/askcrystal-suggestions>/gi;
const INLINE_SUGGESTION_MARKERS = [
  '```askcrystal-suggestions',
  '<askcrystal-suggestions',
];

function parseInlineJsonPayload(rawValue) {
  try {
    return JSON.parse(rawValue);
  } catch {
    return null;
  }
}

function extractInlineSuggestions(answer = '') {
  let cleanedAnswer = String(answer || '');
  const suggestions = [];
  const matches = [...cleanedAnswer.matchAll(INLINE_SUGGESTIONS_PATTERN)];

  for (const match of matches) {
    const parsed = parseInlineJsonPayload(match[1] || match[2] || '');
    const normalized = normalizeThreadSuggestions(parsed?.suggestions || parsed || []);
    suggestions.push(...normalized);
  }

  cleanedAnswer = cleanedAnswer.replace(INLINE_SUGGESTIONS_PATTERN, '').replace(/\n{3,}/g, '\n\n').trim();

  return {
    answer: cleanedAnswer,
    suggestions: normalizeThreadSuggestions(suggestions),
  };
}

function stripInlineSuggestionsPreview(answer = '') {
  let preview = String(answer || '').replace(INLINE_SUGGESTIONS_PATTERN, '');
  const lowerPreview = preview.toLowerCase();
  const markerIndexes = INLINE_SUGGESTION_MARKERS
    .map(marker => lowerPreview.indexOf(marker))
    .filter(index => index >= 0);

  if (markerIndexes.length > 0)
    preview = preview.slice(0, Math.min(...markerIndexes));

  return preview.trimEnd();
}

function canUseLocalStorage() {
  if (typeof window === 'undefined') return false;

  try {
    return typeof window.localStorage !== 'undefined';
  } catch {
    return false;
  }
}

function readLocalStorageValue(key) {
  if (!canUseLocalStorage()) return '';

  try {
    return window.localStorage.getItem(key) || '';
  } catch {
    return '';
  }
}

function writeLocalStorageValue(key, value) {
  if (!canUseLocalStorage()) return;

  try {
    if (value === '' || value === null || value === undefined) {
      window.localStorage.removeItem(key);
      return;
    }

    window.localStorage.setItem(key, value);
  } catch {}
}

function canUseSessionStorage() {
  if (typeof window === 'undefined') return false;

  try {
    return typeof window.sessionStorage !== 'undefined';
  } catch {
    return false;
  }
}

function readSessionStorageValue(key) {
  if (!canUseSessionStorage()) return '';

  try {
    return window.sessionStorage.getItem(key) || '';
  } catch {
    return '';
  }
}

function writeSessionStorageValue(key, value) {
  if (!canUseSessionStorage()) return;

  try {
    if (value === '' || value === null || value === undefined) {
      window.sessionStorage.removeItem(key);
      return;
    }

    window.sessionStorage.setItem(key, value);
  } catch {}
}

function normalizeDisplayMode(value) {
  return value === 'chat' ? 'chat' : 'home';
}

function getUrlDisplayModeOverride() {
  if (typeof window === 'undefined') return '';

  try {
    const params = new URLSearchParams(window.location.search);
    const requestedMode = params.get('askcrystal') || params.get('mode');
    if (requestedMode === 'chat') return 'chat';
    if (requestedMode === 'home') return 'home';
  } catch {}

  return '';
}

function getEffectiveDisplayMode(config = {}) {
  return getUrlDisplayModeOverride() || normalizeDisplayMode(config.displayMode);
}

function getChatPageUrl(config = {}) {
  const configuredUrl = typeof config.chatPageUrl === 'string' ? config.chatPageUrl.trim() : '';
  return configuredUrl || '/?askcrystal=chat';
}

function handOffPromptToChatPage(config, prompt) {
  const text = typeof prompt === 'string' ? prompt.trim() : '';
  if (!text || typeof window === 'undefined') return false;

  writeSessionStorageValue(PENDING_PROMPT_STORAGE_KEY, JSON.stringify({
    prompt: text,
    createdAt: Date.now(),
  }));

  window.location.assign(getChatPageUrl(config));
  return true;
}

function consumePendingChatPrompt() {
  const rawValue = readSessionStorageValue(PENDING_PROMPT_STORAGE_KEY);
  if (!rawValue) return '';

  writeSessionStorageValue(PENDING_PROMPT_STORAGE_KEY, '');
  const payload = parseJsonValue(rawValue, null);
  const prompt = typeof payload?.prompt === 'string' ? payload.prompt.trim() : '';
  const createdAt = Number(payload?.createdAt);
  const isFresh = Number.isFinite(createdAt) ? Date.now() - createdAt < 5 * 60 * 1000 : true;

  return prompt && isFresh ? prompt : '';
}

function parseJsonValue(source, fallback) {
  if (typeof source !== 'string' || !source.trim()) return fallback;

  try {
    return JSON.parse(source);
  } catch {
    return fallback;
  }
}

function truncateText(value, maxLength = 52) {
  const normalized = typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '';
  if (!normalized) return '';
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, Math.max(1, maxLength - 1)).trimEnd()}…`;
}

function normalizeMessageForStorage(message) {
  if (!message || typeof message !== 'object') return null;

  const createdAt = message.createdAt
    ? new Date(message.createdAt)
    : new Date();
  const baseMessage = {
    ...message,
    createdAt: Number.isNaN(createdAt.getTime()) ? new Date() : createdAt,
    content: Array.isArray(message.content)
      ? message.content
      : Array.isArray(message.parts)
        ? message.parts
        : [],
    attachments: Array.isArray(message.attachments) ? message.attachments : [],
    metadata: message.metadata && typeof message.metadata === 'object'
      ? message.metadata
      : { custom: {} },
  };

  if (baseMessage.role === 'assistant' && baseMessage.status?.type === 'running') {
    return {
      ...baseMessage,
      status: {
        type: 'incomplete',
        reason: 'interrupted',
      },
      metadata: {
        ...(baseMessage.metadata || {}),
        custom: {
          ...(baseMessage.metadata?.custom || {}),
        },
      },
    };
  }

  return baseMessage;
}

function normalizeStoredMessages(messages) {
  if (!Array.isArray(messages)) return [];

  return messages
    .map(normalizeMessageForStorage)
    .filter(Boolean);
}

function getMessagePreviewText(message) {
  if (!message || typeof message !== 'object') return '';

  const parts = message.content || message.parts || [];
  const text = extractTextFromParts(Array.isArray(parts) ? parts : []);
  if (text) return text;

  if (Array.isArray(message.metadata?.unstable_data) && message.metadata.unstable_data.length > 0) {
    return message.role === 'assistant'
      ? 'Shared storefront picks and guidance.'
      : '';
  }

  return '';
}

function deriveSessionTitle(messages, fallback = 'New reading') {
  const firstUserMessage = Array.isArray(messages)
    ? messages.find(message => message?.role === 'user' && getMessagePreviewText(message))
    : null;
  const preview = getMessagePreviewText(firstUserMessage);
  return preview ? truncateText(preview, 42) : fallback;
}

function deriveSessionPreview(messages) {
  if (!Array.isArray(messages) || messages.length === 0) {
    return 'No messages yet.';
  }

  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const preview = getMessagePreviewText(messages[index]);
    if (preview) return truncateText(preview, 78);
  }

  return 'No messages yet.';
}

function getLatestMessageTimestamp(messages, fallback = null) {
  if (!Array.isArray(messages) || messages.length === 0) return fallback;

  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const candidate = messages[index]?.createdAt;
    if (!candidate) continue;
    const timestamp = new Date(candidate).toISOString();
    if (timestamp) return timestamp;
  }

  return fallback;
}

function sortSessionsByRecent(sessions) {
  return [...sessions].sort((left, right) => {
    const rightTime = new Date(right?.updatedAt || 0).getTime();
    const leftTime = new Date(left?.updatedAt || 0).getTime();
    return rightTime - leftTime;
  });
}

function createStoredChatSession(overrides = {}) {
  const now = new Date().toISOString();
  const messages = normalizeStoredMessages(overrides.messages || []);

  return {
    id: typeof overrides.id === 'string' && overrides.id ? overrides.id : createMessageId('thread'),
    title: typeof overrides.title === 'string' && overrides.title.trim()
      ? overrides.title.trim()
      : deriveSessionTitle(messages),
    createdAt: typeof overrides.createdAt === 'string' && overrides.createdAt ? overrides.createdAt : now,
    updatedAt: typeof overrides.updatedAt === 'string' && overrides.updatedAt ? overrides.updatedAt : now,
    conversationId: typeof overrides.conversationId === 'string' && overrides.conversationId
      ? overrides.conversationId
      : null,
    messages,
    suggestions: normalizeThreadSuggestions(overrides.suggestions || []),
    suggestionsMessageId: typeof overrides.suggestionsMessageId === 'string'
      ? overrides.suggestionsMessageId
      : '',
  };
}

function normalizeStoredSession(value) {
  if (!value || typeof value !== 'object') return null;

  const normalizedMessages = normalizeStoredMessages(value.messages || []);
  const createdAt = typeof value.createdAt === 'string' && value.createdAt
    ? value.createdAt
    : new Date().toISOString();
  const updatedAt = typeof value.updatedAt === 'string' && value.updatedAt
    ? value.updatedAt
    : (getLatestMessageTimestamp(normalizedMessages, createdAt) || createdAt);

  return createStoredChatSession({
    ...value,
    createdAt,
    updatedAt,
    messages: normalizedMessages,
    suggestions: normalizeThreadSuggestions(value.suggestions || []),
    suggestionsMessageId: typeof value.suggestionsMessageId === 'string'
      ? value.suggestionsMessageId
      : '',
    title: typeof value.title === 'string' && value.title.trim()
      ? value.title.trim()
      : deriveSessionTitle(normalizedMessages),
  });
}

function loadStoredChatState() {
  const storedSessions = parseJsonValue(readLocalStorageValue(CHAT_SESSIONS_STORAGE_KEY), []);
  const normalizedSessions = Array.isArray(storedSessions)
    ? storedSessions.map(normalizeStoredSession).filter(Boolean)
    : [];
  const sessions = normalizedSessions.length > 0
    ? sortSessionsByRecent(normalizedSessions).slice(0, MAX_STORED_CHAT_SESSIONS)
    : [createStoredChatSession()];
  const storedActiveSessionId = readLocalStorageValue(ACTIVE_CHAT_SESSION_STORAGE_KEY);
  const activeSessionId = sessions.some(session => session.id === storedActiveSessionId)
    ? storedActiveSessionId
    : sessions[0].id;

  return {
    sessions,
    activeSessionId,
  };
}

function persistChatState({ sessions, activeSessionId }) {
  writeLocalStorageValue(
    CHAT_SESSIONS_STORAGE_KEY,
    JSON.stringify(sortSessionsByRecent(sessions).slice(0, MAX_STORED_CHAT_SESSIONS)),
  );
  writeLocalStorageValue(ACTIVE_CHAT_SESSION_STORAGE_KEY, activeSessionId);
}

function getSessionById(sessions, sessionId) {
  if (!Array.isArray(sessions)) return null;
  return sessions.find(session => session.id === sessionId) || null;
}

function touchStoredSession(session) {
  if (!session) return null;

  return {
    ...session,
    title: deriveSessionTitle(session.messages, session.title || 'New reading'),
    updatedAt: getLatestMessageTimestamp(session.messages, new Date().toISOString()) || new Date().toISOString(),
  };
}

function upsertStoredSessionSnapshot(sessions, sessionId, updates = {}) {
  const nextSessions = [];
  let matched = false;

  for (const session of Array.isArray(sessions) ? sessions : []) {
    if (session.id !== sessionId) {
      nextSessions.push(session);
      continue;
    }

    matched = true;
    const nextMessages = updates.messages !== undefined
      ? normalizeStoredMessages(updates.messages)
      : session.messages;
    const nextSession = touchStoredSession({
      ...session,
      ...updates,
      messages: nextMessages,
      suggestions: updates.suggestions !== undefined
        ? normalizeThreadSuggestions(updates.suggestions)
        : session.suggestions,
      suggestionsMessageId: updates.suggestionsMessageId !== undefined
        ? updates.suggestionsMessageId || ''
        : session.suggestionsMessageId || '',
      conversationId: updates.conversationId !== undefined
        ? updates.conversationId || null
        : session.conversationId,
    });
    nextSessions.push(nextSession);
  }

  if (!matched) {
    nextSessions.push(touchStoredSession(createStoredChatSession({
      id: sessionId,
      ...updates,
    })));
  }

  return sortSessionsByRecent(nextSessions).slice(0, MAX_STORED_CHAT_SESSIONS);
}

function getChatSessionSummaries(sessions) {
  return sortSessionsByRecent(Array.isArray(sessions) ? sessions : []).map((session) => ({
    id: session.id,
    title: deriveSessionTitle(session.messages, session.title || 'New reading'),
    preview: deriveSessionPreview(session.messages),
    createdAt: session.createdAt,
    updatedAt: session.updatedAt,
    isEmpty: !Array.isArray(session.messages) || session.messages.length === 0,
  }));
}

function publishChatSessionRegistry({ sessions, activeSessionId, isRunning }) {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(new CustomEvent(SESSION_REGISTRY_EVENT, {
    detail: {
      sessions: getChatSessionSummaries(sessions),
      activeSessionId,
      isRunning: Boolean(isRunning),
    },
  }));
}

function closeHeaderDrawer() {
  if (typeof document === 'undefined') return;

  const container = document.getElementById('Details-menu-drawer-container');
  if (!container) return;

  const closeButton = container.querySelector('.menu-drawer__close-button');
  if (closeButton instanceof HTMLElement) {
    closeButton.click();
    return;
  }

  if ('open' in container) {
    container.open = false;
  }
  container.removeAttribute('open');
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

function parseMarkdownTableRow(line) {
  if (typeof line !== 'string' || !line.includes('|')) return [];

  const trimmed = line.trim().replace(/^\|/, '').replace(/\|$/, '');
  if (!trimmed) return [];

  return trimmed.split('|').map(cell => cell.trim());
}

function parseMarkdownTableAlignments(line) {
  const cells = parseMarkdownTableRow(line);
  if (!cells.length) return [];

  return cells.map((cell) => {
    if (/^:\-+\:$/.test(cell)) return 'center';
    if (/^\-+\:$/.test(cell)) return 'right';
    return 'left';
  });
}

function isMarkdownTableDelimiter(line) {
  const cells = parseMarkdownTableRow(line);
  return cells.length > 0 && cells.every(cell => /^:?-{3,}:?$/.test(cell));
}

function isMarkdownTableRow(line) {
  const cells = parseMarkdownTableRow(line);
  return cells.length >= 2 && cells.some(Boolean);
}

function parseMarkdownTableBlock(lines, startIndex) {
  const headerLine = lines[startIndex];
  if (!isMarkdownTableRow(headerLine)) return null;

  const headerCells = parseMarkdownTableRow(headerLine);
  const nextLine = lines[startIndex + 1];
  const hasDelimiter = isMarkdownTableDelimiter(nextLine);
  let cursor = startIndex + (hasDelimiter ? 2 : 1);
  const rows = [];

  while (cursor < lines.length && isMarkdownTableRow(lines[cursor])) {
    const rowCells = parseMarkdownTableRow(lines[cursor]);
    if (rowCells.length !== headerCells.length) break;
    rows.push(rowCells);
    cursor += 1;
  }

  if (rows.length === 0) return null;

  return {
    headers: headerCells,
    alignments: hasDelimiter ? parseMarkdownTableAlignments(nextLine) : headerCells.map(() => 'left'),
    rows,
    nextIndex: cursor,
  };
}

function isRenderableMarkdownFence(language = '') {
  return /^(?:md|markdown|mdx)$/i.test(language.trim());
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
      const fenceLanguage = fenceMatch[1] || '';
      index += 1;

      while (index < lines.length && !/^```\s*$/.test(lines[index])) {
        codeLines.push(lines[index]);
        index += 1;
      }

      if (index < lines.length) index += 1;

      if (isRenderableMarkdownFence(fenceLanguage)) {
        blocks.push(
          <div key={`markdown-fence-${index}`} className="ac-markdown__embedded">
            <MarkdownContent text={codeLines.join('\n')} />
          </div>,
        );
      } else {
        blocks.push(
          <pre key={`code-${index}`} className="ac-markdown__code-block">
            <code>{codeLines.join('\n')}</code>
          </pre>,
        );
      }
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

    if (/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
      blocks.push(<hr key={`rule-${index}`} className="ac-markdown__rule" />);
      index += 1;
      continue;
    }

    const tableBlock = parseMarkdownTableBlock(lines, index);
    if (tableBlock) {
      const { headers, alignments, rows, nextIndex } = tableBlock;
      index = nextIndex;

      blocks.push(
        <div key={`table-${index}`} className="ac-markdown__table-wrap">
          <table className="ac-markdown__table">
            <thead>
              <tr>
                {headers.map((header, headerIndex) => (
                  <th
                    key={`table-head-${index}-${headerIndex}`}
                    style={{ textAlign: alignments[headerIndex] || 'left' }}
                  >
                    {parseInlineMarkdown(header, `table-head-${index}-${headerIndex}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={`table-row-${index}-${rowIndex}`}>
                  {headers.map((_, cellIndex) => (
                    <td
                      key={`table-cell-${index}-${rowIndex}-${cellIndex}`}
                      style={{ textAlign: alignments[cellIndex] || 'left' }}
                    >
                      {parseInlineMarkdown(row[cellIndex] || '', `table-cell-${index}-${rowIndex}-${cellIndex}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
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

function decodeJsonStringLiteral(literal) {
  if (typeof literal !== 'string' || !literal) return '';

  try {
    return JSON.parse(literal);
  } catch {
    return literal.replace(/^"/, '').replace(/"$/, '');
  }
}

function decodePartialJsonString(rawValue) {
  if (typeof rawValue !== 'string' || !rawValue) return '';

  let decoded = '';
  let escaped = false;

  for (let index = 0; index < rawValue.length; index += 1) {
    const character = rawValue[index];

    if (escaped) {
      switch (character) {
        case 'n':
          decoded += '\n';
          break;
        case 'r':
          decoded += '\r';
          break;
        case 't':
          decoded += '\t';
          break;
        case '"':
          decoded += '"';
          break;
        case '\\':
          decoded += '\\';
          break;
        case '/':
          decoded += '/';
          break;
        case 'b':
          decoded += '\b';
          break;
        case 'f':
          decoded += '\f';
          break;
        case 'u': {
          const unicodeSlice = rawValue.slice(index + 1, index + 5);
          if (/^[0-9a-fA-F]{4}$/.test(unicodeSlice)) {
            decoded += String.fromCharCode(Number.parseInt(unicodeSlice, 16));
            index += 4;
          }
          break;
        }
        default:
          decoded += character;
      }

      escaped = false;
      continue;
    }

    if (character === '\\') {
      escaped = true;
      continue;
    }

    decoded += character;
  }

  return decoded;
}

function extractPartialFinalAnswerJsonString(value) {
  if (typeof value !== 'string' || !value) return '';

  const actionInputPrefixMatch = [...value.matchAll(
    /"action"\s*:\s*"Final Answer"[\s\S]*?"action_input"\s*:\s*"/gi,
  )].pop();

  if (!actionInputPrefixMatch || typeof actionInputPrefixMatch.index !== 'number') return '';

  const valueStartIndex = actionInputPrefixMatch.index + actionInputPrefixMatch[0].length;
  let cursor = valueStartIndex;
  let escaped = false;

  while (cursor < value.length) {
    const character = value[cursor];
    if (escaped) {
      escaped = false;
      cursor += 1;
      continue;
    }

    if (character === '\\') {
      escaped = true;
      cursor += 1;
      continue;
    }

    if (character === '"') break;
    cursor += 1;
  }

  const rawValue = value.slice(valueStartIndex, cursor);
  return decodePartialJsonString(rawValue).trim();
}

function extractStructuredFinalAnswer(rawValue) {
  if (typeof rawValue !== 'string') return '';

  const normalized = stripModelThinkingMarkup(rawValue)
    .replace(/<minimax:tool_call>[\s\S]*?<\/minimax:tool_call>/gi, '')
    .replace(/<invoke\b[\s\S]*?<\/invoke>/gi, '')
    .replace(/<action_input\b[^>]*>[\s\S]*?<\/action_input>/gi, '')
    .replace(/<parameter\b[^>]*>[\s\S]*?<\/parameter>/gi, '')
    .trim();

  if (!normalized) return '';

  const finalActionStringMatch = [...normalized.matchAll(
    /"action"\s*:\s*"Final Answer"[\s\S]*?"action_input"\s*:\s*("(?:\\.|[^"\\])*")/gi,
  )].pop();

  if (finalActionStringMatch?.[1]) {
    const parsed = decodeJsonStringLiteral(finalActionStringMatch[1]).trim();
    if (parsed) return parsed;
  }

  const partialJsonAnswer = extractPartialFinalAnswerJsonString(normalized);
  if (partialJsonAnswer) return partialJsonAnswer;

  const finalAnswerLabelMatch = [...normalized.matchAll(
    /(?:^|\n)\s*final answer\s*:\s*/gim,
  )].pop();

  if (typeof finalAnswerLabelMatch?.index === 'number') {
    const parsed = normalized
      .slice(finalAnswerLabelMatch.index + finalAnswerLabelMatch[0].length)
      .trim();
    if (parsed) return parsed;
  }

  return '';
}

function stripModelThinkingMarkup(value) {
  if (typeof value !== 'string') return '';

  return value
    .replace(/<think\b[^>]*>[\s\S]*?<\/think>/gi, '')
    .replace(/<thinking\b[^>]*>[\s\S]*?<\/thinking>/gi, '')
    .replace(/<reasoning\b[^>]*>[\s\S]*?<\/reasoning>/gi, '')
    .replace(/<analysis\b[^>]*>[\s\S]*?<\/analysis>/gi, '')
    .replace(/<think\b[^>]*>[\s\S]*$/gi, '')
    .replace(/<thinking\b[^>]*>[\s\S]*$/gi, '')
    .replace(/<reasoning\b[^>]*>[\s\S]*$/gi, '')
    .replace(/<analysis\b[^>]*>[\s\S]*$/gi, '');
}

function stripLeadingFinalAnswerLabel(value) {
  if (typeof value !== 'string') return '';

  let nextValue = value.replace(/^\uFEFF/, '').trimStart();
  if (!nextValue) return '';

  const normalizedPrefix = nextValue
    .slice(0, 24)
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();

  if (
    normalizedPrefix &&
    normalizedPrefix.length >= 3 &&
    normalizedPrefix.length <= 'final answer:'.length &&
    'final answer:'.startsWith(normalizedPrefix) &&
    /^[a-z:\s]+$/i.test(nextValue.trim()) &&
    nextValue.trim().length <= 24
  ) {
    return '';
  }

  const labeledMatch = [...nextValue.matchAll(/(?:^|\n)\s*final answer\s*:\s*/gim)].pop();
  if (typeof labeledMatch?.index === 'number') {
    nextValue = nextValue.slice(labeledMatch.index + labeledMatch[0].length).trimStart();
  } else {
    nextValue = nextValue.replace(/^final answer\s*:\s*/i, '');
  }

  return nextValue;
}

function sanitizeStreamingVisibleAnswer(rawAnswer) {
  if (typeof rawAnswer !== 'string') return '';

  const answer = stripInlineSuggestionsPreview(stripModelThinkingMarkup(rawAnswer))
    .replace(/<minimax:tool_call>[\s\S]*?<\/minimax:tool_call>/gi, '')
    .replace(/<invoke\b[\s\S]*?<\/invoke>/gi, '')
    .replace(/<action_input\b[^>]*>[\s\S]*?<\/action_input>/gi, '')
    .replace(/<parameter\b[^>]*>[\s\S]*?<\/parameter>/gi, '')
    .trimStart();

  if (!answer) return '';

  const structuredFinalAnswer = extractStructuredFinalAnswer(answer);
  const visibleAnswer = stripInlineSuggestionsPreview(stripLeadingFinalAnswerLabel(structuredFinalAnswer || answer));
  if (!visibleAnswer) return '';

  return visibleAnswer
    .replace(/\n{3,}/g, '\n\n')
    .trimStart();
}

function looksLikeReactTrace(value) {
  if (typeof value !== 'string') return false;

  const normalized = value.toLowerCase();
  return (
    /\bthought:\b/.test(normalized) ||
    /\bobservation:\b/.test(normalized) ||
    /\baction:\b/.test(normalized) ||
    /\bquestion:\b/.test(normalized) ||
    /"action"\s*:/.test(normalized) ||
    /\bfinal answer\b/.test(normalized)
  );
}

function looksLikeInternalReasoningParagraph(value) {
  if (typeof value !== 'string') return false;

  const normalized = value.trim().toLowerCase();
  if (!normalized) return false;

  return (
    /^(question:?|continue\b|the user wants\b|the user has provided\b|the user asked\b|user wants\b|analysis:|thought:|thinking:|observation:|action:)/.test(normalized)
    || /^(i am thinking about how to\b|i need to\b|i should\b|i have the skill guidance\b|i have the information needed\b|i have gathered information\b|i have found\b|i've found\b|i can now\b|let me\b|since the skill tool isn't available\b)/.test(normalized)
    || /^(the catalog|catalog search|previous catalog searches|the search results|searching with broader terms)\b/.test(normalized)
    || /^(search results:?|search_catalog\b|get_product_details\b|tool_call\b|catalog lookup:?|parameter name=)/.test(normalized)
    || /\bi have \w+ products?\b/.test(normalized)
  );
}

function looksLikeInternalFinalParagraph(value) {
  if (typeof value !== 'string') return false;

  const normalized = value.trim().toLowerCase();
  if (!normalized) return false;

  return (
    /^(question:?|the user wants\b|user wants\b|i need to\b|first,\s*i\b|thought:|analysis:|observation:|action:)/.test(normalized)
    || /^```(?:json|xml)?\s*[\[{<]/.test(normalized)
    || /^<(?:invoke|action_input|parameter|minimax:tool_call)\b/.test(normalized)
    || /^"(?:action|tool|tool_name|action_input)"\s*:/.test(normalized)
  );
}

function stripLeadingInternalParagraphs(value) {
  if (typeof value !== 'string') return '';

  let nextValue = value.trim();
  if (!nextValue) return '';

  const lines = nextValue.split('\n');
  let lineIndex = 0;

  while (lineIndex < lines.length) {
    const candidateLine = lines[lineIndex].trim();
    if (!candidateLine) {
      lineIndex += 1;
      continue;
    }

    if (!looksLikeInternalReasoningParagraph(candidateLine)) break;
    lineIndex += 1;
  }

  nextValue = lines.slice(lineIndex).join('\n').trim();
  if (!nextValue) return '';

  const paragraphs = nextValue
    .split(/\n{2,}/)
    .map(paragraph => paragraph.trim())
    .filter(Boolean);

  let paragraphIndex = 0;
  while (paragraphIndex < paragraphs.length && looksLikeInternalReasoningParagraph(paragraphs[paragraphIndex])) {
    paragraphIndex += 1;
  }

  return paragraphs.slice(paragraphIndex).join('\n\n').trim();
}

function parseStatusHistory(source) {
  if (Array.isArray(source)) {
    return source
      .map((entry) => (typeof entry === 'string' ? entry.trim() : ''))
      .filter(Boolean)
      .slice(-6);
  }

  if (typeof source === 'string') {
    return source
      .split('\n')
      .map(entry => entry.trim())
      .filter(Boolean)
      .slice(-6);
  }

  return [];
}

function buildThinkingTheme({ statusStage = '', statusTool = '', statusText = '' }) {
  const context = `${statusStage} ${statusTool} ${statusText}`.toLowerCase();

  if (/shopify|catalog|product|variant|collection|cart|storefront|inventory|shelf/.test(context)) {
    return [
      'Walking the crystal shelves for a close match...',
      'Comparing a few pieces against your question...',
      'Checking which crystal pieces answer most clearly...',
      'Looking for a match that feels chosen, not generic...',
      'Following the pull toward the clearest shelf match...',
    ];
  }

  if (/knowledge|dataset|retriev|document|archive|rag|kb|search|library/.test(context)) {
    return [
      'Opening the archive and brushing dust from the pages...',
      'Cross-checking older notes with your question...',
      'Pulling the clearest thread from the library...',
      'Listening where memory and meaning overlap...',
      'Letting the right fragment rise to the surface...',
    ];
  }

  if (/tarot|card|spread/.test(context)) {
    return [
      'Turning the cards one current at a time...',
      'Watching which symbols insist on being seen...',
      'Letting the spread settle before reading the pattern...',
      'Listening for the card that changes the story...',
      'Tracing the image that keeps returning to the surface...',
    ];
  }

  if (/astrology|natal|zodiac|planet|birth|horoscope|star/.test(context)) {
    return [
      'Tracing the sky-map behind your question...',
      'Checking where the planets press most strongly...',
      'Following the bright houses and quiet tensions...',
      'Listening for the weather between stars and self...',
      'Letting the chart reveal its steadier rhythm...',
    ];
  }

  if (/bazi|shushu|taibu|fengshui|yinyuan|marriage|fate|element/.test(context)) {
    return [
      'Following the hidden stems beneath the surface...',
      'Reading the timing, element, and pattern in the chart...',
      'Letting the older map reveal structure...',
      'Listening for balance inside the chart...',
      'Holding the pattern until its shape becomes clear...',
    ];
  }

  if (/crystal|stone|chakra|healing|ritual/.test(context)) {
    return [
      'Holding the stones against the shape of your question...',
      'Checking which crystal answers steadily...',
      'Listening for resonance before choosing...',
      'Feeling for the stone that calms instead of performs...',
      'Letting the ritual find its gentle center...',
    ];
  }

  if (statusStage === 'compose' || statusStage === 'thought') {
    return [
      'The pattern is surfacing...',
      'Gathering the clearest strand before I speak...',
      'Letting the reading take its proper shape...',
      'Joining symbol, shelf, and guidance...',
      'Settling into plain language...',
    ];
  }

  return [
    'Settling into the thread beneath your words...',
    'Listening for what wants to be named first...',
    'Holding the question until the noise falls away...',
    'Letting the reading gather around the clearest signal...',
    'Finding the gentlest path into the answer...',
  ];
}

function rotateSequence(sequence, offset) {
  if (!sequence.length) return [];

  const safeOffset = ((offset % sequence.length) + sequence.length) % sequence.length;
  return [...sequence.slice(safeOffset), ...sequence.slice(0, safeOffset)];
}

function deterministicJitter(seed) {
  const raw = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return raw - Math.floor(raw);
}

function interleaveThinkingSequence(ambientLines = [], toolLines = []) {
  if (!ambientLines.length) return [...new Set(toolLines.filter(Boolean))];
  if (!toolLines.length) return [...new Set(ambientLines.filter(Boolean))];

  const sequence = [ambientLines[0]];
  let ambientIndex = 1;
  let toolIndex = 0;

  while (ambientIndex < ambientLines.length || toolIndex < toolLines.length) {
    if (ambientIndex < ambientLines.length) {
      sequence.push(ambientLines[ambientIndex]);
      ambientIndex += 1;
    }

    if (toolIndex < toolLines.length) {
      sequence.push(toolLines[toolIndex]);
      toolIndex += 1;
    }
  }

  return [...new Set(sequence.filter(Boolean))];
}

function getAmbientThinkingLine({ statusText = '', statusStage = '', ambientStatusText = '', hasToolActivity = false }) {
  if (ambientStatusText) return ambientStatusText;
  if (statusStage && statusStage !== 'tool' && statusText) return statusText;
  return hasToolActivity ? 'Following the clearest thread...' : 'Settling into your energy...';
}

function getThinkingSequence({
  statusText = '',
  statusHistoryText = '',
  statusStage = '',
  statusTool = '',
  ambientStatusText = '',
}) {
  const toolHistory = parseStatusHistory(statusHistoryText);
  const toolLines = [];

  if (statusStage === 'tool' && statusText) {
    toolLines.push(statusText);
  }

  toolHistory.forEach((line) => {
    if (!toolLines.includes(line)) {
      toolLines.push(line);
    }
  });

  const ambientLine = getAmbientThinkingLine({
    statusText,
    statusStage,
    ambientStatusText,
    hasToolActivity: toolLines.length > 0,
  });
  const ambientStage = statusStage && statusStage !== 'tool'
    ? statusStage
    : toolLines.length > 0
      ? 'compose'
      : statusStage;
  const ambientTheme = buildThinkingTheme({
    statusStage: ambientStage,
    statusTool: toolLines.length > 0 ? '' : statusTool,
    statusText: ambientLine,
  });
  const rotationSeed = Math.round(
    deterministicJitter(
      ambientLine.length
      + (toolLines.join('').length * 0.5)
      + ambientTheme.length,
    ) * 100,
  );
  const rotatedAmbientTheme = rotateSequence(ambientTheme, rotationSeed);

  return interleaveThinkingSequence([ambientLine, ...rotatedAmbientTheme], toolLines);
}

function getThinkingLineDelay(line = '', stepIndex = 0) {
  const trimmed = typeof line === 'string' ? line.trim() : '';
  const baseDelay = 1040;
  const punctuationPause = /[.!?。！？]$/.test(trimmed)
    ? 220
    : /[,;:，；：]$/.test(trimmed)
      ? 120
      : 0;
  const lengthBias = Math.min(320, Math.max(0, trimmed.length * 6));
  const jitter = Math.round((deterministicJitter(stepIndex + trimmed.length) - 0.5) * 220);
  return Math.max(880, baseDelay + punctuationPause + lengthBias + jitter);
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    handleChange();

    mediaQuery.addEventListener?.('change', handleChange);
    return () => mediaQuery.removeEventListener?.('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

function ThinkingIndicator({
  statusText,
  statusHistoryText = '',
  statusStage = '',
  statusTool = '',
  ambientStatusText = '',
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const thinkingSequence = useMemo(
    () => getThinkingSequence({
      statusText,
      statusHistoryText,
      statusStage,
      statusTool,
      ambientStatusText,
    }),
    [ambientStatusText, statusHistoryText, statusStage, statusText, statusTool],
  );
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const [isTrackResetting, setIsTrackResetting] = useState(false);
  const displaySequence = useMemo(() => {
    if (thinkingSequence.length <= 2) return thinkingSequence;
    return [...thinkingSequence, ...thinkingSequence.slice(0, 2)];
  }, [thinkingSequence]);

  useEffect(() => {
    setSequenceIndex(0);
    setIsTrackResetting(true);
    const rafId = window.requestAnimationFrame(() => {
      setIsTrackResetting(false);
    });
    return () => window.cancelAnimationFrame(rafId);
  }, [thinkingSequence]);

  useEffect(() => {
    if (prefersReducedMotion || thinkingSequence.length <= 2) return undefined;
    if (sequenceIndex >= thinkingSequence.length) return undefined;

    let timeoutId;
    let cancelled = false;

    const nextIndex = sequenceIndex + 1;
    const nextLine = displaySequence[nextIndex] || '';
    timeoutId = window.setTimeout(() => {
      if (cancelled) return;
      setSequenceIndex(nextIndex);
    }, getThinkingLineDelay(nextLine, sequenceIndex));

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [displaySequence, prefersReducedMotion, sequenceIndex, thinkingSequence.length]);

  useEffect(() => {
    if (prefersReducedMotion || thinkingSequence.length <= 2) return undefined;
    if (sequenceIndex < thinkingSequence.length) return undefined;

    const timeoutId = window.setTimeout(() => {
      setIsTrackResetting(true);
      setSequenceIndex(0);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setIsTrackResetting(false);
        });
      });
    }, 720);

    return () => window.clearTimeout(timeoutId);
  }, [prefersReducedMotion, sequenceIndex, thinkingSequence.length]);

  const visibleHistory = prefersReducedMotion || thinkingSequence.length <= 2
    ? thinkingSequence.slice(0, 2)
    : [
        thinkingSequence[sequenceIndex % thinkingSequence.length],
        thinkingSequence[(sequenceIndex + 1) % thinkingSequence.length],
      ].filter(Boolean);
  const announcedStatus = statusText || visibleHistory[visibleHistory.length - 1] || 'Settling into your energy...';

  return (
    <div className="ac-thinking">
      <span className="visually-hidden" role="status" aria-live="polite">
        {announcedStatus}
      </span>
      <div className="ac-thinking__lead" aria-hidden="true">
        <span className="ac-thinking__orb" />
        <span className="ac-thinking__dots">
          <span />
          <span />
          <span />
        </span>
      </div>
      <div className="ac-thinking__trail" aria-hidden="true">
        {prefersReducedMotion || thinkingSequence.length <= 2 ? (
          visibleHistory.map((line, index) => (
            <div
              key={`${line}-${index}`}
              className={`ac-thinking__line${index === visibleHistory.length - 1 ? ' is-current' : ''}`}
            >
              {line}
            </div>
          ))
        ) : (
          <div
            className={`ac-thinking__track${isTrackResetting ? ' is-resetting' : ''}`}
            style={{ transform: `translateY(calc(var(--ac-thinking-line-step) * -${sequenceIndex}))` }}
          >
            {displaySequence.map((line, index) => (
              <div key={`${line}-${index}`} className="ac-thinking__line">
                {line}
              </div>
            ))}
          </div>
        )}
      </div>
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

function AmbientProgressLine({
  statusText,
  statusStage = '',
  statusTool = '',
  ambientStatusText = '',
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const ambientLines = useMemo(() => {
    const ambientLine = getAmbientThinkingLine({
      statusText,
      statusStage,
      ambientStatusText,
      hasToolActivity: statusStage === 'tool',
    });
    const theme = buildThinkingTheme({
      statusStage: statusStage === 'tool' ? 'compose' : statusStage,
      statusTool,
      statusText: ambientLine,
    });

    return [...new Set([ambientLine, ...theme].filter(Boolean))];
  }, [ambientStatusText, statusStage, statusText, statusTool]);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    setLineIndex(0);
  }, [ambientLines]);

  useEffect(() => {
    if (prefersReducedMotion || ambientLines.length <= 1) return undefined;

    const timeoutId = window.setTimeout(() => {
      setLineIndex((currentIndex) => (currentIndex + 1) % ambientLines.length);
    }, 7200);

    return () => window.clearTimeout(timeoutId);
  }, [ambientLines.length, lineIndex, prefersReducedMotion]);

  return (
    <p className="ac-progress-card__ambient">
      {ambientLines[lineIndex] || 'The reading is still moving...'}
    </p>
  );
}

function getProgressExpectation(elapsedMs) {
  if (elapsedMs >= 55000) {
    return 'This reading is taking the longer orbit, but the thread is still moving.';
  }

  if (elapsedMs >= 30000) {
    return 'Detailed chart work can need a fuller minute to cross-check timing, symbols, and shelf.';
  }

  if (elapsedMs >= 12000) {
    return 'Deeper readings sometimes need a few more breaths before they become useful.';
  }

  if (elapsedMs >= 4000) {
    return 'Following the strongest thread.';
  }

  return 'The first signs are arriving.';
}

const READING_PROGRESS_DEEPENING_LINES = [
  'Reading the pattern field...',
  'Following the strongest thread...',
  'Cross-checking the signals...',
  'Letting the guidance take shape...',
];

function getReadingFocusLabel({ userPrompt = '', statusText = '', progressLabel = '' }) {
  const context = normalizeProgressSearchText(`${userPrompt} ${statusText} ${progressLabel}`);

  if (/horoscope|zodiac|aries|taurus|gemini|cancer|leo|virgo|libra|scorpio|sagittarius|capricorn|aquarius|pisces|daily|weekly|monthly/.test(context)) {
    return 'Daily guidance';
  }

  if (/bazi|four pillars|day master|element|heavenly stem|earthly branch|birth time|birthday/.test(context)) {
    return 'Elemental structure';
  }

  if (/tarot|card|spread|draw/.test(context)) {
    return 'Symbolic spread';
  }

  if (/fengshui|feng shui|room|desk|bedroom|home|space|placement/.test(context)) {
    return 'Space harmony';
  }

  if (/relationship|love|partner|match|compatib|marriage|yinyuan|connection|dating/.test(context)) {
    return 'Relationship pattern';
  }

  if (/numerology|number|shushu|life path|name/.test(context)) {
    return 'Number pattern';
  }

  if (/crystal|stone|necklace|bracelet|ring|earring|shop|product|gift|buy|cart/.test(context)) {
    return 'Crystal match';
  }

  if (/sleep|rest|dream|insomnia|calm|anxiety|stress|peace/.test(context)) {
    return 'Rest & calm';
  }

  if (/protect|protection|ground|grounding|safe|stability|negative/.test(context)) {
    return 'Grounding & protection';
  }

  if (/career|work|job|business|direction|decision|choice|path|future/.test(context)) {
    return 'Direction & momentum';
  }

  if (/money|abundance|wealth|prosperity|success|confidence/.test(context)) {
    return 'Abundance focus';
  }

  if (/heart|heal|healing|emotion|clarity|grief|breakup/.test(context)) {
    return 'Emotional clarity';
  }

  return 'Current question';
}

function getReadingSignalPhase({ elapsedMs = 0, statusStage = '', hasProgress = false }) {
  if (statusStage === 'compose' || elapsedMs >= 20000) return 'materializing';
  if (hasProgress || statusStage === 'tool') return 'tool-aware';
  if (elapsedMs >= 1800) return 'deepening';
  return 'settling';
}

function getReadingSignalIntensity(phase) {
  if (phase === 'tool-aware') return 'focused';
  if (phase === 'materializing') return 'resolving';
  if (phase === 'deepening') return 'active';
  return 'quiet';
}

function getReadingSignalLines({ phase, elapsedMs = 0, progressLabel = '' }) {
  if (phase === 'materializing') {
    return elapsedMs >= 32000 ? ['Almost ready'] : ['Shaping your guidance...'];
  }

  if (phase === 'tool-aware' && progressLabel) {
    return [
      progressLabel,
      'Cross-checking the strongest signal...',
      'Letting the pattern resolve...',
    ];
  }

  if (phase === 'deepening') {
    return READING_PROGRESS_DEEPENING_LINES;
  }

  return ['Tuning into your current state...'];
}

function ReadingProgressExperience({
  statusText,
  statusHistoryText = '',
  statusStage = '',
  statusTool = '',
  ambientStatusText = '',
  statusElapsedMs = 0,
  progressEntries = [],
  userPrompt = '',
  isExiting = false,
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const startedAtRef = useRef(Date.now());
  const [localElapsedMs, setLocalElapsedMs] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [lineTransition, setLineTransition] = useState({
    current: 'Tuning into your current state...',
    previous: '',
    key: 0,
  });

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setLocalElapsedMs(Date.now() - startedAtRef.current);
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const elapsedMs = Math.max(Number(statusElapsedMs) || 0, localElapsedMs);
  const normalizedProgressEntries = useMemo(
    () => normalizeMaskedProgressEntries(progressEntries),
    [progressEntries],
  );
  const latestProgress = normalizedProgressEntries.find(entry => entry.isCurrent)
    || normalizedProgressEntries[normalizedProgressEntries.length - 1]
    || null;
  const statusHistory = parseStatusHistory(statusHistoryText);
  const latestHistoryLine = statusHistory[statusHistory.length - 1] || '';
  const safeProgressLabel = latestProgress?.label || latestHistoryLine || '';
  const hasProgress = Boolean(safeProgressLabel);
  const phase = getReadingSignalPhase({ elapsedMs, statusStage, hasProgress });
  const visualIntensity = getReadingSignalIntensity(phase);
  const signalLines = useMemo(
    () => getReadingSignalLines({ phase, elapsedMs, progressLabel: safeProgressLabel }),
    [elapsedMs, phase, safeProgressLabel],
  );
  const focusLabel = getReadingFocusLabel({
    userPrompt,
    statusText: ambientStatusText || statusText,
    progressLabel: safeProgressLabel,
  });
  const showFocus = elapsedMs >= 6500 || hasProgress;
  const currentLine = signalLines[Math.min(lineIndex, signalLines.length - 1)] || signalLines[0] || 'Tuning into your current state...';

  useEffect(() => {
    setLineIndex(0);
  }, [phase, safeProgressLabel]);

  useEffect(() => {
    if (prefersReducedMotion || signalLines.length <= 1) return undefined;

    const timeoutId = window.setTimeout(() => {
      setLineIndex((currentIndex) => (currentIndex + 1) % signalLines.length);
    }, 2200);

    return () => window.clearTimeout(timeoutId);
  }, [lineIndex, prefersReducedMotion, signalLines.length]);

  useEffect(() => {
    setLineTransition((currentTransition) => {
      if (currentTransition.current === currentLine) return currentTransition;

      return {
        current: currentLine,
        previous: prefersReducedMotion ? '' : currentTransition.current,
        key: currentTransition.key + 1,
      };
    });
  }, [currentLine, prefersReducedMotion]);

  useEffect(() => {
    if (!lineTransition.previous) return undefined;

    const timeoutId = window.setTimeout(() => {
      setLineTransition((currentTransition) => (
        currentTransition.key === lineTransition.key
          ? { ...currentTransition, previous: '' }
          : currentTransition
      ));
    }, 560);

    return () => window.clearTimeout(timeoutId);
  }, [lineTransition.key, lineTransition.previous]);

  return (
    <div
      className={[
        'ac-reading-progress',
        `ac-reading-progress--${phase}`,
        `ac-reading-progress--${visualIntensity}`,
        isExiting ? 'ac-reading-progress--exiting' : '',
      ].join(' ')}
      role="status"
      aria-live="polite"
    >
      <span className="visually-hidden">{currentLine}</span>
      <div className="ac-reading-progress__header" aria-hidden="true">
        <p>✦ Interpreting your energy</p>
        <span>{phase === 'materializing' ? 'Signal resolving' : 'Reading session'}</span>
      </div>

      <div className="ac-reading-progress__instrument" aria-hidden="true">
        <span className="ac-reading-progress__aurora" />
        <span className="ac-reading-progress__goldfield" />
        <span className="ac-reading-progress__ring ac-reading-progress__ring--outer" />
        <span className="ac-reading-progress__ring ac-reading-progress__ring--middle" />
        <span className="ac-reading-progress__ring ac-reading-progress__ring--inner" />
        <span className="ac-reading-progress__constellation">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className="ac-reading-progress__beam ac-reading-progress__beam--one" />
        <span className="ac-reading-progress__beam ac-reading-progress__beam--two" />
        <span className="ac-reading-progress__aperture">
          <span />
        </span>
      </div>

      <div className="ac-reading-progress__copy">
        <p className="ac-reading-progress__line" aria-hidden="true">
          {lineTransition.previous ? (
            <span
              key={`previous-${lineTransition.key}`}
              className="ac-reading-progress__line-text ac-reading-progress__line-text--previous"
            >
              {lineTransition.previous}
            </span>
          ) : null}
          <span
            key={`current-${lineTransition.key}`}
            className="ac-reading-progress__line-text ac-reading-progress__line-text--current"
          >
            {lineTransition.current}
          </span>
        </p>
        {showFocus ? (
          <div className="ac-reading-progress__focus" aria-hidden="true">
            <span>Signal focus</span>
            <strong>{focusLabel}</strong>
          </div>
        ) : null}
      </div>
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
      elapsedMs: 0,
    };
  }

  if (typeof payload === 'string') {
    return {
      stage: '',
      tool: '',
      message: payload,
      taskId: '',
      elapsedMs: 0,
    };
  }

  const elapsedMs = Number(payload.elapsedMs);

  return {
    stage: typeof payload.stage === 'string' ? payload.stage : '',
    tool: typeof payload.tool === 'string' ? payload.tool : '',
    message: typeof payload.message === 'string' ? payload.message : '',
    taskId: getPayloadTaskId(payload),
    elapsedMs: Number.isFinite(elapsedMs) ? Math.max(0, elapsedMs) : 0,
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

function sanitizeAssistantText(rawAnswer) {
  const answer = typeof rawAnswer === 'string' ? rawAnswer.trim() : '';
  if (!answer) return '';

  const structuredFinalAnswer = extractStructuredFinalAnswer(answer);
  const sourceAnswer = stripInlineSuggestionsPreview(structuredFinalAnswer || answer);

  const cleaned = stripModelThinkingMarkup(sourceAnswer)
    .replace(/<minimax:tool_call>[\s\S]*?<\/minimax:tool_call>/gi, '')
    .replace(/<invoke\b[\s\S]*?<\/invoke>/gi, '')
    .replace(/<action_input\b[^>]*>[\s\S]*?<\/action_input>/gi, '')
    .replace(/<parameter\b[^>]*>[\s\S]*?<\/parameter>/gi, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  if (!structuredFinalAnswer && looksLikeReactTrace(cleaned)) {
    return '';
  }

  if (cleaned) {
    const energyBlueprintIndex = cleaned.search(/(?:\*\*energy blueprint(?:\*\*)?|\benergy blueprint\s*:)/i);
    const strippedAnswer = stripLeadingInternalParagraphs(cleaned);
    const candidateAnswer = energyBlueprintIndex >= 0
      ? cleaned.slice(energyBlueprintIndex).trim()
      : (strippedAnswer || cleaned);

    const paragraphs = candidateAnswer
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

    const visibleParagraphs = paragraphs.filter((paragraph) => {
      return !looksLikeInternalFinalParagraph(paragraph);
    });

    const visibleAnswer = (visibleParagraphs.length > 0 ? visibleParagraphs.join('\n\n') : candidateAnswer).trim();
    if (visibleAnswer && !looksLikeInternalFinalParagraph(visibleAnswer)) {
      return visibleAnswer;
    }
  }

  return '';
}

function sanitizeAssistantAnswer(rawAnswer) {
  const sanitizedAnswer = sanitizeAssistantText(rawAnswer);
  if (sanitizedAnswer) {
    return sanitizedAnswer;
  }

  return [
    'AskCrystal finished the request, but the final guidance was not readable.',
    'Please try once more, or ask the question in a slightly simpler way so the reading can come through cleanly.',
  ].join('\n\n');
}

function normalizeAssistantReply(rawAnswer, incomingComponents = []) {
  const suggestionManifest = extractInlineSuggestions(rawAnswer);
  const manifest = extractInlineChatComponentManifest(suggestionManifest.answer);
  const components = mergeChatComponents(incomingComponents, manifest.components);
  const answer = sanitizeAssistantAnswer(manifest.answer);
  const suggestions = suggestionManifest.suggestions;

  if (answer) {
    return {
      answer,
      components,
      suggestions,
      sourceText: typeof rawAnswer === 'string' && rawAnswer.trim() ? rawAnswer : answer,
    };
  }

  if (components.length > 0) {
    return {
      answer: 'I found a store-backed match for you below.',
      components,
      suggestions,
      sourceText: typeof rawAnswer === 'string' && rawAnswer.trim() ? rawAnswer : 'I found a store-backed match for you below.',
    };
  }

  return {
    answer: 'AskCrystal finished the request, but no guidance text came back. Please try again.',
    components: [],
    suggestions,
    sourceText: 'AskCrystal finished the request, but no guidance text came back. Please try again.',
  };
}

function buildAssistantParts({ text = '', components = [] } = {}) {
  const sourceText = typeof text === 'string' ? text : '';
  const inlineManifest = extractInlineChatComponentManifest(sourceText);
  const mergedComponents = mergeChatComponents(components, inlineManifest.components);
  const inlineSegments = extractInlineChatComponentSegments(sourceText);
  const parts = [];
  const usedComponentKeys = new Set();
  const partRegistry = new Map();

  const createToolKey = (part) => `${part.toolName}:${part.toolCallId}`;

  for (const component of mergedComponents) {
    const part = createChatComponentToolPart(component);
    if (!part) continue;
    partRegistry.set(createToolKey(part), part);
  }

  const appendTextPart = (value) => {
    const previewText = stripInlineSuggestionsPreview(stripInlineChatComponentManifestPreview(value)).trim();
    const nextText = sanitizeAssistantText(previewText);

    if (!nextText) return;

    const previousPart = parts[parts.length - 1];
    if (previousPart?.type === 'text') {
      previousPart.text = `${previousPart.text}\n\n${nextText}`.trim();
      return;
    }

    parts.push({
      type: 'text',
      text: nextText,
    });
  };

  const appendComponentParts = (values) => {
    for (const value of values) {
      const part = createChatComponentToolPart(value);
      if (!part) continue;

      const partKey = createToolKey(part);
      if (usedComponentKeys.has(partKey)) continue;

      parts.push(partRegistry.get(partKey) || part);
      usedComponentKeys.add(partKey);
    }
  };

  if (inlineSegments.some(segment => segment.type === 'payload')) {
    for (const segment of inlineSegments) {
      if (segment.type === 'text') {
        appendTextPart(segment.value);
        continue;
      }

      appendComponentParts(extractChatComponentsFromPayload(segment.value));
    }
  } else {
    appendTextPart(sourceText);
  }

  for (const part of partRegistry.values()) {
    const partKey = createToolKey(part);
    if (usedComponentKeys.has(partKey)) continue;
    parts.push(part);
  }

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

function resolveProxyRootEndpoint(apiEndpoint) {
  if (!apiEndpoint) return '';

  return apiEndpoint
    .replace(/\/$/, '')
    .replace(/\/(?:stream|stop|suggestions)$/, '')
    .replace(/\/chat$/, '');
}

function resolveIdentityBootstrapEndpoint(apiEndpoint) {
  if (!apiEndpoint) return '';

  const identityEndpoint = `${resolveProxyRootEndpoint(apiEndpoint)}/identity/bootstrap`;
  return resolveApiEndpoint(identityEndpoint);
}

function resolveThreadMessagesEndpoint(apiEndpoint) {
  if (!apiEndpoint) return '';

  const threadMessagesEndpoint = `${resolveProxyRootEndpoint(apiEndpoint)}/threads/messages`;
  return resolveApiEndpoint(threadMessagesEndpoint);
}

function isShopifyHtmlFallback(text) {
  return /<html[\s>]/i.test(text || '') && /powered-by:\s*Shopify|cdn\/shop|shopify-section/i.test(text || '');
}

async function buildProxyFailureMessage(response) {
  const fallbackMessage = `Proxy returned ${response.status}`;
  const contentType = response.headers.get('content-type') || '';
  const responseClone = response.clone();

  if (contentType.includes('application/json')) {
    try {
      const payload = await response.json();
      return payload?.error || payload?.message || fallbackMessage;
    } catch {}
  }

  let responseText = '';
  try {
    responseText = await responseClone.text();
  } catch {}

  if (isShopifyHtmlFallback(responseText)) {
    return 'AskCrystal proxy is not connected. Shopify is serving the storefront page for /apps/askcrystal instead of forwarding the request to the app proxy.';
  }

  return fallbackMessage;
}

function getBrowserSessionId() {
  if (typeof window === 'undefined') {
    return 'askcrystal-theme-preview';
  }

  const existingId = readLocalStorageValue(SESSION_STORAGE_KEY);
  if (existingId) return existingId;

  const sessionId = createMessageId('session');
  writeLocalStorageValue(SESSION_STORAGE_KEY, sessionId);
  return sessionId;
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

function getPayloadMessageId(payload) {
  const value = payload?.messageId || payload?.message_id || payload?.data?.messageId || payload?.data?.message_id;
  return typeof value === 'string' ? value : '';
}

function getLatestAssistantMessageId(messages = []) {
  if (!Array.isArray(messages)) return '';

  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index];
    if (message?.role === 'assistant') {
      return typeof message.id === 'string' ? message.id : '';
    }
  }

  return '';
}

function normalizeSuggestionEventPayload(payload) {
  return normalizeThreadSuggestions(
    payload?.suggestions
    || payload?.data?.suggestions
    || payload?.data
    || [],
  );
}

function mergeThreadSuggestions(currentSuggestions = [], incomingSuggestions = []) {
  return normalizeThreadSuggestions([
    ...normalizeThreadSuggestions(currentSuggestions),
    ...normalizeThreadSuggestions(incomingSuggestions),
  ]);
}

async function drainTrailingSuggestionEvents({
  reader,
  decoder,
  initialBuffer = '',
  abortSignal,
  initialSuggestions = [],
  messageId = '',
  onSuggestions,
}) {
  if (!reader || !decoder) {
    return {
      suggestions: normalizeThreadSuggestions(initialSuggestions),
      messageId,
    };
  }

  let buffer = initialBuffer;
  let currentSuggestions = normalizeThreadSuggestions(initialSuggestions);
  let currentMessageId = messageId;

  const publishSuggestions = (payload) => {
    const nextSuggestions = mergeThreadSuggestions(currentSuggestions, normalizeSuggestionEventPayload(payload));
    if (nextSuggestions.length === currentSuggestions.length) return;

    currentSuggestions = nextSuggestions;
    currentMessageId = getPayloadMessageId(payload) || currentMessageId;
    onSuggestions?.(currentSuggestions, currentMessageId);
  };

  try {
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
        if (event.event === 'suggestions') {
          publishSuggestions(event.payload);
        }
      }
    }

    const tail = decoder.decode();
    if (tail || buffer) {
      const parsed = extractSseEvents(`${buffer}${tail}\n\n`);
      for (const event of parsed.events) {
        if (event.event === 'suggestions') {
          publishSuggestions(event.payload);
        }
      }
    }
  } catch (error) {
    if (error?.name !== 'AbortError') {
      console.warn('[AskCrystal] Late suggestion stream could not be drained.', error);
    }
  }

  return {
    suggestions: currentSuggestions,
    messageId: currentMessageId,
  };
}

function getDifyEventName(payload) {
  const value = payload?.event || payload?.data?.event;
  return typeof value === 'string' ? value : '';
}

function getDifyToolName(payload) {
  if (typeof payload?.tool === 'string' && payload.tool) return payload.tool;
  if (typeof payload?.tool_name === 'string' && payload.tool_name) return payload.tool_name;
  if (payload?.tool_labels && typeof payload.tool_labels === 'object') {
    const label = Object.values(payload.tool_labels).find(value => typeof value === 'string' && value);
    if (typeof label === 'string') return label;
  }
  return '';
}

function normalizeDifyThoughtPayload(payload) {
  if (!payload || typeof payload !== 'object') return null;

  const thought = typeof payload.thought === 'string'
    ? payload.thought.trim()
    : typeof payload.data?.thought === 'string'
      ? payload.data.thought.trim()
      : '';
  const tool = getDifyToolName(payload).trim();
  const toolInput = typeof payload.tool_input === 'string'
    ? payload.tool_input
    : typeof payload.toolInput === 'string'
      ? payload.toolInput
      : typeof payload.data?.tool_input === 'string'
        ? payload.data.tool_input
      : '';
  const observation = typeof payload.observation === 'string'
    ? payload.observation
    : typeof payload.data?.observation === 'string'
      ? payload.data.observation
      : '';

  if (!thought && !tool && !toolInput && !observation) return null;

  const messageId = getPayloadMessageId(payload);
  const taskId = getPayloadTaskId(payload);
  const position = Number.isFinite(Number(payload.position)) ? Number(payload.position) : null;
  const id = typeof payload.id === 'string' && payload.id
    ? payload.id
    : `${messageId || taskId || 'thought'}:${position ?? 0}`;

  return {
    id,
    position,
    thought,
    tool,
    toolInput,
    observation,
    messageId,
    taskId,
    sourceEvent: typeof payload.sourceEvent === 'string' ? payload.sourceEvent : getDifyEventName(payload),
  };
}

function normalizeDifyThoughtList(value) {
  if (!Array.isArray(value)) return [];

  return value
    .map(normalizeDifyThoughtPayload)
    .filter(Boolean);
}

function mergeDifyThoughts(currentThoughts, incomingPayload) {
  const incomingThought = normalizeDifyThoughtPayload(incomingPayload);
  if (!incomingThought) return normalizeDifyThoughtList(currentThoughts);

  const thoughts = normalizeDifyThoughtList(currentThoughts);
  const matchingIndex = thoughts.findIndex((thought) => {
    if (thought.id && incomingThought.id && thought.id === incomingThought.id) return true;
    if (thought.position !== null && incomingThought.position !== null && thought.position === incomingThought.position) return true;
    return false;
  });

  if (matchingIndex >= 0) {
    thoughts[matchingIndex] = {
      ...thoughts[matchingIndex],
      ...incomingThought,
      thought: incomingThought.thought || thoughts[matchingIndex].thought,
      toolInput: incomingThought.toolInput || thoughts[matchingIndex].toolInput,
      observation: incomingThought.observation || thoughts[matchingIndex].observation,
    };
    return thoughts;
  }

  return [...thoughts, incomingThought];
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

async function requestProxyStop({ apiEndpoint, taskId, sessionId, conversationId, storefrontSessionId }) {
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
        storefrontSessionId,
      }),
      keepalive: true,
    });
  } catch (error) {
    console.error('[AskCrystal] Stop request failed.', error);
  }
}

async function fetchIdentityBootstrap({ apiEndpoint, sessionId }) {
  if (!apiEndpoint || !sessionId) return null;

  try {
    const url = new URL(resolveIdentityBootstrapEndpoint(apiEndpoint), window.location.origin);
    url.searchParams.set('guestToken', sessionId);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('[AskCrystal] Identity bootstrap failed.', error);
    return null;
  }
}

async function fetchPersistedThreadMessages({ apiEndpoint, sessionId, storefrontSessionId }) {
  if (!apiEndpoint || !sessionId || !storefrontSessionId) return null;

  try {
    const url = new URL(resolveThreadMessagesEndpoint(apiEndpoint), window.location.origin);
    url.searchParams.set('guestToken', sessionId);
    url.searchParams.set('storefrontSessionId', storefrontSessionId);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

async function fetchProxyReply({ apiEndpoint, messages, abortSignal, conversationId, sessionId, storefrontSessionId, onStatus, onThought, onDelta, onSuggestions }) {
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
      storefrontSessionId,
    }),
    signal: abortSignal,
  });

  if (!response.ok) {
    throw new Error(await buildProxyFailureMessage(response));
  }

  if (!response.body) {
    throw new Error('The proxy did not return a readable stream.');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let streamedRawAnswer = '';
  let bufferedAnswer = '';
  let streamedThoughts = [];
  let streamedSuggestions = [];
  let latestConversationId = conversationId || null;

  while (true) {
    throwIfAborted(abortSignal);
    const { done, value } = await reader.read();
    if (done) break;

    throwIfAborted(abortSignal);
    buffer += decoder.decode(value, { stream: true });
    const parsed = extractSseEvents(buffer);
    buffer = parsed.remaining;

    for (let eventIndex = 0; eventIndex < parsed.events.length; eventIndex += 1) {
      const event = parsed.events[eventIndex];
      throwIfAborted(abortSignal);

      if (event.event === 'status' && typeof event.payload?.message === 'string') {
        throwIfAborted(abortSignal);
        onStatus?.(event.payload);
      }

      if (event.event === 'thought') {
        throwIfAborted(abortSignal);
        streamedThoughts = mergeDifyThoughts(streamedThoughts, event.payload);
        onThought?.(event.payload);
        latestConversationId =
          event.payload?.conversationId || event.payload?.conversation_id || latestConversationId;
      }

      if (event.event === 'error') {
        throw new Error(event.payload?.error || event.payload?.message || 'The proxy stream failed.');
      }

      if (event.event === 'suggestions') {
        streamedSuggestions = mergeThreadSuggestions(streamedSuggestions, normalizeSuggestionEventPayload(event.payload));
        onSuggestions?.(streamedSuggestions, getPayloadMessageId(event.payload) || '');
        continue;
      }

      if (event.event === 'replace') {
        throwIfAborted(abortSignal);
        const replacementRaw = getPayloadText(event.payload);
        if (replacementRaw) {
          streamedRawAnswer = replacementRaw;
          const replacement = sanitizeStreamingVisibleAnswer(streamedRawAnswer);
          if (replacement) {
            const previousAnswer = bufferedAnswer;
            bufferedAnswer = replacement;
            if (replacement !== previousAnswer) {
              onDelta?.('', replacement, event.payload);
            }
          }
        }

        latestConversationId =
          event.payload?.conversationId || event.payload?.conversation_id || latestConversationId;
      }

      if (['delta', 'message', 'agent_message'].includes(event.event)) {
        throwIfAborted(abortSignal);
        const delta = getPayloadText(event.payload);
        if (delta) {
          streamedRawAnswer += delta;
          const nextVisibleAnswer = sanitizeStreamingVisibleAnswer(streamedRawAnswer);
          if (nextVisibleAnswer) {
            const previousAnswer = bufferedAnswer;
            bufferedAnswer = nextVisibleAnswer;
            if (nextVisibleAnswer !== previousAnswer) {
              const visibleDelta = nextVisibleAnswer.startsWith(previousAnswer)
                ? nextVisibleAnswer.slice(previousAnswer.length)
                : nextVisibleAnswer;
              onDelta?.(visibleDelta, nextVisibleAnswer, event.payload);
            }
          }
        }

        latestConversationId =
          event.payload?.conversationId || event.payload?.conversation_id || latestConversationId;
      }

      if (event.event === 'complete') {
        throwIfAborted(abortSignal);
        const completeRawAnswer = getPayloadText(event.payload) || streamedRawAnswer;
        const completeSourceText = typeof event.payload?.sourceText === 'string' && event.payload.sourceText.trim()
          ? event.payload.sourceText
          : typeof event.payload?.source_text === 'string' && event.payload.source_text.trim()
            ? event.payload.source_text
            : completeRawAnswer;
        const completeAnswer = sanitizeStreamingVisibleAnswer(completeRawAnswer) || bufferedAnswer;
        const finalAnswer = completeAnswer || bufferedAnswer;
        const payloadSuggestions = normalizeThreadSuggestions(event.payload?.suggestions || event.payload?.data?.suggestions || []);
        const messageId = getPayloadMessageId(event.payload) || null;
        if (!completeRawAnswer && !finalAnswer && streamedThoughts.length > 0) {
          return {
            answer: '',
            components: [],
            sourceText: '',
            suggestions: mergeThreadSuggestions(streamedSuggestions, payloadSuggestions),
            conversationId: event.payload?.conversationId || event.payload?.conversation_id || latestConversationId || null,
            messageId,
            thoughts: streamedThoughts,
          };
        }
        const normalizedReply = normalizeAssistantReply(completeSourceText || finalAnswer);
        const inlineSuggestions = normalizeThreadSuggestions(normalizedReply.suggestions || []);
        const finalSuggestions = normalizeThreadSuggestions([
          ...streamedSuggestions,
          ...inlineSuggestions,
          ...payloadSuggestions,
        ]);
        for (const trailingEvent of parsed.events.slice(eventIndex + 1)) {
          if (trailingEvent.event !== 'suggestions') continue;
          streamedSuggestions = mergeThreadSuggestions(streamedSuggestions, normalizeSuggestionEventPayload(trailingEvent.payload));
        }
        const completeSuggestions = mergeThreadSuggestions(finalSuggestions, streamedSuggestions);
        void drainTrailingSuggestionEvents({
          reader,
          decoder,
          initialBuffer: buffer,
          abortSignal,
          initialSuggestions: completeSuggestions,
          messageId: messageId || '',
          onSuggestions,
        });

        return {
          answer: normalizedReply.answer,
          components: normalizedReply.components,
          sourceText: normalizedReply.sourceText,
          suggestions: completeSuggestions,
          conversationId: event.payload?.conversationId || event.payload?.conversation_id || latestConversationId || null,
          messageId,
          thoughts: streamedThoughts,
        };
      }
    }
  }

  if (bufferedAnswer) {
    const normalizedReply = normalizeAssistantReply(bufferedAnswer);
    return {
      answer: normalizedReply.answer,
      components: normalizedReply.components,
      sourceText: normalizedReply.sourceText,
      suggestions: mergeThreadSuggestions(streamedSuggestions, normalizedReply.suggestions || []),
      conversationId: latestConversationId,
      messageId: null,
      thoughts: streamedThoughts,
    };
  }

  if (streamedThoughts.length > 0) {
    return {
      answer: '',
      components: [],
      sourceText: '',
      suggestions: [],
      conversationId: latestConversationId,
      messageId: null,
      thoughts: streamedThoughts,
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
  statusHistory = [],
  ambientStatusText = '',
  statusElapsedMs = null,
  thoughts = [],
  userPrompt = '',
}) {
  const statusHistoryText = parseStatusHistory(statusHistory).join('\n');
  const normalizedStatusElapsedMs = Number(statusElapsedMs);
  const normalizedThoughts = normalizeDifyThoughtList(thoughts);
  const maskedProgressEntries = buildMaskedProgressEntries(
    normalizedThoughts,
    status?.type === 'running',
  );

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
        ...(statusHistoryText ? { statusHistoryText } : {}),
        ...(ambientStatusText ? { ambientStatusText } : {}),
        ...(Number.isFinite(normalizedStatusElapsedMs) ? { statusElapsedMs: Math.max(0, normalizedStatusElapsedMs) } : {}),
        ...(maskedProgressEntries.length ? { difyProgressEntries: maskedProgressEntries } : {}),
        ...(userPrompt ? { userPrompt } : {}),
      },
    },
  };
}

function normalizeComparableText(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function getLastRecoverableUserPrompt(messages) {
  if (!Array.isArray(messages) || messages.length === 0) return '';

  const pendingAssistantIndex = (() => {
    for (let index = messages.length - 1; index >= 0; index -= 1) {
      const message = messages[index];
      if (message?.role !== 'assistant') continue;
      if (message.status?.type === 'running') return index;
      if (message.status?.type === 'incomplete' && message.status?.reason !== 'cancelled') return index;
    }
    return -1;
  })();

  if (pendingAssistantIndex === -1) return '';

  for (let index = pendingAssistantIndex - 1; index >= 0; index -= 1) {
    const message = messages[index];
    if (message?.role !== 'user') continue;
    const text = extractTextFromParts(message.content || message.parts || []);
    if (text) return text;
  }

  return '';
}

function createUserMessageFromPersisted(message) {
  const text = typeof message?.text === 'string' ? message.text : '';
  return {
    id: typeof message?.id === 'string' && message.id ? message.id : createMessageId('user'),
    role: 'user',
    createdAt: message?.createdAt ? new Date(message.createdAt) : new Date(),
    content: text ? [{ type: 'text', text }] : [],
    attachments: [],
    metadata: {
      custom: {
        source: 'server-recovery',
      },
    },
  };
}

function createAssistantMessageFromPersisted(message) {
  const components = Array.isArray(message?.components) ? message.components : [];
  return createAssistantMessage({
    id: typeof message?.id === 'string' && message.id ? message.id : createMessageId('assistant'),
    text: typeof message?.text === 'string' ? message.text : '',
    components,
    status: {
      type: 'complete',
      reason: 'stop',
    },
  });
}

function buildRecoveredThreadState(payload, expectedUserPrompt) {
  const remoteMessages = Array.isArray(payload?.messages) ? payload.messages : [];
  const normalizedExpectedPrompt = normalizeComparableText(expectedUserPrompt);
  if (!normalizedExpectedPrompt || remoteMessages.length === 0) return null;

  let matchedUserIndex = -1;
  let matchedAssistantIndex = -1;
  for (let index = remoteMessages.length - 1; index >= 0; index -= 1) {
    const message = remoteMessages[index];
    if (message?.role !== 'user') continue;
    if (normalizeComparableText(message.text) !== normalizedExpectedPrompt) continue;

    const nextAssistantIndex = remoteMessages.findIndex((candidate, candidateIndex) =>
      candidateIndex > index &&
      candidate?.role === 'assistant' &&
      (normalizeComparableText(candidate.text) || (Array.isArray(candidate.components) && candidate.components.length > 0)),
    );
    if (nextAssistantIndex === -1) continue;

    matchedUserIndex = index;
    matchedAssistantIndex = nextAssistantIndex;
    break;
  }

  if (matchedUserIndex === -1 || matchedAssistantIndex === -1) return null;

  const messages = remoteMessages.map((message) => {
    if (message?.role === 'user') return createUserMessageFromPersisted(message);
    if (message?.role === 'assistant') return createAssistantMessageFromPersisted(message);
    return null;
  }).filter(Boolean);
  const lastAssistant = remoteMessages[matchedAssistantIndex];
  const recoveredReply = normalizeAssistantReply(lastAssistant?.text || '', lastAssistant?.components || []);
  const persistedSuggestions = normalizeThreadSuggestions(lastAssistant?.suggestions || []);
  const suggestions = persistedSuggestions.length
    ? persistedSuggestions
    : normalizeThreadSuggestions(recoveredReply.suggestions || []);

  return {
    messages,
    suggestions,
    suggestionsMessageId: messages[matchedAssistantIndex]?.id || '',
    conversationId: payload?.thread?.conversationId || null,
  };
}

function appendStatusHistory(history, nextStatus) {
  const normalizedStage = typeof nextStatus?.stage === 'string' ? nextStatus.stage : '';
  const normalizedMessage = typeof nextStatus?.message === 'string' ? nextStatus.message.trim() : '';
  const existingHistory = parseStatusHistory(history);

  if (normalizedStage !== 'tool' || !normalizedMessage) {
    return existingHistory;
  }

  if (existingHistory[existingHistory.length - 1] === normalizedMessage) {
    return existingHistory;
  }

  const dedupedHistory = existingHistory.filter(entry => entry !== normalizedMessage);
  dedupedHistory.push(normalizedMessage);
  return dedupedHistory.slice(-4);
}

function createCancelledAssistantMessage({ id, text = '', components = [], thoughts = [] }) {
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
    thoughts,
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

async function resolveReply({ config, messages, abortSignal, conversationId, sessionId, storefrontSessionId, onStatus, onThought, onDelta, onSuggestions }) {
  if (!config.apiEndpoint) {
    throw new Error('AskCrystal backend endpoint is not configured.');
  }

  try {
    return await fetchProxyReply({
      apiEndpoint: config.apiEndpoint,
      messages,
      abortSignal,
      conversationId,
      sessionId,
      storefrontSessionId,
      onStatus,
      onThought,
      onDelta,
      onSuggestions,
    });
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw error;
    }

    console.error('[AskCrystal] Backend runtime failed.', error);
    throw error;
  }
}

function useAskCrystalRuntime(config) {
  const initialChatState = useMemo(() => loadStoredChatState(), []);
  const initialSession = getSessionById(initialChatState.sessions, initialChatState.activeSessionId) || initialChatState.sessions[0];
  const [sessions, setSessions] = useState(initialChatState.sessions);
  const [activeSessionId, setActiveSessionId] = useState(initialSession.id);
  const [messages, setMessages] = useState(initialSession.messages);
  const [suggestions, setSuggestions] = useState(initialSession.suggestions);
  const [suggestionsMessageId, setSuggestionsMessageId] = useState(initialSession.suggestionsMessageId || '');
  const [isRunning, setIsRunning] = useState(false);
  const activeRunRef = useRef(null);
  const activeAssistantIdRef = useRef('');
  const activeTaskIdRef = useRef('');
  const cancelRequestedRef = useRef(false);
  const conversationIdRef = useRef(initialSession.conversationId || null);
  const messagesRef = useRef(messages);
  const sessionsRef = useRef(sessions);
  const activeSessionIdRef = useRef(activeSessionId);
  const isRunningRef = useRef(isRunning);
  const sessionIdRef = useRef(getBrowserSessionId());

  useEffect(() => {
    if (!config.apiEndpoint) return undefined;

    let cancelled = false;
    fetchIdentityBootstrap({
      apiEndpoint: config.apiEndpoint,
      sessionId: sessionIdRef.current,
    }).then((payload) => {
      if (cancelled || !payload?.ok) return;

      const nextGuestToken = typeof payload.identity?.guestToken === 'string'
        ? payload.identity.guestToken.trim()
        : '';
      if (nextGuestToken && nextGuestToken !== sessionIdRef.current) {
        sessionIdRef.current = nextGuestToken;
        writeLocalStorageValue(SESSION_STORAGE_KEY, nextGuestToken);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [config.apiEndpoint]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    sessionsRef.current = sessions;
  }, [sessions]);

  useEffect(() => {
    activeSessionIdRef.current = activeSessionId;
  }, [activeSessionId]);

  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  useEffect(() => {
    setSessions(currentSessions => upsertStoredSessionSnapshot(currentSessions, activeSessionId, {
      messages: normalizeMessagesAfterCancel(messages, cancelRequestedRef.current),
      suggestions,
      suggestionsMessageId,
      conversationId: conversationIdRef.current,
      updatedAt: new Date().toISOString(),
    }));
  }, [activeSessionId, messages, suggestions, suggestionsMessageId]);

  useEffect(() => {
    persistChatState({
      sessions,
      activeSessionId,
    });
    publishChatSessionRegistry({
      sessions,
      activeSessionId,
      isRunning,
    });
  }, [activeSessionId, isRunning, sessions]);

  const applySession = useCallback((nextSession) => {
    if (!nextSession) return;

    conversationIdRef.current = nextSession.conversationId || null;
    cancelRequestedRef.current = false;
    activeTaskIdRef.current = '';
    setActiveSessionId(nextSession.id);
    setMessages(normalizeStoredMessages(nextSession.messages));
    setSuggestions(normalizeThreadSuggestions(nextSession.suggestions));
    setSuggestionsMessageId(nextSession.suggestionsMessageId || '');
  }, []);

  const switchToSession = useCallback((nextSessionId) => {
    if (!nextSessionId || isRunningRef.current) {
      return;
    }

    if (nextSessionId === activeSessionIdRef.current) {
      closeHeaderDrawer();
      return;
    }

    const nextSession = getSessionById(sessionsRef.current, nextSessionId);
    if (!nextSession) return;

    const touchedSession = {
      ...nextSession,
      updatedAt: new Date().toISOString(),
    };

    setSessions(currentSessions => upsertStoredSessionSnapshot(currentSessions, nextSessionId, {
      updatedAt: touchedSession.updatedAt,
    }));
    applySession(touchedSession);
    closeHeaderDrawer();
  }, [applySession]);

  const createSessionAndSwitch = useCallback(() => {
    if (isRunningRef.current) return;

    const nextSession = createStoredChatSession();
    setSessions(currentSessions =>
      sortSessionsByRecent([nextSession, ...currentSessions]).slice(0, MAX_STORED_CHAT_SESSIONS),
    );
    applySession(nextSession);
    closeHeaderDrawer();
  }, [applySession]);

  const deleteSessionAndSwitch = useCallback((targetSessionId) => {
    if (!targetSessionId || isRunningRef.current) return;

    const remainingSessions = sortSessionsByRecent(
      sessionsRef.current.filter(session => session.id !== targetSessionId),
    );
    const nextSessions = remainingSessions.length > 0
      ? remainingSessions
      : [createStoredChatSession()];
    const activeSessionWasRemoved = targetSessionId === activeSessionIdRef.current;
    const nextActiveSession = getSessionById(nextSessions, activeSessionIdRef.current) || nextSessions[0];

    setSessions(nextSessions);

    if (activeSessionWasRemoved || nextActiveSession.id !== activeSessionIdRef.current) {
      applySession(nextActiveSession);
    }

    closeHeaderDrawer();
  }, [applySession]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const handleSessionSelect = (event) => {
      switchToSession(event.detail?.sessionId || '');
    };
    const handleSessionCreate = () => {
      createSessionAndSwitch();
    };
    const handleSessionDelete = (event) => {
      deleteSessionAndSwitch(event.detail?.sessionId || '');
    };

    window.addEventListener(SESSION_SELECT_EVENT, handleSessionSelect);
    window.addEventListener(SESSION_CREATE_EVENT, handleSessionCreate);
    window.addEventListener(SESSION_DELETE_EVENT, handleSessionDelete);
    return () => {
      window.removeEventListener(SESSION_SELECT_EVENT, handleSessionSelect);
      window.removeEventListener(SESSION_CREATE_EVENT, handleSessionCreate);
      window.removeEventListener(SESSION_DELETE_EVENT, handleSessionDelete);
    };
  }, [createSessionAndSwitch, deleteSessionAndSwitch, switchToSession]);

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

  const recoverActiveSessionFromServer = useCallback(async ({ expectedPrompt = '', poll = false } = {}) => {
    if (!config.apiEndpoint) return false;

    const targetSessionId = activeSessionIdRef.current;
    const prompt = expectedPrompt || getLastRecoverableUserPrompt(messagesRef.current);
    if (!prompt || !targetSessionId) return false;

    const deadline = Date.now() + (poll ? 75000 : 0);
    do {
      const payload = await fetchPersistedThreadMessages({
        apiEndpoint: config.apiEndpoint,
        sessionId: sessionIdRef.current,
        storefrontSessionId: targetSessionId,
      });
      const recovered = buildRecoveredThreadState(payload, prompt);

      if (recovered) {
        if (activeSessionIdRef.current !== targetSessionId) return false;

        conversationIdRef.current = recovered.conversationId || conversationIdRef.current;
        cancelRequestedRef.current = false;
        activeTaskIdRef.current = '';
        activeAssistantIdRef.current = '';
        activeRunRef.current = null;
        isRunningRef.current = false;
        setIsRunning(false);
        setMessages(recovered.messages);
        setSuggestions(recovered.suggestions);
        setSuggestionsMessageId(recovered.suggestions.length ? recovered.suggestionsMessageId : '');
        return true;
      }

      if (!poll || Date.now() >= deadline) break;
      await new Promise(resolve => setTimeout(resolve, 2000));
    } while (true);

    return false;
  }, [config.apiEndpoint]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    let cancelled = false;
    const attemptRecovery = () => {
      if (cancelled) return;
      if (document.visibilityState && document.visibilityState !== 'visible') return;

      const prompt = getLastRecoverableUserPrompt(messagesRef.current);
      if (!prompt) return;

      void recoverActiveSessionFromServer({
        expectedPrompt: prompt,
        poll: false,
      });
    };

    const timeoutId = window.setTimeout(attemptRecovery, 800);
    window.addEventListener('focus', attemptRecovery);
    window.addEventListener('pageshow', attemptRecovery);
    document.addEventListener('visibilitychange', attemptRecovery);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      window.removeEventListener('focus', attemptRecovery);
      window.removeEventListener('pageshow', attemptRecovery);
      document.removeEventListener('visibilitychange', attemptRecovery);
    };
  }, [recoverActiveSessionFromServer]);

  const onCancel = useCallback(async () => {
    const activeRun = activeRunRef.current;
    const assistantId = activeAssistantIdRef.current;
    const taskId = activeTaskIdRef.current;
    const conversationId = conversationIdRef.current;
    const sessionId = sessionIdRef.current;
    const storefrontSessionId = activeSessionIdRef.current;

    activeRun?.abort();
    cancelRequestedRef.current = true;
    isRunningRef.current = false;
    setIsRunning(false);
    setSuggestions([]);
    setSuggestionsMessageId('');

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
      storefrontSessionId,
    });
  }, [config.apiEndpoint, updateAssistantMessage]);

  const onNew = useCallback(
    async (appendMessage) => {
      if (appendMessage.role !== 'user') {
        throw new Error('AskCrystal homepage only supports user-authored messages.');
      }

      if (getEffectiveDisplayMode(config) === 'home') {
        const promptText = extractTextFromParts(appendMessage.content || []);
        if (handOffPromptToChatPage(config, promptText)) {
          return;
        }
      }

      const userMessage = createUserMessage(appendMessage);
      const assistantId = createMessageId('assistant');
      const abortController = new AbortController();
      const assistantSeed = createAssistantMessage({
        id: assistantId,
        status: {
          type: 'running',
        },
        statusText: 'Settling into your energy...',
        statusStage: 'listen',
        statusHistory: [],
        ambientStatusText: 'Settling into your energy...',
        statusElapsedMs: 0,
        userPrompt: userMessage.content ? extractTextFromParts(userMessage.content) : '',
      });
      const conversationForReply = [...messagesRef.current, userMessage];

      activeRunRef.current = abortController;
      activeAssistantIdRef.current = assistantId;
      activeTaskIdRef.current = '';
      cancelRequestedRef.current = false;
      isRunningRef.current = true;
      setIsRunning(true);
      setSuggestions([]);
      setSuggestionsMessageId('');
      setMessages([...conversationForReply, assistantSeed]);
      let streamedAnswer = '';
      let streamedThoughts = [];
      const targetSessionId = activeSessionIdRef.current;

      try {
        const result = await resolveReply({
          config,
          messages: conversationForReply,
          abortSignal: abortController.signal,
          conversationId: conversationIdRef.current,
          sessionId: sessionIdRef.current,
          storefrontSessionId: targetSessionId,
          onStatus: (statusPayload) => {
            if (abortController.signal.aborted) return;
            const normalizedStatus = normalizeStatusPayload(statusPayload);
            if (normalizedStatus.taskId) {
              activeTaskIdRef.current = normalizedStatus.taskId;
            }
            updateAssistantMessage(assistantId, (message) => {
              const currentText = extractTextFromParts(message.content || message.parts || []);
              const existingComponents = Array.isArray(message.metadata?.unstable_data)
                ? message.metadata.unstable_data
                : [];
              const currentComponents = existingComponents;
              const hasVisibleAnswer = Boolean(currentText.trim() || currentComponents.length);

              return createAssistantMessage({
                id: assistantId,
                parts: buildAssistantParts({
                  text: currentText,
                  components: currentComponents,
                }),
                components: currentComponents,
                status: {
                  type: 'running',
                },
                thoughts: streamedThoughts,
                statusText: hasVisibleAnswer ? '' : normalizedStatus.message,
                statusStage: hasVisibleAnswer ? '' : normalizedStatus.stage,
                statusTool: hasVisibleAnswer ? '' : normalizedStatus.tool,
                statusHistory: hasVisibleAnswer
                  ? []
                  : appendStatusHistory(message.metadata?.custom?.statusHistoryText, normalizedStatus),
                ambientStatusText: hasVisibleAnswer
                  ? ''
                  : normalizedStatus.stage === 'tool'
                    ? (message.metadata?.custom?.ambientStatusText || 'Settling into your energy...')
                    : normalizedStatus.message,
                statusElapsedMs: hasVisibleAnswer ? null : normalizedStatus.elapsedMs,
                userPrompt: message.metadata?.custom?.userPrompt || '',
              });
            });
          },
          onThought: (thoughtPayload) => {
            if (abortController.signal.aborted) return;
            const nextTaskId = getPayloadTaskId(thoughtPayload);
            if (nextTaskId) {
              activeTaskIdRef.current = nextTaskId;
            }
            streamedThoughts = mergeDifyThoughts(streamedThoughts, thoughtPayload);
            updateAssistantMessage(assistantId, (message) => {
              const existingComponents = Array.isArray(message.metadata?.unstable_data)
                ? message.metadata.unstable_data
                : [];
              const currentComponents = existingComponents;
              const currentText = extractTextFromParts(message.content || message.parts || []) || streamedAnswer;

              return createAssistantMessage({
                id: assistantId,
                parts: buildAssistantParts({
                  text: currentText,
                  components: currentComponents,
                }),
                components: currentComponents,
                status: {
                  type: 'running',
                },
                thoughts: streamedThoughts,
                statusText: '',
                statusStage: '',
                statusTool: '',
                statusHistory: [],
                userPrompt: message.metadata?.custom?.userPrompt || '',
              });
            });
          },
          onDelta: (_delta, nextAnswer, eventPayload) => {
            if (abortController.signal.aborted) return;
            const nextTaskId = getPayloadTaskId(eventPayload);
            if (nextTaskId) {
              activeTaskIdRef.current = nextTaskId;
            }
            streamedAnswer = nextAnswer;
            updateAssistantMessage(assistantId, (message) =>
              createAssistantMessage({
                id: assistantId,
                parts: buildAssistantParts({
                  text: nextAnswer,
                }),
                components: [],
                status: {
                  type: 'running',
                },
                thoughts: streamedThoughts,
                statusText: '',
                statusStage: '',
                statusTool: '',
                statusHistory: [],
                userPrompt: message.metadata?.custom?.userPrompt || '',
              }),
            );
          },
          onSuggestions: (nextSuggestions, messageId) => {
            if (abortController.signal.aborted || cancelRequestedRef.current) return;
            if (activeSessionIdRef.current !== targetSessionId) return;

            const normalizedSuggestions = normalizeThreadSuggestions(nextSuggestions || []);
            if (!normalizedSuggestions.length) return;

            const activeAssistantMessageId = activeAssistantIdRef.current;
            const latestAssistantMessageId = getLatestAssistantMessageId(messagesRef.current);
            if (activeAssistantMessageId && activeAssistantMessageId !== assistantId) return;
            if (!activeAssistantMessageId && latestAssistantMessageId !== assistantId) return;

            setSuggestions(normalizedSuggestions);
            setSuggestionsMessageId(messageId || assistantId);
          },
        });

        conversationIdRef.current = result.conversationId || conversationIdRef.current;
        activeTaskIdRef.current = '';
        cancelRequestedRef.current = false;
        const finalComponents = result.components || [];
        const finalThoughts = Array.isArray(result.thoughts) && result.thoughts.length
          ? result.thoughts
          : streamedThoughts;
        const finalSuggestions = normalizeThreadSuggestions(result.suggestions || []);
        const finalAnswer = result.answer || streamedAnswer || result.sourceText || '';
        const finalSourceText = result.sourceText || finalAnswer;
        const finalAssistantMessage = createAssistantMessage({
          id: assistantId,
          parts: buildAssistantParts({
            text: finalSourceText,
            components: finalComponents,
          }),
          components: finalComponents,
          status: {
            type: 'complete',
            reason: 'stop',
          },
          thoughts: finalThoughts,
        });
        const nextMessages = [
          ...conversationForReply,
          finalAssistantMessage,
        ];

        messagesRef.current = nextMessages;
        setMessages(nextMessages);
        if (finalSuggestions.length) {
          setSuggestions(finalSuggestions);
          setSuggestionsMessageId(assistantId);
        }
      } catch (error) {
        const isExplicitCancel = cancelRequestedRef.current || abortController.signal.aborted;
        if (error?.name === 'AbortError' && isExplicitCancel) {
          activeTaskIdRef.current = '';
          setSuggestions([]);
          setSuggestionsMessageId('');
          setMessages([
            ...conversationForReply,
            createCancelledAssistantMessage({
              id: assistantId,
              text: streamedAnswer,
              components: [],
              thoughts: streamedThoughts,
            }),
          ]);
          return;
        }

        console.error('[AskCrystal] Assistant runtime failed.', error);
        updateAssistantMessage(assistantId, (message) =>
          createAssistantMessage({
            id: assistantId,
            parts: buildAssistantParts({
              text: extractTextFromParts(message.content || message.parts || []) || streamedAnswer,
            }),
            components: [],
            status: {
              type: 'running',
            },
            thoughts: streamedThoughts,
            statusText: 'Reconnecting to your reading...',
            statusStage: 'recover',
            ambientStatusText: 'Reconnecting to your reading...',
          }),
        );

        const recovered = await recoverActiveSessionFromServer({
          expectedPrompt: getLastUserPrompt(conversationForReply),
          poll: true,
        });
        if (recovered) return;

        activeTaskIdRef.current = '';
        cancelRequestedRef.current = false;
        setSuggestions([]);
        setSuggestionsMessageId('');
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
        isRunningRef.current = false;
        setIsRunning(false);
      }
    },
    [config, recoverActiveSessionFromServer, updateAssistantMessage],
  );

  const sendPrompt = useCallback((prompt) => {
    const text = typeof prompt === 'string' ? prompt.trim() : '';
    if (!text || isRunningRef.current) return;

    void onNew({
      role: 'user',
      content: [
        {
          type: 'text',
          text,
        },
      ],
      metadata: {
        custom: {
          source: 'suggestion',
        },
      },
    });
  }, [onNew]);

  const store = useMemo(
    () => ({
      messages,
      suggestions,
      suggestionsMessageId,
      isRunning,
      setMessages: replaceMessages,
      onImport: replaceMessages,
      onNew,
      onCancel,
      adapters: {
        threadList: {
          threadId: activeSessionId || DEFAULT_THREAD_ID,
          threads: getChatSessionSummaries(sessions).map(session => ({
            id: session.id,
            remoteId: session.id,
            title: session.title,
          })),
        },
      },
    }),
    [activeSessionId, isRunning, messages, onCancel, onNew, replaceMessages, sessions, suggestions, suggestionsMessageId],
  );

  return {
    runtime: useExternalStoreRuntime(store),
    hasUserMessages: messages.some(message => message.role === 'user'),
    activeSessionId,
    sendPrompt,
    onCancel,
    isRunning,
  };
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
        <span className="ac-homepage__product-link">View product</span>
      </div>
    </a>
  );
}

function WelcomeShelf({ config }) {
  return (
    <div className="ac-homepage__guide-shelf">
      <div className="ac-homepage__guide-shelf-header">
        <div>
          <p className="ac-homepage__shelf-kicker">Best sellers</p>
          <h2>{config.shelfHeading}</h2>
        </div>
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
    </div>
  );
}

function WelcomeGuideCard({ card }) {
  const { sendPrompt, isRunning } = useAskCrystalActions();
  const className = [
    'ac-homepage__guide-card',
    card.layout ? `ac-homepage__guide-card--${card.layout}` : '',
    card.emblemUrl ? 'ac-homepage__guide-card--has-emblem' : '',
  ].filter(Boolean).join(' ');
  const content = (
    <>
      {card.emblemUrl ? (
        <div className="ac-homepage__guide-card-emblem" aria-hidden="true">
          <img src={card.emblemUrl} alt="" loading="lazy" decoding="async" />
        </div>
      ) : null}
      <div className="ac-homepage__guide-card-copy">
        <p className="ac-homepage__guide-card-eyebrow">{card.eyebrow}</p>
        <h3>{card.title}</h3>
        <p>{card.description}</p>
      </div>
      <div className="ac-homepage__guide-card-footer">
        <span className="ac-homepage__guide-card-action">{card.cta}</span>
        <span className="ac-homepage__guide-card-arrow" aria-hidden="true">→</span>
      </div>
    </>
  );

  if (card.prompt) {
    return (
      <button
        type="button"
        className={className}
        disabled={isRunning}
        onClick={() => sendPrompt(card.prompt)}
      >
        {content}
      </button>
    );
  }

  return (
    <a className={className} href={card.href}>
      {content}
    </a>
  );
}

function WelcomeState({ config }) {
  const headingLine1 = typeof config.headingLine1 === 'string' ? config.headingLine1.trim() : '';
  const headingLine2Prefix = typeof config.headingLine2Prefix === 'string' ? config.headingLine2Prefix.trim() : '';
  const headingAccent = typeof config.headingAccent === 'string' ? config.headingAccent.trim() : '';
  const rawHeadingSuffix = typeof config.headingSuffix === 'string' ? config.headingSuffix.trim() : '';
  const headingSuffix = headingAccent && rawHeadingSuffix.toLowerCase().startsWith(`${headingAccent.toLowerCase()} `)
    ? rawHeadingSuffix.slice(headingAccent.length).trimStart()
    : rawHeadingSuffix;
  const hasStructuredHeading = Boolean(headingLine1 || headingLine2Prefix || headingAccent || headingSuffix);
  const headingLead = [headingLine1, headingLine2Prefix].filter(Boolean).join(' ');
  const renderAccentedYouText = (text, keyPrefix) => {
    if (!text) return null;

    const matches = Array.from(text.matchAll(/\byou\b/gi));
    if (!matches.length) {
      return text;
    }

    const nodes = [];
    let cursor = 0;

    matches.forEach((match, index) => {
      const start = match.index ?? 0;
      if (start > cursor) {
        nodes.push(
          <span key={`${keyPrefix}-copy-${index}`} className="ac-homepage__guide-title-copy">
            {text.slice(cursor, start)}
          </span>,
        );
      }

      nodes.push(
        <span key={`${keyPrefix}-accent-${index}`} className="ac-homepage__guide-title-accent">
          {match[0]}
        </span>,
      );

      cursor = start + match[0].length;
    });

    if (cursor < text.length) {
      nodes.push(
        <span key={`${keyPrefix}-copy-tail`} className="ac-homepage__guide-title-copy">
          {text.slice(cursor)}
        </span>,
      );
    }

    return nodes;
  };
  const guidedCards = [
    {
      id: 'yinyuan',
      layout: 'portrait',
      eyebrow: 'Yinyuan',
      title: 'Read love and synastry',
      description: 'Explore soulmate, synastry, and relationship guidance.',
      cta: 'Cosmic Match',
      emblemUrl: 'https://cdn.shopify.com/s/files/1/0981/4786/0843/files/emblem_1.png?v=1777105421',
      prompt: 'Do a Yinyuan relationship reading. Ask me what relationship context you need.',
    },
    {
      id: 'tarot',
      layout: 'portrait',
      eyebrow: 'Tarot',
      title: 'Pull a focused spread',
      description: 'Ask about a decision, relationship, block, or next step.',
      cta: 'Open tarot',
      emblemUrl: 'https://cdn.shopify.com/s/files/1/0981/4786/0843/files/emblem_2.png?v=1777105421',
      prompt: 'I want a tarot spread for a question I am holding. Ask me for the question first.',
    },
    {
      id: 'horoscope',
      layout: 'wide',
      eyebrow: 'Horoscope',
      title: 'Today’s zodiac weather',
      description: 'Get daily sign guidance, timing notes, and crystal support.',
      cta: 'Read today',
      emblemUrl: 'https://cdn.shopify.com/s/files/1/0981/4786/0843/files/emblem_2.png?v=1777105421',
      prompt: 'Give me today\'s horoscope guidance. Ask for my zodiac sign if you need it.',
    },
    {
      id: 'ask-anything',
      layout: 'wide',
      eyebrow: 'Open chat',
      title: 'Enter the reading room',
      description: 'Open a blank conversation and start with anything when you are ready.',
      cta: 'Open chat',
      emblemUrl: 'https://cdn.shopify.com/s/files/1/0981/4786/0843/files/emblem_3.png?v=1777105421',
      href: getChatPageUrl(config),
    },
    {
      id: 'bazi',
      layout: 'wide',
      eyebrow: 'Bazi',
      title: 'Four Pillars birth chart',
      description: 'Read elemental balance, timing, and life patterns from birth details.',
      cta: 'Start Bazi',
      emblemUrl: 'https://cdn.shopify.com/s/files/1/0981/4786/0843/files/emblem_1.png?v=1777105421',
      prompt: 'I want a Bazi Four Pillars reading. Ask me for the birth details you need.',
    },
    {
      id: 'fengshui',
      layout: 'wide',
      eyebrow: 'Feng shui',
      title: 'Space energy audit',
      description: 'Read a room layout for flow, blocked areas, and practical placement shifts.',
      cta: 'Audit my room',
      emblemUrl: 'https://cdn.shopify.com/s/files/1/0981/4786/0843/files/emblem_5.png?v=1777105421',
      prompt: 'Audit the feng shui of my room. Ask me for the room layout details you need.',
    },
    {
      id: 'shushu',
      layout: 'compact',
      eyebrow: 'Numerology',
      title: 'Shushu number profile',
      description: 'Use birth numbers for personality themes, cycles, and current emphasis.',
      cta: 'Read numbers',
      emblemUrl: 'https://cdn.shopify.com/s/files/1/0981/4786/0843/files/emblem_1.png?v=1777105421',
      prompt: 'Create a Shushu numerology profile. Ask me for the birth date if you need it.',
    },
    {
      id: 'taibu',
      layout: 'compact',
      eyebrow: 'Not sure?',
      title: 'Choose the right reading',
      description: 'Describe the situation and AskCrystal will choose the cleanest divination path.',
      cta: 'Help me choose',
      emblemUrl: 'https://cdn.shopify.com/s/files/1/0981/4786/0843/files/emblem_2.png?v=1777105421',
      prompt: 'Help me choose the right reading method for my situation.',
    },
    {
      id: 'crystal-match',
      layout: 'wide',
      eyebrow: 'Crystal match',
      title: 'Find one shop piece',
      description: 'Turn a feeling, intention, or reading into a grounded jewelry recommendation.',
      cta: 'Match me',
      emblemUrl: 'https://cdn.shopify.com/s/files/1/0981/4786/0843/files/emblem_4.png?v=1777105421',
      prompt: 'Recommend one crystal jewelry piece from the shop for my current need.',
    },
    {
      id: 'shop-intention',
      layout: 'compact',
      eyebrow: 'Shop intent',
      title: 'Browse by intention',
      description: 'Calm, protection, love, focus, abundance, sleep, or grounding.',
      cta: 'Shop intent',
      emblemUrl: 'https://cdn.shopify.com/s/files/1/0981/4786/0843/files/emblem_5.png?v=1777105421',
      prompt: 'Help me shop crystals by intention. Ask me which intention I want to focus on.',
    },
    {
      id: 'care-ritual',
      layout: 'compact',
      eyebrow: 'Ritual',
      title: 'Crystal care practice',
      description: 'Learn a simple way to cleanse, charge, wear, or place a stone.',
      cta: 'Create ritual',
      emblemUrl: 'https://cdn.shopify.com/s/files/1/0981/4786/0843/files/emblem_1.png?v=1777105421',
      prompt: 'Teach me a simple crystal care ritual for a stone I own.',
    },
  ];
  const storeHelpCard = {
    id: 'store-help',
    layout: 'strip',
    eyebrow: 'Store help',
    title: 'Product, policy, and cart questions',
    description: 'Ask about a product, compare options, or check shop guidance.',
    cta: 'Ask store',
    emblemUrl: 'https://cdn.shopify.com/s/files/1/0981/4786/0843/files/emblem_2.png?v=1777105421',
    prompt: 'I have a store or product question. Help me find the answer.',
  };

  return (
    <div className="ac-homepage__welcome">
      <section className="ac-homepage__guide" aria-label="Guided AskCrystal paths">
        <div className="ac-homepage__guide-header">
          <p className="ac-homepage__guide-kicker">{config.eyebrow}</p>
          <h1 className="ac-homepage__guide-title">
            {hasStructuredHeading ? (
              <>
                {headingLead ? (
                  <span className="ac-homepage__guide-title-copy">
                    {headingLead}
                    {headingAccent || headingSuffix ? ' ' : ''}
                  </span>
                ) : null}
                {headingAccent ? (
                  <span className="ac-homepage__guide-title-accent">{headingAccent}</span>
                ) : null}
                {headingSuffix ? (
                  <span className="ac-homepage__guide-title-copy">
                    {headingLead || headingAccent ? ' ' : ''}
                    {renderAccentedYouText(headingSuffix, 'heading-suffix')}
                  </span>
                ) : null}
              </>
            ) : config.heading}
          </h1>
        </div>

        <div className="ac-homepage__guide-grid">
          {guidedCards.map(card => (
            <WelcomeGuideCard key={card.id} card={card} />
          ))}
          <WelcomeShelf config={config} />
          <WelcomeGuideCard card={storeHelpCard} />
        </div>
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
          placeholder="ask me anything"
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

function MessageSuggestions() {
  const { sendPrompt, isRunning } = useAskCrystalActions();
  const messageId = useMessage((message) => message.id || '');
  const messageCompleted = useMessage((message) => message.status?.type === 'complete');
  const suggestions = useAssistantState(({ thread }) => thread.suggestions || EMPTY_ARRAY);
  const isThreadRunning = useAssistantState(({ thread }) => thread.isRunning);
  const isLatestAssistantMessage = useAssistantState(({ thread }) => {
    for (let index = thread.messages.length - 1; index >= 0; index -= 1) {
      const nextMessage = thread.messages[index];
      if (nextMessage?.role === 'assistant') {
        return nextMessage.id === messageId;
      }
    }

    return false;
  });

  if (
    !messageCompleted ||
    isThreadRunning ||
    !isLatestAssistantMessage ||
    !suggestions.length
  ) {
    return null;
  }

  return (
    <div className="ac-message__suggestions" aria-label="Suggested follow-up prompts">
      {suggestions.map((suggestion, index) => (
        <button
          type="button"
          key={`${messageId}-suggestion-${index}-${suggestion.prompt}`}
          className="ac-message__suggestion"
          disabled={isThreadRunning || isRunning}
          onClick={() => sendPrompt(suggestion.prompt)}
        >
          {suggestion.prompt}
        </button>
      ))}
    </div>
  );
}

function formatDifyToolName(tool = '') {
  if (typeof tool !== 'string' || !tool.trim()) return '';

  try {
    const parsed = JSON.parse(tool);
    if (Array.isArray(parsed)) {
      return parsed
        .map((item) => (typeof item === 'string' ? item : ''))
        .filter(Boolean)
        .join(', ');
    }
  } catch {}

  return tool;
}

const MASKED_PROGRESS_FALLBACKS = [
  'Settling into the shape of your question...',
  'Listening for the clearest thread...',
  'Letting the reading gather itself...',
  'Bringing the guidance into plain language...',
];

function normalizeProgressSearchText(value = '') {
  return String(value)
    .toLowerCase()
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getMaskedToolProgressLabel(toolName = '', context = '') {
  const normalizedTool = normalizeProgressSearchText(toolName);
  const normalizedContext = normalizeProgressSearchText(`${toolName} ${context}`);

  if (/search catalog|catalog|collection|product search|shopify search/.test(normalizedContext)) {
    return 'Looking for a crystal match...';
  }

  if (/get product details|product details|variant|inventory|price/.test(normalizedContext)) {
    return 'Verifying the strongest match...';
  }

  if (/cart|checkout|update cart|get cart/.test(normalizedContext)) {
    return /update/.test(normalizedTool)
      ? 'Preparing the cart update...'
      : 'Opening your cart...';
  }

  if (/policy|faq|shipping|return|store question/.test(normalizedContext)) {
    return 'Checking the store guidance...';
  }

  if (/horoscope|zodiac|astrology|planet|daily guidance|star/.test(normalizedContext)) {
    return 'Aligning today’s sky pattern...';
  }

  if (/bazi|four pillars|day master|heavenly stem|earthly branch/.test(normalizedContext)) {
    return 'Mapping the elemental structure...';
  }

  if (/tarot|spread|card/.test(normalizedContext)) {
    return 'Drawing the symbolic spread...';
  }

  if (/fengshui|feng shui|space audit|room|placement/.test(normalizedContext)) {
    return 'Tracing the room’s energy flow...';
  }

  if (/yinyuan|matchmaking|relationship|compatib|connection/.test(normalizedContext)) {
    return 'Reading the connection pattern...';
  }

  if (/numerology|shushu|number profile/.test(normalizedContext)) {
    return 'Following the number pattern...';
  }

  if (/taibu|router|structured divination|route/.test(normalizedContext)) {
    return 'Choosing the clearest reading path...';
  }

  if (/crystal|stone|chakra|ritual|intention|energy/.test(normalizedContext)) {
    return 'Looking for a crystal match...';
  }

  return toolName ? 'Consulting the right tool...' : '';
}

function getMaskedThoughtProgressLabel(thought, index = 0) {
  const toolName = formatDifyToolName(thought?.tool || '');
  const context = [
    thought?.thought,
    thought?.toolInput,
    thought?.observation,
  ].filter(Boolean).join(' ');
  const toolLabel = getMaskedToolProgressLabel(toolName, context);
  if (toolLabel) return toolLabel;

  const normalizedContext = normalizeProgressSearchText(context);
  if (/search|look up|find|catalog|product|shop|store|inventory/.test(normalizedContext)) {
    return 'Checking the crystal shelf...';
  }
  if (/chart|zodiac|horoscope|planet|bazi|tarot|feng|numerology|relationship|compatib/.test(normalizedContext)) {
    return 'Reading the pattern...';
  }
  if (/recommend|guidance|answer|respond|final|compose/.test(normalizedContext)) {
    return 'Bringing the guidance into focus...';
  }
  if (/tool|workflow|call|input|observation/.test(normalizedContext)) {
    return 'Consulting the right tool...';
  }

  return MASKED_PROGRESS_FALLBACKS[index % MASKED_PROGRESS_FALLBACKS.length];
}

function buildMaskedProgressEntries(thoughts = [], isRunning = false) {
  const normalizedThoughts = normalizeDifyThoughtList(thoughts);
  const seen = new Map();

  normalizedThoughts.forEach((thought, index) => {
    const label = getMaskedThoughtProgressLabel(thought, index);
    if (!label) return;

    const stableKey = `${label}:${thought.tool || ''}`;
    const existing = seen.get(stableKey);
    const isFinished = Boolean(thought.observation) || (!isRunning && index < normalizedThoughts.length - 1);
    seen.set(stableKey, {
      id: thought.id || stableKey,
      label,
      isFinished: existing?.isFinished || isFinished,
      order: existing?.order ?? index,
    });
  });

  const entries = Array.from(seen.values())
    .sort((left, right) => left.order - right.order);

  if (!entries.length) return [];

  return entries.map((entry, index) => {
    const isCurrent = isRunning && index === entries.length - 1 && !entry.isFinished;
    return {
      ...entry,
      isCurrent,
      isFinished: !isCurrent && (entry.isFinished || index < entries.length - 1),
    };
  });
}

function normalizeMaskedProgressEntry(entry, index = 0) {
  if (!entry || typeof entry !== 'object') return null;

  const label = typeof entry.label === 'string' ? entry.label.trim() : '';
  if (!label) return null;

  return {
    id: typeof entry.id === 'string' && entry.id ? entry.id : `${label}:${index}`,
    label,
    isCurrent: Boolean(entry.isCurrent),
    isFinished: Boolean(entry.isFinished),
    order: Number.isFinite(Number(entry.order)) ? Number(entry.order) : index,
  };
}

function normalizeMaskedProgressEntries(value) {
  if (!Array.isArray(value)) return [];

  return value
    .map(normalizeMaskedProgressEntry)
    .filter(Boolean)
    .sort((left, right) => left.order - right.order);
}

function DifyPendingLine({ statusText = '' }) {
  return (
    <div className="ac-dify-pending" role="status" aria-live="polite">
      <span className="ac-dify-pending__dot" aria-hidden="true" />
      <span>{statusText || 'Thinking...'}</span>
    </div>
  );
}

function DifyProgressStream({ entries = [] }) {
  const progressEntries = normalizeMaskedProgressEntries(entries);
  if (!progressEntries.length) return null;

  const visibleEntries = progressEntries.slice(-4);

  return (
    <div className="ac-dify-progress" role="status" aria-live="polite" aria-label="Reading progress">
      <ol className="ac-dify-progress__list">
        {visibleEntries.map((entry, index) => (
          <li
            className={[
              'ac-dify-progress__item',
              entry.isCurrent ? 'is-current' : '',
              entry.isFinished ? 'is-finished' : '',
            ].filter(Boolean).join(' ')}
            key={`${entry.id}-${entry.label}`}
            style={{ '--ac-progress-index': index }}
          >
            <span className="ac-dify-progress__mark" aria-hidden="true">
              {entry.isFinished ? '✓' : ''}
            </span>
            <span className="ac-dify-progress__label">{entry.label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ReadingReadyMarker() {
  return (
    <div className="ac-message__ready">
      ✦ Your reading is ready
    </div>
  );
}

function AssistantMessage() {
  const assistantParts = useMessage((message) => message.content || message.parts || EMPTY_ARRAY);
  const assistantText = extractTextFromParts(assistantParts);
  const hasToolParts = assistantParts.some((part) => part.type === 'tool-call');
  const isRunning = useMessage((message) => message.status?.type === 'running');
  const statusText = useMessage((message) => message.metadata?.custom?.statusText || '');
  const statusStage = useMessage((message) => message.metadata?.custom?.statusStage || '');
  const statusTool = useMessage((message) => message.metadata?.custom?.statusTool || '');
  const statusHistoryText = useMessage((message) => message.metadata?.custom?.statusHistoryText || '');
  const ambientStatusText = useMessage((message) => message.metadata?.custom?.ambientStatusText || '');
  const statusElapsedMs = useMessage((message) => message.metadata?.custom?.statusElapsedMs || 0);
  const rawProgressEntries = useMessage((message) => message.metadata?.custom?.difyProgressEntries);
  const userPrompt = useMessage((message) => message.metadata?.custom?.userPrompt || '');
  const difyProgressEntries = useMemo(() => normalizeMaskedProgressEntries(rawProgressEntries), [rawProgressEntries]);
  const hasProgress = difyProgressEntries.length > 0;
  const isThinking = isRunning && !assistantText && !hasToolParts && !hasProgress;
  const hasAssistantContent = Boolean(assistantText) || hasToolParts;
  const shouldShowProgress = isRunning && !hasAssistantContent;
  const latestDifyProgress = difyProgressEntries.find(entry => entry.isCurrent) || difyProgressEntries[difyProgressEntries.length - 1] || null;
  const progressHistoryText = statusHistoryText || difyProgressEntries.map(entry => entry.label).join('\n');
  const progressStatusText = statusText || latestDifyProgress?.label || '';
  const progressProps = useMemo(() => ({
    statusText: progressStatusText,
    statusHistoryText: progressHistoryText,
    statusStage: statusStage || (hasProgress ? 'tool' : 'listen'),
    statusTool,
    ambientStatusText,
    statusElapsedMs,
    progressEntries: difyProgressEntries,
    userPrompt,
  }), [
    ambientStatusText,
    difyProgressEntries,
    hasProgress,
    progressHistoryText,
    progressStatusText,
    statusElapsedMs,
    statusStage,
    statusTool,
    userPrompt,
  ]);
  const [progressPresentation, setProgressPresentation] = useState({
    isVisible: shouldShowProgress,
    isExiting: false,
    props: progressProps,
  });
  const progressWasVisibleRef = useRef(shouldShowProgress);
  const progressExitTimeoutRef = useRef(null);
  const progressPropsRef = useRef(progressProps);

  useEffect(() => {
    progressPropsRef.current = progressProps;
  }, [progressProps]);

  useEffect(() => {
    if (!shouldShowProgress) return;

    if (progressExitTimeoutRef.current) {
      window.clearTimeout(progressExitTimeoutRef.current);
      progressExitTimeoutRef.current = null;
    }

    progressWasVisibleRef.current = true;
    setProgressPresentation({
      isVisible: true,
      isExiting: false,
      props: progressProps,
    });
  }, [progressProps, shouldShowProgress]);

  useEffect(() => {
    if (shouldShowProgress) return undefined;

    if (!progressWasVisibleRef.current) {
      setProgressPresentation({
        isVisible: false,
        isExiting: false,
        props: progressProps,
      });
      return undefined;
    }

    if (progressExitTimeoutRef.current) return undefined;

    progressWasVisibleRef.current = false;
    setProgressPresentation((currentPresentation) => ({
      ...currentPresentation,
      isExiting: true,
    }));

    progressExitTimeoutRef.current = window.setTimeout(() => {
      setProgressPresentation({
        isVisible: false,
        isExiting: false,
        props: progressPropsRef.current,
      });
      progressExitTimeoutRef.current = null;
    }, 280);

    return () => {
      if (progressExitTimeoutRef.current) {
        window.clearTimeout(progressExitTimeoutRef.current);
        progressExitTimeoutRef.current = null;
      }
    };
  }, [shouldShowProgress]);

  useEffect(() => () => {
    if (progressExitTimeoutRef.current) {
      window.clearTimeout(progressExitTimeoutRef.current);
      progressExitTimeoutRef.current = null;
    }
  }, []);

  return (
    <MessagePrimitive.Root className="ac-message ac-message--assistant">
      <div className="ac-message__label">AskCrystal Guide</div>
      <div className="ac-message__bubble ac-message__bubble--assistant">
        {progressPresentation.isVisible ? (
          <ReadingProgressExperience
            {...progressPresentation.props}
            isExiting={progressPresentation.isExiting}
          />
        ) : null}
        {hasAssistantContent ? (
          <div className="ac-message__content-layer">
            <ReadingReadyMarker />
            <MessagePrimitive.Parts
              components={{
                Text: ({ text }) => <MarkdownContent text={text} />,
                ...askCrystalMessagePartComponents,
              }}
            />
          </div>
        ) : isThinking && !shouldShowProgress ? (
          <DifyPendingLine statusText={statusText} />
        ) : null}
      </div>
      <MessageSuggestions />
      <MessagePrimitive.Error>
        <div className="ac-message__error">The response was interrupted. You can retry from the composer below.</div>
      </MessagePrimitive.Error>
    </MessagePrimitive.Root>
  );
}

function ChatPageHeader({ config }) {
  const heading = typeof config.chatHeading === 'string' && config.chatHeading.trim()
    ? config.chatHeading.trim()
    : 'AskCrystal reading room';
  const description = typeof config.chatDescription === 'string' && config.chatDescription.trim()
    ? config.chatDescription.trim()
    : 'Ask a question, name a feeling, or continue your last thread.';
  const homeUrl = typeof config.homeUrl === 'string' && config.homeUrl.trim()
    ? config.homeUrl.trim()
    : '/';
  const browseUrl = typeof config.browseUrl === 'string' && config.browseUrl.trim()
    ? config.browseUrl.trim()
    : '/collections';

  return (
    <header className="ac-chat-page__header">
      <div className="ac-chat-page__header-copy">
        <p className="ac-chat-page__kicker">AskCrystal</p>
        <h1>{heading}</h1>
        <p>{description}</p>
      </div>
      <nav className="ac-chat-page__nav" aria-label="AskCrystal page shortcuts">
        <a href={homeUrl}>Guide</a>
        <a href={browseUrl}>Shop crystals</a>
      </nav>
    </header>
  );
}

function ChatWelcomeMessage() {
  const capabilities = [
    'Bazi',
    'Horoscope',
    'Tarot',
    'Yinyuan',
    'Feng shui',
    'Numerology',
    'Crystal shopping',
    'Ritual care',
  ];

  return (
    <div className="ac-chat-page__welcome-card">
      <p className="ac-chat-page__welcome-kicker">Welcome in</p>
      <h2>Ask for a reading, a crystal match, or a practical next step.</h2>
      <p>
        AskCrystal can read Bazi charts, daily horoscopes, tarot spreads, relationship patterns,
        feng shui layouts, Shushu numerology, and then connect the guidance to real crystal jewelry
        and care rituals when shopping is useful.
      </p>
      <div className="ac-chat-page__welcome-chips" aria-label="AskCrystal capabilities">
        {capabilities.map(capability => (
          <span key={capability}>{capability}</span>
        ))}
      </div>
    </div>
  );
}

function ChatReadingRoomHero({ hasUserMessages = false }) {
  return (
    <section className="ac-chat-page__hero" aria-label="AskCrystal reading room">
      <div className="ac-chat-page__hero-copy">
        <h1>Hi, I’m AskCrystal</h1>
        <p>Your guide for readings, crystals, rituals, and clarity.</p>
      </div>
      <div className="ac-chat-page__orb" aria-hidden="true">
        <span className="ac-chat-page__orb-field" />
        <span className="ac-chat-page__orb-ring ac-chat-page__orb-ring--outer" />
        <span className="ac-chat-page__orb-ring ac-chat-page__orb-ring--inner" />
        <span className="ac-chat-page__orb-aperture" />
        <span className="ac-chat-page__orb-horizon" />
      </div>
      {!hasUserMessages ? <ChatWelcomeMessage /> : null}
    </section>
  );
}

function AskCrystalThread({ config }) {
  const { runtime, hasUserMessages, activeSessionId, sendPrompt, onCancel, isRunning } = useAskCrystalRuntime(config);
  const askCrystalActions = useMemo(() => ({
    sendPrompt,
    onCancel,
    isRunning,
  }), [isRunning, onCancel, sendPrompt]);
  const displayMode = getEffectiveDisplayMode(config);
  const isChatMode = displayMode === 'chat';
  const shouldAutoScrollConversation = isChatMode && hasUserMessages;
  const homepageRef = useRef(null);
  const viewportRef = useRef(null);
  const hasAutoScrolledIntoConversationRef = useRef(false);
  const pendingPromptConsumedRef = useRef(false);

  useEffect(() => {
    if (!isChatMode || pendingPromptConsumedRef.current || isRunning) return;

    pendingPromptConsumedRef.current = true;
    const pendingPrompt = consumePendingChatPrompt();
    if (!pendingPrompt) return;

    const timeoutId = window.setTimeout(() => {
      sendPrompt(pendingPrompt);
    }, 80);

    return () => window.clearTimeout(timeoutId);
  }, [isChatMode, isRunning, sendPrompt]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const rafId = window.requestAnimationFrame(() => {
      if (!viewportRef.current) return;

      if (!shouldAutoScrollConversation) {
        hasAutoScrolledIntoConversationRef.current = false;
        viewportRef.current.scrollTo({ top: 0, behavior: 'auto' });
        return;
      }

      if (!hasAutoScrolledIntoConversationRef.current) {
        hasAutoScrolledIntoConversationRef.current = true;
        viewportRef.current.scrollTo({ top: viewportRef.current.scrollHeight, behavior: 'auto' });
      }
    });

    return () => window.cancelAnimationFrame(rafId);
  }, [activeSessionId, shouldAutoScrollConversation]);

  useEffect(() => {
    const homepage = homepageRef.current;
    const viewport = viewportRef.current;
    if (!homepage || !viewport || typeof window === 'undefined') return;

    const reduceMotionMedia = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    let rafId = 0;
    let viewportHeight = Math.max(1, viewport.clientHeight || 1);
    const lastVars = new Map();

    const roundPx = value => Math.round(value);
    const roundOpacity = value => Math.round(value * 100) / 100;
    const setCssVar = (name, value) => {
      if (lastVars.get(name) === value) return;
      lastVars.set(name, value);
      homepage.style.setProperty(name, value);
    };

    const syncBackdropPresentation = () => {
      rafId = 0;

      const scrollTop = viewport.scrollTop;
      const fadeDistance = Math.max(280, Math.min(520, viewportHeight * 0.68));
      const nextOpacity = Math.max(0, 1 - scrollTop / fadeDistance);

      if (!isChatMode) {
        const nextOffset = reduceMotionMedia?.matches
          ? 0
          : Math.min(92, scrollTop * 0.28);

        setCssVar('--ac-homepage-backdrop-offset', `${roundPx(nextOffset)}px`);
        setCssVar('--ac-homepage-backdrop-opacity', String(roundOpacity(nextOpacity)));
        return;
      }

      const chatBgBaseOffset = 18;
      const nextChatBgOffset = reduceMotionMedia?.matches
        ? chatBgBaseOffset
        : chatBgBaseOffset + Math.min(260, scrollTop * 0.34);

      setCssVar('--ac-chat-bg-offset', `${roundPx(nextChatBgOffset)}px`);
      setCssVar('--ac-chat-bg-opacity', String(roundOpacity(nextOpacity)));
    };

    const requestBackdropPresentationSync = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(syncBackdropPresentation);
    };
    const handleViewportResize = () => {
      viewportHeight = Math.max(1, viewport.clientHeight || 1);
      requestBackdropPresentationSync();
    };

    syncBackdropPresentation();
    viewport.addEventListener('scroll', requestBackdropPresentationSync, { passive: true });
    window.addEventListener('resize', handleViewportResize, { passive: true });

    return () => {
      viewport.removeEventListener('scroll', requestBackdropPresentationSync);
      window.removeEventListener('resize', handleViewportResize);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [activeSessionId, hasUserMessages, isChatMode]);

  const homepageClassName = [
    'ac-homepage',
    `ac-homepage--${displayMode}`,
    isChatMode ? (hasUserMessages ? 'ac-homepage--has-messages' : 'ac-homepage--empty') : '',
  ].filter(Boolean).join(' ');

  return (
    <AskCrystalActionsContext.Provider value={askCrystalActions}>
      <AssistantRuntimeProvider runtime={runtime}>
        <div ref={homepageRef} className={homepageClassName}>
          {!isChatMode ? (
            <div className="ac-homepage__backdrop" aria-hidden="true">
              <img src={HOMEPAGE_BACKDROP_URL} alt="" loading="eager" decoding="async" />
            </div>
          ) : null}
          <ThreadPrimitive.Root className="ac-homepage__thread">
            <ThreadPrimitive.Viewport
              ref={viewportRef}
              className="ac-homepage__viewport"
              autoScroll={shouldAutoScrollConversation}
              turnAnchor={shouldAutoScrollConversation ? 'bottom' : 'top'}
              scrollToBottomOnInitialize={false}
              scrollToBottomOnRunStart={shouldAutoScrollConversation}
              scrollToBottomOnThreadSwitch={shouldAutoScrollConversation}
            >
              {isChatMode ? (
                <ChatReadingRoomHero hasUserMessages={hasUserMessages} />
              ) : (
                <WelcomeState config={config} />
              )}

              {isChatMode ? (
                <div className="ac-homepage__messages">
                  <ThreadPrimitive.Messages
                    components={{
                      UserMessage,
                      AssistantMessage,
                    }}
                  />
                </div>
              ) : null}

              <ComposerDock />
            </ThreadPrimitive.Viewport>
          </ThreadPrimitive.Root>
        </div>
      </AssistantRuntimeProvider>
    </AskCrystalActionsContext.Provider>
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
