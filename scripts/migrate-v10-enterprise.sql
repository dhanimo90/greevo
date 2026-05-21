-- ============================================
-- Phase 10: Enterprise & Scale Migration
-- ============================================

-- Users & RBAC
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'viewer', -- admin, manager, editor, viewer
    client_id INTEGER REFERENCES clients(id),
    permissions JSONB DEFAULT '[]', -- granular permissions
    sso_provider VARCHAR(50), -- saml, oauth2, oidc
    sso_provider_id VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_client ON users(client_id);

-- User Sessions
CREATE TABLE IF NOT EXISTS user_sessions (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    provider VARCHAR(50),
    provider_user_id VARCHAR(255),
    role VARCHAR(50) DEFAULT 'viewer',
    client_id INTEGER REFERENCES clients(id),
    is_active BOOLEAN DEFAULT true,
    ip_address VARCHAR(45),
    user_agent TEXT,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_sessions_token ON user_sessions(session_token);
CREATE INDEX idx_sessions_email ON user_sessions(email);
CREATE INDEX idx_sessions_expires ON user_sessions(expires_at);

-- Approval Requests
CREATE TABLE IF NOT EXISTS approval_requests (
    id SERIAL PRIMARY KEY,
    approval_id VARCHAR(50) UNIQUE NOT NULL,
    approval_type VARCHAR(50) NOT NULL,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    requested_by VARCHAR(255) NOT NULL,
    client_id INTEGER REFERENCES clients(id),
    approval_chain JSONB NOT NULL DEFAULT '[]',
    current_step INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected, expired
    data JSONB DEFAULT '{}',
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_approvals_status ON approval_requests(status);
CREATE INDEX idx_approvals_client ON approval_requests(client_id);
CREATE INDEX idx_approvals_id ON approval_requests(approval_id);

-- Data Processing Records (GDPR Article 30)
CREATE TABLE IF NOT EXISTS data_processing_records (
    id SERIAL PRIMARY KEY,
    request_id VARCHAR(50) UNIQUE NOT NULL,
    request_type VARCHAR(50) NOT NULL, -- access, deletion, portability, rectification, restriction
    data_subject_email VARCHAR(255) NOT NULL,
    requester_name VARCHAR(255),
    client_id INTEGER REFERENCES clients(id),
    status VARCHAR(50) DEFAULT 'received', -- received, processing, completed, rejected
    deadline TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_dpr_email ON data_processing_records(data_subject_email);
CREATE INDEX idx_dpr_status ON data_processing_records(status);

-- Security Audit Log (enhanced)
CREATE TABLE IF NOT EXISTS security_events (
    id BIGSERIAL PRIMARY KEY,
    event_type VARCHAR(100) NOT NULL, -- login, logout, permission_change, data_access, suspicious_activity
    user_email VARCHAR(255),
    client_id INTEGER REFERENCES clients(id),
    ip_address VARCHAR(45),
    user_agent TEXT,
    details JSONB DEFAULT '{}',
    risk_level VARCHAR(20) DEFAULT 'low', -- low, medium, high, critical
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_security_events_type ON security_events(event_type);
CREATE INDEX idx_security_events_user ON security_events(user_email);
CREATE INDEX idx_security_events_risk ON security_events(risk_level);
CREATE INDEX idx_security_events_time ON security_events(created_at DESC);

-- Multi-Region Configuration
CREATE TABLE IF NOT EXISTS region_config (
    id SERIAL PRIMARY KEY,
    region_code VARCHAR(20) UNIQUE NOT NULL, -- ap-southeast-1, eu-west-1, us-east-1
    region_name VARCHAR(100) NOT NULL,
    database_url VARCHAR(500),
    n8n_url VARCHAR(500),
    is_primary BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    health_status VARCHAR(20) DEFAULT 'healthy',
    last_health_check TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Triggers
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_approvals_updated_at
    BEFORE UPDATE ON approval_requests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-expire pending approvals
CREATE OR REPLACE FUNCTION expire_old_approvals()
RETURNS void AS $$
BEGIN
    UPDATE approval_requests SET status = 'expired' WHERE status = 'pending' AND expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- View: Active sessions
CREATE OR REPLACE VIEW v_active_sessions AS
SELECT us.email, us.role, us.client_id, c.company_name, us.created_at as login_at, us.expires_at
FROM user_sessions us
LEFT JOIN clients c ON c.id = us.client_id
WHERE us.is_active = true AND us.expires_at > NOW()
ORDER BY us.created_at DESC;
