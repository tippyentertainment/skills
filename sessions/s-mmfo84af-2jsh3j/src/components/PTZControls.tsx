import React, { useState } from 'react';

interface PTZControlsProps {
  feedId: string;
}

const PTZControls: React.FC<PTZControlsProps> = ({ feedId }) => {
  const [zoom, setZoom] = useState(1);
  const [preset, setPreset] = useState('');
  const presets = ['Home', 'Entrance', 'Parking', 'Perimeter'];

  return (
    <div className="absolute bottom-12 right-3 bg-black/80 rounded-lg p-2 flex flex-col gap-2">
      <div className="flex gap-1">
        <button onClick={() => console.log('Pan left', feedId)} className="w-8 h-8 bg-gray-700 hover:bg-cyan-600 rounded text-white text-sm">←</button>
        <button onClick={() => console.log('Pan right', feedId)} className="w-8 h-8 bg-gray-700 hover:bg-cyan-600 rounded text-white text-sm">→</button>
      </div>
      <div className="flex gap-1">
        <button onClick={() => console.log('Tilt up', feedId)} className="w-8 h-8 bg-gray-700 hover:bg-cyan-600 rounded text-white text-sm">↑</button>
        <button onClick={() => console.log('Tilt down', feedId)} className="w-8 h-8 bg-gray-700 hover:bg-cyan-600 rounded text-white text-sm">↓</button>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-white text-xs">Zoom:</span>
        <input type="range" min="1" max="10" value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="w-20 accent-cyan-500" />
        <span className="text-cyan-400 text-xs">{zoom}x</span>
      </div>
      <select value={preset} onChange={(e) => setPreset(e.target.value)} className="bg-gray-700 text-white text-xs rounded px-2 py-1">
        <option value="">Presets</option>
        {presets.map((p) => (<option key={p} value={p}>{p}</option>))}
      </select>
    </div>
  );
};

export default PTZControls;