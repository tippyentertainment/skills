import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ZoomIn, ZoomOut } from 'lucide-react'

interface PTZControlsProps {
  onAction: (action: string) => void
}

function PTZControls({ onAction }: PTZControlsProps) {
  return (
    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
      {/* Pan/Tilt controls */}
      <div className="relative w-32 h-32">
        {/* Up */}
        <button
          className="absolute top-0 left-1/2 transform -translate-x-1/2 p-2 bg-black/50 rounded-lg hover:bg-accent transition-colors"
          onClick={() => onAction('tilt-up')}
          title="Tilt Up"
        >
          <ArrowUp className="w-5 h-5 text-white" />
        </button>
        
        {/* Down */}
        <button
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 p-2 bg-black/50 rounded-lg hover:bg-accent transition-colors"
          onClick={() => onAction('tilt-down')}
          title="Tilt Down"
        >
          <ArrowDown className="w-5 h-5 text-white" />
        </button>
        
        {/* Left */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 rounded-lg hover:bg-accent transition-colors"
          onClick={() => onAction('pan-left')}
          title="Pan Left"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        
        {/* Right */}
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 rounded-lg hover:bg-accent transition-colors"
          onClick={() => onAction('pan-right')}
          title="Pan Right"
        >
          <ArrowRight className="w-5 h-5 text-white" />
        </button>
      </div>
      
      {/* Zoom controls */}
      <div className="flex justify-center gap-2 mt-2">
        <button
          className="p-2 bg-black/50 rounded-lg hover:bg-accent transition-colors"
          onClick={() => onAction('zoom-out')}
          title="Zoom Out"
        >
          <ZoomOut className="w-5 h-5 text-white" />
        </button>
        <button
          className="p-2 bg-black/50 rounded-lg hover:bg-accent transition-colors"
          onClick={() => onAction('zoom-in')}
          title="Zoom In"
        >
          <ZoomIn className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  )
}

export default PTZControls