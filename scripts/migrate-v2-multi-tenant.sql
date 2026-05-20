-- ============================================
-- Phase 2: Multi-Tenant Migration
-- Menambahkan client_id dan audit infrastructure
-- ============================================

-- ============================================
-- Clients Table (Master)
-- ============================================

CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    client_code VARCHAR(50) UNIQUE NOT NULL, -- short identifier: 'acme', 'globex'
    company_name VARCHAR(255) NOT NULL,
    domain VARCHAR(255),
    contact_email VARCHAR(255) NOT NULL,
    contact_name VARCHAR(255),
    plan_type VARCHAR(50) DEFAULT 'standard', -- starter, standard, enterprise
    status VARCHAR(50) DEFAULT 'active', -- active, suspended, churned, onboarding
    config JSONB DEFAULT '{}', -- client-specific configuration
    api_key VARCHAR(255) UNIQUE, -- untuk webhook authentication
    webhook_secret VARCHAR(255), -- HMAC signing secret
    max_contacts INTEGER DEFAULT 10000,
    max_keywords INTEGER DEFAULT 500,
    max_emails_per_month INTEGER DEFAULT 50000,
    onboarded_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Client Credentials (encrypted references)
-- ============================================

CREATE TABLE IF NOT EXISTS client_credentials (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
    service_name VARCHAR(100) NOT NULL, -- hubspot, sendgrid, ahrefs, slack, ga4
    credential_type VARCHAR(50) NOT NULL, -- api_key, oauth2, webhook
    credential_ref VARCHAR(255) NOT NULL, -- reference to n8n credential ID
    is_active BOOLEAN DEFAULT true,
    last_verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(client_id, service_name)
);

-- ============================================
-- Audit Log
-- ============================================

CREATE TABLE IF NOT EXISTS audit_logs (
    id BIGSERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id),
    workflow_name VARCHAR(255) NOT NULL,
    execution_id VARCHAR(255),
    action VARCHAR(100) NOT NULL, -- contact_created, email_sent, ranking_checked, error_occurred
    entity_type VARCHAR(50), -- contact, deal, keyword, backlink, campaign
    entity_id INTEGER,
    details JSONB DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'success', -- success, error, warning, skipped
    error_message TEXT,
    ip_address VARCHAR(45),
    duration_ms INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Partition audit_logs by month for performance
CREATE INDEX idx_audit_logs_client ON audit_logs(client_id);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_status ON audit_logs(status);
CREATE INDEX idx_audit_logs_workflow ON audit_logs(workflow_name);

-- ============================================
-- Rate Limiting Table
-- ============================================

CREATE TABLE IF NOT EXISTS rate_limits (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
    service_name VARCHAR(100) NOT NULL, -- ahrefs, hubspot, sendgrid
    window_start TIMESTAMP WITH TIME ZONE NOT NULL,
    window_size_seconds INTEGER NOT NULL DEFAULT 3600, -- 1 hour default
    request_count INTEGER DEFAULT 0,
    max_requests INTEGER NOT NULL,
    last_request_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(client_id, service_name, window_start)
);

CREATE INDEX idx_rate_limits_lookup ON rate_limits(client_id, service_name, window_start DESC);

-- ============================================
-- System Health Metrics
-- ============================================

CREATE TABLE IF NOT EXISTS system_health (
    id SERIAL PRIMARY KEY,
    component VARCHAR(100) NOT NULL, -- n8n, postgres, redis, webhook_endpoint
    status VARCHAR(20) NOT NULL, -- healthy, degraded, down
    response_time_ms INTEGER,
    details JSONB DEFAULT '{}',
    checked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_system_health_component ON system_health(component, checked_at DESC);

-- ============================================
-- Workflow Execution Stats
-- ============================================

CREATE TABLE IF NOT EXISTS workflow_execution_stats (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id),
    workflow_name VARCHAR(255) NOT NULL,
    execution_id VARCHAR(255),
    status VARCHAR(20) NOT NULL, -- success, error, timeout, cancelled
    started_at TIMESTAMP WITH TIME ZONE NOT NULL,
    finished_at TIMESTAMP WITH TIME ZONE,
    duration_ms INTEGER,
    items_processed INTEGER DEFAULT 0,
    error_message TEXT,
    retry_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_exec_stats_client ON workflow_execution_stats(client_id);
CREATE INDEX idx_exec_stats_workflow ON workflow_execution_stats(workflow_name);
CREATE INDEX idx_exec_stats_status ON workflow_execution_stats(status);
CREATE INDEX idx_exec_stats_started ON workflow_execution_stats(started_at DESC);

-- ============================================
-- Backup Registry
-- ============================================

CREATE TABLE IF NOT EXISTS backup_registry (
    id SERIAL PRIMARY KEY,
    backup_type VARCHAR(50) NOT NULL, -- full, incremental, workflow_only
    file_path VARCHAR(500) NOT NULL,
    file_size_bytes BIGINT,
    status VARCHAR(20) DEFAULT 'completed', -- in_progress, completed, failed
    tables_included TEXT[],
    row_counts JSONB DEFAULT '{}',
    started_at TIMESTAMP WITH TIME ZONE NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE,
    retention_days INTEGER DEFAULT 30,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Add client_id to existing tables
-- ============================================

-- Contacts
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS client_id INTEGER REFERENCES clients(id);
CREATE INDEX IF NOT EXISTS idx_contacts_client ON contacts(client_id);

-- Deals
ALTER TABLE deals ADD COLUMN IF NOT EXISTS client_id INTEGER REFERENCES clients(id);
CREATE INDEX IF NOT EXISTS idx_deals_client ON deals(client_id);

-- Email Campaigns
ALTER TABLE email_campaigns ADD COLUMN IF NOT EXISTS client_id INTEGER REFERENCES clients(id);
CREATE INDEX IF NOT EXISTS idx_campaigns_client ON email_campaigns(client_id);

-- Tracked Keywords
-- (already has client_id from Phase 1, just add index)
CREATE INDEX IF NOT EXISTS idx_keywords_client ON tracked_keywords(client_id);

-- Backlinks
ALTER TABLE backlinks ADD COLUMN IF NOT EXISTS client_id INTEGER REFERENCES clients(id);
CREATE INDEX IF NOT EXISTS idx_backlinks_client ON backlinks(client_id);

-- Site Health Checks
ALTER TABLE site_health_checks ADD COLUMN IF NOT EXISTS client_id INTEGER REFERENCES clients(id);
CREATE INDEX IF NOT EXISTS idx_health_client ON site_health_checks(client_id);

-- Competitor Tracking
ALTER TABLE competitor_tracking ADD COLUMN IF NOT EXISTS client_id INTEGER REFERENCES clients(id);
CREATE INDEX IF NOT EXISTS idx_competitor_client ON competitor_tracking(client_id);

-- Analytics Snapshots
ALTER TABLE analytics_snapshots ADD COLUMN IF NOT EXISTS client_id INTEGER REFERENCES clients(id);
CREATE INDEX IF NOT EXISTS idx_analytics_client ON analytics_snapshots(client_id);

-- Report Schedules
ALTER TABLE report_schedules ADD COLUMN IF NOT EXISTS client_id INTEGER REFERENCES clients(id);
CREATE INDEX IF NOT EXISTS idx_reports_client ON report_schedules(client_id);

-- ============================================
-- Helper Functions
-- ============================================

-- Function: Check rate limit
CREATE OR REPLACE FUNCTION check_rate_limit(
    p_client_id INTEGER,
    p_service VARCHAR,
    p_max_requests INTEGER DEFAULT 100,
    p_window_seconds INTEGER DEFAULT 3600
) RETURNS BOOLEAN AS $$
DECLARE
    v_window_start TIMESTAMP WITH TIME ZONE;
    v_current_count INTEGER;
BEGIN
    v_window_start := date_trunc('hour', NOW());
    
    INSERT INTO rate_limits (client_id, service_name, window_start, window_size_seconds, request_count, max_requests, last_request_at)
    VALUES (p_client_id, p_service, v_window_start, p_window_seconds, 1, p_max_requests, NOW())
    ON CONFLICT (client_id, service_name, window_start)
    DO UPDATE SET 
        request_count = rate_limits.request_count + 1,
        last_request_at = NOW()
    RETURNING request_count INTO v_current_count;
    
    RETURN v_current_count <= p_max_requests;
END;
$$ LANGUAGE plpgsql;

-- Function: Log audit event
CREATE OR REPLACE FUNCTION log_audit(
    p_client_id INTEGER,
    p_workflow VARCHAR,
    p_action VARCHAR,
    p_entity_type VARCHAR DEFAULT NULL,
    p_entity_id INTEGER DEFAULT NULL,
    p_details JSONB DEFAULT '{}',
    p_status VARCHAR DEFAULT 'success',
    p_error_message TEXT DEFAULT NULL
) RETURNS BIGINT AS $$
DECLARE
    v_id BIGINT;
BEGIN
    INSERT INTO audit_logs (client_id, workflow_name, action, entity_type, entity_id, details, status, error_message)
    VALUES (p_client_id, p_workflow, p_action, p_entity_type, p_entity_id, p_details, p_status, p_error_message)
    RETURNING id INTO v_id;
    
    RETURN v_id;
END;
$$ LANGUAGE plpgsql;

-- Function: Get client config
CREATE OR REPLACE FUNCTION get_client_config(p_client_code VARCHAR)
RETURNS JSONB AS $$
DECLARE
    v_config JSONB;
BEGIN
    SELECT jsonb_build_object(
        'id', id,
        'client_code', client_code,
        'company_name', company_name,
        'domain', domain,
        'plan_type', plan_type,
        'status', status,
        'config', config,
        'max_contacts', max_contacts,
        'max_keywords', max_keywords,
        'max_emails_per_month', max_emails_per_month
    ) INTO v_config
    FROM clients
    WHERE client_code = p_client_code AND status = 'active';
    
    RETURN v_config;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Auto-update clients.updated_at
CREATE TRIGGER update_clients_updated_at
    BEFORE UPDATE ON clients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Cleanup: Auto-expire old rate limit windows
-- ============================================

CREATE OR REPLACE FUNCTION cleanup_expired_rate_limits()
RETURNS void AS $$
BEGIN
    DELETE FROM rate_limits WHERE window_start < NOW() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- Views for monitoring
-- ============================================

CREATE OR REPLACE VIEW v_client_usage AS
SELECT 
    c.id as client_id,
    c.client_code,
    c.company_name,
    c.plan_type,
    (SELECT COUNT(*) FROM contacts WHERE client_id = c.id) as contact_count,
    c.max_contacts,
    (SELECT COUNT(*) FROM tracked_keywords WHERE client_id = c.id AND is_active = true) as keyword_count,
    c.max_keywords,
    (SELECT COUNT(*) FROM audit_logs WHERE client_id = c.id AND created_at > NOW() - INTERVAL '30 days') as actions_this_month,
    (SELECT COUNT(*) FROM workflow_execution_stats WHERE client_id = c.id AND status = 'error' AND started_at > NOW() - INTERVAL '24 hours') as errors_24h
FROM clients c
WHERE c.status = 'active';

CREATE OR REPLACE VIEW v_system_status AS
SELECT 
    component,
    status,
    response_time_ms,
    details,
    checked_at,
    CASE 
        WHEN checked_at < NOW() - INTERVAL '10 minutes' THEN 'stale'
        ELSE 'fresh'
    END as data_freshness
FROM system_health
WHERE checked_at = (
    SELECT MAX(checked_at) FROM system_health sh WHERE sh.component = system_health.component
);
