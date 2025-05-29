import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'StringArt Pro - Generador de String Art',
    short_name: 'StringArt Pro',
    description: 'Herramienta profesional para generar String Art',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['art', 'design', 'creativity'],
    screenshots: [
      {
        src: '/screenshots/desktop-main.png',
        type: 'image/jpeg',
        sizes: '1280x720',
        form_factor: 'wide',
      },
      {
        src: '/screenshots/mobile-main.png',
        type: 'image/jpeg',
        sizes: '750x1334',
        form_factor: 'narrow',
      },
    ],
  };
}
