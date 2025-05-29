import { useCallback, useEffect, useState } from 'react';

import { getCroppedImageData, processCroppedImageForStringArt } from '@/lib/image-utils';

import type { GrayscaleMatrix, ScaledImageDetails } from '../types/string-art';
import type { Area as PixelCropArea } from 'react-easy-crop';

interface ImageState {
  originalImageSrc: string | null;
  processedGrayscaleMatrix: GrayscaleMatrix | null;
  processedScaledDetails: ScaledImageDetails | null;
  processedImagePreviewUrl: string | null;
  showCropper: boolean;
}

export const useImageManager = (targetWidth: number, targetHeight: number) => {
  const [imageState, setImageState] = useState<ImageState>({
    originalImageSrc: null,
    processedGrayscaleMatrix: null,
    processedScaledDetails: null,
    processedImagePreviewUrl: null,
    showCropper: false,
  });

  const handleImageUploaded = useCallback(
    (data: { originalFileUrl: string }) => {
      // Cleanup previous image
      if (imageState.originalImageSrc?.startsWith('blob:')) {
        URL.revokeObjectURL(imageState.originalImageSrc);
      }

      setImageState((prev) => ({
        ...prev,
        originalImageSrc: data.originalFileUrl,
        showCropper: true,
        processedGrayscaleMatrix: null,
        processedScaledDetails: null,
        processedImagePreviewUrl: null,
      }));
    },
    [imageState.originalImageSrc],
  );

  const handleCropConfirmed = useCallback(
    async (croppedAreaPixels: PixelCropArea) => {
      if (!imageState.originalImageSrc) {
        throw new Error('No hay imagen original para recortar.');
      }

      setImageState((prev) => ({ ...prev, showCropper: false }));

      const croppedImageData = await getCroppedImageData(
        imageState.originalImageSrc,
        croppedAreaPixels,
      );

      if (!croppedImageData) {
        throw new Error('Fallo la obtención de datos de la imagen recortada.');
      }

      const processedResult = await processCroppedImageForStringArt(
        croppedImageData,
        targetWidth,
        targetHeight,
      );

      if (!processedResult) {
        throw new Error('Fallo el procesamiento de la imagen recortada.');
      }

      // Cleanup previous preview
      if (imageState.processedImagePreviewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(imageState.processedImagePreviewUrl);
      }

      setImageState((prev) => ({
        ...prev,
        processedGrayscaleMatrix: processedResult.grayscaleMatrix,
        processedScaledDetails: processedResult.scaledDetails,
        processedImagePreviewUrl: processedResult.previewUrl,
      }));
    },
    [
      imageState.originalImageSrc,
      imageState.processedImagePreviewUrl,
      targetWidth,
      targetHeight,
    ],
  );

  const resetImageState = useCallback(() => {
    // Cleanup URLs
    if (imageState.originalImageSrc?.startsWith('blob:')) {
      URL.revokeObjectURL(imageState.originalImageSrc);
    }
    if (imageState.processedImagePreviewUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(imageState.processedImagePreviewUrl);
    }

    setImageState({
      originalImageSrc: null,
      processedGrayscaleMatrix: null,
      processedScaledDetails: null,
      processedImagePreviewUrl: null,
      showCropper: false,
    });
  }, [imageState.originalImageSrc, imageState.processedImagePreviewUrl]);

  const setShowCropper = useCallback((show: boolean) => {
    setImageState((prev) => ({ ...prev, showCropper: show }));
  }, []);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (imageState.originalImageSrc?.startsWith('blob:')) {
        URL.revokeObjectURL(imageState.originalImageSrc);
      }
      if (imageState.processedImagePreviewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(imageState.processedImagePreviewUrl);
      }
    };
  }, [imageState.originalImageSrc, imageState.processedImagePreviewUrl]);

  return {
    ...imageState,
    handleImageUploaded,
    handleCropConfirmed,
    resetImageState,
    setShowCropper,
  };
};
