-- ============================================
-- Phase 15: Scale & Optimization
-- ============================================

-- Partitioning: audit_logs by month (for large datasets)
-- Note: Requires PostgreSQL 12+ declarative partitioning
-- Only apply when audit_logs > 10M rows

-- CREATE TABLE audit_logs_partitioned (LIKE audit_logs INCLUDING ALL) PARTITION BY RANGE (created_at);
-- CREATE TABLE audit_logs_2026_01 PARTITION OF audit_logs_partitioned FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');
-- ... create monthly partitions

-- Materialized views for dashboard (avoid expensive queries)
CREATE MATERIALIZED VIEW IF NOT EXISTS mv_dashboard_kpi AS
SELECT
  c.id as client_id,
  (SELECT COUNT(*) FROM contacts WHERE client_id = c.id) as total_contacts,
  (SELECT COUNT(*) FROM contacts WHERE client_id = c.id AND created_at > NOW() - INTERVAL '7 days') as new_leads_7d,
  (SELECT COUNT(*) FROM contacts WHERE client_id = c.id AND lead_status = 'customer') as customers,
  (SELECT COUNT(*) FROM contacts WHERE client_id = c.id AND lead_score >= 80) as hot_leads,
  (SELECT COALESCE(SUM(deal_value), 0) FROM deals d JOIN contacts ct ON ct.id = d.contact_id WHERE ct.client_id = c.id AND d.stage NOT IN ('closed_won','closed_lost')) as pipeline_value,
  (SELECT COALESCE(SUM(deal_value), 0) FROM deals d JOIN contacts ct ON ct.id = d.contact_id WHERE ct.client_id = c.id AND d.stage = 'closed_won' AND d.updated_at > date_trunc('month', NOW())) as revenue_mtd,
  (SELECT COUNT(*) FROM tracked_keywords WHERE client_id = c.id AND is_active = true) as tracked_keywords,
  NOW() as refreshed_at
FROM clients c
WHERE c.status = 'active';

CREATE UNIQUE INDEX IF NOT EXISTS idx_mv_dashboard_client ON mv_dashboard_kpi(client_id);

-- Refresh function (call every 5 minutes)
CREATE OR REPLACE FUNCTION refresh_dashboard_kpi()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY mv_dashboard_kpi;
END;
$$ LANGUAGE plpgsql;

-- Query performance indexes (based on common slow queries)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_contacts_client_status ON contacts(client_id, lead_status);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_contacts_client_score ON contacts(client_id, lead_score DESC);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_contacts_created_client ON contacts(client_id, created_at DESC);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_activities_contact_type_date ON lead_activities(contact_id, activity_type, created_at DESC);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_deals_client_stage ON deals(stage) WHERE stage NOT IN ('closed_won', 'closed_lost');
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_rankings_keyword_latest ON keyword_rankings(keyword_id, checked_at DESC);

-- Connection pooling config recommendation
-- Use PgBouncer in production:
-- pool_mode = transaction
-- max_client_conn = 1000
-- default_pool_size = 50

-- Redis caching strategy (documented, implemented in workflows)
-- Cache keys:
--   dashboard:{client_id} → TTL 5min (KPI data)
--   contacts:{client_id}:list → TTL 2min
--   keywords:{client_id} → TTL 10min
--   seo:rankings:{keyword_id} → TTL 1hour

-- Table statistics for query planner
ANALYZE contacts;
ANALYZE lead_activities;
ANALYZE deals;
ANALYZE keyword_rankings;
ANALYZE tracked_keywords;
ANALYZE backlinks;
