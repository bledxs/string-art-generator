import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen } from 'lucide-react';

export default function BlogLoading() {
  return (
    <div className='container mx-auto max-w-6xl px-4 py-8 md:py-12'>
      {/* Header - Static */}
      <div className='mb-8 md:mb-12 text-center'>
        <div className='inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4'>
          <BookOpen className='h-4 w-4 text-primary' />
          <span className='text-sm font-medium'>Blog</span>
        </div>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-4'>
          String Art Insights
        </h1>
        <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
          Explore the art, science, and creativity behind string art. From
          history to tutorials, find inspiration for your next project.
        </p>
      </div>

      {/* Categories Skeleton */}
      <div className='mb-8 flex flex-wrap gap-2 justify-center'>
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className='h-8 w-24 rounded-full' />
        ))}
      </div>

      {/* Results Summary Skeleton */}
      <div className='mb-6 flex justify-center'>
        <Skeleton className='h-5 w-48' />
      </div>

      {/* Blog Posts Grid Skeleton */}
      <div className='grid md:grid-cols-2 gap-6 md:gap-8'>
        {Array.from({ length: 6 }).map((_, i) => (
          <Card
            key={i}
            className='overflow-hidden hover:shadow-lg transition-shadow'>
            {/* Image Skeleton */}
            <Skeleton className='aspect-video w-full' />

            <CardContent className='p-6 space-y-4'>
              {/* Category & Reading Time */}
              <div className='flex items-center justify-between gap-2'>
                <Skeleton className='h-5 w-20' />
                <Skeleton className='h-4 w-16' />
              </div>

              {/* Title */}
              <Skeleton className='h-6 w-full' />
              <Skeleton className='h-6 w-3/4' />

              {/* Description */}
              <div className='space-y-2'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-2/3' />
              </div>

              {/* Meta */}
              <div className='pt-2 border-t'>
                <Skeleton className='h-3 w-32' />
              </div>

              {/* Tags */}
              <div className='flex flex-wrap gap-2'>
                <Skeleton className='h-5 w-16' />
                <Skeleton className='h-5 w-20' />
                <Skeleton className='h-5 w-14' />
              </div>

              {/* Read More */}
              <div className='pt-2'>
                <Skeleton className='h-5 w-24' />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
