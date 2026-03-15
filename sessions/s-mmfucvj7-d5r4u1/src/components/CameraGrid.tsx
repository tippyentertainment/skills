import { useState } from 'react'
import { Camera } from '../App'
import PTZControls from './PTZControls'

interface Props {
  cameras: Camera[]
  onSelect: (camera: Camera) => void
}

export default function CameraGrid({ cameras, onSelect }: Props) {
  const [ptzStates, setPtzStates] = useState<Record<string, { pan: number; tilt: number; zoom: number }>>(() => {
    const initial: Record<string, { pan: number; tilt: number; zoom: number }> = {}
    cameras.forEach(cam => { initial[cam.id] = { pan: 0, tilt: 0, zoom: 1 } })
    return initial
  })

  const handlePTZ = (cameraId: string, action: 'pan' | 'tilt' | 'zoom', value: number) => {
    setPtzStates(prev => ({
      ...prev,
      [cameraId]: { ...prev[cameraId], [action]: value }
    }))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {cameras.map(camera => (
        <div key={camera.id} className="relative bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
          <div 
            className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center cursor-pointer"
            onClick={() => onSelect(camera)}
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gray-600 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-400 text-sm">{camera.name}</p>
              <p className="text-gray-500 text-xs">{camera.location}</p>
            </div>
          </div>
          <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded text-sm font-medium">
            {camera.name}
          </div>
          <div className="absolute top-2 right-2 flex items-center gap-1">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            <span className="text-xs text-red-400">LIVE</span>
          </div>
          <PTZControls 
            ptzState={ptzStates[camera.id]}
            onPTZ={(action, value) => handlePTZ(camera.id, action, value)}
          />
          <button
            onClick={() => onSelect(camera)}
            className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm font-medium transition-colors"
          >
            Fullscreen
          </button>
        </div>
      ))}
    </div>
  )
}