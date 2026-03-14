import { VercelRequest, VercelResponse } from '@vercel/node';

interface LeadData {
  companySize?: string;
  industry?: string;
  engagementLevel?: string;
  budget?: string;
  email?: string;
  name?: string;
  company?: string;
  source?: string;
}

const SCORING_WEIGHTS = {
  companySize: { '1-10': 5, '11-50': 15, '51-200': 25, '201-500': 35, '500+': 50 },
  industry: { 'technology': 40, 'finance': 35, 'healthcare': 30, 'retail': 20, 'manufacturing': 25, 'other': 15 },
  engagementLevel: { 'high': 30, 'medium': 20, 'low': 10 },
  budget: { 'enterprise': 40, 'mid-market': 25, 'smb': 15, 'unknown': 5 }
};

function calculateLeadScore(lead: LeadData): number {
  let score = 0;
  if (lead.companySize) score += SCORING_WEIGHTS.companySize[lead.companySize] || 0;
  if (lead.industry) score += SCORING_WEIGHTS.industry[lead.industry] || 0;
  if (lead.engagementLevel) score += SCORING_WEIGHTS.engagementLevel[lead.engagementLevel] || 0;
  if (lead.budget) score += SCORING_WEIGHTS.budget[lead.budget] || 0;
  return Math.min(score, 100);
}

function getLeadTier(score: number): string {
  if (score >= 80) return 'hot';
  if (score >= 60) return 'warm';
  if (score >= 40) return 'qualified';
  return 'cold';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST' && req.url === '/api/score') {
    const lead: LeadData = req.body;
    const score = calculateLeadScore(lead);
    const tier = getLeadTier(score);
    return res.status(200).json({ success: true, score, tier, lead, scoredAt: new Date().toISOString() });
  }
  if (req.method === 'GET' && req.url === '/api/health') {
    return res.status(200).json({ status: 'healthy', service: 'lead-scoring-api', version: '1.0.0' });
  }
  return res.status(404).json({ error: 'Not found' });
}