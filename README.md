# String Art Generator 🎨

Transform any image into stunning string art patterns using advanced algorithms.

## ✅ Production Ready

**Status:** ✅ **Google AdSense Ready**  
**Content:** 28,000+ words across 21 pages  
**Traffic:** 2,300+ verified visitors (Nov 2025)  
**Compliance:** Legal pages + SEO + Blog active

📋 [AdSense Readiness Report](./docs/ADSENSE-READY.md)

---

## Features

- 🖼️ **Image Processing**: Upload any image (PNG, JPG, JPEG, WebP)
- ⚙️ **Customizable Parameters**: Adjust pins, lines, weight, opacity, colors
- 🎯 **Real-time Generation**: Web Worker processing for smooth performance
- 📥 **Multiple Export Formats**: PNG, SVG, JSON, TXT instructions
- 🚀 **Next.js 16 + React 19.2**: Latest features with SSR-first architecture
- 📱 **Fully Responsive**: Works on desktop, tablet, and mobile
- 📚 **Rich Content**: Blog (7 posts) + Tutorials + Gallery + Resources
- 🔒 **Legal Compliance**: Privacy Policy + Terms + Cookies (GDPR/CCPA)

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
NEXT_PUBLIC_ENABLE_ADS=false  # Set to 'true' in production to enable Google AdSense
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

**Automated Script (Recommended):**

Generate all SEO/PWA images automatically from your logo:

```bash
# 1. Place your logo.png in the project root
# 2. Run the generator
pnpm generate:images
```

This creates 10+ optimized images: favicons, PWA icons, Open Graph, Twitter
Cards, and screenshots.

📚 Full guide: [GENERATE-SEO-IMAGES.md](./docs/GENERATE-SEO-IMAGES.md)

**Manual alternatives:**

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

- ✅ **Structured Data (JSON-LD):** 6 schemas (WebApplication, WebSite,
  Organization, HowTo, SiteNavigation, BreadcrumbList)
- ✅ **Open Graph tags** for social media sharing
- ✅ **Twitter Cards** with large images
- ✅ **Canonical URLs** on all pages
- ✅ **Dynamic sitemap** (21 URLs)
- ✅ **Robots.txt** optimized for 6 crawlers
- ✅ **PWA manifest** ready
- ✅ **Multiple verification tags** (Google, Bing, Yandex)
- ✅ **Blog with comments** (Giscus integration)

## Content Overview

- **21 pages total** (supera requisito mínimo AdSense)
- **28,000+ palabras** de contenido original
- **Legal compliance:** Privacy Policy, Terms of Service, Cookie Policy
- **Educational:** FAQ (22 questions), Tutorials (4 guides), Tips (8), Use Cases
  (12)
- **Blog:** 7 artículos con categories + pagination + comments
- **Resources:** Gallery (6 examples), Templates, Contact

## Documentation

- [AdSense Readiness Report](./docs/ADSENSE-READY.md) - Complete checklist for
  Google AdSense
- [Project Structure](./docs/PROJECT-STRUCTURE.md) - Architecture and file
  organization
- [Tech Stack Details](./docs/TECH-STACK.md) - Framework and library choices
- [Image Generation Guide](./docs/IMAGE-GENERATION-GUIDE.md) - SEO images
  automation
- [AdSense Integration](./docs/ADSENSE-INTEGRATION.md) - Ad placement guide
- [Giscus Comments Setup](./docs/GISCUS-SETUP.md) - Blog comments configuration

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
