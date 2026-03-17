'use client';

import React, { useState, useCallback } from 'react';

interface Camera {
  id: string;
  name: string;
  location: string;
  streamUrl: string;
  status: 'live' | 'offline' | 'loading';
}

const cameras: Camera[] = [
  { id: 'cam-1', name: 'Northern Israel', location: 'Golan Heights', streamUrl: 'https://stream1.example.com/northern', status: 'live' },
  { id: 'cam-2', name: 'Beirut', location: 'Lebanon Coast', streamUrl: 'https://stream2.example.com/beirut', status: 'live' },
  { id: 'cam-3', name: 'Tel Aviv', location: 'Central District', streamUrl: 'https://stream3.example.com/telaviv', status: 'live' },
  { id: 'cam-4', name: 'Dubai', location: 'UAE', streamUrl: 'https://stream4.example.com/dubai', status: 'live' }
];

const PTZButton = ({ onClick, children, className = '' }: { onClick: () => void; children: React.ReactNode; className?: string }) => (
  <button onClick={onClick} className={`p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors duration-200 flex items-center justify-center ${className}`}>
    {children}
  </button>
);

const StatusIndicator = ({ status }: { status: Camera['status'] }) => {
  const colors = { live: 'bg-green-500', offline: 'bg-red-500', loading: 'bg-yellow-500 animate-pulse' };
  return <span className={`inline-block w-2 h-2 rounded-full ${colors[status]}`} />;
};

const CameraTile = ({ camera, onFullscreen }: { camera: Camera; onFullscreen: (camera: Camera) => void }) => {
  const [isControlling, setIsControlling] = useState(false);
  const handlePTZ = useCallback((action: string) => console.log(`PTZ: ${action} for ${camera.id}`), [camera.id]);

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <div className="relative aspect-video bg-gray-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-500 text-center">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">{camera.name}</p>
            <p className="text-xs text-gray-600">{camera.location}</p>
          </div>
        </div>
        <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/50 px-2 py-1 rounded text-xs text-white">
          <StatusIndicator status={camera.status} />
          <span className="capitalize">{camera.status}</span>
        </div>
        <button onClick={() => onFullscreen(camera)} className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 rounded transition-colors" title="Fullscreen">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
      </div>
      <div className="p-3 border-t border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-white">{camera.name}</span>
          <button onClick={() => setIsControlling(!isControlling)} className="text-xs text-blue-400 hover:text-blue-300">
            {isControlling ? 'Hide Controls' : 'PTZ Controls'}
          </button>
        </div>
        {isControlling && (
          <>
            <div className="grid grid-cols-3 gap-1 mt-2">
              <div></div>
              <PTZButton onClick={() => handlePTZ('pan-up')}><svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg></PTZButton>
              <div></div>
              <PTZButton onClick={() => handlePTZ('pan-left')}><svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></PTZButton>
              <PTZButton onClick={() => handlePTZ('home')} className="bg-blue-600 hover:bg-blue-500"><svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg></PTZButton>
              <PTZButton onClick={() => handlePTZ('pan-right')}><svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></PTZButton>
              <div></div>
              <PTZButton onClick={() => handlePTZ('pan-down')}><svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></PTZButton>
              <div></div>
            </div>
            <div className="flex gap-2 mt-2">
              <PTZButton onClick={() => handlePTZ('zoom-in')} className="flex-1 text-xs text-white"><span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" /></svg>Zoom In</span></PTZButton>
              <PTZButton onClick={() => handlePTZ('zoom-out')} className="flex-1 text-xs text-white"><span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" /></svg>Zoom Out</span></PTZButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const FullscreenView = ({ camera, onClose }: { camera: Camera; onClose: () => void }) => {
  const handlePTZ = useCallback((action: string) => console.log(`PTZ: ${action} for ${camera.id}`), [camera.id]);
  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      <div className="flex items-center justify-between p-4 bg-gray-900">
        <div className="flex items-center gap-3">
          <StatusIndicator status={camera.status} />
          <h2 className="text-white font-semibold">{camera.name}</h2>
          <span className="text-gray-400 text-sm">{camera.location}</span>
        </div>
        <button onClick={onClose} className="p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      <div className="flex-1 bg-gray-900 flex items-center justify-center">
        <div className="text-gray-500 text-center">
          <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
          <p className="text-xl">{camera.name}</p>
          <p className="text-gray-600">{camera.location}</p>
        </div>
      </div>
      <div className="p-4 bg-gray-900">
        <div className="max-w-md mx-auto">
          <div className="grid grid-cols-3 gap-2 mb-2">
            <div></div>
            <PTZButton onClick={() => handlePTZ('pan-up')} className="p-3"><svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg></PTZButton>
            <div></div>
            <PTZButton onClick={() => handlePTZ('pan-left')} className="p-3"><svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></PTZButton>
            <PTZButton onClick={() => handlePTZ('home')} className="p-3 bg-blue-600 hover:bg-blue-500"><svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg></PTZButton>
            <PTZButton onClick={() => handlePTZ('pan-right')} className="p-3"><svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></PTZButton>
            <div></div>
            <PTZButton onClick={() => handlePTZ('pan-down')} className="p-3"><svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></PTZButton>
            <div></div>
          </div>
          <div className="flex gap-2">
            <PTZButton onClick={() => handlePTZ('zoom-in')} className="flex-1 p-3"><span className="flex items-center justify-center gap-2 text-white"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" /></svg>Zoom In</span></PTZButton>
            <PTZButton onClick={() => handlePTZ('zoom-out')} className="flex-1 p-3"><span className="flex items-center justify-center gap-2 text-white"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" /></svg>Zoom Out</span></PTZButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CameraFeedViewer() {
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            <h1 className="text-xl font-bold">Live Camera Feed Viewer</h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <StatusIndicator status="live" />
            <span>4 Cameras Online</span>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cameras.map((camera) => <CameraTile key={camera.id} camera={camera} onFullscreen={setSelectedCamera} />)}
        </div>
      </main>
      {selectedCamera && <FullscreenView camera={selectedCamera} onClose={() => setSelectedCamera(null)} />}
    </div>
  );
}