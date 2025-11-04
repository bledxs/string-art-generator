import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editor - String Art Generator',
  description:
    'Create your string art pattern. Upload an image, adjust parameters, and generate beautiful string art patterns.',
  robots: {
    index: false, // Editor no necesita indexación
    follow: true,
  },
};

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
