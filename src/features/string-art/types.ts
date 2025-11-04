// Core types for String Art feature

export interface StringArtParameters {
  pins: number;
  lines: number;
  lineWeight: number;
  lineOpacity: number;
  backgroundColor: string;
}

export interface ImageData {
  url: string;
  width: number;
  height: number;
  file?: File;
}

export interface StringArtResult {
  paths: Path[];
  canvas?: HTMLCanvasElement;
  metadata: {
    totalLines: number;
    processingTime: number;
    parameters: StringArtParameters;
    optimization?: {
      originalCrossings: number;
      optimizedCrossings: number;
      crossingsReduced: number;
      pathsSimplified: number;
      processingTime: number;
    };
  };
}

export interface Path {
  from: number;
  to: number;
  weight: number;
}

// Worker message types
export interface WorkerRequest {
  type: 'GENERATE' | 'CANCEL';
  payload?: {
    imageData: string;
    parameters: StringArtParameters;
  };
}

export interface WorkerResponse {
  type: 'PROGRESS' | 'PARTIAL_PATHS' | 'COMPLETE' | 'ERROR';
  payload?: {
    progress?: number;
    partialPaths?: Path[]; // Paths generated so far
    result?: StringArtResult;
    error?: string;
  };
}

// Export formats
export type ExportFormat = 'png' | 'svg' | 'json' | 'txt';

export interface ExportOptions {
  format: ExportFormat;
  quality?: number;
  scale?: number;
}
