import type { PinPlacementShape } from '@/types/stringArt';
import React from 'react';

import { ImageCropper } from '../cropper/ImageCropper';
import { ImageLoader } from './ImageLoader';

import type { Area as PixelCropArea } from 'react-easy-crop';

interface ImagePanelProps {
  originalImageSrc: string | null;
  showCropper: boolean;
  pinShape: PinPlacementShape;
  onImageUploaded: (data: { originalFileUrl: string }) => void;
  onImageUploadError: (error: string) => void;
  onCropConfirmed: (croppedAreaPixels: PixelCropArea) => Promise<void>;
  onShowCropperChange: (show: boolean) => void;
}

export const ImagePanel: React.FC<ImagePanelProps> = ({
  originalImageSrc,
  showCropper,
  pinShape,
  onImageUploaded,
  onImageUploadError,
  onCropConfirmed,
  onShowCropperChange,
}) => {
  return (
    <>
      <div>
        <h2 className='text-xl font-semibold mb-3 text-card-foreground'>
          1. Cargar Imagen
        </h2>
        <ImageLoader
          onImageProcessed={onImageUploaded}
          onProcessingError={onImageUploadError}
        />
      </div>

      <ImageCropper
        imageSrc={originalImageSrc}
        open={showCropper}
        onOpenChange={onShowCropperChange}
        onCropComplete={onCropConfirmed}
        targetAspect={1}
        activePinShape={pinShape}
      />
    </>
  );
};
