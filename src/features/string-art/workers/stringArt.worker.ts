// String Art Worker - Background processing
import type {
  WorkerRequest,
  WorkerResponse,
  StringArtParameters,
} from '../types';

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
  // Send initial progress
  sendProgress(0);

  // TODO: Implement actual algorithm
  // For now, simulate processing with progress updates
  for (let i = 0; i <= 100; i += 10) {
    if (!isProcessing) {
      return; // Cancelled
    }

    sendProgress(i);
    await sleep(200); // Simulate work
  }

  // Send complete result
  const response: WorkerResponse = {
    type: 'COMPLETE',
    payload: {
      result: {
        paths: [],
        metadata: {
          totalLines: parameters.lines,
          processingTime: 0,
          parameters,
        },
      },
    },
  };

  self.postMessage(response);
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

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export {};
