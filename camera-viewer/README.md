# Camera Webcast Feed Viewer

A React + TypeScript + Tailwind CSS v4 application for viewing live camera feeds with PTZ controls.

## Features

- 2x2 responsive grid layout for 4 camera feeds
- PTZ controls (pan left/right, tilt up/down, zoom in/out)
- Location overlay badges
- Fullscreen mode for selected camera
- Dark theme (#0a0a0a background, #3b82f6 accent)

## Camera Locations

1. Northern Israel
2. Beirut, Lebanon
3. Tel Aviv
4. US Consulate Dubai

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS v4
- Vite
- Lucide React (icons)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── CameraGrid.tsx
│   ├── CameraTile.tsx
│   ├── PTZControls.tsx
│   ├── FullscreenView.tsx
│   └── LocationBadge.tsx
├── types/
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Customization

### Adding Real Camera Streams

Replace the placeholder video elements in `CameraTile.tsx` and `FullscreenView.tsx` with actual video elements:

```tsx
<video 
  src={camera.streamUrl} 
  autoPlay 
  muted 
  playsInline
/>
```

### PTZ API Integration

The PTZ controls currently log actions to the console. To integrate with real cameras, modify the `handlePTZChange` function in `FullscreenView.tsx` to send API calls to your camera control endpoint.

## License

MIT