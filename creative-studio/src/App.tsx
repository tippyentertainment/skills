import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ImageGenerator from './components/ImageGenerator';
import VideoGenerator from './components/VideoGenerator';
import AudioGenerator from './components/AudioGenerator';
import VoiceGenerator from './components/VoiceGenerator';
import Model3DGenerator from './components/Model3DGenerator';
import Gallery from './components/Gallery';
import History from './components/History';

export default function App() {
  const [activeTab, setActiveTab] = useState('images');
  const [gallery, setGallery] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const savedGallery = localStorage.getItem('creative-studio-gallery');
    const savedHistory = localStorage.getItem('creative-studio-history');
    if (savedGallery) setGallery(JSON.parse(savedGallery));
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  useEffect(() => {
    localStorage.setItem('creative-studio-gallery', JSON.stringify(gallery));
    localStorage.setItem('creative-studio-history', JSON.stringify(history));
  }, [gallery, history]);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent mb-6">
            Generative AI Creative Studio
          </h1>
          {activeTab === 'images' && <ImageGenerator gallery={gallery} setGallery={setGallery} history={history} setHistory={setHistory} />}
          {activeTab === 'videos' && <VideoGenerator gallery={gallery} setGallery={setGallery} history={history} setHistory={setHistory} />}
          {activeTab === 'audio' && <AudioGenerator gallery={gallery} setGallery={setGallery} history={history} setHistory={setHistory} />}
          {activeTab === 'voice' && <VoiceGenerator gallery={gallery} setGallery={setGallery} history={history} setHistory={setHistory} />}
          {activeTab === '3d' && <Model3DGenerator gallery={gallery} setGallery={setGallery} history={history} setHistory={setHistory} />}
          {activeTab === 'gallery' && <Gallery gallery={gallery} setGallery={setGallery} />}
          {activeTab === 'history' && <History history={history} setHistory={setHistory} />}
        </div>
      </main>
    </div>
  );
}