/**
 * AdUnit Component - Server Component
 * Generic Google AdSense ad unit that can be placed anywhere
 */

import { adsConfig } from '@/lib/ads-config';

type AdSlot = keyof typeof adsConfig.slots;

interface AdUnitProps {
  slot: AdSlot;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  fullWidthResponsive?: boolean;
  className?: string;
}

export function AdUnit({
  slot,
  format = 'auto',
  fullWidthResponsive = true,
  className = '',
}: AdUnitProps) {
  // Only show ads in production or when explicitly enabled
  const adsEnabled = process.env.NEXT_PUBLIC_ENABLE_ADS === 'true';

  if (!adsEnabled) {
    return null;
  }

  const slotId = adsConfig.slots[slot];

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
        data-ad-client={adsConfig.publisherId}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: '(adsbygoogle = window.adsbygoogle || []).push({});',
        }}
      />
    </div>
  );
}
