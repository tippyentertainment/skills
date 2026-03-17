import { X, Download, Trash2 } from 'lucide-react'
import { AssetCard } from './AssetCard'

export function GalleryGrid({ assets, onClose }) {
  if (assets.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-zinc-500 text-sm">No assets generated yet</p>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-semibold text-zinc-100">Gallery</h3>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-surface-3 text-zinc-400 hover:text-zinc-200 transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {assets.map((asset) => (
          <AssetCard key={asset.id} asset={asset} />
        ))}
      </div>
    </div>
  )
}