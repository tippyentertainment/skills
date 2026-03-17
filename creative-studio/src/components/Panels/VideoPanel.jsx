import { useState } from 'react'
import { Film, Loader2 } from 'lucide-react'

const VIDEO_DURATIONS = [
  { id: '5', label: '5 seconds' },
  { id: '10', label: '10 seconds' },
  { id: '15', label: '15 seconds' },
  { id: '30', label: '30 seconds' },
]

const ASPECT_RATIOS = [
  { id: '16:9', label: '16:9 (Landscape)' },
  { id: '9:16', label: '9:16 (Portrait)' },
  { id: '1:1', label: '1:1 (Square)' },
  { id: '4:3', label: '4:3 (Standard)' },
]

export function VideoPanel({ onGenerate }) {
  const [prompt, setPrompt] = useState('')
  const [duration, setDuration] = useState('5')
  const [aspectRatio, setAspectRatio] = useState('16:9')
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const result = {
      url: `https://example.com/video/${Date.now()}.mp4`,
      duration: parseInt(duration),
      aspectRatio,
    }
    
    onGenerate('video', { prompt, duration, aspectRatio }, result)
    setIsLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-slide-up">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
          <Film className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-100">Video Generation</h2>
          <p className="text-sm text-zinc-500">Create AI-powered videos from text</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Prompt
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the video scene you want to create..."
            className="w-full h-32 bg-surface-3 border border-border rounded-xl p-4 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-surface-3 border border-border rounded-xl p-3 text-zinc-100 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            >
              {VIDEO_DURATIONS.map((d) => (
                <option key={d.id} value={d.id}>{d.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Aspect Ratio
            </label>
            <select
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value)}
              className="w-full bg-surface-3 border border-border rounded-xl p-3 text-zinc-100 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            >
              {ASPECT_RATIOS.map((r) => (
                <option key={r.id} value={r.id}>{r.label}</option>
              ))}
            </select>
          </div>
        </div>
        
        <button
          onClick={handleGenerate}
          disabled={isLoading || !prompt.trim()}
          className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{ boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)' }}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Video...
            </>
          ) : (
            <>
              <Film className="w-5 h-5" />
              Generate Video
            </>
          )}
        </button>
      </div>
    </div>
  )
}