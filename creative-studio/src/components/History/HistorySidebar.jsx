import { History, Image, Video, Music, Mic, Box } from 'lucide-react'

const TYPE_ICONS = {
  image: Image,
  video: Video,
  audio: Music,
  voice: Mic,
  '3d': Box,
}

const TYPE_COLORS = {
  image: 'text-violet-400',
  video: 'text-cyan-400',
  audio: 'text-emerald-400',
  voice: 'text-orange-400',
  '3d': 'text-pink-400',
}

export function HistorySidebar({ history }) {
  if (history.length === 0) {
    return (
      <aside className="w-64 bg-surface-2 border-l border-border p-4">
        <div className="flex items-center gap-2 mb-4">
          <History className="w-5 h-5 text-zinc-500" />
          <h3 className="font-semibold text-zinc-400">History</h3>
        </div>
        <p className="text-sm text-zinc-600">No history yet</p>
      </aside>
    )
  }

  return (
    <aside className="w-64 bg-surface-2 border-l border-border overflow-hidden flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-zinc-500" />
          <h3 className="font-semibold text-zinc-300">History</h3>
          <span className="text-xs text-zinc-500 ml-auto">{history.length}</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        {history.map((item) => {
          const Icon = TYPE_ICONS[item.type]
          const colorClass = TYPE_COLORS[item.type]
          const timestamp = new Date(item.timestamp).toLocaleTimeString()
          
          return (
            <div 
              key={item.id}
              className="p-3 border-b border-border hover:bg-surface-3 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-4 h-4 ${colorClass}`} />
                <span className="text-sm font-medium text-zinc-300 capitalize">{item.type}</span>
                <span className="text-xs text-zinc-600 ml-auto">{timestamp}</span>
              </div>
              <p className="text-xs text-zinc-500 line-clamp-1">
                {item.params.prompt || item.params.text || 'Generated'}
              </p>
            </div>
          )
        })}
      </div>
    </aside>
  )
}