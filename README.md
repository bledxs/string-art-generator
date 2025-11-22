<div align="center">

# String Art Generator 🎨

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**Transform any image into stunning string art patterns using advanced
algorithms and modern web technologies.**

[🎯 Live Demo](https://www.stringartgenerator.app) • [📖 Documentation](./docs/)
• [🚀 Getting Started](#quick-start) •
[💬 Report Bug](https://github.com/bledxs/string-art-generator/issues)

</div>

---

## ⚡ Quick Start

```bash
# Clone and setup
git clone https://github.com/bledxs/string-art-generator.git
cd string-art-generator
pnpm install

# Configure environment
cp .env.example .env.local

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) and start creating!

---

## ✨ Features

### Core Functionality

- 🖼️ **Smart Image Processing** - Upload PNG, JPG, WebP with automatic
  optimization
- 🎨 **Advanced Algorithms** - Custom pathfinding with configurable pins & lines
- ⚡ **Web Workers** - Background processing for smooth 60fps UI
- 📤 **Multi-Format Export** - PNG, SVG, JSON, and physical build instructions

### User Experience

- 🎯 **Real-time Preview** - See changes instantly with React 19.2 optimizations
- 📱 **Fully Responsive** - Desktop, tablet, and mobile optimized
- 🔄 **Activity Pre-loading** - Next.js 16 hidden rendering for instant
  navigation
- ⬆️ **Back to Top** - Smooth scroll on long pages
- 🧭 **Breadcrumbs** - Clear navigation with structured data
- 🎭 **Dark/Light Themes** - System-aware theme switching

### Developer Experience

- 🚀 **SSR-First Architecture** - Server components by default
- 🔥 **Turbopack** - 2-5x faster builds with file system caching
- 📦 **Feature-Based Structure** - Scalable and maintainable
- 🛡️ **TypeScript Strict** - Full type safety
- 🎨 **Tailwind 4.1** - Modern CSS with design tokens
- 🧩 **shadcn/ui** - Accessible component system

### Content & SEO

- 📚 **Rich Content** - 28,000+ words across 21 pages
- 📝 **Active Blog** - 7 articles with Giscus comments
- 🎓 **Learning Resources** - Tutorials, FAQ (22 questions), tips
- 🔍 **SEO Optimized** - 6 JSON-LD schemas, Open Graph, sitemaps
- 🔒 **Legal Compliance** - GDPR/CCPA ready (Privacy, Terms, Cookies)
- ✅ **AdSense Ready** - 2,300+ verified visitors (Nov 2025)

## 🛠️ Tech Stack

### Core Framework

- **Next.js** 16.0.1 - App Router with SSR-first architecture
- **React** 19.2.0 - Latest features (Activity, useEffectEvent)
- **TypeScript** 5.9.3 - Strict mode enabled
- **Node.js** 20.9+ - Required runtime

### UI & Styling

- **Tailwind CSS** 4.1.16 - Modern CSS with design tokens
- **shadcn/ui** - Accessible component library (Radix UI)
- **Lucide React** 0.552.0 - Icon system
- **next-themes** 0.4.6 - Theme management

### State & Data

- **Zustand** 5.0.8 - Lightweight state management
- **LocalStorage** - Persistent client-side storage
- **React Hook Form** 7.66.0 + Zod 4.1.12 - Form validation

### Performance

- **Web Workers** - Background image processing
- **OffscreenCanvas** - Non-blocking rendering
- **Turbopack** - 2-5x faster builds
- **React Compiler** - Automatic optimizations
- **Sharp** 0.34.4 - Server-side image optimization

### Developer Tools

- **ESLint** 9.39.1 - Code linting
- **Commitizen** + Husky - Conventional commits
- **pnpm** - Fast, efficient package manager

## 🏗️ Architecture

### SSR-First Design

- **Default:** Server Components for all pages
- **Client islands:** Only for interactivity (canvas, forms, events)
- **Benefits:** Better SEO, faster initial load, reduced bundle size

### Feature-Based Structure

```
src/features/string-art/
├── algorithms/      # Core processing logic
├── components/      # UI components
├── hooks/          # Custom React hooks
├── store/          # Zustand state
├── types.ts        # TypeScript definitions
└── workers/        # Web Worker threads
```

### Performance Patterns

- **Web Workers:** Heavy algorithms run in background threads
- **Code Splitting:** Lazy loading with React.lazy() + Suspense
- **Activity API:** Pre-render hidden components (React 19.2)
- **Image Optimization:** next/image with Sharp processing
- **Caching:** Next.js 16 "use cache" for expensive operations

### Code Quality Rules

- **Max file length:** Components 100 lines, Utils 150 lines
- **Single Responsibility:** One feature per file
- **No prop drilling:** Zustand for global state
- **Type safety:** No `any` types, strict TypeScript
- **SOLID principles:** DRY, KISS, YAGNI enforced

---

## 📁 Project Structure

```plaintext
src/
├── app/                          # Next.js App Router
│   ├── (marketing)/             # Marketing pages (SSR)
│   │   ├── page.tsx            # Landing page
│   │   ├── about/              # About page
│   │   ├── how-it-works/       # Tutorial
│   │   ├── blog/               # Blog with comments
│   │   └── ...                 # FAQ, tutorials, legal
│   ├── editor/                  # String art editor (client)
│   ├── sitemap.ts              # Dynamic sitemap
│   ├── robots.ts               # Robots.txt
│   └── layout.tsx              # Root layout
├── components/
│   ├── ads/                    # Google AdSense
│   ├── layout/                 # Header, Footer, Menu
│   ├── seo/                    # Structured Data (JSON-LD)
│   └── ui/                     # shadcn/ui components (40+)
├── features/string-art/        # Main feature module
│   ├── algorithms/             # Image processing
│   │   ├── imageProcessor.ts  # Canvas manipulation
│   │   ├── pathOptimizer.ts   # Line generation
│   │   └── stringArtEngine.ts # Core algorithm
│   ├── components/             # Editor UI
│   ├── hooks/                  # useStringArt, useCanvas
│   ├── store/                  # Zustand state
│   ├── types.ts                # TypeScript types
│   └── workers/                # Web Worker threads
├── lib/
│   ├── config.ts               # Environment config
│   └── utils.ts                # Shared utilities
├── types/
│   └── index.ts                # Global types
docs/                           # Documentation (MD files)
public/                         # Static assets
├── images/                     # SEO images
├── manifest.json               # PWA manifest
└── ads.txt                     # AdSense verification
```

## ⚙️ Environment Variables

Create a `.env.local` file with the following configuration:

```env
NEXT_PUBLIC_SITE_URL=https://www.stringartgenerator.app
NEXT_PUBLIC_SITE_NAME="String Art Generator"
NEXT_PUBLIC_SITE_DESCRIPTION="Transform images into beautiful string art patterns"
NEXT_PUBLIC_TWITTER_HANDLE=@stringartgen
NEXT_PUBLIC_SUPPORT_EMAIL=support@stringartgenerator.app
NEXT_PUBLIC_ENABLE_ADS=false  # Set to 'true' in production
```

| Variable                       | Description              | Required |
| ------------------------------ | ------------------------ | -------- |
| `NEXT_PUBLIC_SITE_URL`         | Production URL           | Yes      |
| `NEXT_PUBLIC_SITE_NAME`        | Site name for metadata   | Yes      |
| `NEXT_PUBLIC_SITE_DESCRIPTION` | Meta description         | Yes      |
| `NEXT_PUBLIC_TWITTER_HANDLE`   | Twitter handle for cards | No       |
| `NEXT_PUBLIC_SUPPORT_EMAIL`    | Support email address    | Yes      |
| `NEXT_PUBLIC_ENABLE_ADS`       | Enable Google AdSense    | No       |

> **Note:** All variables are type-safe via `src/lib/config.ts`

---

## 📊 Performance & Quality

### Quality Audit Score: 19/19 ✅

**Metadata (10/10)**

- ✅ Title tags optimized (50-60 chars)
- ✅ Meta descriptions unique per page
- ✅ Open Graph + Twitter Cards
- ✅ Canonical URLs
- ✅ Favicon + PWA manifest

**Code Quality (4/4)**

- ✅ TypeScript strict mode: 0 errors
- ✅ ESLint: 0 warnings
- ✅ File length limits enforced
- ✅ SOLID principles applied

**SEO (4/4)**

- ✅ 6 JSON-LD schemas (WebApplication, HowTo, etc.)
- ✅ Dynamic sitemap.xml (21 URLs)
- ✅ Optimized robots.txt
- ✅ Breadcrumbs with structured data

**UX (1/1)**

- ✅ Mobile responsive
- ✅ Accessibility (ARIA, alt tags)
- ✅ Dark/Light themes
- ✅ Back to top button

### Performance Targets

- **Lighthouse Score:** 90+ (all categories)
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.5s
- **Bundle Size:** Client JS < 200KB gzipped

### Optimizations Applied

- Server-side rendering for marketing pages
- Web Workers for CPU-intensive tasks
- Image optimization with Sharp
- Code splitting per route
- Turbopack build caching

📋 **Full Report:** [Quality Audit](./docs/QUALITY-AUDIT.md)

---

## 📚 Documentation

- **[Quality Audit](./docs/QUALITY-AUDIT.md)** - 19/19 criteria checklist (100%
  pass)
- **[AdSense Integration](./docs/ADSENSE-INTEGRATION.md)** - Complete
  monetization guide
- **[Project Structure](./docs/PROJECT-STRUCTURE.md)** - Architecture details
- **[Tech Stack](./docs/TECH-STACK.md)** - Framework and library choices
- **[Image Generation](./docs/IMAGE-GENERATION-GUIDE.md)** - SEO images
  automation
- **[Vercel Deployment](./docs/VERCEL-DEPLOYMENT.md)** - Production deployment
  guide

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

### Development Workflow

1. **Fork** the repository
2. **Clone** your fork:
   `git clone https://github.com/YOUR_USERNAME/string-art-generator.git`
3. **Create** a feature branch: `git checkout -b feature/amazing-feature`
4. **Make** your changes following our code standards
5. **Commit** using Commitizen: `pnpm commit`
6. **Push** to your fork: `git push origin feature/amazing-feature`
7. **Open** a Pull Request

### Code Quality Standards

- ✅ **TypeScript Strict** - No `any` types
- ✅ **File Limits** - Components: 100 lines | Utils: 150 lines
- ✅ **SOLID Principles** - SRP, DRY, KISS, YAGNI
- ✅ **SSR-First** - Server Components by default
- ✅ **Testing** - Validate changes before committing
- ✅ **Documentation** - Update docs for new features

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/) via
Commitizen:

```bash
pnpm commit  # Interactive commit wizard
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

---

## 👥 Contributors

Thanks to these wonderful people
([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/bledxs"><img src="https://avatars.githubusercontent.com/u/90062924?v=4" width="100px;" alt="Luis C. Rojas"/><br /><sub><b>Luis C. Rojas</b></sub></a><br /><a href="#code-bledxs" title="Code">💻</a> <a href="#doc-bledxs" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/all-contributors/all-contributors)
specification.

---

## 📝 License

MIT License © 2025 [Luis C. Rojas](https://github.com/bledxs)

See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

Built with amazing open-source projects:

- **[Next.js](https://nextjs.org/)** - The React Framework for Production
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Vercel](https://vercel.com/)** - Deployment and hosting platform
- **[Lucide](https://lucide.dev/)** - Beautiful icon library

Special thanks to all open-source contributors!

---

<div align="center">

### ⭐ If this project helped you, give it a star!

**Built with ❤️ using Next.js 16 + React 19.2**

[⭐ Star on GitHub](https://github.com/bledxs/string-art-generator) •
[🐛 Report Bug](https://github.com/bledxs/string-art-generator/issues) •
[💡 Request Feature](https://github.com/bledxs/string-art-generator/issues/new)

---

**[🔝 Back to Top](#string-art-generator-)**

</div>
