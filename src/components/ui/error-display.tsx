// Shared component for error states
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Home, RefreshCw, LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface ErrorDisplayProps {
  title: string;
  message: string;
  onRetry?: () => void;
  showHomeButton?: boolean;
  digest?: string;
  debugInfo?: string;
  icon?: LucideIcon;
}

export function ErrorDisplay({
  title,
  message,
  onRetry,
  showHomeButton = true,
  digest,
  debugInfo,
  icon: Icon = AlertTriangle,
}: ErrorDisplayProps) {
  return (
    <div className='max-w-2xl w-full text-center space-y-8'>
      {/* Error Icon */}
      <div className='flex justify-center'>
        <div className='h-24 w-24 rounded-full bg-destructive/10 flex items-center justify-center'>
          <Icon className='h-12 w-12 text-destructive' />
        </div>
      </div>

      {/* Message */}
      <div className='space-y-4'>
        <h1 className='text-3xl md:text-4xl font-bold'>{title}</h1>
        <p className='text-lg text-muted-foreground max-w-md mx-auto'>
          {message}
        </p>
        {digest && (
          <p className='text-sm text-muted-foreground font-mono'>
            Error ID: {digest}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className='flex flex-col sm:flex-row gap-4 justify-center'>
        {onRetry && (
          <Button size='lg' onClick={onRetry}>
            <RefreshCw className='h-5 w-5 mr-2' />
            Try Again
          </Button>
        )}
        {showHomeButton && (
          <Link href='/'>
            <Button size='lg' variant={onRetry ? 'outline' : 'default'}>
              <Home className='h-5 w-5 mr-2' />
              Go Home
            </Button>
          </Link>
        )}
      </div>

      {/* Debug Info (only in development) */}
      {debugInfo && process.env.NODE_ENV === 'development' && (
        <Card className='mt-12 text-left'>
          <CardContent className='p-6'>
            <h3 className='font-semibold mb-2 text-destructive'>
              Debug Information (Development Only)
            </h3>
            <pre className='text-xs overflow-auto p-4 bg-muted rounded'>
              {debugInfo}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
