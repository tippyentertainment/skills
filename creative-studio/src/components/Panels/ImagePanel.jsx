import { useState } from 'react'
import { Sparkles, Loader2 } from 'lucide-react'

const IMAGE_STYLES = [
  { id: 'realistic', label: 'Realistic' },
  { id: 'artistic', label: 'Artistic' },
  { id: 'anime', label: 'Anime' },
  { id: '3d', label: '3D Render' },
  { id: 'abstract', label: 'Abstract' },
  { id: 'minimalist', label: 'Minimalist' },
]

const IMAGE_SIZES = [
  { id: '1024x1024', label: 'Square (1024×1024)' },
  { id: '1920x1080', label: 'Landscape (1920×1080)' },
  { id: '1080x1920', label: 'Portrait (1080×1920)' },
  { id: '512x512', label: 'Small (512×512)' },
]

export function ImagePanel({ onGenerate }) {
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState('realistic')
  const [size, setSize] = useState('1024x1024')
  const [negativePrompt, setNegativePrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const result = {
      url: `https://picsum.photos/seed/${Date.now()}/1024/1024`,
      seed: Math.floor(Math.random() * 1000000),
    }
    
    onGenerate('image', { prompt, style, size, negativePrompt }, result)
    setIsLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-slide-up">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-100">Image Generation</h2>
          <p className="text-sm text-zinc-500">Create stunning images from text prompts</p>
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
            placeholder="Describe the image you want to create..."
            className="w-full h-32 bg-surface-3 border border-border rounded-xl p-4 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Negative Prompt (optional)
          </label>
          <input
            type="text"
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
            placeholder="What to avoid in the image..."
            className="w-full bg-surface-3 border border-border rounded-xl p-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Style
            </label>
            <div className="grid grid-cols-3 gap-2">
              {IMAGE_STYLES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStyle(s.id)}
                  className={`
                    px-3 py-2 rounded-lg text-sm font-medium transition-all
                    ${style === s.id 
                      ? 'bg-accent text-white' 
                      : 'bg-surface-3 text-zinc-400 hover:text-zinc-200 hover:bg-surface-4'}
                  `}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Size
            </label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full bg-surface-3 border border-border rounded-xl p-3 text-zinc-100 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            >
              {IMAGE_SIZES.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>
        
        <button
          onClick={handleGenerate}
          disabled={isLoading || !prompt.trim()}
          className="w-full py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 glow-accent"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Image
            </>
          )}
        </button>
      </div>
    </div>
  )
}