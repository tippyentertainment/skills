import { useState } from 'react';
import { Box, Sparkles, Loader2, Download, RotateCcw } from 'lucide-react';
import { GeneratedItem } from '../types';

interface Model3DPanelProps {
  onGenerate: (item: GeneratedItem) => void;
  isGenerating: boolean;
  setIsGenerating: (v: boolean) => void;
}

function Model3DPanel({ onGenerate, isGenerating, setIsGenerating }: Model3DPanelProps) {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('realistic');
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

  const styles = ['realistic', 'low-poly', 'cartoon', 'sci-fi', 'fantasy', 'minimalist'];

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    
    setIsGenerating(true);
    setGeneratedUrl(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 3500));
      // Demo placeholder - in production, call actual 3D generation API
      const url = 'https://modelviewer.dev/shared-assets/models/Astronaut.glb';
      setGeneratedUrl(url);
      
      const newItem: GeneratedItem = {
        id: Date.now().toString(),
        type: '3d',
        prompt,
        url,
        createdAt: new Date(),
        metadata: { style }
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
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
            <Box size={20} className="text-white" />
          </div>
          3D Model Generation
        </h1>
        <p className="text-zinc-400">Create 3D models from text descriptions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the 3D model you want to create..."
              className="w-full h-32 px-4 py-3 bg-[#1a1a25] border border-[#2a2a3a] rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500 transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Style</label>
            <div className="flex flex-wrap gap-2">
              {styles.map((s) => (
                <button
                  key={s}
                  onClick={() => setStyle(s)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    style === s
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                      : 'bg-[#1a1a25] text-zinc-400 hover:text-white border border-[#2a2a3a]'
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="w-full py-4 rounded-xl font-medium text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <><Loader2 size={20} className="animate-spin" /> Generating...</>
            ) : (
              <><Sparkles size={20} /> Generate 3D Model</>
            )}
          </button>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white">Preview</h3>
            {generatedUrl && (
              <div className="flex gap-2">
                <button className="p-2 rounded-lg bg-[#1a1a25] text-zinc-400 hover:text-white transition-colors">
                  <RotateCcw size={18} />
                </button>
                <button className="p-2 rounded-lg bg-[#1a1a25] text-zinc-400 hover:text-white transition-colors">
                  <Download size={18} />
                </button>
              </div>
            )}
          </div>
          <div className="aspect-square rounded-xl bg-[#1a1a25] border border-[#2a2a3a] overflow-hidden flex items-center justify-center">
            {isGenerating ? (
              <div className="text-center">
                <Loader2 size={48} className="animate-spin text-pink-500 mx-auto mb-4" />
                <p className="text-zinc-500">Creating your 3D model...</p>
              </div>
            ) : generatedUrl ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center">
                    <Box size={64} className="text-pink-400" />
                  </div>
                  <p className="text-white font-medium mb-1">3D Model Ready</p>
                  <p className="text-sm text-zinc-500">Click to download .glb file</p>
                </div>
              </div>
            ) : (
              <div className="text-center text-zinc-500">
                <Box size={48} className="mx-auto mb-4 opacity-50" />
                <p>Your generated 3D model will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Model3DPanel;