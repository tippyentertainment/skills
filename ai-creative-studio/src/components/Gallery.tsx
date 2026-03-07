import { GeneratedItem } from '../types';

interface Props {
  items: GeneratedItem[];
}

export function Gallery({ items }: Props) {
  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">🖼️ Gallery</h2>
        <div className="bg-gray-800/50 rounded-2xl p-12 text-center">
          <p className="text-gray-400">No generated content yet. Start creating!</p>
        </div>
      </div>
    );
  }

  const typeIcons = {
    image: '🖼️',
    video: '🎬',
    audio: '🎵',
    voice: '🎙️',
    '3d': '🎲',
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">🖼️ Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <div key={item.id} className="bg-gray-800/50 rounded-2xl overflow-hidden">
            <div className="aspect-square bg-gray-900 flex items-center justify-center">
              {item.type === 'image' && <img src={item.url} alt="" className="w-full h-full object-cover" />}
              {item.type === 'video' && (
                <video src={item.url} className="w-full h-full object-cover" />
              )}
              {(item.type === 'audio' || item.type === 'voice') && (
                <div className="text-6xl">🎵</div>
              )}
              {item.type === '3d' && (
                <div className="text-6xl">🎲</div>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span>{typeIcons[item.type]}</span>
                <span className="text-sm text-gray-400">{item.type.toUpperCase()}</span>
              </div>
              <p className="text-sm text-gray-300 line-clamp-2">{item.prompt}</p>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(item.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}