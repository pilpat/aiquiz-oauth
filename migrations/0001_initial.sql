-- migrations/0001_initial.sql
-- OAuth Provider Schema for aiquiz.pl (matches mcp-oauth exactly)

-- Users table
-- Fields:
--   - user_id: UUID, primary key
--   - email: unique user email
--   - created_at: ISO timestamp string (e.g., "2024-01-15T10:30:00.000Z")
--   - last_login_at: ISO timestamp string, updated on each login
--   - is_deleted: soft delete flag (0=active, 1=deleted)
CREATE TABLE users (
  user_id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TEXT NOT NULL,
  last_login_at TEXT,
  is_deleted INTEGER DEFAULT 0
);

-- API Keys table
-- Fields:
--   - api_key_id: UUID, primary key
--   - user_id: foreign key to users
--   - api_key_hash: SHA-256 hash of the full API key
--   - key_prefix: first 16 chars for display (e.g., "quiz_a7f3k9m2p5q8")
--   - name: user-provided key name (e.g., "AnythingLLM")
--   - last_used_at: Unix timestamp in milliseconds (INTEGER)
--   - created_at: Unix timestamp in milliseconds (INTEGER)
--   - expires_at: Unix timestamp in milliseconds, nullable
--   - is_active: soft delete flag (0=revoked, 1=active)
CREATE TABLE api_keys (
  api_key_id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  api_key_hash TEXT NOT NULL,
  key_prefix TEXT NOT NULL,
  name TEXT NOT NULL,
  last_used_at INTEGER,
  created_at INTEGER NOT NULL,
  expires_at INTEGER,
  is_active INTEGER DEFAULT 1,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Indexes for performance
CREATE INDEX idx_api_keys_user ON api_keys(user_id);
CREATE INDEX idx_api_keys_hash ON api_keys(api_key_hash);
CREATE INDEX idx_users_email ON users(email);
