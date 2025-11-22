'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Sparkles, BookOpen, HelpCircle, Image, Lightbulb } from 'lucide-react';
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
        <NavigationMenu className='hidden md:flex'>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                href='/'
                className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2'>
                  <li className='row-span-3'>
                    <NavigationMenuLink asChild>
                      <Link
                        className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                        href='/tutorials'>
                        <BookOpen className='h-6 w-6 mb-2' />
                        <div className='mb-2 mt-4 text-lg font-medium'>
                          Tutorials
                        </div>
                        <p className='text-sm leading-tight text-muted-foreground'>
                          Step-by-step guides to master string art creation
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href='/faq'
                        className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'>
                        <div className='flex items-center gap-2'>
                          <HelpCircle className='h-4 w-4' />
                          <div className='text-sm font-medium leading-none'>
                            FAQ
                          </div>
                        </div>
                        <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                          Answers to common questions
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href='/gallery'
                        className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'>
                        <div className='flex items-center gap-2'>
                          <Image className='h-4 w-4' />
                          <div className='text-sm font-medium leading-none'>
                            Gallery
                          </div>
                        </div>
                        <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                          Example configurations and inspiration
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href='/tips'
                        className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'>
                        <div className='flex items-center gap-2'>
                          <Lightbulb className='h-4 w-4' />
                          <div className='text-sm font-medium leading-none'>
                            Tips & Best Practices
                          </div>
                        </div>
                        <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                          Expert advice for stunning results
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href='/blog'
                className={navigationMenuTriggerStyle()}>
                Blog
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href='/how-it-works'
                className={navigationMenuTriggerStyle()}>
                How It Works
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href='/about'
                className={navigationMenuTriggerStyle()}>
                About
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

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
