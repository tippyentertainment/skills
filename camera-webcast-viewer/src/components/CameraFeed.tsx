import React from 'react';
import { 
  Video, 
  VideoOff, 
  Circle, 
  Maximize2, 
  Minimize2, 
  X,
  MapPin,
  Clock
} from 'lucide-react';
import type { Camera } from '../types/camera';

interface CameraFeedProps {
  camera: Camera;
  isExpanded?: boolean;
  onExpand?: () => void;
  onClose?: () => void;
}

export const CameraFeed: React.FC<CameraFeedProps> = ({ 
  camera, 
  isExpanded = false,
  onExpand,
  onClose
}) => {
  const getStatusColor = (status: Camera['status']) => {
    switch (status) {
      case 'online': return 'status-online';
      case 'offline': return 'status-offline';
      case 'recording': return 'status-recording';
      default: return 'status-unknown';
    }
  };

  const getStatusIcon = (status: Camera['status']) => {
    switch (status) {
      case 'online': return <Video size={14} />;
      case 'offline': return <VideoOff size={14} />;
      case 'recording': return <Circle size={14} className="recording-pulse" />;
      default: return null;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`camera-feed ${isExpanded ? 'expanded' : ''}`}>
      <div className="camera-feed-header">
        <div className="camera-info">
          <h3>{camera.name}</h3>
          <div className="camera-meta">
            <span className="camera-location">
              <MapPin size={12} />
              {camera.location}
            </span>
          </div>
        </div>
        <div className="camera-actions">
          <span className={`camera-status ${getStatusColor(camera.status)}`}>
            {getStatusIcon(camera.status)}
            <span className="status-text">{camera.status}</span>
          </span>
          {isExpanded ? (
            <>
              <button className="action-btn" onClick={onExpand}>
                <Minimize2 size={16} />
              </button>
              <button className="action-btn close" onClick={onClose}>
                <X size={16} />
              </button>
            </>
          ) : (
            <button className="action-btn" onClick={onExpand}>
              <Maximize2 size={16} />
            </button>
          )}
        </div>
      </div>
      
      <div className="camera-feed-content">
        {camera.status === 'offline' ? (
          <div className="feed-placeholder offline">
            <VideoOff size={48} />
            <p>Camera Offline</p>
            <span className="last-seen">
              <Clock size={14} />
              Last seen: {formatTime(camera.lastSeen)}
            </span>
          </div>
        ) : (
          <div className="feed-placeholder active">
            <Video size={48} />
            <p>Live Feed</p>
            <span className="resolution">{camera.resolution}</span>
          </div>
        )}
      </div>
      
      <div className="camera-feed-footer">
        <span className="camera-id">ID: {camera.id}</span>
        <span className="camera-resolution">{camera.resolution}</span>
      </div>
    </div>
  );
};