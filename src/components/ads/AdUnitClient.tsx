/**
 * Client-Compatible Ad Unit
 * Can be used within Client Components
 */

'use client';

import { useEffect, useRef, useState } from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!adsEnabled) return;

    // Wait for container to have width before pushing ad
    const checkWidth = () => {
      if (containerRef.current && containerRef.current.offsetWidth > 0) {
        setIsReady(true);
      } else {
        // Retry after a short delay
        setTimeout(checkWidth, 100);
      }
    };

    checkWidth();
  }, [adsEnabled]);

  useEffect(() => {
    if (!adsEnabled || !isReady) return;

    try {
      // Push ad only when container is ready
      if (window.adsbygoogle) {
        (window.adsbygoogle as any[]).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, [adsEnabled, isReady]);

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
      ref={containerRef}
      className={`${className} ${minHeight} flex items-center justify-center bg-background`}>
      {isReady && (
        <ins
          className='adsbygoogle'
          style={{ display: 'block', minHeight: 'inherit', width: '100%' }}
          data-ad-client={publisherId}
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive={fullWidthResponsive.toString()}
        />
      )}
    </div>
  );
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}
