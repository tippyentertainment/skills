import { Image, Grid3X3, Settings, User } from 'lucide-react'

export function Header({ showGallery, setShowGallery, assetCount }) {
  return (
    <header className="h-16 bg-surface-2 border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-zinc-100">
          Generative AI Creative Studio
        </h1>
        <span className="text-xs text-zinc-500 bg-surface-3 px-2 py-1 rounded-full">
          v1.0.0
        </span>
      </div>
      
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowGallery(!showGallery)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg transition-all
            ${showGallery 
              ? 'bg-accent text-white' 
              : 'bg-surface-3 text-zinc-400 hover:text-zinc-200 hover:bg-surface-4'}
          `}
        >
          <Grid3X3 className="w-4 h-4" />
          <span className="text-sm">Gallery</span>
          {assetCount > 0 && (
            <span className="bg-surface-1 text-xs px-2 py-0.5 rounded-full">
              {assetCount}
            </span>
          )}
        </button>
        
        <button className="p-2 rounded-lg bg-surface-3 text-zinc-400 hover:text-zinc-200 hover:bg-surface-4 transition-all">
          <Settings className="w-5 h-5" />
        </button>
        
        <button className="w-9 h-9 rounded-full bg-accent flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </button>
      </div>
    </header>
  )
}