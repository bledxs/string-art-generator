import { Metadata } from 'next';

import { StructuredData } from '@/components/seo/structured-data';
import { StringArtFooter } from '@/features/footer/string-art-footer';
import { StringArtHeader } from '@/features/header/string-art-header';
import { StringArtToolContainer } from '@/features/string-art-tool/string-art-tool-container';

export const metadata: Metadata = {
  title: 'Generador de String Art - Crea Arte con Hilos Online | StringArt Pro',
  description:
    'Herramienta profesional para generar String Art. Convierte cualquier imagen en patrones de hilos paso a paso. Exporta instrucciones, secuencias JSON y visualiza en tiempo real.',
  openGraph: {
    title: 'Generador de String Art - Crea Arte con Hilos Online',
    description:
      'Transforma cualquier imagen en patrones de String Art profesionales. Herramienta gratuita con exportación de instrucciones paso a paso.',
    images: ['/og-image-home.jpg'],
  },
};

export default function StringArtPage() {
  return (
    <>
      <StructuredData />
      <StringArtHeader />
      <StringArtToolContainer />
      <StringArtFooter />
    </>
  );
}
