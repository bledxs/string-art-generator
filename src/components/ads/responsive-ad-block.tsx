'use client';

import { AdBlock } from './ad-block';
import { useAds } from '@/hooks/use-ads';

interface ResponsiveAdBlockProps {
  position: 'sidebar' | 'footer' | 'header' | 'content';
  className?: string;
}

const AD_CONFIGS = {
  sidebar: {
    slot: process.env.NEXT_PUBLIC_ADSENSE_AD_SLOT_ID_SIDEBAR!,
    format: 'vertical',
    minHeight: '250px',
  },
  footer: {
    slot: process.env.NEXT_PUBLIC_ADSENSE_AD_SLOT_ID_FOOTER!,
    format: 'horizontal',
    minHeight: '100px',
  },
  header: {
    slot: process.env.NEXT_PUBLIC_ADSENSE_AD_SLOT_ID_HEADER!,
    format: 'horizontal',
    minHeight: '90px',
  },
  content: {
    slot: process.env.NEXT_PUBLIC_ADSENSE_AD_SLOT_ID_CONTENT!,
    format: 'rectangle',
    minHeight: '280px',
  },
};

export function ResponsiveAdBlock({
  position,
  className,
}: ResponsiveAdBlockProps) {
  const { canShowAds } = useAds();
  const config = AD_CONFIGS[position];

  if (!canShowAds || !config.slot) {
    return null;
  }

  return (
    <AdBlock
      adClient={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID!}
      adSlot={config.slot}
      adFormat={config.format}
      responsive={true}
      className={className}
      minHeight={config.minHeight}
    />
  );
}
