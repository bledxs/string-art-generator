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

  return (
    <div className={className}>
      <ins
        className='adsbygoogle'
        style={{ display: 'block' }}
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
