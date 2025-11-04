# String Art Generator 🎨

Transform any image into stunning string art patterns using advanced algorithms.

## Features

- 🖼️ **Image Processing**: Upload any image (PNG, JPG, JPEG, WebP)
- ⚙️ **Customizable Parameters**: Adjust pins, lines, weight, opacity, colors
- 🎯 **Real-time Generation**: Web Worker processing for smooth performance
- 📥 **Multiple Export Formats**: PNG, SVG, JSON, TXT instructions
- 🚀 **Next.js 16 + React 19.2**: Latest features with SSR-first architecture
- 📱 **Fully Responsive**: Works on desktop, tablet, and mobile

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **UI**: React 19.2 + Tailwind CSS + shadcn/ui
- **State**: Zustand with LocalStorage persistence
- **Processing**: Web Workers + OffscreenCanvas
- **Build**: Turbopack with file system caching
- **Optimization**: React Compiler enabled

## Getting Started

### Prerequisites

- Node.js 20.9 or higher
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/string-art-generator.git
cd string-art-generator
```

2. Install dependencies:

```bash
pnpm install
```

3. Create environment variables:

```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://www.stringartgenerator.app
NEXT_PUBLIC_SITE_NAME="String Art Generator"
NEXT_PUBLIC_SITE_DESCRIPTION="Transform images into beautiful string art patterns"
NEXT_PUBLIC_TWITTER_HANDLE=@stringartgen
NEXT_PUBLIC_SUPPORT_EMAIL=support@stringartgenerator.app
```

### Development

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Build

Build for production:

```bash
pnpm build
```

### Generate Images & Icons

See [IMAGE-GENERATION-GUIDE.md](./docs/IMAGE-GENERATION-GUIDE.md) for detailed
instructions on generating all required images and icons for SEO/PWA.

**Quick links:**

- Favicon Generator: https://realfavicongenerator.net/
- Open Graph Images: https://www.opengraph.xyz/
- PWA Icons: https://tools.crawlink.com/tools/pwa-icon-generator/

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (marketing)/             # Marketing pages (landing)
│   ├── editor/                  # String art editor
│   ├── sitemap.ts              # Dynamic sitemap
│   └── robots.ts               # Robots.txt
├── components/
│   ├── seo/                    # SEO components (Structured Data)
│   └── ui/                     # shadcn/ui components
├── features/string-art/        # String art feature
│   ├── algorithms/             # Image processing & generation
│   ├── components/             # Feature components
│   ├── hooks/                  # Custom hooks
│   ├── store/                  # Zustand store
│   ├── types.ts                # TypeScript types
│   └── workers/                # Web Workers
├── lib/
│   ├── config.ts               # Site configuration
│   └── utils.ts                # Utility functions
docs/                           # Documentation
public/                         # Static assets (images, icons)
```

## Environment Variables

All site-specific URLs and configuration are centralized using environment
variables:

| Variable                       | Description      | Default                              |
| ------------------------------ | ---------------- | ------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`         | Production URL   | `https://www.stringartgenerator.app` |
| `NEXT_PUBLIC_SITE_NAME`        | Site name        | `String Art Generator`               |
| `NEXT_PUBLIC_SITE_DESCRIPTION` | Site description | -                                    |
| `NEXT_PUBLIC_TWITTER_HANDLE`   | Twitter handle   | `@stringartgen`                      |
| `NEXT_PUBLIC_SUPPORT_EMAIL`    | Support email    | `support@stringartgenerator.app`     |

**Note**: All variables are accessed through `src/lib/config.ts` for type
safety.

## SEO Features

- ✅ Structured Data (JSON-LD): WebApplication, WebSite, Organization, HowTo
- ✅ Open Graph tags for social media
- ✅ Twitter Cards
- ✅ Canonical URLs
- ✅ Dynamic sitemap
- ✅ Robots.txt configuration
- ✅ PWA manifest
- ✅ Multiple verification tags (Google, Bing, Yandex)

## Documentation

- [Project Structure](./docs/PROJECT-STRUCTURE.md)
- [Tech Stack Details](./docs/TECH-STACK.md)
- [Image Generation Guide](./docs/IMAGE-GENERATION-GUIDE.md)

## Deploy

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in project settings
4. Deploy

### Environment Variables in Production

Make sure to set all required environment variables in your hosting platform:

- Vercel: Project Settings → Environment Variables
- Other platforms: Follow their documentation

## License

MIT

## Contributing

Contributions are welcome! Please read the contributing guidelines first.

---

Built with ❤️ using Next.js 16 + React 19.2
