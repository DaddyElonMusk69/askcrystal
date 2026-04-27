import { Component } from '@theme/component';
import { trapFocus, removeTrapFocus } from '@theme/focus';
import { onAnimationEnd, removeWillChangeOnAnimationEnd } from '@theme/utilities';

const SESSION_DRAWER_SELECTOR = '[data-askcrystal-session-drawer-root]';
const CHAT_SESSIONS_STORAGE_KEY = 'askcrystal-theme-chat-sessions-v1';
const ACTIVE_CHAT_SESSION_STORAGE_KEY = 'askcrystal-theme-active-session-id';
const SESSION_REGISTRY_EVENT = 'askcrystal:session-registry';
const SESSION_SELECT_EVENT = 'askcrystal:session-select';
const SESSION_DELETE_EVENT = 'askcrystal:session-delete';
const FALLBACK_SESSION_TITLE = 'New reading';
const FALLBACK_SESSION_PREVIEW = 'No messages yet.';
const CHAT_ROUTE_URL = '/?askcrystal=chat';
const HOME_ROUTE_URL = '/';
const MAX_STORED_CHAT_SESSIONS = 24;

/**
 * A custom element that manages the main menu drawer.
 *
 * @typedef {object} Refs
 * @property {HTMLDetailsElement} details - The details element.
 * @property {HTMLDivElement} menuDrawer - The slideable drawer panel containing the menu.
 *
 * @extends {Component<Refs>}
 */
class HeaderDrawer extends Component {
  requiredRefs = ['details', 'menuDrawer'];
  #sessionState = {
    sessions: [],
    activeSessionId: '',
    isRunning: false,
  };
  #sessionDrawerObserver = new MutationObserver(() => {
    const host = this.querySelector(SESSION_DRAWER_SELECTOR);
    if (!(host instanceof HTMLElement)) return;
    if (host.childElementCount > 0) return;

    this.#renderSessionDrawer();
  });

  connectedCallback() {
    super.connectedCallback();

    this.#sessionState = this.#readStoredSessionState();
    this.addEventListener('keyup', this.#onKeyUp);
    this.addEventListener('click', this.#onClick);
    window.addEventListener(SESSION_REGISTRY_EVENT, this.#onSessionRegistry);
    window.addEventListener('storage', this.#onStorage);
    this.#setupAnimatedElementListeners();
    this.#renderSessionDrawer();
    this.#sessionDrawerObserver.observe(this, {
      childList: true,
      subtree: true,
    });
  }

  updatedCallback() {
    super.updatedCallback();
    this.#setupAnimatedElementListeners();
    this.#renderSessionDrawer();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keyup', this.#onKeyUp);
    this.removeEventListener('click', this.#onClick);
    window.removeEventListener(SESSION_REGISTRY_EVENT, this.#onSessionRegistry);
    window.removeEventListener('storage', this.#onStorage);
    this.#sessionDrawerObserver.disconnect();
  }

  /**
   * Close the main menu drawer when the Escape key is pressed
   * @param {KeyboardEvent} event
   */
  #onKeyUp = (event) => {
    if (event.key !== 'Escape') return;

    this.#close(this.#getDetailsElement(event));
  };

  #onClick = (event) => {
    if (!(event.target instanceof Element)) return;

    const deleteButton = event.target.closest('[data-askcrystal-session-action="delete"]');
    if (deleteButton instanceof HTMLButtonElement) {
      if (deleteButton.disabled || this.#sessionState.isRunning) return;

      const sessionId = deleteButton.getAttribute('data-askcrystal-session-id') || '';
      if (!sessionId) return;

      const sessionTitle =
        deleteButton.getAttribute('data-askcrystal-session-title') ||
        FALLBACK_SESSION_TITLE;
      const confirmed = window.confirm(
        `Delete "${sessionTitle}"?\n\nThis cannot be undone.`
      );
      if (!confirmed) return;

      const nextState = removeStoredSession(sessionId);
      this.#sessionState = {
        ...nextState,
        isRunning: this.#sessionState.isRunning,
      };
      this.#renderSessionDrawer();
      window.dispatchEvent(
        new CustomEvent(SESSION_DELETE_EVENT, {
          detail: {
            sessionId,
          },
        })
      );
      return;
    }

    const createButton = event.target.closest('[data-askcrystal-session-action="create"]');
    if (createButton instanceof HTMLButtonElement) {
      if (createButton.disabled || this.#sessionState.isRunning) return;

      const nextState = createStoredSessionAndSelect();
      this.#sessionState = {
        ...nextState,
        isRunning: this.#sessionState.isRunning,
      };
      this.#renderSessionDrawer();
      this.close();
      window.location.assign(HOME_ROUTE_URL);
      return;
    }

    const sessionButton = event.target.closest('[data-askcrystal-session-id]');
    if (!(sessionButton instanceof HTMLButtonElement)) return;

    if (sessionButton.disabled || this.#sessionState.isRunning) return;

    const sessionId = sessionButton.getAttribute('data-askcrystal-session-id') || '';
    if (!sessionId) return;

    writeLocalStorageValue(ACTIVE_CHAT_SESSION_STORAGE_KEY, sessionId);
    this.#sessionState = {
      ...this.#sessionState,
      activeSessionId: sessionId,
    };
    this.#renderSessionDrawer();

    window.dispatchEvent(
      new CustomEvent(SESSION_SELECT_EVENT, {
        detail: {
          sessionId,
        },
      })
    );
    this.close();

    if (!isAskCrystalChatRoute()) {
      window.location.assign(CHAT_ROUTE_URL);
    }
  };

  #onSessionRegistry = (event) => {
    this.#sessionState = normalizeSessionRegistry(event.detail);
    this.#renderSessionDrawer();
  };

  #onStorage = (event) => {
    if (
      event.key &&
      event.key !== CHAT_SESSIONS_STORAGE_KEY &&
      event.key !== ACTIVE_CHAT_SESSION_STORAGE_KEY
    ) {
      return;
    }

    const storedState = this.#readStoredSessionState();
    this.#sessionState = {
      ...storedState,
      isRunning: this.#sessionState.isRunning,
    };
    this.#renderSessionDrawer();
  };

  /**
   * @returns {boolean} Whether the main menu drawer is open
   */
  get isOpen() {
    return this.refs.details.hasAttribute('open');
  }

  /**
   * Get the closest details element to the event target
   * @param {Event | undefined} event
   * @returns {HTMLDetailsElement}
   */
  #getDetailsElement(event) {
    if (!(event?.target instanceof Element)) return this.refs.details;

    return event.target.closest('details') ?? this.refs.details;
  }

  /**
   * Toggle the main menu drawer
   */
  toggle() {
    return this.isOpen ? this.close() : this.open();
  }

  /**
   * Open the closest drawer or the main menu drawer
   * @param {string} [target]
   * @param {Event} [event]
   */
  open(target, event) {
    const details = this.#getDetailsElement(event);
    const summary = details.querySelector('summary');

    if (!summary) return;

    const storedState = this.#readStoredSessionState();
    this.#sessionState = {
      ...storedState,
      isRunning: this.#sessionState.isRunning,
    };
    this.#renderSessionDrawer();

    summary.setAttribute('aria-expanded', 'true');

    this.preventInitialAccordionAnimations(details);
    requestAnimationFrame(() => {
      details.classList.add('menu-open');

      if (target) {
        this.refs.menuDrawer.classList.add('menu-drawer--has-submenu-opened');
      }

      // Wait for the drawer animation to complete before trapping focus
      const drawer = details.querySelector('.menu-drawer, .menu-drawer__submenu');
      onAnimationEnd(drawer || details, () => trapFocus(details), { subtree: false });
    });
  }

  /**
   * Go back or close the main menu drawer
   * @param {Event} [event]
   */
  back(event) {
    this.#close(this.#getDetailsElement(event));
  }

  /**
   * Close the main menu drawer
   */
  close() {
    this.#close(this.refs.details);
  }

  /**
   * Close the closest menu or submenu that is open
   *
   * @param {HTMLDetailsElement} details
   */
  #close(details) {
    const summary = details.querySelector('summary');

    if (!summary) return;

    summary.setAttribute('aria-expanded', 'false');
    details.classList.remove('menu-open');
    this.refs.menuDrawer.classList.remove('menu-drawer--has-submenu-opened');

    // Wait for the .menu-drawer element's transition, not the entire details subtree
    // This avoids waiting for child accordion/resource-card animations which can cause issues on Firefox
    const drawer = details.querySelector('.menu-drawer, .menu-drawer__submenu');

    onAnimationEnd(
      drawer || details,
      () => {
        reset(details);
        if (details === this.refs.details) {
          removeTrapFocus();
          const openDetails = this.querySelectorAll('details[open]:not(accordion-custom > details)');
          openDetails.forEach(reset);
        } else {
          trapFocus(this.refs.details);
        }
      },
      { subtree: false }
    );
  }

  /**
   * Attach animationend event listeners to all animated elements to remove will-change after animation
   * to remove the stacking context and allow submenus to be positioned correctly
   */
  #setupAnimatedElementListeners() {
    const allAnimated = this.querySelectorAll('.menu-drawer__animated-element');
    allAnimated.forEach((element) => {
      if (element instanceof HTMLElement && element.dataset.askcrystalAnimationBound === 'true') return;

      element.addEventListener('animationend', removeWillChangeOnAnimationEnd);
      if (element instanceof HTMLElement) {
        element.dataset.askcrystalAnimationBound = 'true';
      }
    });
  }

  /**
   * Temporarily disables accordion animations to prevent unwanted transitions when the drawer opens.
   * Adds a no-animation class to accordion content elements, then removes it after 100ms to
   * re-enable animations for user interactions.
   * @param {HTMLDetailsElement} details - The details element containing the accordions
   */
  preventInitialAccordionAnimations(details) {
    const content = details.querySelectorAll('accordion-custom .details-content');

    content.forEach((element) => {
      if (element instanceof HTMLElement) {
        element.classList.add('details-content--no-animation');
      }
    });
    setTimeout(() => {
      content.forEach((element) => {
        if (element instanceof HTMLElement) {
          element.classList.remove('details-content--no-animation');
        }
      });
    }, 100);
  }

  #readStoredSessionState() {
    return normalizeSessionRegistry({
      sessions: getStoredSessionSummaries(),
      activeSessionId: readLocalStorageValue(ACTIVE_CHAT_SESSION_STORAGE_KEY),
      isRunning: false,
    });
  }

  #renderSessionDrawer() {
    const host = this.querySelector(SESSION_DRAWER_SELECTOR);
    if (!(host instanceof HTMLElement)) return;

    const nextState = normalizeSessionRegistry(this.#sessionState);
    host.replaceChildren(buildSessionDrawerFragment(nextState));
  }
}

if (!customElements.get('header-drawer')) {
  customElements.define('header-drawer', HeaderDrawer);
}

/**
 * Reset an open details element to its original state
 *
 * @param {HTMLDetailsElement} element
 */
function reset(element) {
  element.classList.remove('menu-open');
  element.removeAttribute('open');
  element.querySelector('summary')?.setAttribute('aria-expanded', 'false');
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

function isAskCrystalChatRoute() {
  if (typeof window === 'undefined') return false;

  try {
    const params = new URLSearchParams(window.location.search);
    return window.location.pathname.includes('/pages/askcrystal') || params.get('askcrystal') === 'chat';
  } catch {
    return window.location.pathname.includes('/pages/askcrystal');
  }
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

function extractTextFromParts(parts = []) {
  return parts
    .map((part) => {
      if (part?.type === 'text' || part?.type === 'reasoning') {
        return typeof part.text === 'string' ? part.text : '';
      }

      return '';
    })
    .join(' ')
    .trim();
}

function getMessagePreviewText(message) {
  if (!message || typeof message !== 'object') return '';

  const parts = Array.isArray(message.content)
    ? message.content
    : Array.isArray(message.parts)
      ? message.parts
      : [];
  const text = extractTextFromParts(parts);
  if (text) return text;

  if (Array.isArray(message.metadata?.unstable_data) && message.metadata.unstable_data.length > 0) {
    return message.role === 'assistant' ? 'Shared storefront picks and guidance.' : '';
  }

  return '';
}

function deriveSessionTitle(messages, fallback = FALLBACK_SESSION_TITLE) {
  if (!Array.isArray(messages)) return fallback;

  const firstUserMessage = messages.find(
    (message) => message?.role === 'user' && getMessagePreviewText(message)
  );
  const preview = getMessagePreviewText(firstUserMessage);
  return preview ? truncateText(preview, 42) : fallback;
}

function deriveSessionPreview(messages) {
  if (!Array.isArray(messages) || messages.length === 0) {
    return FALLBACK_SESSION_PREVIEW;
  }

  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const preview = getMessagePreviewText(messages[index]);
    if (preview) return truncateText(preview, 78);
  }

  return FALLBACK_SESSION_PREVIEW;
}

function getLatestMessageTimestamp(messages, fallback = '') {
  if (!Array.isArray(messages) || messages.length === 0) return fallback;

  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const value = messages[index]?.createdAt;
    if (!value) continue;

    const timestamp = new Date(value);
    if (!Number.isNaN(timestamp.getTime())) {
      return timestamp.toISOString();
    }
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

function normalizeStoredSessionSummary(session) {
  if (!session || typeof session !== 'object') return null;

  const messages = Array.isArray(session.messages) ? session.messages : [];
  const createdAt =
    typeof session.createdAt === 'string' && session.createdAt
      ? session.createdAt
      : new Date().toISOString();
  const updatedAt =
    typeof session.updatedAt === 'string' && session.updatedAt
      ? session.updatedAt
      : getLatestMessageTimestamp(messages, createdAt) || createdAt;

  return {
    id: typeof session.id === 'string' && session.id ? session.id : '',
    title:
      typeof session.title === 'string' && session.title.trim()
        ? session.title.trim()
        : deriveSessionTitle(messages),
    preview: deriveSessionPreview(messages),
    createdAt,
    updatedAt,
    isEmpty: messages.length === 0,
  };
}

function getStoredSessionSummaries() {
  const storedSessions = parseJsonValue(readLocalStorageValue(CHAT_SESSIONS_STORAGE_KEY), []);
  if (!Array.isArray(storedSessions)) return [];

  return sortSessionsByRecent(storedSessions.map(normalizeStoredSessionSummary).filter(Boolean));
}

function getStoredSessions() {
  const storedSessions = parseJsonValue(readLocalStorageValue(CHAT_SESSIONS_STORAGE_KEY), []);
  if (!Array.isArray(storedSessions)) return [];

  return storedSessions.filter((session) => {
    return session && typeof session === 'object' && typeof session.id === 'string' && session.id;
  });
}

function createMessageId(prefix = 'thread') {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.round(Math.random() * 1000000)}`;
}

function createStoredChatSession() {
  const now = new Date().toISOString();

  return {
    id: createMessageId('thread'),
    title: FALLBACK_SESSION_TITLE,
    createdAt: now,
    updatedAt: now,
    conversationId: null,
    messages: [],
    suggestions: [],
  };
}

function createStoredSessionAndSelect() {
  const nextSession = createStoredChatSession();
  const nextSessions = sortSessionsByRecent([nextSession, ...getStoredSessions()]).slice(
    0,
    MAX_STORED_CHAT_SESSIONS
  );
  const nextSessionSummaries = sortSessionsByRecent(
    nextSessions.map(normalizeStoredSessionSummary).filter(Boolean)
  );

  writeLocalStorageValue(CHAT_SESSIONS_STORAGE_KEY, JSON.stringify(nextSessions));
  writeLocalStorageValue(ACTIVE_CHAT_SESSION_STORAGE_KEY, nextSession.id);

  return normalizeSessionRegistry({
    sessions: nextSessionSummaries,
    activeSessionId: nextSession.id,
    isRunning: false,
  });
}

function removeStoredSession(sessionId) {
  const currentSessions = getStoredSessions();
  const nextSessions = currentSessions.filter((session) => session.id !== sessionId);
  const currentActiveSessionId = readLocalStorageValue(ACTIVE_CHAT_SESSION_STORAGE_KEY);
  const nextSessionSummaries = sortSessionsByRecent(
    nextSessions.map(normalizeStoredSessionSummary).filter(Boolean)
  );
  const nextActiveSessionId = currentActiveSessionId === sessionId
    ? nextSessionSummaries[0]?.id || ''
    : currentActiveSessionId;

  writeLocalStorageValue(CHAT_SESSIONS_STORAGE_KEY, JSON.stringify(nextSessions));
  writeLocalStorageValue(ACTIVE_CHAT_SESSION_STORAGE_KEY, nextActiveSessionId);

  return normalizeSessionRegistry({
    sessions: nextSessionSummaries,
    activeSessionId: nextActiveSessionId,
    isRunning: false,
  });
}

function normalizeSessionRegistry(value) {
  const rawSessions = Array.isArray(value?.sessions) ? value.sessions : [];
  const sessions = sortSessionsByRecent(
    rawSessions
      .map((session) => ({
        id: typeof session?.id === 'string' ? session.id : '',
        title:
          typeof session?.title === 'string' && session.title.trim()
            ? session.title.trim()
            : FALLBACK_SESSION_TITLE,
        preview:
          typeof session?.preview === 'string' && session.preview.trim()
            ? session.preview.trim()
            : FALLBACK_SESSION_PREVIEW,
        createdAt: typeof session?.createdAt === 'string' ? session.createdAt : '',
        updatedAt: typeof session?.updatedAt === 'string' ? session.updatedAt : '',
        isEmpty: Boolean(session?.isEmpty),
      }))
      .filter((session) => session.id)
  );

  const activeSessionId =
    typeof value?.activeSessionId === 'string' && value.activeSessionId
      ? value.activeSessionId
      : sessions[0]?.id || '';

  return {
    sessions,
    activeSessionId,
    isRunning: Boolean(value?.isRunning),
  };
}

function createElement(tagName, className, textContent) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (textContent !== undefined) element.textContent = textContent;
  return element;
}

function buildSessionDrawerFragment(state) {
  const fragment = document.createDocumentFragment();
  const section = createElement('section', 'ac-session-drawer');
  section.setAttribute('aria-label', 'Recent AskCrystal conversations');

  const header = createElement('div', 'ac-session-drawer__header');
  const title = createElement('h2', 'ac-session-drawer__title', 'Recent readings');

  const createButton = createElement('button', 'ac-session-drawer__new', 'New chat');
  createButton.type = 'button';
  createButton.setAttribute('data-askcrystal-session-action', 'create');
  createButton.disabled = state.isRunning;

  header.append(title, createButton);
  section.append(header);

  const list = createElement('div', 'ac-session-drawer__list');
  list.setAttribute('role', 'list');

  if (!state.sessions.length) {
    const empty = createElement('div', 'ac-session-drawer__empty', 'Start a new chat to begin saving readings here.');
    list.append(empty);
  } else {
    state.sessions.forEach((session) => {
      const item = createElement(
        'div',
        `ac-session-drawer__item${session.id === state.activeSessionId ? ' is-active' : ''}`
      );
      item.setAttribute('role', 'listitem');

      const selectButton = createElement(
        'button',
        'ac-session-drawer__select',
        session.title || FALLBACK_SESSION_TITLE
      );
      selectButton.type = 'button';
      selectButton.disabled = state.isRunning;
      selectButton.setAttribute('data-askcrystal-session-id', session.id);
      selectButton.setAttribute('aria-pressed', session.id === state.activeSessionId ? 'true' : 'false');

      const sessionTitle = session.title || FALLBACK_SESSION_TITLE;
      const deleteButton = createElement('button', 'ac-session-drawer__delete', 'X');
      deleteButton.type = 'button';
      deleteButton.disabled = state.isRunning;
      deleteButton.setAttribute('data-askcrystal-session-action', 'delete');
      deleteButton.setAttribute('data-askcrystal-session-id', session.id);
      deleteButton.setAttribute('data-askcrystal-session-title', sessionTitle);
      deleteButton.setAttribute(
        'aria-label',
        `Delete reading: ${sessionTitle}`
      );
      deleteButton.title = 'Delete reading';

      item.append(selectButton, deleteButton);
      list.append(item);
    });
  }

  section.append(list);
  fragment.append(section);
  return fragment;
}
