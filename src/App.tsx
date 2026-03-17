import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ImageGenerator } from './components/ImageGenerator';
import { VideoGenerator } from './components/VideoGenerator';
import { AudioGenerator } from './components/AudioGenerator';
import { VoiceGenerator } from './components/VoiceGenerator';
import { Model3DGenerator } from './components/Model3DGenerator';
import { Gallery } from './components/Gallery';
import { History } from './components/History';

export type View = 'dashboard' | 'images' | 'videos' | 'audio' | 'voice' | '3d' | 'gallery' | 'history';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard onNavigate={setCurrentView} />;
      case 'images': return <ImageGenerator />;
      case 'videos': return <VideoGenerator />;
      case 'audio': return <AudioGenerator />;
      case 'voice': return <VoiceGenerator />;
      case '3d': return <Model3DGenerator />;
      case 'gallery': return <Gallery />;
      case 'history': return <History />;
      default: return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 p-6 overflow-auto">{renderView()}</main>
    </div>
  );
}