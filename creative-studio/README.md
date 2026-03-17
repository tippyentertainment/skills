# Generative AI Creative Studio

A web-based creative studio for generating AI content including images, videos, audio, voice, and 3D models.

## Features

- **Image Generation**: Create images from text prompts with style and size options
- **Video Generation**: Generate videos with duration and aspect ratio controls
- **Audio Generation**: Create music and sound effects with genre/mood selection
- **Voice Generation**: Convert text to speech with voice/language/speed options
- **3D Model Generation**: Create 3D models from text prompts

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **Radix UI** - Accessible components
- **Lucide React** - Icons

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
/src
  /components
    /Dashboard
      DashboardLayout.jsx
      Sidebar.jsx
      Header.jsx
    /Panels
      ImagePanel.jsx
      VideoPanel.jsx
      AudioPanel.jsx
      VoicePanel.jsx
      Model3DPanel.jsx
    /Gallery
      GalleryGrid.jsx
      AssetCard.jsx
    /History
      HistorySidebar.jsx
  /api
    generate.js
  /hooks
    useGeneration.js
  App.jsx
  main.jsx
  index.css
```

## API Integration

The API stubs in `/src/api/generate.js` are ready to be connected to your backend. Replace the mock implementations with actual API calls to:

- `POST /api/generate/image`
- `POST /api/generate/video`
- `POST /api/generate/audio`
- `POST /api/generate/voice`
- `POST /api/generate/3d`

## Customization

### Theme Colors

Edit `src/index.css` to customize the color palette:

```css
@theme {
  --color-accent: #6366f1;      /* Primary accent */
  --color-accent-hover: #818cf8;
  --color-surface-1: #0a0a0b;   /* Background */
  --color-surface-2: #141416;   /* Cards */
  --color-surface-3: #1c1c1f;   /* Inputs */
}
```

### Fonts

The default fonts are:
- **Space Grotesk** - Display font
- **JetBrains Mono** - Monospace font

## License

MIT