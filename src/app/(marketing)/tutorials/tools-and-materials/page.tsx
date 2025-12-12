import type { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Lightbulb,
  Wrench,
  Package,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'String Art Tools and Materials Guide - Complete Equipment List',
  description:
    'Comprehensive guide to essential tools, materials, and equipment needed for string art. Learn about boards, pins, thread types, tools, and where to buy quality supplies.',
  alternates: {
    canonical:
      'https://www.stringartgenerator.app/tutorials/tools-and-materials',
  },
  openGraph: {
    title: 'String Art Tools and Materials - Essential Equipment Guide',
    description:
      'Everything you need to know about string art supplies, from boards and pins to thread types and finishing materials.',
    url: 'https://www.stringartgenerator.app/tutorials/tools-and-materials',
    type: 'article',
  },
};

export default function ToolsAndMaterialsPage() {
  return (
    <div className='container mx-auto px-4 py-12 max-w-5xl'>
      {/* Header */}
      <div className='text-center mb-12'>
        <div className='inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4'>
          <Wrench className='h-4 w-4 text-primary' />
          <span className='text-sm font-medium'>Tutorial</span>
        </div>
        <h1 className='text-4xl md:text-5xl font-bold mb-4'>
          String Art Tools & Materials Guide
        </h1>
        <p className='text-lg text-muted-foreground max-w-3xl mx-auto'>
          Complete guide to everything you need for string art: boards, pins,
          thread, tools, and finishing materials. Learn what to buy, where to
          buy it, and how to choose quality supplies.
        </p>
      </div>

      {/* Quick Reference */}
      <Alert className='mb-12 bg-primary/5 border-primary/20'>
        <Package className='h-5 w-5' />
        <AlertDescription className='mt-2'>
          <p className='font-semibold mb-2'>Quick Start Kit ($50-80):</p>
          <p className='text-sm'>
            1. Wood board (16-20" diameter, 3/4" thick) • 2. 200 pins (1-inch
            long) • 3. Quality thread (500m+ spool) • 4. Small hammer • 5. Ruler
            and pencil • 6. Sandpaper (220-grit) • 7. Wood stain (optional)
          </p>
        </AlertDescription>
      </Alert>

      <div className='space-y-12'>
        {/* Board Materials Section */}
        <section>
          <h2 className='text-3xl font-bold mb-6'>1. Board Materials</h2>

          <div className='space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <CheckCircle2 className='h-5 w-5 text-green-500' />
                  Wood Types Comparison
                </CardTitle>
                <CardDescription>
                  Choosing the right wood affects ease of work and final
                  appearance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-6'>
                  {/* Plywood */}
                  <div className='border-l-4 border-primary pl-4'>
                    <h3 className='text-xl font-semibold mb-2'>
                      Plywood (Best for Beginners)
                    </h3>
                    <div className='grid md:grid-cols-2 gap-4 mb-3'>
                      <div>
                        <p className='font-medium text-green-600 mb-1'>Pros:</p>
                        <ul className='text-sm space-y-1 text-muted-foreground'>
                          <li>• Affordable ($15-30 per project)</li>
                          <li>• Easy to find at hardware stores</li>
                          <li>• Stable, won&apos;t warp easily</li>
                          <li>• Smooth surface requires minimal sanding</li>
                          <li>• Available in large sheets</li>
                        </ul>
                      </div>
                      <div>
                        <p className='font-medium text-amber-600 mb-1'>Cons:</p>
                        <ul className='text-sm space-y-1 text-muted-foreground'>
                          <li>• Visible edge layers (seal edges)</li>
                          <li>• Less premium appearance</li>
                          <li>• May have voids in interior layers</li>
                        </ul>
                      </div>
                    </div>
                    <div className='bg-muted p-3 rounded-md text-sm'>
                      <p className='font-medium mb-1'>Best Types:</p>
                      <p className='text-muted-foreground'>
                        Baltic Birch (best quality), Maple plywood, or Sande
                        plywood. Get 3/4&quot; thickness minimum. Avoid cheap
                        construction plywood.
                      </p>
                    </div>
                  </div>

                  {/* Solid Hardwood */}
                  <div className='border-l-4 border-amber-500 pl-4'>
                    <h3 className='text-xl font-semibold mb-2'>
                      Solid Hardwood (Professional)
                    </h3>
                    <div className='grid md:grid-cols-2 gap-4 mb-3'>
                      <div>
                        <p className='font-medium text-green-600 mb-1'>Pros:</p>
                        <ul className='text-sm space-y-1 text-muted-foreground'>
                          <li>• Beautiful natural grain</li>
                          <li>• Premium, professional appearance</li>
                          <li>• Takes stain beautifully</li>
                          <li>• Very sturdy and durable</li>
                          <li>• Can charge more for final piece</li>
                        </ul>
                      </div>
                      <div>
                        <p className='font-medium text-amber-600 mb-1'>Cons:</p>
                        <ul className='text-sm space-y-1 text-muted-foreground'>
                          <li>• Expensive ($40-100+ per board)</li>
                          <li>• Can warp if not properly sealed</li>
                          <li>• Harder to drill (dense wood)</li>
                          <li>
                            • May need glue panels together for large sizes
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className='bg-muted p-3 rounded-md text-sm'>
                      <p className='font-medium mb-1'>Recommended Species:</p>
                      <p className='text-muted-foreground'>
                        <strong>Oak</strong> (classic, beautiful grain),
                        <strong> Maple</strong> (smooth, light color),
                        <strong> Walnut</strong> (dark, elegant),
                        <strong> Cherry</strong> (warm tones). Use 3/4&quot; to
                        1&quot; thickness.
                      </p>
                    </div>
                  </div>

                  {/* MDF */}
                  <div className='border-l-4 border-gray-400 pl-4'>
                    <h3 className='text-xl font-semibold mb-2'>
                      MDF - Medium Density Fiberboard
                    </h3>
                    <div className='grid md:grid-cols-2 gap-4 mb-3'>
                      <div>
                        <p className='font-medium text-green-600 mb-1'>Pros:</p>
                        <ul className='text-sm space-y-1 text-muted-foreground'>
                          <li>• Very smooth surface</li>
                          <li>• Inexpensive</li>
                          <li>• Pins go in easily</li>
                          <li>• Paints well</li>
                        </ul>
                      </div>
                      <div>
                        <p className='font-medium text-amber-600 mb-1'>Cons:</p>
                        <ul className='text-sm space-y-1 text-muted-foreground'>
                          <li>• Heavy (shipping costs)</li>
                          <li>• Pins can loosen over time</li>
                          <li>• Doesn&apos;t stain well (paint only)</li>
                          <li>• Creates toxic dust when cut (wear mask)</li>
                        </ul>
                      </div>
                    </div>
                    <div className='bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 p-3 rounded-md text-sm'>
                      <p className='font-medium text-amber-800 dark:text-amber-200 mb-1'>
                        ⚠️ Recommendation:
                      </p>
                      <p className='text-amber-700 dark:text-amber-300'>
                        Use MDF only for small, practice pieces or painted
                        projects. Not ideal for long-term quality pieces.
                      </p>
                    </div>
                  </div>

                  {/* Pine/Softwood */}
                  <div className='border-l-4 border-red-400 pl-4'>
                    <h3 className='text-xl font-semibold mb-2'>
                      Pine and Other Softwoods
                    </h3>
                    <div className='bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-4 rounded-md'>
                      <p className='font-medium text-red-800 dark:text-red-200 mb-2'>
                        ❌ Not Recommended
                      </p>
                      <p className='text-sm text-red-700 dark:text-red-300'>
                        Pine is cheap but problematic: pins loosen easily, wood
                        dents easily, stains unevenly (blotchy appearance). Only
                        use if practicing or doing temporary projects.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Board Dimensions */}
            <Card>
              <CardHeader>
                <CardTitle>Board Sizing Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div>
                    <h4 className='font-semibold mb-2'>Thickness:</h4>
                    <ul className='space-y-2 text-sm text-muted-foreground'>
                      <li>
                        <strong className='text-foreground'>
                          3/4&quot; (19mm):
                        </strong>{' '}
                        Standard, works for most projects up to 24&quot;
                      </li>
                      <li>
                        <strong className='text-foreground'>
                          1&quot; (25mm):
                        </strong>{' '}
                        Better for large pieces (30&quot;+), more stable
                      </li>
                      <li>
                        <strong className='text-foreground'>
                          1/2&quot; (13mm):
                        </strong>{' '}
                        Too thin, only for very small pieces, pins may poke
                        through
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className='font-semibold mb-2'>Diameter/Size:</h4>
                    <ul className='space-y-2 text-sm text-muted-foreground'>
                      <li>
                        <strong className='text-foreground'>
                          12-16&quot;:
                        </strong>{' '}
                        Small, good for learning, 2-4 hours work
                      </li>
                      <li>
                        <strong className='text-foreground'>
                          18-24&quot;:
                        </strong>{' '}
                        Medium, most popular size, 4-8 hours work
                      </li>
                      <li>
                        <strong className='text-foreground'>
                          30-36&quot;:
                        </strong>{' '}
                        Large, statement pieces, 10-20 hours work
                      </li>
                      <li>
                        <strong className='text-foreground'>
                          Rectangular:
                        </strong>{' '}
                        Common sizes like 24&quot;×16&quot; or 30&quot;×20&quot;
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pins Section */}
        <section>
          <h2 className='text-3xl font-bold mb-6'>2. Pins and Nails</h2>

          <div className='space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle>Pin Types and Specifications</CardTitle>
                <CardDescription>
                  The pins you choose affect both the creation process and final
                  appearance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-6'>
                  {/* Veneer Pins */}
                  <div className='bg-green-50 dark:bg-green-950 border-2 border-green-200 dark:border-green-800 p-4 rounded-lg'>
                    <h3 className='text-lg font-semibold text-green-800 dark:text-green-200 mb-2 flex items-center gap-2'>
                      <CheckCircle2 className='h-5 w-5' />
                      Veneer Pins (BEST CHOICE)
                    </h3>
                    <p className='text-sm text-green-700 dark:text-green-300 mb-3'>
                      Also called panel pins, these are the gold standard for
                      string art.
                    </p>
                    <div className='grid sm:grid-cols-2 gap-3 text-sm'>
                      <div>
                        <p className='font-medium mb-1'>Specifications:</p>
                        <ul className='space-y-1 text-muted-foreground'>
                          <li>• Length: 1&quot; to 1.5&quot; (25-38mm)</li>
                          <li>• Diameter: 0.8mm to 1.0mm</li>
                          <li>• Material: Steel (zinc plated)</li>
                          <li>• Head: Very small or flat</li>
                        </ul>
                      </div>
                      <div>
                        <p className='font-medium mb-1'>
                          Why They&apos;re Best:
                        </p>
                        <ul className='space-y-1 text-muted-foreground'>
                          <li>• Thin, elegant appearance</li>
                          <li>• Small heads don&apos;t interfere</li>
                          <li>• Smooth surface for strings</li>
                          <li>• Strong despite thinness</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Wire Nails */}
                  <div className='border-l-4 border-blue-500 pl-4'>
                    <h3 className='text-lg font-semibold mb-2'>
                      Wire Nails (Good Alternative)
                    </h3>
                    <p className='text-sm text-muted-foreground mb-2'>
                      Common finishing nails or wire nails work well if veneer
                      pins unavailable.
                    </p>
                    <p className='text-sm'>
                      <strong>Specs:</strong> 1&quot; to 1.25&quot; long, 18-20
                      gauge (about 1mm diameter).
                      <strong className='ml-2'>Tip:</strong> Choose finish nails
                      with small heads over common nails with large heads.
                    </p>
                  </div>

                  {/* Escutcheon Pins */}
                  <div className='border-l-4 border-purple-500 pl-4'>
                    <h3 className='text-lg font-semibold mb-2'>
                      Escutcheon Pins (Decorative Option)
                    </h3>
                    <p className='text-sm text-muted-foreground mb-2'>
                      Brass pins with decorative round heads create unique
                      aesthetic.
                    </p>
                    <p className='text-sm'>
                      <strong>Pros:</strong> Beautiful gold/brass color, elegant
                      appearance, no rust.
                      <strong className='ml-2'>Cons:</strong> Expensive ($15-30
                      per 100), visible heads (design element).
                    </p>
                  </div>

                  {/* T-Pins */}
                  <div className='bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-3 rounded-md'>
                    <h3 className='text-lg font-semibold text-red-800 dark:text-red-200 mb-1'>
                      ❌ Avoid: T-Pins, Thumb Tacks, Push Pins
                    </h3>
                    <p className='text-sm text-red-700 dark:text-red-300'>
                      Large heads interfere with strings, create messy
                      appearance, and make stringing difficult. Don&apos;t use
                      for final projects (practice only).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pin Quantity Calculator */}
            <Card>
              <CardHeader>
                <CardTitle>How Many Pins Do You Need?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-3 text-sm'>
                  <div className='grid sm:grid-cols-2 gap-4'>
                    <div className='p-3 bg-muted rounded-md'>
                      <p className='font-semibold mb-2'>Simple Designs:</p>
                      <ul className='space-y-1 text-muted-foreground'>
                        <li>• 12-16&quot; circle: 100-150 pins</li>
                        <li>• 18-20&quot; circle: 150-200 pins</li>
                        <li>• 24&quot; circle: 200-250 pins</li>
                      </ul>
                    </div>
                    <div className='p-3 bg-muted rounded-md'>
                      <p className='font-semibold mb-2'>Complex/Detailed:</p>
                      <ul className='space-y-1 text-muted-foreground'>
                        <li>• 16-20&quot; circle: 200-250 pins</li>
                        <li>• 24&quot; circle: 250-300 pins</li>
                        <li>• 30&quot;+ circle: 300-500 pins</li>
                      </ul>
                    </div>
                  </div>
                  <div className='bg-primary/5 p-3 rounded-md border border-primary/20'>
                    <p className='font-medium mb-1'>💡 Pro Tip:</p>
                    <p className='text-muted-foreground'>
                      Always buy 10-20% extra pins. You&apos;ll drop some, bend
                      some, and want extras for testing. Pins are cheap—buy a
                      pack of 500 for peace of mind.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Thread Section */}
        <section>
          <h2 className='text-3xl font-bold mb-6'>3. Thread and String</h2>

          <Card>
            <CardHeader>
              <CardTitle>Thread Types Comparison</CardTitle>
              <CardDescription>
                Thread choice dramatically affects appearance, durability, and
                ease of work
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-6'>
                {/* Polyester */}
                <div className='bg-green-50 dark:bg-green-950 border-2 border-green-200 dark:border-green-800 p-4 rounded-lg'>
                  <h3 className='text-lg font-semibold text-green-800 dark:text-green-200 mb-2'>
                    ✨ Polyester Thread (RECOMMENDED)
                  </h3>
                  <div className='grid md:grid-cols-2 gap-4 mb-3'>
                    <div>
                      <p className='font-medium text-sm mb-2'>Advantages:</p>
                      <ul className='text-sm space-y-1 text-muted-foreground'>
                        <li>• Minimal stretching (holds tension best)</li>
                        <li>• UV resistant (won&apos;t fade)</li>
                        <li>• Very strong and durable</li>
                        <li>• Vibrant color options</li>
                        <li>• Doesn&apos;t rot or mildew</li>
                        <li>• Moderate sheen (not too shiny)</li>
                      </ul>
                    </div>
                    <div>
                      <p className='font-medium text-sm mb-2'>
                        Considerations:
                      </p>
                      <ul className='text-sm space-y-1 text-muted-foreground'>
                        <li>• Slightly more expensive than cotton</li>
                        <li>
                          • Can feel &quot;plastic-y&quot; if very cheap quality
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className='bg-white dark:bg-gray-900 p-3 rounded-md'>
                    <p className='font-semibold text-sm mb-1'>
                      Recommended Brands:
                    </p>
                    <ul className='text-sm space-y-1 text-muted-foreground'>
                      <li>
                        • <strong>Gutermann Mara 100</strong> - Professional
                        grade, excellent quality
                      </li>
                      <li>
                        • <strong>Coats & Clark Dual Duty Plus</strong> - Widely
                        available, good quality
                      </li>
                      <li>
                        • <strong>Aurifil 40wt or 50wt</strong> - Premium,
                        smooth, vibrant colors
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Nylon */}
                <div className='border-l-4 border-blue-500 pl-4'>
                  <h3 className='text-lg font-semibold mb-2'>Nylon Thread</h3>
                  <div className='text-sm space-y-2'>
                    <p className='text-muted-foreground'>
                      Very strong and elastic, often used for outdoor
                      applications.
                    </p>
                    <p>
                      <strong>Pros:</strong> Strongest option, weather
                      resistant, glossy appearance
                    </p>
                    <p>
                      <strong>Cons:</strong> Stretches over time (tension
                      problems), very shiny (can look plastic), can be slippery
                      to work with
                    </p>
                    <p className='text-amber-600'>
                      <strong>Best Use:</strong> Outdoor string art or pieces in
                      humid environments
                    </p>
                  </div>
                </div>

                {/* Cotton */}
                <div className='border-l-4 border-amber-500 pl-4'>
                  <h3 className='text-lg font-semibold mb-2'>Cotton Thread</h3>
                  <div className='text-sm space-y-2'>
                    <p className='text-muted-foreground'>
                      Classic, natural fiber with matte appearance.
                    </p>
                    <p>
                      <strong>Pros:</strong> Matte finish (elegant), natural
                      material, soft to handle, inexpensive
                    </p>
                    <p>
                      <strong>Cons:</strong> Stretches significantly (loses
                      tension), fades in sunlight, can rot in humid conditions,
                      weaker than synthetic
                    </p>
                    <p className='text-amber-600'>
                      <strong>Best Use:</strong> Indoor pieces in controlled
                      environments, when matte appearance is crucial
                    </p>
                  </div>
                </div>

                {/* Embroidery Floss */}
                <div className='bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-3 rounded-md'>
                  <h3 className='text-lg font-semibold text-red-800 dark:text-red-200 mb-1'>
                    ❌ Not Recommended: Embroidery Floss, Yarn, Thick Cord
                  </h3>
                  <p className='text-sm text-red-700 dark:text-red-300'>
                    Too thick for traditional string art patterns. Multiple
                    strands create muddy appearance. Yarn/thick cord only work
                    for large-scale (4ft+) projects with simplified designs.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Thread Weight and Color */}
          <div className='grid md:grid-cols-2 gap-6 mt-6'>
            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>
                  Thread Weight (Thickness)
                </CardTitle>
              </CardHeader>
              <CardContent className='text-sm space-y-3'>
                <div>
                  <p className='font-semibold'>30wt (Thick):</p>
                  <p className='text-muted-foreground'>
                    Bold lines, fills space quickly, good for large simple
                    designs
                  </p>
                </div>
                <div>
                  <p className='font-semibold'>40wt (Medium) - RECOMMENDED:</p>
                  <p className='text-muted-foreground'>
                    Perfect balance, works for all projects, most versatile
                  </p>
                </div>
                <div>
                  <p className='font-semibold'>50wt (Fine):</p>
                  <p className='text-muted-foreground'>
                    Delicate lines, intricate detail, requires more passes for
                    density
                  </p>
                </div>
                <div className='bg-primary/5 p-3 rounded-md border border-primary/20'>
                  <p className='font-medium'>💡 Beginner Recommendation:</p>
                  <p className='text-muted-foreground'>
                    Start with 40wt polyester in black or white to learn the
                    process.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>Color Selection Guide</CardTitle>
              </CardHeader>
              <CardContent className='text-sm space-y-3'>
                <div>
                  <p className='font-semibold'>Black:</p>
                  <p className='text-muted-foreground'>
                    High contrast, works on any light board, bold appearance,
                    most popular
                  </p>
                </div>
                <div>
                  <p className='font-semibold'>White/Cream:</p>
                  <p className='text-muted-foreground'>
                    Elegant, works on dark boards, softer look, great for
                    portraits
                  </p>
                </div>
                <div>
                  <p className='font-semibold'>Colored Thread:</p>
                  <p className='text-muted-foreground'>
                    Consider board color contrast. Vibrant colors work best on
                    neutral boards
                  </p>
                </div>
                <div>
                  <p className='font-semibold'>Multi-Color Projects:</p>
                  <p className='text-muted-foreground'>
                    Start with 2-3 colors max. Layer light to dark. Test
                    combinations first
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Thread Quantity */}
          <Card className='mt-6'>
            <CardHeader>
              <CardTitle>How Much Thread Do You Need?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4 text-sm'>
                <div className='grid sm:grid-cols-3 gap-4'>
                  <div className='p-3 bg-muted rounded-md'>
                    <p className='font-semibold mb-2'>Small Project:</p>
                    <p className='text-muted-foreground'>
                      16&quot; circle, 2,500 lines
                    </p>
                    <p className='font-bold text-lg mt-1'>~500 meters</p>
                  </div>
                  <div className='p-3 bg-muted rounded-md'>
                    <p className='font-semibold mb-2'>Medium Project:</p>
                    <p className='text-muted-foreground'>
                      24&quot; circle, 4,000 lines
                    </p>
                    <p className='font-bold text-lg mt-1'>~1,200 meters</p>
                  </div>
                  <div className='p-3 bg-muted rounded-md'>
                    <p className='font-semibold mb-2'>Large Project:</p>
                    <p className='text-muted-foreground'>
                      30&quot; circle, 6,000 lines
                    </p>
                    <p className='font-bold text-lg mt-1'>~2,000 meters</p>
                  </div>
                </div>
                <Alert>
                  <Lightbulb className='h-4 w-4' />
                  <AlertDescription className='text-sm'>
                    <strong>Rule of Thumb:</strong> Rough length = Circle
                    diameter × Number of lines. Add 20% for waste and tension
                    adjustments. Buy large spools (1,000m+) or professional
                    cones (2,000-10,000m) for best value.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Tools Section */}
        <section>
          <h2 className='text-3xl font-bold mb-6'>4. Essential Tools</h2>

          <div className='space-y-6'>
            {/* Must-Have Tools */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <CheckCircle2 className='h-5 w-5 text-green-500' />
                  Must-Have Tools (Under $50)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {[
                    {
                      name: 'Small Hammer',
                      description:
                        'For installing pins. Use tack hammer or small finishing hammer (8-12 oz). Avoid framing hammers (too heavy, hard to control).',
                      cost: '$10-20',
                    },
                    {
                      name: 'Drill with Small Bits',
                      description:
                        'Essential for pilot holes. Cordless drill is best. Need bits 0.5-0.8mm (slightly smaller than pin diameter).',
                      cost: '$30-50 (or use existing)',
                    },
                    {
                      name: 'Ruler or Measuring Tape',
                      description:
                        'For marking pin positions accurately. Metal ruler or combination square ideal.',
                      cost: '$5-15',
                    },
                    {
                      name: 'Pencil and Eraser',
                      description:
                        'Marking pin positions. Use mechanical pencil for precision.',
                      cost: '$2-5',
                    },
                    {
                      name: 'Sandpaper Assortment',
                      description:
                        'Smoothing board surface. Get 120, 180, and 220 grit. Sanding block helps even pressure.',
                      cost: '$5-10',
                    },
                    {
                      name: 'Scissors',
                      description:
                        'Cutting thread. Sharp fabric scissors work best.',
                      cost: '$5-15',
                    },
                  ].map((tool, index) => (
                    <div
                      key={index}
                      className='flex gap-4 p-3 bg-muted rounded-lg'>
                      <div className='flex-1'>
                        <h4 className='font-semibold text-base mb-1'>
                          {tool.name}
                        </h4>
                        <p className='text-sm text-muted-foreground'>
                          {tool.description}
                        </p>
                      </div>
                      <div className='text-right'>
                        <p className='font-semibold text-primary whitespace-nowrap'>
                          {tool.cost}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Helpful Additions */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Lightbulb className='h-5 w-5 text-amber-500' />
                  Helpful Additions (Level Up Your Setup)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid md:grid-cols-2 gap-4'>
                  {[
                    {
                      name: 'Compass or Circle Jig',
                      description:
                        'Drawing perfect circles on board. Can also use string and pencil method.',
                      cost: '$10-30',
                    },
                    {
                      name: 'Speed Square',
                      description:
                        'Ensuring straight edges and right angles, especially for rectangular boards.',
                      cost: '$8-15',
                    },
                    {
                      name: 'Pin Vise',
                      description:
                        'Holding pins while hammering (protects fingers). Small investment, big safety benefit.',
                      cost: '$8-20',
                    },
                    {
                      name: 'Clamps',
                      description:
                        'Holding board steady while working. 2-4 C-clamps or quick-grip clamps.',
                      cost: '$15-30',
                    },
                    {
                      name: 'Protractor',
                      description:
                        'Dividing circle into equal pin positions mathematically.',
                      cost: '$5-10',
                    },
                    {
                      name: 'Work Light',
                      description:
                        'Good lighting crucial for precision. LED work light or adjustable desk lamp.',
                      cost: '$15-40',
                    },
                    {
                      name: 'Cutting Mat',
                      description:
                        'Protecting work surface, self-healing mat ideal for marking and cutting.',
                      cost: '$15-30',
                    },
                    {
                      name: 'Tweezers or Needle-Nose Pliers',
                      description:
                        'Removing bent pins or grabbing thread in tight spaces.',
                      cost: '$5-15',
                    },
                  ].map((tool, index) => (
                    <div key={index} className='p-3 border rounded-lg'>
                      <div className='flex justify-between items-start mb-1'>
                        <h4 className='font-semibold text-sm'>{tool.name}</h4>
                        <span className='text-xs font-semibold text-primary whitespace-nowrap ml-2'>
                          {tool.cost}
                        </span>
                      </div>
                      <p className='text-xs text-muted-foreground'>
                        {tool.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Finishing Materials */}
        <section>
          <h2 className='text-3xl font-bold mb-6'>5. Finishing Materials</h2>

          <Card>
            <CardHeader>
              <CardTitle>Board Finishing Supplies</CardTitle>
              <CardDescription>
                Proper finishing protects your work and creates professional
                appearance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-6'>
                <div>
                  <h3 className='font-semibold text-lg mb-3'>
                    Wood Stain (Optional)
                  </h3>
                  <p className='text-sm text-muted-foreground mb-3'>
                    Enhances wood grain and adds color. Apply before sealing.
                  </p>
                  <div className='grid sm:grid-cols-3 gap-3 text-sm'>
                    <div className='p-3 bg-muted rounded-md'>
                      <p className='font-semibold mb-1'>Water-Based:</p>
                      <p className='text-muted-foreground'>
                        Easy cleanup, less odor, dries fast. Good for beginners.
                      </p>
                      <p className='text-xs mt-1'>
                        Popular: Minwax Water-Based
                      </p>
                    </div>
                    <div className='p-3 bg-muted rounded-md'>
                      <p className='font-semibold mb-1'>Oil-Based:</p>
                      <p className='text-muted-foreground'>
                        Richer color, deeper penetration, longer dry time.
                      </p>
                      <p className='text-xs mt-1'>
                        Popular: Minwax Wood Finish
                      </p>
                    </div>
                    <div className='p-3 bg-muted rounded-md'>
                      <p className='font-semibold mb-1'>Gel Stain:</p>
                      <p className='text-muted-foreground'>
                        Doesn&apos;t soak in, sits on surface. Best for plywood.
                      </p>
                      <p className='text-xs mt-1'>Popular: General Finishes</p>
                    </div>
                  </div>
                  <div className='mt-2 text-sm'>
                    <p>
                      <strong>Popular Colors:</strong> Dark Walnut (elegant,
                      hides imperfections), Golden Oak (warm, classic), Ebony
                      (dramatic with light strings), Natural/Clear (shows wood
                      grain)
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className='font-semibold text-lg mb-3'>
                    Sealers/Topcoats (Essential)
                  </h3>
                  <p className='text-sm text-muted-foreground mb-3'>
                    Protects board from moisture and string oil/dirt. Apply 2-3
                    coats ALL SIDES.
                  </p>
                  <div className='space-y-3'>
                    <div className='border-l-4 border-green-500 pl-3'>
                      <h4 className='font-semibold text-base mb-1'>
                        Polyurethane (RECOMMENDED)
                      </h4>
                      <p className='text-sm text-muted-foreground mb-2'>
                        Durable, water-resistant, available in various sheens.
                      </p>
                      <p className='text-sm'>
                        <strong>Water-Based Poly:</strong> Clear (doesn&apos;t
                        yellow), low odor, dries fast (2-3 hours), easy cleanup.
                        <strong className='ml-2'>Oil-Based Poly:</strong> More
                        durable, amber tone, longer dry (8+ hours), strong odor.
                      </p>
                      <p className='text-sm mt-1'>
                        <strong>Sheen:</strong> Satin (most popular, low glare)
                        • Semi-gloss (slight shine) • Matte (flat, no shine)
                      </p>
                    </div>

                    <div className='border-l-4 border-blue-500 pl-3'>
                      <h4 className='font-semibold text-base mb-1'>
                        Paste Wax
                      </h4>
                      <p className='text-sm text-muted-foreground'>
                        Traditional finish, beautiful matte appearance, requires
                        reapplication over time. Apply with cloth, buff to
                        sheen.
                      </p>
                    </div>

                    <div className='border-l-4 border-purple-500 pl-3'>
                      <h4 className='font-semibold text-base mb-1'>
                        Spray Lacquer
                      </h4>
                      <p className='text-sm text-muted-foreground'>
                        Fast-drying, smooth finish, requires good ventilation.
                        Multiple thin coats better than one thick coat.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className='font-semibold text-lg mb-3'>
                    Application Tools
                  </h3>
                  <div className='grid sm:grid-cols-2 gap-3 text-sm'>
                    <div>
                      <p className='font-semibold mb-1'>For Stain:</p>
                      <p className='text-muted-foreground'>
                        Foam brushes (disposable, $1 each), cotton rags, or
                        bristle brushes
                      </p>
                    </div>
                    <div>
                      <p className='font-semibold mb-1'>For Polyurethane:</p>
                      <p className='text-muted-foreground'>
                        Quality synthetic bristle brush or foam applicator.
                        Clean between coats.
                      </p>
                    </div>
                  </div>
                </div>

                <Alert>
                  <AlertCircle className='h-4 w-4' />
                  <AlertDescription className='text-sm'>
                    <strong>Critical Timing:</strong> Complete ALL staining and
                    sealing BEFORE installing pins. Finish must fully cure
                    (48-72 hours minimum) before stringing. Seal all sides to
                    prevent warping.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Where to Buy */}
        <section>
          <h2 className='text-3xl font-bold mb-6'>6. Where to Buy Supplies</h2>

          <div className='grid md:grid-cols-2 gap-6'>
            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>Local Stores</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4 text-sm'>
                <div>
                  <h4 className='font-semibold mb-1'>
                    Hardware Stores (Home Depot, Lowe&apos;s, Menards):
                  </h4>
                  <p className='text-muted-foreground mb-1'>
                    <strong>Good for:</strong> Wood boards, pins/nails, hammers,
                    drills, stain, polyurethane, sandpaper, tools
                  </p>
                  <p className='text-muted-foreground'>
                    <strong>Tip:</strong> Can cut boards to size for small fee.
                    Check clearance section for discounted wood.
                  </p>
                </div>
                <div>
                  <h4 className='font-semibold mb-1'>
                    Craft Stores (Michaels, Jo-Ann, Hobby Lobby):
                  </h4>
                  <p className='text-muted-foreground mb-1'>
                    <strong>Good for:</strong> Thread, small tools, decorative
                    pins, finishing supplies, small pre-cut boards
                  </p>
                  <p className='text-muted-foreground'>
                    <strong>Tip:</strong> Watch for 40-50% off coupons. Thread
                    selection varies widely by store.
                  </p>
                </div>
                <div>
                  <h4 className='font-semibold mb-1'>
                    Fabric Stores (Jo-Ann Fabric, local shops):
                  </h4>
                  <p className='text-muted-foreground mb-1'>
                    <strong>Good for:</strong> High-quality thread (best
                    selection), large spools/cones
                  </p>
                  <p className='text-muted-foreground'>
                    <strong>Tip:</strong> Ask for professional thread section.
                    Often have bulk discounts.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>Online Retailers</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4 text-sm'>
                <div>
                  <h4 className='font-semibold mb-1'>Amazon:</h4>
                  <p className='text-muted-foreground'>
                    <strong>Good for:</strong> Everything, fast shipping, bulk
                    pin purchases, specialty tools
                  </p>
                  <p className='text-muted-foreground'>
                    <strong>Tip:</strong> Read reviews carefully. Check
                    &quot;Frequently Bought Together&quot; for kit ideas.
                  </p>
                </div>
                <div>
                  <h4 className='font-semibold mb-1'>
                    Specialty Thread Retailers:
                  </h4>
                  <p className='text-muted-foreground mb-1'>
                    <strong>WawakSewing.com:</strong> Professional thread,
                    industrial spools, excellent prices
                  </p>
                  <p className='text-muted-foreground'>
                    <strong>SuperiorThreads.com:</strong> High-end thread, huge
                    color selection
                  </p>
                </div>
                <div>
                  <h4 className='font-semibold mb-1'>Woodworking Suppliers:</h4>
                  <p className='text-muted-foreground mb-1'>
                    <strong>Rockler.com, Woodcraft.com:</strong> Premium boards,
                    specialty pins, quality finishes
                  </p>
                  <p className='text-muted-foreground'>
                    <strong>Tip:</strong> More expensive but excellent quality.
                    Good for high-end projects.
                  </p>
                </div>
                <div>
                  <h4 className='font-semibold mb-1'>Etsy:</h4>
                  <p className='text-muted-foreground'>
                    <strong>Good for:</strong> Custom-cut boards, specialty
                    pins, string art kits, unique supplies
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Material Kits */}
        <section>
          <h2 className='text-3xl font-bold mb-6'>
            7. Starter Kit Recommendations
          </h2>

          <div className='grid md:grid-cols-3 gap-6'>
            <Card className='border-2 border-primary/20'>
              <CardHeader>
                <CardTitle className='text-lg'>Budget Starter</CardTitle>
                <CardDescription>Under $50</CardDescription>
              </CardHeader>
              <CardContent className='space-y-3 text-sm'>
                <ul className='space-y-2 text-muted-foreground'>
                  <li>• 16&quot; plywood board ($10)</li>
                  <li>• 200 finish nails ($5)</li>
                  <li>• 1 spool polyester thread ($6)</li>
                  <li>• Basic hammer ($10)</li>
                  <li>• Sandpaper pack ($5)</li>
                  <li>• Pencil & ruler ($3)</li>
                  <li>• Water-based poly ($12)</li>
                </ul>
                <div className='pt-3 border-t'>
                  <p className='font-bold'>Total: ~$50</p>
                  <p className='text-muted-foreground text-xs mt-1'>
                    Perfect for testing if you enjoy string art
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className='border-2 border-primary'>
              <CardHeader>
                <CardTitle className='text-lg'>Recommended Starter</CardTitle>
                <CardDescription>$100-150 (Best Value)</CardDescription>
              </CardHeader>
              <CardContent className='space-y-3 text-sm'>
                <ul className='space-y-2 text-muted-foreground'>
                  <li>• 20&quot; Baltic birch board ($20)</li>
                  <li>• 500 veneer pins ($15)</li>
                  <li>• 3 spools quality thread ($25)</li>
                  <li>• Cordless drill with bits ($45)</li>
                  <li>• Tack hammer ($15)</li>
                  <li>• Complete sandpaper set ($8)</li>
                  <li>• Wood stain & poly ($20)</li>
                  <li>• Basic measuring tools ($10)</li>
                </ul>
                <div className='pt-3 border-t'>
                  <p className='font-bold'>Total: ~$158</p>
                  <p className='text-muted-foreground text-xs mt-1'>
                    Comprehensive kit for serious projects
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className='border-2 border-purple-500/20'>
              <CardHeader>
                <CardTitle className='text-lg'>Professional Setup</CardTitle>
                <CardDescription>$250-350</CardDescription>
              </CardHeader>
              <CardContent className='space-y-3 text-sm'>
                <ul className='space-y-2 text-muted-foreground'>
                  <li>• 24&quot; solid oak board ($40)</li>
                  <li>• 1,000 premium pins ($30)</li>
                  <li>• Professional thread cones ($50)</li>
                  <li>• Quality cordless drill ($80)</li>
                  <li>• Pin vise & precision tools ($25)</li>
                  <li>• Complete finishing supplies ($35)</li>
                  <li>• Work light & clamps ($30)</li>
                  <li>• Measurement tools ($20)</li>
                  <li>• Storage & organization ($20)</li>
                </ul>
                <div className='pt-3 border-t'>
                  <p className='font-bold'>Total: ~$330</p>
                  <p className='text-muted-foreground text-xs mt-1'>
                    For selling or high-volume creation
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Final Tips */}
        <Card className='bg-primary/5'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Lightbulb className='h-5 w-5 text-primary' />
              Final Material Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid md:grid-cols-2 gap-4 text-sm'>
              <div className='space-y-3'>
                <div>
                  <h4 className='font-semibold mb-1'>
                    Quality Matters Where It Counts:
                  </h4>
                  <p className='text-muted-foreground'>
                    Splurge on: Thread (shows in final piece), Board (foundation
                    of project), Finishing (protects work)
                  </p>
                </div>
                <div>
                  <h4 className='font-semibold mb-1'>Save Money On:</h4>
                  <p className='text-muted-foreground'>
                    Tools (basic is fine for start), Pins (bulk generic work
                    great), Consumables (sandpaper, brushes)
                  </p>
                </div>
                <div>
                  <h4 className='font-semibold mb-1'>Buy in Bulk:</h4>
                  <p className='text-muted-foreground'>
                    Pins, thread, and sandpaper are much cheaper in quantity. If
                    you&apos;ll make 3+ projects, buy bulk upfront.
                  </p>
                </div>
              </div>
              <div className='space-y-3'>
                <div>
                  <h4 className='font-semibold mb-1'>
                    Test Before Big Projects:
                  </h4>
                  <p className='text-muted-foreground'>
                    Try new materials on small test pieces first. Thread color,
                    wood stain, and finishing look different than expected.
                  </p>
                </div>
                <div>
                  <h4 className='font-semibold mb-1'>
                    Organization Saves Time:
                  </h4>
                  <p className='text-muted-foreground'>
                    Invest in storage: Thread racks, pin organizers, tool boxes.
                    Searching for supplies wastes project time.
                  </p>
                </div>
                <div>
                  <h4 className='font-semibold mb-1'>
                    Build Your Kit Gradually:
                  </h4>
                  <p className='text-muted-foreground'>
                    Start with essentials, add tools as you identify needs.
                    Don&apos;t buy everything at once—learn what you actually
                    use.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className='text-center bg-gradient-to-br from-primary/10 via-primary/5 to-background'>
          <CardContent className='py-12'>
            <h2 className='text-2xl md:text-3xl font-bold mb-4'>
              Ready to Start Creating?
            </h2>
            <p className='text-muted-foreground mb-6 max-w-2xl mx-auto'>
              Now that you know what materials you need, use our String Art
              Generator to create your first pattern.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link href='/editor'>
                <Button size='lg' className='w-full sm:w-auto'>
                  Open Pattern Generator
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
              </Link>
              <Link href='/tutorials'>
                <Button
                  size='lg'
                  variant='outline'
                  className='w-full sm:w-auto'>
                  View More Tutorials
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
