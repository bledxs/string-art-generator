import { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';

import { Button } from '../../ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { Label } from '../../ui/label';
import { Slider } from '../../ui/slider';

import type { Point, Area } from 'react-easy-crop';
import type { PinPlacementShape } from '@/types/stringArt';

interface ImageCropperProps {
  imageSrc: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCropComplete: (croppedAreaPixels: Area) => void;
  targetAspect?: number;
  activePinShape: PinPlacementShape;
}

export function ImageCropper({
  imageSrc,
  open,
  onOpenChange,
  onCropComplete,
  targetAspect = 1 / 1,
  activePinShape,
}: ImageCropperProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixelsInternal, setCroppedAreaPixelsInternal] =
    useState<Area | null>(null);

  const onInternalCropComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixelsInternal(croppedAreaPixels);
    },
    [],
  );

  const handleConfirmCrop = () => {
    if (croppedAreaPixelsInternal) {
      onCropComplete(croppedAreaPixelsInternal);
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  if (!imageSrc && open) {
    onOpenChange(false);
    return null;
  }
  if (!imageSrc) return null;

  const cropperDisplayShape: 'rect' | 'round' =
    activePinShape === 'circle' ? 'round' : 'rect';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className='
        p-0 flex flex-col 
        w-[95vw] h-[90vh] max-h-[calc(100vh-4rem)] 
        sm:w-[90vw] sm:max-w-[1000px] 
        md:h-[85vh] md:max-h-[700px] 
        lg:max-w-[1200px] lg:h-[80vh] lg:max-h-[800px]
        overflow-hidden {/* Mantenemos overflow-hidden en el DialogContent principal */}
      '>
        <DialogHeader className='p-4 border-b flex-shrink-0'>
          <DialogTitle>Recortar Imagen</DialogTitle>
        </DialogHeader>

        {/* PARENT A: Quitamos overflow-hidden de aquí para probar */}
        <div className='flex-grow p-4 flex flex-col min-h-0'>
          {/* PARENT B (Directo del Cropper): Este SÍ necesita overflow-hidden y position:relative */}
          <div className='relative flex-grow w-full bg-muted-foreground/10 rounded-md overflow-hidden'>
            {imageSrc && (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={targetAspect}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onInternalCropComplete}
                cropShape={cropperDisplayShape} // Opcional: si es cuadrado, el crop puede ser redondo
                showGrid
              />
            )}
          </div>

          <div className='pt-4 flex-shrink-0'>
            <Label htmlFor='zoomSliderCropper' className='text-sm block mb-1'>
              Zoom:
            </Label>
            <Slider
              id='zoomSliderCropper'
              min={0.5}
              max={5}
              step={0.01}
              value={[zoom]}
              onValueChange={(value) => setZoom(value[0])}
            />
          </div>
        </div>

        <DialogFooter className='p-4 border-t gap-2 flex-shrink-0'>
          <Button type='button' variant='outline' onClick={handleCancel}>
            Cancelar
          </Button>
          <Button
            type='button'
            onClick={handleConfirmCrop}
            disabled={!croppedAreaPixelsInternal}>
            Confirmar Recorte
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
