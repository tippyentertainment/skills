# PTZ Camera Feed Viewer

Live Camera Feed Viewer with PTZ controls for cameras in Northern Israel, Beirut Lebanon, Tel Aviv, and US Consulate Dubai.

## Features

- **2x2 Tile Grid**: Responsive layout that collapses to single column on mobile
- **PTZ Controls**: Pan, tilt, and zoom controls for each camera
- **Fullscreen View**: Click any camera to view in fullscreen mode
- **Dark Theme**: Professional dark UI with gray-900 background
- **Live Indicator**: Pulsing red dot showing live status
- **Placeholder Feeds**: Simulated camera feeds ready for real stream URLs

## Cameras

1. Northern Israel
2. Beirut Lebanon
3. Tel Aviv
4. US Consulate Dubai

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite

## Getting Started

```bash
npm install
npm run dev
```

## Usage

- Click on any camera tile to open fullscreen view
- Use PTZ controls (pan/tilt D-pad + zoom buttons) to control camera
- Click "Fullscreen" button for expanded view with larger controls
- Press "Exit Fullscreen" or click outside to close

## Customization

Replace placeholder camera feeds by updating the `streamUrl` property in `src/App.tsx` with actual RTSP/WebRTC stream URLs.