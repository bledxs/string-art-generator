'use client';

import { Progress } from '@/components/ui/progress';
import { useStringArtContext } from '@/context/string-art-context';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function StatusPanel() {
  const { managers, state, progress } = useStringArtContext();
  const { imageManager, errorManager } = managers;
  const { isGenerating, statusMessage } = state;
  const { error } = errorManager;

  useEffect(() => {
    if (error) {
      toast.error('Error', {
        description: error,
        duration: 5000,
      });
    }
  }, [error]);

  useEffect(() => {
    if (
      !error &&
      imageManager.processedImagePreviewUrl &&
      !isGenerating &&
      !imageManager.showCropper &&
      !statusMessage.startsWith('¡Generación completada!')
    ) {
      toast.success('Imagen Recortada Lista', {
        description: 'La imagen está lista para generar el string art.',
        duration: 3000,
      });
    }
  }, [
    error,
    imageManager.processedImagePreviewUrl,
    isGenerating,
    imageManager.showCropper,
    statusMessage,
  ]);

  useEffect(() => {
    if (
      !isGenerating &&
      statusMessage &&
      statusMessage.startsWith('¡Generación completada!')
    ) {
      toast.success('¡Generación Completada!', {
        description: 'El string art se ha generado exitosamente.',
        duration: 4000,
      });
    }
  }, [isGenerating, statusMessage]);

  if (!isGenerating) {
    return null;
  }

  return (
    <div className='space-y-1'>
      <Progress value={progress} className='w-full h-2' />
      <p className='text-xs text-muted-foreground text-center'>
        {statusMessage}
      </p>
    </div>
  );
}
