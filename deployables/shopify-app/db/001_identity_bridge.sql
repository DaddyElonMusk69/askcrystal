CREATE TABLE IF NOT EXISTS askcrystal_shops (
  id uuid PRIMARY KEY,
  shop_domain text NOT NULL UNIQUE,
  shopify_shop_id text,
  installed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS askcrystal_users (
  id uuid PRIMARY KEY,
  shop_id uuid NOT NULL REFERENCES askcrystal_shops(id) ON DELETE CASCADE,
  dify_user_key text NOT NULL UNIQUE,
  default_locale text,
  default_timezone text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz
);

CREATE INDEX IF NOT EXISTS askcrystal_users_shop_id_idx
  ON askcrystal_users (shop_id);

CREATE TABLE IF NOT EXISTS askcrystal_user_identities (
  id uuid PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES askcrystal_users(id) ON DELETE CASCADE,
  shop_id uuid NOT NULL REFERENCES askcrystal_shops(id) ON DELETE CASCADE,
  provider text NOT NULL,
  provider_subject text NOT NULL,
  verified_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (shop_id, provider, provider_subject)
);

CREATE INDEX IF NOT EXISTS askcrystal_user_identities_user_id_idx
  ON askcrystal_user_identities (user_id);

CREATE TABLE IF NOT EXISTS askcrystal_guest_sessions (
  id uuid PRIMARY KEY,
  shop_id uuid NOT NULL REFERENCES askcrystal_shops(id) ON DELETE CASCADE,
  user_id uuid REFERENCES askcrystal_users(id) ON DELETE SET NULL,
  guest_token_hash text NOT NULL,
  first_seen_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  merged_into_user_id uuid REFERENCES askcrystal_users(id) ON DELETE SET NULL,
  merged_at timestamptz,
  UNIQUE (shop_id, guest_token_hash)
);

CREATE INDEX IF NOT EXISTS askcrystal_guest_sessions_user_id_idx
  ON askcrystal_guest_sessions (user_id);

CREATE INDEX IF NOT EXISTS askcrystal_guest_sessions_merged_into_user_id_idx
  ON askcrystal_guest_sessions (merged_into_user_id);

CREATE TABLE IF NOT EXISTS askcrystal_conversation_threads (
  id uuid PRIMARY KEY,
  shop_id uuid NOT NULL REFERENCES askcrystal_shops(id) ON DELETE CASCADE,
  owner_user_id uuid REFERENCES askcrystal_users(id) ON DELETE SET NULL,
  guest_session_id uuid REFERENCES askcrystal_guest_sessions(id) ON DELETE SET NULL,
  storefront_session_id text,
  title text,
  dify_user_key text NOT NULL,
  dify_conversation_id text,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  last_active_at timestamptz,
  last_message_preview text,
  last_summary_snapshot text
);

CREATE INDEX IF NOT EXISTS askcrystal_threads_shop_owner_idx
  ON askcrystal_conversation_threads (shop_id, owner_user_id, updated_at DESC);

CREATE INDEX IF NOT EXISTS askcrystal_threads_shop_guest_idx
  ON askcrystal_conversation_threads (shop_id, guest_session_id, updated_at DESC);

CREATE UNIQUE INDEX IF NOT EXISTS askcrystal_threads_storefront_session_idx
  ON askcrystal_conversation_threads (shop_id, owner_user_id, storefront_session_id)
  WHERE storefront_session_id IS NOT NULL AND owner_user_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS askcrystal_threads_dify_conversation_idx
  ON askcrystal_conversation_threads (shop_id, dify_conversation_id)
  WHERE dify_conversation_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS askcrystal_chat_messages (
  id uuid PRIMARY KEY,
  thread_id uuid NOT NULL REFERENCES askcrystal_conversation_threads(id) ON DELETE CASCADE,
  role text NOT NULL,
  content_text text,
  components_json jsonb,
  suggestions_json jsonb,
  dify_message_id text,
  dify_task_id text,
  metadata_json jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS askcrystal_chat_messages_thread_created_idx
  ON askcrystal_chat_messages (thread_id, created_at);

CREATE TABLE IF NOT EXISTS askcrystal_entitlements (
  id uuid PRIMARY KEY,
  shop_id uuid NOT NULL REFERENCES askcrystal_shops(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES askcrystal_users(id) ON DELETE CASCADE,
  source text NOT NULL,
  status text NOT NULL,
  tier text NOT NULL,
  shopify_customer_id text,
  shopify_product_id text,
  shopify_variant_id text,
  shopify_order_id text,
  shopify_subscription_contract_id text,
  starts_at timestamptz,
  ends_at timestamptz,
  renewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS askcrystal_entitlements_user_status_idx
  ON askcrystal_entitlements (user_id, status, tier);

CREATE TABLE IF NOT EXISTS askcrystal_identity_merge_events (
  id uuid PRIMARY KEY,
  shop_id uuid NOT NULL REFERENCES askcrystal_shops(id) ON DELETE CASCADE,
  guest_session_id uuid REFERENCES askcrystal_guest_sessions(id) ON DELETE SET NULL,
  source_user_id uuid REFERENCES askcrystal_users(id) ON DELETE SET NULL,
  target_user_id uuid REFERENCES askcrystal_users(id) ON DELETE SET NULL,
  strategy text NOT NULL,
  metadata_json jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
