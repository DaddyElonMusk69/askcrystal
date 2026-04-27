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
const SESSION_STORAGE_KEY = 'askcrystal-theme-session-id';
const CHAT_SESSIONS_STORAGE_KEY = 'askcrystal-theme-chat-sessions-v1';
const ACTIVE_CHAT_SESSION_STORAGE_KEY = 'askcrystal-theme-active-session-id';
const SESSION_REGISTRY_EVENT = 'askcrystal:session-registry';
const SESSION_SELECT_EVENT = 'askcrystal:session-select';
const SESSION_CREATE_EVENT = 'askcrystal:session-create';
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

function getPayloadSuggestions(payload) {
  return normalizeThreadSuggestions(
    payload?.suggestions ||
      payload?.suggestedQuestions ||
      payload?.suggested_questions ||
      payload?.data?.suggestions ||
      payload?.data?.suggestedQuestions ||
      payload?.data?.suggested_questions ||
      [],
  );
}

function canUseLocalStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
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

  const normalized = rawValue
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

  const answer = rawAnswer
    .replace(/<minimax:tool_call>[\s\S]*?<\/minimax:tool_call>/gi, '')
    .replace(/<invoke\b[\s\S]*?<\/invoke>/gi, '')
    .replace(/<action_input\b[^>]*>[\s\S]*?<\/action_input>/gi, '')
    .replace(/<parameter\b[^>]*>[\s\S]*?<\/parameter>/gi, '')
    .trimStart();

  if (!answer) return '';

  const structuredFinalAnswer = extractStructuredFinalAnswer(answer);
  let visibleAnswer = stripLeadingFinalAnswerLabel(structuredFinalAnswer || answer);

  if (!structuredFinalAnswer) {
    if (!visibleAnswer) return '';

    const strippedParagraphs = stripLeadingInternalParagraphs(visibleAnswer);
    if (strippedParagraphs) {
      visibleAnswer = stripLeadingFinalAnswerLabel(strippedParagraphs) || visibleAnswer;
    }

    if (looksLikeReactTrace(visibleAnswer) || looksLikeInternalReasoningParagraph(visibleAnswer)) {
      return '';
    }
  }

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
    return 'This one is taking the longer orbit.';
  }

  if (elapsedMs >= 30000) {
    return 'Full readings can take 30-60 seconds to come through.';
  }

  if (elapsedMs >= 12000) {
    return 'A deeper read may take a few more moments.';
  }

  if (elapsedMs >= 4000) {
    return 'Following the strongest thread.';
  }

  return 'The first signs are arriving.';
}

function ProgressCard({
  statusText,
  statusHistoryText = '',
  statusStage = '',
  statusTool = '',
  ambientStatusText = '',
  statusElapsedMs = 0,
}) {
  const startedAtRef = useRef(Date.now());
  const [localElapsedMs, setLocalElapsedMs] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setLocalElapsedMs(Date.now() - startedAtRef.current);
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const elapsedMs = Math.max(Number(statusElapsedMs) || 0, localElapsedMs);
  const showDetailedMilestones = elapsedMs >= 4000 || statusStage === 'tool' || statusStage === 'compose';
  const statusHistory = parseStatusHistory(statusHistoryText);
  const activeStatus = statusText || 'Opening the thread beneath your question...';
  const readingPathLabel = 'Choosing the strongest reading path';
  const oldReadingPathLabel = 'Choosing the right reading path';
  const toolMilestones = statusHistory.filter((label) => label !== readingPathLabel && label !== oldReadingPathLabel);

  if (
    statusStage === 'tool'
    && activeStatus
    && activeStatus !== readingPathLabel
    && activeStatus !== oldReadingPathLabel
    && !toolMilestones.includes(activeStatus)
  ) {
    toolMilestones.push(activeStatus);
  }

  const latestToolMilestones = toolMilestones.slice(-1);
  const milestones = [
    {
      label: 'Your question has entered the reading',
      state: 'done',
    },
  ];

  if (showDetailedMilestones) {
    const hasReadingPathMoved = latestToolMilestones.length > 0 || statusStage === 'compose';
    milestones.push({
      label: hasReadingPathMoved ? 'The strongest reading path is chosen' : readingPathLabel,
      state: hasReadingPathMoved ? 'done' : 'current',
    });

    latestToolMilestones.forEach((label, index) => {
      const isLastToolLine = index === latestToolMilestones.length - 1;
      milestones.push({
        label,
        state: statusStage === 'tool' && isLastToolLine ? 'current' : 'done',
      });
    });

    milestones.push({
      label: 'Shaping the guidance into a clear answer',
      state: statusStage === 'compose' ? 'current' : 'pending',
    });
  } else {
    milestones.push({
      label: activeStatus,
      state: 'current',
    });
  }
  const visibleMilestones = milestones.slice(0, 4);

  return (
    <div className="ac-progress-card" role="status" aria-live="polite">
      <div className="ac-progress-card__header">
        <div className="ac-progress-card__heading">
          <p className="ac-progress-card__eyebrow">AskCrystal is listening</p>
          <h3>Reading the signs</h3>
        </div>
      </div>

      <ol className="ac-progress-card__steps ac-progress-card__steps--lyric" aria-label="Reading progress">
        {visibleMilestones.map((milestone, index) => (
          <li
            key={`${milestone.label}-${index}`}
            className={`ac-progress-card__step ac-progress-card__step--${milestone.state}`}
            style={{ '--ac-progress-step-index': index }}
          >
            <span className="ac-progress-card__step-marker" aria-hidden="true" />
            <span className="ac-progress-card__step-label">{milestone.label}</span>
          </li>
        ))}
      </ol>

      <AmbientProgressLine
        statusText={statusText}
        statusStage={statusStage}
        statusTool={statusTool}
        ambientStatusText={ambientStatusText}
      />

      <div className="ac-progress-card__footer">
        <p className="ac-progress-card__expectation">{getProgressExpectation(elapsedMs)}</p>
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

function sanitizeAssistantText(rawAnswer) {
  const answer = typeof rawAnswer === 'string' ? rawAnswer.trim() : '';
  if (!answer) return '';

  const structuredFinalAnswer = extractStructuredFinalAnswer(answer);
  const sourceAnswer = structuredFinalAnswer || answer;

  const cleaned = sourceAnswer
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
      sourceText: typeof rawAnswer === 'string' && rawAnswer.trim() ? rawAnswer : answer,
    };
  }

  if (components.length > 0) {
    return {
      answer: 'I found a store-backed match for you below.',
      components,
      sourceText: typeof rawAnswer === 'string' && rawAnswer.trim() ? rawAnswer : 'I found a store-backed match for you below.',
    };
  }

  return {
    answer: 'AskCrystal finished the request, but no guidance text came back. Please try again.',
    components: [],
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
    const previewText = stripInlineChatComponentManifestPreview(value).trim();
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

function resolveSuggestionsEndpoint(apiEndpoint) {
  if (!apiEndpoint) return '';

  if (apiEndpoint.endsWith('/suggestions')) {
    return resolveApiEndpoint(apiEndpoint);
  }

  return resolveApiEndpoint(`${apiEndpoint.replace(/\/$/, '')}/suggestions`);
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

function getPayloadMessageId(payload) {
  const value = payload?.messageId || payload?.message_id || payload?.data?.messageId || payload?.data?.message_id;
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

function countSharedPrefixLength(left = '', right = '') {
  const maxLength = Math.min(left.length, right.length);
  let index = 0;

  while (index < maxLength && left[index] === right[index]) {
    index += 1;
  }

  return index;
}

function splitTextIntoRevealSteps(text, maxSteps = 28, speed = 'normal') {
  if (typeof text !== 'string' || !text) return [];

  const tokens = text.match(/\n+|[^\s\n]+(?:\s+)?|[ \t]+/g) || [text];
  if (tokens.length <= maxSteps) return tokens;

  if (speed === 'final') {
    const steps = [];
    const targetStepCount = Math.min(tokens.length, maxSteps);
    let index = 0;

    while (index < tokens.length) {
      const remainingTokens = tokens.length - index;
      const remainingSteps = Math.max(1, targetStepCount - steps.length);
      const averageGroupSize = remainingTokens / remainingSteps;
      const baseGroupSize = Math.max(1, Math.floor(averageGroupSize));
      const varianceRoll = deterministicJitter(index + text.length + steps.length);
      const bump = varianceRoll > 0.72 ? 1 : varianceRoll < 0.18 ? -1 : 0;
      let groupSize = Math.max(1, Math.round(baseGroupSize + bump));

      const currentToken = tokens[index] || '';
      const trimmedCurrentToken = currentToken.trim();
      if (/[\n]/.test(currentToken) || /[.!?。！？]$/.test(trimmedCurrentToken)) {
        groupSize = 1;
      } else if (/[,:;，；：]$/.test(trimmedCurrentToken)) {
        groupSize = Math.min(groupSize, 2);
      } else {
        groupSize = Math.min(groupSize, 3);
      }

      steps.push(tokens.slice(index, index + groupSize).join(''));
      index += groupSize;
    }

    return steps;
  }

  const groupSize = Math.ceil(tokens.length / maxSteps);
  const steps = [];

  for (let index = 0; index < tokens.length; index += groupSize) {
    steps.push(tokens.slice(index, index + groupSize).join(''));
  }

  return steps;
}

function getRevealStepDelay(stepCount, speed = 'normal', stepText = '', stepIndex = 0) {
  let baseDelay = 0;

  if (speed === 'fast') {
    if (stepCount <= 1) return 0;
    if (stepCount <= 10) baseDelay = 16;
    else if (stepCount <= 20) baseDelay = 11;
    else if (stepCount <= 32) baseDelay = 8;
    else baseDelay = 6;
  } else if (speed === 'final') {
    if (stepCount <= 1) return 0;
    if (stepCount <= 8) baseDelay = 112;
    else if (stepCount <= 16) baseDelay = 94;
    else if (stepCount <= 28) baseDelay = 78;
    else if (stepCount <= 44) baseDelay = 64;
    else if (stepCount <= 64) baseDelay = 54;
    else baseDelay = 46;
  } else {
    if (stepCount <= 1) return 0;
    if (stepCount <= 8) baseDelay = 24;
    else if (stepCount <= 16) baseDelay = 18;
    else baseDelay = 12;
  }

  const trimmed = typeof stepText === 'string' ? stepText.trim() : '';
  const punctuationPause = /[.!?。！？]$/.test(trimmed)
    ? 176
    : /[,;:，；：]$/.test(trimmed)
      ? 104
      : /\n/.test(stepText)
        ? 136
        : 0;
  const lengthBias = speed === 'final' ? Math.min(28, Math.max(0, trimmed.length * 2 - 10)) : 0;
  const jitterRange = speed === 'final' ? 52 : 6;
  const jitter = Math.round((deterministicJitter(stepIndex + stepCount + trimmed.length) - 0.5) * jitterRange);
  const cadencePulse = speed === 'final' && deterministicJitter(stepIndex * 3.17 + stepCount) > 0.78
    ? 64 + Math.round(deterministicJitter(stepIndex + 17) * 48)
    : 0;

  return Math.max(0, baseDelay + punctuationPause + lengthBias + jitter + cadencePulse);
}

function shouldProgressivelyRevealAnswer({ currentAnswer = '', nextAnswer = '', visibleDeltaCount = 0 }) {
  if (!nextAnswer || nextAnswer === currentAnswer) return false;
  if (!currentAnswer) return true;
  if (nextAnswer.startsWith(currentAnswer)) return true;
  if (visibleDeltaCount === 0) return true;

  const sharedPrefixLength = countSharedPrefixLength(currentAnswer, nextAnswer);
  const sharedPrefixRatio = sharedPrefixLength / Math.max(1, Math.min(currentAnswer.length, nextAnswer.length));
  return sharedPrefixRatio >= 0.65 && nextAnswer.length > currentAnswer.length;
}

function getRevealSpeed({ currentAnswer = '', visibleDeltaCount = 0 }) {
  if (!currentAnswer || visibleDeltaCount <= 1) {
    return 'fast';
  }

  return 'normal';
}

function waitForRevealTick(delayMs, signal) {
  if (!delayMs) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const timeoutId = globalThis.setTimeout(() => {
      cleanup();
      resolve();
    }, delayMs);

    const handleAbort = () => {
      cleanup();
      reject(createAbortError());
    };

    function cleanup() {
      globalThis.clearTimeout(timeoutId);
      signal?.removeEventListener?.('abort', handleAbort);
    }

    signal?.addEventListener?.('abort', handleAbort, { once: true });
  });
}

async function progressivelyRevealAnswer({
  currentAnswer = '',
  nextAnswer = '',
  abortSignal,
  onDelta,
  eventPayload,
  speed = 'normal',
}) {
  if (!nextAnswer || nextAnswer === currentAnswer) {
    return nextAnswer || currentAnswer;
  }

  const appendFromCurrent = Boolean(currentAnswer) && nextAnswer.startsWith(currentAnswer);
  let revealSeed = appendFromCurrent ? currentAnswer : '';

  if (!appendFromCurrent && currentAnswer) {
    const sharedPrefixLength = countSharedPrefixLength(currentAnswer, nextAnswer);
    const sharedPrefixRatio = sharedPrefixLength / Math.max(1, Math.min(currentAnswer.length, nextAnswer.length));

    if (sharedPrefixRatio >= 0.65) {
      revealSeed = nextAnswer.slice(0, sharedPrefixLength);
    }
  }

  const revealTail = nextAnswer.slice(revealSeed.length);
  if (!revealTail) {
    if (revealSeed !== currentAnswer) {
      onDelta?.('', revealSeed, eventPayload);
    }
    return nextAnswer;
  }

  const maxSteps = speed === 'fast'
    ? (nextAnswer.length > 1400 ? 64 : nextAnswer.length > 700 ? 52 : 40)
    : speed === 'final'
      ? (nextAnswer.length > 1800 ? 120 : nextAnswer.length > 1200 ? 104 : nextAnswer.length > 700 ? 88 : 68)
      : (nextAnswer.length > 1400 ? 44 : nextAnswer.length > 700 ? 36 : 28);
  const revealSteps = splitTextIntoRevealSteps(revealTail, maxSteps, speed);
  let revealedAnswer = revealSeed;

  for (let index = 0; index < revealSteps.length; index += 1) {
    throwIfAborted(abortSignal);
    const step = revealSteps[index];
    revealedAnswer += step;

    const isReplaceFrame = !appendFromCurrent && index === 0;
    onDelta?.(isReplaceFrame ? '' : step, revealedAnswer, eventPayload);

    if (index < revealSteps.length - 1) {
      const revealDelay = getRevealStepDelay(revealSteps.length, speed, step, index);
      await waitForRevealTick(revealDelay, abortSignal);
    }
  }

  return nextAnswer;
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

async function fetchProxySuggestions({ apiEndpoint, messageId, sessionId }) {
  if (!apiEndpoint || !messageId) return [];

  try {
    const response = await fetch(resolveSuggestionsEndpoint(apiEndpoint), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messageId,
        sessionId,
      }),
    });

    if (!response.ok) return [];

    const payload = await response.json();
    return normalizeThreadSuggestions(
      payload?.suggestions ||
        payload?.data?.suggestions ||
        payload?.data ||
        [],
    );
  } catch (error) {
    console.error('[AskCrystal] Suggested prompts request failed.', error);
    return [];
  }
}

async function fetchProxyReply({ apiEndpoint, messages, abortSignal, conversationId, sessionId, onStatus, onDelta, onComponents, onSuggestions }) {
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
  let streamedRawAnswer = '';
  let bufferedAnswer = '';
  let streamedComponents = [];
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

      const payloadSuggestions = getPayloadSuggestions(event.payload);
      if (payloadSuggestions.length) {
        throwIfAborted(abortSignal);
        streamedSuggestions = payloadSuggestions;
        onSuggestions?.(payloadSuggestions, event.payload);
        latestConversationId =
          event.payload?.conversationId || event.payload?.conversation_id || latestConversationId;
      }

      if (event.event === 'replace') {
        throwIfAborted(abortSignal);
        const replacementRaw = getPayloadText(event.payload);
        if (replacementRaw) {
          streamedRawAnswer = replacementRaw;
          const replacement = sanitizeStreamingVisibleAnswer(streamedRawAnswer);
          if (replacement) {
            bufferedAnswer = replacement;
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
            bufferedAnswer = nextVisibleAnswer;
          }
        }

        latestConversationId =
          event.payload?.conversationId || event.payload?.conversation_id || latestConversationId;
      }

      if (event.event === 'complete') {
        throwIfAborted(abortSignal);
        const completeRawAnswer = getPayloadText(event.payload) || streamedRawAnswer;
        const completeAnswer = sanitizeStreamingVisibleAnswer(completeRawAnswer) || bufferedAnswer;
        const finalAnswer = completeAnswer || bufferedAnswer;
        const normalizedReply = normalizeAssistantReply(completeRawAnswer || finalAnswer, streamedComponents);

        return {
          answer: normalizedReply.answer,
          components: normalizedReply.components,
          sourceText: normalizedReply.sourceText,
          suggestions: payloadSuggestions.length ? payloadSuggestions : streamedSuggestions,
          conversationId: event.payload?.conversationId || event.payload?.conversation_id || latestConversationId || null,
          messageId: getPayloadMessageId(event.payload) || null,
        };
      }
    }
  }

  if (bufferedAnswer || streamedComponents.length > 0) {
    const normalizedReply = normalizeAssistantReply(bufferedAnswer, streamedComponents);
    return {
      answer: normalizedReply.answer,
      components: normalizedReply.components,
      sourceText: normalizedReply.sourceText,
      suggestions: streamedSuggestions,
      conversationId: latestConversationId,
      messageId: null,
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
}) {
  const statusHistoryText = parseStatusHistory(statusHistory).join('\n');
  const normalizedStatusElapsedMs = Number(statusElapsedMs);

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
      },
    },
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

async function resolveReply({ config, messages, abortSignal, conversationId, sessionId, onStatus, onDelta, onComponents, onSuggestions }) {
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
        onSuggestions,
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
    suggestions: [],
    sourceText: demoReply.answer,
    conversationId,
    messageId: null,
  };
}

function useAskCrystalRuntime(config) {
  const initialChatState = useMemo(() => loadStoredChatState(), []);
  const initialSession = getSessionById(initialChatState.sessions, initialChatState.activeSessionId) || initialChatState.sessions[0];
  const [sessions, setSessions] = useState(initialChatState.sessions);
  const [activeSessionId, setActiveSessionId] = useState(initialSession.id);
  const [messages, setMessages] = useState(initialSession.messages);
  const [suggestions, setSuggestions] = useState(initialSession.suggestions);
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
      conversationId: conversationIdRef.current,
      updatedAt: new Date().toISOString(),
    }));
  }, [activeSessionId, messages, suggestions]);

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

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const handleSessionSelect = (event) => {
      switchToSession(event.detail?.sessionId || '');
    };
    const handleSessionCreate = () => {
      createSessionAndSwitch();
    };

    window.addEventListener(SESSION_SELECT_EVENT, handleSessionSelect);
    window.addEventListener(SESSION_CREATE_EVENT, handleSessionCreate);
    return () => {
      window.removeEventListener(SESSION_SELECT_EVENT, handleSessionSelect);
      window.removeEventListener(SESSION_CREATE_EVENT, handleSessionCreate);
    };
  }, [createSessionAndSwitch, switchToSession]);

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
    isRunningRef.current = false;
    setIsRunning(false);
    setSuggestions([]);

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
        statusText: 'Settling into your energy...',
        statusStage: 'listen',
        statusHistory: [],
        ambientStatusText: 'Settling into your energy...',
        statusElapsedMs: 0,
      });
      const conversationForReply = [...messagesRef.current, userMessage];

      activeRunRef.current = abortController;
      activeAssistantIdRef.current = assistantId;
      activeTaskIdRef.current = '';
      cancelRequestedRef.current = false;
      isRunningRef.current = true;
      setIsRunning(true);
      setSuggestions([]);
      setMessages([...conversationForReply, assistantSeed]);
      let revealedAnswer = '';
      let bufferedComponents = [];
      let bufferedSuggestions = [];

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
            updateAssistantMessage(assistantId, (message) =>
              createAssistantMessage({
                id: assistantId,
                parts: buildAssistantParts({
                  text: '',
                  components: [],
                }),
                components: [],
                status: {
                  type: 'running',
                },
                statusText: normalizedStatus.message,
                statusStage: normalizedStatus.stage,
                statusTool: normalizedStatus.tool,
                statusHistory: appendStatusHistory(message.metadata?.custom?.statusHistoryText, normalizedStatus),
                ambientStatusText: normalizedStatus.stage === 'tool'
                  ? (message.metadata?.custom?.ambientStatusText || 'Settling into your energy...')
                  : normalizedStatus.message,
                statusElapsedMs: normalizedStatus.elapsedMs,
              }),
            );
          },
          onComponents: (nextComponents, _newComponents, eventPayload) => {
            if (abortController.signal.aborted) return;
            const nextTaskId = getPayloadTaskId(eventPayload);
            if (nextTaskId) {
              activeTaskIdRef.current = nextTaskId;
            }
            bufferedComponents = nextComponents;
          },
          onSuggestions: (nextSuggestions) => {
            if (abortController.signal.aborted) return;
            bufferedSuggestions = normalizeThreadSuggestions(nextSuggestions);
          },
        });

        conversationIdRef.current = result.conversationId || conversationIdRef.current;
        activeTaskIdRef.current = '';
        cancelRequestedRef.current = false;
        const finalComponents = result.components || bufferedComponents;
        const finalSuggestions = normalizeThreadSuggestions(
          result.suggestions?.length ? result.suggestions : bufferedSuggestions,
        );

        updateAssistantMessage(assistantId, () =>
          createAssistantMessage({
            id: assistantId,
            parts: buildAssistantParts({
              text: '',
              components: [],
            }),
            components: [],
            status: {
              type: 'running',
            },
            statusText: '',
            statusStage: '',
            statusTool: '',
            statusHistory: [],
          }),
        );

        revealedAnswer = await progressivelyRevealAnswer({
          currentAnswer: '',
          nextAnswer: result.answer,
          abortSignal: abortController.signal,
          speed: 'final',
          onDelta: (_delta, nextAnswer) => {
            if (abortController.signal.aborted) return;
            revealedAnswer = nextAnswer;
            updateAssistantMessage(assistantId, () =>
              createAssistantMessage({
                id: assistantId,
                parts: buildAssistantParts({
                  text: nextAnswer,
                  components: [],
                }),
                components: [],
                status: {
                  type: 'running',
                },
                statusText: '',
                statusStage: '',
                statusTool: '',
                statusHistory: [],
              }),
            );
          },
        });

        setMessages([
          ...conversationForReply,
          createAssistantMessage({
            id: assistantId,
            parts: buildAssistantParts({
              text: revealedAnswer || result.answer || result.sourceText,
              components: finalComponents,
            }),
            components: finalComponents,
            status: {
              type: 'complete',
              reason: 'stop',
            },
          }),
        ]);
        setSuggestions(finalSuggestions);

        if (result.messageId && config.apiEndpoint) {
          const suggestionsSessionId = activeSessionIdRef.current;
          fetchProxySuggestions({
            apiEndpoint: config.apiEndpoint,
            messageId: result.messageId,
            sessionId: sessionIdRef.current,
          }).then((nextSuggestions) => {
            if (!nextSuggestions.length) return;
            if (activeSessionIdRef.current !== suggestionsSessionId) return;
            setSuggestions(nextSuggestions);
          });
        }
      } catch (error) {
        if (error?.name === 'AbortError') {
          activeTaskIdRef.current = '';
          setSuggestions([]);
          setMessages([
            ...conversationForReply,
            createCancelledAssistantMessage({
              id: assistantId,
              text: revealedAnswer,
              components: [],
            }),
          ]);
          return;
        }

        console.error('[AskCrystal] Assistant runtime failed.', error);
        activeTaskIdRef.current = '';
        cancelRequestedRef.current = false;
        setSuggestions([]);
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
    [config, updateAssistantMessage],
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
    [activeSessionId, isRunning, messages, onCancel, onNew, replaceMessages, sessions, suggestions],
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
      id: 'compatibility',
      layout: 'portrait',
      eyebrow: 'Love',
      title: 'Read love and synastry',
      description: 'Explore soulmate, synastry, and relationship guidance.',
      cta: 'Cosmic match',
      emblemUrl: 'https://cdn.shopify.com/s/files/1/0981/4786/0843/files/emblem_1.png?v=1777105421',
      prompt: 'Can you do a love and compatibility reading for me?',
    },
    {
      id: 'divination',
      layout: 'portrait',
      eyebrow: 'Readings',
      title: 'Tarot, Bazi, and energy readings',
      description: 'Use tarot, Bazi, or a daily check-in before you shop.',
      cta: 'Start a reading',
      emblemUrl: 'https://cdn.shopify.com/s/files/1/0981/4786/0843/files/emblem_2.png?v=1777105421',
      prompt: 'Give me a reading using the best method for my current situation.',
    },
    {
      id: 'ask-anything',
      layout: 'wide',
      eyebrow: 'Open chat',
      title: 'Ask anything about crystals, rituals, or life',
      description: 'Start with a question, a feeling, or a life situation.',
      cta: 'Ask AskCrystal',
      emblemUrl: 'https://cdn.shopify.com/s/files/1/0981/4786/0843/files/emblem_3.png?v=1777105421',
      prompt: 'I have a situation in my life and want guidance plus crystal recommendations.',
    },
    {
      id: 'horoscope',
      layout: 'wide',
      eyebrow: 'Horoscope',
      title: 'Check today\'s cosmic weather',
      description: 'Get zodiac timing, mood guidance, and crystal support.',
      cta: 'Read my horoscope',
      emblemUrl: 'https://cdn.shopify.com/s/files/1/0981/4786/0843/files/emblem_4.png?v=1777105421',
      prompt: 'Give me a daily horoscope reading and crystal guidance. Ask for my zodiac sign if you need it.',
    },
    {
      id: 'browse-store',
      layout: 'wide',
      eyebrow: 'Storefront',
      title: 'Browse the full crystal shop',
      description: 'Open the wider shelf, then return whenever you want guidance.',
      cta: 'Browse all products',
      emblemUrl: 'https://cdn.shopify.com/s/files/1/0981/4786/0843/files/emblem_5.png?v=1777105421',
      href: config.browseUrl,
    },
  ];

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
  const suggestions = useAssistantState(({ thread }) => thread.suggestions || []);
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

  if (!messageCompleted || isThreadRunning || !isLatestAssistantMessage || !suggestions.length) {
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

function AssistantMessage() {
  const assistantParts = useMessage((message) => message.content || message.parts || []);
  const assistantText = extractTextFromParts(assistantParts);
  const hasToolParts = assistantParts.some((part) => part.type === 'tool-call');
  const isRunning = useMessage((message) => message.status?.type === 'running');
  const statusText = useMessage((message) => message.metadata?.custom?.statusText || '');
  const statusStage = useMessage((message) => message.metadata?.custom?.statusStage || '');
  const statusTool = useMessage((message) => message.metadata?.custom?.statusTool || '');
  const statusHistoryText = useMessage((message) => message.metadata?.custom?.statusHistoryText || '');
  const ambientStatusText = useMessage((message) => message.metadata?.custom?.ambientStatusText || '');
  const statusElapsedMs = useMessage((message) => message.metadata?.custom?.statusElapsedMs || 0);
  const isThinking = isRunning && !assistantText && !hasToolParts;
  const showInlineStatus = isRunning && (Boolean(assistantText) || hasToolParts) && statusStage === 'tool' && Boolean(statusText);

  return (
    <MessagePrimitive.Root className="ac-message ac-message--assistant">
      <div className="ac-message__label">AskCrystal Guide</div>
      <div className="ac-message__bubble ac-message__bubble--assistant">
        {isThinking ? (
          <ProgressCard
            statusText={statusText}
            statusHistoryText={statusHistoryText}
            statusStage={statusStage}
            statusTool={statusTool}
            ambientStatusText={ambientStatusText}
            statusElapsedMs={statusElapsedMs}
          />
        ) : (
          <div className="ac-message__content-layer">
            <MessagePrimitive.Parts
              components={{
                Text: ({ text }) => <MarkdownContent text={text} />,
                ...askCrystalMessagePartComponents,
              }}
            />
          </div>
        )}
      </div>
      {showInlineStatus ? (
        <div className="ac-message__status">
          <LiveStatus statusText={statusText} />
        </div>
      ) : null}
      <MessageSuggestions />
      <MessagePrimitive.Error>
        <div className="ac-message__error">The response was interrupted. You can retry from the composer below.</div>
      </MessagePrimitive.Error>
    </MessagePrimitive.Root>
  );
}

function AskCrystalThread({ config }) {
  const { runtime, hasUserMessages, activeSessionId, sendPrompt, onCancel, isRunning } = useAskCrystalRuntime(config);
  const askCrystalActions = useMemo(() => ({
    sendPrompt,
    onCancel,
    isRunning,
  }), [isRunning, onCancel, sendPrompt]);
  const homepageRef = useRef(null);
  const viewportRef = useRef(null);
  const hasAutoScrolledIntoConversationRef = useRef(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const rafId = window.requestAnimationFrame(() => {
      if (!viewportRef.current) return;

      if (!hasUserMessages) {
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
  }, [activeSessionId, hasUserMessages]);

  useEffect(() => {
    const homepage = homepageRef.current;
    const viewport = viewportRef.current;
    if (!homepage || !viewport || typeof window === 'undefined') return;

    const reduceMotionMedia = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    let rafId = 0;

    const syncBackdropPresentation = () => {
      rafId = 0;

      const fadeDistance = Math.max(180, Math.min(320, viewport.clientHeight * 0.4));
      const nextOffset = reduceMotionMedia?.matches
        ? 0
        : Math.min(54, viewport.scrollTop * 0.18);
      const nextOpacity = Math.max(0, 1 - viewport.scrollTop / fadeDistance);

      homepage.style.setProperty('--ac-homepage-backdrop-offset', `${nextOffset.toFixed(2)}px`);
      homepage.style.setProperty('--ac-homepage-backdrop-opacity', nextOpacity.toFixed(3));
    };

    const requestBackdropPresentationSync = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(syncBackdropPresentation);
    };

    syncBackdropPresentation();
    viewport.addEventListener('scroll', requestBackdropPresentationSync, { passive: true });

    return () => {
      viewport.removeEventListener('scroll', requestBackdropPresentationSync);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [activeSessionId]);

  return (
    <AskCrystalActionsContext.Provider value={askCrystalActions}>
      <AssistantRuntimeProvider runtime={runtime}>
        <div ref={homepageRef} className="ac-homepage">
          <div className="ac-homepage__backdrop" aria-hidden="true">
            <img src={HOMEPAGE_BACKDROP_URL} alt="" loading="eager" decoding="async" />
          </div>
          <ThreadPrimitive.Root className="ac-homepage__thread">
            <ThreadPrimitive.Viewport
              ref={viewportRef}
              className="ac-homepage__viewport"
              autoScroll={hasUserMessages}
              turnAnchor={hasUserMessages ? 'bottom' : 'top'}
              scrollToBottomOnInitialize={false}
              scrollToBottomOnRunStart={hasUserMessages}
              scrollToBottomOnThreadSwitch={hasUserMessages}
            >
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
