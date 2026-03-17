import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import ImagePanel from './components/ImagePanel'
import VideoPanel from './components/VideoPanel'
import AudioPanel from './components/AudioPanel'
import VoicePanel from './components/VoicePanel'
import Model3DPanel from './components/Model3DPanel'
import Gallery from './components/Gallery'
import History from './components/History'
import Header from './components/Header'

function App() {
  const [activePanel, setActivePanel] = useState('dashboard')
  const [generatedContent, setGeneratedContent] = useState([])
  const [history, setHistory] = useState([])

  const addToGallery = (item) => {
    const newItem = {
      ...item,
      id: Date.now(),
      timestamp: new Date().toISOString()
    }
    setGeneratedContent(prev => [newItem, ...prev])
    setHistory(prev => [newItem, ...prev])
  }

  const renderPanel = () => {
    switch (activePanel) {
      case 'dashboard':
        return <Dashboard onNavigate={setActivePanel} contentCount={generatedContent.length} />
      case 'image':
        return <ImagePanel onGenerate={addToGallery} />
      case 'video':
        return <VideoPanel onGenerate={addToGallery} />
      case 'audio':
        return <AudioPanel onGenerate={addToGallery} />
      case 'voice':
        return <VoicePanel onGenerate={addToGallery} />
      case '3d':
        return <Model3DPanel onGenerate={addToGallery} />
      case 'gallery':
        return <Gallery content={generatedContent} />
      case 'history':
        return <History items={history} />
      default:
        return <Dashboard onNavigate={setActivePanel} contentCount={generatedContent.length} />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden gradient-bg">
      <Sidebar activePanel={activePanel} setActivePanel={setActivePanel} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          {renderPanel()}
        </main>
      </div>
    </div>
  )
}

export default App