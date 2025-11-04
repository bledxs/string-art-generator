import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  StringArtParameters,
  ImageData,
  StringArtResult,
  ExportFormat,
} from '../types';

interface StringArtState {
  // Image state
  image: ImageData | null;
  setImage: (image: ImageData | null) => void;

  // Parameters state
  parameters: StringArtParameters;
  setParameters: (params: Partial<StringArtParameters>) => void;
  resetParameters: () => void;

  // Result state
  result: StringArtResult | null;
  setResult: (result: StringArtResult | null) => void;
  partialResult: StringArtResult | null; // For progressive rendering
  setPartialResult: (result: StringArtResult | null) => void;

  // Processing state
  isProcessing: boolean;
  progress: number;
  setProcessing: (isProcessing: boolean) => void;
  setProgress: (progress: number) => void;

  // Export state
  exportFormat: ExportFormat;
  setExportFormat: (format: ExportFormat) => void;

  // Reset all
  reset: () => void;
}

const defaultParameters: StringArtParameters = {
  pins: 200,
  lines: 3000,
  lineWeight: 0.5,
  lineOpacity: 0.15,
  backgroundColor: '#ffffff',
};

export const useStringArtStore = create<StringArtState>()(
  persist(
    (set) => ({
      // Image
      image: null,
      setImage: (image) => set({ image, result: null }),

      // Parameters
      parameters: defaultParameters,
      setParameters: (params) =>
        set((state) => ({
          parameters: { ...state.parameters, ...params },
          result: null, // Clear result when params change
        })),
      resetParameters: () => set({ parameters: defaultParameters }),

      // Result
      result: null,
      setResult: (result) => set({ result }),
      partialResult: null,
      setPartialResult: (partialResult) => set({ partialResult }),

      // Processing
      isProcessing: false,
      progress: 0,
      setProcessing: (isProcessing) =>
        set({
          isProcessing,
          progress: isProcessing ? 0 : 100,
          partialResult: null,
        }),
      setProgress: (progress) => set({ progress }),

      // Export
      exportFormat: 'png',
      setExportFormat: (exportFormat) => set({ exportFormat }),

      // Reset
      reset: () =>
        set({
          image: null,
          result: null,
          parameters: defaultParameters,
          isProcessing: false,
          progress: 0,
          exportFormat: 'png',
        }),
    }),
    {
      name: 'string-art-storage', // LocalStorage key
      partialize: (state) => ({
        // Only persist these fields
        parameters: state.parameters,
        exportFormat: state.exportFormat,
      }),
    },
  ),
);
