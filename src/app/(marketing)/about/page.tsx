// Server Component - About Page
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Sparkles,
  Heart,
  Code,
  Users,
  Target,
  Lightbulb,
  Lock,
  Zap,
  BookOpen,
  Rocket,
  Award,
} from 'lucide-react';
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
          <p className='text-base sm:text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto px-4'>
            We're building the future of generative art, making complex string
            art patterns accessible to everyone.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className='py-12 md:py-16 px-4 bg-muted'>
        <div className='container mx-auto max-w-6xl'>
          <div className='grid md:grid-cols-2 gap-8 md:gap-12 items-center'>
            <div className='px-4'>
              <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6'>
                Our Mission
              </h2>
              <p className='text-base md:text-lg text-foreground/70 mb-3 md:mb-4'>
                String art is a beautiful form of expression that combines
                mathematics, creativity, and craftsmanship. However, creating
                complex patterns manually can take hours or even days.
              </p>
              <p className='text-base md:text-lg text-foreground/70 mb-3 md:mb-4'>
                We built String Art Generator to democratize this art form,
                using advanced algorithms to transform any image into stunning
                string art patterns in seconds.
              </p>
              <p className='text-base md:text-lg text-foreground/70'>
                Whether you're an artist, educator, hobbyist, or just curious,
                our tool makes string art creation accessible to everyone.
              </p>
            </div>
            <div className='space-y-3 md:space-y-4'>
              <Card>
                <CardContent className='p-6 flex gap-4'>
                  <Target className='h-8 w-8 text-primary shrink-0' />
                  <div>
                    <h3 className='font-bold mb-2 text-foreground'>
                      Accessible
                    </h3>
                    <p className='text-sm text-foreground/70'>
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
                    <h3 className='font-bold mb-2 text-foreground'>
                      Open Source
                    </h3>
                    <p className='text-sm text-foreground/70'>
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
                    <h3 className='font-bold mb-2 text-foreground'>
                      Community-Driven
                    </h3>
                    <p className='text-sm text-foreground/70'>
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

      {/* Our Story Section */}
      <section className='py-12 md:py-16 px-4 bg-background'>
        <div className='container mx-auto max-w-4xl'>
          <div className='text-center mb-8 md:mb-12 px-4'>
            <Lightbulb className='h-10 w-10 md:h-12 md:w-12 text-primary mx-auto mb-4' />
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4'>
              Our Story
            </h2>
          </div>

          <div className='prose prose-lg dark:prose-invert max-w-none px-4'>
            <p className='text-base md:text-lg text-foreground/80 leading-relaxed mb-4'>
              String Art Generator began as a weekend experiment to explore the
              intersection of art and algorithms. Fascinated by the mathematical
              beauty of thread patterns, we wondered: could we automate the
              creation of these intricate designs?
            </p>
            <p className='text-base md:text-lg text-foreground/80 leading-relaxed mb-4'>
              What started as a simple proof-of-concept quickly evolved into
              something more meaningful. We realized this tool could empower
              artists to explore new creative possibilities, help educators
              teach complex concepts visually, and enable makers to bring their
              ideas to life without tedious manual calculations.
            </p>
            <p className='text-base md:text-lg text-foreground/80 leading-relaxed mb-4'>
              Today, String Art Generator serves thousands of users worldwide—
              from professional artists creating commissioned pieces to students
              learning about algorithms, from DIY enthusiasts building gifts to
              businesses creating unique branding.
            </p>
            <p className='text-base md:text-lg text-foreground/80 leading-relaxed'>
              We're proud to offer this tool completely free and privacy-first,
              as our contribution to the maker community. Every update and
              feature is driven by user feedback and our passion for making
              generative art accessible to all.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className='py-12 md:py-16 px-4 bg-muted'>
        <div className='container mx-auto max-w-6xl'>
          <div className='text-center mb-8 md:mb-12 px-4'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4'>
              Our Values
            </h2>
            <p className='text-base md:text-lg text-foreground/80 max-w-2xl mx-auto'>
              The principles that guide everything we build.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-6 md:gap-8'>
            {/* Value 1 */}
            <Card className='bg-background hover:shadow-lg transition-shadow'>
              <CardContent className='p-6 space-y-4'>
                <div className='h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center'>
                  <Code className='h-6 w-6 text-primary' />
                </div>
                <h3 className='text-xl font-bold'>Open Source</h3>
                <p className='text-sm text-muted-foreground leading-relaxed'>
                  We believe in transparency and community collaboration. Our
                  code is open for anyone to learn from, contribute to, or fork
                  for their own projects.
                </p>
              </CardContent>
            </Card>

            {/* Value 2 */}
            <Card className='bg-background hover:shadow-lg transition-shadow'>
              <CardContent className='p-6 space-y-4'>
                <div className='h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center'>
                  <Lock className='h-6 w-6 text-secondary' />
                </div>
                <h3 className='text-xl font-bold'>Privacy First</h3>
                <p className='text-sm text-muted-foreground leading-relaxed'>
                  Your images are processed entirely in your browser. We don't
                  upload, store, or track your creations. What you make is
                  yours, period.
                </p>
              </CardContent>
            </Card>

            {/* Value 3 */}
            <Card className='bg-background hover:shadow-lg transition-shadow'>
              <CardContent className='p-6 space-y-4'>
                <div className='h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center'>
                  <Heart className='h-6 w-6 text-accent' />
                </div>
                <h3 className='text-xl font-bold'>Free Forever</h3>
                <p className='text-sm text-muted-foreground leading-relaxed'>
                  Powerful creative tools shouldn't be locked behind paywalls.
                  String Art Generator will always be free, with no premium
                  tiers or hidden fees.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className='py-12 md:py-16 px-4 bg-background'>
        <div className='container mx-auto max-w-4xl'>
          <div className='text-center mb-8 md:mb-12 px-4'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4'>
              Project Timeline
            </h2>
            <p className='text-base md:text-lg text-foreground/80'>
              Our journey from concept to community tool.
            </p>
          </div>

          <div className='space-y-6 md:space-y-8 px-4'>
            {/* Timeline Item 1 */}
            <div className='flex gap-4 md:gap-6'>
              <div className='flex flex-col items-center'>
                <div className='h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0'>
                  <Lightbulb className='h-6 w-6 text-primary' />
                </div>
                <div className='w-0.5 flex-1 bg-border mt-2'></div>
              </div>
              <div className='pb-8'>
                <div className='text-sm font-medium text-primary mb-1'>
                  May 2025
                </div>
                <h3 className='text-lg md:text-xl font-bold mb-2'>
                  First Prototype
                </h3>
                <p className='text-sm md:text-base text-muted-foreground'>
                  Built initial version with Vite + React to test the core
                  string art algorithm. Proved the concept worked and validated
                  the greedy path optimization approach.
                </p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className='flex gap-4 md:gap-6'>
              <div className='flex flex-col items-center'>
                <div className='h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center shrink-0'>
                  <Code className='h-6 w-6 text-secondary' />
                </div>
                <div className='w-0.5 flex-1 bg-border mt-2'></div>
              </div>
              <div className='pb-8'>
                <div className='text-sm font-medium text-secondary mb-1'>
                  June - August 2025
                </div>
                <h3 className='text-lg md:text-xl font-bold mb-2'>
                  Migration to Next.js 15
                </h3>
                <p className='text-sm md:text-base text-muted-foreground'>
                  Rebuilt the app with Next.js 15 for better SEO, performance,
                  and scalability. Added Web Workers for background processing
                  and implemented multiple export formats.
                </p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className='flex gap-4 md:gap-6'>
              <div className='flex flex-col items-center'>
                <div className='h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0'>
                  <Rocket className='h-6 w-6 text-accent' />
                </div>
                <div className='w-0.5 flex-1 bg-border mt-2'></div>
              </div>
              <div className='pb-8'>
                <div className='text-sm font-medium text-accent mb-1'>
                  September - October 2025
                </div>
                <h3 className='text-lg md:text-xl font-bold mb-2'>
                  Early Adoption
                </h3>
                <p className='text-sm md:text-base text-muted-foreground'>
                  Soft launch to friends and early testers. Gathered valuable
                  feedback, fixed bugs, and started building initial user base.
                  First 100 unique visitors!
                </p>
              </div>
            </div>

            {/* Timeline Item 4 */}
            <div className='flex gap-4 md:gap-6'>
              <div className='flex flex-col items-center'>
                <div className='h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0'>
                  <BookOpen className='h-6 w-6 text-primary' />
                </div>
                <div className='w-0.5 flex-1 bg-border mt-2'></div>
              </div>
              <div className='pb-8'>
                <div className='text-sm font-medium text-primary mb-1'>
                  November 2025
                </div>
                <h3 className='text-lg md:text-xl font-bold mb-2'>
                  Major Update: Next.js 16 + Rich Content
                </h3>
                <p className='text-sm md:text-base text-muted-foreground'>
                  Upgraded to Next.js 16 and React 19.2. Added comprehensive
                  tutorials, blog with 7 articles, gallery, FAQ, PDF templates,
                  and comment system. Growth accelerated to 2,300+ unique
                  visitors in 30 days!
                </p>
              </div>
            </div>

            {/* Timeline Item 5 */}
            <div className='flex gap-4 md:gap-6'>
              <div className='flex flex-col items-center'>
                <div className='h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center shrink-0'>
                  <Award className='h-6 w-6 text-secondary' />
                </div>
              </div>
              <div>
                <div className='text-sm font-medium text-secondary mb-1'>
                  Today
                </div>
                <h3 className='text-lg md:text-xl font-bold mb-2'>
                  Growing Community
                </h3>
                <p className='text-sm md:text-base text-muted-foreground'>
                  2,300+ unique visitors, hundreds of designs created, and
                  continuous improvements based on community feedback. The
                  journey continues!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className='py-12 md:py-16 px-4 bg-muted'>
        <div className='container mx-auto max-w-6xl'>
          <div className='text-center mb-8 md:mb-12 px-4'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4'>
              Built with Modern Technology
            </h2>
            <p className='text-base md:text-lg text-foreground/80 max-w-2xl mx-auto'>
              We leverage cutting-edge web technologies to deliver a fast,
              reliable, and powerful experience.
            </p>
          </div>

          <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6'>
            <Card className='bg-background/95 border-border/50'>
              <CardContent className='p-6'>
                <div className='font-mono text-sm text-primary mb-2'>
                  Next.js 16
                </div>
                <h3 className='font-bold mb-2 text-foreground'>React 19.2</h3>
                <p className='text-sm text-foreground/70'>
                  Server-first architecture with React Compiler for optimal
                  performance and SEO.
                </p>
              </CardContent>
            </Card>
            <Card className='bg-background/98 border-border/50'>
              <CardContent className='p-6'>
                <div className='font-mono text-sm text-primary mb-2'>
                  Web Workers
                </div>
                <h3 className='font-bold mb-2 text-foreground'>
                  Background Processing
                </h3>
                <p className='text-sm text-foreground/70'>
                  Complex algorithms run in background threads, keeping the UI
                  smooth and responsive.
                </p>
              </CardContent>
            </Card>
            <Card className='bg-background/95 border-border/50'>
              <CardContent className='p-6'>
                <div className='font-mono text-sm text-primary mb-2'>
                  TypeScript
                </div>
                <h3 className='font-bold mb-2 text-foreground'>
                  Type-Safe Code
                </h3>
                <p className='text-sm text-foreground/70'>
                  Strict typing ensures reliability and helps catch bugs before
                  they reach production.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className='py-12 md:py-16 px-4 bg-muted'>
        <div className='container mx-auto max-w-4xl text-center'>
          <Users className='h-10 w-10 md:h-12 md:w-12 text-primary mx-auto mb-4 md:mb-6' />
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 px-4'>
            Built by Creators, for Creators
          </h2>
          <p className='text-base md:text-lg text-foreground/70 mb-6 md:mb-8 max-w-2xl mx-auto px-4'>
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
      <section className='py-12 md:py-16 px-4 bg-background'>
        <div className='container mx-auto max-w-4xl text-center'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 px-4'>
            Join Our Community
          </h2>
          <p className='text-base md:text-lg text-foreground/80 mb-6 md:mb-8 px-4'>
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
