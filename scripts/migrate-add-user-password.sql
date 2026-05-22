-- Add password_hash to users table for email/password login
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);

-- Create a default admin user (password: admin123, hashed with SHA-256 + email salt)
-- Hash = SHA256("admin123" + "admin@greevo.com") 
-- In production, use bcrypt or argon2 via n8n Code node
INSERT INTO users (email, name, role, password_hash, is_active)
VALUES (
  'admin@greevo.com',
  'Admin GreeVo',
  'admin',
  encode(sha256(('admin123' || 'admin@greevo.com')::bytea), 'hex'),
  true
) ON CONFLICT (email) DO UPDATE SET
  password_hash = encode(sha256(('admin123' || 'admin@greevo.com')::bytea), 'hex');

-- Example: Add user for a client
-- INSERT INTO users (email, name, role, password_hash, client_id, is_active)
-- VALUES (
--   'user@client.com',
--   'Client User',
--   'manager',
--   encode(sha256(('password123' || 'user@client.com')::bytea), 'hex'),
--   1,
--   true
-- );
