import { StringArtProvider } from '@/context/string-art-context';
import { StringArtControlsContainer } from './string-art-controls-container';
import { StringArtToolClient } from './string-art-tool-client';
import { Card } from '@/components/ui/card';
import { AdBlock } from '@/components/ads/ad-block';
import { ResponsiveAdBlock } from '@/components/ads/responsive-ad-block';

interface StringArtToolContainerProps {
  canvasWidth?: number;
  canvasHeight?: number;
}

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID!;
const AD_SLOT_ID_SIDEBAR = process.env.NEXT_PUBLIC_ADSENSE_AD_SLOT_ID_SIDEBAR!;

export function StringArtToolContainer({
  canvasWidth = 600,
  canvasHeight = 600,
}: StringArtToolContainerProps) {
  return (
    <StringArtProvider canvasWidth={canvasWidth} canvasHeight={canvasHeight}>
      <main className='container mx-auto p-4'>
        {/* Layout responsive: mobile stack, desktop lado a lado */}
        <div className='flex flex-col lg:flex-row gap-6'>
          {/* Panel de controles - scrolleable */}
          <aside className='w-full lg:w-96 lg:max-h-screen lg:overflow-y-auto'>
            <Card className='p-4 sm:p-6 rounded-lg space-y-6'>
              <StringArtControlsContainer />
            </Card>
            {/* Anuncio en sidebar */}
            <div className='border-t pt-6'>
              <h3 className='text-sm font-medium text-muted-foreground mb-3 text-center'>
                Publicidad
              </h3>
              <ResponsiveAdBlock position='sidebar' className='w-full' />
            </div>
          </aside>

          {/* Canvas - fijo en desktop */}
          <div className='flex-1 lg:sticky lg:top-4 lg:h-fit'>
            <Card className='p-4 sm:p-6 rounded-lg'>
              <StringArtToolClient
                canvasWidth={canvasWidth}
                canvasHeight={canvasHeight}
              />
            </Card>
          </div>
        </div>
      </main>
    </StringArtProvider>
  );
}
