import React from 'react'
import { Image, Video, Music, Mic, Box, Sparkles, TrendingUp, Clock, Zap } from 'lucide-react'

const stats = [
  { label: 'Total Generations', value: '0', change: '+0%', icon: Sparkles },
  { label: 'Images Created', value: '0', change: '+0%', icon: Image },
  { label: 'Videos Created', value: '0', change: '+0%', icon: Video },
  { label: 'Audio Files', value: '0', change: '+0%', icon: Music },
]

const quickActions = [
  { id: 'image', label: 'Generate Image', description: 'Create stunning visuals from text', icon: Image, color: 'from-violet-500 to-purple-600' },
  { id: 'video', label: 'Generate Video', description: 'Create AI-powered videos', icon: Video, color: 'from-pink-500 to-rose-600' },
  { id: 'audio', label: 'Generate Audio', description: 'Create music and sound effects', icon: Music, color: 'from-cyan-500 to-blue-600' },
  { id: 'voice', label: 'Generate Voice', description: 'Text-to-speech narration', icon: Mic, color: 'from-emerald-500 to-teal-600' },
  { id: '3d', label: 'Generate 3D Model', description: 'Create 3D assets from text', icon: Box, color: 'from-amber-500 to-orange-600' },
]

function Dashboard({ onNavigate, contentCount }) {
  return (
    <div className="space-y-8 panel-enter">
      {/* Welcome Section */}
      <div className="glass rounded-2xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold gradient-text">Welcome to Creative Studio</h1>
            <p className="text-gray-400 mt-1">Generate images, videos, audio, voice, and 3D models with AI</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="glass-dark rounded-xl p-4 hover:border-violet-500/30 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <Icon className="w-5 h-5 text-violet-400" />
                  <span className="text-xs text-emerald-400">{stat.change}</span>
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-display font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <button
                key={action.id}
                onClick={() => onNavigate(action.id)}
                className="glass rounded-xl p-6 text-left hover:border-violet-500/30 transition-all group btn-glow"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-1">{action.label}</h3>
                <p className="text-sm text-gray-400">{action.description}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-display font-semibold text-white">Recent Activity</h2>
          <button 
            onClick={() => onNavigate('history')}
            className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
          >
            View All
          </button>
        </div>
        
        {contentCount === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-gray-500" />
            </div>
            <p className="text-gray-400">No generations yet</p>
            <p className="text-sm text-gray-500 mt-1">Start creating by choosing a generation type above</p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-gray-400">{contentCount} items in your gallery</p>
          </div>
        )}
      </div>

      {/* Tips Section */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">Pro Tips</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Use detailed prompts for better image generation results</li>
              <li>• Combine multiple generation types for rich multimedia content</li>
              <li>• Check the gallery to download and manage your creations</li>
              <li>• History tracks all your generations for easy reference</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard