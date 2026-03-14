# AI Lead Scoring Deployment Guide

## Environment Variables

```bash
CRM_API_KEY=your_hubspot_or_salesforce_api_key
CRM_INSTANCE_URL=https://api.hubapi.com
WEBHOOK_SECRET=your_webhook_authentication_secret
```

## Deployment Options

### AWS Lambda
```bash
serverless deploy --stage production
```

### Google Cloud Functions
```bash
gcloud functions deploy lead-scorer \
  --runtime nodejs18 \
  --trigger-http \
  --set-env-vars CRM_API_KEY=xxx,CRM_INSTANCE_URL=xxx
```

### Vercel
```bash
vercel --prod
```

## CRM Setup

### HubSpot
1. Create custom properties:
   - `lead_score` (number)
   - `lead_classification` (string: HOT/WARM/COOL/COLD)
   - `last_scored` (datetime)

2. Configure webhook triggers:
   - Contact creation
   - Email events (open, click)
   - Website page views
   - Form submissions

3. Create workflows by score tier:
   - HOT: Assign to sales rep, send Slack alert
   - WARM: Add to nurture sequence
   - COOL: Marketing automation only
   - COLD: Re-engagement campaign

## Monitoring

### Weekly Metrics to Track
- Scoring accuracy (conversion rate by tier)
- Average score distribution
- HOT lead response time
- Decay rate impact

### Adjusting Weights
Based on conversion data, adjust weights:
```typescript
private weights = {
  demographics: 0.30,  // Adjust based on ICP fit
  behavior: 0.50,      // Adjust based on engagement correlation
  engagement: 0.20     // Adjust based on intent signals
};
```