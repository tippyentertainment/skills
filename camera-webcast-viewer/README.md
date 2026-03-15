# Camera Webcast Feed Viewer

A modern React + TypeScript application for monitoring multiple camera feeds with real-time status indicators.

## Features

- **Grid/List View Toggle** - Switch between grid and list layouts
- **Camera Status Filtering** - Filter by All, Online, Offline, or Recording
- **Expandable Camera Feeds** - Click to expand any camera feed
- **Real-time Status Indicators** - Visual status with pulse animation for recording cameras
- **Responsive Design** - Works on desktop and mobile
- **Dark Theme** - Modern dark UI with accent colors
- **Search Functionality** - Search cameras by name or location
- **Camera Metadata Display** - Shows ID, location, resolution, and last seen time

## Tech Stack

- React 18
- TypeScript
- Vite
- Lucide React (icons)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## Project Structure

```
camera-webcast-viewer/
├── src/
│   ├── components/
│   │   ├── CameraGrid.tsx
│   │   ├── CameraFeed.tsx
│   │   ├── CameraSelector.tsx
│   │   └── Header.tsx
│   ├── hooks/
│   │   └── useCameras.ts
│   ├── types/
│   │   └── camera.ts
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
├── tsconfig.json
└── index.html
```

## Next Steps

1. Replace mock camera data with actual API endpoint
2. Add real video stream integration (WebRTC, HLS, or RTSP)
3. Implement authentication
4. Add recording playback functionality
5. Set up alerts for offline cameras

## License

MIT