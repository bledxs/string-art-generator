import { useCallback, useRef, useState } from 'react';

import type { GrayscaleMatrix, Pin, Thread } from '../types/stringArt';
import { getLinePixels } from '@/lib/geometryUtils';
const LINE_DARKNESS_REDUCTION_AMOUNT = 35; // Cuánto "aclarar" un camino después de usarlo (0-255)
const THREADS_PER_CHUNK = 25; // Hilos a procesar antes de ceder control a la UI
const MIN_PIN_DISTANCE_FACTOR = 0.02; // Factor para evitar conectar pines muy cercanos (ej: 2% del total de pines)

interface UseStringArtGeneratorParams {
  grayscaleMatrix: GrayscaleMatrix | null;
  pins: Pin[] | null;
  numThreadsToGenerate: number;
  initialPinIndex?: number; // Por defecto 0
}

interface StringArtGeneratorResult {
  generatedThreads: Thread[];
  isGenerating: boolean;
  progress: number; // 0-100
  statusMessage: string;
  startGeneration: () => Promise<void>;
  resetGenerator: () => void;
  cancelGeneration: () => void; // Para cancelar la generación si es necesario
}

export function useStringArtGenerator({
  grayscaleMatrix,
  pins,
  numThreadsToGenerate,
  initialPinIndex = 0,
}: UseStringArtGeneratorParams): StringArtGeneratorResult {
  const [generatedThreads, setGeneratedThreads] = useState<Thread[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>('');

  // Usamos useRef para la copia mutable de la matriz de grises dentro del bucle de generación
  // para evitar re-renders innecesarios por su actualización constante.
  const tempGrayscaleMatrixRef = useRef<GrayscaleMatrix | null>(null);
  const generationCancelledRef = useRef<boolean>(false);

  const resetGenerator = useCallback(() => {
    setGeneratedThreads([]);
    setIsGenerating(false);
    setProgress(0);
    setStatusMessage('');
    tempGrayscaleMatrixRef.current = null;
    generationCancelledRef.current = false;
  }, []);

  const startGeneration = useCallback(async () => {
    if (!grayscaleMatrix || !pins || pins.length === 0) {
      setStatusMessage('Error: Imagen o puntillas no disponibles.');
      setIsGenerating(false);
      return;
    }
    if (isGenerating) {
      console.warn('La generación ya está en progreso.');
      return;
    }

    resetGenerator(); // Resetea el estado antes de una nueva generación
    setIsGenerating(true);
    generationCancelledRef.current = false;
    setStatusMessage('Iniciando generación...');

    // Crear una copia profunda de la matriz de grises para modificarla
    tempGrayscaleMatrixRef.current = grayscaleMatrix.map((row) => [...row]);

    let currentPinIdx = initialPinIndex % pins.length;
    const localThreads: Thread[] = [];
    const minPinDistance = Math.max(
      1,
      Math.floor(pins.length * MIN_PIN_DISTANCE_FACTOR),
    );

    for (let i = 0; i < numThreadsToGenerate; i++) {
      if (generationCancelledRef.current) {
        setStatusMessage('Generación cancelada.');
        break;
      }

      let bestNextPinIndex = -1;
      let maxLineDarkness = -Infinity; // Buscamos maximizar la oscuridad (255 - valor_gris)

      const startPin = pins[currentPinIdx];

      for (
        let candidatePinIdx = 0;
        candidatePinIdx < pins.length;
        candidatePinIdx++
      ) {
        // No conectar un pin a sí mismo o a pines demasiado cercanos
        const distance = Math.abs(candidatePinIdx - currentPinIdx);
        const wrappedDistance = Math.min(distance, pins.length - distance); // Considerar la distancia por el otro lado del círculo
        if (
          candidatePinIdx === currentPinIdx ||
          wrappedDistance <= minPinDistance
        ) {
          continue;
        }

        const endPin = pins[candidatePinIdx];
        const linePixels = getLinePixels(startPin, endPin); // Usar la función importada
        let currentLineDarknessSum = 0;
        let validPixelsInLine = 0;

        if (!tempGrayscaleMatrixRef.current) break; // Salir si la matriz no está disponible (improbable)

        for (const p of linePixels) {
          const y = Math.round(p.y);
          const x = Math.round(p.x);
          if (
            y >= 0 &&
            y < tempGrayscaleMatrixRef.current.length &&
            x >= 0 &&
            x < tempGrayscaleMatrixRef.current[y].length
          ) {
            currentLineDarknessSum +=
              255 - tempGrayscaleMatrixRef.current[y][x];
            validPixelsInLine++;
          }
        }

        if (validPixelsInLine > 0) {
          const averageDarkness = currentLineDarknessSum / validPixelsInLine;
          if (averageDarkness > maxLineDarkness) {
            maxLineDarkness = averageDarkness;
            bestNextPinIndex = candidatePinIdx;
          }
        }
      }

      if (bestNextPinIndex !== -1 && tempGrayscaleMatrixRef.current) {
        localThreads.push({
          startPinIndex: currentPinIdx,
          endPinIndex: bestNextPinIndex,
        });

        // "Aclarar" la línea en la matriz temporal
        const chosenLinePixels = getLinePixels(
          startPin,
          pins[bestNextPinIndex],
        );
        for (const p of chosenLinePixels) {
          const y = Math.round(p.y);
          const x = Math.round(p.x);
          if (
            y >= 0 &&
            y < tempGrayscaleMatrixRef.current.length &&
            x >= 0 &&
            x < tempGrayscaleMatrixRef.current[y].length
          ) {
            tempGrayscaleMatrixRef.current[y][x] = Math.min(
              255,
              tempGrayscaleMatrixRef.current[y][x] +
                LINE_DARKNESS_REDUCTION_AMOUNT,
            );
          }
        }
        currentPinIdx = bestNextPinIndex;
      } else {
        // Si no se encontró un mejor pin (ej. imagen muy clara o ya procesada), avanzar al siguiente pin
        currentPinIdx =
          (currentPinIdx + Math.floor(pins.length / 7) + 1) % pins.length; // Saltar un poco para evitar quedarse atascado
      }

      // Actualizar estado de forma agrupada para mejor rendimiento
      if ((i + 1) % THREADS_PER_CHUNK === 0 || i === numThreadsToGenerate - 1) {
        setGeneratedThreads([...localThreads]); // Actualizar con copia para disparar re-render
        setProgress(((i + 1) / numThreadsToGenerate) * 100);
        setStatusMessage(
          `Generando hilo ${i + 1} de ${numThreadsToGenerate}...`,
        );
        // Ceder control al navegador para que la UI se actualice
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
    }

    setGeneratedThreads([...localThreads]); // Actualización final
    setIsGenerating(false);
    if (!generationCancelledRef.current) {
      setStatusMessage(
        `¡Generación completada! ${localThreads.length} hilos creados.`,
      );
    }
    generationCancelledRef.current = false; // Resetear para la próxima ejecución
  }, [
    grayscaleMatrix,
    pins,
    numThreadsToGenerate,
    initialPinIndex,
    isGenerating,
    resetGenerator,
  ]); // Agregado isGenerating y resetGenerator

  // Función para cancelar la generación
  // (Podríamos añadir un botón en la UI para esto más adelante)
  const cancelGeneration = useCallback(() => {
    if (isGenerating) {
      generationCancelledRef.current = true;
      console.log('Cancelando generación...');
    }
  }, [isGenerating]);

  return {
    generatedThreads,
    isGenerating,
    progress,
    statusMessage,
    startGeneration,
    resetGenerator,
    cancelGeneration, // Exponer si se añade botón de cancelar
  };
}
