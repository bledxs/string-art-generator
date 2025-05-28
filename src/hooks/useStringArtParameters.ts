import { useCallback, useMemo, useState } from 'react';

import { getPinPositions } from '../lib/geometryUtils';

import type { Pin, PinPlacementShape } from '../types/stringArt';

interface ParametersConfig {
  numPins: number;
  numThreads: number;
  threadOpacity: number;
  threadWidth: number;
  pinShape: PinPlacementShape;
  physicalDimensionCm: number;
}

const DEFAULT_CONFIG: ParametersConfig = {
  numPins: 200,
  numThreads: 2000,
  threadOpacity: 0.2,
  threadWidth: 0.5,
  pinShape: 'circle',
  physicalDimensionCm: 30,
};

export const useStringArtParameters = (
  canvasWidth: number,
  canvasHeight: number,
) => {
  const [config, setConfig] = useState<ParametersConfig>(DEFAULT_CONFIG);

  const pins = useMemo((): Pin[] | null => {
    return getPinPositions(
      config.pinShape,
      config.numPins,
      canvasWidth,
      canvasHeight,
    );
  }, [config.numPins, config.pinShape, canvasWidth, canvasHeight]);

  const calculatedPinSpacingCm = useMemo((): string | null => {
    if (config.numPins <= 0 || config.physicalDimensionCm <= 0) return null;

    let perimeterCm = 0;
    if (config.pinShape === 'circle') {
      perimeterCm = Math.PI * config.physicalDimensionCm;
    } else if (config.pinShape === 'square') {
      perimeterCm = 4 * config.physicalDimensionCm;
    }

    if (perimeterCm > 0) {
      const spacing = perimeterCm / config.numPins;
      return spacing.toFixed(2);
    }
    return null;
  }, [config.numPins, config.pinShape, config.physicalDimensionCm]);

  const updateConfig = useCallback((updates: Partial<ParametersConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  }, []);

  const loadFromPreset = useCallback(
    (presetConfig: Partial<ParametersConfig>) => {
      setConfig((prev) => ({ ...prev, ...presetConfig }));
    },
    [],
  );

  return {
    config,
    pins,
    calculatedPinSpacingCm,
    updateConfig,
    loadFromPreset,
  };
};
