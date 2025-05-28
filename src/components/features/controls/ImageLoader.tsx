import React, { useCallback, useRef, useState } from 'react';

import { Button } from '../../ui/button'; // Ajusta la ruta según tu estructura
import { Input } from '../../ui/input'; // Ajusta la ruta

interface ImageLoaderProps {
  onImageProcessed: (data: {
    originalFileUrl: string; // URL del objeto para posible previsualización
  }) => void;
  onProcessingError: (errorMessage: string) => void;
}

export function ImageLoader({
  onImageProcessed,
  onProcessingError,
}: ImageLoaderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Para limpiar el input de archivo y permitir cargar el mismo archivo de nuevo
  const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    // Resetea el valor del input para que el evento onChange se dispare
    // incluso si se selecciona el mismo archivo.
    if (event.target instanceof HTMLInputElement) {
      event.target.value = '';
    }
  };

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) {
        return;
      }

      if (!file.type.startsWith('image/')) {
        const notImageError =
          'Por favor, selecciona un archivo de imagen válido.';
        setError(notImageError);
        onProcessingError(notImageError);
        return;
      }

      setIsLoading(true);
      setError(null);
      onProcessingError(''); // Limpiar errores previos en el padre

      const objectURL = URL.createObjectURL(file);

      try {
        // La función loadImageDataFromUrl ahora rechaza en error,
        // por lo que si llega aquí, imageDataResult no es null.

        onImageProcessed({
          originalFileUrl: objectURL, // Pasamos la URL para que el padre la gestione/revoque
        });
      } catch (err) {
        console.error('Error processing image:', err);
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Ocurrió un error desconocido al procesar la imagen.';
        setError(errorMessage);
        onProcessingError(errorMessage);
        URL.revokeObjectURL(objectURL); // Revocar si hay error aquí, ya que onImageProcessed no se llamará
      } finally {
        setIsLoading(false);
      }
    },
    [onImageProcessed, onProcessingError],
  );

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className='space-y-3'>
      <Input
        type='file'
        ref={fileInputRef}
        onChange={handleFileChange}
        onClick={handleInputClick} // Para permitir recargar el mismo archivo
        className='hidden' // Ocultamos el input por defecto
        accept='image/*' // Aceptar solo imágenes
        disabled={isLoading}
      />
      <Button
        onClick={triggerFileInput}
        disabled={isLoading}
        className='w-full'>
        {isLoading ? 'Cargando Imagen...' : 'Seleccionar Imagen'}
      </Button>
      {error && (
        <p className='text-sm text-red-600 dark:text-red-400'>{error}</p>
      )}
    </div>
  );
}
