import { useState } from 'react'
import CameraGrid from './components/CameraGrid'
import FullscreenView from './components/FullscreenView'
import './index.css'

export interface Camera {
  id: string
  name: string
  location: string
  streamUrl: string
  ptz: { pan: number; tilt: number; zoom: number }
}

const cameras: Camera[] = [
  { id: 'cam1', name: 'Northern Israel', location: 'Northern Israel', streamUrl: '', ptz: { pan: 0, tilt: 0, zoom: 1 } },
  { id: 'cam2', name: 'Beirut Lebanon', location: 'Beirut, Lebanon', streamUrl: '', ptz: { pan: 0, tilt: 0, zoom: 1 } },
  { id: 'cam3', name: 'Tel Aviv', location: 'Tel Aviv, Israel', streamUrl: '', ptz: { pan: 0, tilt: 0, zoom: 1 } },
  { id: 'cam4', name: 'US Consulate Dubai', location: 'Dubai, UAE', streamUrl: '', ptz: { pan: 0, tilt: 0, zoom: 1 } },
]

function App() {
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null)

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <h1 className="text-xl font-bold">Live Camera Feed Viewer</h1>
        <p className="text-gray-400 text-sm">PTZ Webcast Control Panel</p>
      </header>
      <main className="p-4">
        <CameraGrid cameras={cameras} onSelect={setSelectedCamera} />
      </main>
      {selectedCamera && (
        <FullscreenView camera={selectedCamera} onClose={() => setSelectedCamera(null)} />
      )}
    </div>
  )
}

export default App