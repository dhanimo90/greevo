-- ============================================
-- Phase 3: Advanced Marketing Migration
-- ============================================

-- Social Media Posts Table
CREATE TABLE IF NOT EXISTS social_posts (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id),
    platform VARCHAR(50) NOT NULL, -- linkedin, twitter, facebook, instagram
    content TEXT NOT NULL,
    media_url VARCHAR(2048),
    link_url VARCHAR(2048),
    hashtags TEXT[],
    status VARCHAR(50) DEFAULT 'draft', -- draft, scheduled, published, failed
    post_id_external VARCHAR(255), -- ID from the platform
    scheduled_at TIMESTAMP WITH TIME ZONE,
    published_at TIMESTAMP WITH TIME ZONE,
    engagement JSONB DEFAULT '{"likes": 0, "comments": 0, "shares": 0, "impressions": 0}',
    campaign_id INTEGER REFERENCES email_campaigns(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_social_posts_client ON social_posts(client_id);
CREATE INDEX idx_social_posts_status ON social_posts(status);
CREATE INDEX idx_social_posts_scheduled ON social_posts(scheduled_at) WHERE status = 'scheduled';

-- Contact Preferences (enhanced)
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS email_preferences JSONB DEFAULT '{"marketing": true, "product_updates": true, "newsletter": true, "promotions": true, "events": true}';
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS preferred_channel VARCHAR(20) DEFAULT 'email'; -- email, whatsapp, sms
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS email_frequency VARCHAR(20) DEFAULT 'weekly'; -- daily, weekly, monthly, never
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS unsubscribed BOOLEAN DEFAULT false;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS unsubscribed_at TIMESTAMP WITH TIME ZONE;

-- A/B Test Results Table
CREATE TABLE IF NOT EXISTS ab_test_results (
    id SERIAL PRIMARY KEY,
    test_id VARCHAR(100) UNIQUE NOT NULL,
    campaign_id INTEGER REFERENCES email_campaigns(id),
    client_id INTEGER REFERENCES clients(id),
    winning_metric VARCHAR(50) NOT NULL,
    variants JSONB NOT NULL,
    results JSONB NOT NULL,
    winner_variant_id VARCHAR(100),
    winner_subject_line TEXT,
    is_significant BOOLEAN DEFAULT false,
    test_duration_hours INTEGER,
    total_test_audience INTEGER,
    total_remaining_audience INTEGER,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_ab_tests_client ON ab_test_results(client_id);
CREATE INDEX idx_ab_tests_campaign ON ab_test_results(campaign_id);

-- Message Log (WhatsApp/SMS)
CREATE TABLE IF NOT EXISTS message_log (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id),
    contact_id INTEGER REFERENCES contacts(id),
    channel VARCHAR(20) NOT NULL, -- whatsapp, sms
    direction VARCHAR(10) DEFAULT 'outbound', -- outbound, inbound
    phone VARCHAR(50) NOT NULL,
    template_name VARCHAR(255),
    message_body TEXT,
    status VARCHAR(50) DEFAULT 'sent', -- sent, delivered, read, failed
    external_id VARCHAR(255), -- Twilio SID or WhatsApp message ID
    cost_amount DECIMAL(10, 4),
    cost_currency VARCHAR(3) DEFAULT 'USD',
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    delivered_at TIMESTAMP WITH TIME ZONE,
    read_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_message_log_client ON message_log(client_id);
CREATE INDEX idx_message_log_contact ON message_log(contact_id);
CREATE INDEX idx_message_log_channel ON message_log(channel);

-- Campaign ROI Tracking
ALTER TABLE email_campaigns ADD COLUMN IF NOT EXISTS cost_per_send DECIMAL(10, 4) DEFAULT 0.005;
ALTER TABLE email_campaigns ADD COLUMN IF NOT EXISTS total_cost DECIMAL(15, 2) DEFAULT 0;
ALTER TABLE email_campaigns ADD COLUMN IF NOT EXISTS attributed_revenue DECIMAL(15, 2) DEFAULT 0;
ALTER TABLE email_campaigns ADD COLUMN IF NOT EXISTS roi_percent DECIMAL(10, 2);

-- Email Deliverability Metrics
CREATE TABLE IF NOT EXISTS email_deliverability (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id),
    date DATE NOT NULL,
    sent INTEGER DEFAULT 0,
    delivered INTEGER DEFAULT 0,
    opened INTEGER DEFAULT 0,
    clicked INTEGER DEFAULT 0,
    bounced INTEGER DEFAULT 0,
    spam_reports INTEGER DEFAULT 0,
    unsubscribes INTEGER DEFAULT 0,
    delivery_rate DECIMAL(5, 2),
    open_rate DECIMAL(5, 2),
    click_rate DECIMAL(5, 2),
    bounce_rate DECIMAL(5, 2),
    spam_rate DECIMAL(5, 4),
    health_status VARCHAR(20) DEFAULT 'healthy',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(client_id, date)
);

CREATE INDEX idx_deliverability_client_date ON email_deliverability(client_id, date DESC);

-- Event Triggers Configuration
CREATE TABLE IF NOT EXISTS event_triggers (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id),
    event_type VARCHAR(50) NOT NULL, -- birthday, anniversary, trial_expiring, cart_abandoned, inactivity
    is_active BOOLEAN DEFAULT true,
    template_id VARCHAR(255),
    channel VARCHAR(20) DEFAULT 'email', -- email, whatsapp, sms
    delay_minutes INTEGER DEFAULT 0, -- delay before sending
    conditions JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_event_triggers_client ON event_triggers(client_id);
CREATE INDEX idx_event_triggers_type ON event_triggers(event_type);
