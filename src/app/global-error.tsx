'use client';

import { useEffect } from 'react';
import { ErrorDisplay } from '@/components/ui/error-display';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global application error:', error);
  }, [error]);

  return (
    <html lang='en'>
      <body className='dark'>
        <div className='flex items-center justify-center min-h-screen px-4 bg-background text-foreground'>
          <ErrorDisplay
            title='Critical Error'
            message='A critical error occurred. Please refresh the page.'
            onRetry={reset}
            showHomeButton={false}
            digest={error.digest}
          />
        </div>
      </body>
    </html>
  );
}
