import requests
from datetime import datetime
from model_training import LeadScoringModel
from config import *

class CRMIntegration:
    def __init__(self, crm_type='salesforce'):
        self.crm_type = crm_type
        self.model = LeadScoringModel()
    
    def sync_scores(self, leads):
        results = {'synced': 0, 'alerts': 0, 'errors': []}
        for lead in leads:
            try:
                score_result = self._score_lead(lead)
                self._update_crm(lead['id'], score_result)
                results['synced'] += 1
                if score_result['score'] >= HOT_LEAD_THRESHOLD:
                    self._trigger_hot_lead_alert(lead, score_result)
                    results['alerts'] += 1
            except Exception as e:
                results['errors'].append({'lead_id': lead['id'], 'error': str(e)})
        return results
    
    def _update_salesforce(self, lead_id, score_result):
        url = f"{SALESFORCE_INSTANCE_URL}/services/data/v56.0/sobjects/Lead/{lead_id}"
        data = {'lead_score__c': score_result['score'], 'lead_category__c': score_result['category']}
        requests.patch(url, headers={'Authorization': f'Bearer {SALESFORCE_ACCESS_TOKEN}'}, json=data)
    
    def _trigger_hot_lead_alert(self, lead, score_result):
        webhook_url = os.getenv('SLACK_WEBHOOK_URL')
        if webhook_url:
            message = {'text': f"HOT LEAD: {lead.get('email')} - Score: {score_result['score']}"}
            requests.post(webhook_url, json=message)