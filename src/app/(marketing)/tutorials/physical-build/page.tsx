// Server Component - Physical Build Tutorial
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Wrench,
  AlertCircle,
  CheckCircle2,
  Package,
  Ruler,
  Hammer,
  Sparkles,
} from 'lucide-react';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Physical Build Guide - String Art Tutorial',
  description:
    'Complete step-by-step guide to creating physical string art. Learn materials, tools, setup, construction techniques, and finishing touches.',
  alternates: {
    canonical: `${siteConfig.url}/tutorials/physical-build`,
  },
  openGraph: {
    title: 'Physical Build Guide - String Art Generator',
    description: 'Master physical string art construction from start to finish',
    url: `${siteConfig.url}/tutorials/physical-build`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PhysicalBuildPage() {
  return (
    <div className='container mx-auto max-w-4xl px-4 py-8 md:py-12'>
      {/* Header */}
      <div className='mb-8 md:mb-12'>
        <Link
          href='/tutorials'
          className='text-sm text-primary hover:underline mb-4 inline-block'>
          ← Back to Tutorials
        </Link>
        <div className='inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4'>
          <Wrench className='h-4 w-4 text-primary' />
          <span className='text-sm font-medium'>Tutorial</span>
        </div>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-4'>
          Physical Build Guide
        </h1>
        <div className='flex items-center gap-4 text-sm text-muted-foreground'>
          <Badge variant='outline'>Intermediate</Badge>
          <span>15 min read</span>
          <span>Updated Nov 2025</span>
        </div>
      </div>

      {/* Introduction */}
      <Card className='mb-8 bg-blue-500/5 border-blue-500/30'>
        <CardContent className='p-6'>
          <p className='text-foreground/90'>
            This guide will walk you through creating physical string art from
            your generated pattern. You'll learn materials selection, board
            preparation, pin placement, and stringing techniques.
          </p>
        </CardContent>
      </Card>

      {/* Materials Needed */}
      <section className='mb-12'>
        <h2 className='text-2xl font-bold mb-6 flex items-center gap-2'>
          <Package className='h-6 w-6 text-primary' />
          Materials & Tools
        </h2>

        <div className='space-y-6'>
          <Card>
            <CardContent className='p-6'>
              <h3 className='font-bold mb-4 text-lg'>Required Materials</h3>
              <ul className='space-y-3'>
                <li className='flex items-start gap-3'>
                  <CheckCircle2 className='h-5 w-5 text-green-500 shrink-0 mt-0.5' />
                  <div>
                    <strong>Wooden board:</strong> Plywood, pine, or MDF (12-24
                    inches diameter/square)
                  </div>
                </li>
                <li className='flex items-start gap-3'>
                  <CheckCircle2 className='h-5 w-5 text-green-500 shrink-0 mt-0.5' />
                  <div>
                    <strong>Nails/Pins:</strong> Small finishing nails (1-1.5
                    inches) or panel pins
                  </div>
                </li>
                <li className='flex items-start gap-3'>
                  <CheckCircle2 className='h-5 w-5 text-green-500 shrink-0 mt-0.5' />
                  <div>
                    <strong>Thread/String:</strong> Embroidery thread, crochet
                    cotton, or nylon thread (black recommended)
                  </div>
                </li>
                <li className='flex items-start gap-3'>
                  <CheckCircle2 className='h-5 w-5 text-green-500 shrink-0 mt-0.5' />
                  <div>
                    <strong>Hammer:</strong> Small tack hammer or lightweight
                    hammer
                  </div>
                </li>
                <li className='flex items-start gap-3'>
                  <CheckCircle2 className='h-5 w-5 text-green-500 shrink-0 mt-0.5' />
                  <div>
                    <strong>Ruler & Compass:</strong> For measuring and marking
                    pin positions
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-6'>
              <h3 className='font-bold mb-4 text-lg'>Optional Tools</h3>
              <ul className='space-y-2 text-sm'>
                <li className='flex items-start gap-2'>
                  <span className='text-muted-foreground'>•</span>
                  Sandpaper for smoothing the board
                </li>
                <li className='flex items-start gap-2'>
                  <span className='text-muted-foreground'>•</span>
                  Paint or stain for board finishing
                </li>
                <li className='flex items-start gap-2'>
                  <span className='text-muted-foreground'>•</span>
                  Protractor for accurate pin spacing
                </li>
                <li className='flex items-start gap-2'>
                  <span className='text-muted-foreground'>•</span>
                  Pencil for marking pin positions
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Step-by-Step Instructions */}
      <section className='mb-12'>
        <h2 className='text-2xl font-bold mb-6 flex items-center gap-2'>
          <Hammer className='h-6 w-6 text-primary' />
          Step-by-Step Construction
        </h2>

        <div className='space-y-6'>
          {/* Step 1 */}
          <Card>
            <CardContent className='p-6'>
              <div className='flex items-start gap-4 mb-4'>
                <div className='h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0'>
                  1
                </div>
                <div>
                  <h3 className='font-bold text-lg'>Prepare Your Board</h3>
                  <p className='text-sm text-muted-foreground'>
                    Sand and finish your wooden board
                  </p>
                </div>
              </div>
              <div className='ml-14 space-y-3 text-sm'>
                <p>
                  Sand the board smooth with 120-grit sandpaper. If desired,
                  apply paint or stain and let dry completely (24 hours).
                </p>
                <Card className='bg-yellow-500/5 border-yellow-500/30'>
                  <CardContent className='p-4 flex gap-3'>
                    <AlertCircle className='h-5 w-5 text-yellow-600 shrink-0' />
                    <p className='text-sm'>
                      <strong>Tip:</strong> Dark backgrounds (black, navy)
                      create stunning contrast with light-colored thread.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Step 2 */}
          <Card>
            <CardContent className='p-6'>
              <div className='flex items-start gap-4 mb-4'>
                <div className='h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0'>
                  2
                </div>
                <div>
                  <h3 className='font-bold text-lg'>Mark Pin Positions</h3>
                  <p className='text-sm text-muted-foreground'>
                    Calculate and mark where pins will go
                  </p>
                </div>
              </div>
              <div className='ml-14 space-y-3 text-sm'>
                <p>
                  Find the center of your board. Using a compass, draw a circle
                  (diameter depends on your design size). Divide the circle into
                  equal segments based on your pin count.
                </p>
                <div className='bg-muted/50 rounded p-4 space-y-2'>
                  <p className='font-semibold'>Pin Spacing Formula:</p>
                  <code className='text-xs'>Angle = 360° ÷ Number of Pins</code>
                  <p className='text-xs text-muted-foreground'>
                    Example: 200 pins = 360° ÷ 200 = 1.8° between each pin
                  </p>
                </div>
                <p>
                  Mark each pin position with a small pencil dot around the
                  circle.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Step 3 */}
          <Card>
            <CardContent className='p-6'>
              <div className='flex items-start gap-4 mb-4'>
                <div className='h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0'>
                  3
                </div>
                <div>
                  <h3 className='font-bold text-lg'>Hammer in the Pins</h3>
                  <p className='text-sm text-muted-foreground'>
                    Install pins at marked positions
                  </p>
                </div>
              </div>
              <div className='ml-14 space-y-3 text-sm'>
                <p>
                  Hammer a nail at each marked position. Keep pins at consistent
                  height (about 1/2 to 3/4 inch above the board).
                </p>
                <ul className='space-y-2'>
                  <li className='flex items-start gap-2'>
                    <span className='text-primary'>→</span>
                    Start at pin 0 and number them sequentially clockwise
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-primary'>→</span>
                    Ensure all pins are vertical, not angled
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-primary'>→</span>
                    Leave enough space above board for thread wrapping
                  </li>
                </ul>
                <Card className='bg-yellow-500/5 border-yellow-500/30'>
                  <CardContent className='p-4 flex gap-3'>
                    <AlertCircle className='h-5 w-5 text-yellow-600 shrink-0' />
                    <p className='text-sm'>
                      <strong>Important:</strong> Pin numbering must match your
                      exported pattern's pin sequence.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Step 4 */}
          <Card>
            <CardContent className='p-6'>
              <div className='flex items-start gap-4 mb-4'>
                <div className='h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0'>
                  4
                </div>
                <div>
                  <h3 className='font-bold text-lg'>String the Pattern</h3>
                  <p className='text-sm text-muted-foreground'>
                    Follow your exported line sequence
                  </p>
                </div>
              </div>
              <div className='ml-14 space-y-3 text-sm'>
                <p>
                  Export your pattern as TXT or JSON to get the line sequence.
                  The file contains pairs of pin numbers showing which pins to
                  connect.
                </p>
                <div className='bg-muted/50 rounded p-4 space-y-2'>
                  <p className='font-semibold'>Example line sequence:</p>
                  <code className='text-xs block'>
                    [0, 45], [45, 123], [123, 78], [78, 200]...
                  </code>
                  <p className='text-xs text-muted-foreground'>
                    Connect pin 0 to 45, then 45 to 123, etc.
                  </p>
                </div>
                <ul className='space-y-2'>
                  <li className='flex items-start gap-2'>
                    <span className='text-primary'>1.</span>
                    Tie thread to starting pin with a secure knot
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-primary'>2.</span>
                    Wrap thread around each pin once (don't pull too tight)
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-primary'>3.</span>
                    Follow the sequence exactly as exported
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-primary'>4.</span>
                    Tie off at the end and trim excess thread
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Step 5 */}
          <Card>
            <CardContent className='p-6'>
              <div className='flex items-start gap-4 mb-4'>
                <div className='h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0'>
                  5
                </div>
                <div>
                  <h3 className='font-bold text-lg'>Finishing Touches</h3>
                  <p className='text-sm text-muted-foreground'>
                    Complete and display your artwork
                  </p>
                </div>
              </div>
              <div className='ml-14 space-y-3 text-sm'>
                <p>
                  Once all lines are strung, check for any loose threads or
                  missed connections. Trim any stray threads.
                </p>
                <ul className='space-y-2'>
                  <li className='flex items-start gap-2'>
                    <CheckCircle2 className='h-4 w-4 text-green-500 shrink-0 mt-0.5' />
                    Apply clear coat spray to protect the thread (optional)
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle2 className='h-4 w-4 text-green-500 shrink-0 mt-0.5' />
                    Attach hanging hardware to the back
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle2 className='h-4 w-4 text-green-500 shrink-0 mt-0.5' />
                    Display your masterpiece!
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tips & Best Practices */}
      <section className='mb-12'>
        <h2 className='text-2xl font-bold mb-6'>Tips & Best Practices</h2>
        <div className='grid md:grid-cols-2 gap-6'>
          <Card>
            <CardContent className='p-6'>
              <h3 className='font-bold mb-3 flex items-center gap-2'>
                <Sparkles className='h-5 w-5 text-primary' />
                Pro Tips
              </h3>
              <ul className='space-y-2 text-sm'>
                <li>
                  • Start with fewer pins (100-150) for your first project
                </li>
                <li>• Use consistent tension when wrapping thread</li>
                <li>• Work in good lighting to see pin numbers clearly</li>
                <li>• Take breaks every 500 lines to avoid fatigue</li>
                <li>• Keep your thread spool nearby to prevent tangling</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-6'>
              <h3 className='font-bold mb-3 flex items-center gap-2'>
                <AlertCircle className='h-5 w-5 text-yellow-600' />
                Common Mistakes
              </h3>
              <ul className='space-y-2 text-sm'>
                <li>• Pulling thread too tight (causes warping)</li>
                <li>• Inconsistent pin heights (creates uneven surface)</li>
                <li>• Skipping lines in the sequence (ruins the pattern)</li>
                <li>• Using thread that's too thick or thin</li>
                <li>• Not numbering pins (easy to lose your place)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Time Estimates */}
      <Card className='mb-12 bg-primary/5'>
        <CardContent className='p-6'>
          <h3 className='font-bold text-lg mb-4 flex items-center gap-2'>
            <Ruler className='h-5 w-5 text-primary' />
            Time Estimates
          </h3>
          <div className='grid sm:grid-cols-3 gap-4 text-sm'>
            <div className='bg-background/50 rounded p-4'>
              <p className='font-semibold mb-1'>Beginner Project</p>
              <p className='text-xs text-muted-foreground mb-2'>
                100 pins, 1500 lines
              </p>
              <p className='text-2xl font-bold text-primary'>2-3 hours</p>
            </div>
            <div className='bg-background/50 rounded p-4'>
              <p className='font-semibold mb-1'>Intermediate</p>
              <p className='text-xs text-muted-foreground mb-2'>
                200 pins, 3000 lines
              </p>
              <p className='text-2xl font-bold text-primary'>4-6 hours</p>
            </div>
            <div className='bg-background/50 rounded p-4'>
              <p className='font-semibold mb-1'>Advanced</p>
              <p className='text-xs text-muted-foreground mb-2'>
                300+ pins, 5000+ lines
              </p>
              <p className='text-2xl font-bold text-primary'>8-12 hours</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className='flex flex-col sm:flex-row gap-4 justify-between'>
        <Link href='/tutorials'>
          <Button variant='outline'>
            <Wrench className='h-4 w-4 mr-2' />
            All Tutorials
          </Button>
        </Link>
        <div className='flex gap-4'>
          <Link href='/tutorials/export-formats'>
            <Button variant='outline'>← Export Formats</Button>
          </Link>
          <Link href='/editor'>
            <Button>
              Start Creating
              <Sparkles className='h-4 w-4 ml-2' />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
