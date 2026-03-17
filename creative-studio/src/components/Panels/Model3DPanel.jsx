import { useState } from 'react'
import { Box, Loader2 } from 'lucide-react'

const MODEL_STYLES = [
  { id: 'realistic', label: 'Realistic' },
  { id: 'lowpoly', label: 'Low Poly' },
  { id: 'stylized', label: 'Stylized' },
  { id: 'cartoon', label: 'Cartoon' },
  { id: 'scifi', label: 'Sci-Fi' },
]

export function Model3DPanel({ onGenerate }) {
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState('realistic')
  const [isLoading, setIsLoading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 4000))
    
    const result = {
      url: `https://example.com/models/${Date.now()}.glb`,
      format: 'glb',
      style,
    }
    
    setPreviewUrl(result.url)
    onGenerate('3d', { prompt, style }, result)
    setIsLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-slide-up">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
          <Box className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-100">3D Model Generation</h2>
          <p className="text-sm text-zinc-500">Create 3D models from text prompts</p>
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
            placeholder="Describe the 3D model you want to create..."
            className="w-full h-32 bg-surface-3 border border-border rounded-xl p-4 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Style
          </label>
          <div className="grid grid-cols-5 gap-2">
            {MODEL_STYLES.map((s) => (
              <button
                key={s.id}
                onClick={() => setStyle(s.id)}
                className={`
                  px-3 py-2 rounded-lg text-sm font-medium transition-all
                  ${style === s.id 
                    ? 'bg-pink-500 text-white' 
                    : 'bg-surface-3 text-zinc-400 hover:text-zinc-200 hover:bg-surface-4'}
                `}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
        
        {previewUrl && (
          <div className="bg-surface-3 border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-zinc-300">Preview</span>
              <a 
                href={previewUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-accent hover:text-accent-hover"
              >
                Download .glb
              </a>
            </div>
            <div className="w-full h-48 bg-surface-2 rounded-lg flex items-center justify-center">
              <Box className="w-16 h-16 text-zinc-600" />
            </div>
          </div>
        )}
        
        <button
          onClick={handleGenerate}
          disabled={isLoading || !prompt.trim()}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{ boxShadow: '0 0 20px rgba(236, 72, 153, 0.3)' }}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating 3D Model...
            </>
          ) : (
            <>
              <Box className="w-5 h-5" />
              Generate 3D Model
            </>
          )}
        </button>
      </div>
    </div>
  )
}