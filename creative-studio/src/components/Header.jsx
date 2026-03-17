import React from 'react'
import { Bell, Settings, User } from 'lucide-react'

function Header() {
  return (
    <header className="glass-dark border-b border-white/10 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-display font-semibold text-white">Generative AI Studio</h2>
          <p className="text-sm text-gray-400">Create stunning content with AI</p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search generations..."
              className="w-64 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-violet-500/50 transition-colors"
            />
          </div>

          {/* Actions */}
          <button className="relative p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <Bell className="w-5 h-5 text-gray-400" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-pink-500" />
          </button>
          
          <button className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <Settings className="w-5 h-5 text-gray-400" />
          </button>

          {/* User */}
          <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-white">Creator</p>
              <p className="text-xs text-gray-400">Pro Plan</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header