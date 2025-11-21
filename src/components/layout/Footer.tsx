// Server Component - Footer
import Link from 'next/link';
import { Sparkles, Github, Twitter } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { FooterAd } from '@/components/ads';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='border-t bg-background'>
      {/* Ad above footer content */}
      <div className='container mx-auto pt-8'>
        <FooterAd />
      </div>

      <div className='container mx-auto py-8 md:py-12 lg:py-16 px-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8'>
          {/* Brand */}
          <div className='space-y-3 sm:col-span-2 md:col-span-1'>
            <Link href='/' className='flex items-center gap-2'>
              <Sparkles className='h-5 w-5 text-primary' />
              <span className='font-bold'>{siteConfig.name}</span>
            </Link>
            <p className='text-sm text-foreground/70 max-w-xs'>
              Transform any image into stunning string art patterns using
              advanced algorithms.
            </p>
          </div>

          {/* Product Links */}
          <div className='space-y-3'>
            <h3 className='font-bold text-sm text-foreground'>Product</h3>
            <ul className='space-y-2 text-sm text-foreground/70'>
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

          {/* Legal */}
          <div className='space-y-3'>
            <h3 className='font-bold text-sm text-foreground'>Legal</h3>
            <ul className='space-y-2 text-sm text-foreground/70'>
              <li>
                <Link
                  href='/privacy'
                  className='hover:text-foreground transition-colors'>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href='/terms'
                  className='hover:text-foreground transition-colors'>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href='/cookies'
                  className='hover:text-foreground transition-colors'>
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className='space-y-3'>
            <h3 className='font-bold text-sm text-foreground'>Resources</h3>
            <ul className='space-y-2 text-sm text-foreground/70'>
              <li>
                <Link
                  href='/blog'
                  className='hover:text-foreground transition-colors'>
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href='/faq'
                  className='hover:text-foreground transition-colors'>
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href='/tutorials'
                  className='hover:text-foreground transition-colors'>
                  Tutorials
                </Link>
              </li>
              <li>
                <Link
                  href='/gallery'
                  className='hover:text-foreground transition-colors'>
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='hover:text-foreground transition-colors'>
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-foreground transition-colors'>
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='mt-8 md:mt-12 pt-6 md:pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-3 md:gap-4 text-center sm:text-left'>
          <p className='text-xs md:text-sm text-foreground/60'>
            © {currentYear} {siteConfig.name}. Built with Next.js 16.
          </p>
          <div className='flex flex-wrap justify-center gap-3 md:gap-4 text-xs text-foreground/60'>
            <Link
              href='/privacy'
              className='hover:text-foreground transition-colors'>
              Privacy
            </Link>
            <Link
              href='/terms'
              className='hover:text-foreground transition-colors'>
              Terms
            </Link>
            <Link
              href='/cookies'
              className='hover:text-foreground transition-colors'>
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
