import React from 'react';
import { View } from '../App';
import { Home, Image, Video, Music, Mic, Box, Grid, Clock } from 'lucide-react';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

const navItems: { id: View; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
  { id: 'images', label: 'Images', icon: <Image className="w-5 h-5" /> },
  { id: 'videos', label: 'Videos', icon: <Video className="w-5 h-5" /> },
  { id: 'audio', label: 'Audio', icon: <Music className="w-5 h-5" /> },
  { id: 'voice', label: 'Voice', icon: <Mic className="w-5 h-5" /> },
  { id: '3d', label: '3D Models', icon: <Box className="w-5 h-5" /> },
  { id: 'gallery', label: 'Gallery', icon: <Grid className="w-5 h-5" /> },
  { id: 'history', label: 'History', icon: <Clock className="w-5 h-5" /> },
];

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-gray-900/50 backdrop-blur-xl border-r border-purple-500/20 flex flex-col">
      <div className="p-6 border-b border-purple-500/20">
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          AI Creative Studio
        </h1>
        <p className="text-xs text-gray-400 mt-1">Generative AI Platform</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
              ${currentView === item.id 
                ? 'bg-gradient-to-r from-purple-600/30 to-blue-600/30 text-white border border-purple-500/30' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-purple-500/20">
        <div className="text-xs text-gray-500 text-center">Powered by TaskingBot AI</div>
      </div>
    </aside>
  );
}