import { Image, Video, Music, Mic, Box, Download } from 'lucide-react'

const TYPE_ICONS = {
  image: Image,
  video: Video,
  audio: Music,
  voice: Mic,
  '3d': Box,
}

const TYPE_COLORS = {
  image: 'from-violet-500 to-fuchsia-500',
  video: 'from-cyan-500 to-blue-500',
  audio: 'from-emerald-500 to-teal-500',
  voice: 'from-orange-500 to-amber-500',
  '3d': 'from-pink-500 to-rose-500',
}

export function AssetCard({ asset }) {
  const Icon = TYPE_ICONS[asset.type] || Image
  const colorClass = TYPE_COLORS[asset.type] || 'from-violet-500 to-fuchsia-500'
  
  const timestamp = new Date(asset.timestamp).toLocaleTimeString()
  
  return (
    <div className="bg-surface-3 border border-border rounded-xl overflow-hidden group">
      <div className="aspect-square bg-surface-2 relative">
        {asset.type === 'image' && asset.result?.url && (
          <img 
            src={asset.result.url} 
            alt={asset.params.prompt}
            className="w-full h-full object-cover"
          />
        )}
        {(asset.type === 'video' || asset.type === 'audio' || asset.type === 'voice' || asset.type === '3d') && (
          <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${colorClass}`}>
            <Icon className="w-12 h-12 text-white opacity-50" />
          </div>
        )}
        
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 bg-surface-1/80 backdrop-blur-sm rounded-lg text-white hover:bg-surface-1 transition-all">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-6 h-6 rounded-md bg-gradient-to-br ${colorClass} flex items-center justify-center`}>
            <Icon className="w-3 h-3 text-white" />
          </div>
          <span className="text-xs font-medium text-zinc-300 capitalize">{asset.type}</span>
          <span className="text-xs text-zinc-500 ml-auto">{timestamp}</span>
        </div>
        
        <p className="text-xs text-zinc-400 line-clamp-2">
          {asset.params.prompt || asset.params.text || 'Generated asset'}
        </p>
      </div>
    </div>
  )
}