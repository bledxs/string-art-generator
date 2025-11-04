#!/usr/bin/env node

/**
 * Script para generar todas las imágenes necesarias para SEO y PWA
 * desde el logo.png de la raíz del proyecto
 *
 * Uso: node scripts/generate-images.mjs
 */

import sharp from 'sharp';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const publicDir = join(rootDir, 'public');

// Configuración de las imágenes a generar
const images = [
  // Favicons e iconos
  {
    name: 'icon-192.png',
    width: 192,
    height: 192,
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 1 },
  },
  {
    name: 'icon-512.png',
    width: 512,
    height: 512,
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 1 },
  },
  {
    name: 'apple-icon.png',
    width: 180,
    height: 180,
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 1 },
  },
  {
    name: 'favicon-96x96.png',
    width: 96,
    height: 96,
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 1 },
  },
  {
    name: 'favicon.ico',
    width: 32,
    height: 32,
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 1 },
    format: 'ico',
  },

  // Web App Manifest
  {
    name: 'web-app-manifest-192x192.png',
    width: 192,
    height: 192,
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 1 },
  },
  {
    name: 'web-app-manifest-512x512.png',
    width: 512,
    height: 512,
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 1 },
  },

  // Social Media (Open Graph y Twitter)
  {
    name: 'opengraph-image.png',
    width: 1200,
    height: 630,
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 1 },
    composite: true, // Logo centrado con texto
  },
  {
    name: 'twitter-image.png',
    width: 1200,
    height: 630,
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 1 },
    composite: true,
  },
];

// Screenshots (estos requieren un enfoque diferente - placeholders por ahora)
const screenshots = [
  {
    name: 'screenshot-wide.png',
    width: 1280,
    height: 720,
    text: 'String Art Generator\nCreate beautiful string art from images',
    isScreenshot: true,
  },
  {
    name: 'screenshot-narrow.png',
    width: 750,
    height: 1334,
    text: 'String Art Generator\nCreate beautiful string art from images',
    isScreenshot: true,
  },
];

/**
 * Genera una imagen con texto (para screenshots y social media)
 */
async function generateImageWithText(config) {
  const { name, width, height, text, isScreenshot } = config;
  const outputPath = join(publicDir, name);

  try {
    const logoPath = join(rootDir, 'logo.png');

    if (!existsSync(logoPath)) {
      console.error('❌ No se encontró logo.png en la raíz del proyecto');
      return;
    }

    // Leer el logo
    const logoBuffer = await sharp(logoPath)
      .resize(Math.floor(width * 0.4), Math.floor(width * 0.4), {
        fit: 'contain',
      })
      .png()
      .toBuffer();

    const logoMetadata = await sharp(logoBuffer).metadata();

    // Crear fondo negro
    let image = sharp({
      create: {
        width,
        height,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 1 },
      },
    });

    // SVG para el texto
    const lines = text.split('\n');
    const fontSize = isScreenshot ? 48 : 64;
    const lineHeight = fontSize * 1.4;
    const totalTextHeight = lines.length * lineHeight;
    const logoHeight = logoMetadata.height || 200;
    const spacing = 40;

    // Calcular posiciones
    const totalHeight = logoHeight + spacing + totalTextHeight;
    const startY = (height - totalHeight) / 2;
    const logoY = startY;
    const textStartY = logoY + logoHeight + spacing;

    const textSvg = `
      <svg width="${width}" height="${height}">
        ${lines
          .map(
            (line, index) => `
          <text 
            x="${width / 2}" 
            y="${textStartY + index * lineHeight}" 
            font-family="Arial, sans-serif" 
            font-size="${fontSize}" 
            font-weight="bold" 
            fill="white" 
            text-anchor="middle"
            dominant-baseline="middle"
          >${line}</text>
        `,
          )
          .join('')}
      </svg>
    `;

    // Componer imagen con logo y texto
    await image
      .composite([
        {
          input: logoBuffer,
          top: Math.floor(logoY),
          left: Math.floor((width - logoMetadata.width) / 2),
        },
        {
          input: Buffer.from(textSvg),
          top: 0,
          left: 0,
        },
      ])
      .png()
      .toFile(outputPath);

    console.log(`✅ Generado: ${name}`);
  } catch (error) {
    console.error(`❌ Error generando ${name}:`, error.message);
  }
}

/**
 * Genera imágenes de iconos simples
 */
async function generateIcon(config) {
  const { name, width, height, fit, background, format } = config;
  const logoPath = join(rootDir, 'logo.png');
  const outputPath = join(publicDir, name);

  if (!existsSync(logoPath)) {
    console.error('❌ No se encontró logo.png en la raíz del proyecto');
    return;
  }

  try {
    let pipeline = sharp(logoPath).resize(width, height, {
      fit: fit || 'contain',
      background: background || { r: 0, g: 0, b: 0, alpha: 0 },
    });

    // Aplicar formato específico si es necesario
    if (format === 'ico') {
      // Para ICO, primero convertimos a PNG y luego a ICO
      await pipeline.png().toFile(outputPath.replace('.ico', '.png'));
      // Nota: Sharp no soporta ICO directamente, usar el PNG generado
      console.log(
        `⚠️  ${name}: Sharp no genera .ico directamente. Usar favicon-96x96.png o convertir manualmente.`,
      );
      return;
    } else {
      await pipeline.png().toFile(outputPath);
    }

    console.log(`✅ Generado: ${name}`);
  } catch (error) {
    console.error(`❌ Error generando ${name}:`, error.message);
  }
}

/**
 * Genera imágenes con composición (logo + texto centrado)
 */
async function generateCompositeImage(config) {
  const { name, width, height, background } = config;
  await generateImageWithText({
    name,
    width,
    height,
    text: 'String Art Generator\nTransform images into beautiful string art',
    isScreenshot: false,
  });
}

/**
 * Función principal
 */
async function main() {
  console.log('🎨 Iniciando generación de imágenes...\n');

  const logoPath = join(rootDir, 'logo.png');

  if (!existsSync(logoPath)) {
    console.error('❌ ERROR: No se encontró logo.png en la raíz del proyecto');
    console.error('   Por favor, coloca el archivo logo.png en:', rootDir);
    process.exit(1);
  }

  console.log('📁 Logo encontrado:', logoPath);
  console.log('📁 Directorio de salida:', publicDir);
  console.log('');

  // Generar iconos simples
  console.log('🔷 Generando iconos...');
  for (const config of images) {
    if (config.composite) {
      await generateCompositeImage(config);
    } else {
      await generateIcon(config);
    }
  }

  console.log('\n📸 Generando screenshots...');
  for (const config of screenshots) {
    await generateImageWithText(config);
  }

  console.log('\n✨ ¡Proceso completado!');
  console.log('\n📋 Imágenes generadas:');
  console.log(
    '   - Iconos: icon-192.png, icon-512.png, apple-icon.png, favicon-96x96.png',
  );
  console.log(
    '   - Manifest: web-app-manifest-192x192.png, web-app-manifest-512x512.png',
  );
  console.log('   - Social: opengraph-image.png, twitter-image.png');
  console.log('   - Screenshots: screenshot-wide.png, screenshot-narrow.png');
  console.log(
    '\n⚠️  Nota: favicon.ico debe ser convertido manualmente o usa favicon-96x96.png',
  );
}

// Ejecutar script
main().catch(console.error);
