import pandas as pd
import numpy as np
import requests
from config import *

class DataPipeline:
    def __init__(self, crm_type='salesforce'):
        self.crm_type = crm_type
    
    def engineer_features(self, df):
        features = pd.DataFrame()
        
        # Behavioral Features
        features['pages_per_session'] = df.get('pages_per_session', 0)
        features['avg_session_duration'] = df.get('avg_session_duration', 0)
        features['return_frequency'] = df.get('return_frequency', 0)
        features['blog_reads'] = df.get('blog_reads', 0)
        features['video_views'] = df.get('video_views', 0)
        features['downloads'] = df.get('downloads', 0)
        features['content_score'] = features['blog_reads'] * 1 + features['video_views'] * 2 + features['downloads'] * 5
        features['email_opens'] = df.get('email_opens', 0)
        features['email_clicks'] = df.get('email_clicks', 0)
        features['email_replies'] = df.get('email_replies', 0)
        features['email_score'] = features['email_opens'] * 0.5 + features['email_clicks'] * 2 + features['email_replies'] * 5
        features['demo_requested'] = df.get('demo_requested', 0)
        features['demo_score'] = features['demo_requested'] * 10
        
        # Demographic Features
        features['employee_count'] = df.get('NumberOfEmployees', 0)
        features['revenue_tier'] = self._categorize_revenue(df.get('AnnualRevenue', 0))
        features['industry_icp_score'] = df['Industry'].apply(self._icp_match_score) if 'Industry' in df else 2
        features['title_score'] = df['Title'].apply(self._title_score) if 'Title' in df else 0
        features['geo_score'] = df.apply(lambda x: self._geo_score(x.get('Country', ''), x.get('State', '')), axis=1)
        
        # Firmographic Features
        features['hiring_velocity'] = df.get('hiring_velocity', 0)
        features['funding_amount'] = df.get('funding_amount', 0)
        features['growth_score'] = features['hiring_velocity'] * 2 + np.log1p(features['funding_amount'])
        features['tech_stack_match'] = df.get('tech_stack_match', 0)
        features['competitor_count'] = df.get('competitor_count', 0)
        
        # Target
        features['converted'] = df['IsConverted'].astype(int) if 'IsConverted' in df else 0
        
        return features
    
    def _categorize_revenue(self, revenue):
        if revenue >= 100000000: return 5
        elif revenue >= 10000000: return 4
        elif revenue >= 1000000: return 3
        elif revenue >= 100000: return 2
        return 1
    
    def _icp_match_score(self, industry):
        icp = {'Technology': 10, 'Software': 10, 'SaaS': 10, 'Financial Services': 8, 'Healthcare': 7}
        return icp.get(industry, 2)
    
    def _title_score(self, title):
        if pd.isna(title): return 0
        t = title.lower()
        if any(x in t for x in ['ceo', 'cto', 'cfo', 'cmo', 'vp', 'vice president']): return 10
        elif any(x in t for x in ['director', 'head', 'lead']): return 7
        elif any(x in t for x in ['manager', 'senior']): return 5
        return 2
    
    def _geo_score(self, country, state):
        if country in ['United States', 'US']:
            return 10 if state in ['CA', 'NY', 'TX', 'WA', 'MA', 'FL'] else 7
        elif country in ['Canada', 'United Kingdom', 'Germany', 'Australia']: return 6
        return 3

if __name__ == '__main__':
    pipeline = DataPipeline(CRM_TYPE)
    print("Data pipeline ready. Use extract_leads() to fetch from CRM.")