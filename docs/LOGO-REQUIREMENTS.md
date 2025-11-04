# 🎨 Requisitos del Logo para Generación de Imágenes

## Especificaciones Técnicas

### Dimensiones

- **Mínimo**: 512×512 píxeles
- **Recomendado**: 1024×1024 píxeles
- **Óptimo**: 2048×2048 píxeles (para máxima calidad)

### Formato

- **Requerido**: PNG
- **Transparencia**: Recomendada (fondo transparente)
- **Color**: RGB o RGBA
- **Profundidad**: 8 bits por canal

### Forma

- **Ideal**: Cuadrado (1:1)
- **Aceptable**: Rectangular con margen
- **Evitar**: Formas muy alargadas o irregulares

---

## ✅ Buenas Prácticas

### 1. Contenido Visual

**✓ Recomendado:**

- Logo limpio y minimalista
- Elementos grandes y claros
- Alto contraste
- Sin texto muy pequeño
- Colores sólidos o degradados simples

**✗ Evitar:**

- Detalles muy finos (se pierden al escalar)
- Texto menor a 24px
- Colores muy similares al fondo
- Complejidad excesiva
- Fotografías con mucho detalle

### 2. Margen y Padding

```
┌─────────────────────────────┐
│        ← 10% →              │
│                             │
│  ┌─────────────────────┐   │
│  │                     │   │
│  │      TU LOGO        │   │
│  │                     │   │
│  └─────────────────────┘   │
│                             │
│              ← 10% →        │
└─────────────────────────────┘
```

- Deja **10% de margen** en todos los lados
- Esto evita que el logo se vea "recortado"
- El script ya añade padding negro si es necesario

### 3. Fondo

**Opción A: Fondo Transparente (Recomendado)**

- Permite flexibilidad
- El script añade fondo negro
- Mejor para diferentes contextos

**Opción B: Fondo de Color**

- Asegúrate que contraste con el logo
- Considera que aparecerá en todas las variantes

---

## 📐 Ejemplos

### ✅ Logo Ideal

```
Archivo: logo.png
Dimensiones: 1024×1024
Fondo: Transparente
Contenido: Logo centrado con margen de 100px
Formato: PNG-24 con alpha
Tamaño archivo: ~50-200KB
```

**Características:**

- Elementos grandes y visibles
- Alto contraste
- Sin detalles muy finos
- Escala bien a todos los tamaños

### ⚠️ Logo Aceptable pero Mejorable

```
Archivo: logo.png
Dimensiones: 512×512
Fondo: Blanco sólido
Contenido: Logo sin margen
Formato: PNG-8
Tamaño archivo: ~30KB
```

**Limitaciones:**

- Menor resolución → algo de pérdida en tamaños grandes
- Sin transparencia → fondo siempre visible
- Sin margen → puede verse ajustado

### ❌ Logo Problemático

```
Archivo: logo.jpg
Dimensiones: 300×300
Fondo: Gradiente complejo
Contenido: Texto pequeño + muchos detalles
Formato: JPEG
```

**Problemas:**

- Resolución insuficiente
- JPEG → artefactos de compresión
- Texto pequeño → ilegible al escalar
- Detalles se pierden

---

## 🔧 Preparación del Logo

### Si tienes un logo en otro formato:

#### SVG → PNG

```bash
# Usando Inkscape (CLI)
inkscape logo.svg --export-type=png --export-width=1024 --export-height=1024 -o logo.png
```

#### AI/PSD → PNG

1. Abrir en Photoshop/Illustrator
2. Archivo > Exportar > Exportar como PNG
3. Dimensiones: 1024×1024
4. Transparencia: Activada
5. Guardar como `logo.png`

#### JPG → PNG (con transparencia)

```bash
# Usando ImageMagick
convert logo.jpg -background none -resize 1024x1024 logo.png
```

---

## 🎯 Checklist Pre-Generación

Antes de ejecutar `pnpm generate:images`:

- [ ] Archivo se llama exactamente `logo.png`
- [ ] Está en la raíz del proyecto (nivel de `package.json`)
- [ ] Dimensiones mínimas: 512×512px
- [ ] Formato PNG (no JPG, GIF, etc.)
- [ ] Logo visible y centrado
- [ ] Margen adecuado alrededor del logo
- [ ] Contraste suficiente con fondo negro
- [ ] Sin texto muy pequeño

---

## 🖼️ Estructura de Archivos

```
string-art-generator/
├── logo.png                 ← ¡AQUÍ va tu logo!
├── package.json
├── scripts/
│   └── generate-images.mjs
└── public/
    ├── icon-192.png         ← Se genera automáticamente
    ├── icon-512.png         ← Se genera automáticamente
    ├── apple-icon.png       ← Se genera automáticamente
    └── ...                  ← (más imágenes)
```

---

## 💡 Consejos Adicionales

### Para Logos con Texto

Si tu logo incluye texto:

- **Mínimo 32px** de altura para el texto
- Fuente sans-serif (mejor legibilidad)
- Alto contraste (texto blanco sobre oscuro o viceversa)

### Para Logos con Iconos

- Iconos simples y geométricos funcionan mejor
- Evita líneas muy delgadas (<2px)
- Usa colores sólidos en lugar de gradientes complejos

### Para Logos Complejos

Si tu logo es complejo:

- Considera crear una versión simplificada
- Mantén solo elementos esenciales
- Aumenta el grosor de líneas

---

## 🚀 Siguiente Paso

Una vez que tengas tu `logo.png` listo:

```bash
pnpm generate:images
```

¡Y todas tus imágenes SEO estarán listas! 🎉

---

## 📚 Referencias

- **Optimización PNG**: [TinyPNG](https://tinypng.com/)
- **Editor online**: [Photopea](https://www.photopea.com/)
- **SVG to PNG**: [CloudConvert](https://cloudconvert.com/svg-to-png)
- **Image specs**:
  [Web.dev Image Guide](https://web.dev/fast/#optimize-your-images)

---

**¿Necesitas ayuda?** Consulta `docs/GENERATE-SEO-IMAGES.md`
