import { lazy, Suspense, useEffect, useRef, useState } from 'react';

import { AdBlock } from './components/ads/AdBlock';
import { SEOProvider } from './components/providers/SEOProvider';
// Componentes inmediatos (críticos para LCP)
import { Button } from './components/ui/button';
import { Progress } from './components/ui/progress';
// Hooks (mantener inmediatos para performance)
import { useErrorHandler } from './hooks/useErrorHandler';
import { useImageManager } from './hooks/useImageManager';
import { usePresetsManager } from './hooks/usePresetsManager';
import { useStringArtGenerator } from './hooks/useStringArtGenerator';
import { useStringArtParameters } from './hooks/useStringArtParameters';

import type { Area as PixelCropArea } from 'react-easy-crop';

// Lazy loading de componentes pesados

const OptimizedHeader = lazy(() =>
  import('./components/features/header/OptimizedHeader').then((module) => ({
    default: module.default,
  })),
);

const StringArtCanvas = lazy(() =>
  import('./components/features/canvas/StringArtCanvas').then((module) => ({
    default: module.StringArtCanvas,
  })),
);

const ImagePanel = lazy(() =>
  import('./components/features/controls/ImagePanel').then((module) => ({
    default: module.ImagePanel,
  })),
);

const ParametersPanel = lazy(() =>
  import('./components/features/controls/ParametersPanel').then((module) => ({
    default: module.ParametersPanel,
  })),
);

const PresetsPanel = lazy(() =>
  import('./components/features/controls/PresetsPanel').then((module) => ({
    default: module.PresetsPanel,
  })),
);

const ExportPanel = lazy(() =>
  import('./components/features/controls/ExportPanel').then((module) => ({
    default: module.ExportPanel,
  })),
);

const TARGET_CANVAS_WIDTH = 600;
const TARGET_CANVAS_HEIGHT = 600;

const ADSENSE_CLIENT_ID = import.meta.env.VITE_ADSENSE_CLIENT_ID;
const AD_SLOT_ID_SIDEBAR = import.meta.env.VITE_ADSENSE_AD_SLOT_ID_SIDEBAR;
const AD_SLOT_ID_FOOTER = import.meta.env.VITE_ADSENSE_AD_SLOT_ID_FOOTER;
// Componente de loading optimizado
const ComponentSkeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-muted rounded-lg ${className}`}>
    <div className='p-6 space-y-4'>
      <div className='h-4 bg-muted-foreground/20 rounded w-3/4'></div>
      <div className='h-4 bg-muted-foreground/20 rounded w-1/2'></div>
      <div className='h-8 bg-muted-foreground/20 rounded'></div>
    </div>
  </div>
);

const CanvasSkeleton = () => (
  <div className='w-full h-[600px] bg-muted rounded-lg animate-pulse flex items-center justify-center'>
    <div className='text-muted-foreground'>Cargando canvas...</div>
  </div>
);

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showBaseImageInCanvas, setShowBaseImageInCanvas] =
    useState<boolean>(true);

  // Hooks (mantener como están - son críticos)
  const imageManager = useImageManager(
    TARGET_CANVAS_WIDTH,
    TARGET_CANVAS_HEIGHT,
  );
  const parametersManager = useStringArtParameters(
    TARGET_CANVAS_WIDTH,
    TARGET_CANVAS_HEIGHT,
  );
  const presetsManager = usePresetsManager();
  const { error, showError, clearError } = useErrorHandler();

  const {
    generatedThreads,
    isGenerating,
    progress,
    statusMessage,
    startGeneration,
    resetGenerator,
    cancelGeneration,
  } = useStringArtGenerator({
    grayscaleMatrix: imageManager.processedGrayscaleMatrix,
    pins: parametersManager.pins,
    numThreadsToGenerate: parametersManager.config.numThreads,
  });

  // Performance: Optimizar effect
  useEffect(() => {
    if (
      !isGenerating &&
      generatedThreads?.length > 0 &&
      statusMessage.startsWith('¡Generación completada!')
    ) {
      setShowBaseImageInCanvas(false);
    }
  }, [isGenerating, generatedThreads?.length, statusMessage]);

  // Event handlers (mantener como están)
  const handleImageUploadError = (errorMessage: string) => {
    showError(errorMessage);
    imageManager.resetImageState();
  };

  const handleCropConfirmed = async (croppedAreaPixels: PixelCropArea) => {
    try {
      await imageManager.handleCropConfirmed(croppedAreaPixels);
      setShowBaseImageInCanvas(true);
      clearError();
    } catch (error) {
      showError(
        error instanceof Error ? error.message : 'Error al procesar recorte.',
      );
    }
  };

  const handleShowCropperChange = (show: boolean) => {
    imageManager.setShowCropper(show);
    if (!show && imageManager.showCropper) {
      resetGenerator();
      setShowBaseImageInCanvas(true);
    }
  };

  const handleGenerateClick = () => {
    if (!imageManager.processedGrayscaleMatrix) {
      showError('Por favor, carga y recorta una imagen primero.');
      return;
    }
    if (!parametersManager.pins?.length) {
      showError('No se pudieron calcular las puntillas.');
      return;
    }
    startGeneration();
    clearError();
  };

  const handleImageUploaded = (data: { originalFileUrl: string }) => {
    imageManager.handleImageUploaded(data);
    resetGenerator();
    setShowBaseImageInCanvas(true);
    clearError();
  };

  const handleSavePreset = () => {
    try {
      presetsManager.savePreset(parametersManager.config);
      clearError();
    } catch (error) {
      showError(
        error instanceof Error ? error.message : 'Error al guardar preset.',
      );
    }
  };

  const handleLoadPreset = () => {
    const preset = presetsManager.getSelectedPreset();
    if (!preset) {
      showError('No hay ningún preset seleccionado para cargar.');
      return;
    }
    parametersManager.loadFromPreset(preset);
    clearError();
  };

  const handleDeletePreset = () => {
    try {
      presetsManager.deletePreset(presetsManager.selectedPresetId);
      clearError();
    } catch (error) {
      showError(
        error instanceof Error ? error.message : 'Error al eliminar preset.',
      );
    }
  };

  return (
    <SEOProvider
      title='Generador de String Art'
      description='Crea patrones de String Art profesionales. Convierte imágenes en instrucciones paso a paso para arte con hilos.'
      keywords={[
        'string art',
        'arte hilos',
        'patrones',
        'nail art',
        'generador',
      ]}
      image='https://string-art-generator-three.vercel.app/og-image.jpg'
      url='https://string-art-generator-three.vercel.app'>
      <div className='min-h-screen bg-background text-foreground flex flex-col items-center p-4'>
        {/* Header crítico para LCP */}
        <Suspense fallback={<ComponentSkeleton className='h-24 w-xl' />}>
          <OptimizedHeader />
        </Suspense>
        <main className='w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6'>
          <aside className='md:col-span-1 bg-card p-6 rounded-lg shadow-lg space-y-6'>
            {/* Lazy loading con Suspense */}
            <Suspense fallback={<ComponentSkeleton />}>
              <ImagePanel
                originalImageSrc={imageManager.originalImageSrc}
                showCropper={imageManager.showCropper}
                pinShape={parametersManager.config.pinShape}
                onImageUploaded={handleImageUploaded}
                onImageUploadError={handleImageUploadError}
                onCropConfirmed={handleCropConfirmed}
                onShowCropperChange={handleShowCropperChange}
              />
            </Suspense>

            <Suspense fallback={<ComponentSkeleton />}>
              <ParametersPanel
                numPins={parametersManager.config.numPins}
                setNumPins={(value) =>
                  parametersManager.updateConfig({ numPins: value })
                }
                numThreads={parametersManager.config.numThreads}
                setNumThreads={(value) =>
                  parametersManager.updateConfig({ numThreads: value })
                }
                threadOpacity={parametersManager.config.threadOpacity}
                setThreadOpacity={(value) =>
                  parametersManager.updateConfig({ threadOpacity: value })
                }
                threadWidth={parametersManager.config.threadWidth}
                setThreadWidth={(value) =>
                  parametersManager.updateConfig({ threadWidth: value })
                }
                pinShape={parametersManager.config.pinShape}
                setPinShape={(value) =>
                  parametersManager.updateConfig({ pinShape: value })
                }
                physicalDimensionCm={
                  parametersManager.config.physicalDimensionCm
                }
                setPhysicalDimensionCm={(value) =>
                  parametersManager.updateConfig({ physicalDimensionCm: value })
                }
                calculatedPinSpacingCm={
                  parametersManager.calculatedPinSpacingCm
                }
                isGenerating={isGenerating}
                showCropper={imageManager.showCropper}
              />
            </Suspense>

            <Suspense fallback={<ComponentSkeleton />}>
              <PresetsPanel
                presets={presetsManager.presets}
                selectedPresetId={presetsManager.selectedPresetId}
                newPresetName={presetsManager.newPresetName}
                isGenerating={isGenerating}
                currentConfig={parametersManager.config}
                onSavePreset={handleSavePreset}
                onLoadPreset={handleLoadPreset}
                onDeletePreset={handleDeletePreset}
                onSelectedPresetChange={presetsManager.setSelectedPresetId}
                onNewPresetNameChange={presetsManager.setNewPresetName}
              />
            </Suspense>

            {/* Botones críticos - sin lazy loading */}
            <div className='mt-8 space-y-3'>
              <Button
                onClick={handleGenerateClick}
                disabled={
                  !imageManager.processedGrayscaleMatrix ||
                  isGenerating ||
                  imageManager.showCropper
                }
                className='w-full'>
                {isGenerating
                  ? `Generando (${progress.toFixed(0)}%)...`
                  : 'Generar String Art'}
              </Button>

              {isGenerating && (
                <Button
                  onClick={cancelGeneration}
                  variant='destructive'
                  className='w-full'>
                  Cancelar Generación
                </Button>
              )}

              <Suspense fallback={<ComponentSkeleton className='h-12' />}>
                <ExportPanel
                  canvasRef={canvasRef}
                  generatedThreads={generatedThreads}
                  isGenerating={isGenerating}
                  onError={showError}
                  onSuccess={() => clearError()}
                  pins={parametersManager.pins}
                />
              </Suspense>

              {isGenerating && (
                <div className='space-y-1'>
                  <Progress value={progress} className='w-full h-2' />
                  <p className='text-xs text-muted-foreground text-center'>
                    {statusMessage}
                  </p>
                </div>
              )}
            </div>

            {/* Mensajes de estado */}
            {error && (
              <div className='mt-4 p-3 bg-destructive/10 border border-destructive text-destructive rounded-md'>
                <p className='font-semibold'>Error:</p>
                <p>{error}</p>
              </div>
            )}

            {!error &&
              imageManager.processedImagePreviewUrl &&
              !isGenerating &&
              !imageManager.showCropper &&
              !statusMessage.startsWith('¡Generación completada!') && (
                <div className='mt-4 p-3 bg-green-600/10 border border-green-600 text-green-700 dark:text-green-400 rounded-md'>
                  <p className='font-semibold'>Imagen Recortada Lista</p>
                </div>
              )}

            {!isGenerating &&
              statusMessage &&
              statusMessage.startsWith('¡Generación completada!') && (
                <p className='text-sm text-green-600 dark:text-green-400 text-center mt-4'>
                  {statusMessage}
                </p>
              )}

            <div className='mt-8 border-t pt-6'>
              {' '}
              {/* Un separador y espacio */}
              <h3 className='text-sm font-medium text-muted-foreground mb-2 text-center'>
                Publicidad
              </h3>
              <AdBlock
                adClient={ADSENSE_CLIENT_ID}
                adSlot={AD_SLOT_ID_SIDEBAR}
                adFormat='auto' // O el formato que hayas configurado
                responsive={true}
                className='mx-auto' // Centrar el bloque si es más pequeño que el div
                minHeight='100px' // Ajusta según el tipo de anuncio
              />
            </div>
          </aside>

          <section className='md:col-span-2 bg-card p-2 sm:p-4 rounded-lg shadow-lg flex justify-center items-center'>
            <Suspense fallback={<CanvasSkeleton />}>
              <div className='w-full max-w-[600px] aspect-square mx-auto'>
                <StringArtCanvas
                  ref={canvasRef}
                  width={TARGET_CANVAS_WIDTH}
                  height={TARGET_CANVAS_HEIGHT}
                  imageToDisplayUrl={imageManager.processedImagePreviewUrl}
                  scaledImageDetails={imageManager.processedScaledDetails}
                  numPins={parametersManager.config.numPins}
                  pinShape={parametersManager.config.pinShape}
                  actualPins={parametersManager.pins}
                  threadsToDraw={generatedThreads}
                  threadDrawOpacity={parametersManager.config.threadOpacity}
                  displayBaseImage={showBaseImageInCanvas}
                  threadWidth={parametersManager.config.threadWidth}
                />
              </div>
            </Suspense>
          </section>
        </main>

        <footer className='mt-12 text-center text-sm text-muted-foreground'>
          <p>&copy; {new Date().getFullYear()} Tu Generador de String Art.</p>
          <div className='mt-4'>
            <AdBlock
              adClient={ADSENSE_CLIENT_ID}
              adSlot={AD_SLOT_ID_FOOTER}
            />
          </div>
        </footer>
      </div>
    </SEOProvider>
  );
}

export default App;
