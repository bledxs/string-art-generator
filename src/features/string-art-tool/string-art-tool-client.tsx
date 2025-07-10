'use client';

import { useRef } from 'react';
import { StringArtCanvas } from '@/features/canvas/string-art-canvas';
import { useStringArtContext } from '@/context/string-art-context';

interface StringArtToolClientProps {
  canvasWidth: number;
  canvasHeight: number;
}

export function StringArtToolClient({
  canvasWidth,
  canvasHeight,
}: Readonly<StringArtToolClientProps>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useStringArtContext();

  return (
    <StringArtCanvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      {...state.canvasProps}
    />
  );
}
