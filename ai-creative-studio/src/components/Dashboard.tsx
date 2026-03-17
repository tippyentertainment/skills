import { Image, Video, Music, Mic, Box, Sparkles, TrendingUp, Clock } from 'lucide-react';
import { GeneratedItem, TabType } from '../types';

interface DashboardProps {
  items: GeneratedItem[];
  onNavigate: (tab: TabType) => void;
}

function Dashboard({ items, onNavigate }: DashboardProps) {
  const stats = [
    { label: 'Images', count: items.filter(i => i.type === 'image').length, icon: <Image size={24} />, color: 'from-purple-500 to-pink-500' },
    { label: 'Videos', count: items.filter(i => i.type === 'video').length, icon: <Video size={24} />, color: 'from-cyan-500 to-blue-500' },
    { label: 'Audio', count: items.filter(i => i.type === 'audio').length, icon: <Music size={24} />, color: 'from-green-500 to-emerald-500' },
    { label: 'Voice', count: items.filter(i => i.type === 'voice').length, icon: <Mic size={24} />, color: 'from-orange-500 to-yellow-500' },
    { label: '3D Models', count: items.filter(i => i.type === '3d').length, icon: <Box size={24} />, color: 'from-pink-500 to-rose-500' },
  ];

  const quickActions = [
    { label: 'Generate Image', description: 'Create stunning visuals from text', icon: <Image size={20} />, tab: 'image' as TabType },
    { label: 'Create Video', description: 'Generate AI-powered videos', icon: <Video size={20} />, tab: 'video' as TabType },
    { label: 'Make Audio', description: 'Produce music and sound effects', icon: <Music size={20} />, tab: 'audio' as TabType },
    { label: 'Voice Over', description: 'Convert text to speech', icon: <Mic size={20} />, tab: 'voice' as TabType },
    { label: '3D Model', description: 'Generate 3D assets', icon: <Box size={20} />, tab: '3d' as TabType },
  ];

  const recentItems = items.slice(0, 6);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome to AI Creative Studio</h1>
        <p className="text-zinc-400">Generate images, videos, audio, voice, and 3D models with AI</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="glass rounded-xl p-4 glass-hover cursor-pointer transition-all">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-white">{stat.count}</div>
            <div className="text-sm text-zinc-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Sparkles size={20} className="text-purple-400" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => onNavigate(action.tab)}
              className="glass rounded-xl p-4 text-left glass-hover transition-all group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="text-purple-400 group-hover:text-purple-300 transition-colors">
                  {action.icon}
                </div>
                <span className="font-medium text-white">{action.label}</span>
              </div>
              <p className="text-sm text-zinc-500">{action.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Generations */}
      {recentItems.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Clock size={20} className="text-cyan-400" />
            Recent Generations
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {recentItems.map((item) => (
              <div key={item.id} className="glass rounded-xl overflow-hidden group cursor-pointer">
                <div className="aspect-square bg-zinc-800 relative">
                  {item.type === 'image' && item.url && (
                    <img src={item.url} alt={item.prompt} className="w-full h-full object-cover" />
                  )}
                  {(item.type === 'video' || item.type === 'audio' || item.type === 'voice') && (
                    <div className="w-full h-full flex items-center justify-center">
                      {item.type === 'video' && <Video size={32} className="text-zinc-600" />}
                      {item.type === 'audio' && <Music size={32} className="text-zinc-600" />}
                      {item.type === 'voice' && <Mic size={32} className="text-zinc-600" />}
                    </div>
                  )}
                  {item.type === '3d' && (
                    <div className="w-full h-full flex items-center justify-center">
                      <Box size={32} className="text-zinc-600" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-xs text-white bg-black/50 px-2 py-1 rounded">{item.type.toUpperCase()}</span>
                  </div>
                </div>
                <div className="p-2">
                  <p className="text-xs text-zinc-400 truncate">{item.prompt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {items.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
            <Sparkles size={40} className="text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Start Creating</h3>
          <p className="text-zinc-500 mb-6">Generate your first piece of content using the quick actions above</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;