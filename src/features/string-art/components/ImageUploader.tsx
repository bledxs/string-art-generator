'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import { useStringArtStore } from '../store/stringArtStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function ImageUploader() {
  const { image, setImage } = useStringArtStore();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      // Create image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;

        // Get image dimensions
        const img = new Image();
        img.onload = () => {
          setImage({
            url,
            width: img.width,
            height: img.height,
            file,
          });
        };
        img.src = url;
      };
      reader.readAsDataURL(file);
    },
    [setImage],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
    },
    maxFiles: 1,
    multiple: false,
  });

  const removeImage = () => {
    setImage(null);
  };

  if (image) {
    return (
      <Card className='relative overflow-hidden'>
        <img
          src={image.url}
          alt='Uploaded'
          className='w-full h-auto max-h-[400px] object-contain'
        />
        <Button
          variant='destructive'
          size='icon'
          className='absolute top-2 right-2'
          onClick={removeImage}>
          <X className='h-4 w-4' />
        </Button>
        <div className='p-4 text-sm text-muted-foreground'>
          {image.width} × {image.height} px
        </div>
      </Card>
    );
  }

  return (
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
          {isDragActive ? 'Drop image here' : 'Upload an image'}
        </p>
        <p className='text-sm text-muted-foreground'>
          Drag & drop or click to select
        </p>
        <p className='text-xs text-muted-foreground mt-2'>
          Supports PNG, JPG, JPEG, WebP
        </p>
      </div>
    </Card>
  );
}
