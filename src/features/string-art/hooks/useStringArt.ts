'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useStringArtStore } from '../store/stringArtStore';
import type { WorkerRequest, WorkerResponse } from '../types';

export function useStringArt() {
  const workerRef = useRef<Worker | null>(null);

  const {
    image,
    parameters,
    isProcessing,
    setProcessing,
    setProgress,
    setResult,
    setPartialResult,
  } = useStringArtStore();

  // Helper to setup listeners
  const setupWorkerListeners = useCallback((worker: Worker) => {
    worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      const { type, payload } = event.data;

      switch (type) {
        case 'PROGRESS':
          if (payload?.progress !== undefined) {
            useStringArtStore.getState().setProgress(payload.progress);
          }
          break;

        case 'PARTIAL_PATHS':
          if (payload?.partialPaths) {
            useStringArtStore.getState().setPartialResult({
              paths: payload.partialPaths,
              metadata: {
                totalLines: payload.partialPaths.length,
                processingTime: 0,
                parameters: useStringArtStore.getState().parameters,
              },
            });
          }
          break;

        case 'COMPLETE':
          if (payload?.result) {
            useStringArtStore.getState().setResult(payload.result);
            useStringArtStore.getState().setPartialResult(null);
            useStringArtStore.getState().setProcessing(false);
          }
          break;

        case 'ERROR':
          console.error('Worker error payload:', payload?.error);
          useStringArtStore.getState().setProcessing(false);
          useStringArtStore.getState().setPartialResult(null);
          break;
      }
    };

    worker.onerror = (error) => {
      console.error('Worker error event:', error.message || error);
      useStringArtStore.getState().setProcessing(false);
      useStringArtStore.getState().setPartialResult(null);
    };
  }, []);

  // Initialize worker once
  useEffect(() => {
    if (typeof Worker === 'undefined') return;

    try {
      const worker = new Worker(
        new URL('../workers/stringArt.worker.ts', import.meta.url),
      );
      workerRef.current = worker;
      setupWorkerListeners(worker);
    } catch (error) {
      console.error('Failed to create worker:', error);
    }

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
        useStringArtStore.getState().setProcessing(false);
      }
    };
  }, [setupWorkerListeners]);

  // Generate string art
  const generate = useCallback(() => {
    // If already processing, cancel current job first by recreating worker
    if (isProcessing && workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = new Worker(
        new URL('../workers/stringArt.worker.ts', import.meta.url),
      );
      setupWorkerListeners(workerRef.current);
    }

    if (!image) {
      console.log('Generate blocked: No image');
      return;
    }

    if (!workerRef.current) {
      workerRef.current = new Worker(
        new URL('../workers/stringArt.worker.ts', import.meta.url),
      );
      setupWorkerListeners(workerRef.current);
    }

    if (!image.url) {
      console.error('Image URL is missing');
      return;
    }

    console.log('Sending to worker:', {
      imageUrl: image.url.substring(0, 50) + '...',
      parameters,
    });

    setProcessing(true);
    setProgress(0);

    const message: WorkerRequest = {
      type: 'GENERATE',
      payload: {
        imageData: image.url,
        parameters,
      },
    };

    workerRef.current.postMessage(message);
  }, [
    image,
    parameters,
    isProcessing,
    setProcessing,
    setProgress,
    setupWorkerListeners,
  ]);

  // Cancel generation
  const cancel = useCallback(() => {
    if (!workerRef.current) return;

    workerRef.current.terminate();

    workerRef.current = new Worker(
      new URL('../workers/stringArt.worker.ts', import.meta.url),
    );
    setupWorkerListeners(workerRef.current);

    setProcessing(false);
    setProgress(0);
  }, [setProcessing, setProgress, setupWorkerListeners]);

  return {
    generate,
    cancel,
    isProcessing,
  };
}
