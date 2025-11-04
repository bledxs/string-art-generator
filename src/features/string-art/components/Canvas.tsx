'use client';

import { useEffect, useRef } from 'react';
import { useStringArtStore } from '../store/stringArtStore';
import type { StringArtResult } from '../types';

interface CanvasProps {
  width?: number;
  height?: number;
}

export function Canvas({ width = 800, height = 800 }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { result, partialResult, parameters, isProcessing } =
    useStringArtStore();

  // Use partial result while processing, final result when complete
  const displayResult = isProcessing && partialResult ? partialResult : result;

  useEffect(() => {
    if (!canvasRef.current || !displayResult) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = parameters.backgroundColor;
    ctx.fillRect(0, 0, width, height);

    // Draw string art
    drawStringArt(
      ctx,
      displayResult,
      width,
      height,
      parameters.lineWeight,
      parameters.lineOpacity,
    );
  }, [displayResult, parameters, width, height, isProcessing]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className='max-w-full h-auto border rounded-lg'
    />
  );
}

function drawStringArt(
  ctx: CanvasRenderingContext2D,
  result: StringArtResult,
  width: number,
  height: number,
  lineWeight: number,
  lineOpacity: number,
) {
  const { paths } = result;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 20;

  // Calculate pin positions
  const totalPins = result.metadata.parameters.pins;
  const pinPositions = Array.from({ length: totalPins }, (_, i) => {
    const angle = (i * 2 * Math.PI) / totalPins;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  });

  // Draw lines
  ctx.strokeStyle = `rgba(0, 0, 0, ${lineOpacity})`;
  ctx.lineWidth = lineWeight;
  ctx.lineCap = 'round';

  paths.forEach((path) => {
    const from = pinPositions[path.from];
    const to = pinPositions[path.to];

    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  });

  // Draw pins (optional - small dots)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  pinPositions.forEach((pin) => {
    ctx.beginPath();
    ctx.arc(pin.x, pin.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  });
}
