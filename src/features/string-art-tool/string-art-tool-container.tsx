import { StringArtProvider } from '@/context/string-art-context';
import { StringArtControlsContainer } from './string-art-controls-container';
import { StringArtToolClient } from './string-art-tool-client';
import { Card } from '@/components/ui/card';

interface StringArtToolContainerProps {
  canvasWidth?: number;
  canvasHeight?: number;
}

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
