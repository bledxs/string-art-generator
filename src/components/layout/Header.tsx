// Server Component - Header with Navigation
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { MobileMenu } from './MobileMenu';

export function Header() {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60'>
      <div className='container mx-auto flex h-14 md:h-16 items-center justify-between px-4'>
        {/* Logo */}
        <Link
          href='/'
          className='flex items-center gap-2 hover:opacity-80 transition-opacity'>
          <Sparkles className='h-5 w-5 md:h-6 md:w-6 text-primary' />
          <span className='font-bold text-base md:text-lg'>
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center gap-4 lg:gap-6'>
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

        {/* Desktop CTA + Mobile Menu */}
        <div className='flex items-center gap-2'>
          <Link href='/editor' className='hidden md:block'>
            <Button size='sm'>Create Art</Button>
          </Link>

          {/* Mobile Menu - Client Component Island */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
