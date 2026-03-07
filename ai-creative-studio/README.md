# AI Creative Studio

A modern web-based creative studio for generating AI content: images, videos, audio, voice, and 3D models.

## Features

- 🖼️ **Image Generation**: Text-to-image with customizable dimensions
- 🎬 **Video Generation**: Text-to-video creation
- 🎵 **Audio Generation**: Music and sound effects from text prompts
- 🎙️ **Voice Generation**: Text-to-speech with multiple voices and speeds
- 🎲 **3D Model Generation**: Text-to-3D model creation
- 🖼️ **Gallery View**: Browse all generated content
- 📜 **History Tracking**: View past generations with timestamps

## Tech Stack

- React 18 with TypeScript
- Vite for fast development
- Tailwind CSS v4 for styling
- Modern dark theme UI

## Getting Started

```bash
npm install
npm run dev
```

## API Endpoints

The app expects these API endpoints:

- `POST /api/generate-image` - Generate images
- `POST /api/generate-video` - Generate videos
- `POST /api/generate-sound` - Generate audio
- `POST /api/generate-voice` - Generate voice
- `POST /api/generate-3d` - Generate 3D models

Each endpoint accepts JSON body with `prompt` parameter and returns `{ url: string }`.

## License

MIT