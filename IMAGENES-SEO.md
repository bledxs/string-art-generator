# 🎨 Generador de Imágenes SEO - Resumen

## ✅ Lo que se ha creado:

### 1. Script Principal

**Archivo**: `scripts/generate-images.mjs`

Un script automatizado que genera **10 imágenes diferentes** a partir de un solo
logo:

- **4 iconos/favicons** (192x192, 512x512, 180x180, 96x96)
- **2 iconos PWA** (192x192, 512x512)
- **2 imágenes sociales** (Open Graph 1200x630, Twitter 1200x630)
- **2 screenshots** (desktop 1280x720, móvil 750x1334)

### 2. Configuración

**Archivo**: `package.json`

- ✅ Dependencia `sharp` agregada
- ✅ Script `pnpm generate:images` configurado

### 3. Documentación

**Archivos**:

- `scripts/README.md` - Documentación técnica del script
- `docs/GENERATE-SEO-IMAGES.md` - Guía paso a paso para usuarios

---

## 📋 Cómo Usar (Pasos Rápidos):

```bash
# 1. Coloca tu logo.png en la raíz del proyecto
# 2. Ejecuta el comando:
pnpm generate:images

# 3. ¡Listo! Todas las imágenes estarán en public/
```

---

## 📸 Imágenes que se Generan:

| Imagen                         | Tamaño   | Uso               |
| ------------------------------ | -------- | ----------------- |
| `icon-192.png`                 | 192×192  | Metadata general  |
| `icon-512.png`                 | 512×512  | Metadata general  |
| `apple-icon.png`               | 180×180  | iOS/Safari        |
| `favicon-96x96.png`            | 96×96    | Favicon HD        |
| `web-app-manifest-192x192.png` | 192×192  | PWA               |
| `web-app-manifest-512x512.png` | 512×512  | PWA               |
| `opengraph-image.png`          | 1200×630 | Facebook/LinkedIn |
| `twitter-image.png`            | 1200×630 | Twitter/X         |
| `screenshot-wide.png`          | 1280×720 | PWA Desktop       |
| `screenshot-narrow.png`        | 750×1334 | PWA Móvil         |

---

## 🔧 Tecnología:

- **Sharp**: Procesamiento de imágenes de alto rendimiento
- **Node.js**: Script en ESM (`.mjs`)
- **Automático**: Un comando genera todo

---

## ⚠️ Notas Importantes:

1. **Logo requerido**: Debes tener `logo.png` en la raíz del proyecto
2. **Favicon.ico**: Requiere conversión manual (el script lo indica)
3. **Screenshots**: Son placeholders, reemplaza con capturas reales si quieres
4. **Fondo**: Por defecto usa fondo negro (#000000)

---

## 🎯 Siguiente Paso:

1. Consigue tu `logo.png` (mínimo 512×512px, recomendado 1024×1024px)
2. Colócalo en la raíz: `c:\dev\string-art-generator\logo.png`
3. Ejecuta: `pnpm generate:images`
4. ¡Disfruta de tus imágenes SEO optimizadas!

---

## 📚 Documentación Completa:

- **Guía de uso**: `docs/GENERATE-SEO-IMAGES.md`
- **Documentación técnica**: `scripts/README.md`
- **Código fuente**: `scripts/generate-images.mjs`
