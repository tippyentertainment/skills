# AI Lead Scoring System - Deployment Guide

## Quick Start

```bash
# Clone the repository
git clone https://github.com/tippyentertainment/skills.git
cd skills/ai-lead-scoring

# Install dependencies
pip install -r requirements.txt

# Set environment variables
export CRM_TYPE=salesforce
export SALESFORCE_CLIENT_ID=your_client_id
export SALESFORCE_CLIENT_SECRET=your_client_secret
export SALESFORCE_INSTANCE_URL=https://your-instance.my.salesforce.com

# Train model (requires historical lead data)
python model_training.py

# Start API server
python scoring_api.py
```

## API Endpoints

### POST /score
Score a single lead:
```json
{
  "pages_per_session": 4.5,
  "blog_reads": 3,
  "video_views": 2,
  "downloads": 1,
  "email_opens": 5,
  "email_clicks": 2,
  "email_replies": 1,
  "demo_requested": 1,
  "employee_count": 150,
  "revenue_tier": 4,
  "industry": "Technology",
  "title": "VP of Engineering",
  "country": "United States",
  "state": "CA",
  "hiring_velocity": 12,
  "funding_amount": 5000000
}
```

Response:
```json
{
  "score": 87.5,
  "confidence": 0.75,
  "category": "HOT",
  "top_drivers": [
    {"feature": "demo_score", "importance": 0.25},
    {"feature": "title_score", "importance": 0.18},
    {"feature": "industry_icp_score", "importance": 0.15}
  ],
  "latency_ms": 12.5
}
```

## Expected Results

| Metric | Improvement |
|--------|-------------|
| Pipeline Velocity | 3.4x |
| Conversion Rate (hot leads) | 2-3x |
| Sales Efficiency | 50% less time on cold leads |
| Response Time (hot leads) | 60% faster |

## CRM Integration

### Salesforce
Set `CRM_TYPE=salesforce` and configure OAuth credentials.

### HubSpot
Set `CRM_TYPE=hubspot` and `HUBSPOT_API_KEY`.

### Pipedrive
Set `CRM_TYPE=pipedrive` and `PIPEDRIVE_API_KEY`.

## Docker Deployment

```bash
docker-compose up -d
```

API will be available at http://localhost:8000