// Server Component - Tutorials Hub
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Wrench,
  Image as ImageIcon,
  Settings,
  Download,
  Clock,
  ArrowRight,
} from 'lucide-react';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Tutorials - Learn String Art Creation',
  description:
    'Step-by-step tutorials for creating stunning string art. Learn image selection, parameter optimization, export formats, and physical construction.',
  alternates: {
    canonical: `${siteConfig.url}/tutorials`,
  },
  openGraph: {
    title: 'Tutorials - String Art Generator',
    description: 'Complete guides for mastering string art creation',
    url: `${siteConfig.url}/tutorials`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const tutorials = [
  {
    id: 'physical-build',
    title: 'Physical Build Guide',
    description:
      'Complete step-by-step guide to creating string art physically, from materials to final touches.',
    icon: Wrench,
    difficulty: 'Intermediate',
    duration: '15 min read',
    topics: ['Materials', 'Setup', 'Construction', 'Finishing'],
    link: '/tutorials/physical-build',
  },
  {
    id: 'image-selection',
    title: 'Image Selection Guide',
    description:
      'Learn what makes a good image for string art and how to prepare your photos for best results.',
    icon: ImageIcon,
    difficulty: 'Beginner',
    duration: '10 min read',
    topics: ['Contrast', 'Composition', 'Pre-processing', 'Examples'],
    link: '/tutorials/image-selection',
  },
  {
    id: 'parameters',
    title: 'Parameter Optimization',
    description:
      'Master the settings: pins, lines, weight, and opacity. Get perfect results every time.',
    icon: Settings,
    difficulty: 'Beginner',
    duration: '12 min read',
    topics: ['Pins', 'Lines', 'Weight', 'Opacity', 'Tips'],
    link: '/tutorials/parameters',
  },
  {
    id: 'export-formats',
    title: 'Export Formats Explained',
    description:
      'Understand when to use PNG, SVG, JSON, or TXT. Maximize the potential of each format.',
    icon: Download,
    difficulty: 'Beginner',
    duration: '8 min read',
    topics: ['PNG', 'SVG', 'JSON', 'TXT', 'Use Cases'],
    link: '/tutorials/export-formats',
  },
];

export default function TutorialsPage() {
  return (
    <div className='container mx-auto max-w-6xl px-4 py-8 md:py-12'>
      {/* Header */}
      <div className='mb-8 md:mb-12 text-center'>
        <div className='inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4'>
          <BookOpen className='h-4 w-4 text-primary' />
          <span className='text-sm font-medium'>Tutorials</span>
        </div>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-4'>
          Learn String Art Creation
        </h1>
        <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
          Master the art of creating stunning string art patterns with our
          comprehensive tutorials. From beginner to advanced techniques.
        </p>
      </div>

      {/* Tutorials Grid */}
      <div className='grid md:grid-cols-2 gap-6 md:gap-8 mb-12'>
        {tutorials.map((tutorial) => {
          const Icon = tutorial.icon;
          return (
            <Card
              key={tutorial.id}
              className='hover:shadow-lg transition-shadow'>
              <CardContent className='p-6 space-y-4'>
                {/* Header */}
                <div className='flex items-start gap-4'>
                  <div className='h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0'>
                    <Icon className='h-6 w-6 text-primary' />
                  </div>
                  <div className='flex-1'>
                    <h3 className='font-bold text-lg mb-1'>{tutorial.title}</h3>
                    <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                      <Badge variant='outline' className='text-xs'>
                        {tutorial.difficulty}
                      </Badge>
                      <span className='flex items-center gap-1'>
                        <Clock className='h-3 w-3' />
                        {tutorial.duration}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className='text-sm text-foreground/80'>
                  {tutorial.description}
                </p>

                {/* Topics */}
                <div>
                  <p className='text-xs font-semibold text-muted-foreground mb-2'>
                    Topics covered:
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    {tutorial.topics.map((topic) => (
                      <Badge
                        key={topic}
                        variant='secondary'
                        className='text-xs'>
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action */}
                <Link href={tutorial.link}>
                  <Button className='w-full'>
                    Read Tutorial
                    <ArrowRight className='h-4 w-4 ml-2' />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Learning Path */}
      <Card className='mb-12 bg-primary/5'>
        <CardContent className='p-8'>
          <h2 className='text-2xl font-bold mb-6 text-center'>
            Recommended Learning Path
          </h2>
          <div className='grid md:grid-cols-4 gap-4'>
            <div className='text-center'>
              <div className='h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 font-bold'>
                1
              </div>
              <h3 className='font-semibold mb-1 text-sm'>Image Selection</h3>
              <p className='text-xs text-muted-foreground'>
                Start here to choose the right images
              </p>
            </div>
            <div className='text-center'>
              <div className='h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 font-bold'>
                2
              </div>
              <h3 className='font-semibold mb-1 text-sm'>Parameters</h3>
              <p className='text-xs text-muted-foreground'>
                Learn optimal settings for your images
              </p>
            </div>
            <div className='text-center'>
              <div className='h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 font-bold'>
                3
              </div>
              <h3 className='font-semibold mb-1 text-sm'>Export Formats</h3>
              <p className='text-xs text-muted-foreground'>
                Choose the right format for your needs
              </p>
            </div>
            <div className='text-center'>
              <div className='h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 font-bold'>
                4
              </div>
              <h3 className='font-semibold mb-1 text-sm'>Physical Build</h3>
              <p className='text-xs text-muted-foreground'>
                Create your design in the real world
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Resources */}
      <div className='grid md:grid-cols-3 gap-6'>
        <Card>
          <CardContent className='p-6'>
            <h3 className='font-bold mb-3'>Need Quick Answers?</h3>
            <p className='text-sm text-muted-foreground mb-4'>
              Check our FAQ for common questions and solutions.
            </p>
            <Link href='/faq'>
              <Button variant='outline' className='w-full'>
                View FAQ
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <h3 className='font-bold mb-3'>Get Inspired</h3>
            <p className='text-sm text-muted-foreground mb-4'>
              Browse our gallery of example patterns and configurations.
            </p>
            <Link href='/gallery'>
              <Button variant='outline' className='w-full'>
                View Gallery
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <h3 className='font-bold mb-3'>Ready to Create?</h3>
            <p className='text-sm text-muted-foreground mb-4'>
              Jump into the editor and start creating your string art.
            </p>
            <Link href='/editor'>
              <Button className='w-full'>Start Creating</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
