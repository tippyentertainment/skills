import { useState } from 'react'
import CameraGrid from './components/CameraGrid'
import FullscreenView from './components/FullscreenView'
import { Camera } from './types'

const cameras: Camera[] = [
  { id: '1', name: 'Northern Israel', location: 'Northern Israel', streamUrl: 'https://example.com/stream1' },
  { id: '2', name: 'Beirut, Lebanon', location: 'Beirut, Lebanon', streamUrl: 'https://example.com/stream2' },
  { id: '3', name: 'Tel Aviv', location: 'Tel Aviv, Israel', streamUrl: 'https://example.com/stream3' },
  { id: '4', name: 'US Consulate Dubai', location: 'Dubai, UAE', streamUrl: 'https://example.com/stream4' },
]

function App() {
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleCameraSelect = (camera: Camera) => {
    setSelectedCamera(camera)
    setIsFullscreen(true)
  }

  const handleExitFullscreen = () => {
    setIsFullscreen(false)
    setSelectedCamera(null)
  }

  return (
    <div className="min-h-screen bg-background text-white">
      <header className="p-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-accent">Camera Webcast Viewer</h1>
        <p className="text-gray-400 text-sm">Live feeds from 4 locations</p>
      </header>
      
      <main className="p-4">
        {isFullscreen && selectedCamera ? (
          <FullscreenView 
            camera={selectedCamera}
            onExit={handleExitFullscreen}
          />
        ) : (
          <CameraGrid 
            cameras={cameras}
            onCameraSelect={handleCameraSelect}
          />
        )}
      </main>
    </div>
  )
}

export default App