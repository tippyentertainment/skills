import React, { useState } from 'react';
import { Header } from './components/Header';
import { CameraGrid } from './components/CameraGrid';
import { CameraSelector } from './components/CameraSelector';
import { useCameras } from './hooks/useCameras';
import type { Camera } from './types/camera';
import './App.css';

function App() {
  const { cameras, loading, error, refreshCameras } = useCameras();
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<Camera['status'] | 'all'>('all');

  const filteredCameras = filter === 'all' 
    ? cameras 
    : cameras.filter(c => c.status === filter);

  if (loading) {
    return (
      <div className="app-loading">
        <div className="spinner"></div>
        <p>Loading camera feeds...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-error">
        <p>Error loading cameras: {error}</p>
        <button onClick={refreshCameras}>Retry</button>
      </div>
    );
  }

  return (
    <div className="app">
      <Header 
        onRefresh={refreshCameras}
        layout={layout}
        onLayoutChange={setLayout}
      />
      
      <main className="main-content">
        <CameraSelector
          cameras={cameras}
          selectedCamera={selectedCamera}
          onSelectCamera={setSelectedCamera}
          onFilterChange={setFilter}
        />
        
        <CameraGrid
          cameras={filteredCameras}
          selectedCamera={selectedCamera}
          onSelectCamera={setSelectedCamera}
          layout={layout}
        />
      </main>
    </div>
  );
}

export default App;