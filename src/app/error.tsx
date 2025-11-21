'use client';

import { useEffect } from 'react';
import { ErrorDisplay } from '@/components/ui/error-display';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className='flex items-center justify-center min-h-screen px-4 py-16 bg-background'>
      <ErrorDisplay
        title='Something Went Wrong'
        message="We're sorry, but something unexpected happened. Please try again."
        onRetry={reset}
        digest={error.digest}
        debugInfo={
          error.stack ? `${error.message}\n\n${error.stack}` : error.message
        }
      />
    </div>
  );
}
