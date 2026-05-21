-- ============================================
-- Phase 5: Sales Pipeline & Revenue Migration
-- ============================================

-- Proposals Table
CREATE TABLE IF NOT EXISTS proposals (
    id SERIAL PRIMARY KEY,
    proposal_id VARCHAR(50) UNIQUE NOT NULL,
    deal_id INTEGER REFERENCES deals(id),
    client_id INTEGER REFERENCES clients(id),
    contact_email VARCHAR(255) NOT NULL,
    company_name VARCHAR(255),
    title VARCHAR(500) NOT NULL,
    description TEXT,
    line_items JSONB NOT NULL DEFAULT '[]',
    subtotal DECIMAL(15, 2) DEFAULT 0,
    discount DECIMAL(15, 2) DEFAULT 0,
    tax_amount DECIMAL(15, 2) DEFAULT 0,
    total DECIMAL(15, 2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'IDR',
    payment_terms VARCHAR(100) DEFAULT 'Net 30',
    valid_until DATE,
    terms_conditions TEXT,
    status VARCHAR(50) DEFAULT 'draft', -- draft, sent, viewed, accepted, rejected, expired
    viewed_at TIMESTAMP WITH TIME ZONE,
    accepted_at TIMESTAMP WITH TIME ZONE,
    created_by VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_proposals_deal ON proposals(deal_id);
CREATE INDEX idx_proposals_client ON proposals(client_id);
CREATE INDEX idx_proposals_status ON proposals(status);

-- Invoices Table
CREATE TABLE IF NOT EXISTS invoices (
    id SERIAL PRIMARY KEY,
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    proposal_id INTEGER REFERENCES proposals(id),
    deal_id INTEGER REFERENCES deals(id),
    client_id INTEGER REFERENCES clients(id),
    contact_email VARCHAR(255) NOT NULL,
    company_name VARCHAR(255),
    line_items JSONB NOT NULL DEFAULT '[]',
    subtotal DECIMAL(15, 2) DEFAULT 0,
    tax_amount DECIMAL(15, 2) DEFAULT 0,
    total DECIMAL(15, 2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'IDR',
    status VARCHAR(50) DEFAULT 'draft', -- draft, sent, paid, overdue, cancelled
    due_date DATE,
    paid_at TIMESTAMP WITH TIME ZONE,
    payment_method VARCHAR(50),
    payment_reference VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_invoices_deal ON invoices(deal_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_due ON invoices(due_date) WHERE status NOT IN ('paid', 'cancelled');

-- Sales Activities / Meetings
CREATE TABLE IF NOT EXISTS sales_activities (
    id SERIAL PRIMARY KEY,
    deal_id INTEGER REFERENCES deals(id),
    contact_id INTEGER REFERENCES contacts(id),
    activity_type VARCHAR(50) NOT NULL, -- call, email, meeting, demo, proposal, follow_up
    subject VARCHAR(500),
    notes TEXT,
    outcome VARCHAR(50), -- completed, no_show, rescheduled, cancelled
    scheduled_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    duration_minutes INTEGER,
    assigned_to VARCHAR(255),
    meeting_url VARCHAR(2048),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_sales_activities_deal ON sales_activities(deal_id);
CREATE INDEX idx_sales_activities_contact ON sales_activities(contact_id);
CREATE INDEX idx_sales_activities_scheduled ON sales_activities(scheduled_at);

-- Lead Assignment Rules
CREATE TABLE IF NOT EXISTS assignment_rules (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id),
    rule_name VARCHAR(255) NOT NULL,
    priority INTEGER DEFAULT 0,
    conditions JSONB NOT NULL, -- {"territory": "jakarta", "company_size": "enterprise", "min_score": 50}
    assigned_to VARCHAR(255) NOT NULL,
    assigned_email VARCHAR(255),
    max_active_deals INTEGER DEFAULT 20,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customer Onboarding Tracking
CREATE TABLE IF NOT EXISTS customer_onboarding (
    id SERIAL PRIMARY KEY,
    deal_id INTEGER REFERENCES deals(id),
    contact_id INTEGER REFERENCES contacts(id),
    client_id INTEGER REFERENCES clients(id),
    status VARCHAR(50) DEFAULT 'in_progress', -- in_progress, completed, stalled
    current_step INTEGER DEFAULT 1,
    total_steps INTEGER DEFAULT 6,
    steps JSONB NOT NULL DEFAULT '[]',
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    health_score INTEGER DEFAULT 100 -- 0-100, decreases if steps are delayed
);

CREATE INDEX idx_onboarding_status ON customer_onboarding(status);
CREATE INDEX idx_onboarding_contact ON customer_onboarding(contact_id);

-- Enhance deals table
ALTER TABLE deals ADD COLUMN IF NOT EXISTS proposal_id INTEGER REFERENCES proposals(id);
ALTER TABLE deals ADD COLUMN IF NOT EXISTS invoice_id INTEGER REFERENCES invoices(id);
ALTER TABLE deals ADD COLUMN IF NOT EXISTS closed_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE deals ADD COLUMN IF NOT EXISTS lost_reason VARCHAR(255);
ALTER TABLE deals ADD COLUMN IF NOT EXISTS source VARCHAR(100); -- inbound, outbound, referral, partner

-- Sales Targets
CREATE TABLE IF NOT EXISTS sales_targets (
    id SERIAL PRIMARY KEY,
    assigned_to VARCHAR(255) NOT NULL,
    period_type VARCHAR(20) NOT NULL, -- monthly, quarterly, yearly
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    target_value DECIMAL(15, 2) NOT NULL,
    target_deals INTEGER,
    achieved_value DECIMAL(15, 2) DEFAULT 0,
    achieved_deals INTEGER DEFAULT 0,
    client_id INTEGER REFERENCES clients(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(assigned_to, period_type, period_start)
);

CREATE INDEX idx_targets_period ON sales_targets(period_start, period_end);
CREATE INDEX idx_targets_rep ON sales_targets(assigned_to);

-- Triggers
CREATE TRIGGER update_proposals_updated_at
    BEFORE UPDATE ON proposals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_invoices_updated_at
    BEFORE UPDATE ON invoices
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
