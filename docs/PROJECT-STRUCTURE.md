# Project Structure

```plaintext
string-art-generator/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (marketing)/              # Route group - SSR pages
│   │   │   ├── page.tsx              # Landing SEO-optimized
│   │   │   ├── about/
│   │   │   ├── how-it-works/
│   │   │   └── layout.tsx            # Shared marketing layout
│   │   │
│   │   ├── editor/                   # Client-side app
│   │   │   ├── page.tsx              # Main editor (dynamic)
│   │   │   └── layout.tsx            # Editor-specific layout
│   │   │
│   │   ├── api/                      # Edge API routes
│   │   │   └── og/                   # Open Graph images
│   │   │
│   │   ├── layout.tsx                # Root layout (ads, analytics)
│   │   ├── metadata.ts               # SEO metadata centralized
│   │   └── sitemap.ts                # Dynamic sitemap
│   │
│   ├── features/                     # Feature-based modules
│   │   ├── string-art/               # Core feature
│   │   │   ├── components/           # UI específicos
│   │   │   │   ├── Canvas.tsx        # Renderizado (< 80 lines)
│   │   │   │   ├── ImageUploader.tsx
│   │   │   │   ├── ParametersPanel.tsx
│   │   │   │   └── ExportControls.tsx
│   │   │   │
│   │   │   ├── hooks/                # Custom hooks
│   │   │   │   ├── useStringArt.ts   # Orquestador principal
│   │   │   │   └── useImageUpload.ts
│   │   │   │
│   │   │   ├── workers/              # Background processing
│   │   │   │   ├── stringArt.worker.ts
│   │   │   │   └── types.ts
│   │   │   │
│   │   │   ├── algorithms/           # Core logic
│   │   │   │   ├── stringArtEngine.ts  # Algoritmo principal
│   │   │   │   ├── imageProcessor.ts   # Análisis de imagen
│   │   │   │   └── pathOptimizer.ts    # Optimización de trazos
│   │   │   │
│   │   │   ├── store/                # Zustand store
│   │   │   │   └── stringArtStore.ts
│   │   │   │
│   │   │   └── types.ts              # Types del feature
│   │   │
│   │   └── seo/                      # SEO feature
│   │       ├── components/
│   │       │   ├── StructuredData.tsx
│   │       │   └── SocialMeta.tsx
│   │       └── config/
│   │           └── metadata.config.ts
│   │
│   ├── components/                   # Shared UI components
│   │   ├── ui/                       # Shadcn-style base components
│   │   │   ├── Button.tsx
│   │   │   └── Card.tsx
│   │   │
│   │   └── layout/                   # Layout components
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── AdSlot.tsx            # Adsense wrapper
│   │
│   ├── lib/                          # Utilities & configs
│   │   ├── utils.ts                  # Helpers generales
│   │   ├── cn.ts                     # Classname utility
│   │   └── constants.ts              # App constants
│   │
│   └── types/                        # Global types
│       └── index.ts
│
├── public/
│   ├── workers/                      # Worker files compilados
│   └── images/
│
├── next.config.js                    # Cloudflare optimizations
├── tsconfig.json
└── tailwind.config.ts
```

This document outlines the project structure for the String Art Generator
application, built with Next.js 15 using the App Router. The architecture
follows a modular monolith approach, separating concerns by features and
adhering to best practices for performance, maintainability, and scalability.
