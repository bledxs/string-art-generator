export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'StringArt Pro - Generador de String Art',
    description:
      'Herramienta profesional en línea para generar patrones de String Art a partir de imágenes. Exporta instrucciones paso a paso y visualiza en tiempo real.',
    url: 'https://www.stringartgenerator.app',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Person',
      name: 'Tu Nombre',
    },
    keywords: 'string art, arte con hilos, generador, patrones, nail art',
    inLanguage: 'es',
    isAccessibleForFree: true,
    browserRequirements: 'Requires HTML5 and JavaScript',
    softwareVersion: '1.0.0',
    features: [
      'Generación automática de patrones',
      'Exportación de instrucciones',
      'Visualización en tiempo real',
      'Soporte para múltiples formatos',
      'Configuración personalizable',
    ],
    screenshot:
      'https://www.stringartgenerator.app/screenshots/main-interface.jpg',
    datePublished: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '150',
    },
  };

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
