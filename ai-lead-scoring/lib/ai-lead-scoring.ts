/**
 * AI Lead Scoring Module
 * Core algorithm for scoring and classifying leads based on demographics, behavior, and engagement.
 */

export interface Lead {
  id: string;
  employees?: number;
  industry?: string;
  title?: string;
  uses_target_tech?: boolean;
  activities?: {
    website_visits?: number;
    email_opens?: number;
    email_clicks?: number;
    form_submissions?: number;
    webinar_attended?: boolean;
  };
  engagement?: {
    avg_time_on_site?: number;
    return_visits?: number;
    unique_pages?: number;
    viewed_pricing?: boolean;
  };
  last_activity_date?: Date | string;
}

export interface LeadScoreResult {
  score: number;
  classification: 'HOT' | 'WARM' | 'COOL' | 'COLD';
  recommendation: string;
  breakdown: { demographic: number; behavior: number; engagement: number; decay: number };
}

export class AILeadScoring {
  private weights = { demographics: 0.30, behavior: 0.50, engagement: 0.20 };
  private thresholds = { hot: 80, warm: 60, cool: 40 };

  calculateDemographicScore(lead: Lead): number {
    let score = 0;
    const employees = lead.employees || 0;
    if (employees >= 100) score += 25;
    else if (employees >= 50) score += 20;
    else if (employees >= 10) score += 15;

    const targetIndustries = ['SaaS', 'Technology', 'Finance', 'Healthcare'];
    if (lead.industry && targetIndustries.includes(lead.industry)) score += 25;

    const decisionMakers = ['CEO', 'CTO', 'VP', 'Director', 'Manager'];
    if (lead.title && decisionMakers.some(dm => lead.title!.includes(dm))) score += 25;

    if (lead.uses_target_tech) score += 25;
    return Math.min(score, 100);
  }

  calculateBehaviorScore(lead: Lead): number {
    let score = 0;
    const activities = lead.activities || {};
    score += Math.min((activities.website_visits || 0) * 5, 30);
    score += Math.min((activities.email_opens || 0) * 2 + (activities.email_clicks || 0) * 5, 30);
    score += Math.min((activities.form_submissions || 0) * 10, 25);
    if (activities.webinar_attended) score += 15;
    return Math.min(score, 100);
  }

  calculateEngagementScore(lead: Lead): number {
    let score = 0;
    const engagement = lead.engagement || {};
    score += Math.min((engagement.avg_time_on_site || 0) / 60, 30);
    score += Math.min((engagement.return_visits || 0) * 10, 30);
    score += Math.min((engagement.unique_pages || 0) * 3, 25);
    if (engagement.viewed_pricing) score += 15;
    return Math.min(score, 100);
  }

  applyScoreDecay(lastActivityDate?: Date | string): number {
    if (!lastActivityDate) return 0;
    const lastActivity = typeof lastActivityDate === 'string' ? new Date(lastActivityDate) : lastActivityDate;
    const daysInactive = Math.floor((Date.now() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, Math.floor(daysInactive / 7) * 5);
  }

  calculateTotalScore(lead: Lead): { total: number; breakdown: { demographic: number; behavior: number; engagement: number; decay: number } } {
    const demographic = this.calculateDemographicScore(lead);
    const behavior = this.calculateBehaviorScore(lead);
    const engagement = this.calculateEngagementScore(lead);
    const decay = this.applyScoreDecay(lead.last_activity_date);
    const total = Math.max(0, demographic * this.weights.demographics + behavior * this.weights.behavior + engagement * this.weights.engagement - decay);
    return { total: Math.round(total * 100) / 100, breakdown: { demographic, behavior, engagement, decay } };
  }

  classifyLead(score: number): { classification: 'HOT' | 'WARM' | 'COOL' | 'COLD'; recommendation: string } {
    if (score >= this.thresholds.hot) return { classification: 'HOT', recommendation: 'Immediate sales follow-up required' };
    if (score >= this.thresholds.warm) return { classification: 'WARM', recommendation: 'Nurture sequence + sales touch' };
    if (score >= this.thresholds.cool) return { classification: 'COOL', recommendation: 'Marketing automation only' };
    return { classification: 'COLD', recommendation: 'Re-engage or disqualify' };
  }

  scoreLead(lead: Lead): LeadScoreResult {
    const { total, breakdown } = this.calculateTotalScore(lead);
    const { classification, recommendation } = this.classifyLead(total);
    return { score: total, classification, recommendation, breakdown };
  }
}

export const leadScorer = new AILeadScoring();
export default AILeadScoring;