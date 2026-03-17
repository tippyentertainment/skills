import { Image, Video, Music, Mic, Box, Download, Clock } from 'lucide-react';
import { GeneratedItem } from '../types';

interface HistoryViewProps {
  items: GeneratedItem[];
  onDownload: (url: string, filename: string) => void;
}

function HistoryView({ items, onDownload }: HistoryViewProps) {
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

  // Group items by date
  const groupedItems = items.reduce((groups, item) => {
    const date = new Date(item.createdAt).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {} as Record<string, GeneratedItem[]>);

  if (items.length === 0) {
    return (
      <div className="p-8">
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
            <Clock size={40} className="text-purple-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">No History</h2>
          <p className="text-zinc-500">Your generation history will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-6">Generation History</h1>

      <div className="space-y-8">
        {Object.entries(groupedItems).map(([date, dateItems]) => (
          <div key={date}>
            <h2 className="text-lg font-medium text-zinc-400 mb-4">{date}</h2>
            <div className="space-y-2">
              {dateItems.map((item) => (
                <div key={item.id} className="glass rounded-xl p-4 flex items-center gap-4 hover:border-purple-500/30 transition-colors">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getTypeColor(item.type)} flex items-center justify-center flex-shrink-0`}>
                    {getTypeIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white truncate">{item.prompt}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-zinc-500">{item.type.toUpperCase()}</span>
                      <span className="text-xs text-zinc-500">
                        {new Date(item.createdAt).toLocaleTimeString()}
                      </span>
                      {item.metadata && (
                        <>
                          {item.metadata.width && item.metadata.height && (
                            <span className="text-xs text-zinc-500">
                              {item.metadata.width}x{item.metadata.height}
                            </span>
                          )}
                          {item.metadata.duration && (
                            <span className="text-xs text-zinc-500">
                              {item.metadata.duration}s
                            </span>
                          )}
                          {item.metadata.voice && (
                            <span className="text-xs text-zinc-500">
                              Voice: {item.metadata.voice}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => onDownload(item.url, `${item.type}-${item.id}.${item.type === 'image' ? 'png' : 'mp4'}`)}
                    className="p-2 rounded-lg bg-[#1a1a25] text-zinc-400 hover:text-white transition-colors"
                  >
                    <Download size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-8 border-t border-[#2a2a3a]">
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-medium text-white mb-4">Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['image', 'video', 'audio', 'voice', '3d'].map((type) => {
              const count = items.filter(i => i.type === type).length;
              return (
                <div key={type} className="text-center">
                  <div className={`w-12 h-12 mx-auto mb-2 rounded-lg bg-gradient-to-br ${getTypeColor(type as GeneratedItem['type'])} flex items-center justify-center`}>
                    {getTypeIcon(type as GeneratedItem['type'])}
                  </div>
                  <div className="text-2xl font-bold text-white">{count}</div>
                  <div className="text-xs text-zinc-500">{type.charAt(0).toUpperCase() + type.slice(1)}s</div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-[#2a2a3a] text-center">
            <div className="text-3xl font-bold text-white">{items.length}</div>
            <div className="text-sm text-zinc-500">Total Generations</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryView;