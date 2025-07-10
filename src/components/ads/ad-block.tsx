'use client';

import { useEffect, useRef } from 'react';

interface AdBlockProps {
  adClient: string;
  adSlot: string;
  adFormat?: string;
  responsive?: boolean;
  className?: string;
  minHeight?: string;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdBlock({
  adClient,
  adSlot,
  adFormat = 'auto',
  responsive = true,
  className = '',
  minHeight = '100px',
  style = {},
}: Readonly<AdBlockProps>) {
  const adRef = useRef<HTMLModElement>(null);
  const isAdPushed = useRef(false);

  useEffect(() => {
    // Solo cargar anuncios en producción
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    // Verificar que tenemos los datos del anuncio
    if (!adClient || !adSlot) {
      console.warn('AdBlock: Missing adClient or adSlot');
      return;
    }

    try {
      // Cargar script de AdSense si no está cargado
      if (!window.adsbygoogle) {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);

        window.adsbygoogle = [];
      }

      // Push del anuncio
      if (!isAdPushed.current && adRef.current) {
        try {
          window.adsbygoogle = window.adsbygoogle || [];
          window.adsbygoogle.push({});
          isAdPushed.current = true;
        } catch (error) {
          console.error('Error pushing ad:', error);
        }
      }
    } catch (error) {
      console.error('Error loading AdSense:', error);
    }
  }, [adClient, adSlot]);

  // En desarrollo, mostrar placeholder
  if (process.env.NODE_ENV !== 'development') {
    return (
      <div
        className={`bg-muted border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center ${className}`}
        style={{ minHeight, ...style }}>
        <div className='text-center text-muted-foreground'>
          <div className='text-sm font-medium'>AdSense Placeholder</div>
          <div className='text-xs'>Slot: {adSlot}</div>
          <div className='text-xs'>Format: {adFormat}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={className} style={{ minHeight, ...style }}>
      <ins
        ref={adRef}
        className='adsbygoogle'
        style={{
          display: 'block',
          minHeight,
          ...style,
        }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
}
