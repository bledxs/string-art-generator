// Server Component - Footer
import Link from 'next/link';
import { Sparkles, Github, Twitter } from 'lucide-react';
import { siteConfig } from '@/lib/config';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='border-t bg-background'>
      <div className='container mx-auto py-12 md:py-16'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Brand */}
          <div className='space-y-3'>
            <Link href='/' className='flex items-center gap-2'>
              <Sparkles className='h-5 w-5 text-primary' />
              <span className='font-bold'>{siteConfig.name}</span>
            </Link>
            <p className='text-sm text-muted-foreground max-w-xs'>
              Transform any image into stunning string art patterns using
              advanced algorithms.
            </p>
          </div>

          {/* Product Links */}
          <div className='space-y-3'>
            <h3 className='font-semibold text-sm'>Product</h3>
            <ul className='space-y-2 text-sm text-muted-foreground'>
              <li>
                <Link
                  href='/editor'
                  className='hover:text-foreground transition-colors'>
                  Editor
                </Link>
              </li>
              <li>
                <Link
                  href='/how-it-works'
                  className='hover:text-foreground transition-colors'>
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href='/about'
                  className='hover:text-foreground transition-colors'>
                  About
                </Link>
              </li>
              <li>
                <Link
                  href='/#features'
                  className='hover:text-foreground transition-colors'>
                  Features
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className='space-y-3'>
            <h3 className='font-semibold text-sm'>Resources</h3>
            <ul className='space-y-2 text-sm text-muted-foreground'>
              <li>
                <a
                  href='https://github.com/bledxs/string-art-generator'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-foreground transition-colors'>
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href='https://github.com/bledxs/string-art-generator/issues'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-foreground transition-colors'>
                  Support
                </a>
              </li>
              <li>
                <a
                  href='https://github.com/bledxs/string-art-generator'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-foreground transition-colors'>
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className='space-y-3'>
            <h3 className='font-semibold text-sm'>Connect</h3>
            <div className='flex gap-4'>
              <a
                href={siteConfig.links.github}
                target='_blank'
                rel='noopener noreferrer'
                className='text-muted-foreground hover:text-foreground transition-colors'
                aria-label='GitHub'>
                <Github className='h-5 w-5' />
              </a>
              <a
                href={siteConfig.links.twitter}
                target='_blank'
                rel='noopener noreferrer'
                className='text-muted-foreground hover:text-foreground transition-colors'
                aria-label='Twitter'>
                <Twitter className='h-5 w-5' />
              </a>
            </div>
            <p className='text-xs text-muted-foreground'>Open source project</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4'>
          <p className='text-sm text-muted-foreground'>
            © {currentYear} {siteConfig.name}. Built with Next.js 16.
          </p>
          <div className='flex gap-6 text-sm text-muted-foreground'>
            <a
              href='mailto:${siteConfig.contact.support}'
              className='hover:text-foreground transition-colors'>
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
