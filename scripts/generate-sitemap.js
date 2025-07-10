import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Equivalente a __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración del sitemap
const baseURL = 'https://www.stringartgenerator.app'; // 🔄 CAMBIAR por tu dominio real
const pages = [
  {
    url: '',
    changefreq: 'weekly',
    priority: '1.0',
    lastmod: new Date().toISOString().split('T')[0],
  },
  // 📝 Agregar más páginas aquí si las tienes en el futuro
  // { url: '/about', changefreq: 'monthly', priority: '0.8' },
  // { url: '/help', changefreq: 'monthly', priority: '0.6' },
];

// Configuración avanzada
const config = {
  outputPath: '../public/sitemap.xml',
  encoding: 'UTF-8',
  xmlDeclaration: '<?xml version="1.0" encoding="UTF-8"?>',
  namespace: 'http://www.sitemaps.org/schemas/sitemap/0.9',
  includeImages: false,
  includeAlternates: false,
};

function validateURL(url) {
  try {
    new URL(baseURL + url);
    return true;
  } catch {
    console.warn(`⚠️  URL inválida detectada: ${baseURL + url}`);
    return false;
  }
}

function validatePage(page) {
  const validFrequencies = [
    'always',
    'hourly',
    'daily',
    'weekly',
    'monthly',
    'yearly',
    'never',
  ];
  const validPriority = parseFloat(page.priority);

  if (!validFrequencies.includes(page.changefreq)) {
    console.warn(
      `⚠️  Changefreq inválido para ${page.url}: ${page.changefreq}`,
    );
    return false;
  }

  if (isNaN(validPriority) || validPriority < 0 || validPriority > 1) {
    console.warn(`⚠️  Priority inválido para ${page.url}: ${page.priority}`);
    return false;
  }

  return validateURL(page.url);
}

async function generateSitemap() {
  try {
    console.log('🗺️  Generando sitemap...');
    console.log(`📍 Base URL: ${baseURL}`);
    console.log(`📄 Páginas a procesar: ${pages.length}`);

    // Debug info
    console.log('🔧 Información del sistema:');
    console.log(`   Node.js: ${process.version}`);
    console.log(`   Plataforma: ${process.platform}`);
    console.log(`   Directorio actual: ${process.cwd()}`);
    console.log(`   Script: ${__filename}\n`);

    // Validar configuración
    if (!baseURL || baseURL === 'https://www.stringartgenerator.app') {
      console.warn('⚠️  Recuerda actualizar baseURL con tu dominio real');
    }

    // Filtrar y validar páginas
    console.log('📋 Validando páginas...');
    const validPages = pages.filter((page) => {
      const isValid = validatePage(page);
      if (isValid) {
        console.log(`✅ Página válida: ${baseURL}${page.url}`);
      }
      return isValid;
    });

    if (validPages.length === 0) {
      throw new Error('❌ No hay páginas válidas para generar el sitemap');
    }

    // Generar XML del sitemap
    console.log('\n📝 Generando XML...');
    const sitemap = `${config.xmlDeclaration}
<urlset xmlns="${config.namespace}">
${validPages
  .map((page) => {
    const lastmod = page.lastmod || new Date().toISOString().split('T')[0];
    return `  <url>
    <loc>${baseURL}${page.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

    // Determinar ruta de salida
    const outputPath = path.resolve(__dirname, config.outputPath);
    const outputDir = path.dirname(outputPath);

    console.log(`📁 Directorio destino: ${outputDir}`);
    console.log(`📄 Archivo destino: ${outputPath}`);

    // Crear directorio si no existe
    if (!fs.existsSync(outputDir)) {
      console.log(`📁 Creando directorio: ${outputDir}`);
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Escribir archivo
    console.log('💾 Escribiendo archivo...');
    fs.writeFileSync(outputPath, sitemap, 'utf8');

    // Verificar resultado
    const stats = fs.statSync(outputPath);
    console.log(`✅ Sitemap generado exitosamente!`);
    console.log(`📁 Ubicación: ${outputPath}`);
    console.log(`📊 Tamaño: ${(stats.size / 1024).toFixed(2)}KB`);
    console.log(`🔗 URLs incluidas: ${validPages.length}`);

    // Mostrar preview del contenido
    console.log('\n📋 Preview del sitemap:');
    validPages.forEach((page, index) => {
      console.log(
        `   ${index + 1}. ${baseURL}${page.url} (${page.changefreq}, ${
          page.priority
        })`,
      );
    });

    // Mostrar contenido real del archivo
    console.log('\n📄 Contenido generado:');
    console.log('─'.repeat(50));
    console.log(sitemap);
    console.log('─'.repeat(50));

    // Información adicional
    console.log('\n💡 Próximos pasos:');
    console.log('   1. Verifica el sitemap en: public/sitemap.xml');
    console.log('   2. Actualiza robots.txt con la URL del sitemap');
    console.log('   3. Envía a Google Search Console cuando tengas dominio');

    return outputPath;
  } catch (error) {
    console.error('❌ Error generando sitemap:', error.message);
    console.error('📚 Stack trace:', error.stack);
    console.error('\n🔍 Posibles soluciones:');
    console.error('   • Verifica que la carpeta public/ existe');
    console.error('   • Revisa permisos de escritura');
    console.error('   • Confirma que baseURL es válido');
    throw error;
  }
}

function validateSitemap() {
  console.log('🔍 Validando sitemap existente...');

  const sitemapPath = path.resolve(__dirname, config.outputPath);
  console.log(`📂 Buscando: ${sitemapPath}`);

  if (!fs.existsSync(sitemapPath)) {
    console.log('❌ Sitemap no encontrado. Ejecuta la generación primero.');
    return false;
  }

  try {
    const content = fs.readFileSync(sitemapPath, 'utf8');
    const urlCount = (content.match(/<url>/g) || []).length;

    console.log('✅ Sitemap válido encontrado');
    console.log(`📊 URLs en sitemap: ${urlCount}`);
    console.log(`📁 Tamaño: ${(content.length / 1024).toFixed(2)}KB`);

    return true;
  } catch (error) {
    console.error('❌ Error leyendo sitemap:', error.message);
    return false;
  }
}

function addPage(url, changefreq = 'monthly', priority = '0.5') {
  const newPage = {
    url: url.startsWith('/') ? url : `/${url}`,
    changefreq,
    priority,
    lastmod: new Date().toISOString().split('T')[0],
  };

  if (validatePage(newPage)) {
    pages.push(newPage);
    console.log(`✅ Página agregada: ${baseURL}${newPage.url}`);
    return true;
  }

  return false;
}

// ==========================================
// FUNCIÓN PRINCIPAL - SIN DETECCIÓN AUTOMÁTICA
// ==========================================

async function main() {
  console.log('🗺️  Generador de Sitemap - String Art App');
  console.log('==========================================\n');

  try {
    await generateSitemap();
    console.log('\n🎉 ¡Proceso completado exitosamente!');
  } catch (error) {
    console.error('\n💥 Error fatal:', error.message);
    process.exit(1);
  }
}

// ==========================================
// EJECUCIÓN DIRECTA - SIEMPRE SE EJECUTA
// ==========================================

// Ejecutar directamente sin detección condicional
main().catch((error) => {
  console.error('💥 Error crítico:', error.message);
  process.exit(1);
});

// Exports para uso como módulo
export { generateSitemap, validateSitemap, addPage };