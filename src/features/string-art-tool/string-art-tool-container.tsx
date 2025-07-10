import { StringArtProvider } from '@/context/string-art-context';
import { StringArtControlsContainer } from './string-art-controls-container';
import { StringArtToolClient } from './string-art-tool-client';
import { Card } from '@/components/ui/card';
import { ResponsiveAdBlock } from '@/components/ads/responsive-ad-block';
import { StringArtHeader } from '../header/string-art-header';
import { StringArtFooter } from '../footer/string-art-footer';

interface StringArtToolContainerProps {
  canvasWidth?: number;
  canvasHeight?: number;
}

export function StringArtToolContainer({
  canvasWidth = 600,
  canvasHeight = 600,
}: Readonly<StringArtToolContainerProps>) {
  return (
    <StringArtProvider canvasWidth={canvasWidth} canvasHeight={canvasHeight}>
      <div className="flex flex-col lg:flex-row lg:h-screen bg-background">
        {/* Sidebar for Desktop */}
        <aside className="hidden lg:flex lg:flex-col w-full lg:w-[450px] lg:flex-shrink-0 lg:h-full lg:overflow-y-auto p-4 sm:p-6 space-y-6">
          <StringArtHeader />
          <Card className="p-4 sm:p-6 rounded-lg space-y-6 flex-grow">
            <StringArtControlsContainer />
          </Card>
          <div className="border-t pt-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-3 text-center">
              Publicidad
            </h3>
            <ResponsiveAdBlock position="sidebar" className="w-full" />
          </div>
          <StringArtFooter />
        </aside>

        {/* Main Content (Canvas) for Desktop */}
        <main className="hidden lg:flex flex-1 items-center justify-center p-4 lg:overflow-hidden">
          <Card className="p-4 sm:p-6 rounded-lg shadow-lg">
            <StringArtToolClient
              canvasWidth={canvasWidth}
              canvasHeight={canvasHeight}
            />
          </Card>
        </main>

        {/* Layout for Mobile */}
        <div className="lg:hidden w-full p-4 space-y-6">
          <StringArtHeader />
          <Card className="p-4 sm:p-6 rounded-lg">
            <StringArtControlsContainer />
          </Card>
          <div className="border-t pt-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-3 text-center">
              Publicidad
            </h3>
            <ResponsiveAdBlock position="sidebar" className="w-full" />
          </div>
          <Card className="p-4 sm:p-6 rounded-lg">
            <StringArtToolClient
              canvasWidth={canvasWidth}
              canvasHeight={canvasHeight}
            />
          </Card>
          <StringArtFooter />
        </div>
      </div>
    </StringArtProvider>
  );
}