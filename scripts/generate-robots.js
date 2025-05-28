import path from "path";
import fs from "fs";

const baseURL = 'https://string-art-generator-three.vercel.app'; // 🔄 CAMBIAR por tu dominio real

export function generateRobotsTxt() {
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

  const robotsPath = path.resolve(__dirname, '../public/robots.txt');
  
  try {
    fs.writeFileSync(robotsPath, robotsContent, 'utf8');
    console.log('✅ robots.txt generado exitosamente!');
    console.log(`📁 Ubicación: ${robotsPath}`);
    return robotsPath;
  } catch (error) {
    console.error('❌ Error generando robots.txt:', error.message);
    return null;
  }
}