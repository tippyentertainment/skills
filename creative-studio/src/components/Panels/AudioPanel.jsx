import { useState } from 'react'
import { Music, Loader2 } from 'lucide-react'

const AUDIO_TYPES = [
  { id: 'music', label: 'Music' },
  { id: 'sfx', label: 'Sound Effect' },
]

const MUSIC_GENRES = [
  { id: 'electronic', label: 'Electronic' },
  { id: 'ambient', label: 'Ambient' },
  { id: 'orchestral', label: 'Orchestral' },
  { id: 'jazz', label: 'Jazz' },
  { id: 'rock', label: 'Rock' },
  { id: 'hiphop', label: 'Hip-Hop' },
]

const MOODS = [
  { id: 'happy', label: 'Happy' },
  { id: 'sad', label: 'Sad' },
  { id: 'energetic', label: 'Energetic' },
  { id: 'calm', label: 'Calm' },
  { id: 'dramatic', label: 'Dramatic' },
  { id: 'mysterious', label: 'Mysterious' },
]

const DURATIONS = [
  { id: '15', label: '15 seconds' },
  { id: '30', label: '30 seconds' },
  { id: '60', label: '1 minute' },
  { id: '120', label: '2 minutes' },
]

export function AudioPanel({ onGenerate }) {
  const [prompt, setPrompt] = useState('')
  const [type, setType] = useState('music')
  const [genre, setGenre] = useState('electronic')
  const [mood, setMood] = useState('calm')
  const [duration, setDuration] = useState('30')
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2500))
    
    const result = {
      url: `https://example.com/audio/${Date.now()}.mp3`,
      duration: parseInt(duration),
      type,
      genre,
      mood,
    }
    
    onGenerate('audio', { prompt, type, genre, mood, duration }, result)
    setIsLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-slide-up">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
          <Music className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-100">Audio Generation</h2>
          <p className="text-sm text-zinc-500">Create music and sound effects from text</p>
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
            placeholder="Describe the audio you want to create..."
            className="w-full h-32 bg-surface-3 border border-border rounded-xl p-4 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Type
          </label>
          <div className="flex gap-2">
            {AUDIO_TYPES.map((t) => (
              <button
                key={t.id}
                onClick={() => setType(t.id)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${type === t.id 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-surface-3 text-zinc-400 hover:text-zinc-200 hover:bg-surface-4'}
                `}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        
        {type === 'music' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Genre
              </label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full bg-surface-3 border border-border rounded-xl p-3 text-zinc-100 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              >
                {MUSIC_GENRES.map((g) => (
                  <option key={g.id} value={g.id}>{g.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Mood
              </label>
              <select
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full bg-surface-3 border border-border rounded-xl p-3 text-zinc-100 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              >
                {MOODS.map((m) => (
                  <option key={m.id} value={m.id}>{m.label}</option>
                ))}
              </select>
            </div>
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Duration
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full bg-surface-3 border border-border rounded-xl p-3 text-zinc-100 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
          >
            {DURATIONS.map((d) => (
              <option key={d.id} value={d.id}>{d.label}</option>
            ))}
          </select>
        </div>
        
        <button
          onClick={handleGenerate}
          disabled={isLoading || !prompt.trim()}
          className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{ boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)' }}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Audio...
            </>
          ) : (
            <>
              <Music className="w-5 h-5" />
              Generate Audio
            </>
          )}
        </button>
      </div>
    </div>
  )
}