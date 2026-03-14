# Lead Scoring API

REST API endpoint for real-time lead scoring.

## Endpoints

### POST /api/score
Score a single lead based on attributes.

**Request Body:**
```json
{
  "companySize": "51-200",
  "industry": "technology",
  "engagementLevel": "high",
  "budget": "enterprise"
}
```

**Response:**
```json
{
  "success": true,
  "score": 85,
  "tier": "hot",
  "lead": { ... },
  "scoredAt": "2026-03-14T03:21:41.608Z"
}
```

### POST /api/score/batch
Score multiple leads in one request.

### GET /api/health
Health check endpoint.

## Scoring Weights

| Attribute | Values | Points |
|-----------|--------|--------|
| Company Size | 1-10, 11-50, 51-200, 201-500, 500+ | 5-50 |
| Industry | technology, finance, healthcare, retail, manufacturing, other | 15-40 |
| Engagement | high, medium, low | 10-30 |
| Budget | enterprise, mid-market, smb, unknown | 5-40 |

## Lead Tiers

- **Hot**: Score 80-100
- **Warm**: Score 60-79
- **Qualified**: Score 40-59
- **Cold**: Score 0-39

## Deployment

This API is designed to deploy on Vercel as a serverless function.

```bash
vercel --prod
```