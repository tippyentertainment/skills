import { useState, useEffect, useRef } from 'react'
import { Camera } from '../types'
import LocationBadge from './LocationBadge'
import PTZControls from './PTZControls'
import { Minimize2 } from 'lucide-react'

interface FullscreenViewProps {
  camera: Camera
  onExit: () => void
}

function FullscreenView({ camera, onExit }: FullscreenViewProps) {
  const [ptzState, setPtzState] = useState({ pan: 0, tilt: 0, zoom: 1 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onExit()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onExit])

  const handlePTZChange = (action: string) => {
    // In a real implementation, this would send API calls to the camera
    console.log(`PTZ action: ${action} for camera ${camera.id}`)
    
    setPtzState(prev => {
      switch (action) {
        case 'pan-left':
          return { ...prev, pan: Math.max(-100, prev.pan - 10) }
        case 'pan-right':
          return { ...prev, pan: Math.min(100, prev.pan + 10) }
        case 'tilt-up':
          return { ...prev, tilt: Math.min(100, prev.tilt + 10) }
        case 'tilt-down':
          return { ...prev, tilt: Math.max(-100, prev.tilt - 10) }
        case 'zoom-in':
          return { ...prev, zoom: Math.min(10, prev.zoom + 0.5) }
        case 'zoom-out':
          return { ...prev, zoom: Math.max(1, prev.zoom - 0.5) }
        default:
          return prev
      }
    })
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden"
    >
      {/* Placeholder video feed */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-gray-600 text-center">
          <div className="text-6xl mb-4">📹</div>
          <div className="text-lg">{camera.name}</div>
          <div className="text-sm text-gray-500 mt-2">Fullscreen View</div>
        </div>
      </div>
      
      {/* Location badge */}
      <LocationBadge location={camera.location} />
      
      {/* Live indicator */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        <span className="text-sm text-white bg-black/50 px-3 py-1 rounded">LIVE</span>
      </div>
      
      {/* Exit fullscreen button */}
      <button 
        className="absolute top-4 right-4 p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors"
        onClick={onExit}
      >
        <Minimize2 className="w-5 h-5 text-white" />
      </button>
      
      {/* PTZ Controls */}
      <PTZControls onAction={handlePTZChange} />
      
      {/* PTZ State display */}
      <div className="absolute bottom-4 right-4 bg-black/70 px-3 py-2 rounded text-xs text-gray-300">
        <div>Pan: {ptzState.pan}</div>
        <div>Tilt: {ptzState.tilt}</div>
        <div>Zoom: {ptzState.zoom.toFixed(1)}x</div>
      </div>
    </div>
  )
}

export default FullscreenView