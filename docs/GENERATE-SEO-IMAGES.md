# 📸 SEO Images Generation Guide

## Quick Start

### Automated Generation (Recommended)

1. **Place your logo** in the project root: `logo.png`

   - Recommended size: 1024x1024px or larger
   - Format: PNG with transparent background
   - Square aspect ratio

2. **Run the generator:**

   ```bash
   pnpm generate:images
   ```

3. **All images are created** in `public/` directory automatically

---

## Generated Images

The script creates 10 optimized images:

```
public/
├── icon-192.png              ← Icon estándar
├── icon-512.png              ← Icon grande
├── apple-icon.png            ← Para iOS/Safari
├── favicon-96x96.png         ← Favicon alta resolución
├── web-app-manifest-192x192.png  ← PWA pequeño
├── web-app-manifest-512x512.png  ← PWA grande
├── opengraph-image.png       ← Facebook, LinkedIn
├── twitter-image.png         ← Twitter/X
├── screenshot-wide.png       ← Captura desktop
└── screenshot-narrow.png     ← Captura móvil
```

## Paso 4: Tareas Adicionales (Opcionales)

### 4.1 Generar favicon.ico

Sharp no genera archivos .ico directamente. Tienes dos opciones:

**Opción A**: Usar el PNG existente

- Renombra `favicon-96x96.png` a `favicon.ico` (muchos navegadores lo aceptan)

**Opción B**: Convertir online

1. Ve a [favicon.io](https://favicon.io) o
   [convertio.co](https://convertio.co/png-ico/)
2. Sube `favicon-96x96.png`
3. Descarga el `favicon.ico` generado
4. Colócalo en `public/favicon.ico`

### 4.2 Reemplazar Screenshots

Los screenshots generados son placeholders con el logo y texto. Para mejores
resultados:

1. Abre tu aplicación en el navegador
2. Toma screenshots reales:
   - **Wide**: Vista desktop/tablet (1280x720)
   - **Narrow**: Vista móvil (750x1334)
3. Reemplaza los archivos en `public/`

## Paso 5: Verificar la Implementación

### En el Navegador

1. Abre tu aplicación
2. Inspecciona el `<head>` y verifica:
   - Favicons cargando correctamente
   - Meta tags Open Graph presentes
   - Twitter Cards configurados

### Herramientas de Validación

- **Open Graph**: [opengraph.xyz](https://www.opengraph.xyz/)
- **Twitter Cards**:
  [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- **PWA**: Chrome DevTools > Application > Manifest

## Solución de Problemas

### El logo no se encuentra

```
❌ ERROR: No se encontró logo.png en la raíz del proyecto
```

**Solución**: Verifica que `logo.png` esté en:

```
c:\dev\string-art-generator\logo.png
```

### Las imágenes se ven borrosas

**Solución**: Usa un logo de mayor resolución (mínimo 1024x1024px)

### El fondo no es transparente

**Solución**: El script usa fondo negro por defecto. Si necesitas transparencia,
edita `scripts/generate-images.mjs` y cambia:

```javascript
background: { r: 0, g: 0, b: 0, alpha: 1 }  // Negro sólido
```

Por:

```javascript
background: { r: 0, g: 0, b: 0, alpha: 0 }  // Transparente
```

### Personalizar el texto en imágenes sociales

Edita `scripts/generate-images.mjs` línea ~99:

```javascript
text: 'String Art Generator\nTransform images into beautiful string art',
```

## Archivos Relacionados

- **Script**: `scripts/generate-images.mjs`
- **Configuración**: `package.json` (script `generate:images`)
- **Manifest**: `public/manifest.json`
- **Layout**: `src/app/layout.tsx`

## Siguiente Paso

Después de generar las imágenes, asegúrate de que tu `layout.tsx` y
`manifest.json` referencien correctamente todas las rutas.

**¡Listo!** Tus imágenes SEO están generadas y optimizadas. 🎉
