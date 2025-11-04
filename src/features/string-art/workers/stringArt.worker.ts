// String Art Worker - Background processing
import type {
  WorkerRequest,
  WorkerResponse,
  StringArtParameters,
} from '../types';
import { loadImage, extractBrightness } from '../algorithms/imageProcessor';
import { generateStringArt as generateArt } from '../algorithms/stringArtEngine';

let isProcessing = false;

// Handle messages from main thread
self.onmessage = async (event: MessageEvent<WorkerRequest>) => {
  const { type, payload } = event.data;

  switch (type) {
    case 'GENERATE':
      if (isProcessing) {
        sendError('Already processing');
        return;
      }

      if (!payload) {
        sendError('No payload provided');
        return;
      }

      if (!payload.imageData) {
        sendError('Image data is missing');
        return;
      }

      if (!payload.parameters) {
        sendError('Parameters are missing');
        return;
      }

      try {
        isProcessing = true;
        await generateStringArt(payload.imageData, payload.parameters);
      } catch (error) {
        sendError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        isProcessing = false;
      }
      break;

    case 'CANCEL':
      isProcessing = false;
      sendProgress(0);
      break;

    default:
      sendError(`Unknown message type: ${type}`);
  }
};

// Main string art generation function
async function generateStringArt(
  imageDataUrl: string,
  parameters: StringArtParameters,
) {
  console.log('Worker: Starting generation', {
    imageUrlLength: imageDataUrl?.length,
    parameters,
  });

  const startTime = performance.now();

  try {
    // Send initial progress
    sendProgress(0);

    // Load and process image
    sendProgress(10);
    console.log('Worker: Loading image...');
    const img = await loadImage(imageDataUrl);
    console.log('Worker: Image loaded', {
      width: img.width,
      height: img.height,
    });

    sendProgress(20);
    console.log('Worker: Extracting brightness...');
    const processedImage = extractBrightness(img);
    console.log('Worker: Brightness extracted', { size: processedImage.width });

    // Generate string art with progress callback
    sendProgress(30);
    console.log('Worker: Generating string art...');
    const result = generateArt(processedImage, parameters, (progress) => {
      // Map algorithm progress (0-100) to overall progress (30-90)
      sendProgress(30 + progress * 0.6);
    });
    console.log('Worker: Generation complete', { paths: result.paths.length });

    sendProgress(95);

    // Calculate total time
    const endTime = performance.now();
    result.metadata.processingTime = endTime - startTime;

    // Send complete result
    sendProgress(100);
    const response: WorkerResponse = {
      type: 'COMPLETE',
      payload: { result },
    };

    self.postMessage(response);
    console.log('Worker: Result sent to main thread');
  } catch (error) {
    console.error('Worker: Error during generation', error);
    sendError(error instanceof Error ? error.message : 'Processing failed');
  }
}

// Helper functions
function sendProgress(progress: number) {
  const response: WorkerResponse = {
    type: 'PROGRESS',
    payload: { progress },
  };
  self.postMessage(response);
}

function sendError(error: string) {
  const response: WorkerResponse = {
    type: 'ERROR',
    payload: { error },
  };
  self.postMessage(response);
}

export {};
