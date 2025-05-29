'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export function AdSenseProvider() {
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    // Inicializar AdSense después de cargar
    if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
          {},
        );
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, []);

  return (
    <>
      {process.env.NODE_ENV === 'production' && adsenseClientId && (
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
          crossOrigin='anonymous'
          strategy='afterInteractive'
        />
      )}

      {/* Google AdSense meta tag */}
      <meta
        name='google-adsense-account'
        content={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
      />
    </>
  );
}
