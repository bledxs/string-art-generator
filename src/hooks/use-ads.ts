'use client';

import { useEffect, useState } from 'react';

interface UseAdsOptions {
  enabled?: boolean;
  clientId?: string;
}

export function useAds(options: UseAdsOptions = {}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    enabled = process.env.NODE_ENV === 'production',
    clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID,
  } = options;

  useEffect(() => {
    if (!enabled || !clientId) {
      return;
    }

    // Verificar si AdSense ya está cargado
    if (window.adsbygoogle) {
      setIsLoaded(true);
      return;
    }

    const loadAdSense = async () => {
      try {
        // Cargar script de AdSense
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
        script.crossOrigin = 'anonymous';

        script.onload = () => {
          window.adsbygoogle = window.adsbygoogle || [];
          setIsLoaded(true);
        };

        script.onerror = () => {
          setError('Error al cargar AdSense');
        };

        document.head.appendChild(script);
      } catch (err) {
        setError('Error al inicializar AdSense');
        console.error('AdSense loading error:', err);
      }
    };

    loadAdSense();
  }, [enabled, clientId]);

  const refreshAd = (adSlot: string) => {
    if (window.adsbygoogle && isLoaded) {
      try {
        window.adsbygoogle.push({});
      } catch (error) {
        console.error('Error refreshing ad:', error);
      }
    }
  };

  return {
    isLoaded,
    error,
    refreshAd,
    canShowAds: enabled && !!clientId && isLoaded,
  };
}
