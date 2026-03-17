import { Image, Video, Music, Mic, Box, Download, Trash2, Grid, List } from 'lucide-react';
import { useState } from 'react';
import { GeneratedItem } from '../types';

interface GalleryProps {
  items: GeneratedItem[];
  onDelete: (id: string) => void;
  onDownload: (url: string, filename: string) => void;
}

function Gallery({ items, onDelete, onDownload }: GalleryProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<'all' | 'image' | 'video' | 'audio' | 'voice' | '3d'>('all');

  const filteredItems = filter === 'all' ? items : items.filter(item => item.type === filter);

  const getTypeIcon = (type: GeneratedItem['type']) => {
    switch (type) {
      case 'image': return <Image size={16} />;
      case 'video': return <Video size={16} />;
      case 'audio': return <Music size={16} />;
      case 'voice': return <Mic size={16} />;
      case '3d': return <Box size={16} />;
    }
  };

  const getTypeColor = (type: GeneratedItem['type']) => {
    switch (type) {
      case 'image': return 'from-purple-500 to-pink-500';
      case 'video': return 'from-cyan-500 to-blue-500';
      case 'audio': return 'from-green-500 to-emerald-500';
      case 'voice': return 'from-orange-500 to-yellow-500';
      case '3d': return 'from-pink-500 to-rose-500';
    }
  };

  if (items.length === 0) {
    return (
      <div className="p-8">
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
            <Grid size={40} className="text-purple-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">No Content Yet</h2>
          <p className="text-zinc-500">Generate some content to see it here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Gallery</h1>
        <div className="flex items-center gap-4">
          <div className="flex bg-[#1a1a25] rounded-lg p-1">
            {(['all', 'image', 'video', 'audio', 'voice', '3d'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                  filter === f ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex bg-[#1a1a25] rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white'}`}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white'}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="glass rounded-xl overflow-hidden group">
              <div className="aspect-square bg-[#1a1a25] relative">
                {item.type === 'image' && item.url && (
                  <img src={item.url} alt={item.prompt} className="w-full h-full object-cover" />
                )}
                {(item.type === 'video' || item.type === 'audio' || item.type === 'voice') && (
                  <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${getTypeColor(item.type)}`}>
                    {getTypeIcon(item.type)}
                  </div>
                )}
                {item.type === '3d' && (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-500/20 to-rose-500/20">
                    <Box size={32} className="text-pink-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => onDownload(item.url, `${item.type}-${item.id}.${item.type === 'image' ? 'png' : 'mp4'}`)}
                    className="p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors"
                  >
                    <Download size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`p-1 rounded bg-gradient-to-br ${getTypeColor(item.type)}`}>
                    {getTypeIcon(item.type)}
                  </div>
                  <span className="text-xs text-zinc-500">{item.type.toUpperCase()}</span>
                </div>
                <p className="text-sm text-white truncate">{item.prompt}</p>
                <p className="text-xs text-zinc-500 mt-1">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredItems.map((item) => (
            <div key={item.id} className="glass rounded-xl p-4 flex items-center gap-4 group">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getTypeColor(item.type)} flex items-center justify-center flex-shrink-0`}>
                {getTypeIcon(item.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white truncate">{item.prompt}</p>
                <p className="text-xs text-zinc-500">{item.type.toUpperCase()} • {new Date(item.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onDownload(item.url, `${item.type}-${item.id}.${item.type === 'image' ? 'png' : 'mp4'}`)}
                  className="p-2 rounded-lg bg-[#1a1a25] text-zinc-400 hover:text-white transition-colors"
                >
                  <Download size={18} />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="p-2 rounded-lg bg-[#1a1a25] text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;