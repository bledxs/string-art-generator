import type { Metadata, Viewport } from 'next';
import './globals.css';

import { Geist, Geist_Mono } from 'next/font/google';

import { Toaster } from '@/components/ui/sonner';
import Script from 'next/script';
import { AdSenseProvider } from '@/providers/adsense-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export const metadata: Metadata = {
  // Básicos
  title: {
    default:
      'Generador de String Art - Crea Arte con Hilos Online | StringArt Pro',
    template: '%s | StringArt Pro',
  },
  description:
    'Herramienta profesional para generar String Art. Convierte cualquier imagen en patrones de hilos paso a paso. Exporta instrucciones, secuencias JSON y visualiza en tiempo real.',
  keywords: [
    'string art',
    'arte con hilos',
    'generador string art',
    'patrones hilos',
    'nail art',
    'arte geométrico',
    'herramienta online',
    'React',
    'TypeScript',
    'Next.js',
  ],
  authors: [{ name: 'Tu Nombre' }],
  creator: 'Tu Nombre',

  // Robots y crawling
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // URLs
  metadataBase: new URL('https://www.stringartgenerator.app'),
  alternates: {
    canonical: '/',
    languages: {
      es: '/',
      en: '/en',
      'x-default': '/',
    },
  },

  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://www.stringartgenerator.app',
    siteName: 'StringArt Pro',
    title: 'Generador de String Art - Crea Arte con Hilos Online',
    description:
      'Transforma cualquier imagen en patrones de String Art profesionales. Herramienta gratuita con exportación de instrucciones paso a paso.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Generador de String Art - Ejemplo de patrón generado',
        type: 'image/jpeg',
      },
    ],
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    site: '@tu_usuario',
    creator: '@tu_usuario',
    title: 'Generador de String Art - Crea Arte con Hilos Online',
    description:
      'Herramienta profesional para generar String Art. Convierte imágenes en patrones de hilos con instrucciones detalladas.',
    images: [
      {
        url: '/twitter-image.jpg',
        alt: 'Captura del Generador de String Art en acción',
      },
    ],
  },

  // Iconos
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },

  // Manifest
  manifest: '/site.webmanifest',

  // Otros
  formatDetection: {
    telephone: false,
  },

  // Verificación (si tienes)
  verification: {
    google: 'tu-codigo-de-verificacion-google',
    // otros: 'otros-codigos'
  },

  // Categorización
  category: 'technology',
  classification: 'Design Application',

  // App específicos
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'StringArt Pro',
  },

  // PWA
  applicationName: 'StringArt Pro',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <html lang='es'>
      <head>
        {/* DNS Prefetch */}
        <link rel='dns-prefetch' href='//fonts.googleapis.com' />
        <link rel='dns-prefetch' href='//fonts.gstatic.com' />
        <link rel='dns-prefetch' href='//cdnjs.cloudflare.com' />

        {/* AdSense DNS Prefetch */}
        {adsenseClientId && (
          <>
            <link rel='dns-prefetch' href='//pagead2.googlesyndication.com' />
            <link rel='dns-prefetch' href='//googleads.g.doubleclick.net' />
          </>
        )}

        {/* Preconnect */}
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin=''
        />

        {/* Google Fonts */}
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap'
          rel='stylesheet'
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <main className='grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-4 sm:p-8 md:p-12 lg:p-16'>
          <AdSenseProvider />
          {children}
          <Toaster position='top-right' richColors closeButton />
        </main>
      </body>
    </html>
  );
}
