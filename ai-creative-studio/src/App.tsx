import { useState } from 'react';
import { ImagePanel } from './components/ImagePanel';
import { VideoPanel } from './components/VideoPanel';
import { AudioPanel } from './components/AudioPanel';
import { VoicePanel } from './components/VoicePanel';
import { ThreeDPanel } from './components/ThreeDPanel';
import { Gallery } from './components/Gallery';
import { History } from './components/History';
import { GeneratedItem } from './types';

type Tab = 'dashboard' | 'image' | 'video' | 'audio' | 'voice' | '3d' | 'gallery' | 'history';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [generatedItems, setGeneratedItems] = useState<GeneratedItem[]>([]);

  const addToGallery = (item: GeneratedItem) => {
    setGeneratedItems(prev => [{ ...item, id: Date.now().toString() }, ...prev]);
  };

  const navItems = [
    { id: 'dashboard' as Tab, label: 'Dashboard', icon: '🏠' },
    { id: 'image' as Tab, label: 'Images', icon: '🖼️' },
    { id: 'video' as Tab, label: 'Videos', icon: '🎬' },
    { id: 'audio' as Tab, label: 'Audio', icon: '🎵' },
    { id: 'voice' as Tab, label: 'Voice', icon: '🎙️' },
    { id: '3d' as Tab, label: '3D Models', icon: '🎲' },
    { id: 'gallery' as Tab, label: 'Gallery', icon: '🖼️' },
    { id: 'history' as Tab, label: 'History', icon: '📜' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-gray-950/80 backdrop-blur-xl border-r border-gray-800 p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI Creative Studio
          </h1>
          <p className="text-gray-500 text-sm mt-1">Generate anything</p>
        </div>
        
        <nav className="space-y-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                  : 'hover:bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gray-800/50 rounded-xl p-4">
            <p className="text-xs text-gray-500">Generated Today</p>
            <p className="text-2xl font-bold text-purple-400">{generatedItems.length}</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="text-center py-12">
              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Welcome to AI Creative Studio
              </h2>
              <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                Generate stunning images, videos, audio, voice, and 3D models with the power of AI
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: '🖼️', title: 'Image Generation', desc: 'Create stunning images from text prompts', tab: 'image' as Tab },
                { icon: '🎬', title: 'Video Generation', desc: 'Generate videos with AI-powered creation', tab: 'video' as Tab },
                { icon: '🎵', title: 'Audio Generation', desc: 'Create music and sound effects', tab: 'audio' as Tab },
                { icon: '🎙️', title: 'Voice Generation', desc: 'Convert text to natural speech', tab: 'voice' as Tab },
                { icon: '🎲', title: '3D Model Generation', desc: 'Create 3D models from descriptions', tab: '3d' as Tab },
                { icon: '🖼️', title: 'Gallery', desc: 'View all your generated content', tab: 'gallery' as Tab },
              ].map(card => (
                <button
                  key={card.tab}
                  onClick={() => setActiveTab(card.tab)}
                  className="bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-purple-500 rounded-2xl p-6 text-left transition-all hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10"
                >
                  <div className="text-4xl mb-4">{card.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                  <p className="text-gray-400">{card.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'image' && <ImagePanel onGenerate={addToGallery} />}
        {activeTab === 'video' && <VideoPanel onGenerate={addToGallery} />}
        {activeTab === 'audio' && <AudioPanel onGenerate={addToGallery} />}
        {activeTab === 'voice' && <VoicePanel onGenerate={addToGallery} />}
        {activeTab === '3d' && <ThreeDPanel onGenerate={addToGallery} />}
        {activeTab === 'gallery' && <Gallery items={generatedItems} />}
        {activeTab === 'history' && <History items={generatedItems} />}
      </main>
    </div>
  );
}