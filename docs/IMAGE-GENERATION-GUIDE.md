# Generación de Imágenes e Iconos para SEO

## Herramientas Recomendadas

### 1. **Favicon Generator**

🔗 <https://realfavicongenerator.net/>

- Genera todos los tamaños de favicon necesarios
- Incluye apple-icon, favicon.ico, manifest icons
- Sube una imagen de 512x512 o más
- Descarga el paquete completo

### 2. **Open Graph Image Generator**

🔗 <https://www.opengraph.xyz/>

- Genera imágenes para Open Graph (1200x630)
- Incluye preview para Twitter, Facebook, LinkedIn
- Personaliza título, descripción, colores

### 3. **PWA Manifest Icons**

🔗 <https://tools.crawlink.com/tools/pwa-icon-generator/>

- Genera todos los tamaños para manifest.json
- 192x192, 512x512, maskable icons

### 4. **Screenshot Generator (Opcional)**

🔗 <https://www.screely.com/>

- Mockups profesionales de la app
- Para screenshots en manifest.json

---

## Imágenes Necesarias

### Iconos Base (Generar con realfavicongenerator.net)

```text/plain
public/
├── favicon.ico           # 32x32 (generado automáticamente)
├── icon-192.png         # 192x192 (para manifest)
├── icon-512.png         # 512x512 (para manifest)
├── apple-icon.png       # 180x180 (para iOS)
└── shortcut-icon-96.png # 96x96 (para shortcuts)
```

### Open Graph / Social Media

```text/plain
public/
├── og-image.png         # 1200x630 (Facebook, LinkedIn)
├── og-square.png        # 1200x1200 (para WhatsApp, some platforms)
└── twitter-image.png    # 1200x628 (Twitter/X)
```

### Screenshots (Opcional - PWA)

```text/plain
public/
├── screenshot-wide.png   # 1280x720 (desktop view)
└── screenshot-narrow.png # 750x1334 (mobile view)
```

### Structured Data Images

```text/plain
public/
├── logo.png       # 512x512 (para Organization schema)
├── screenshot.png # 1200x675 (para WebApplication schema)
├── how-to.png     # 800x600 (para HowTo schema header)
├── step1.png      # 400x300 (paso 1: upload)
├── step2.png      # 400x300 (paso 2: parameters)
├── step3.png      # 400x300 (paso 3: generate)
└── step4.png      # 400x300 (paso 4: export)
```

---

## Proceso Recomendado

### Paso 1: Diseño Base (512x512 mínimo)

1. Crea un logo/icono representativo en 512x512 o más
2. Fondo transparente o blanco
3. Colores que contrasten bien
4. Simple y reconocible

### Paso 2: Generar Favicon Set

1. Ve a <https://realfavicongenerator.net/>
2. Sube tu imagen base (512x512)
3. Ajusta configuraciones:
   - iOS: Selecciona "Add solid background" si tu imagen tiene transparencia
   - Android Chrome: Selecciona "Use a silhouette" o "Use your original picture"
   - Windows: Ajusta tile color
4. **Descarga el paquete**
5. Copia los archivos a `public/`

### Paso 3: Generar Open Graph Images

**Opción A: Canva (Recomendado)**

1. Ve a <https://www.canva.com/>
2. Busca template "Open Graph"
3. Dimensiones: 1200x630
4. Diseña con:
   - Logo de la app
   - Título: "String Art Generator"
   - Subtitle: "Transform Images into String Art"
   - Screenshot de la app (si tienes)
5. Descarga como `og-image.png`
6. Repite para 1200x1200 → `og-square.png`

**Opción B: Generador automático**

1. Ve a <https://www.opengraph.xyz/>
2. Configura:
   - Título: "String Art Generator"
   - Descripción: "Transform images into beautiful string art patterns"
   - Background: Color theme de tu app
3. Descarga las imágenes

### Paso 4: Screenshots (Opcional)

1. Abre tu app en producción
2. Toma screenshots con DevTools:
   - Desktop: 1280x720
   - Mobile: 750x1334
3. Opcional: Usa <https://www.screely.com/> para mockups profesionales

### Paso 5: Step-by-step Images (Para HowTo Schema)

1. Toma 4 screenshots del flujo:
   - `step1.png`: Vista del ImageUploader vacío
   - `step2.png`: Vista del ParametersPanel con sliders
   - `step3.png`: Vista del proceso de generación (con progress)
   - `step4.png`: Vista del ExportControls con botones
2. Redimensiona a 400x300
3. Guarda en `public/`

---

## Configuración de Manifest.json

Una vez tengas las imágenes, el `manifest.json` ya está configurado en:
`public/manifest.json`

Solo necesitas agregar los archivos PNG en las ubicaciones correctas.

---

## Verificación

### Después de generar todas las imágenes

1. **Test Favicon:**

   - Abre tu sitio en navegador
   - Verifica el icono en la pestaña

2. **Test Open Graph:**

   - <https://www.opengraph.xyz/url/https://www.stringartgenerator.app>
   - Preview de cómo se ve en redes sociales

3. **Test Twitter Card:**

   - <https://cards-dev.twitter.com/validator>
   - Preview de cómo se ve en Twitter/X

4. **Test Structured Data:**

   - <https://search.google.com/test/rich-results>
   - Verifica que los schemas JSON-LD sean válidos

5. **Test PWA Manifest:**
   - Chrome DevTools → Application → Manifest
   - Verifica que todos los iconos carguen

---

## Checklist Final

- [ ] favicon.ico generado
- [ ] icon-192.png agregado
- [ ] icon-512.png agregado
- [ ] apple-icon.png agregado
- [ ] og-image.png (1200x630) creado
- [ ] og-square.png (1200x1200) creado
- [ ] twitter-image.png creado
- [ ] logo.png para Organization schema
- [ ] screenshot.png para WebApplication schema
- [ ] step1.png, step2.png, step3.png, step4.png para HowTo
- [ ] Verificado en <https://realfavicongenerator.net/favicon_checker>
- [ ] Verificado en <https://www.opengraph.xyz/>
- [ ] Verificado en Google Rich Results Test

---

## Herramientas Adicionales (Opcionales)

- **ImageOptim**: Comprime imágenes sin perder calidad → <https://imageoptim.com/>
- **TinyPNG**: Compresión online → <https://tinypng.com/>
- **Figma**: Diseño profesional de iconos → <https://www.figma.com/>
- **SVGOMG**: Optimiza SVGs → <https://jakearchibald.github.io/svgomg/>

---

## Notas

- Todas las URLs ya están configuradas con variables de entorno
- El sistema usa `siteConfig.url` de `.env.local`
- No necesitas modificar código, solo agregar las imágenes en `public/`
- Las imágenes se referencian automáticamente desde los schemas
