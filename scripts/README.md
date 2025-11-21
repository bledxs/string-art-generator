# Scripts de Utilidades

## 📸 Generador de Imágenes SEO

Script para generar automáticamente todas las imágenes necesarias para SEO, PWA
y redes sociales desde un logo base.

### Prerequisitos

1. Tener un archivo `logo.png` en la **raíz del proyecto**
2. El logo debe ser cuadrado o tener proporciones adecuadas (mínimo 512x512px
   recomendado)

### Instalación

```bash
pnpm install
```

Esto instalará `sharp`, la librería de procesamiento de imágenes.

### Uso

```bash
pnpm generate:images
```

### Imágenes Generadas

El script genera las siguientes imágenes en la carpeta `public/`:

#### 🔷 Iconos y Favicons

- `icon-192.png` (192x192) - Icon para metadata
- `icon-512.png` (512x512) - Icon para metadata
- `apple-icon.png` (180x180) - Icon para dispositivos Apple
- `favicon-96x96.png` (96x96) - Favicon de alta resolución
- `favicon.ico` (32x32) - ⚠️ Nota: Requiere conversión manual

#### 📱 Progressive Web App (PWA)

- `web-app-manifest-192x192.png` (192x192)
- `web-app-manifest-512x512.png` (512x512)

#### 🌐 Redes Sociales

- `opengraph-image.png` (1200x630) - Para Facebook, LinkedIn, etc.
- `twitter-image.png` (1200x630) - Para Twitter/X

#### 📸 Screenshots

- `screenshot-wide.png` (1280x720) - Para dispositivos desktop/tablet
- `screenshot-narrow.png` (750x1334) - Para dispositivos móviles

### Características

- ✅ Genera automáticamente todos los tamaños necesarios
- ✅ Mantiene transparencias cuando es necesario
- ✅ Fondo negro para mejor contraste
- ✅ Añade texto descriptivo a imágenes sociales y screenshots
- ✅ Compatible con las especificaciones de Open Graph, Twitter Cards y PWA

## 📄 Generador de Templates PDF

Script para generar templates de string art imprimibles con posiciones numeradas
de clavos.

### Uso

```bash
pnpm generate:templates
```

### Templates Generados

El script genera 3 PDFs en `public/templates/`:

#### 📐 Templates Disponibles

- **100-pins-template.pdf** - A4 (210x297mm), círculo 25cm, nivel Principiante
- **200-pins-template.pdf** - A3 (297x420mm), círculo 30cm, nivel Intermedio
- **300-pins-template.pdf** - A2 (420x594mm), círculo 40cm, nivel Avanzado

### Características

- ✅ PDFs listos para imprimir al 100% de escala
- ✅ Posiciones numeradas equidistantes en patrón circular
- ✅ Cruceta central para alineación
- ✅ Instrucciones incluidas en el template
- ✅ Layout profesional con encabezado y pie de página
- ✅ Numeración visible cada N posiciones para evitar saturación

### Notas

1. **favicon.ico**: Sharp no genera archivos .ico directamente. Puedes:

   - Usar `favicon-96x96.png` como alternativa
   - Convertir manualmente usando herramientas online como
     [favicon.io](https://favicon.io)

2. **Screenshots**: Los screenshots generados son placeholders con el logo y
   texto. Para capturas reales de la aplicación, toma screenshots manualmente.

3. **Personalización**: Edita `generate-images.mjs` o `generate-templates.mjs`
   para ajustar:
   - Colores de fondo
   - Texto en imágenes sociales
   - Tamaños adicionales
   - Estilos de composición
   - Número de pines en templates
   - Tamaños de círculos

### Solución de Problemas

**Error: No se encuentra logo.png**

```
❌ ERROR: No se encontró logo.png en la raíz del proyecto
```

Solución: Coloca tu archivo `logo.png` en la raíz del proyecto (mismo nivel que
`package.json`)

**Error: sharp no instalado**

```
Error: Cannot find module 'sharp'
```

Solución: Ejecuta `pnpm install`

**Error: pdfkit no instalado**

```
Error: Cannot find module 'pdfkit'
```

Solución: Ejecuta `pnpm install`

### Workflow Recomendado

1. Coloca tu `logo.png` en la raíz
2. Ejecuta `pnpm generate:images` para imágenes SEO/PWA
3. Ejecuta `pnpm generate:templates` para PDFs de templates
4. Verifica las imágenes generadas en `public/`
5. Verifica los PDFs en `public/templates/`
6. Convierte `favicon-96x96.png` a `favicon.ico` si es necesario
7. Reemplaza los screenshots con capturas reales de tu aplicación
8. ¡Listo para deploy!
