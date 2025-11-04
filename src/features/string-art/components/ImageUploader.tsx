'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Crop } from 'lucide-react';
import { useStringArtStore } from '../store/stringArtStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ImageCropper } from './ImageCropper';

export function ImageUploader() {
  const { image, setImage } = useStringArtStore();
  const [cropperOpen, setCropperOpen] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Create image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      setTempImageUrl(url);
      setCropperOpen(true); // Open cropper automatically
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
    },
    maxFiles: 1,
    multiple: false,
  });

  const handleCropComplete = (croppedImageUrl: string) => {
    // Load cropped image to get dimensions
    const img = new Image();
    img.onload = () => {
      setImage({
        url: croppedImageUrl,
        width: img.width,
        height: img.height,
      });
      setTempImageUrl(null);
    };
    img.src = croppedImageUrl;
  };

  const removeImage = () => {
    setImage(null);
  };

  const openCropper = () => {
    if (image) {
      setTempImageUrl(image.url);
      setCropperOpen(true);
    }
  };

  if (image) {
    return (
      <>
        <Card className='relative overflow-hidden'>
          <img
            src={image.url}
            alt='Uploaded'
            className='w-full h-auto max-h-[400px] object-contain'
          />
          <div className='absolute top-2 right-2 flex gap-2'>
            <Button
              variant='secondary'
              size='icon'
              onClick={openCropper}
              title='Crop image'>
              <Crop className='h-4 w-4' />
            </Button>
            <Button
              variant='destructive'
              size='icon'
              onClick={removeImage}
              title='Remove image'>
              <X className='h-4 w-4' />
            </Button>
          </div>
          <div className='p-4 text-sm text-muted-foreground'>
            {image.width} × {image.height} px
          </div>
        </Card>

        {tempImageUrl && (
          <ImageCropper
            imageSrc={tempImageUrl}
            open={cropperOpen}
            onOpenChange={setCropperOpen}
            onCropComplete={handleCropComplete}
            aspect={1} // Square crop for string art
          />
        )}
      </>
    );
  }

  return (
    <>
      <Card
        {...getRootProps()}
        className={`
          border-2 border-dashed cursor-pointer transition-colors
          ${
            isDragActive
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50'
          }
        `}>
        <input {...getInputProps()} />
        <div className='flex flex-col items-center justify-center p-12 text-center'>
          <Upload className='h-12 w-12 text-muted-foreground mb-4' />
          <p className='text-lg font-medium mb-2'>
            {isDragActive ? 'Drop the image here' : 'Upload image'}
          </p>
          <p className='text-sm text-muted-foreground'>
            Drag and drop or click to select
          </p>
          <p className='text-xs text-muted-foreground mt-2'>
            Supports PNG, JPG, JPEG, WebP
          </p>
        </div>
      </Card>

      {tempImageUrl && (
        <ImageCropper
          imageSrc={tempImageUrl}
          open={cropperOpen}
          onOpenChange={setCropperOpen}
          onCropComplete={handleCropComplete}
          aspect={1} // Square crop for string art
        />
      )}
    </>
  );
}
