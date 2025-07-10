'use client';

import { useEffect, useState, useCallback } from 'react';

interface UseAdsOptions {
  enabled?: boolean;
  clientId?: string;
}

export function useAds(options: UseAdsOptions = {}) {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    enabled = process.env.NODE_ENV === 'production',
    clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID,
  } = options;

  useEffect(() => {
    if (!enabled || !clientId) {
      return;
    }

    if (window.adsbygoogle) {
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      window.adsbygoogle = window.adsbygoogle || [];
      setIsScriptLoaded(true);
    };
    script.onerror = () => setError('Error al cargar AdSense');
    document.head.appendChild(script);

    return () => {
      // Clean up script if component unmounts
      const existingScript = document.querySelector(`script[src*="${clientId}"]`);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [enabled, clientId]);

  useEffect(() => {
    if (isScriptLoaded) {
      // Delay to ensure content is rendered before showing ads
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 500); // 500ms delay

      return () => clearTimeout(timer);
    }
  }, [isScriptLoaded]);

  const refreshAd = useCallback(() => {
    if (window.adsbygoogle && isReady) {
      try {
        window.adsbygoogle.push({});
      } catch (e) {
        console.error('Error refreshing ad:', e);
      }
    }
  }, [isReady]);

  return {
    isLoaded: isReady,
    error,
    refreshAd,
    canShowAds: enabled && !!clientId && isReady,
  };
}
