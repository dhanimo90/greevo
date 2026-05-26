# GreeVo Scaling Guide

## Architecture at Scale

```
                    ┌─────────────────┐
                    │   Cloudflare    │
                    │   CDN + WAF     │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │     Nginx       │
                    │  Load Balancer  │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
     ┌────────▼──────┐ ┌────▼────┐ ┌──────▼───────┐
     │  n8n Main     │ │ Worker 1│ │   Worker 2   │
     │  (webhooks)   │ │ (queue) │ │   (queue)    │
     └───────┬───────┘ └────┬────┘ └──────┬───────┘
             │              │              │
             └──────────────┼──────────────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
     ┌────────▼──────┐ ┌───▼───┐ ┌──────▼───────┐
     │  PG Primary   │ │ Redis │ │  PG Replica  │
     │  (writes)     │ │(queue)│ │  (reads)     │
     └───────────────┘ └───────┘ └──────────────┘
              │
     ┌────────▼──────────────────────────────┐
     │           Prometheus + Grafana         │
     │           (Observability)              │
     └───────────────────────────────────────┘
```

## Scaling Triggers & Actions

| Clients | Action Required |
|---------|----------------|
| 1-10 | Single server (4 CPU, 16GB) |
| 10-30 | Add 1 worker node |
| 30-50 | Add read replica, 2 workers |
| 50-100 | Dedicated DB server, 3+ workers, Redis cluster |
| 100-500 | Kubernetes, auto-scaling, multi-region |
| 500+ | Sharding, dedicated infra per region |

## Performance Optimization Checklist

### Database
- [x] Materialized views for dashboard KPIs (refresh every 5min)
- [x] Composite indexes on common query patterns
- [x] ANALYZE tables for query planner
- [ ] PgBouncer connection pooling
- [ ] Read replica for reporting queries
- [ ] Table partitioning for audit_logs (>10M rows)

### Caching (Redis)
- [ ] Dashboard KPI: 5min TTL
- [ ] Contact lists: 2min TTL
- [ ] Keyword rankings: 10min TTL
- [ ] API responses: 60s TTL

### Application
- [x] Queue mode (workers process async)
- [x] Batch processing for API calls
- [x] Rate limiting per client
- [ ] Workflow execution profiling
- [ ] Lazy loading for large datasets

### Infrastructure
- [x] Docker Compose for orchestration
- [x] Nginx reverse proxy with caching
- [x] Prometheus metrics collection
- [x] Grafana dashboards
- [ ] Kubernetes Helm chart
- [ ] Auto-scaling based on queue depth
- [ ] Multi-region active-active

## Deployment Commands

```bash
# Standard (1-30 clients)
docker-compose -f docker/docker-compose.yml -f docker/docker-compose.production.yml up -d

# Scale (30-100 clients)
docker-compose -f docker/docker-compose.yml -f docker/docker-compose.scale.yml up -d

# Add more workers dynamically
docker-compose -f docker/docker-compose.scale.yml up -d --scale n8n-worker=4
```

## Monitoring Endpoints

| Service | URL | Purpose |
|---------|-----|---------|
| n8n | :5678/healthz | Health check |
| n8n | :5678/metrics | Prometheus metrics |
| Grafana | :3001 | Dashboards |
| Prometheus | :9090 | Metrics store |
| CDN | :8080/health | Cache status |

## Disaster Recovery

### Backup Strategy
| Type | Frequency | Retention | Storage |
|------|-----------|-----------|---------|
| Full DB | Weekly | 30 days | S3 |
| Incremental | Daily | 7 days | S3 |
| WAL archive | Continuous | 7 days | S3 |
| Workflow JSON | On change | Forever | Git |

### Recovery Time Objectives
| Scenario | RTO | RPO |
|----------|-----|-----|
| Single node failure | 5 min | 0 (replica) |
| Database corruption | 30 min | 1 hour |
| Full region outage | 2 hours | 5 min |
| Data deletion (human error) | 1 hour | 24 hours |

### Recovery Procedures
```bash
# Restore from backup
pg_restore -h localhost -U greevo -d greevo /backups/latest.dump

# Failover to replica
# 1. Promote replica
docker exec greevo-pg-replica pg_ctl promote

# 2. Update connection strings
# 3. Verify data integrity
```
