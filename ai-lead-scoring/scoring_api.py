from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import pandas as pd
import numpy as np
import time
from model_training import LeadScoringModel

app = FastAPI(title="AI Lead Scoring API", version="1.0.0")
model = LeadScoringModel()

class LeadData(BaseModel):
    pages_per_session: float = 0
    avg_session_duration: float = 0
    blog_reads: int = 0
    video_views: int = 0
    downloads: int = 0
    email_opens: int = 0
    email_clicks: int = 0
    email_replies: int = 0
    demo_requested: int = 0
    employee_count: int = 0
    revenue_tier: int = 1
    industry: str = 'Other'
    title: str = ''
    country: str = ''
    state: str = ''
    hiring_velocity: float = 0
    funding_amount: float = 0
    tech_stack_match: float = 0
    competitor_count: int = 0

class ScoreResponse(BaseModel):
    score: float
    confidence: float
    category: str
    top_drivers: List[dict]
    latency_ms: float

@app.post("/score", response_model=ScoreResponse)
async def score_lead(lead: LeadData):
    start = time.time()
    features = pd.DataFrame([{
        'pages_per_session': lead.pages_per_session,
        'content_score': lead.blog_reads + lead.video_views * 2 + lead.downloads * 5,
        'email_score': lead.email_opens * 0.5 + lead.email_clicks * 2 + lead.email_replies * 5,
        'demo_score': lead.demo_requested * 10,
        'employee_count': lead.employee_count,
        'revenue_tier': lead.revenue_tier,
        'growth_score': lead.hiring_velocity * 2 + np.log1p(lead.funding_amount)
    }])
    result = model.predict_with_drivers(features)
    latency = (time.time() - start) * 1000
    category = 'HOT' if result['score'] >= 70 else ('WARM' if result['score'] >= 40 else 'COLD')
    return ScoreResponse(score=result['score'], confidence=result['confidence'], category=category, top_drivers=result['top_drivers'], latency_ms=round(latency, 2))

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)