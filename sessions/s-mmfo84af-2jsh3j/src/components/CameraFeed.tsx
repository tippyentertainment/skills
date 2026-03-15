import React, { useState, useEffect } from 'react';
import FullscreenButton from './FullscreenButton';
import PTZControls from './PTZControls';

interface CameraFeedProps {
  location: string;
  feedId: string;
}

const CameraFeed: React.FC<CameraFeedProps> = ({ location, feedId }) => {
  const [timestamp, setTimestamp] = useState(new Date());
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTimestamp(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <span className="text-gray-600 text-lg font-medium">{location}</span>
      </div>
      <div className="absolute top-3 left-3 flex items-center gap-2">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        <span className="text-red-500 text-xs font-bold">LIVE</span>
      </div>
      <div className="absolute top-3 right-3 text-white text-xs font-mono bg-black/50 px-2 py-1 rounded">
        {timestamp.toLocaleTimeString()}
      </div>
      <div className="absolute bottom-3 left-3 text-cyan-400 text-sm font-medium">
        {location}
      </div>
      <FullscreenButton />
      {isHovered && <PTZControls feedId={feedId} />}
    </div>
  );
};

export default CameraFeed;