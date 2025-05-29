import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className='flex-1 flex items-center justify-center bg-background'>
      <div className='text-center'>
        {/* Animación de String Art */}
        <div className='w-24 h-24 mx-auto mb-6 relative'>
          <svg
            viewBox='0 0 96 96'
            className='w-full h-full'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'>
            {/* Puntos del círculo */}
            {Array.from({ length: 12 }, (_, i) => {
              const angle = i * 30 * (Math.PI / 180);
              const x = 48 + 40 * Math.cos(angle);
              const y = 48 + 40 * Math.sin(angle);
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r='2'
                  fill='currentColor'
                  className='animate-pulse'
                  style={{
                    animationDelay: `${i * 100}ms`,
                    animationDuration: '1.5s',
                  }}
                />
              );
            })}

            {/* Líneas conectoras animadas */}
            <g
              className='animate-spin'
              style={{ transformOrigin: '48px 48px' }}>
              {Array.from({ length: 6 }, (_, i) => {
                const angle1 = i * 60 * (Math.PI / 180);
                const angle2 = (i + 3) * 60 * (Math.PI / 180);
                const x1 = 48 + 40 * Math.cos(angle1);
                const y1 = 48 + 40 * Math.sin(angle1);
                const x2 = 48 + 40 * Math.cos(angle2);
                const y2 = 48 + 40 * Math.sin(angle2);
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    className='opacity-50'
                  />
                );
              })}
            </g>
          </svg>
        </div>

        <div className='flex items-center justify-center gap-3'>
          <Loader2 className='w-6 h-6 animate-spin text-primary' />
          <p className='text-lg font-medium'>Generando String Art...</p>
        </div>

        <p className='text-sm text-muted-foreground mt-2'>
          Procesando imagen y calculando patrones
        </p>
      </div>
    </div>
  );
}
