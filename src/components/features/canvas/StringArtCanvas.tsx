import { forwardRef, useEffect, useState } from 'react';

import { getPinPositions } from '../../../lib/geometryUtils';

import type {
  Pin,
  PinPlacementShape,
  ScaledImageDetails,
  Thread,
} from '../../../types/stringArt';
// La interfaz de props sigue igual
interface StringArtCanvasProps {
  width: number;
  height: number;
  imageToDisplayUrl?: string | null;
  scaledImageDetails?: ScaledImageDetails | null;
  numPins: number;
  pinColor?: string;
  pinRadius?: number;
  pinShape: PinPlacementShape;
  backgroundColor?: string;
  actualPins?: Pin[] | null;
  threadsToDraw?: Thread[] | null;
  threadDrawOpacity?: number;
  threadColor?: string;
  threadWidth?: number;
  displayBaseImage?: boolean;
}

// Envolvemos el componente con forwardRef
export const StringArtCanvas = forwardRef<
  HTMLCanvasElement,
  StringArtCanvasProps
>((props, ref) => {
  // Desestructuramos las props aquí
  const {
    width,
    height,
    imageToDisplayUrl,
    scaledImageDetails,
    numPins,
    pinShape,
    pinColor = '#333333',
    pinRadius = 1.5,
    backgroundColor = '#FFFFFF',
    actualPins,
    threadsToDraw,
    threadDrawOpacity = 0.2,
    threadColor = '#000000',
    threadWidth = 0.5,
    displayBaseImage = true,
  } = props;

  const [loadedImgElement, setLoadedImgElement] =
    useState<HTMLImageElement | null>(null);

  // Si el padre no pasa una ref, podríamos usar una local, pero para exportar, la ref del padre es necesaria.
  // El 'ref' que llega aquí es la ref que pasaremos al elemento canvas.

  useEffect(() => {
    if (imageToDisplayUrl) {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => setLoadedImgElement(img);
      img.onerror = () => {
        console.error('Error al cargar imagen para canvas.');
        setLoadedImgElement(null);
      };
      img.src = imageToDisplayUrl;
    } else {
      setLoadedImgElement(null);
    }
  }, [imageToDisplayUrl]);

  useEffect(() => {
    // Accedemos al canvas a través de la ref (puede ser un objeto Ref o una función callback)
    const canvas = ref && typeof ref !== 'function' ? ref.current : null;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    if (displayBaseImage && loadedImgElement && scaledImageDetails) {
      try {
        ctx.drawImage(
          loadedImgElement,
          scaledImageDetails.offsetX,
          scaledImageDetails.offsetY,
          scaledImageDetails.width,
          scaledImageDetails.height,
        );
      } catch (e) {
        console.error('Error al dibujar imagen:', e);
        setLoadedImgElement(null);
      }
    }

    const pinsToRender =
      actualPins && actualPins.length > 0
        ? actualPins
        : getPinPositions(pinShape, numPins, width, height);
    if (pinsToRender && pinsToRender.length > 0) {
      ctx.fillStyle = pinColor;
      pinsToRender.forEach((pin) => {
        ctx.beginPath();
        ctx.arc(pin.x, pin.y, pinRadius, 0, 2 * Math.PI);
        ctx.fill();
      });
    }

    if (!(threadsToDraw && actualPins && actualPins.length > 0)) {
      return;
    }
    const r = parseInt(threadColor.slice(1, 3), 16);
    const g = parseInt(threadColor.slice(3, 5), 16);
    const b = parseInt(threadColor.slice(5, 7), 16);
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${threadDrawOpacity})`;
    ctx.lineWidth = threadWidth;
    threadsToDraw.forEach((thread) => {
      const startPin = actualPins[thread.startPinIndex];
      const endPin = actualPins[thread.endPinIndex];
      if (!(startPin && endPin)) {
        return;
      }
      ctx.beginPath();
      ctx.moveTo(startPin.x, startPin.y);
      ctx.lineTo(endPin.x, endPin.y);
      ctx.stroke();
    });
  }, [
    width,
    height,
    loadedImgElement,
    scaledImageDetails,
    numPins,
    actualPins,
    pinColor,
    pinRadius,
    backgroundColor,
    threadsToDraw,
    threadDrawOpacity,
    threadColor,
    threadWidth,
    displayBaseImage,
    ref,
    pinShape,
  ]);

  return (
    <canvas
      ref={ref}
      width={width}   // Atributo: resolución del buffer de dibujo
      height={height}  // Atributo: resolución del buffer de dibujo
      className='border border-input rounded-md shadow-sm' // Clases base de estilo
      style={{ 
        display: 'block', // Para evitar espacio extra debajo si es inline
        width: '100%',    // CSS: Ocupa el 100% del ancho de su contenedor padre
        height: '100%',   // CSS: Ocupa el 100% de la altura de su contenedor padre
      }}
    />
  );
});

// Es buena práctica añadir un displayName cuando se usa forwardRef para facilitar la depuración
StringArtCanvas.displayName = 'StringArtCanvas';
