import { useState } from 'react'
import { Camera } from '../App'
import PTZControls from './PTZControls'

interface Props {
  camera: Camera
  onClose: () => void
}

export default function FullscreenView({ camera, onClose }: Props) {
  const [ptzState, setPtzState] = useState({ pan: 0, tilt: 0, zoom: 1 })

  const handlePTZ = (action: 'pan' | 'tilt' | 'zoom', value: number) => {
    setPtzState(prev => ({ ...prev, [action]: value }))
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 bg-gray-900/80">
        <div>
          <h2 className="text-xl font-bold">{camera.name}</h2>
          <p className="text-gray-400 text-sm">{camera.location}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            <span className="text-red-400 font-medium">LIVE</span>
          </div>
          <button 
            onClick={onClose}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-medium transition-colors"
          >Exit Fullscreen</button>
        </div>
      </div>
      <div className="flex-1 relative bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-700 flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-gray-400 text-lg">{camera.name}</p>
          <p className="text-gray-500">{camera.location}</p>
        </div>
        <div className="absolute bottom-8 left-8 bg-black/80 rounded-xl p-4">
          <PTZControls ptzState={ptzState} onPTZ={handlePTZ} />
        </div>
        <div className="absolute bottom-8 right-8 bg-black/80 rounded-lg p-4">
          <div className="text-sm space-y-1">
            <div className="flex justify-between gap-8">
              <span className="text-gray-400">Pan:</span>
              <span className="font-mono">{ptzState.pan}°</span>
            </div>
            <div className="flex justify-between gap-8">
              <span className="text-gray-400">Tilt:</span>
              <span className="font-mono">{ptzState.tilt}°</span>
            </div>
            <div className="flex justify-between gap-8">
              <span className="text-gray-400">Zoom:</span>
              <span className="font-mono">{ptzState.zoom.toFixed(1)}x</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}