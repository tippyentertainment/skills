import React from 'react';
import { View } from '../App';
import { Image, Video, Music, Mic, Box, Sparkles } from 'lucide-react';

interface DashboardProps {
  onNavigate: (view: View) => void;
}

const quickActions = [
  { id: 'images' as View, label: 'Generate Image', icon: <Image className="w-8 h-8" />, color: 'from-pink-500 to-rose-500' },
  { id: 'videos' as View, label: 'Generate Video', icon: <Video className="w-8 h-8" />, color: 'from-blue-500 to-cyan-500' },
  { id: 'audio' as View, label: 'Generate Audio', icon: <Music className="w-8 h-8" />, color: 'from-green-500 to-emerald-500' },
  { id: 'voice' as View, label: 'Generate Voice', icon: <Mic className="w-8 h-8" />, color: 'from-purple-500 to-violet-500' },
  { id: '3d' as View, label: 'Generate 3D', icon: <Box className="w-8 h-8" />, color: 'from-orange-500 to-amber-500' },
];

export function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="space-y-8">
      <div className="text-center py-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 mb-4">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-sm text-purple-300">AI-Powered Creation</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to AI Creative Studio</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Generate stunning images, videos, audio, voiceovers, and 3D models using state-of-the-art AI models.
          All your creations are saved locally for easy access.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={() => onNavigate(action.id)}
            className={`p-6 rounded-xl bg-gradient-to-br ${action.color} bg-opacity-10 border border-white/10
              hover:border-white/20 hover:scale-105 transition-all duration-200 group`}
          >
            <div className="text-white mb-3 group-hover:scale-110 transition-transform">{action.icon}</div>
            <h3 className="text-white font-medium">{action.label}</h3>
          </button>
        ))}
      </div>

      <div className="bg-gray-800/50 rounded-xl p-6 border border-purple-500/20">
        <h2 className="text-xl font-semibold text-white mb-4">Getting Started</h2>
        <div className="grid md:grid-cols-2 gap-4 text-gray-300">
          <div className="space-y-2">
            <p>1. Choose a generation type from the sidebar or quick actions above</p>
            <p>2. Enter your prompt describing what you want to create</p>
            <p>3. Adjust settings like size, style, or voice as needed</p>
          </div>
          <div className="space-y-2">
            <p>4. Click Generate and wait for the AI to create your content</p>
            <p>5. Preview and download your creation</p>
            <p>6. View all your creations in the Gallery</p>
          </div>
        </div>
      </div>
    </div>
  );
}