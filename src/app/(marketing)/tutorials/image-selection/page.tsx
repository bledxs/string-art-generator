// Server Component - Image Selection Tutorial
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Image as ImageIcon,
  CheckCircle,
  XCircle,
  Sparkles,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Image Selection Guide - String Art Tutorials',
  description:
    'Learn what makes a great image for string art. Discover tips for contrast, composition, and pre-processing to achieve stunning results.',
  alternates: {
    canonical: `${siteConfig.url}/tutorials/image-selection`,
  },
  openGraph: {
    title: 'Image Selection Guide - String Art Generator',
    description:
      'Master the art of choosing and preparing images for string art',
    url: `${siteConfig.url}/tutorials/image-selection`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ImageSelectionTutorial() {
  return (
    <div className='container mx-auto max-w-4xl px-4 py-8 md:py-12'>
      {/* Breadcrumb */}
      <nav className='mb-6 text-sm text-muted-foreground'>
        <Link href='/tutorials' className='hover:text-foreground'>
          Tutorials
        </Link>
        <span className='mx-2'>/</span>
        <span className='text-foreground'>Image Selection</span>
      </nav>

      {/* Header */}
      <div className='mb-8'>
        <div className='flex items-center gap-2 mb-4'>
          <Badge variant='outline'>Beginner</Badge>
          <Badge variant='secondary'>10 min read</Badge>
        </div>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-4'>
          Image Selection Guide
        </h1>
        <p className='text-lg text-muted-foreground'>
          Learn what makes a great image for string art and how to prepare your
          photos for stunning results.
        </p>
      </div>

      {/* Content */}
      <div className='prose prose-slate dark:prose-invert max-w-none'>
        {/* Introduction */}
        <section className='mb-8'>
          <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
            <ImageIcon className='h-6 w-6 text-primary' />
            Why Image Selection Matters
          </h2>
          <p className='text-foreground/80 mb-4'>
            Not all images work equally well for string art. The algorithm
            creates patterns by connecting lines between pins to darken specific
            areas, which means <strong>high contrast</strong> between light and
            dark regions is crucial for success.
          </p>
          <Card className='bg-blue-500/5 border-blue-500/30'>
            <CardContent className='p-4'>
              <p className='text-sm text-foreground/80'>
                <strong className='text-foreground'>Pro Tip:</strong> String art
                works by "drawing with darkness." The algorithm identifies
                bright areas and adds lines to darken them, so images with clear
                light/dark separation will always produce better results.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Key Characteristics */}
        <section className='mb-8'>
          <h2 className='text-2xl font-bold mb-4'>
            Key Characteristics of Good Images
          </h2>

          <div className='space-y-6'>
            {/* High Contrast */}
            <div>
              <h3 className='text-xl font-semibold mb-3 flex items-center gap-2'>
                <CheckCircle className='h-5 w-5 text-green-600 dark:text-green-400' />
                1. High Contrast
              </h3>
              <p className='text-foreground/80 mb-3'>
                Images with strong differences between light and dark areas
                produce the clearest string art patterns.
              </p>
              <div className='grid md:grid-cols-2 gap-4'>
                <Card className='border-green-500/50 bg-green-500/5'>
                  <CardContent className='p-4'>
                    <p className='text-sm font-semibold text-green-700 dark:text-green-400 mb-2'>
                      ✓ Good Examples:
                    </p>
                    <ul className='text-sm space-y-1 text-foreground/70'>
                      <li>• Black and white portraits</li>
                      <li>• Silhouettes against bright backgrounds</li>
                      <li>• High-contrast logos</li>
                      <li>• Dramatically lit photography</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className='border-red-500/50 bg-red-500/5'>
                  <CardContent className='p-4'>
                    <p className='text-sm font-semibold text-red-700 dark:text-red-400 mb-2'>
                      ✗ Avoid:
                    </p>
                    <ul className='text-sm space-y-1 text-foreground/70'>
                      <li>• Low-contrast grayscale images</li>
                      <li>• Washed-out or faded photos</li>
                      <li>• Images with subtle gradients</li>
                      <li>• Foggy or hazy scenes</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Simple Composition */}
            <div>
              <h3 className='text-xl font-semibold mb-3 flex items-center gap-2'>
                <CheckCircle className='h-5 w-5 text-green-600 dark:text-green-400' />
                2. Simple Composition
              </h3>
              <p className='text-foreground/80 mb-3'>
                String art excels at capturing bold shapes and clear subjects,
                but struggles with intricate details.
              </p>
              <div className='grid md:grid-cols-2 gap-4'>
                <Card className='border-green-500/50 bg-green-500/5'>
                  <CardContent className='p-4'>
                    <p className='text-sm font-semibold text-green-700 dark:text-green-400 mb-2'>
                      ✓ Works Well:
                    </p>
                    <ul className='text-sm space-y-1 text-foreground/70'>
                      <li>• Single subject portraits</li>
                      <li>• Clean logos and typography</li>
                      <li>• Geometric patterns</li>
                      <li>• Animal silhouettes</li>
                      <li>• Iconic landmarks</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className='border-red-500/50 bg-red-500/5'>
                  <CardContent className='p-4'>
                    <p className='text-sm font-semibold text-red-700 dark:text-red-400 mb-2'>
                      ✗ Difficult:
                    </p>
                    <ul className='text-sm space-y-1 text-foreground/70'>
                      <li>• Busy backgrounds</li>
                      <li>• Fine textures (fur, grass)</li>
                      <li>• Multiple subjects</li>
                      <li>• Complex scenes</li>
                      <li>• Small intricate details</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Clear Subject */}
            <div>
              <h3 className='text-xl font-semibold mb-3 flex items-center gap-2'>
                <CheckCircle className='h-5 w-5 text-green-600 dark:text-green-400' />
                3. Clear Subject
              </h3>
              <p className='text-foreground/80 mb-3'>
                The main subject should be easily distinguishable from the
                background.
              </p>
              <ul className='list-disc pl-6 space-y-2 text-foreground/80'>
                <li>
                  <strong>Portraits:</strong> Face should be well-lit with clear
                  features
                </li>
                <li>
                  <strong>Objects:</strong> Clean edges and distinct shapes
                </li>
                <li>
                  <strong>Logos:</strong> Bold lines without fine details
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Image Types */}
        <section className='mb-8'>
          <h2 className='text-2xl font-bold mb-4'>Best Image Types</h2>

          <div className='space-y-4'>
            <Card>
              <CardContent className='p-6'>
                <h3 className='font-bold text-lg mb-2 flex items-center gap-2'>
                  <Badge variant='default'>Excellent</Badge>
                  Portraits
                </h3>
                <p className='text-sm text-foreground/80 mb-3'>
                  Headshots and face portraits work exceptionally well,
                  especially with dramatic lighting.
                </p>
                <p className='text-xs text-muted-foreground'>
                  <strong>Tips:</strong> Front or 3/4 view, clear facial
                  features, strong side lighting, dark background.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='p-6'>
                <h3 className='font-bold text-lg mb-2 flex items-center gap-2'>
                  <Badge variant='default'>Excellent</Badge>
                  Logos & Typography
                </h3>
                <p className='text-sm text-foreground/80 mb-3'>
                  Simple logos with bold shapes and clear lettering are ideal
                  candidates.
                </p>
                <p className='text-xs text-muted-foreground'>
                  <strong>Tips:</strong> High-resolution, solid colors, no
                  gradients, simplified version works best.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='p-6'>
                <h3 className='font-bold text-lg mb-2 flex items-center gap-2'>
                  <Badge variant='secondary'>Good</Badge>
                  Silhouettes
                </h3>
                <p className='text-sm text-foreground/80 mb-3'>
                  Perfect high-contrast option with clear subject boundaries.
                </p>
                <p className='text-xs text-muted-foreground'>
                  <strong>Tips:</strong> Clean edges, interesting shapes, simple
                  outlines work best.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='p-6'>
                <h3 className='font-bold text-lg mb-2 flex items-center gap-2'>
                  <Badge variant='secondary'>Good</Badge>
                  Animals
                </h3>
                <p className='text-sm text-foreground/80 mb-3'>
                  Animal faces and profiles create striking string art,
                  especially with distinctive features.
                </p>
                <p className='text-xs text-muted-foreground'>
                  <strong>Tips:</strong> Close-ups work better than full body,
                  avoid fine fur details.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='p-6'>
                <h3 className='font-bold text-lg mb-2 flex items-center gap-2'>
                  <Badge variant='outline'>Challenging</Badge>
                  Landscapes
                </h3>
                <p className='text-sm text-foreground/80 mb-3'>
                  Possible but requires careful selection and high contrast.
                </p>
                <p className='text-xs text-muted-foreground'>
                  <strong>Tips:</strong> Dramatic skies, strong foreground
                  elements, simplified compositions.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pre-Processing */}
        <section className='mb-8'>
          <h2 className='text-2xl font-bold mb-4'>
            Pre-Processing Your Images
          </h2>
          <p className='text-foreground/80 mb-4'>
            You can dramatically improve results by editing your image before
            uploading. Use any photo editor (Photoshop, GIMP, even phone apps).
          </p>

          <div className='space-y-4'>
            <Card className='bg-muted/30'>
              <CardContent className='p-6'>
                <h3 className='font-semibold mb-3'>1. Increase Contrast</h3>
                <p className='text-sm text-foreground/80 mb-2'>
                  Boost contrast by 30-50% to make light and dark areas more
                  distinct.
                </p>
                <p className='text-xs text-muted-foreground'>
                  Tools: Contrast slider, Levels, Curves
                </p>
              </CardContent>
            </Card>

            <Card className='bg-muted/30'>
              <CardContent className='p-6'>
                <h3 className='font-semibold mb-3'>2. Convert to Grayscale</h3>
                <p className='text-sm text-foreground/80 mb-2'>
                  String art uses brightness only, so converting to black and
                  white helps you see what the algorithm will see.
                </p>
                <p className='text-xs text-muted-foreground'>
                  Tools: Desaturate, Black & White adjustment
                </p>
              </CardContent>
            </Card>

            <Card className='bg-muted/30'>
              <CardContent className='p-6'>
                <h3 className='font-semibold mb-3'>3. Remove Background</h3>
                <p className='text-sm text-foreground/80 mb-2'>
                  Isolate your subject with a solid white or black background
                  for maximum clarity.
                </p>
                <p className='text-xs text-muted-foreground'>
                  Tools: Background eraser, Magic wand, remove.bg
                </p>
              </CardContent>
            </Card>

            <Card className='bg-muted/30'>
              <CardContent className='p-6'>
                <h3 className='font-semibold mb-3'>4. Simplify Details</h3>
                <p className='text-sm text-foreground/80 mb-2'>
                  Use posterize or threshold effects to reduce to 2-4 tone
                  levels for ultra-clean results.
                </p>
                <p className='text-xs text-muted-foreground'>
                  Tools: Posterize, Threshold, High Pass filter
                </p>
              </CardContent>
            </Card>

            <Card className='bg-muted/30'>
              <CardContent className='p-6'>
                <h3 className='font-semibold mb-3'>5. Crop to Square</h3>
                <p className='text-sm text-foreground/80 mb-2'>
                  Square images (1:1 aspect ratio) work best since string art is
                  created in a circle.
                </p>
                <p className='text-xs text-muted-foreground'>
                  Recommended: 2000x2000px or 3000x3000px
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quick Checklist */}
        <section className='mb-8'>
          <h2 className='text-2xl font-bold mb-4'>Pre-Upload Checklist</h2>
          <Card className='border-primary/50 bg-primary/5'>
            <CardContent className='p-6'>
              <ul className='space-y-2 text-sm'>
                <li className='flex items-start gap-2'>
                  <CheckCircle className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                  <span>
                    <strong>High contrast:</strong> Clear difference between
                    light and dark
                  </span>
                </li>
                <li className='flex items-start gap-2'>
                  <CheckCircle className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                  <span>
                    <strong>Simple subject:</strong> Bold shapes, not intricate
                    details
                  </span>
                </li>
                <li className='flex items-start gap-2'>
                  <CheckCircle className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                  <span>
                    <strong>Clean background:</strong> Subject stands out
                    clearly
                  </span>
                </li>
                <li className='flex items-start gap-2'>
                  <CheckCircle className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                  <span>
                    <strong>Square format:</strong> 1:1 aspect ratio
                  </span>
                </li>
                <li className='flex items-start gap-2'>
                  <CheckCircle className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                  <span>
                    <strong>Good resolution:</strong> At least 1000x1000px
                  </span>
                </li>
                <li className='flex items-start gap-2'>
                  <CheckCircle className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                  <span>
                    <strong>Proper format:</strong> PNG, JPG, JPEG, or WebP
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Common Mistakes */}
        <section className='mb-8'>
          <h2 className='text-2xl font-bold mb-4'>Common Mistakes to Avoid</h2>
          <div className='space-y-3'>
            <Card className='border-red-500/50 bg-red-500/5'>
              <CardContent className='p-4 flex items-start gap-3'>
                <XCircle className='h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5' />
                <div>
                  <p className='text-sm font-semibold text-foreground mb-1'>
                    Using low-contrast images
                  </p>
                  <p className='text-xs text-foreground/70'>
                    Result: Washed out, unclear patterns. Fix: Increase contrast
                    before uploading.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className='border-red-500/50 bg-red-500/5'>
              <CardContent className='p-4 flex items-start gap-3'>
                <XCircle className='h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5' />
                <div>
                  <p className='text-sm font-semibold text-foreground mb-1'>
                    Overly complex images
                  </p>
                  <p className='text-xs text-foreground/70'>
                    Result: Muddy, indistinct results. Fix: Simplify or choose a
                    cleaner image.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className='border-red-500/50 bg-red-500/5'>
              <CardContent className='p-4 flex items-start gap-3'>
                <XCircle className='h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5' />
                <div>
                  <p className='text-sm font-semibold text-foreground mb-1'>
                    Busy backgrounds
                  </p>
                  <p className='text-xs text-foreground/70'>
                    Result: Subject lost in noise. Fix: Remove or blur
                    background.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className='border-red-500/50 bg-red-500/5'>
              <CardContent className='p-4 flex items-start gap-3'>
                <XCircle className='h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5' />
                <div>
                  <p className='text-sm font-semibold text-foreground mb-1'>
                    Non-square images
                  </p>
                  <p className='text-xs text-foreground/70'>
                    Result: Subject gets cropped awkwardly. Fix: Crop to square
                    first.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className='mt-12 flex flex-col sm:flex-row gap-4 justify-between'>
        <Link href='/tutorials'>
          <Button variant='outline'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to Tutorials
          </Button>
        </Link>
        <Link href='/tutorials/parameters'>
          <Button>
            Next: Parameter Optimization
            <ArrowRight className='h-4 w-4 ml-2' />
          </Button>
        </Link>
      </div>

      {/* CTA */}
      <Card className='mt-8 bg-primary/5'>
        <CardContent className='p-6 text-center'>
          <Sparkles className='h-10 w-10 mx-auto text-primary mb-3' />
          <h3 className='font-bold text-lg mb-2'>Ready to Try?</h3>
          <p className='text-sm text-muted-foreground mb-4'>
            Put these tips into practice and create your first string art
          </p>
          <Link href='/editor'>
            <Button>Start Creating</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
