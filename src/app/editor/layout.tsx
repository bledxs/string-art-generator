import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Editor - String Art Generator',
  description:
    'Create your string art pattern. Upload an image, adjust parameters, and generate beautiful string art patterns.',
  robots: {
    index: false, // Editor doesn't need indexing
    follow: true,
  },
  alternates: {
    canonical: `${siteConfig.url}/editor`,
  },
  openGraph: {
    title: 'String Art Editor',
    description: 'Create string art patterns from your images',
    url: `${siteConfig.url}/editor`,
  },
};

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className='h-screen overflow-hidden'>{children}</div>;
}
