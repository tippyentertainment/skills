import { Image, Video, Music, Mic, Box, History } from 'lucide-react'

const NAV_ITEMS = [
  { id: 'image', label: 'Image', icon: Image },
  { id: 'video', label: 'Video', icon: Video },
  { id: 'audio', label: 'Audio', icon: Music },
  { id: 'voice', label: 'Voice', icon: Mic },
  { id: '3d', label: '3D Model', icon: Box },
]

export function Sidebar({ activePanel, setActivePanel }) {
  return (
    <aside className="w-20 bg-surface-2 border-r border-border flex flex-col items-center py-6 gap-2">
      <div className="mb-8">
        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center glow-accent">
          <Box className="w-6 h-6 text-white" />
        </div>
      </div>
      
      <nav className="flex flex-col gap-1 flex-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = activePanel === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => setActivePanel(item.id)}
              className={`
                w-14 h-14 rounded-xl flex flex-col items-center justify-center gap-1
                transition-all duration-200 group
                ${isActive 
                  ? 'bg-accent-muted text-accent' 
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-surface-3'}
              `}
              title={item.label}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-accent' : 'group-hover:scale-110 transition-transform'}`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>
      
      <button
        className="w-14 h-14 rounded-xl flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-surface-3 transition-all"
        title="History"
      >
        <History className="w-5 h-5" />
      </button>
    </aside>
  )
}