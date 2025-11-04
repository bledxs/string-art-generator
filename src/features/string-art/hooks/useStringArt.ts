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
  } = useStringArtStore();

  // Initialize worker
  useEffect(() => {
    // Check if Worker is supported
    if (typeof Worker === 'undefined') {
      console.warn('Web Workers not supported in this browser');
      return;
    }

    // Create worker instance
    try {
      workerRef.current = new Worker(
        new URL('../workers/stringArt.worker.ts', import.meta.url),
      );

      // Handle worker messages
      workerRef.current.onmessage = (event: MessageEvent<WorkerResponse>) => {
        const { type, payload } = event.data;

        switch (type) {
          case 'PROGRESS':
            if (payload?.progress !== undefined) {
              setProgress(payload.progress);
            }
            break;

          case 'COMPLETE':
            if (payload?.result) {
              setResult(payload.result);
              setProcessing(false);
            }
            break;

          case 'ERROR':
            console.error('Worker error:', payload?.error);
            setProcessing(false);
            break;
        }
      };

      workerRef.current.onerror = (error) => {
        console.error('Worker error:', error);
        setProcessing(false);
      };
    } catch (error) {
      console.error('Failed to create worker:', error);
    }

    // Cleanup
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, [setProgress, setResult, setProcessing]);

  // Generate string art
  const generate = useCallback(() => {
    if (!image || !workerRef.current || isProcessing) {
      console.log('Generate blocked:', {
        image: !!image,
        worker: !!workerRef.current,
        isProcessing,
      });
      return;
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
  }, [image, parameters, isProcessing, setProcessing, setProgress]);

  // Cancel generation
  const cancel = useCallback(() => {
    if (!workerRef.current || !isProcessing) {
      return;
    }

    const message: WorkerRequest = {
      type: 'CANCEL',
    };

    workerRef.current.postMessage(message);
    setProcessing(false);
  }, [isProcessing, setProcessing]);

  return {
    generate,
    cancel,
    isProcessing,
  };
}
