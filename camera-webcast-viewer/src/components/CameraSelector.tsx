import React from 'react';
import { Search } from 'lucide-react';
import type { Camera } from '../types/camera';

interface CameraSelectorProps {
  cameras: Camera[];
  selectedCamera: Camera | null;
  onSelectCamera: (camera: Camera | null) => void;
  onFilterChange: (filter: Camera['status'] | 'all') => void;
}

export const CameraSelector: React.FC<CameraSelectorProps> = ({
  cameras,
  selectedCamera,
  onSelectCamera,
  onFilterChange
}) => {
  const onlineCount = cameras.filter(c => c.status === 'online').length;
  const offlineCount = cameras.filter(c => c.status === 'offline').length;
  const recordingCount = cameras.filter(c => c.status === 'recording').length;

  return (
    <div className="camera-selector">
      <div className="selector-search">
        <Search size={18} />
        <input 
          type="text" 
          placeholder="Search cameras..."
          className="search-input"
        />
      </div>
      
      <div className="selector-filters">
        <button 
          className="filter-btn active"
          onClick={() => onFilterChange('all')}
        >
          All ({cameras.length})
        </button>
        <button 
          className="filter-btn"
          onClick={() => onFilterChange('online')}
        >
          <span className="status-dot online"></span>
          Online ({onlineCount})
        </button>
        <button 
          className="filter-btn"
          onClick={() => onFilterChange('recording')}
        >
          <span className="status-dot recording"></span>
          Recording ({recordingCount})
        </button>
        <button 
          className="filter-btn"
          onClick={() => onFilterChange('offline')}
        >
          <span className="status-dot offline"></span>
          Offline ({offlineCount})
        </button>
      </div>
    </div>
  );
};