# String Art Generator - Stack Técnico

## **Decisión Arquitectural**

**Arquitectura:** Modular Monolith con Server Components + Minimal Client
Islands

**Prioridades:**

1. **Performance-first:** Carga rápida, bundle mínimo
2. **SSR-first:** Máximo server-side, mínimo cliente
3. **SEO agresivo:** Todo contenido rastreable server-side

**Justificación:**

- React Server Components por defecto para todo contenido
- Client Components SOLO para: Canvas interactivo, controles UI, Web Workers
- Landing, metadata, layouts, componentes estáticos → 100% SSR
- Algoritmo string art en Web Worker → No bloquea UI
- Edge-ready para Vercel + Cloudflare CDN

---

## **Frontend**

### Framework Principal

- **Next.js 16 (Beta)**
  - **SSR por defecto:** React Server Components para SEO máximo
  - **CSR mínimo:** Solo canvas y controles interactivos (`'use client'`)
  - Edge-ready para deployment en Vercel
  - **Beta features:** Mejor performance en App Router, Turbopack mejorado
  - **Nota:** Versión beta estable para testing en producción

### Lenguaje

- **TypeScript (strict mode)**
  - Type safety completo
  - Mejor DX y mantenibilidad

### Estilos

- **Tailwind CSS**
  - Lightweight y tree-shakeable
  - Utilidades responsive mobile-first
  - Bundle size optimizado

### Estado

- **Zustand**
  - Estado local mínimo (~1KB)
  - Gestión de parámetros del string art
  - Sincronización con LocalStorage

---

## **Processing & Rendering**

### Procesamiento Pesado

- **Web Workers**
  - Algoritmo de string art en background thread
  - No bloquea la UI principal
  - Comunicación mediante mensajes estructurados

### Renderizado

- **Canvas API**

  - Renderizado performante de líneas
  - Hardware-accelerated

- **OffscreenCanvas**
  - Renderizado en Worker si está disponible
  - Mejor performance en navegadores modernos

---

## **Optimization**

### Imágenes

- **Sharp (vía Next.js)**
  - Optimización server-side automática
  - Conversión de formatos
  - Resize inteligente

### Generación de Contenido

- **Static Generation**

  - Landing pages y contenido SEO pre-renderizado
  - Metadata optimizada

- **Dynamic Imports**
  - Code-splitting del editor
  - Lazy loading de componentes pesados

---

## **Key Libraries**

| Librería         | Tamaño | Propósito                        |
| ---------------- | ------ | -------------------------------- |
| `zustand`        | ~1KB   | Estado UI ligero para parámetros |
| `html2canvas`    | ~80KB  | Exportar canvas a PNG            |
| `file-saver`     | ~4KB   | Descargas client-side            |
| `react-dropzone` | ~20KB  | Upload UX optimizada             |
| `clsx`           | ~1KB   | Utility classes condicionales    |

**Total bundle adicional:** ~106KB (minified)

---

## **No Incluido (Por Ahora)**

❌ Base de datos (MongoDB, PostgreSQL, etc.)  
❌ Backend APIs (Express, Fastify, etc.)  
❌ Autenticación (NextAuth, Clerk, etc.)  
❌ ORM (Prisma, Drizzle, etc.)  
❌ State management pesado (Redux, Recoil)

**Justificación:** Performance-first + MVP sin persistencia de datos

---

## **Hosting & Deployment**

- **Vercel**

  - Next.js 15 optimizado (creators de Next.js)
  - Edge Functions & Middleware
  - Automatic deployments desde Git
  - Image Optimization integrado
  - Analytics y Web Vitals

- **Cloudflare**
  - DNS management
  - Proxy/CDN delante de Vercel
  - SSL/TLS certificates
  - DDoS protection

---

## **Development Tools**

### Linting & Formatting

- ESLint (Next.js config + TypeScript)
- Prettier
- TypeScript strict mode

### Build

- Turbopack (Next.js 15 default)
- PostCSS (Tailwind)

### Testing (Futuro)

- Vitest (unit tests)
- Playwright (E2E)

---

## **Performance Targets**

| Métrica                  | Target  |
| ------------------------ | ------- |
| First Contentful Paint   | < 1.5s  |
| Time to Interactive      | < 3.0s  |
| Cumulative Layout Shift  | < 0.1   |
| Largest Contentful Paint | < 2.5s  |
| Bundle Size (JS)         | < 200KB |

---

## **Browser Support**

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

**Funcionalidades progresivas:**

- Web Workers: Fallback a main thread
- OffscreenCanvas: Fallback a Canvas estándar
- LocalStorage: Fallback a memoria volátil
