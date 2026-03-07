import { GeneratedItem } from '../types';

interface Props {
  items: GeneratedItem[];
}

export function History({ items }: Props) {
  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">📜 History</h2>
        <div className="bg-gray-800/50 rounded-2xl p-12 text-center">
          <p className="text-gray-400">No history yet. Your generations will appear here.</p>
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
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">📜 History</h2>
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="bg-gray-800/50 rounded-xl p-4 flex items-center gap-4">
            <div className="text-3xl">{typeIcons[item.type]}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</span>
                <span className="text-xs text-gray-500">
                  {new Date(item.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-1">{item.prompt}</p>
            </div>
            <a
              href={item.url}
              download
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm transition-all"
            >
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}