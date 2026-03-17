import { useState } from 'react';
import { Mic, Sparkles, Loader2, Download, Play } from 'lucide-react';
import { GeneratedItem } from '../types';

interface VoicePanelProps {
  onGenerate: (item: GeneratedItem) => void;
  isGenerating: boolean;
  setIsGenerating: (v: boolean) => void;
}

function VoicePanel({ onGenerate, isGenerating, setIsGenerating }: VoicePanelProps) {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('alloy');
  const [speed, setSpeed] = useState(1);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

  const voices = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'];

  const handleGenerate = async () => {
    if (!text.trim() || isGenerating) return;
    
    setIsGenerating(true);
    setGeneratedUrl(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Demo placeholder
      const url = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
      setGeneratedUrl(url);
      
      const newItem: GeneratedItem = {
        id: Date.now().toString(),
        type: 'voice',
        prompt: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
        url,
        createdAt: new Date(),
        metadata: { voice, speed, textLength: text.length }
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
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
            <Mic size={20} className="text-white" />
          </div>
          Voice Generation
        </h1>
        <p className="text-zinc-400">Convert text to natural-sounding speech</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Text to Speak</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter the text you want to convert to speech..."
              className="w-full h-40 px-4 py-3 bg-[#1a1a25] border border-[#2a2a3a] rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors resize-none"
            />
            <p className="text-xs text-zinc-500 mt-1">{text.length} characters</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Voice</label>
              <select
                value={voice}
                onChange={(e) => setVoice(e.target.value)}
                className="w-full px-4 py-3 bg-[#1a1a25] border border-[#2a2a3a] rounded-xl text-white focus:outline-none focus:border-orange-500"
              >
                {voices.map((v) => <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Speed: {speed}x</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!text.trim() || isGenerating}
            className="w-full py-4 rounded-xl font-medium text-white bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <><Loader2 size={20} className="animate-spin" /> Generating...</>
            ) : (
              <><Sparkles size={20} /> Generate Voice</>
            )}
          </button>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white">Preview</h3>
            {generatedUrl && (
              <button className="p-2 rounded-lg bg-[#1a1a25] text-zinc-400 hover:text-white transition-colors">
                <Download size={18} />
              </button>
            )}
          </div>
          <div className="aspect-square rounded-xl bg-[#1a1a25] border border-[#2a2a3a] overflow-hidden flex items-center justify-center">
            {isGenerating ? (
              <div className="text-center">
                <Loader2 size={48} className="animate-spin text-orange-500 mx-auto mb-4" />
                <p className="text-zinc-500">Creating your voice...</p>
              </div>
            ) : generatedUrl ? (
              <div className="w-full p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
                    <Mic size={48} className="text-white" />
                  </div>
                </div>
                <audio src={generatedUrl} controls className="w-full" />
              </div>
            ) : (
              <div className="text-center text-zinc-500">
                <Mic size={48} className="mx-auto mb-4 opacity-50" />
                <p>Your generated voice will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoicePanel;