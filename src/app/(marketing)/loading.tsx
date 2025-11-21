import { Skeleton } from '@/components/ui/skeleton';

export default function MarketingLoading() {
  return (
    <div className='container mx-auto max-w-6xl px-4 py-8 md:py-12'>
      {/* Hero Section Skeleton */}
      <div className='mb-12 text-center space-y-6'>
        <Skeleton className='h-12 w-3/4 mx-auto' />
        <Skeleton className='h-12 w-2/3 mx-auto' />
        <Skeleton className='h-6 w-full max-w-2xl mx-auto' />
        <Skeleton className='h-6 w-5/6 max-w-2xl mx-auto' />
        <div className='flex gap-4 justify-center mt-8'>
          <Skeleton className='h-11 w-32' />
          <Skeleton className='h-11 w-32' />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className='space-y-8'>
        <div className='grid md:grid-cols-2 gap-6'>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className='space-y-4'>
              <Skeleton className='aspect-video w-full rounded-lg' />
              <Skeleton className='h-6 w-3/4' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-5/6' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
