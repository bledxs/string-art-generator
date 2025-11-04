// Server Component - Header with Navigation
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { siteConfig } from '@/lib/config';

export function Header() {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60'>
      <div className='container mx-auto flex h-16 items-center justify-between'>
        {/* Logo */}
        <Link
          href='/'
          className='flex items-center gap-2 hover:opacity-80 transition-opacity'>
          <Sparkles className='h-6 w-6 text-primary' />
          <span className='font-bold text-lg'>{siteConfig.name}</span>
        </Link>

        {/* Navigation */}
        <nav className='hidden md:flex items-center gap-6'>
          <Link
            href='/'
            className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'>
            Home
          </Link>
          <Link
            href='/how-it-works'
            className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'>
            How It Works
          </Link>
          <Link
            href='/about'
            className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'>
            About
          </Link>
          <Link
            href='/editor'
            className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'>
            Editor
          </Link>
        </nav>

        {/* CTA Button */}
        <div className='flex items-center gap-4'>
          <Link href='/editor' className='hidden sm:block'>
            <Button size='sm'>Create Art</Button>
          </Link>

          {/* Mobile Menu Button - Simplified for now */}
          <Link href='/editor' className='sm:hidden'>
            <Button size='sm' variant='ghost'>
              Editor
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
