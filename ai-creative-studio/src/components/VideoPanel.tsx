import { useState } from 'react';
import { Video, Sparkles, Loader2, Download, Play, Pause } from 'lucide-react';
import { GeneratedItem } from '../types';

interface VideoPanelProps {
  onGenerate: (item: GeneratedItem) => void;
  isGenerating: boolean;
  setIsGenerating: (v: boolean) => void;
}

function VideoPanel({ onGenerate, isGenerating, setIsGenerating }: VideoPanelProps) {
  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState(5);
  const [resolution, setResolution] = useState('1280x720');
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const resolutions = ['640x480', '1280x720', '1920x1080'];

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    
    setIsGenerating(true);
    setGeneratedUrl(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      // Demo placeholder - in production, call actual video generation API
      const url = `https://www.w3schools.com/html/mov_bbb.mp4`;
      setGeneratedUrl(url);
      
      const newItem: GeneratedItem = {
        id: Date.now().toString(),
        type: 'video',
        prompt,
        url,
        createdAt: new Date(),
        metadata: { duration, resolution }
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
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
            <Video size={20} className="text-white" />
          </div>
          Video Generation
        </h1>
        <p className="text-zinc-400">Create AI-powered videos from text descriptions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the video you want to create..."
              className="w-full h-32 px-4 py-3 bg-[#1a1a25] border border-[#2a2a3a] rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Duration (seconds)</label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full px-4 py-3 bg-[#1a1a25] border border-[#2a2a3a] rounded-xl text-white focus:outline-none focus:border-cyan-500"
              >
                <option value={3}>3 seconds</option>
                <option value={5}>5 seconds</option>
                <option value={10}>10 seconds</option>
                <option value={15}>15 seconds</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Resolution</label>
              <select
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
                className="w-full px-4 py-3 bg-[#1a1a25] border border-[#2a2a3a] rounded-xl text-white focus:outline-none focus:border-cyan-500"
              >
                {resolutions.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="w-full py-4 rounded-xl font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <><Loader2 size={20} className="animate-spin" /> Generating...</>
            ) : (
              <><Sparkles size={20} /> Generate Video</>
            )}
          </button>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white">Preview</h3>
            {generatedUrl && (
              <button onClick={handleGenerate} className="p-2 rounded-lg bg-[#1a1a25] text-zinc-400 hover:text-white transition-colors">
                <Download size={18} />
              </button>
            )}
          </div>
          <div className="aspect-video rounded-xl bg-[#1a1a25] border border-[#2a2a3a] overflow-hidden flex items-center justify-center">
            {isGenerating ? (
              <div className="text-center">
                <Loader2 size={48} className="animate-spin text-cyan-500 mx-auto mb-4" />
                <p className="text-zinc-500">Creating your video...</p>
              </div>
            ) : generatedUrl ? (
              <video src={generatedUrl} controls className="w-full h-full" />
            ) : (
              <div className="text-center text-zinc-500">
                <Video size={48} className="mx-auto mb-4 opacity-50" />
                <p>Your generated video will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPanel;