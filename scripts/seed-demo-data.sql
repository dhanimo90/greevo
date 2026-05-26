-- ============================================
-- Seed Demo Data for Testing & Demos
-- Run: psql -U greevo -d greevo -f scripts/seed-demo-data.sql
-- ============================================

-- Demo Client
INSERT INTO clients (client_code, company_name, domain, contact_email, contact_name, plan_type, status, api_key, webhook_secret, max_contacts, max_keywords, max_emails_per_month, config)
VALUES ('demo', 'Demo Company', 'demo.greevo.id', 'admin@demo.com', 'Admin Demo', 'enterprise', 'active', 'gv_demo_key_12345', 'demo_secret', 100000, 2000, 200000, '{"ai_config": {"industry": "saas_technology", "brand_tone": "professional", "target_audience": "B2B decision makers"}}'::jsonb)
ON CONFLICT (client_code) DO NOTHING;

-- Demo User (password: demo1234)
INSERT INTO users (email, name, role, password_hash, client_id, is_active)
VALUES ('admin@demo.com', 'Admin Demo', 'admin', encode(sha256(('demo1234' || 'admin@demo.com')::bytea), 'hex'), (SELECT id FROM clients WHERE client_code = 'demo'), true)
ON CONFLICT (email) DO UPDATE SET password_hash = encode(sha256(('demo1234' || 'admin@demo.com')::bytea), 'hex');

-- Demo Contacts
INSERT INTO contacts (email, first_name, last_name, company, job_title, phone, lead_score, lead_status, source, client_id, tags) VALUES
('budi@ptmaju.co.id', 'Budi', 'Santoso', 'PT Maju Bersama', 'Marketing Director', '+6281234567001', 85, 'qualified', 'website', (SELECT id FROM clients WHERE client_code = 'demo'), ARRAY['enterprise', 'hot']),
('siti@globex.com', 'Siti', 'Rahayu', 'Globex Corporation', 'CEO', '+6281234567002', 92, 'opportunity', 'referral', (SELECT id FROM clients WHERE client_code = 'demo'), ARRAY['enterprise', 'vip']),
('alex@techfirm.io', 'Alex', 'Wong', 'TechFirm Indonesia', 'CTO', '+6281234567003', 68, 'contacted', 'event', (SELECT id FROM clients WHERE client_code = 'demo'), ARRAY['startup']),
('jane@startup.id', 'Jane', 'Smith', 'StartupID', 'Founder', '+6281234567004', 45, 'new', 'social', (SELECT id FROM clients WHERE client_code = 'demo'), ARRAY['startup', 'smb']),
('andi@enterprise.co', 'Andi', 'Pratama', 'Enterprise Co', 'VP Sales', '+6281234567005', 78, 'qualified', 'website', (SELECT id FROM clients WHERE client_code = 'demo'), ARRAY['enterprise']),
('maya@creative.id', 'Maya', 'Putri', 'Creative Agency', 'Owner', '+6281234567006', 55, 'contacted', 'referral', (SELECT id FROM clients WHERE client_code = 'demo'), ARRAY['agency']),
('rudi@manufacture.com', 'Rudi', 'Hartono', 'PT Manufacture Indo', 'GM', '+6281234567007', 30, 'new', 'website', (SELECT id FROM clients WHERE client_code = 'demo'), ARRAY['manufacturing']),
('lisa@retail.co.id', 'Lisa', 'Wijaya', 'Retail Group', 'Marketing Manager', '+6281234567008', 62, 'contacted', 'event', (SELECT id FROM clients WHERE client_code = 'demo'), ARRAY['retail'])
ON CONFLICT (email) DO NOTHING;

-- Demo Deals
INSERT INTO deals (contact_id, deal_name, deal_value, stage, probability, assigned_to, client_id) VALUES
((SELECT id FROM contacts WHERE email = 'budi@ptmaju.co.id'), 'PT Maju - SEO Package', 50000000, 'proposal', 40, 'Sales Rep A', (SELECT id FROM clients WHERE client_code = 'demo')),
((SELECT id FROM contacts WHERE email = 'siti@globex.com'), 'Globex - Full Suite Enterprise', 500000000, 'negotiation', 70, 'Sales Rep A', (SELECT id FROM clients WHERE client_code = 'demo')),
((SELECT id FROM contacts WHERE email = 'alex@techfirm.io'), 'TechFirm - Standard Package', 120000000, 'qualification', 20, 'Sales Rep B', (SELECT id FROM clients WHERE client_code = 'demo')),
((SELECT id FROM contacts WHERE email = 'andi@enterprise.co'), 'Enterprise Co - Marketing Auto', 250000000, 'proposal', 50, 'Sales Rep A', (SELECT id FROM clients WHERE client_code = 'demo')),
((SELECT id FROM contacts WHERE email = 'maya@creative.id'), 'Creative Agency - Starter', 30000000, 'prospecting', 10, 'Sales Rep B', (SELECT id FROM clients WHERE client_code = 'demo'));

-- Demo Keywords
INSERT INTO tracked_keywords (keyword, target_url, country, client_id, is_active) VALUES
('crm terbaik indonesia', 'https://demo.greevo.id/crm', 'id', (SELECT id FROM clients WHERE client_code = 'demo'), true),
('marketing automation', 'https://demo.greevo.id/marketing', 'id', (SELECT id FROM clients WHERE client_code = 'demo'), true),
('jasa seo jakarta', 'https://demo.greevo.id/seo', 'id', (SELECT id FROM clients WHERE client_code = 'demo'), true),
('email marketing platform', 'https://demo.greevo.id/email', 'id', (SELECT id FROM clients WHERE client_code = 'demo'), true),
('lead generation tools', 'https://demo.greevo.id/leads', 'id', (SELECT id FROM clients WHERE client_code = 'demo'), true),
('workflow automation', 'https://demo.greevo.id/workflow', 'id', (SELECT id FROM clients WHERE client_code = 'demo'), true),
('digital marketing agency', 'https://demo.greevo.id', 'id', (SELECT id FROM clients WHERE client_code = 'demo'), true),
('seo monitoring tool', 'https://demo.greevo.id/seo-tool', 'id', (SELECT id FROM clients WHERE client_code = 'demo'), true);

-- Demo Keyword Rankings
INSERT INTO keyword_rankings (keyword_id, position, previous_position, search_volume, checked_at)
SELECT tk.id, 
  CASE tk.keyword 
    WHEN 'crm terbaik indonesia' THEN 2
    WHEN 'marketing automation' THEN 5
    WHEN 'jasa seo jakarta' THEN 3
    WHEN 'email marketing platform' THEN 9
    WHEN 'lead generation tools' THEN 7
    WHEN 'workflow automation' THEN 12
    WHEN 'digital marketing agency' THEN 18
    WHEN 'seo monitoring tool' THEN 4
  END,
  CASE tk.keyword 
    WHEN 'crm terbaik indonesia' THEN 3
    WHEN 'marketing automation' THEN 6
    WHEN 'jasa seo jakarta' THEN 5
    WHEN 'email marketing platform' THEN 7
    WHEN 'lead generation tools' THEN 10
    WHEN 'workflow automation' THEN 11
    WHEN 'digital marketing agency' THEN 22
    WHEN 'seo monitoring tool' THEN 4
  END,
  CASE tk.keyword 
    WHEN 'crm terbaik indonesia' THEN 3200
    WHEN 'marketing automation' THEN 1800
    WHEN 'jasa seo jakarta' THEN 2400
    WHEN 'email marketing platform' THEN 1500
    WHEN 'lead generation tools' THEN 2100
    WHEN 'workflow automation' THEN 1200
    WHEN 'digital marketing agency' THEN 4500
    WHEN 'seo monitoring tool' THEN 900
  END,
  NOW()
FROM tracked_keywords tk
WHERE tk.client_id = (SELECT id FROM clients WHERE client_code = 'demo');

SELECT 'Demo data seeded successfully!' as status;
