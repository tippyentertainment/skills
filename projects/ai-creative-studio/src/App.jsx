import { useState } from 'react'
import { Image, Video, Music, Mic, Box, History, Sparkles, Download, Trash2, RefreshCw, ChevronRight, Settings, Zap } from 'lucide-react'

const GENERATION_TYPES = [
  { id: 'image', name: 'Image', icon: Image, color: 'accent-primary' },
  { id: 'video', name: 'Video', icon: Video, color: 'accent-secondary' },
  { id: 'audio', name: 'Audio', icon: Music, color: 'accent-tertiary' },
  { id: 'voice', name: 'Voice', icon: Mic, color: 'accent-primary' },
  { id: '3d', name: '3D Model', icon: Box, color: 'accent-secondary' },
]

function App() {
  const [activeTab, setActiveTab] = useState('image')
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [gallery, setGallery] = useState([])
  const [history, setHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    setIsGenerating(true)
    const type = GENERATION_TYPES.find(t => t.id === activeTab)
    setTimeout(() => {
      const newItem = { id: Date.now(), type: activeTab, prompt, timestamp: new Date().toISOString(), url: `https://picsum.photos/seed/${Date.now()}/512/512`, status: 'completed' }
      setGallery(prev => [newItem, ...prev])
      setHistory(prev => [newItem, ...prev])
      setPrompt('')
      setIsGenerating(false)
    }, 2000)
  }

  const handleDownload = (item) => {
    const link = document.createElement('a')
    link.href = item.url
    link.download = `${item.type}-${item.id}.png`
    link.click()
  }

  const handleDelete = (id) => setGallery(prev => prev.filter(item => item.id !== id))

  const activeType = GENERATION_TYPES.find(t => t.id === activeTab)

  return (
    <div className="min-h-screen bg-dark-900 flex">
      <aside className="w-64 bg-dark-800 border-r border-dark-600 p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <Sparkles className="w-8 h-8 text-accent-primary" />
          <h1 className="text-xl font-bold text-white">AI Studio</h1>
        </div>
        <nav className="flex-1">
          <h2 className="text-xs uppercase text-gray-500 mb-2">Generate</h2>
          <ul className="space-y-1">
            {GENERATION_TYPES.map(type => (
              <li key={type.id}>
                <button onClick={() => setActiveTab(type.id)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${activeTab === type.id ? 'bg-accent-primary/20 text-accent-primary' : 'text-gray-400 hover:bg-dark-700 hover:text-white'}`}>
                  <type.icon className="w-5 h-5" />
                  <span>{type.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-dark-600 pt-4">
          <button onClick={() => setShowHistory(!showHistory)} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-dark-700 hover:text-white transition-all">
            <History className="w-5 h-5" />
            <span>History</span>
            <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${showHistory ? 'rotate-90' : ''}`} />
          </button>
        </div>
      </aside>
      <main className="flex-1 flex flex-col">
        <header className="bg-dark-800 border-b border-dark-600 p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <activeType.icon className="w-5 h-5 text-accent-primary" />
            {activeType.name} Generation
          </h2>
          <button className="p-2 rounded-lg hover:bg-dark-700 text-gray-400 hover:text-white transition-all">
            <Settings className="w-5 h-5" />
          </button>
        </header>
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <div className="bg-dark-800 rounded-xl p-6 mb-6">
              <label className="block text-sm text-gray-400 mb-2">Enter your prompt</label>
              <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder={`Describe the ${activeType.name.toLowerCase()} you want to create...`} className="w-full bg-dark-700 border border-dark-600 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-accent-primary resize-none" rows={4} />
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Zap className="w-4 h-4 text-accent-tertiary" />
                  <span>Powered by AI</span>
                </div>
                <button onClick={handleGenerate} disabled={!prompt.trim() || isGenerating} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${prompt.trim() && !isGenerating ? 'bg-accent-primary hover:bg-accent-primary/80 text-white' : 'bg-dark-600 text-gray-500 cursor-not-allowed'}`}>
                  {isGenerating ? (<><RefreshCw className="w-5 h-5 animate-spin" /><span>Generating...</span></>) : (<><Sparkles className="w-5 h-5" /><span>Generate</span></>)}
                </button>
              </div>
            </div>
            <div className="bg-dark-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Generations</h3>
              {gallery.filter(item => item.type === activeTab).length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <activeType.icon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No generations yet. Create your first {activeType.name.toLowerCase()}!</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {gallery.filter(item => item.type === activeTab).map(item => (
                    <div key={item.id} className="group relative bg-dark-700 rounded-lg overflow-hidden">
                      <img src={item.url} alt={item.prompt} className="w-full aspect-square object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <p className="text-xs text-gray-300 truncate">{item.prompt}</p>
                          <div className="flex gap-2 mt-2">
                            <button onClick={() => handleDownload(item)} className="flex-1 flex items-center justify-center gap-1 bg-accent-primary/80 hover:bg-accent-primary text-white text-xs py-2 rounded transition-all"><Download className="w-3 h-3" />Download</button>
                            <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded transition-all"><Trash2 className="w-3 h-3" /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      {showHistory && (
        <aside className="w-80 bg-dark-800 border-l border-dark-600 p-4 overflow-auto">
          <h3 className="text-lg font-semibold text-white mb-4">History</h3>
          {history.length === 0 ? (<p className="text-gray-500 text-sm">No history yet</p>) : (
            <ul className="space-y-2">
              {history.map(item => {
                const type = GENERATION_TYPES.find(t => t.id === item.type)
                return (
                  <li key={item.id} className="bg-dark-700 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <type.icon className="w-4 h-4 text-accent-primary" />
                      <span className="text-sm font-medium text-white">{type.name}</span>
                    </div>
                    <p className="text-xs text-gray-400 truncate">{item.prompt}</p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(item.timestamp).toLocaleString()}</p>
                  </li>
                )
              })}
            </ul>
          )}
        </aside>
      )}
    </div>
  )
}

export default App