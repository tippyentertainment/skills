import { useState } from 'react';
import { GeneratedItem } from '../types';

interface Props {
  onGenerate: (item: GeneratedItem) => void;
}

export function ImagePanel({ onGenerate }: Props) {
  const [prompt, setPrompt] = useState('');
  const [width, setWidth] = useState('1024');
  const [height, setHeight] = useState('1024');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, width, height }),
      });
      const data = await res.json();
      
      if (data.error) throw new Error(data.error);
      
      setResult(data.url);
      onGenerate({
        type: 'image',
        prompt,
        url: data.url,
        timestamp: new Date(),
        metadata: { width, height },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">🖼️ Image Generation</h2>
      
      <div className="bg-gray-800/50 rounded-2xl p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to create..."
            className="w-full h-32 bg-gray-900 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Width</label>
            <select
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-white"
            >
              <option value="512">512px</option>
              <option value="1024">1024px</option>
              <option value="1920">1920px</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Height</label>
            <select
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-white"
            >
              <option value="512">512px</option>
              <option value="1024">1024px</option>
              <option value="1920">1920px</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-lg hover:from-purple-500 hover:to-pink-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Generating...' : 'Generate Image'}
        </button>

        {error && (
          <div className="bg-red-500/20 border border-red-500 rounded-xl p-4 text-red-400">
            {error}
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <img src={result} alt="Generated" className="w-full rounded-xl" />
            <a
              href={result}
              download
              className="block w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-xl text-center transition-all"
            >
              ⬇️ Download Image
            </a>
          </div>
        )}
      </div>
    </div>
  );
}