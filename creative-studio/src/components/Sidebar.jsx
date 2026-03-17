import React from 'react'
import { 
  LayoutDashboard, 
  Image, 
  Video, 
  Music, 
  Mic, 
  Box, 
  FolderOpen, 
  History,
  Sparkles
} from 'lucide-react'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'image', label: 'Images', icon: Image },
  { id: 'video', label: 'Videos', icon: Video },
  { id: 'audio', label: 'Audio', icon: Music },
  { id: 'voice', label: 'Voice', icon: Mic },
  { id: '3d', label: '3D Models', icon: Box },
  { id: 'gallery', label: 'Gallery', icon: FolderOpen },
  { id: 'history', label: 'History', icon: History },
]

function Sidebar({ activePanel, setActivePanel }) {
  return (
    <aside className="w-64 glass-dark border-r border-white/10 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg gradient-text">Creative Studio</h1>
            <p className="text-xs text-gray-400">AI-Powered Generation</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activePanel === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActivePanel(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-gradient-to-r from-violet-500/20 to-pink-500/20 border border-violet-500/30 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-violet-400' : ''}`} />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400" />
              )}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <div className="glass rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-2">Generation Credits</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold gradient-text">∞</span>
            <span className="text-xs text-gray-500">Unlimited</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar