# 🔄 Workflow del Generador de Imágenes

```
┌─────────────────────────────────────────────────────────────────┐
│                    GENERADOR DE IMÁGENES SEO                    │
└─────────────────────────────────────────────────────────────────┘

                           INPUT
                             ↓
                    ┌─────────────────┐
                    │   logo.png      │
                    │  (1024x1024)    │
                    │  Raíz proyecto  │
                    └─────────────────┘
                             ↓
                    ┌─────────────────┐
                    │ pnpm generate:  │
                    │     images      │
                    └─────────────────┘
                             ↓
              ┌──────────────┴──────────────┐
              │    scripts/generate-        │
              │      images.mjs             │
              │   (Procesamiento Sharp)     │
              └──────────────┬──────────────┘
                             ↓
        ┌────────────────────┴────────────────────┐
        │                                         │
        ↓                                         ↓
┌───────────────┐                       ┌──────────────────┐
│   ICONOS      │                       │  SOCIAL MEDIA    │
├───────────────┤                       ├──────────────────┤
│ icon-192.png  │                       │ opengraph-       │
│ icon-512.png  │                       │   image.png      │
│ apple-icon    │                       │ twitter-         │
│   .png        │                       │   image.png      │
│ favicon-      │                       └──────────────────┘
│   96x96.png   │
└───────────────┘                              ↓
        ↓                              ┌──────────────────┐
┌───────────────┐                      │   SCREENSHOTS    │
│   PWA ICONS   │                      ├──────────────────┤
├───────────────┤                      │ screenshot-      │
│ web-app-      │                      │   wide.png       │
│ manifest-192  │                      │ screenshot-      │
│ web-app-      │                      │   narrow.png     │
│ manifest-512  │                      └──────────────────┘
└───────────────┘
        │
        └────────────────┬─────────────────┘
                         ↓
                ┌─────────────────┐
                │   public/       │
                │  (10 imágenes)  │
                └─────────────────┘
                         ↓
                      OUTPUT
```

## 📊 Especificaciones de Salida

### Iconos Base (4 archivos)

- **icon-192.png** → 192×192px → Metadata general
- **icon-512.png** → 512×512px → Metadata general
- **apple-icon.png** → 180×180px → iOS/Safari
- **favicon-96x96.png** → 96×96px → Favicon HD

### Progressive Web App (2 archivos)

- **web-app-manifest-192x192.png** → 192×192px → PWA Small
- **web-app-manifest-512x512.png** → 512×512px → PWA Large

### Redes Sociales (2 archivos)

- **opengraph-image.png** → 1200×630px → Facebook, LinkedIn, etc.
- **twitter-image.png** → 1200×630px → Twitter/X Cards

### Screenshots PWA (2 archivos)

- **screenshot-wide.png** → 1280×720px → Desktop/Tablet
- **screenshot-narrow.png** → 750×1334px → Mobile

---

## 🎨 Características del Procesamiento

### Transformaciones Aplicadas

1. **Resize Inteligente**

   - Mantiene proporciones
   - Fit: `contain` (no deforma)
   - Alta calidad con Sharp

2. **Backgrounds**

   - Fondo negro sólido (#000000)
   - Alpha: 1 (opaco)
   - Personalizable en código

3. **Composición (Social/Screenshots)**

   - Logo centrado
   - Texto descriptivo
   - SVG para tipografía nítida

4. **Optimización**
   - Formato PNG optimizado
   - Compresión sin pérdida
   - Tamaños exactos requeridos

---

## ⚙️ Configuración Técnica

### Dependencias

```json
{
  "sharp": "^0.33.5" // Procesamiento de imágenes
}
```

### Scripts

```json
{
  "generate:images": "node scripts/generate-images.mjs"
}
```

### Archivos

- **Script**: `scripts/generate-images.mjs`
- **Config**: `package.json`
- **Docs**: `docs/GENERATE-SEO-IMAGES.md`

---

## 🚀 Uso Rápido

```bash
# Paso 1: Coloca tu logo
cp mi-logo.png logo.png

# Paso 2: Genera imágenes
pnpm generate:images

# Paso 3: ¡Listo!
# Todas las imágenes en public/
```

---

## 📋 Checklist de Verificación

Después de ejecutar el script, verifica:

- [ ] 10 archivos PNG generados en `public/`
- [ ] Imágenes con tamaños correctos
- [ ] Logo visible y centrado
- [ ] Sin errores en la consola
- [ ] `manifest.json` apunta a las rutas correctas
- [ ] `layout.tsx` referencia los iconos
- [ ] Prueba Open Graph con validadores online
- [ ] Prueba PWA manifest en DevTools

---

## 🔗 Referencias

- **Sharp Docs**: https://sharp.pixelplumbing.com/
- **PWA Manifest**: https://web.dev/add-manifest/
- **Open Graph**: https://ogp.me/
- **Twitter Cards**:
  https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup

---

**Última actualización**: Nov 2025
