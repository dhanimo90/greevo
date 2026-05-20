-- GreeVo Database Initialization
-- Database untuk menyimpan data CRM, SEO metrics, dan reporting

-- ============================================
-- CRM & Marketing Tables
-- ============================================

CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    external_id VARCHAR(255),
    source VARCHAR(50) NOT NULL DEFAULT 'manual', -- website, email, social, import
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    company VARCHAR(255),
    job_title VARCHAR(255),
    phone VARCHAR(50),
    lead_score INTEGER DEFAULT 0,
    lead_status VARCHAR(50) DEFAULT 'new', -- new, contacted, qualified, opportunity, customer, lost
    tags TEXT[],
    custom_fields JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lead_activities (
    id SERIAL PRIMARY KEY,
    contact_id INTEGER REFERENCES contacts(id) ON DELETE CASCADE,
    activity_type VARCHAR(50) NOT NULL, -- page_view, email_open, email_click, form_submit, download
    activity_data JSONB DEFAULT '{}',
    score_impact INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS email_campaigns (
    id SERIAL PRIMARY KEY,
    campaign_name VARCHAR(255) NOT NULL,
    campaign_type VARCHAR(50) NOT NULL, -- welcome, nurture, re_engagement, promotional
    status VARCHAR(50) DEFAULT 'draft', -- draft, active, paused, completed
    subject_line VARCHAR(500),
    template_id VARCHAR(255),
    segment_criteria JSONB DEFAULT '{}',
    stats JSONB DEFAULT '{"sent": 0, "opened": 0, "clicked": 0, "bounced": 0, "unsubscribed": 0}',
    scheduled_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS deals (
    id SERIAL PRIMARY KEY,
    contact_id INTEGER REFERENCES contacts(id),
    deal_name VARCHAR(255) NOT NULL,
    deal_value DECIMAL(15, 2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'IDR',
    stage VARCHAR(50) DEFAULT 'prospecting', -- prospecting, qualification, proposal, negotiation, closed_won, closed_lost
    probability INTEGER DEFAULT 0,
    expected_close_date DATE,
    assigned_to VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- SEO Monitoring Tables
-- ============================================

CREATE TABLE IF NOT EXISTS tracked_keywords (
    id SERIAL PRIMARY KEY,
    keyword VARCHAR(500) NOT NULL,
    target_url VARCHAR(2048),
    search_engine VARCHAR(20) DEFAULT 'google',
    country VARCHAR(5) DEFAULT 'id', -- ISO country code
    language VARCHAR(5) DEFAULT 'id',
    client_id INTEGER, -- untuk multi-tenant
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS keyword_rankings (
    id SERIAL PRIMARY KEY,
    keyword_id INTEGER REFERENCES tracked_keywords(id) ON DELETE CASCADE,
    position INTEGER,
    previous_position INTEGER,
    url_ranked VARCHAR(2048),
    search_volume INTEGER,
    cpc DECIMAL(10, 2),
    competition DECIMAL(5, 4),
    checked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS backlinks (
    id SERIAL PRIMARY KEY,
    source_url VARCHAR(2048) NOT NULL,
    target_url VARCHAR(2048) NOT NULL,
    anchor_text VARCHAR(500),
    domain_rating INTEGER,
    is_dofollow BOOLEAN DEFAULT true,
    is_active BOOLEAN DEFAULT true,
    first_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_checked TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS site_health_checks (
    id SERIAL PRIMARY KEY,
    url VARCHAR(2048) NOT NULL,
    status_code INTEGER,
    response_time_ms INTEGER,
    page_size_kb INTEGER,
    has_ssl BOOLEAN,
    mobile_friendly BOOLEAN,
    core_web_vitals JSONB DEFAULT '{}', -- LCP, FID, CLS
    issues JSONB DEFAULT '[]',
    checked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS competitor_tracking (
    id SERIAL PRIMARY KEY,
    competitor_domain VARCHAR(255) NOT NULL,
    our_domain VARCHAR(255) NOT NULL,
    keyword VARCHAR(500),
    competitor_position INTEGER,
    our_position INTEGER,
    gap INTEGER, -- difference in positions
    checked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Analytics & Reporting Tables
-- ============================================

CREATE TABLE IF NOT EXISTS analytics_snapshots (
    id SERIAL PRIMARY KEY,
    report_type VARCHAR(50) NOT NULL, -- daily, weekly, monthly
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    metrics JSONB NOT NULL, -- flexible metrics storage
    dimensions JSONB DEFAULT '{}',
    source VARCHAR(50) DEFAULT 'ga4', -- ga4, search_console, custom
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS report_schedules (
    id SERIAL PRIMARY KEY,
    report_name VARCHAR(255) NOT NULL,
    report_type VARCHAR(50) NOT NULL, -- seo_weekly, marketing_monthly, executive_summary
    frequency VARCHAR(20) NOT NULL, -- daily, weekly, monthly
    recipients TEXT[] NOT NULL,
    delivery_channel VARCHAR(50) DEFAULT 'email', -- email, slack, teams
    template_config JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    last_sent_at TIMESTAMP WITH TIME ZONE,
    next_send_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Indexes
-- ============================================

CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_lead_status ON contacts(lead_status);
CREATE INDEX idx_contacts_lead_score ON contacts(lead_score DESC);
CREATE INDEX idx_lead_activities_contact ON lead_activities(contact_id);
CREATE INDEX idx_lead_activities_type ON lead_activities(activity_type);
CREATE INDEX idx_keyword_rankings_keyword ON keyword_rankings(keyword_id);
CREATE INDEX idx_keyword_rankings_checked ON keyword_rankings(checked_at DESC);
CREATE INDEX idx_backlinks_target ON backlinks(target_url);
CREATE INDEX idx_site_health_url ON site_health_checks(url);
CREATE INDEX idx_analytics_period ON analytics_snapshots(period_start, period_end);
CREATE INDEX idx_competitor_tracking_date ON competitor_tracking(checked_at DESC);

-- ============================================
-- Functions
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contacts_updated_at
    BEFORE UPDATE ON contacts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deals_updated_at
    BEFORE UPDATE ON deals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_email_campaigns_updated_at
    BEFORE UPDATE ON email_campaigns
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
