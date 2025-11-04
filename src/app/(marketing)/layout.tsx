import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'String Art Generator - Transform Images into String Art Patterns',
  description:
    'Create stunning string art patterns from any image. Free online tool with advanced algorithms. Export as PNG, SVG, JSON, or step-by-step instructions. Perfect for artists and DIY enthusiasts.',
  keywords: [
    'string art',
    'string art generator',
    'image to string art',
    'string art creator',
    'DIY string art',
    'algorithmic art',
    'generative art',
    'wall art',
    'pin and string',
  ],
  authors: [{ name: 'String Art Generator' }],
  creator: 'String Art Generator',
  publisher: 'String Art Generator',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://stringart.example.com',
    title: 'String Art Generator - Transform Images into String Art',
    description:
      'Create stunning string art patterns from any image using advanced algorithms. Free, fast, and powerful.',
    siteName: 'String Art Generator',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'String Art Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'String Art Generator - Transform Images into String Art',
    description:
      'Create stunning string art patterns from any image. Free online tool with advanced algorithms.',
    images: ['/og-image.png'],
    creator: '@stringartgen',
  },
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
  verification: {
    // Add your verification codes when ready
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
