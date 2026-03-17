import { useState } from 'react';
import { Image, Sparkles, Loader2, Download, RefreshCw } from 'lucide-react';
import { GeneratedItem } from '../types';

interface ImagePanelProps {
  onGenerate: (item: GeneratedItem) => void;
  isGenerating: boolean;
  setIsGenerating: (v: boolean) => void;
}

function ImagePanel({ onGenerate, isGenerating, setIsGenerating }: ImagePanelProps) {
  const [prompt, setPrompt] = useState('');
  const [width, setWidth] = useState(1024);
  const [height, setHeight] = useState(1024);
  const [style, setStyle] = useState('realistic');
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

  const styles = ['realistic', 'anime', 'digital-art', 'oil-painting', 'watercolor', '3d-render', 'pixel-art'];

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    
    setIsGenerating(true);
    setGeneratedUrl(null);

    try {
      // Simulate API call - in production, this would call the actual AI API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Use a placeholder image service for demo
      const url = `https://picsum.photos/seed/${Date.now()}/${width}/${height}`;
      
      setGeneratedUrl(url);
      
      const newItem: GeneratedItem = {
        id: Date.now().toString(),
        type: 'image',
        prompt,
        url,
        createdAt: new Date(),
        metadata: { width, height, style }
      };
      
      onGenerate(newItem);
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!generatedUrl) return;
    const response = await fetch(generatedUrl);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-image-${Date.now()}.png`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Image size={20} className="text-white" />
          </div>
          Image Generation
        </h1>
        <p className="text-zinc-400">Create stunning images from text descriptions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the image you want to create..."
              className="w-full h-32 px-4 py-3 bg-[#1a1a25] border border-[#2a2a3a] rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Width</label>
              <select
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full px-4 py-3 bg-[#1a1a25] border border-[#2a2a3a] rounded-xl text-white focus:outline-none focus:border-purple-500"
              >
                <option value={512}>512px</option>
                <option value={768}>768px</option>
                <option value={1024}>1024px</option>
                <option value={1280}>1280px</option>
                <option value={1920}>1920px</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Height</label>
              <select
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full px-4 py-3 bg-[#1a1a25] border border-[#2a2a3a] rounded-xl text-white focus:outline-none focus:border-purple-500"
              >
                <option value={512}>512px</option>
                <option value={768}>768px</option>
                <option value={1024}>1024px</option>
                <option value={1280}>1280px</option>
                <option value={1920}>1920px</option>
              </select>
            </div>
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
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-[#1a1a25] text-zinc-400 hover:text-white border border-[#2a2a3a]'
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="w-full py-4 rounded-xl font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Generate Image
              </>
            )}
          </button>
        </div>

        {/* Preview */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white">Preview</h3>
            {generatedUrl && (
              <div className="flex gap-2">
                <button
                  onClick={handleGenerate}
                  className="p-2 rounded-lg bg-[#1a1a25] text-zinc-400 hover:text-white transition-colors"
                >
                  <RefreshCw size={18} />
                </button>
                <button
                  onClick={handleDownload}
                  className="p-2 rounded-lg bg-[#1a1a25] text-zinc-400 hover:text-white transition-colors"
                >
                  <Download size={18} />
                </button>
              </div>
            )}
          </div>
          <div className="aspect-square rounded-xl bg-[#1a1a25] border border-[#2a2a3a] overflow-hidden flex items-center justify-center">
            {isGenerating ? (
              <div className="text-center">
                <Loader2 size={48} className="animate-spin text-purple-500 mx-auto mb-4" />
                <p className="text-zinc-500">Creating your image...</p>
              </div>
            ) : generatedUrl ? (
              <img src={generatedUrl} alt="Generated" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center text-zinc-500">
                <Image size={48} className="mx-auto mb-4 opacity-50" />
                <p>Your generated image will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImagePanel;