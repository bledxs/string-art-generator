// Shared component for centered loading states
import { Loader2, LucideIcon } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  icon?: LucideIcon;
  iconClassName?: string;
}

export function LoadingSpinner({
  message = 'Loading...',
  icon: Icon,
  iconClassName,
}: LoadingSpinnerProps) {
  return (
    <div className='text-center space-y-4'>
      <div className='relative flex justify-center'>
        {Icon && (
          <Icon
            className={iconClassName || 'h-16 w-16 text-primary/20 absolute'}
          />
        )}
        <Loader2 className='h-12 w-12 animate-spin text-primary' />
      </div>
      <p className='text-muted-foreground'>{message}</p>
    </div>
  );
}
