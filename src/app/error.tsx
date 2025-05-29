'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Home, AlertCircle } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log del error para debugging
    console.error('Error en la aplicación:', error);
  }, [error]);

  return (
    <div className='flex-1 flex items-center justify-center bg-background'>
      <div className='max-w-md mx-auto text-center px-6'>
        {/* Icono de Error */}
        <div className='mb-8'>
          <div className='w-24 h-24 mx-auto mb-6 bg-destructive/10 rounded-full flex items-center justify-center'>
            <AlertCircle className='w-12 h-12 text-destructive' />
          </div>

          <h1 className='text-3xl font-bold mb-2'>¡Ups! Algo salió mal</h1>
          <p className='text-muted-foreground mb-6'>
            Ha ocurrido un error inesperado al generar tu String Art. No te
            preocupes, puedes intentarlo de nuevo.
          </p>

          {/* Detalles del Error (solo en desarrollo) */}
          {process.env.NODE_ENV === 'development' && (
            <details className='text-left mb-6 p-4 bg-muted rounded-lg'>
              <summary className='cursor-pointer text-sm font-medium mb-2'>
                Detalles del error (desarrollo)
              </summary>
              <pre className='text-xs text-destructive whitespace-pre-wrap overflow-auto'>
                {error.message}
              </pre>
              {error.digest && (
                <p className='text-xs text-muted-foreground mt-2'>
                  Error ID: {error.digest}
                </p>
              )}
            </details>
          )}
        </div>

        {/* Botones de Acción */}
        <div className='space-y-4'>
          <Button onClick={reset} className='w-full'>
            <RefreshCw className='w-4 h-4 mr-2' />
            Intentar de Nuevo
          </Button>

          <Button variant='outline' asChild className='w-full'>
            <a href='/'>
              <Home className='w-4 h-4 mr-2' />
              Ir al Inicio
            </a>
          </Button>
        </div>

        {/* Información Adicional */}
        <div className='mt-8 pt-8 border-t'>
          <p className='text-sm text-muted-foreground'>
            Si el problema persiste, por favor{' '}
            <a
              href='mailto:support@stringartgenerator.app'
              className='text-primary hover:underline'>
              contáctanos
            </a>{' '}
            con los detalles del error.
          </p>
        </div>
      </div>
    </div>
  );
}
