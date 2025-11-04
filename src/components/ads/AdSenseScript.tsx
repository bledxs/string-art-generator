/**
 * AdSense Script - Server Component
 * Loads Google AdSense script in the document head
 */

import Script from 'next/script';
import { adsConfig } from '@/lib/ads-config';

export function AdSenseScript() {
  // Only load script in production or when explicitly enabled
  const adsEnabled = process.env.NEXT_PUBLIC_ENABLE_ADS === 'true';

  if (!adsEnabled) {
    return null;
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsConfig.publisherId}`}
      crossOrigin='anonymous'
      strategy='afterInteractive'
    />
  );
}
