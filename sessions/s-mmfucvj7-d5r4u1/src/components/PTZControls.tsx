interface Props {
  ptzState: { pan: number; tilt: number; zoom: number }
  onPTZ: (action: 'pan' | 'tilt' | 'zoom', value: number) => void
}

export default function PTZControls({ ptzState, onPTZ }: Props) {
  return (
    <div className="absolute bottom-2 left-2 bg-black/70 rounded-lg p-2">
      <div className="grid grid-cols-3 gap-1 mb-2">
        <div></div>
        <button 
          onClick={() => onPTZ('tilt', Math.min(ptzState.tilt + 10, 90))}
          className="w-8 h-8 bg-gray-600 hover:bg-gray-500 rounded flex items-center justify-center"
        >▲</button>
        <div></div>
        <button 
          onClick={() => onPTZ('pan', Math.max(ptzState.pan - 10, -180))}
          className="w-8 h-8 bg-gray-600 hover:bg-gray-500 rounded flex items-center justify-center"
        >◀</button>
        <button 
          onClick={() => { onPTZ('pan', 0); onPTZ('tilt', 0); }}
          className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded flex items-center justify-center text-xs"
        >⌂</button>
        <button 
          onClick={() => onPTZ('pan', Math.min(ptzState.pan + 10, 180))}
          className="w-8 h-8 bg-gray-600 hover:bg-gray-500 rounded flex items-center justify-center"
        >▶</button>
        <div></div>
        <button 
          onClick={() => onPTZ('tilt', Math.max(ptzState.tilt - 10, -90))}
          className="w-8 h-8 bg-gray-600 hover:bg-gray-500 rounded flex items-center justify-center"
        >▼</button>
        <div></div>
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={() => onPTZ('zoom', Math.max(ptzState.zoom - 0.2, 1))}
          className="w-8 h-8 bg-gray-600 hover:bg-gray-500 rounded text-sm"
        >−</button>
        <div className="text-xs text-gray-300 w-16 text-center">
          {ptzState.zoom.toFixed(1)}x
        </div>
        <button 
          onClick={() => onPTZ('zoom', Math.min(ptzState.zoom + 0.2, 10))}
          className="w-8 h-8 bg-gray-600 hover:bg-gray-500 rounded text-sm"
        >+</button>
      </div>
    </div>
  )
}