import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className='flex-1 flex items-center justify-center bg-background'>
      <div className='max-w-md mx-auto text-center px-6'>
        {/* Ilustración de Error */}
        <div className='mb-8'>
          <div className='w-32 h-32 mx-auto mb-6 relative'>
            {/* String Art Pattern como ilustración */}
            <svg
              viewBox='0 0 128 128'
              className='w-full h-full text-muted-foreground opacity-20'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'>
              {/* Círculo de puntos */}
              {Array.from({ length: 8 }, (_, i) => {
                const angle = i * 45 * (Math.PI / 180);
                const x = 64 + 50 * Math.cos(angle);
                const y = 64 + 50 * Math.sin(angle);
                return (
                  <circle key={i} cx={x} cy={y} r='3' fill='currentColor' />
                );
              })}

              {/* Líneas conectoras rotas para simular error */}
              <path d='M 64 14 L 104 44' strokeDasharray='4 4' />
              <path d='M 114 64 L 104 84' strokeDasharray='4 4' />
              <path d='M 64 114 L 24 84' strokeDasharray='4 4' />
              <path d='M 14 64 L 24 44' strokeDasharray='4 4' />
            </svg>
          </div>

          <h1 className='text-6xl font-bold text-muted-foreground mb-4'>404</h1>
          <h2 className='text-2xl font-semibold mb-2'>Página no encontrada</h2>
          <p className='text-muted-foreground mb-8'>
            Lo sentimos, la página que buscas no existe o ha sido movida. El
            patrón que intentas crear está fuera del canvas.
          </p>
        </div>

        {/* Botones de Acción */}
        <div className='space-y-4'>
          <Button asChild className='w-full'>
            <Link href='/'>
              <Home className='w-4 h-4 mr-2' />
              Volver al Generador
            </Link>
          </Button>

          <Button variant='outline' asChild className='w-full'>
            <Link href='javascript:history.back()'>
              <ArrowLeft className='w-4 h-4 mr-2' />
              Página Anterior
            </Link>
          </Button>
        </div>

        {/* Enlaces Útiles */}
        {/* <div className="mt-8 pt-8 border-t">
          <p className="text-sm text-muted-foreground mb-4">
            ¿Necesitas ayuda? Prueba estas opciones:
          </p>
          <div className="flex flex-col sm:flex-row gap-2 text-sm">
            <Link 
              href="/tutorial" 
              className="text-primary hover:underline"
            >
              Tutorial
            </Link>
            <Link 
              href="/gallery" 
              className="text-primary hover:underline"
            >
              Galería
            </Link>
            <Link 
              href="/contact" 
              className="text-primary hover:underline"
            >
              Contacto
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
}
