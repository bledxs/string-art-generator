'use client';

import { Button } from '@/components/ui/button';
import { useStringArtContext } from '@/context/string-art-context';

export function GenerationPanel() {
  const { managers, state, actions, progress } = useStringArtContext();
  const { imageManager } = managers;
  const { isGenerating } = state;
  const { startGeneration, cancelGeneration } = actions;

  const handleGenerateClick = async () => {
    if (startGeneration) {
      await startGeneration();
    }
  };

  const canGenerate =
    imageManager.processedGrayscaleMatrix &&
    !isGenerating &&
    !imageManager.showCropper;

  return (
    <div>
      <h2 className='text-xl font-semibold mb-3 text-card-foreground'>
        5. Generar String Art
      </h2>
      <div className='space-y-3'>
        <Button
          onClick={handleGenerateClick}
          disabled={!canGenerate}
          className='w-full'>
          {isGenerating
            ? `Generando (${progress.toFixed(0)}%)...`
            : 'Generar String Art'}
        </Button>

        {isGenerating && (
          <Button
            onClick={cancelGeneration}
            variant='destructive'
            className='w-full'>
            Cancelar Generación
          </Button>
        )}

        {!imageManager.processedGrayscaleMatrix && (
          <p className='text-sm text-muted-foreground text-center'>
            Selecciona y recorta una imagen para comenzar.
          </p>
        )}
      </div>
    </div>
  );
}
