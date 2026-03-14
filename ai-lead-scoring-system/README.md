# AI Lead Scoring System

A comprehensive lead scoring application that scores leads 0-100 based on demographic, behavioral, engagement, and intent data.

## Features

- **Demographic Scoring (25 points)**: Industry fit, company size, location, job title seniority
- **Behavioral Scoring (25 points)**: Website engagement depth, frequency, recency
- **Engagement Scoring (25 points)**: Email engagement rate, response rate, interaction quality
- **Intent Scoring (25 points)**: Buying signals, pricing page visits, demo requests

## Tier Classification

- **Hot (80-100)**: Ready to buy, immediate follow-up required
- **Warm (50-79)**: Interested, nurture with educational content
- **Cold (0-49)**: Low priority, minimal outreach

## Recommendations Engine

Each lead receives actionable recommendations based on their score:

### Hot Leads
- Schedule demo immediately
- Assign dedicated sales rep
- Send personalized pricing proposal
- Priority follow-up within 24 hours

### Warm Leads
- Send case studies relevant to industry
- Invite to upcoming webinar
- Share educational content
- Follow-up within 3-5 days

### Cold Leads
- Add to newsletter list
- Send occasional check-ins
- Monitor for increased activity
- Re-engage in 30 days

## Tech Stack

- HTML5
- Tailwind CSS (via CDN)
- Vanilla JavaScript
- LocalStorage for data persistence

## Usage

1. Open `index.html` in a browser
2. Fill in lead data across all four categories
3. Click "Calculate Lead Score"
4. View score breakdown and recommendations
5. Dashboard shows all scored leads with tier distribution

## Scoring Algorithm

### Demographic Score
- Industry: Technology (10), Finance (8), Healthcare (7), Retail (5), Manufacturing (4), Other (3)
- Company Size: 500+ (10), 201-500 (9), 51-200 (7), 11-50 (5), 1-10 (3)
- Location: SF/NY (10), Boston/Seattle (8), Austin (7), Other (5)
- Job Title: VP (10), Director (8), Manager (6), Senior (5), Other (3)

### Behavioral Score
- Website Visits: 10+ (7pts), 5-9 (5pts), 2-4 (3pts)
- Page Views: 20+ (7pts), 10-19 (5pts), 5-9 (3pts)
- Time on Site: 15+ min (6pts), 8-14 min (4pts), 3-7 min (2pts)
- Recency: <1 day (5pts), 1-7 days (3pts), 8-30 days (1pt)

### Engagement Score
- Email Opens: 2 pts each (max 10)
- Link Clicks: 3 pts each (max 15)
- Form Submissions: 5 pts each (max 15)
- Webinar Attended: 10 pts

### Intent Score
- Pricing Page Visits: 8 pts each (max 16)
- Demo Requests: 10 pts each (max 20)
- Trial Signups: 8 pts each (max 16)
- Competitor Comparison: 5 pts

## License

MIT