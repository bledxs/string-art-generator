import { useState, useCallback, useEffect, useRef } from 'react';

interface UseSyncedNumericInputProps {
  numericValueProp: number;
  onNumericChange: (value: number) => void;
  min: number;
  max: number;
  isFloat?: boolean;
  decimalPlaces?: number;
}

interface SyncedNumericInputAPI {
  stringValue: string;
  numericValueForSlider: number;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputFocus: () => void;
  handleInputBlur: () => void;
  handleSliderChange: (sliderValue: number[]) => void;
}

const DEBOUNCE_TIMEOUT_MS = 750;

export function useSyncedNumericInput({
  numericValueProp,
  onNumericChange,
  min,
  max,
  isFloat = false,
  decimalPlaces = 2,
}: UseSyncedNumericInputProps): SyncedNumericInputAPI {
  const formatToString = useCallback(
    (val: number): string =>
      isFloat ? val.toFixed(decimalPlaces) : val.toString(),
    [isFloat, decimalPlaces],
  );

  const [stringValue, setStringValue] = useState<string>(
    formatToString(numericValueProp),
  );
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const latestStringValueRef = useRef<string>(stringValue);

  // Actualizar la ref cada vez que stringValue cambie
  useEffect(() => {
    latestStringValueRef.current = stringValue;
  }, [stringValue]);

  const commitStringValue = useCallback(() => {
    let currentString = latestStringValueRef.current;

    if (isFloat) {
      currentString = currentString.replace(/,/g, '.');
    }

    if (
      currentString.trim() === '' ||
      currentString === '-' ||
      (isFloat && currentString === '.')
    ) {
      onNumericChange(min);
      setStringValue(formatToString(min));
      return;
    }

    const parsedValue = isFloat
      ? parseFloat(currentString)
      : parseInt(currentString, 10);

    if (isNaN(parsedValue)) {
      onNumericChange(numericValueProp);
      setStringValue(formatToString(numericValueProp));
      return;
    }

    const clampedValue = Math.max(min, Math.min(max, parsedValue));
    onNumericChange(clampedValue);
    // IMPORTANTE: stringValue se actualiza con el valor formateado, que usará puntos.
    setStringValue(formatToString(clampedValue));
  }, [numericValueProp, min, max, isFloat, onNumericChange, formatToString]);

  useEffect(() => {
    // Cleanup timer
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isInputFocused) {
      const formattedPropValue = formatToString(numericValueProp);
      if (stringValue !== formattedPropValue) {
        setStringValue(formattedPropValue);
      }
    }
  }, [numericValueProp, formatToString, isInputFocused, stringValue]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const currentInputStr = e.target.value;
      setStringValue(currentInputStr);

      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

      debounceTimerRef.current = setTimeout(() => {
        commitStringValue();
      }, DEBOUNCE_TIMEOUT_MS);
    },
    [commitStringValue],
  );

  const handleInputFocus = useCallback(() => {
    setIsInputFocused(true);
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsInputFocused(false);
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
    commitStringValue();
  }, [commitStringValue]);

  const handleSliderChange = useCallback(
    (sliderValue: number[]) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }
      const newValue = sliderValue[0];
      onNumericChange(newValue);
      setStringValue(formatToString(newValue));
    },
    [onNumericChange, formatToString],
  );

  return {
    stringValue,
    numericValueForSlider: numericValueProp,
    handleInputChange,
    handleInputFocus,
    handleInputBlur,
    handleSliderChange,
  };
}
