import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: 'String Art Generator - Transform Images into String Art Patterns',
    template: '%s | String Art Generator',
  },
  description:
    'Free online string art generator. Transform any image into stunning string art patterns using advanced algorithms. Export as PNG, SVG, JSON, or TXT. Perfect for artists, crafters, and hobbyists.',
  keywords: [
    'string art',
    'string art generator',
    'image to string art',
    'string art maker',
    'string art tool',
    'nail and thread art',
    'thread art generator',
    'DIY string art',
    'custom string art',
    'string art patterns',
    'string art design',
    'free string art tool',
    'online string art creator',
    'algorithmic art',
    'generative art',
    'craft patterns',
    'wall art generator',
    'geometric string art',
    'pin and string',
  ],
  authors: [{ name: 'String Art Generator Team' }],
  creator: 'String Art Generator',
  publisher: 'String Art Generator',
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
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['es_ES', 'fr_FR', 'de_DE'],
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'String Art Generator - Transform Images into Art',
    description:
      'Create stunning string art patterns from any image. Free online tool with advanced algorithms. Export in multiple formats.',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'String Art Generator Preview',
        type: 'image/png',
      },
      {
        url: siteConfig.ogSquare,
        width: 1200,
        height: 1200,
        alt: 'String Art Generator Square Preview',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.social.twitterHandle,
    creator: siteConfig.social.twitterHandle,
    title: 'String Art Generator - Transform Images into Art',
    description:
      'Create stunning string art patterns from any image with our free online tool.',
    images: [siteConfig.twitterImage],
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    other: {
      'msvalidate.01': 'your-bing-verification-code',
    },
  },
  appleWebApp: {
    capable: true,
    title: 'String Art Generator',
    statusBarStyle: 'black-translucent',
  },
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
  category: 'Design & Art',
  classification: 'Web Application',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'theme-color': '#000000',
    'msapplication-TileColor': '#000000',
    'msapplication-tap-highlight': 'no',
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
