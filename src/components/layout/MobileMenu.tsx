'use client';

// Client Component - Mobile Menu Sheet
import { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  Home,
  BookOpen,
  Info,
  Sparkles,
  HelpCircle,
  Image,
  GraduationCap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/how-it-works', label: 'How It Works', icon: BookOpen },
    { href: '/about', label: 'About', icon: Info },
  ];

  const learnItems = [
    { href: '/tutorials', label: 'Tutorials', icon: GraduationCap },
    { href: '/faq', label: 'FAQ', icon: HelpCircle },
    { href: '/gallery', label: 'Gallery', icon: Image },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='md:hidden'
          aria-label='Open menu'>
          <Menu className='h-5 w-5' />
        </Button>
      </SheetTrigger>
      <SheetContent side='right' className='w-[280px] sm:w-[320px]'>
        <SheetHeader>
          <SheetTitle className='text-left'>Navigation</SheetTitle>
        </SheetHeader>
        <nav className='flex flex-col gap-2 mt-8'>
          {/* Main Navigation */}
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className='flex items-center gap-3 text-base font-medium text-foreground/70 hover:text-foreground transition-colors py-2 px-3 rounded-md hover:bg-muted'>
                <Icon className='h-5 w-5' />
                {item.label}
              </Link>
            );
          })}

          {/* Learn Section */}
          <Separator className='my-3' />
          <div className='px-3 py-2'>
            <p className='text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
              Learn
            </p>
          </div>
          {learnItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className='flex items-center gap-3 text-base font-medium text-foreground/70 hover:text-foreground transition-colors py-2 px-3 rounded-md hover:bg-muted'>
                <Icon className='h-5 w-5' />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA in Mobile Menu */}
        <div className='absolute bottom-8 left-6 right-6'>
          <Link href='/editor' onClick={() => setOpen(false)}>
            <Button size='lg' className='w-full'>
              <Sparkles className='mr-2 h-5 w-5' />
              Create String Art
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
