-- ============================================
-- Phase 11: Security Hardening Migration
-- ============================================

-- Upgrade password storage (salt:hash format using SHA-512)
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash_v2 VARCHAR(500);
-- Migration: rehash existing passwords on next login

-- Login attempts tracking (brute-force protection)
CREATE TABLE IF NOT EXISTS login_attempts (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45),
    success BOOLEAN DEFAULT false,
    user_agent TEXT,
    attempted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_login_attempts_email ON login_attempts(email, attempted_at DESC);
CREATE INDEX idx_login_attempts_ip ON login_attempts(ip_address, attempted_at DESC);

-- Function: Check if account is locked
CREATE OR REPLACE FUNCTION is_account_locked(p_email VARCHAR)
RETURNS BOOLEAN AS $$
DECLARE
    failed_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO failed_count
    FROM login_attempts
    WHERE email = p_email
      AND success = false
      AND attempted_at > NOW() - INTERVAL '15 minutes';
    
    RETURN failed_count >= 5;
END;
$$ LANGUAGE plpgsql;

-- API keys encryption (store encrypted, decrypt at runtime)
ALTER TABLE clients ADD COLUMN IF NOT EXISTS api_key_encrypted VARCHAR(500);
ALTER TABLE clients ADD COLUMN IF NOT EXISTS webhook_secret_encrypted VARCHAR(500);

-- CSRF tokens
CREATE TABLE IF NOT EXISTS csrf_tokens (
    id SERIAL PRIMARY KEY,
    token VARCHAR(100) UNIQUE NOT NULL,
    session_id VARCHAR(255),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_csrf_token ON csrf_tokens(token);

-- Webhook signature log (verify incoming webhooks)
CREATE TABLE IF NOT EXISTS webhook_verifications (
    id BIGSERIAL PRIMARY KEY,
    endpoint VARCHAR(255) NOT NULL,
    source_ip VARCHAR(45),
    signature_valid BOOLEAN,
    payload_hash VARCHAR(64),
    verified_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Security configuration per client
ALTER TABLE clients ADD COLUMN IF NOT EXISTS security_config JSONB DEFAULT '{
  "max_login_attempts": 5,
  "lockout_duration_minutes": 15,
  "session_timeout_hours": 8,
  "require_2fa": false,
  "allowed_ips": [],
  "webhook_signature_required": true
}';

-- Cleanup old login attempts (keep 30 days)
CREATE OR REPLACE FUNCTION cleanup_login_attempts()
RETURNS void AS $$
BEGIN
    DELETE FROM login_attempts WHERE attempted_at < NOW() - INTERVAL '30 days';
    DELETE FROM csrf_tokens WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;
