-- ============================================
-- Phase 8: White-Label & SaaS Migration
-- ============================================

-- Shared Reports
CREATE TABLE IF NOT EXISTS shared_reports (
    id SERIAL PRIMARY KEY,
    token VARCHAR(100) UNIQUE NOT NULL,
    report_type VARCHAR(50) NOT NULL,
    client_id INTEGER REFERENCES clients(id),
    title VARCHAR(255) NOT NULL,
    config JSONB DEFAULT '{}',
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    view_count INTEGER DEFAULT 0,
    last_viewed_at TIMESTAMP WITH TIME ZONE,
    created_by VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_shared_reports_token ON shared_reports(token);
CREATE INDEX idx_shared_reports_client ON shared_reports(client_id);

-- Uptime Checks
CREATE TABLE IF NOT EXISTS uptime_checks (
    id BIGSERIAL PRIMARY KEY,
    status VARCHAR(10) NOT NULL, -- up, down
    response_time_ms INTEGER DEFAULT 0,
    checked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_uptime_checked ON uptime_checks(checked_at DESC);

-- Billing History
CREATE TABLE IF NOT EXISTS billing_history (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id),
    stripe_event_id VARCHAR(255) UNIQUE,
    event_type VARCHAR(100) NOT NULL,
    amount DECIMAL(15, 2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(50),
    invoice_url VARCHAR(2048),
    period_start TIMESTAMP WITH TIME ZONE,
    period_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_billing_client ON billing_history(client_id);

-- White-Label Branding
ALTER TABLE clients ADD COLUMN IF NOT EXISTS branding JSONB DEFAULT '{}';
-- branding: { "logo_url": "", "primary_color": "#0076D7", "company_name_display": "", "custom_domain": "" }

-- API Usage Tracking
CREATE TABLE IF NOT EXISTS api_usage (
    id BIGSERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id),
    endpoint VARCHAR(255) NOT NULL,
    method VARCHAR(10) NOT NULL,
    status_code INTEGER,
    response_time_ms INTEGER,
    called_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_api_usage_client ON api_usage(client_id, called_at DESC);

-- Template Marketplace
CREATE TABLE IF NOT EXISTS workflow_templates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL, -- crm, marketing, seo, sales, reporting
    workflow_json JSONB NOT NULL,
    author VARCHAR(255) DEFAULT 'GreeVo',
    version VARCHAR(20) DEFAULT '1.0.0',
    downloads INTEGER DEFAULT 0,
    rating DECIMAL(3, 2) DEFAULT 0,
    is_premium BOOLEAN DEFAULT false,
    price DECIMAL(10, 2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_templates_category ON workflow_templates(category);

-- Cleanup old uptime data (keep 90 days)
CREATE OR REPLACE FUNCTION cleanup_uptime_checks()
RETURNS void AS $$
BEGIN
    DELETE FROM uptime_checks WHERE checked_at < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql;
