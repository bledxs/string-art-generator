<div align="center">

# String Art Generator 🎨

[![Version](https://img.shields.io/badge/version-2.0.0-amber.svg)](https://github.com/bledxs/string-art-generator/releases/tag/v2.0.0)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Biome](https://img.shields.io/badge/Linter-Biome_2.5-60a5fa?style=flat&logo=biome)](https://biomejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**Transform any image into stunning physical string art patterns with a computational Nordic Artisan Workshop loom, zero-latency computer vision, and real-time thread physics.**

[🎯 Live Studio](https://www.stringartgenerator.app) • [🚀 Quick Start](#-quick-start) • [✨ Features](#-features) • [💬 Report Bug](https://github.com/bledxs/string-art-generator/issues)

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

## ✨ What's New in v2.0 (Nordic Artisan Workshop)

### 🪵 Nordic Atelier Aesthetic & Tangible Materials

- **Baltic Birch Wood Loom**: Authentic circular wooden board with natural grain gradients, stratified plywood outer bevel, and laser-engraved radial graduation incisions every 5° and 30°.
- **Polished Brass Pins**: Individually rendered golden brass pins with directional shadows and warm incandescent laser guidance halos on active pins.
- **Warm Studio Spotlight**: Atmospheric focal lighting that softly illuminates the loom and fades into the workbench dark grid.
- **Tactile Thread Spool Widget**: Displays real-time consumed thread length (in physical meters), thread material specs, and estimated spools needed.
- **Artisan Precision Scrollbar**: Custom floating pill capsule with dark bronze-slate resting tone and warm brass hover illumination.

### 🧠 Computer Vision Auto-Calibration

- **Client-Side Edge & Frequency Detection**: Analyzes luminance histograms, dynamic contrast range, and Sobel gradient spatial frequencies to determine optimal pin counts, line limits, and thread opacities with 0ms server latency.
- **1-Click Smart Calibration**: Instantly tune algorithm parameters tailored to each photo (portraits, landscapes, architectural geometry, or minimal sketches).

### 🧵 Physical Thread Simulation & Material Gauges

- **Universal Gauge Presets**:
  - **Silk #50 (0.12 mm)**: Ultra-fine thread for micro-detail and hyper-realistic portraits.
  - **Mercerized Cotton #40 (0.20 mm)**: Universal Gütermann standard for living-room art.
  - **Embroidery #20 (0.35 mm)**: High-impact bold geometric mandalas and graphic silhouettes.
  - **Linen Cord (0.60 mm)**: Rustic handcrafted looms with low line counts.
- **Physical Stroke Alpha Compounding**: Every string segment is stroked individually, enabling genuine $1 - (1 - \alpha)^N$ light absorption that accumulates into deep, solid blacks in dark shadow areas.

### 📐 Precision Studio Controls & Interactive Player
- **Zero-Layout-Shift Timeline Dock**: Persistent bottom dock that allows effortless scrubbing through thousands of lines with no viewport jumps.
- **Step-by-Step Weaving Assistant**: Visual pin-to-pin direction cards, progress indicator, -10/+10 navigation, and multi-color spool transition alerts for physical assembly.
- **Loom Geometries & Color Palettes**: Circular and rectangular frames (1:1, 3:4, 4:3, 16:9) with multi-color layered runs (Monochrome, CMYK, RGBW, Warm Sepia).
- **Interactive Image Cropper**: Modal with circular mask guides and pinch/zoom to perfectly compose faces inside the loom circle.
- **Ultra-Responsive Layout**: Adaptive mobile drawer with gesture support and seamless auto-fit down to 320px mobile screens.
- **Bilingual Interface (i18n)**: Instant switching between Spanish and English with automatic browser locale detection.

### 📤 Multi-Format Professional Export
- **Vector Art (SVG)**: Scalable path layers with layer color metadata, opacity, and stroke weight for laser cutting, plotters, or digital editing.
- **Physical Instruction Manual (TXT)**: Comprehensive artisan manual with board dimensions, Pin 0 orientation at 12:00, required thread meters/yards with safety buffer, and numbered pin-to-pin sequence.
- **Machine Project Data (JSON)**: Full configuration, layer breakdown, and sequence array for CNC/Arduino automated stringing machines.
- **Printable Pin Templates (PDF)**: High-precision printable radial templates for 100, 200, and 300 pins available in `public/templates/`.

---

## 🛠️ Tech Stack

### Core Framework & Tooling

- **Next.js 16.3** — App Router with Turbopack and SSR-first marketing routes
- **React 19.3** — React Compiler, pure declarative state with zero cascading effects
- **TypeScript 7.0** — Strict typing with zero `any` allowance
- **Tailwind CSS 4.3** — Modern CSS engine with OKLCH color spaces and fluid design tokens
- **Biome 2.5** — Ultra-fast linting, formatting, and strict accessibility checks
- **pnpm** — Fast, disk-efficient package manager

### Studio Engine & Graphics

- **Dedicated Web Worker** — Non-blocking multi-thousand chord optimization with batched IPC
- **Bresenham & Signed Residuals** — Integer-grid line calculation, whitespace protection, and anti-moiré chord penalties
- **Canvas 2D Engine** — Hardware-accelerated 60 FPS pan, zoom, and alpha-compounding stroke pipelines
- **PDFKit** — Client-side printable PDF generation for physical crafting manuals

---

## 🏗️ Architecture & Clean Code Standards

The codebase strictly adheres to **Clean Code** and **Feature-Driven Architecture**:

```plaintext
src/
├── app/                          # Next.js App Router
│   ├── favicon.ico              # Multi-resolution icon
│   ├── globals.css              # Artisan theme tokens & precision scrollbars
│   ├── layout.tsx               # Root layout with SEO & JSON-LD schema
│   ├── page.tsx                 # String Art Studio entrypoint
│   ├── providers.tsx            # Theme provider (next-themes)
│   ├── robots.ts                # Search engine crawler directives
│   └── sitemap.ts               # Dynamic XML sitemap
├── features/
│   └── string-art/              # Modular String Art Studio domain
│       ├── components/
│       │   ├── canvas/          # Viewport, wood loom, brass pins, zoom
│       │   ├── player/          # Timeline dock, weaving assistant modal
│       │   ├── sidebar/         # Presets, calibration, loom, algo & materials
│       │   └── toolbar/         # Studio header, stats, export modal
│       ├── hooks/               # useStudioWorkbench, useCanvasTransform, etc.
│       ├── utils/               # Pure calculation (Sobel, Bresenham, materials)
│       ├── workers/             # Dedicated Web Worker string generation
│       ├── types.ts             # Domain contracts
│       └── StringArtStudio.tsx  # Declarative root studio container
└── shared/
    ├── config/                  # Site configuration (site.ts)
    ├── i18n/                    # Bilingual internationalization (es, en)
    ├── ui/                      # Accessible design primitives (Radix UI)
    └── utils/                   # Shared helpers (cn, constants)
```

### Strict Code Constraints
- **Pure Declarative JSX**: Components strictly render UI. Business calculations live in pure utility functions (`utils/`) and custom hooks (`hooks/`).
- **File Length Limits**: Components $< 150$ lines, Containers $< 80$ lines, Pure functions $< 30$ lines.
- **No Cascading Render Loops**: All progress states derived via `useMemo` with batched worker messages.
- **Zero Biome Warnings**: 100% clean check on all 72 files.

---

## ⚙️ Environment Variables

Create a `.env.local` file with the following configuration:

```env
NEXT_PUBLIC_SITE_URL=https://www.stringartgenerator.app
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-google-verification-token
NEXT_PUBLIC_UBERSUGGEST_SITE_VERIFICATION=your-ubersuggest-token
```

| Variable                                    | Description                              | Required | Default                                 |
| ------------------------------------------- | ---------------------------------------- | -------- | --------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                      | Production site canonical URL            | Yes      | `https://www.stringartgenerator.app`    |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`      | Google Search Console verification token | No       | Configured in `src/shared/config/site.ts` |
| `NEXT_PUBLIC_UBERSUGGEST_SITE_VERIFICATION` | Ubersuggest webmaster verification token | No       | Optional                                |

> **Note:** All environment variables are centralized and type-safe via `src/shared/config/site.ts`.

---

## 📜 Available Scripts

| Script                    | Command                                       | Description                                            |
| ------------------------- | --------------------------------------------- | ------------------------------------------------------ |
| `pnpm dev`                | `next dev --turbopack`                        | Starts local development server with Turbopack         |
| `pnpm build`              | `next build`                                  | Compiles and optimizes production build                |
| `pnpm start`              | `next start`                                  | Starts production server                               |
| `pnpm lint`               | `biome check src`                             | Validates linting, formatting, and strict a11y rules   |
| `pnpm format`             | `biome format --write src`                    | Automatically formats all source code with Biome       |
| `pnpm commit`             | `cz`                                          | Interactive Conventional Commits wizard                |
| `pnpm generate:images`    | `node scripts/generate-images.mjs`            | Generates multi-size icons, favicons, and social cards |
| `pnpm generate:templates` | `node scripts/generate-templates.mjs`         | Generates printable PDF pin templates (100, 200, 300)  |

---

## 📊 Quality & Performance Standards

- ✅ **Biome Strict Check**: 0 errors, 0 warnings across all 72 source files.
- ✅ **Zero Layout Shifts**: Fully coordinated and persistent docks with zero reflow on the canvas.
- ✅ **High-Fidelity Alpha Accumulation**: Validated pixel luminance down to $13.3 / 255$ in dense shadow zones.
- ✅ **Hardware-Accelerated 60 FPS**: Smooth pan and zoom powered by 2D canvas transforms and batched Web Worker IPC.
- ✅ **Ultra-Compact Mobile Support**: Verified and responsive from 320px mobile viewports up to 4K displays.
- ✅ **Search Console & SEO Ready**: Dynamic XML sitemap, robots.txt, Schema.org WebApplication JSON-LD, OpenGraph and Twitter cards.

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

MIT License © 2026 [Luis C. Rojas](https://github.com/bledxs)

See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

Built with amazing open-source projects:

- **[Next.js](https://nextjs.org/)** - The React Framework for Production
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Biome](https://biomejs.dev/)** - High-performance toolchain for the web
- **[Vercel](https://vercel.com/)** - Deployment and hosting platform
- **[Lucide](https://lucide.dev/)** - Beautiful icon library

Special thanks to all open-source contributors!

---

<div align="center">

### ⭐ If this project helped you, give it a star

**Built with ❤️ using Next.js 16.3 + React 19.3 + Biome**

[⭐ Star on GitHub](https://github.com/bledxs/string-art-generator) •
[🐛 Report Bug](https://github.com/bledxs/string-art-generator/issues) •
[💡 Request Feature](https://github.com/bledxs/string-art-generator/issues/new)

---

**[🔝 Back to Top](#string-art-generator-)**

</div>
