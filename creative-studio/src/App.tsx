import React, { useState } from 'react';
import { Image, Video, Music, Mic, Box, History, Sparkles } from 'lucide-react';

export type GenerationType = 'image' | 'video' | 'audio' | 'voice' | '3d';

export interface GenerationResult {
  id: string;
  type: GenerationType;
  prompt: string;
  result: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export default function App() {
  const [activePanel, setActivePanel] = useState<GenerationType>('image');
  const [history, setHistory] = useState<GenerationResult[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const addToHistory = (result: GenerationResult) => {
    setHistory(prev => [result, ...prev].slice(0, 50));
  };

  const panels = [
    { id: 'image' as const, label: 'Images', icon: Image },
    { id: 'video' as const, label: 'Videos', icon: Video },
    { id: 'audio' as const, label: 'Audio', icon: Music },
    { id: 'voice' as const, label: 'Voice', icon: Mic },
    { id: '3d' as const, label: '3D Models', icon: Box },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900/80 border-r border-white/10 flex flex-col">
        <div className="p-4 border-b border-white/10">
          <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-violet-400" />
            Creative Studio
          </h1>
        </div>
        <nav className="flex-1 p-2">
          {panels.map(panel => (
            <button
              key={panel.id}
              onClick={() => setActivePanel(panel.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all ${
                activePanel === panel.id
                  ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                  : 'hover:bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <panel.icon className="w-5 h-5" />
              {panel.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="px-6 py-4 border-b border-white/10 bg-slate-900/50 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-white">
            {panels.find(p => p.id === activePanel)?.label} Generation
          </h2>
          <p className="text-sm text-slate-400">Create stunning content with AI</p>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <GenerationPanel type={activePanel} onGenerate={addToHistory} isGenerating={isGenerating} setIsGenerating={setIsGenerating} />
        </div>
      </main>

      {/* History Sidebar */}
      <aside className="w-72 bg-slate-900/80 border-l border-white/10 flex flex-col">
        <div className="p-4 border-b border-white/10 flex items-center gap-2">
          <History className="w-4 h-4 text-slate-400" />
          <h3 className="font-medium text-slate-300">History</h3>
        </div>
        <div className="flex-1 overflow-auto p-2">
          {history.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-8">No generations yet</p>
          ) : (
            history.map(item => (
              <div key={item.id} className="p-2 rounded-lg bg-white/5 mb-2 hover:bg-white/10 cursor-pointer transition">
                <p className="text-xs text-slate-400 truncate">{item.prompt}</p>
                <p className="text-xs text-slate-500 mt-1">{item.type.toUpperCase()}</p>
              </div>
            ))
          )}
        </div>
      </aside>
    </div>
  );
}

function GenerationPanel({ type, onGenerate, isGenerating, setIsGenerating }: {
  type: GenerationType;
  onGenerate: (result: GenerationResult) => void;
  isGenerating: boolean;
  setIsGenerating: (v: boolean) => void;
}) {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    
    // Simulate generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const generatedResult = `https://example.com/generated/${type}/${Date.now()}`;
    setResult(generatedResult);
    
    onGenerate({
      id: Date.now().toString(),
      type,
      prompt,
      result: generatedResult,
      timestamp: new Date(),
    });
    
    setIsGenerating(false);
  };

  const placeholders = {
    image: 'A serene mountain landscape at sunset...',
    video: 'A cinematic drone shot of ocean waves...',
    audio: 'Ambient electronic music with soft pads...',
    voice: 'Welcome to our creative studio...',
    '3d': 'A futuristic sci-fi spaceship model...',
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-800/50 rounded-2xl border border-white/10 p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">Prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={placeholders[type]}
            className="w-full h-32 bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-none"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="w-full py-3 px-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-medium transition-all flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate {type.charAt(0).toUpperCase() + type.slice(1)}
            </>
          )}
        </button>

        {result && (
          <div className="mt-6 p-4 bg-slate-900/50 rounded-xl border border-white/10">
            <h3 className="text-sm font-medium text-slate-300 mb-3">Result</h3>
            <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center">
              <p className="text-slate-500">Preview: {result}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}