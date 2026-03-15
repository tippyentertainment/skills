import React from 'react';
import CameraFeed from './CameraFeed';

const CameraGrid: React.FC = () => {
  const cameras = [
    { id: 'cam-1', location: 'Northern Israel' },
    { id: 'cam-2', location: 'Beirut, Lebanon' },
    { id: 'cam-3', location: 'Tel Aviv' },
    { id: 'cam-4', location: 'US Consulate Dubai' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {cameras.map((camera) => (
        <CameraFeed key={camera.id} feedId={camera.id} location={camera.location} />
      ))}
    </div>
  );
};

export default CameraGrid;