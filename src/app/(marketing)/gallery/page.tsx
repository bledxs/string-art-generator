'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Image as ImageIcon, Settings } from 'lucide-react';

// Example gallery items (in production, these could come from a CMS or database)
const galleryItems = [
  {
    id: 1,
    title: 'Portrait - Classic Style',
    category: 'portrait',
    description: 'High-contrast portrait with excellent detail preservation',
    pins: 300,
    lines: 4000,
    weight: 0.5,
    opacity: 0.15,
    complexity: 'Advanced',
    generationTime: '45s',
  },
  {
    id: 2,
    title: 'Minimalist Logo',
    category: 'logo',
    description: 'Clean brand logo with sharp edges and clear readability',
    pins: 150,
    lines: 2000,
    weight: 0.8,
    opacity: 0.2,
    complexity: 'Beginner',
    generationTime: '15s',
  },
  {
    id: 3,
    title: 'Abstract Geometric',
    category: 'abstract',
    description: 'Modern geometric pattern with flowing lines',
    pins: 200,
    lines: 3000,
    weight: 0.3,
    opacity: 0.12,
    complexity: 'Intermediate',
    generationTime: '25s',
  },
  {
    id: 4,
    title: 'Animal Silhouette',
    category: 'animal',
    description: 'Wildlife portrait with dramatic contrast',
    pins: 250,
    lines: 3500,
    weight: 0.6,
    opacity: 0.18,
    complexity: 'Intermediate',
    generationTime: '35s',
  },
  {
    id: 5,
    title: 'Landscape Scene',
    category: 'landscape',
    description: 'Mountain landscape with depth and texture',
    pins: 280,
    lines: 4200,
    weight: 0.4,
    opacity: 0.14,
    complexity: 'Advanced',
    generationTime: '50s',
  },
  {
    id: 6,
    title: 'Typography Design',
    category: 'logo',
    description: 'Bold lettering with strong visual impact',
    pins: 180,
    lines: 2500,
    weight: 0.7,
    opacity: 0.22,
    complexity: 'Beginner',
    generationTime: '20s',
  },
];

const categories = [
  { id: 'all', label: 'All', count: galleryItems.length },
  {
    id: 'portrait',
    label: 'Portraits',
    count: galleryItems.filter((i) => i.category === 'portrait').length,
  },
  {
    id: 'logo',
    label: 'Logos',
    count: galleryItems.filter((i) => i.category === 'logo').length,
  },
  {
    id: 'abstract',
    label: 'Abstract',
    count: galleryItems.filter((i) => i.category === 'abstract').length,
  },
  {
    id: 'animal',
    label: 'Animals',
    count: galleryItems.filter((i) => i.category === 'animal').length,
  },
  {
    id: 'landscape',
    label: 'Landscapes',
    count: galleryItems.filter((i) => i.category === 'landscape').length,
  },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredItems =
    selectedCategory === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);
  return (
    <div className='container mx-auto max-w-7xl px-4 py-8 md:py-12'>
      {/* Header */}
      <div className='mb-8 md:mb-12 text-center'>
        <div className='inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4'>
          <ImageIcon className='h-4 w-4 text-primary' />
          <span className='text-sm font-medium'>Gallery</span>
        </div>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-4'>
          String Art Gallery
        </h1>
        <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
          Explore stunning examples created with String Art Generator. Get
          inspired and learn optimal settings for different image types.
        </p>
      </div>

      {/* Category Filters */}
      <div className='mb-8 flex flex-wrap gap-2 justify-center'>
        {categories.map((cat) => (
          <Badge
            key={cat.id}
            variant={cat.id === selectedCategory ? 'default' : 'outline'}
            className='cursor-pointer hover:bg-primary/10 transition-colors px-4 py-2'
            onClick={() => setSelectedCategory(cat.id)}>
            {cat.label} ({cat.count})
          </Badge>
        ))}
      </div>

      {/* Info Card */}
      <Card className='mb-8 bg-blue-500/5 border-blue-500/30'>
        <CardContent className='p-6'>
          <p className='text-sm text-foreground/80'>
            <strong className='text-foreground'>Note:</strong> These are example
            configurations. Actual gallery images will be added soon. Each
            example shows optimal parameter settings you can replicate in the
            editor.
          </p>
        </CardContent>
      </Card>

      {/* Gallery Grid */}
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            className='overflow-hidden hover:shadow-lg transition-shadow'>
            {/* Image Placeholder */}
            <div className='aspect-square bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center border-b'>
              <div className='text-center space-y-2 p-6'>
                <ImageIcon className='h-12 w-12 mx-auto text-muted-foreground/40' />
                <p className='text-sm text-muted-foreground'>
                  Example Image Coming Soon
                </p>
                <p className='text-xs text-muted-foreground/70'>
                  {item.category.charAt(0).toUpperCase() +
                    item.category.slice(1)}
                </p>
              </div>
            </div>

            {/* Content */}
            <CardContent className='p-6 space-y-4'>
              {/* Title & Category */}
              <div>
                <div className='flex items-start justify-between gap-2 mb-2'>
                  <h3 className='font-bold text-lg'>{item.title}</h3>
                  <Badge variant='secondary' className='shrink-0 text-xs'>
                    {item.complexity}
                  </Badge>
                </div>
                <p className='text-sm text-muted-foreground'>
                  {item.description}
                </p>
              </div>

              {/* Parameters */}
              <div className='space-y-2'>
                <div className='flex items-center gap-2 text-sm'>
                  <Settings className='h-4 w-4 text-primary' />
                  <span className='font-semibold'>Configuration:</span>
                </div>
                <div className='grid grid-cols-2 gap-2 text-xs'>
                  <div className='bg-muted/50 rounded p-2'>
                    <span className='text-muted-foreground'>Pins:</span>
                    <span className='ml-1 font-medium'>{item.pins}</span>
                  </div>
                  <div className='bg-muted/50 rounded p-2'>
                    <span className='text-muted-foreground'>Lines:</span>
                    <span className='ml-1 font-medium'>{item.lines}</span>
                  </div>
                  <div className='bg-muted/50 rounded p-2'>
                    <span className='text-muted-foreground'>Weight:</span>
                    <span className='ml-1 font-medium'>{item.weight}</span>
                  </div>
                  <div className='bg-muted/50 rounded p-2'>
                    <span className='text-muted-foreground'>Opacity:</span>
                    <span className='ml-1 font-medium'>{item.opacity}</span>
                  </div>
                </div>
                <p className='text-xs text-muted-foreground'>
                  Generation time: ~{item.generationTime}
                </p>
              </div>

              {/* Action */}
              <Link
                href={`/editor?pins=${item.pins}&lines=${item.lines}&weight=${item.weight}&opacity=${item.opacity}`}
                className='block'>
                <Button className='w-full' size='sm'>
                  <Sparkles className='h-4 w-4 mr-2' />
                  Try These Settings
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Coming Soon Section */}
      <Card className='mt-12 bg-primary/5'>
        <CardContent className='p-8 text-center'>
          <Sparkles className='h-12 w-12 mx-auto text-primary mb-4' />
          <h3 className='font-bold text-xl mb-3'>More Examples Coming Soon</h3>
          <p className='text-muted-foreground mb-6 max-w-xl mx-auto'>
            We're curating a collection of stunning string art examples with
            before/after images and optimal settings. Check back soon!
          </p>
          <div className='flex flex-col sm:flex-row gap-3 justify-center'>
            <Link href='/editor'>
              <Button>
                <Sparkles className='h-4 w-4 mr-2' />
                Start Creating
              </Button>
            </Link>
            <Link href='/tutorials'>
              <Button variant='outline'>View Tutorials</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Tips Section */}
      <div className='mt-12 grid md:grid-cols-3 gap-6'>
        <Card>
          <CardContent className='p-6'>
            <h3 className='font-bold mb-3 flex items-center gap-2'>
              <ImageIcon className='h-5 w-5 text-primary' />
              Portraits
            </h3>
            <p className='text-sm text-muted-foreground mb-3'>
              Best with high-contrast photos. Use 250-350 pins and 3500-5000
              lines for maximum detail.
            </p>
            <Link
              href='/tutorials/image-selection'
              className='text-sm text-primary hover:underline'>
              Learn more →
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <h3 className='font-bold mb-3 flex items-center gap-2'>
              <Settings className='h-5 w-5 text-primary' />
              Logos
            </h3>
            <p className='text-sm text-muted-foreground mb-3'>
              Simple and clean. Use 100-200 pins and 1500-2500 lines for sharp
              edges and clarity.
            </p>
            <Link
              href='/tutorials/parameters'
              className='text-sm text-primary hover:underline'>
              Parameter guide →
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <h3 className='font-bold mb-3 flex items-center gap-2'>
              <Sparkles className='h-5 w-5 text-primary' />
              Abstract
            </h3>
            <p className='text-sm text-muted-foreground mb-3'>
              Experiment freely! Try unusual pin counts (50-150) and varied line
              weights for unique effects.
            </p>
            <Link href='/faq' className='text-sm text-primary hover:underline'>
              See FAQ →
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
