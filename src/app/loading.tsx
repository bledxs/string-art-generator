import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function Loading() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-background'>
      <LoadingSpinner />
    </div>
  );
}
