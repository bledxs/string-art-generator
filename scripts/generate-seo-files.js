// ==========================================
// SCRIPTS/GENERATE-SEO-FILES.JS - Versión Autocontenida
// ==========================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Equivalente a __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================
// CONFIGURACIÓN GLOBAL
// ==========================================

const baseURL = 'https://www.stringartgenerator.app'; // 🔄 CAMBIAR por tu dominio real

const config = {
  // Configuración del sitemap
  sitemap: {
    outputPath: '../public/sitemap.xml',
    encoding: 'UTF-8',
    xmlDeclaration: '<?xml version="1.0" encoding="UTF-8"?>',
    namespace: 'http://www.sitemaps.org/schemas/sitemap/0.9',
  },
  // Configuración del robots.txt
  robots: {
    outputPath: '../public/robots.txt',
    encoding: 'UTF-8',
  },
};

// Páginas del sitio
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

// ==========================================
// FUNCIONES DE VALIDACIÓN
// ==========================================

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

// ==========================================
// GENERADOR DE SITEMAP
// ==========================================

function generateSitemap() {
  console.log('📍 Generando sitemap...');

  try {
    // Validar configuración
    if (!baseURL || baseURL === 'https://www.stringartgenerator.app') {
      console.warn('⚠️  Recuerda actualizar baseURL con tu dominio real');
    }

    // Filtrar y validar páginas
    const validPages = pages.filter((page) => {
      const isValid = validatePage(page);
      if (isValid) {
        console.log(`   ✅ Página válida: ${baseURL}${page.url}`);
      }
      return isValid;
    });

    if (validPages.length === 0) {
      throw new Error('❌ No hay páginas válidas para generar el sitemap');
    }

    // Generar XML del sitemap
    const sitemap = `${config.sitemap.xmlDeclaration}
<urlset xmlns="${config.sitemap.namespace}">
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
    const outputPath = path.resolve(__dirname, config.sitemap.outputPath);
    const outputDir = path.dirname(outputPath);

    // Crear directorio si no existe
    if (!fs.existsSync(outputDir)) {
      console.log(`   📁 Creando directorio: ${outputDir}`);
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Escribir archivo
    fs.writeFileSync(outputPath, sitemap, 'utf8');

    // Verificar resultado
    const stats = fs.statSync(outputPath);
    console.log(`   ✅ Sitemap generado: ${outputPath}`);
    console.log(`   📊 Tamaño: ${(stats.size / 1024).toFixed(2)}KB`);
    console.log(`   🔗 URLs incluidas: ${validPages.length}`);

    return {
      success: true,
      path: outputPath,
      urlCount: validPages.length,
      size: stats.size,
    };
  } catch (error) {
    console.error(`   ❌ Error generando sitemap: ${error.message}`);
    return {
      success: false,
      error: error.message,
    };
  }
}

// ==========================================
// GENERADOR DE ROBOTS.TXT
// ==========================================

function generateRobotsTxt() {
  console.log('🤖 Generando robots.txt...');

  try {
    const robotsContent = `# Robots.txt para String Art Generator
User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseURL}/sitemap.xml

# Optimizaciones de crawling
Crawl-delay: 1

# Bloquear archivos que no deben ser indexados
Disallow: /api/
Disallow: /*.json$
Disallow: /assets/
Disallow: /node_modules/
Disallow: /.git/

# Permitir archivos de imágenes importantes
Allow: /og-image.jpg
Allow: /twitter-image.jpg
Allow: /favicon*
Allow: /apple-touch-icon.png
Allow: /android-chrome*

# Información adicional
# Sitio web: ${baseURL}
# Última actualización: ${new Date().toISOString().split('T')[0]}
`;

    const outputPath = path.resolve(__dirname, config.robots.outputPath);
    const outputDir = path.dirname(outputPath);

    // Crear directorio si no existe
    if (!fs.existsSync(outputDir)) {
      console.log(`   📁 Creando directorio: ${outputDir}`);
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Escribir archivo
    fs.writeFileSync(outputPath, robotsContent, 'utf8');

    // Verificar resultado
    const stats = fs.statSync(outputPath);
    console.log(`   ✅ robots.txt generado: ${outputPath}`);
    console.log(`   📊 Tamaño: ${(stats.size / 1024).toFixed(2)}KB`);

    return {
      success: true,
      path: outputPath,
      size: stats.size,
    };
  } catch (error) {
    console.error(`   ❌ Error generando robots.txt: ${error.message}`);
    return {
      success: false,
      error: error.message,
    };
  }
}

// ==========================================
// VALIDADOR DE ARCHIVOS GENERADOS
// ==========================================

function validateGeneratedFiles() {
  console.log('🔍 Validando archivos generados...');

  /** @type {{ sitemap: boolean, robots: boolean, errors: string[] }} */
  const results = {
    sitemap: false,
    robots: false,
    errors: [],
  };

  // Validar sitemap
  const sitemapPath = path.resolve(__dirname, config.sitemap.outputPath);
  if (fs.existsSync(sitemapPath)) {
    try {
      const content = fs.readFileSync(sitemapPath, 'utf8');
      const urlCount = (content.match(/<url>/g) || []).length;

      if (urlCount > 0) {
        console.log(`   ✅ Sitemap válido encontrado (${urlCount} URLs)`);
        results.sitemap = true;
      } else {
        console.log('   ❌ Sitemap encontrado pero sin URLs válidas');
        results.errors.push('Sitemap sin URLs válidas');
      }
    } catch (error) {
      console.log(`   ❌ Error leyendo sitemap: ${error.message}`);
      results.errors.push(`Error leyendo sitemap: ${error.message}`);
    }
  } else {
    console.log('   ❌ Sitemap no encontrado');
    results.errors.push('Sitemap no encontrado');
  }

  // Validar robots.txt
  const robotsPath = path.resolve(__dirname, config.robots.outputPath);
  if (fs.existsSync(robotsPath)) {
    try {
      const content = fs.readFileSync(robotsPath, 'utf8');

      if (content.includes('Sitemap:') && content.includes(baseURL)) {
        console.log('   ✅ robots.txt válido encontrado');
        results.robots = true;
      } else {
        console.log('   ⚠️  robots.txt encontrado pero puede tener problemas');
        results.robots = true; // Asumir válido pero con warning
      }
    } catch (error) {
      console.log(`   ❌ Error leyendo robots.txt: ${error.message}`);
      results.errors.push(`Error leyendo robots.txt: ${error.message}`);
    }
  } else {
    console.log('   ❌ robots.txt no encontrado');
    results.errors.push('robots.txt no encontrado');
  }

  return results;
}

// ==========================================
// FUNCIÓN PRINCIPAL
// ==========================================

async function generateAllSEOFiles() {
  console.log('🚀 Generando todos los archivos SEO...');
  console.log('=====================================\n');

  // Debug info
  console.log('🔧 Información del sistema:');
  console.log(`   Node.js: ${process.version}`);
  console.log(`   Plataforma: ${process.platform}`);
  console.log(`   Directorio actual: ${process.cwd()}`);
  console.log(`   Script: ${__filename}\n`);

  /** @type {{ sitemap: boolean, robots: boolean, errors: string[] }} */
  const results = {
    sitemap: false,
    robots: false,
    errors: [],
  };

  try {
    // 1. Generar sitemap
    console.log('1️⃣ Generando sitemap...');
    const sitemapResult = generateSitemap();
    results.sitemap = sitemapResult.success;
    if (!sitemapResult.success) {
      results.errors.push(sitemapResult.error);
    }

    // 2. Generar robots.txt
    console.log('\n2️⃣ Generando robots.txt...');
    const robotsResult = generateRobotsTxt();
    results.robots = robotsResult.success;
    if (!robotsResult.success) {
      results.errors.push(robotsResult.error);
    }

    // 3. Validar resultados
    console.log('\n3️⃣ Validando archivos generados...');
    const validation = validateGeneratedFiles();

    // Combinar resultados
    results.sitemap = results.sitemap && validation.sitemap;
    results.robots = results.robots && validation.robots;
    results.errors = [...results.errors, ...validation.errors];

    // 4. Mostrar resumen final
    console.log('\n📋 Resumen de generación:');
    console.log('========================');

    if (results.sitemap && results.robots && results.errors.length === 0) {
      console.log('🎉 ¡Todos los archivos SEO generados exitosamente!');
      console.log('\n📂 Archivos creados:');
      console.log('   ✅ public/sitemap.xml');
      console.log('   ✅ public/robots.txt');

      console.log('\n🔗 URLs para verificar (cuando tengas dominio):');
      console.log(`   • ${baseURL}/sitemap.xml`);
      console.log(`   • ${baseURL}/robots.txt`);

      console.log('\n💡 Próximos pasos:');
      console.log('   1. Actualiza baseURL con tu dominio real');
      console.log('   2. Verifica los archivos en public/');
      console.log('   3. Envía sitemap a Google Search Console');
      console.log('   4. Testa las URLs cuando tengas el sitio online');
    } else {
      console.log('⚠️  Generación completada con algunos problemas:');
      console.log(`   Sitemap: ${results.sitemap ? '✅' : '❌'}`);
      console.log(`   Robots.txt: ${results.robots ? '✅' : '❌'}`);

      if (results.errors.length > 0) {
        console.log('\n❌ Errores encontrados:');
        results.errors.forEach((error, index) => {
          console.log(`   ${index + 1}. ${error}`);
        });
      }
    }
  } catch (error) {
    console.error('\n💥 Error crítico en generación SEO:', error.message);
    console.error('📚 Stack trace:', error.stack);
    results.errors.push(error.message);
  }

  console.log('\n🏁 Proceso completado!');
  return results;
}

// ==========================================
// EJECUCIÓN DIRECTA
// ==========================================

// Ejecutar directamente sin detección condicional
generateAllSEOFiles().catch((error) => {
  console.error('💥 Error fatal:', error.message);
  process.exit(1);
});

// Exports para uso como módulo
export { generateAllSEOFiles, generateSitemap, generateRobotsTxt };

// ==========================================
// PACKAGE.JSON - Scripts sugeridos
// ==========================================

/*
Agregar estos scripts a package.json:

{
  "scripts": {
    "generate:seo": "node scripts/generate-seo-files.js",
    "generate:sitemap": "node scripts/generate-sitemap.js",
    "build:seo": "npm run generate:seo && npm run build",
    "dev:seo": "npm run generate:seo && npm run dev"
  }
}

COMANDOS PARA USAR:

# Generar todos los archivos SEO
pnpm generate:seo

# Build con SEO incluido
pnpm build:seo

# Development con SEO
pnpm dev:seo
*/