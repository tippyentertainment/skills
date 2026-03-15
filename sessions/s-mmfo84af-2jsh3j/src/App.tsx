import React from 'react';
import CameraGrid from './components/CameraGrid';

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="bg-[#0a0a0a] border-b border-gray-800 px-6 py-4">
        <h1 className="text-2xl font-bold text-cyan-400">Camera Webcast Feed Viewer</h1>
      </header>
      <main className="container mx-auto py-6">
        <CameraGrid />
      </main>
    </div>
  );
}

export default App;