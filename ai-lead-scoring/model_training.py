import pandas as pd
import numpy as np
from sklearn.model_selection import cross_val_score, StratifiedKFold
from sklearn.preprocessing import StandardScaler
import xgboost as xgb
import joblib

class LeadScoringModel:
    def __init__(self):
        self.model = None
        self.scaler = StandardScaler()
        self.feature_names = None
    
    def train(self, X, y):
        X_scaled = self.scaler.fit_transform(X)
        self.feature_names = X.columns.tolist()
        self.model = xgb.XGBClassifier(
            objective='binary:logistic',
            n_estimators=200,
            max_depth=6,
            learning_rate=0.1,
            subsample=0.8,
            colsample_bytree=0.8,
            random_state=42
        )
        cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
        cv_scores = cross_val_score(self.model, X_scaled, y, cv=cv, scoring='roc_auc')
        print(f"Mean AUC: {cv_scores.mean():.4f}")
        self.model.fit(X_scaled, y)
        return cv_scores.mean()
    
    def predict_with_drivers(self, X):
        X_scaled = self.scaler.transform(X)
        prob = self.model.predict_proba(X_scaled)[0, 1]
        score = round(prob * 100, 2)
        importance = self.model.feature_importances_
        drivers = sorted(zip(self.feature_names, importance), key=lambda x: x[1], reverse=True)[:5]
        return {'score': score, 'confidence': round(min(score, 100-score) * 2 / 100, 2), 'top_drivers': [{'feature': f, 'importance': round(i, 4)} for f, i in drivers]}