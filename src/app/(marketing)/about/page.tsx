// Server Component - About Page
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Heart, Code, Users, Target } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about String Art Generator - our mission, technology, and the team behind the free online tool that transforms images into beautiful string art patterns.',
  alternates: {
    canonical: 'https://www.stringartgenerator.app/about',
  },
  openGraph: {
    title: 'About String Art Generator',
    description:
      'Learn about the team and technology behind String Art Generator',
    url: 'https://www.stringartgenerator.app/about',
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className='relative py-12 md:py-20 px-4 border-b'>
        <div className='container mx-auto max-w-4xl text-center'>
          <div className='inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4 md:mb-6'>
            <Sparkles className='h-4 w-4 text-primary' />
            <span className='text-sm font-medium'>About Us</span>
          </div>
          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 px-4'>
            Transforming Art Through Technology
          </h1>
          <p className='text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4'>
            We're building the future of generative art, making complex string
            art patterns accessible to everyone.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className='py-12 md:py-16 px-4'>
        <div className='container mx-auto max-w-6xl'>
          <div className='grid md:grid-cols-2 gap-8 md:gap-12 items-center'>
            <div className='px-4'>
              <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6'>
                Our Mission
              </h2>
              <p className='text-base md:text-lg text-muted-foreground mb-3 md:mb-4'>
                String art is a beautiful form of expression that combines
                mathematics, creativity, and craftsmanship. However, creating
                complex patterns manually can take hours or even days.
              </p>
              <p className='text-base md:text-lg text-muted-foreground mb-3 md:mb-4'>
                We built String Art Generator to democratize this art form,
                using advanced algorithms to transform any image into stunning
                string art patterns in seconds.
              </p>
              <p className='text-base md:text-lg text-muted-foreground'>
                Whether you're an artist, educator, hobbyist, or just curious,
                our tool makes string art creation accessible to everyone.
              </p>
            </div>
            <div className='space-y-3 md:space-y-4'>
              <Card>
                <CardContent className='p-6 flex gap-4'>
                  <Target className='h-8 w-8 text-primary shrink-0' />
                  <div>
                    <h3 className='font-semibold mb-2'>Accessible</h3>
                    <p className='text-sm text-muted-foreground'>
                      Free, web-based tool available to anyone with a browser.
                      No installation required.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='p-6 flex gap-4'>
                  <Code className='h-8 w-8 text-primary shrink-0' />
                  <div>
                    <h3 className='font-semibold mb-2'>Open Source</h3>
                    <p className='text-sm text-muted-foreground'>
                      Built with modern web technologies and open source
                      principles.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='p-6 flex gap-4'>
                  <Heart className='h-8 w-8 text-primary shrink-0' />
                  <div>
                    <h3 className='font-semibold mb-2'>Community-Driven</h3>
                    <p className='text-sm text-muted-foreground'>
                      Built for creators, by creators. We listen to feedback and
                      continuously improve.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className='py-12 md:py-16 px-4 bg-muted/50'>
        <div className='container mx-auto max-w-6xl'>
          <div className='text-center mb-8 md:mb-12 px-4'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4'>
              Built with Modern Technology
            </h2>
            <p className='text-base md:text-lg text-muted-foreground max-w-2xl mx-auto'>
              We leverage cutting-edge web technologies to deliver a fast,
              reliable, and powerful experience.
            </p>
          </div>

          <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6'>
            <Card>
              <CardContent className='p-6'>
                <div className='font-mono text-sm text-primary mb-2'>
                  Next.js 16
                </div>
                <h3 className='font-semibold mb-2'>React 19.2</h3>
                <p className='text-sm text-muted-foreground'>
                  Server-first architecture with React Compiler for optimal
                  performance and SEO.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-6'>
                <div className='font-mono text-sm text-primary mb-2'>
                  Web Workers
                </div>
                <h3 className='font-semibold mb-2'>Background Processing</h3>
                <p className='text-sm text-muted-foreground'>
                  Complex algorithms run in background threads, keeping the UI
                  smooth and responsive.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-6'>
                <div className='font-mono text-sm text-primary mb-2'>
                  TypeScript
                </div>
                <h3 className='font-semibold mb-2'>Type-Safe Code</h3>
                <p className='text-sm text-muted-foreground'>
                  Strict typing ensures reliability and helps catch bugs before
                  they reach production.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className='py-12 md:py-16 px-4'>
        <div className='container mx-auto max-w-4xl text-center'>
          <Users className='h-10 w-10 md:h-12 md:w-12 text-primary mx-auto mb-4 md:mb-6' />
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 px-4'>
            Built by Creators, for Creators
          </h2>
          <p className='text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto px-4'>
            We're a team of developers, designers, and artists passionate about
            making creative tools accessible to everyone. This project started
            as a personal experiment and grew into something we're proud to
            share with the world.
          </p>
          <div className='flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4'>
            <a
              href='https://github.com/bledxs/string-art-generator'
              target='_blank'
              rel='noopener noreferrer'
              className='w-full sm:w-auto'>
              <Button variant='outline' size='lg' className='w-full'>
                <Code className='mr-2 h-4 w-4' />
                View on GitHub
              </Button>
            </a>
            <Link href='/editor' className='w-full sm:w-auto'>
              <Button size='lg' className='w-full'>
                <Sparkles className='mr-2 h-4 w-4' />
                Try the Editor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-12 md:py-16 px-4 bg-primary/5'>
        <div className='container mx-auto max-w-4xl text-center'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 px-4'>
            Join Our Community
          </h2>
          <p className='text-base md:text-lg text-muted-foreground mb-6 md:mb-8 px-4'>
            Have questions, suggestions, or want to contribute? We'd love to
            hear from you!
          </p>
          <div className='flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4'>
            <a
              href='https://github.com/bledxs/string-art-generator/issues'
              target='_blank'
              rel='noopener noreferrer'
              className='w-full sm:w-auto'>
              <Button variant='outline' className='w-full'>
                Report an Issue
              </Button>
            </a>
            <a
              href='mailto:support@stringartgenerator.app'
              className='w-full sm:w-auto'>
              <Button variant='outline' className='w-full'>
                Contact Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
