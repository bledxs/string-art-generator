import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.stringartgenerator.app';

  return {
    rules: [
      // Regla general para todos los bots
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // Reglas específicas para Googlebot
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      // Reglas específicas para Bingbot
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
