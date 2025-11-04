'use client';

// Image Cropper Dialog Component
import { useState, useCallback } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { getCroppedImg } from '../utils/cropImage';

interface ImageCropperProps {
  imageSrc: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCropComplete: (croppedImage: string) => void;
  aspect?: number;
}

export function ImageCropper({
  imageSrc,
  open,
  onOpenChange,
  onCropComplete,
  aspect = 1, // Square by default
}: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropChange = useCallback((location: { x: number; y: number }) => {
    setCrop(location);
  }, []);

  const onZoomChange = useCallback((zoom: number) => {
    setZoom(zoom);
  }, []);

  const onRotationChange = useCallback((rotation: number) => {
    setRotation(rotation);
  }, []);

  const onCropCompleteInternal = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const handleCrop = async () => {
    if (!croppedAreaPixels) return;

    try {
      setIsProcessing(true);
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation,
      );
      onCropComplete(croppedImage);
      onOpenChange(false);

      // Reset state
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setRotation(0);
    } catch (error) {
      console.error('Error cropping image:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    // Reset state
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-3xl h-[80vh] flex flex-col'>
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
          <DialogDescription>
            Adjust the crop area, zoom and rotation of your image
          </DialogDescription>
        </DialogHeader>

        {/* Cropper Area */}
        <div className='relative flex-1 bg-muted rounded-lg overflow-hidden'>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspect}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onRotationChange={onRotationChange}
            onCropComplete={onCropCompleteInternal}
            style={{
              containerStyle: {
                backgroundColor: 'hsl(var(--muted))',
              },
            }}
          />
        </div>

        {/* Controls */}
        <div className='space-y-4 py-4'>
          {/* Zoom Control */}
          <div className='space-y-2'>
            <div className='flex justify-between items-center'>
              <Label className='text-sm font-medium'>Zoom</Label>
              <span className='text-sm text-muted-foreground'>
                {zoom.toFixed(1)}x
              </span>
            </div>
            <Slider
              value={[zoom]}
              min={1}
              max={3}
              step={0.1}
              onValueChange={(value) => setZoom(value[0])}
              className='w-full'
            />
          </div>

          {/* Rotation Control */}
          <div className='space-y-2'>
            <div className='flex justify-between items-center'>
              <Label className='text-sm font-medium'>Rotation</Label>
              <span className='text-sm text-muted-foreground'>{rotation}°</span>
            </div>
            <Slider
              value={[rotation]}
              min={0}
              max={360}
              step={1}
              onValueChange={(value) => setRotation(value[0])}
              className='w-full'
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant='outline'
            onClick={handleCancel}
            disabled={isProcessing}>
            Cancel
          </Button>
          <Button onClick={handleCrop} disabled={isProcessing}>
            {isProcessing ? 'Processing...' : 'Apply Crop'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
