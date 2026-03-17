# AI Creative Studio

A modern web-based creative studio for generating AI content: images, videos, audio, voice, and 3D models.

## Features

- **Dashboard** - Overview of all generated content with quick actions
- **Image Generation** - Create stunning images from text descriptions
- **Video Generation** - Generate AI-powered videos
- **Audio Generation** - Produce music and sound effects
- **Voice Generation** - Convert text to natural-sounding speech
- **3D Model Generation** - Create 3D assets from descriptions
- **Gallery** - View and manage all generated content
- **History** - Track all generations with statistics

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
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
ai-creative-studio/
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx
│   │   ├── ImagePanel.tsx
│   │   ├── VideoPanel.tsx
│   │   ├── AudioPanel.tsx
│   │   ├── VoicePanel.tsx
│   │   ├── Model3DPanel.tsx
│   │   ├── Gallery.tsx
│   │   └── HistoryView.tsx
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── types.ts
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.ts
```

## License

MIT