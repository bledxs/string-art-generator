// Server Component - Google Adsense Slot Wrapper
// Ready for future ad integration

interface AdSlotProps {
  slot: 'header' | 'sidebar' | 'footer' | 'inline';
  className?: string;
}

export function AdSlot({ slot, className = '' }: AdSlotProps) {
  // Ad slots disabled by default
  // Set NEXT_PUBLIC_ENABLE_ADS=true in .env to enable
  const adsEnabled = process.env.NEXT_PUBLIC_ENABLE_ADS === 'true';

  if (!adsEnabled) {
    return null;
  }

  // TODO: Add Google Adsense script in layout when ready
  // TODO: Configure ad slot IDs in environment variables

  return (
    <div
      className={`ad-slot ad-slot-${slot} ${className}`}
      data-ad-slot={slot}
      aria-label='Advertisement'>
      {/* Google Adsense code will go here */}
      <div className='min-h-[90px] flex items-center justify-center bg-muted/20 rounded text-xs text-muted-foreground'>
        Ad Space ({slot})
      </div>
    </div>
  );
}
