import { useState } from 'react';
import { GeneratedItem } from '../types';

interface Props {
  onGenerate: (item: GeneratedItem) => void;
}

export function VoicePanel({ onGenerate }: Props) {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('alloy');
  const [speed, setSpeed] = useState('1.0');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch('/api/generate-voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice, speed }),
      });
      const data = await res.json();
      
      if (data.error) throw new Error(data.error);
      
      setResult(data.url);
      onGenerate({
        type: 'voice',
        prompt: text.substring(0, 50) + '...',
        url: data.url,
        timestamp: new Date(),
        metadata: { voice, speed },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setLoading(false);
    }
  };

  const voices = ['alloy', 'nova', 'fable', 'onyx', 'shimmer'];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">🎙️ Voice Generation</h2>
      
      <div className="bg-gray-800/50 rounded-2xl p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Text to Speak</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter the text you want to convert to speech..."
            className="w-full h-32 bg-gray-900 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Voice</label>
            <select
              value={voice}
              onChange={(e) => setVoice(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-white"
            >
              {voices.map(v => (
                <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Speed</label>
            <select
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-white"
            >
              <option value="0.5">0.5x (Slow)</option>
              <option value="1.0">1.0x (Normal)</option>
              <option value="1.5">1.5x (Fast)</option>
              <option value="2.0">2.0x (Very Fast)</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !text.trim()}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-lg hover:from-purple-500 hover:to-pink-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Generating...' : 'Generate Voice'}
        </button>

        {error && (
          <div className="bg-red-500/20 border border-red-500 rounded-xl p-4 text-red-400">
            {error}
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <audio src={result} controls className="w-full" />
            <a
              href={result}
              download
              className="block w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-xl text-center transition-all"
            >
              ⬇️ Download Audio
            </a>
          </div>
        )}
      </div>
    </div>
  );
}