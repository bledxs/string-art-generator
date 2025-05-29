'use client';

import { useEffect, useState } from 'react';
import { useImageManager } from '@/hooks/use-image-manager';
import { useStringArtGenerator } from '@/hooks/use-string-art-generator';
import { useStringArtParameters } from '@/hooks/use-string-art-parameters';
import { useErrorHandler } from './use-error-handler';
import { usePresetsManager } from './use-presets-manager';

export function useStringArtState(canvasWidth: number, canvasHeight: number) {
  const [showBaseImageInCanvas, setShowBaseImageInCanvas] =
    useState<boolean>(true);

  const imageManager = useImageManager(canvasWidth, canvasHeight);
  const parametersManager = useStringArtParameters(canvasWidth, canvasHeight);
  const errorManager = useErrorHandler();
  const presetsManager = usePresetsManager()

  const {
    generatedThreads,
    isGenerating,
    statusMessage,
    progress,
    startGeneration,
    cancelGeneration,
    resetGenerator,
  } = useStringArtGenerator({
    grayscaleMatrix: imageManager.processedGrayscaleMatrix,
    pins: parametersManager.pins,
    numThreadsToGenerate: parametersManager.config.numThreads,
  });

  useEffect(() => {
    if (
      !isGenerating &&
      generatedThreads?.length > 0 &&
      statusMessage.startsWith('¡Generación completada!')
    ) {
      setShowBaseImageInCanvas(false);
    }
  }, [isGenerating, generatedThreads?.length, statusMessage]);

  return {
    canvasProps: {
      imageToDisplayUrl: imageManager.processedImagePreviewUrl,
      scaledImageDetails: imageManager.processedScaledDetails,
      numPins: parametersManager.config.numPins,
      pinShape: parametersManager.config.pinShape,
      actualPins: parametersManager.pins,
      threadsToDraw: generatedThreads,
      threadDrawOpacity: parametersManager.config.threadOpacity,
      displayBaseImage: showBaseImageInCanvas,
      threadWidth: parametersManager.config.threadWidth,
    },
    managers: {
      imageManager,
      parametersManager,
      errorManager,
      presetsManager,
    },
    state: {
      isGenerating,
      statusMessage,
    },
    actions: {
      startGeneration,
      resetGenerator,
      cancelGeneration,
      setShowBaseImageInCanvas,
      clearError: errorManager.clearError,
    },
    progress,
  };
}
