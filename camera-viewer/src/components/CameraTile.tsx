import { Camera } from '../types'
import LocationBadge from './LocationBadge'
import { Maximize2 } from 'lucide-react'

interface CameraTileProps {
  camera: Camera
  onClick: () => void
}

function CameraTile({ camera, onClick }: CameraTileProps) {
  return (
    <div 
      className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      {/* Placeholder video feed */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-gray-600 text-center">
          <div className="text-4xl mb-2">📹</div>
          <div className="text-sm">Live Feed</div>
          <div className="text-xs text-gray-500 mt-1">{camera.name}</div>
        </div>
      </div>
      
      {/* Location badge */}
      <LocationBadge location={camera.location} />
      
      {/* Fullscreen button */}
      <button 
        className="absolute top-2 right-2 p-2 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
      >
        <Maximize2 className="w-4 h-4 text-white" />
      </button>
      
      {/* Live indicator */}
      <div className="absolute top-2 left-2 flex items-center gap-1">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        <span className="text-xs text-white bg-black/50 px-2 py-0.5 rounded">LIVE</span>
      </div>
    </div>
  )
}

export default CameraTile