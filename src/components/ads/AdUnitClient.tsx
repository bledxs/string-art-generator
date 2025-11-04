/**
 * Client-Compatible Ad Unit
 * Can be used within Client Components
 */

'use client';

import { useEffect } from 'react';

interface AdUnitClientProps {
  publisherId: string;
  slotId: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  fullWidthResponsive?: boolean;
  className?: string;
}

export function AdUnitClient({
  publisherId,
  slotId,
  format = 'auto',
  fullWidthResponsive = true,
  className = '',
}: AdUnitClientProps) {
  // Only show ads in production or when explicitly enabled
  const adsEnabled = process.env.NEXT_PUBLIC_ENABLE_ADS === 'true';

  useEffect(() => {
    if (!adsEnabled) return;

    try {
      // Push ad when component mounts
      if (window.adsbygoogle) {
        (window.adsbygoogle as any[]).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, [adsEnabled]);

  if (!adsEnabled) {
    return null;
  }

  // Reserve space based on format to prevent layout shift
  const minHeight =
    format === 'horizontal'
      ? 'min-h-[90px]'
      : format === 'vertical'
      ? 'min-h-[600px]'
      : format === 'rectangle'
      ? 'min-h-[250px]'
      : 'min-h-[50px]';

  return (
    <div
      className={`${className} ${minHeight} flex items-center justify-center bg-muted/20`}>
      <ins
        className='adsbygoogle'
        style={{ display: 'block', minHeight: 'inherit' }}
        data-ad-client={publisherId}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}
