import React from 'react';
import { Video, RefreshCw, Settings, Grid, List } from 'lucide-react';

interface HeaderProps {
  onRefresh: () => void;
  layout: 'grid' | 'list';
  onLayoutChange: (layout: 'grid' | 'list') => void;
}

export const Header: React.FC<HeaderProps> = ({ onRefresh, layout, onLayoutChange }) => {
  return (
    <header className="header">
      <div className="header-left">
        <Video className="header-icon" />
        <h1>Camera Webcast Viewer</h1>
      </div>
      <div className="header-right">
        <button 
          className="layout-toggle"
          onClick={() => onLayoutChange(layout === 'grid' ? 'list' : 'grid')}
          title={`Switch to ${layout === 'grid' ? 'list' : 'grid'} view`}
        >
          {layout === 'grid' ? <List size={20} /> : <Grid size={20} />}
        </button>
        <button className="refresh-btn" onClick={onRefresh}>
          <RefreshCw size={20} />
          <span>Refresh</span>
        </button>
        <button className="settings-btn">
          <Settings size={20} />
        </button>
      </div>
    </header>
  );
};