import { useState } from 'react';
import { LayoutDashboard, Image, Video, Music, Mic, Box, ImageIcon, History, Sparkles, Zap, ChevronRight } from 'lucide-react';
import { TabType, GeneratedItem } from './types';
import Dashboard from './components/Dashboard';
import ImagePanel from './components/ImagePanel';
import VideoPanel from './components/VideoPanel';
import AudioPanel from './components/AudioPanel';
import VoicePanel from './components/VoicePanel';
import Model3DPanel from './components/Model3DPanel';
import Gallery from './components/Gallery';
import HistoryView from './components/HistoryView';

const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { id: 'image', label: 'Images', icon: <Image size={20} /> },
  { id: 'video', label: 'Videos', icon: <Video size={20} /> },
  { id: 'audio', label: 'Audio', icon: <Music size={20} /> },
  { id: 'voice', label: 'Voice', icon: <Mic size={20} /> },
  { id: '3d', label: '3D Models', icon: <Box size={20} /> },
  { id: 'gallery', label: 'Gallery', icon: <ImageIcon size={20} /> },
  { id: 'history', label: 'History', icon: <History size={20} /> },
];

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [items, setItems] = useState<GeneratedItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAddItem = (item: GeneratedItem) => setItems(prev => [item, ...prev]);
  const handleDeleteItem = (id: string) => setItems(prev => prev.filter(item => item.id !== id));
  const handleDownload = async (url: string, filename: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(blobUrl);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard items={items} onNavigate={setActiveTab} />;
      case 'image': return <ImagePanel onGenerate={handleAddItem} isGenerating={isGenerating} setIsGenerating={setIsGenerating} />;
      case 'video': return <VideoPanel onGenerate={handleAddItem} isGenerating={isGenerating} setIsGenerating={setIsGenerating} />;
      case 'audio': return <AudioPanel onGenerate={handleAddItem} isGenerating={isGenerating} setIsGenerating={setIsGenerating} />;
      case 'voice': return <VoicePanel onGenerate={handleAddItem} isGenerating={isGenerating} setIsGenerating={setIsGenerating} />;
      case '3d': return <Model3DPanel onGenerate={handleAddItem} isGenerating={isGenerating} setIsGenerating={setIsGenerating} />;
      case 'gallery': return <Gallery items={items} onDelete={handleDeleteItem} onDownload={handleDownload} />;
      case 'history': return <HistoryView items={items} onDownload={handleDownload} />;
      default: return <Dashboard items={items} onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      <aside className="w-64 border-r border-[#2a2a3a] bg-[#12121a] flex flex-col">
        <div className="p-6 border-b border-[#2a2a3a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-white">AI Studio</h1>
              <p className="text-xs text-zinc-500">Creative Suite</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === tab.id ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white border border-purple-500/30' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
              {tab.icon}
              <span className="font-medium">{tab.label}</span>
              {activeTab === tab.id && <ChevronRight size={16} className="ml-auto" />}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-[#2a2a3a]">
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={16} className="text-yellow-400" />
              <span className="text-sm font-medium text-white">Credits</span>
            </div>
            <div className="text-2xl font-bold text-white">∞</div>
            <p className="text-xs text-zinc-500">Unlimited generations</p>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-hidden"><div className="h-full overflow-y-auto scrollbar-thin">{renderContent()}</div></main>
    </div>
  );
}

export default App;