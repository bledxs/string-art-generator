import { useState, useEffect, useCallback } from 'react';
import type { StringArtPreset, PinPlacementShape } from '../types/stringArt';

const LOCAL_STORAGE_KEY = 'stringArtPresets_v1';

interface PresetsManagerState {
  presets: StringArtPreset[];
  selectedPresetId: string;
  newPresetName: string;
}

export const usePresetsManager = () => {
  const [state, setState] = useState<PresetsManagerState>({
    presets: [],
    selectedPresetId: '',
    newPresetName: '',
  });

  // Load presets from localStorage on mount
  useEffect(() => {
    try {
      const storedPresets = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedPresets) {
        setState((prev) => ({ ...prev, presets: JSON.parse(storedPresets) }));
      }
    } catch (error) {
      console.error('Error loading presets:', error);
    }
  }, []);

  const savePreset = useCallback(
    (config: {
      numPins: number;
      numThreads: number;
      threadOpacity: number;
      threadWidth: number;
      pinShape: PinPlacementShape;
    }) => {
      if (!state.newPresetName.trim()) {
        throw new Error('Por favor, introduce un nombre para el preset.');
      }

      const newPreset: StringArtPreset = {
        id: Date.now().toString(),
        name: state.newPresetName.trim(),
        ...config,
      };

      const updatedPresets = [...state.presets, newPreset];

      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedPresets));
        setState((prev) => ({
          ...prev,
          presets: updatedPresets,
          newPresetName: '',
        }));
        return newPreset;
      } catch {
        throw new Error('Error al guardar el preset.');
      }
    },
    [state.presets, state.newPresetName],
  );

  const deletePreset = useCallback(
    (presetId: string) => {
      const updatedPresets = state.presets.filter((p) => p.id !== presetId);

      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedPresets));
        setState((prev) => ({
          ...prev,
          presets: updatedPresets,
          selectedPresetId:
            prev.selectedPresetId === presetId ? '' : prev.selectedPresetId,
        }));
      } catch {
        throw new Error('Error al eliminar el preset.');
      }
    },
    [state.presets],
  );

  const getSelectedPreset = useCallback((): StringArtPreset | null => {
    return state.presets.find((p) => p.id === state.selectedPresetId) || null;
  }, [state.presets, state.selectedPresetId]);

  const setSelectedPresetId = useCallback((id: string) => {
    setState((prev) => ({ ...prev, selectedPresetId: id }));
  }, []);

  const setNewPresetName = useCallback((name: string) => {
    setState((prev) => ({ ...prev, newPresetName: name }));
  }, []);

  return {
    presets: state.presets,
    selectedPresetId: state.selectedPresetId,
    newPresetName: state.newPresetName,
    savePreset,
    deletePreset,
    getSelectedPreset,
    setSelectedPresetId,
    setNewPresetName,
  };
};
