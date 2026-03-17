import { useState } from 'react';
import { Music, Sparkles, Loader2, Download, Play, Pause } from 'lucide-react';
import { GeneratedItem } from '../types';

interface AudioPanelProps {
  onGenerate: (item: GeneratedItem) => void;
  isGenerating: boolean;
  setIsGenerating: (v: boolean) => void;
}

function AudioPanel({ onGenerate, isGenerating, setIsGenerating }: AudioPanelProps) {
  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState(30);
  const [genre, setGenre] = useState('electronic');
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

  const genres = ['electronic', 'ambient', 'classical', 'jazz', 'rock', 'hip-hop', 'lo-fi', 'cinematic'];

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    
    setIsGenerating(true);
    setGeneratedUrl(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      // Demo placeholder
      const url = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
      setGeneratedUrl(url);
      
      const newItem: GeneratedItem = {
        id: Date.now().toString(),
        type: 'audio',
        prompt,
        url,
        createdAt: new Date(),
        metadata: { duration, genre }
      };
      
      onGenerate(newItem);
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
            <Music size={20} className="text-white" />
          </div>
          Audio Generation
        </h1>
        <p className="text-zinc-400">Create music and sound effects from text descriptions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the audio you want to create..."
              className="w-full h-32 px-4 py-3 bg-[#1a1a25] border border-[#2a2a3a] rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-green-500 transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Duration (seconds)</label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full px-4 py-3 bg-[#1a1a25] border border-[#2a2a3a] rounded-xl text-white focus:outline-none focus:border-green-500"
              >
                <option value={10}>10 seconds</option>
                <option value={30}>30 seconds</option>
                <option value={60}>1 minute</option>
                <option value={120}>2 minutes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Genre</label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full px-4 py-3 bg-[#1a1a25] border border-[#2a2a3a] rounded-xl text-white focus:outline-none focus:border-green-500"
              >
                {genres.map((g) => <option key={g} value={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</option>)}
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="w-full py-4 rounded-xl font-medium text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <><Loader2 size={20} className="animate-spin" /> Generating...</>
            ) : (
              <><Sparkles size={20} /> Generate Audio</>
            )}
          </button>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white">Preview</h3>
            {generatedUrl && (
              <button onClick={() => {}} className="p-2 rounded-lg bg-[#1a1a25] text-zinc-400 hover:text-white transition-colors">
                <Download size={18} />
              </button>
            )}
          </div>
          <div className="aspect-square rounded-xl bg-[#1a1a25] border border-[#2a2a3a] overflow-hidden flex items-center justify-center">
            {isGenerating ? (
              <div className="text-center">
                <Loader2 size={48} className="animate-spin text-green-500 mx-auto mb-4" />
                <p className="text-zinc-500">Creating your audio...</p>
              </div>
            ) : generatedUrl ? (
              <div className="w-full p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                    <Music size={48} className="text-white" />
                  </div>
                </div>
                <audio src={generatedUrl} controls className="w-full" />
              </div>
            ) : (
              <div className="text-center text-zinc-500">
                <Music size={48} className="mx-auto mb-4 opacity-50" />
                <p>Your generated audio will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AudioPanel;