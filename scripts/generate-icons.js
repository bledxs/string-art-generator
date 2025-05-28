// ==========================================
// VERSIÓN CORREGIDA PARA WINDOWS - scripts/generate-icons.js
// ==========================================

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Equivalente a __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración
const INPUT_IMAGE = 'public/logo.png'; // Tu imagen base
const OUTPUT_DIR = 'public';

// Tamaños requeridos
const iconSizes = [
  { width: 16, height: 16, name: 'favicon-16x16.png' },
  { width: 32, height: 32, name: 'favicon-32x32.png' },
  { width: 180, height: 180, name: 'apple-touch-icon.png' },
  { width: 192, height: 192, name: 'android-chrome-192x192.png' },
  { width: 512, height: 512, name: 'android-chrome-512x512.png' }
];

// Imágenes para redes sociales
const socialImages = [
  { width: 1200, height: 630, name: 'og-image.jpg', background: '#1a202c' },
  { width: 1200, height: 600, name: 'twitter-image.jpg', background: '#1a202c' }
];

async function validateInputImage() {
  console.log('🔍 Validando imagen de entrada...');
  
  const projectRoot = path.resolve(__dirname, '..');
  const inputPath = path.join(projectRoot, INPUT_IMAGE);
  
  console.log(`📂 Buscando: ${inputPath}`);
  
  if (!fs.existsSync(inputPath)) {
    console.error(`❌ No se encontró ${INPUT_IMAGE} en la raíz del proyecto`);
    console.log('\n💡 Opciones:');
    console.log('   1. Coloca tu logo como "logo.png" en la raíz del proyecto');
    console.log('   2. O modifica INPUT_IMAGE en el script para usar otra ruta');
    
    // Mostrar archivos en la raíz para ayudar al debugging
    console.log('\n📁 Archivos en la raíz del proyecto:');
    try {
      const files = fs.readdirSync(projectRoot);
      const imageFiles = files.filter(f => /\.(png|jpg|jpeg|svg|webp)$/i.test(f));
      if (imageFiles.length > 0) {
        imageFiles.forEach(file => console.log(`   🖼️  ${file}`));
        console.log('\n💡 Puedes usar uno de estos archivos cambiando INPUT_IMAGE');
      } else {
        console.log('   (No se encontraron archivos de imagen)');
      }
    } catch (error) {
      console.log('   (Error listando archivos)');
    }
    
    return false;
  }
  
  try {
    const metadata = await sharp(inputPath).metadata();
    console.log(`✅ Imagen encontrada: ${metadata.width}x${metadata.height} - ${metadata.format}`);
    
    if (metadata.width < 200 || metadata.height < 200) {
      console.warn('⚠️  La imagen es pequeña (recomendado: mínimo 512x512px)');
    }
    
    if (!['png', 'jpg', 'jpeg', 'webp'].includes(metadata.format)) {
      console.warn(`⚠️  Formato ${metadata.format} puede no ser óptimo (recomendado: PNG)`);
    }
    
    return true;
  } catch (error) {
    console.error(`❌ Error leyendo la imagen: ${error.message}`);
    return false;
  }
}

async function generateIcons() {
  try {
    console.log('🚀 Iniciando generación de iconos...');
    
    // Resolver rutas desde la raíz del proyecto
    const projectRoot = path.resolve(__dirname, '..');
    const inputPath = path.join(projectRoot, INPUT_IMAGE);
    const outputPath = path.join(projectRoot, OUTPUT_DIR);
    
    console.log(`📂 Imagen base: ${inputPath}`);
    console.log(`📁 Directorio salida: ${outputPath}`);
    
    // Crear directorio si no existe
    if (!fs.existsSync(outputPath)) {
      console.log('📁 Creando directorio public/...');
      fs.mkdirSync(outputPath, { recursive: true });
    }

    // Obtener información de la imagen base
    const metadata = await sharp(inputPath).metadata();
    console.log(`📐 Imagen original: ${metadata.width}x${metadata.height} - ${metadata.format}`);

    // Generar iconos de app
    console.log('\n📱 Generando iconos de aplicación...');
    for (const size of iconSizes) {
      const outputFile = path.join(outputPath, size.name);
      
      console.log(`   ⏳ Procesando ${size.name}...`);
      
      await sharp(inputPath)
        .resize(size.width, size.height, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 } // Fondo transparente
        })
        .png()
        .toFile(outputFile);
      
      // Obtener tamaño del archivo
      const stats = fs.statSync(outputFile);
      console.log(`   ✅ ${size.name} (${size.width}x${size.height}) - ${(stats.size / 1024).toFixed(1)}KB`);
    }

    // Generar favicon adicional (copia del 32x32)
    console.log('\n🌐 Generando favicon principal...');
    const faviconPath = path.join(outputPath, 'favicon.png');
    await sharp(inputPath)
      .resize(32, 32, { fit: 'contain' })
      .png()
      .toFile(faviconPath);
    console.log(`✅ favicon.png (32x32)`);

    // Generar imágenes para redes sociales
    console.log('\n📱 Generando imágenes para redes sociales...');
    for (const social of socialImages) {
      const outputFile = path.join(outputPath, social.name);
      
      console.log(`   ⏳ Procesando ${social.name}...`);
      
      // Calcular dimensiones del logo centrado
      const logoMaxWidth = Math.floor(social.width * 0.6);
      const logoMaxHeight = Math.floor(social.height * 0.6);
      
      // Redimensionar logo manteniendo aspecto
      const resizedLogo = await sharp(inputPath)
        .resize(logoMaxWidth, logoMaxHeight, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .toBuffer();
      
      // Obtener dimensiones del logo redimensionado
      const logoMetadata = await sharp(resizedLogo).metadata();
      
      // Calcular posición para centrar
      const x = Math.floor((social.width - logoMetadata.width) / 2);
      const y = Math.floor((social.height - logoMetadata.height) / 2);
      
      // Crear imagen final con fondo y logo centrado
      await sharp({
        create: {
          width: social.width,
          height: social.height,
          channels: 3,
          background: social.background
        }
      })
      .composite([{
        input: resizedLogo,
        left: x,
        top: y
      }])
      .jpeg({ quality: 90 })
      .toFile(outputFile);
      
      const stats = fs.statSync(outputFile);
      console.log(`   ✅ ${social.name} (${social.width}x${social.height}) - ${(stats.size / 1024).toFixed(1)}KB`);
    }

    console.log('\n🎉 ¡Todos los iconos generados exitosamente!');
    
    // Mostrar resumen final
    console.log('\n📋 Resumen de archivos generados:');
    const allFiles = [
      ...iconSizes.map(s => s.name),
      'favicon.png',
      ...socialImages.map(s => s.name)
    ];
    
    let totalSize = 0;
    allFiles.forEach(filename => {
      const filePath = path.join(outputPath, filename);
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        const sizeKB = stats.size / 1024;
        totalSize += sizeKB;
        console.log(`   📄 ${filename.padEnd(25)} ${sizeKB.toFixed(1).padStart(6)}KB`);
      }
    });
    
    console.log(`   ${''.padEnd(32, '─')}`);
    console.log(`   📊 Total: ${allFiles.length} archivos - ${totalSize.toFixed(1)}KB`);
    
    console.log('\n✨ ¡Listo! Ahora puedes usar estos archivos en tu aplicación.');

  } catch (error) {
    console.error('\n❌ Error generando iconos:', error.message);
    console.error('📚 Stack trace:', error.stack);
    console.error('\n🔍 Posibles soluciones:');
    console.error('   • Verifica que logo.png existe en la raíz del proyecto');
    console.error('   • Asegúrate de que sharp está instalado: npm install sharp');
    console.error('   • Verifica permisos de escritura en la carpeta public/');
    process.exit(1);
  }
}

// ==========================================
// FUNCIÓN PRINCIPAL CON DEBUGGING MEJORADO
// ==========================================

async function main() {
  console.log('🎨 Generador de Iconos - String Art App');
  console.log('=====================================\n');
  
  // Debug info
  console.log('🔧 Información del sistema:');
  console.log(`   Node.js: ${process.version}`);
  console.log(`   Plataforma: ${process.platform}`);
  console.log(`   Directorio actual: ${process.cwd()}`);
  console.log(`   Script: ${__filename}\n`);
  
  // Verificar dependencias
  console.log('📦 Verificando dependencias...');
  try {
    const sharpInfo = sharp.format;
    console.log('✅ Sharp cargado correctamente');
    console.log(`   Formatos soportados: ${Object.keys(sharpInfo).join(', ')}\n`);
  } catch (error) {
    console.error('❌ Error con Sharp:', error.message);
    console.error('🔧 Ejecuta: npm install sharp --save-dev');
    process.exit(1);
  }
  
  // Validar imagen antes de procesar
  const isValid = await validateInputImage();
  if (!isValid) {
    process.exit(1);
  }
  
  // Generar iconos
  await generateIcons();
  
  console.log('\n🏁 Proceso completado exitosamente!');
}

// ==========================================
// EJECUCIÓN - Método más robusto para Windows
// ==========================================

// Detectar si se ejecuta directamente (método más robusto)
const isMainModule = () => {
  // Método 1: Comparar URLs
  const moduleURL = new URL(import.meta.url);
  const mainURL = new URL(`file://${process.argv[1]}`);
  
  if (moduleURL.href === mainURL.href) {
    return true;
  }
  
  // Método 2: Comparar paths (más confiable en Windows)
  const modulePath = fileURLToPath(import.meta.url);
  const mainPath = path.resolve(process.argv[1]);
  
  return modulePath === mainPath;
};

// Ejecutar si es el módulo principal
if (isMainModule()) {
  main().catch(error => {
    console.error('\n💥 Error fatal:', error.message);
    console.error('📚 Stack trace completo:', error.stack);
    process.exit(1);
  });
}

// Export para uso como módulo
export { generateIcons, validateInputImage };

// ==========================================
// VERSIÓN SIMPLE DE EMERGENCIA
// ==========================================

// Si el script de arriba no funciona, prueba esta versión minimalista:
// Guardar como scripts/generate-icons-simple.js

/*
import sharp from 'sharp';
import fs from 'fs';

console.log('🚀 Iniciando...');

const sizes = [16, 32, 180, 192, 512];

if (!fs.existsSync('logo.png')) {
  console.error('❌ No se encontró logo.png');
  process.exit(1);
}

if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
}

for (const size of sizes) {
  const name = size === 180 ? 'apple-touch-icon.png' : 
               size === 192 ? 'android-chrome-192x192.png' :
               size === 512 ? 'android-chrome-512x512.png' :
               `favicon-${size}x${size}.png`;
  
  await sharp('logo.png')
    .resize(size, size)
    .png()
    .toFile(`public/${name}`);
  
  console.log(`✅ ${name}`);
}

console.log('🎉 ¡Completado!');
*/