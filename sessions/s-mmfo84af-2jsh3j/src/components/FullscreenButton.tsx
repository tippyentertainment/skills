import React from 'react';

const FullscreenButton: React.FC = () => {
  const toggleFullscreen = () => {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => console.error(err));
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <button onClick={toggleFullscreen} className="absolute top-3 right-16 w-8 h-8 bg-black/50 hover:bg-cyan-600 rounded flex items-center justify-center text-white" title="Toggle Fullscreen">⛶</button>
  );
};

export default FullscreenButton;