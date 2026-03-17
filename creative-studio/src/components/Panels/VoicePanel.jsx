import { useState } from 'react'
import { Mic, Loader2 } from 'lucide-react'

const VOICES = [
  { id: 'bella', label: 'Bella (Female)' },
  { id: 'jasper', label: 'Jasper (Male)' },
  { id: 'luna', label: 'Luna (Female)' },
  { id: 'bruno', label: 'Bruno (Male)' },
  { id: 'rosie', label: 'Rosie (Female)' },
  { id: 'hugo', label: 'Hugo (Male)' },
]

const LANGUAGES = [
  { id: 'en', label: 'English' },
  { id: 'es', label: 'Spanish' },
  { id: 'fr', label: 'French' },
  { id: 'de', label: 'German' },
  { id: 'it', label: 'Italian' },
  { id: 'ja', label: 'Japanese' },
]

const SPEEDS = [
  { id: '0.5', label: '0.5x (Slow)' },
  { id: '1.0', label: '1.0x (Normal)' },
  { id: '1.5', label: '1.5x (Fast)' },
  { id: '2.0', label: '2.0x (Very Fast)' },
]

export function VoicePanel({ onGenerate }) {
  const [text, setText] = useState('')
  const [voice, setVoice] = useState('bella')
  const [language, setLanguage] = useState('en')
  const [speed, setSpeed] = useState('1.0')
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async () => {
    if (!text.trim()) return
    
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const result = {
      url: `https://example.com/voice/${Date.now()}.mp3`,
      voice,
      language,
      speed: parseFloat(speed),
      textLength: text.length,
    }
    
    onGenerate('voice', { text, voice, language, speed }, result)
    setIsLoading(false)
  }

  const characterCount = text.length
  const maxCharacters = 5000

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-slide-up">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
          <Mic className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-100">Voice Generation</h2>
          <p className="text-sm text-zinc-500">Convert text to natural speech</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-zinc-300">
              Text
            </label>
            <span className={`text-xs ${characterCount > maxCharacters ? 'text-red-400' : 'text-zinc-500'}`}>
              {characterCount}/{maxCharacters}
            </span>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter the text you want to convert to speech..."
            className="w-full h-48 bg-surface-3 border border-border rounded-xl p-4 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
          />
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Voice
            </label>
            <select
              value={voice}
              onChange={(e) => setVoice(e.target.value)}
              className="w-full bg-surface-3 border border-border rounded-xl p-3 text-zinc-100 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            >
              {VOICES.map((v) => (
                <option key={v.id} value={v.id}>{v.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-surface-3 border border-border rounded-xl p-3 text-zinc-100 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            >
              {LANGUAGES.map((l) => (
                <option key={l.id} value={l.id}>{l.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Speed
            </label>
            <select
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              className="w-full bg-surface-3 border border-border rounded-xl p-3 text-zinc-100 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            >
              {SPEEDS.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>
        
        <button
          onClick={handleGenerate}
          disabled={isLoading || !text.trim() || characterCount > maxCharacters}
          className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{ boxShadow: '0 0 20px rgba(249, 115, 22, 0.3)' }}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Voice...
            </>
          ) : (
            <>
              <Mic className="w-5 h-5" />
              Generate Voice
            </>
          )}
        </button>
      </div>
    </div>
  )
}