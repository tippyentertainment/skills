import { useState } from 'react'
import { Sidebar } from './components/Dashboard/Sidebar'
import { Header } from './components/Dashboard/Header'
import { DashboardLayout } from './components/Dashboard/DashboardLayout'
import { ImagePanel } from './components/Panels/ImagePanel'
import { VideoPanel } from './components/Panels/VideoPanel'
import { AudioPanel } from './components/Panels/AudioPanel'
import { VoicePanel } from './components/Panels/VoicePanel'
import { Model3DPanel } from './components/Panels/Model3DPanel'
import { GalleryGrid } from './components/Gallery/GalleryGrid'
import { HistorySidebar } from './components/History/HistorySidebar'

const PANELS = {
  image: ImagePanel,
  video: VideoPanel,
  audio: AudioPanel,
  voice: VoicePanel,
  '3d': Model3DPanel,
}

export default function App() {
  const [activePanel, setActivePanel] = useState('image')
  const [generatedAssets, setGeneratedAssets] = useState([])
  const [history, setHistory] = useState([])
  const [showGallery, setShowGallery] = useState(false)

  const handleGenerate = (type, params, result) => {
    const asset = {
      id: Date.now(),
      type,
      params,
      result,
      timestamp: new Date().toISOString(),
    }
    setGeneratedAssets(prev => [asset, ...prev])
    setHistory(prev => [asset, ...prev])
  }

  const ActivePanelComponent = PANELS[activePanel]

  return (
    <div className="flex h-screen overflow-hidden bg-surface-1">
      <div className="grain-overlay" />
      
      <Sidebar activePanel={activePanel} setActivePanel={setActivePanel} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          showGallery={showGallery} 
          setShowGallery={setShowGallery}
          assetCount={generatedAssets.length}
        />
        
        <DashboardLayout>
          <div className="flex-1 overflow-auto p-6">
            <ActivePanelComponent onGenerate={handleGenerate} />
          </div>
          
          {showGallery && (
            <div className="w-80 border-l border-border overflow-auto">
              <GalleryGrid 
                assets={generatedAssets} 
                onClose={() => setShowGallery(false)}
              />
            </div>
          )}
        </DashboardLayout>
      </div>
      
      <HistorySidebar history={history} />
    </div>
  )
}