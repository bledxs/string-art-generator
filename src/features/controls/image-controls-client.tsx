'use client';

import { useState } from 'react';
import { ImageCropperClient } from './atoms/image-cropper-client';
import type { Area as PixelCropArea } from 'react-easy-crop';
import { useStringArtContext } from '@/context/string-art-context';
import { ImageLoaderClient } from './atoms/image-loader-client';

export function ImageControlsClient() {
  const { managers, actions } = useStringArtContext();
  const { imageManager, parametersManager, errorManager } = managers;
  const { resetGenerator, clearError } = actions;

  const [showCropper, setShowCropper] = useState(false);

  const handleImageUploaded = (data: { originalFileUrl: string }) => {
    imageManager.handleImageUploaded(data);
    resetGenerator();
    setShowCropper(true); // Mostrar cropper automáticamente
    clearError();
  };

  const handleImageUploadError = (errorMessage: string) => {
    errorManager.showError(errorMessage);
    imageManager.resetImageState();
  };

  const handleCropConfirmed = async (croppedAreaPixels: PixelCropArea) => {
    await imageManager.handleCropConfirmed(croppedAreaPixels);
    setShowCropper(false);
  };

  return (
    <>
      <ImageLoaderClient
        onImageProcessed={handleImageUploaded}
        onProcessingError={handleImageUploadError}
      />

      <ImageCropperClient
        imageSrc={imageManager.originalImageSrc}
        open={showCropper}
        onOpenChange={setShowCropper}
        onCropComplete={handleCropConfirmed}
        targetAspect={1}
        activePinShape={parametersManager.config.pinShape}
      />
    </>
  );
}
