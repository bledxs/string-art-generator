import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Image as ImageIcon, Settings } from 'lucide-react';

type GalleryCategory =
  | 'portrait'
  | 'logo'
  | 'abstract'
  | 'animal'
  | 'landscape';

type GalleryItem = {
  id: number;
  title: string;
  category: GalleryCategory;
  description: string;
  pins: number;
  lines: number;
  weight: number;
  opacity: number;
  complexity: 'Beginner' | 'Intermediate' | 'Advanced';
  generationTime: string;
  imageSrc: string;
};

const galleryItems: GalleryItem[] = [
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
    imageSrc: '/blog/history-string-art.webp',
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
    imageSrc: '/blog/comparison.webp',
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
    imageSrc: '/blog/mathematics.webp',
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
    imageSrc: '/blog/artists.webp',
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
    imageSrc: '/blog/creative-ways.webp',
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
    imageSrc: '/blog/beginner-guide.webp',
  },
];

const categoryLabels: Record<GalleryCategory, string> = {
  portrait: 'Portraits',
  logo: 'Logos',
  abstract: 'Abstract',
  animal: 'Animals',
  landscape: 'Landscapes',
};

interface GalleryPageProps {
  searchParams: Promise<{ category?: string }>;
}

function isGalleryCategory(value: string): value is GalleryCategory {
  return value in categoryLabels;
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const { category } = await searchParams;
  const selectedCategory =
    typeof category === 'string' && isGalleryCategory(category)
      ? category
      : 'all';

  const filteredItems =
    selectedCategory === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All', count: galleryItems.length },
    ...Object.entries(categoryLabels).map(([id, label]) => ({
      id,
      label,
      count: galleryItems.filter((i) => i.category === id).length,
    })),
  ];

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
        {categories.map((cat) => {
          const active = cat.id === selectedCategory;
          const href =
            cat.id === 'all' ? '/gallery' : `/gallery?category=${cat.id}`;
          return (
            <Link key={cat.id} href={href}>
              <Badge
                variant={active ? 'default' : 'outline'}
                className='cursor-pointer hover:bg-primary/10 transition-colors px-4 py-2'>
                {cat.label} ({cat.count})
              </Badge>
            </Link>
          );
        })}
      </div>

      {/* Info Card */}
      <Card className='mb-8 bg-primary/5 border-primary/20'>
        <CardContent className='p-6'>
          <p className='text-sm text-foreground/80'>
            <strong className='text-foreground'>Tip:</strong> Each example
            includes a ready-to-use configuration (pins, lines, weight, and
            opacity). Open it in the editor and tweak parameters to match your
            image.
          </p>
        </CardContent>
      </Card>

      {/* Gallery Grid */}
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            className='overflow-hidden hover:shadow-lg transition-shadow'>
            {/* Preview Image */}
            <div className='aspect-square bg-muted relative overflow-hidden border-b'>
              <Image
                src={item.imageSrc}
                alt={item.title}
                fill
                className='object-cover'
                sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
              />
              <div className='absolute left-3 top-3'>
                <Badge variant='secondary' className='text-xs'>
                  {categoryLabels[item.category]}
                </Badge>
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

      <Card className='mt-12 bg-primary/5 border-primary/20'>
        <CardContent className='p-8 text-center'>
          <ImageIcon className='h-12 w-12 mx-auto text-primary mb-4' />
          <h2 className='font-bold text-xl mb-3'>Want better results?</h2>
          <p className='text-muted-foreground mb-6 max-w-xl mx-auto'>
            The biggest improvements usually come from choosing a high-contrast
            image and dialing in pins/lines. Use the tutorials to pick the right
            source image and optimize parameters.
          </p>
          <div className='flex flex-col sm:flex-row gap-3 justify-center'>
            <Link href='/tutorials/image-selection'>
              <Button variant='outline'>Image Selection Guide</Button>
            </Link>
            <Link href='/tutorials/parameters'>
              <Button>Parameter Optimization</Button>
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
