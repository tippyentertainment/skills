import { useState, useEffect } from 'react';
import type { Camera } from '../types/camera';

export function useCameras() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulated camera data - replace with actual API endpoint
    const mockCameras: Camera[] = [
      {
        id: 'cam-1',
        name: 'Front Entrance',
        location: 'Building A - Main Entrance',
        streamUrl: 'https://example.com/stream/cam1',
        status: 'online',
        lastSeen: new Date(),
        resolution: '1920x1080'
      },
      {
        id: 'cam-2',
        name: 'Parking Lot A',
        location: 'Building A - North Parking',
        streamUrl: 'https://example.com/stream/cam2',
        status: 'online',
        lastSeen: new Date(),
        resolution: '1920x1080'
      },
      {
        id: 'cam-3',
        name: 'Server Room',
        location: 'Building B - Floor 2',
        streamUrl: 'https://example.com/stream/cam3',
        status: 'recording',
        lastSeen: new Date(),
        resolution: '4K'
      },
      {
        id: 'cam-4',
        name: 'Loading Dock',
        location: 'Building A - Rear',
        streamUrl: 'https://example.com/stream/cam4',
        status: 'offline',
        lastSeen: new Date(Date.now() - 3600000),
        resolution: '1280x720'
      },
      {
        id: 'cam-5',
        name: 'Conference Room',
        location: 'Building B - Floor 3',
        streamUrl: 'https://example.com/stream/cam5',
        status: 'online',
        lastSeen: new Date(),
        resolution: '1920x1080'
      },
      {
        id: 'cam-6',
        name: 'Reception',
        location: 'Building A - Lobby',
        streamUrl: 'https://example.com/stream/cam6',
        status: 'online',
        lastSeen: new Date(),
        resolution: '1920x1080'
      }
    ];

    setTimeout(() => {
      setCameras(mockCameras);
      setLoading(false);
    }, 500);
  }, []);

  const refreshCameras = async () => {
    setLoading(true);
    // Add API call here
    setTimeout(() => setLoading(false), 1000);
  };

  return { cameras, loading, error, refreshCameras };
}