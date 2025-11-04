'use client';

import { ImageUploader } from './ImageUploader';
import { ParametersPanel } from './ParametersPanel';
import { Canvas } from './Canvas';
import { useStringArtStore } from '../store/stringArtStore';
import { useStringArt } from '../hooks/useStringArt';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Loader2, Sparkles, StopCircle } from 'lucide-react';

export function EditorClient() {
  const { image, isProcessing, progress, result } = useStringArtStore();
  const { generate, cancel } = useStringArt();

  const canGenerate = image && !isProcessing;

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 h-full py-6'>
      {/* Left Column - Controls with internal scroll */}
      <div className='flex flex-col gap-4 h-full overflow-y-auto pr-2'>
        {/* Image Upload */}
        <div>
          <h2 className='text-xl font-semibold mb-3'>1. Upload Image</h2>
          <ImageUploader />
        </div>

        {/* Parameters */}
        <div>
          <h2 className='text-xl font-semibold mb-3'>2. Adjust Parameters</h2>
          <ParametersPanel />
        </div>

        {/* Generate Button */}
        <div>
          <h2 className='text-xl font-semibold mb-3'>3. Generate</h2>
          <Card className='p-4'>
            {!isProcessing ? (
              <Button
                onClick={generate}
                disabled={!canGenerate}
                className='w-full'
                size='lg'>
                <Sparkles className='h-5 w-5 mr-2' />
                Generate String Art
              </Button>
            ) : (
              <div className='space-y-3'>
                <Button
                  onClick={cancel}
                  variant='destructive'
                  className='w-full'
                  size='lg'>
                  <StopCircle className='h-5 w-5 mr-2' />
                  Cancel
                </Button>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-muted-foreground'>Processing...</span>
                    <span className='font-medium'>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
              </div>
            )}

            {!image && (
              <p className='text-sm text-muted-foreground mt-3 text-center'>
                Upload an image to start
              </p>
            )}
          </Card>
        </div>
      </div>

      {/* Right Column - Preview with internal scroll */}
      <div className='lg:col-span-2 flex flex-col h-full'>
        <h2 className='text-xl font-semibold mb-3'>Preview</h2>
        <Card className='flex-1 p-6 flex items-center justify-center overflow-auto'>
          {!image ? (
            <div className='text-center text-muted-foreground'>
              <Sparkles className='h-16 w-16 mx-auto mb-4 opacity-20' />
              <p className='text-lg'>Upload an image to get started</p>
              <p className='text-sm mt-2'>Your string art will appear here</p>
            </div>
          ) : isProcessing ? (
            <div className='text-center'>
              <Loader2 className='h-16 w-16 mx-auto mb-4 animate-spin text-primary' />
              <p className='text-lg font-medium'>Generating String Art</p>
              <p className='text-sm text-muted-foreground mt-2'>
                This may take a few moments...
              </p>
            </div>
          ) : result ? (
            <div className='w-full h-full flex items-center justify-center p-4'>
              <Canvas width={600} height={600} />
            </div>
          ) : (
            <div className='text-center text-muted-foreground'>
              <p className='text-lg'>Click "Generate String Art" to start</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
