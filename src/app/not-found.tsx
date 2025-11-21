// Root 404 Page
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Search, ArrowLeft, Sparkles } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className='flex flex-col min-h-screen'>
      <main className='flex-1 flex items-center justify-center px-4 py-16'>
        <div className='max-w-2xl w-full text-center space-y-8'>
          {/* Error Code */}
          <div className='relative'>
            <h1 className='text-9xl font-bold text-primary/10'>404</h1>
            <div className='absolute inset-0 flex items-center justify-center'>
              <Search className='h-24 w-24 text-primary/30' />
            </div>
          </div>

          {/* Message */}
          <div className='space-y-4'>
            <h2 className='text-3xl md:text-4xl font-bold'>Page Not Found</h2>
            <p className='text-lg text-muted-foreground max-w-md mx-auto'>
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Actions */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/'>
              <Button size='lg' className='w-full sm:w-auto'>
                <Home className='h-5 w-5 mr-2' />
                Go Home
              </Button>
            </Link>
            <Link href='/editor'>
              <Button size='lg' variant='outline' className='w-full sm:w-auto'>
                <Sparkles className='h-5 w-5 mr-2' />
                Try Editor
              </Button>
            </Link>
          </div>

          {/* Helpful Links */}
          <Card className='mt-12'>
            <CardContent className='p-6'>
              <h3 className='font-semibold mb-4'>
                Maybe you were looking for:
              </h3>
              <div className='grid sm:grid-cols-2 gap-3 text-sm'>
                <Link
                  href='/tutorials'
                  className='text-primary hover:underline'>
                  → Tutorials
                </Link>
                <Link href='/gallery' className='text-primary hover:underline'>
                  → Gallery
                </Link>
                <Link href='/faq' className='text-primary hover:underline'>
                  → FAQ
                </Link>
                <Link
                  href='/how-it-works'
                  className='text-primary hover:underline'>
                  → How It Works
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
