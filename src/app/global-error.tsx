'use client';

import { AlertTriangle, Home } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang='es'>
      <body>
        <div className='flex-1 flex items-center justify-center bg-background'>
          <div className='max-w-md mx-auto text-center px-6'>
            <div className='mb-8'>
              <div className='w-24 h-24 mx-auto mb-6 bg-destructive/10 rounded-full flex items-center justify-center'>
                <AlertTriangle className='w-12 h-12 text-destructive' />
              </div>

              <h1 className='text-3xl font-bold mb-2'>Error Crítico</h1>
              <p className='text-muted-foreground mb-6'>
                Ha ocurrido un error crítico en la aplicación. Por favor,
                recarga la página o contacta al soporte.
              </p>
            </div>

            <div className='space-y-4'>
              <Button onClick={reset} className='w-full'>
                Recargar Aplicación
              </Button>

              <Button variant='outline' asChild className='w-full'>
                <Link href='/'>
                  <Home className='w-4 h-4 mr-2' />
                  Página Principal
                </Link>
              </Button>
            </div>

            <div className='mt-8 pt-8 border-t'>
              <p className='text-sm text-muted-foreground'>
                Error ID: {error.digest || 'No disponible'}
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
