import React from 'react';
import type { Camera, CameraGridProps } from '../types/camera';
import { CameraFeed } from './CameraFeed';

export const CameraGrid: React.FC<CameraGridProps> = ({ 
  cameras, 
  selectedCamera, 
  onSelectCamera,
  layout 
}) => {
  return (
    <div className={`camera-grid ${layout}`}>
      {cameras.map((camera) => (
        <CameraFeed
          key={camera.id}
          camera={camera}
          isExpanded={selectedCamera?.id === camera.id}
          onExpand={() => onSelectCamera(camera)}
          onClose={() => onSelectCamera(null as any)}
        />
      ))}
    </div>
  );
};