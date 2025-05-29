'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { useStringArtContext } from '@/context/string-art-context'; // 🆕 Usar contexto
import { useSyncedNumericInput } from '@/hooks/use-synced-numeric-input';
import { PinPlacementShape } from '@/types/string-art';

const MIN_PINS = 10;
const MAX_PINS = 500;
const MIN_THREADS = 100;
const MAX_THREADS = 10_000;
const STEP_THREADS = 100;
const MIN_OPACITY = 0.01;
const MAX_OPACITY = 1.0;
const STEP_OPACITY = 0.01;
const MIN_THREAD_WIDTH = 0.1;
const MAX_THREAD_WIDTH = 5.0;
const STEP_THREAD_WIDTH = 0.1;
const MIN_PHYSICAL_DIMENSION = 1; // 1 cm
const MAX_PHYSICAL_DIMENSION = 200; // 200 cm (2 metros)
const STEP_PHYSICAL_DIMENSION = 0.1;

// 🚫 Ya NO necesitamos props - todo viene del contexto
export function ParametersPanel() {
  // 🆕 Obtener datos del contexto
  const { managers, state } = useStringArtContext();
  const { parametersManager, imageManager } = managers;
  const { isGenerating } = state;

  // 🆕 Extraer valores del contexto
  const {
    numPins,
    numThreads,
    threadOpacity,
    threadWidth,
    pinShape,
    physicalDimensionCm,
  } = parametersManager.config;

  const { calculatedPinSpacingCm } = parametersManager;
  const { showCropper } = imageManager;

  // 🆕 Métodos de actualización del contexto
  const updateConfig = parametersManager.updateConfig;

  // Configurar APIs de inputs sincronizados
  const pinsApi = useSyncedNumericInput({
    numericValueProp: numPins,
    onNumericChange: (value) => updateConfig({ numPins: value }),
    min: MIN_PINS,
    max: MAX_PINS,
  });

  const threadsApi = useSyncedNumericInput({
    numericValueProp: numThreads,
    onNumericChange: (value) => updateConfig({ numThreads: value }),
    min: MIN_THREADS,
    max: MAX_THREADS,
  });

  const opacityApi = useSyncedNumericInput({
    numericValueProp: threadOpacity,
    onNumericChange: (value) => updateConfig({ threadOpacity: value }),
    min: MIN_OPACITY,
    max: MAX_OPACITY,
    isFloat: true,
    decimalPlaces: 2,
  });

  const threadWidthApi = useSyncedNumericInput({
    numericValueProp: threadWidth,
    onNumericChange: (value) => updateConfig({ threadWidth: value }),
    min: MIN_THREAD_WIDTH,
    max: MAX_THREAD_WIDTH,
    isFloat: true,
    decimalPlaces: 1,
  });

  const physicalDimensionApi = useSyncedNumericInput({
    numericValueProp: physicalDimensionCm,
    onNumericChange: (value) => updateConfig({ physicalDimensionCm: value }),
    min: MIN_PHYSICAL_DIMENSION,
    max: MAX_PHYSICAL_DIMENSION,
    isFloat: true,
    decimalPlaces: 1,
  });

  const commonDisabled = isGenerating || showCropper;

  return (
    <div>
      <h2 className='text-xl font-semibold mb-3 text-card-foreground'>
        2. Parámetros
      </h2>
      <div className='space-y-5'>
        <div>
          <Label className='text-sm font-medium block mb-1.5'>
            Forma de Puntillas:
          </Label>
          <RadioGroup
            value={pinShape}
            onValueChange={(value: string) =>
              updateConfig({ pinShape: value as PinPlacementShape })
            }
            className='flex space-x-4'
            disabled={commonDisabled}>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='circle' id='shapeCircle' />
              <Label htmlFor='shapeCircle' className='text-sm font-normal'>
                Círculo
              </Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='square' id='shapeSquare' />
              <Label htmlFor='shapeSquare' className='text-sm font-normal'>
                Cuadrado
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Dimensión Física */}
        <div>
          <div className='flex justify-between items-center mb-1.5'>
            <Label
              htmlFor='physicalDimensionInput'
              className='text-sm font-medium'>
              {pinShape === 'circle'
                ? 'Diámetro del Círculo (cm):'
                : 'Lado del Cuadrado (cm):'}
            </Label>
            <Input
              type='text'
              inputMode='decimal'
              id='physicalDimensionInput'
              value={physicalDimensionApi.stringValue}
              onChange={physicalDimensionApi.handleInputChange}
              onFocus={physicalDimensionApi.handleInputFocus}
              onBlur={physicalDimensionApi.handleInputBlur}
              className='w-24 h-8 text-sm'
              disabled={commonDisabled}
            />
          </div>
          <Slider
            id='physicalDimensionSlider'
            value={[physicalDimensionApi.numericValueForSlider]}
            min={MIN_PHYSICAL_DIMENSION}
            max={MAX_PHYSICAL_DIMENSION}
            step={STEP_PHYSICAL_DIMENSION}
            onValueChange={physicalDimensionApi.handleSliderChange}
            disabled={commonDisabled}
          />
        </div>

        {/* Número de Puntillas */}
        <div>
          <div className='flex justify-between items-center mb-1.5'>
            <Label htmlFor='paramNumPinsSlider' className='text-sm font-medium'>
              Puntillas:
            </Label>
            <Input
              type='text'
              inputMode='numeric'
              pattern='[0-9]*'
              id='paramNumPinsInput'
              value={pinsApi.stringValue}
              onChange={pinsApi.handleInputChange}
              onBlur={pinsApi.handleInputBlur}
              onFocus={pinsApi.handleInputFocus}
              className='w-20 h-8 text-sm'
              disabled={commonDisabled}
            />
          </div>
          <Slider
            id='paramNumPinsSlider'
            value={[pinsApi.numericValueForSlider]}
            min={MIN_PINS}
            max={MAX_PINS}
            step={1}
            onValueChange={pinsApi.handleSliderChange}
            disabled={commonDisabled}
          />
        </div>

        {/* Número de Hilos */}
        <div>
          <div className='flex justify-between items-center mb-1.5'>
            <Label
              htmlFor='paramNumThreadsSlider'
              className='text-sm font-medium'>
              Hilos:
            </Label>
            <Input
              type='text'
              inputMode='numeric'
              pattern='[0-9]*'
              id='paramNumThreadsInput'
              value={threadsApi.stringValue}
              onChange={threadsApi.handleInputChange}
              onBlur={threadsApi.handleInputBlur}
              onFocus={threadsApi.handleInputFocus}
              className='w-24 h-8 text-sm'
              disabled={commonDisabled}
            />
          </div>
          <Slider
            id='paramNumThreadsSlider'
            value={[threadsApi.numericValueForSlider]}
            min={MIN_THREADS}
            max={MAX_THREADS}
            step={STEP_THREADS}
            onValueChange={threadsApi.handleSliderChange}
            disabled={commonDisabled}
          />
        </div>

        {/* Distancia calculada entre puntillas */}
        {calculatedPinSpacingCm && (
          <div className='mt-2'>
            <p className='text-sm text-muted-foreground'>
              Distancia sugerida entre puntillas:
              <strong className='ml-1'>{calculatedPinSpacingCm} cm</strong>
            </p>
          </div>
        )}

        {/* Opacidad del Hilo */}
        <div>
          <div className='flex justify-between items-center mb-1.5'>
            <Label
              htmlFor='paramThreadOpacitySlider'
              className='text-sm font-medium'>
              Opacidad Hilo:
            </Label>
            <Input
              type='text'
              inputMode='decimal'
              id='paramThreadOpacityInput'
              value={opacityApi.stringValue}
              onChange={opacityApi.handleInputChange}
              onBlur={opacityApi.handleInputBlur}
              onFocus={opacityApi.handleInputFocus}
              className='w-20 h-8 text-sm'
              disabled={commonDisabled}
            />
          </div>
          <Slider
            id='paramThreadOpacitySlider'
            value={[opacityApi.numericValueForSlider]}
            min={MIN_OPACITY}
            max={MAX_OPACITY}
            step={STEP_OPACITY}
            onValueChange={opacityApi.handleSliderChange}
            disabled={commonDisabled}
          />
        </div>

        {/* Grosor del Hilo */}
        <div>
          <div className='flex justify-between items-center mb-1.5'>
            <Label
              htmlFor='paramThreadWidthInput'
              className='text-sm font-medium'>
              Grosor Hilo:
            </Label>
            <Input
              type='text'
              inputMode='decimal'
              id='paramThreadWidthInput'
              value={threadWidthApi.stringValue}
              onChange={threadWidthApi.handleInputChange}
              onFocus={threadWidthApi.handleInputFocus}
              onBlur={threadWidthApi.handleInputBlur}
              className='w-20 h-8 text-sm'
              disabled={commonDisabled}
            />
          </div>
          <Slider
            id='paramThreadWidthSlider'
            value={[threadWidthApi.numericValueForSlider]}
            min={MIN_THREAD_WIDTH}
            max={MAX_THREAD_WIDTH}
            step={STEP_THREAD_WIDTH}
            onValueChange={threadWidthApi.handleSliderChange}
            disabled={commonDisabled}
          />
        </div>
      </div>
    </div>
  );
}
