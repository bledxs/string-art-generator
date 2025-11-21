// Server Component - Parameter Optimization Tutorial
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Settings,
  Target,
  Zap,
  TrendingUp,
  ArrowLeft,
  ArrowRight,
  Info,
} from 'lucide-react';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Parameter Optimization Guide - String Art Tutorials',
  description:
    'Master the four key parameters: pins, lines, line weight, and opacity. Learn optimal values for different image types and quality needs.',
  alternates: {
    canonical: `${siteConfig.url}/tutorials/parameters`,
  },
  openGraph: {
    title: 'Parameter Optimization - String Art Generator',
    description: 'Fine-tune your string art with optimal parameter settings',
    url: `${siteConfig.url}/tutorials/parameters`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ParametersTutorial() {
  return (
    <div className='container mx-auto max-w-4xl px-4 py-8 md:py-12'>
      {/* Breadcrumb */}
      <nav className='mb-6 text-sm text-muted-foreground'>
        <Link href='/tutorials' className='hover:text-foreground'>
          Tutorials
        </Link>
        <span className='mx-2'>/</span>
        <span className='text-foreground'>Parameter Optimization</span>
      </nav>

      {/* Header */}
      <div className='mb-8'>
        <div className='flex items-center gap-2 mb-4'>
          <Badge variant='outline'>Intermediate</Badge>
          <Badge variant='secondary'>12 min read</Badge>
        </div>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-4'>
          Parameter Optimization Guide
        </h1>
        <p className='text-lg text-muted-foreground'>
          Master the four key parameters to achieve the perfect balance between
          quality, detail, and generation time.
        </p>
      </div>

      {/* Content */}
      <div className='prose prose-slate dark:prose-invert max-w-none'>
        {/* Introduction */}
        <section className='mb-8'>
          <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
            <Settings className='h-6 w-6 text-primary' />
            Understanding Parameters
          </h2>
          <p className='text-foreground/80 mb-4'>
            String art generation is controlled by four primary parameters. Each
            one affects quality, processing time, and the final appearance.
            Understanding their relationships is key to optimizing results.
          </p>
          <Card className='bg-blue-500/5 border-blue-500/30'>
            <CardContent className='p-4'>
              <p className='text-sm text-foreground/80'>
                <strong className='text-foreground'>Key Insight:</strong> Higher
                values = better quality but slower generation. The art is
                finding the sweet spot for your needs.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* The Four Parameters */}
        <section className='mb-8'>
          <h2 className='text-2xl font-bold mb-4'>The Four Parameters</h2>

          <div className='space-y-6'>
            {/* Pins */}
            <Card className='border-primary/50'>
              <CardContent className='p-6'>
                <div className='flex items-start justify-between mb-4'>
                  <div>
                    <h3 className='text-xl font-bold mb-1'>Number of Pins</h3>
                    <p className='text-sm text-muted-foreground'>
                      Range: 50 - 500 | Default: 200
                    </p>
                  </div>
                  <Target className='h-8 w-8 text-primary' />
                </div>

                <div className='space-y-3'>
                  <div>
                    <p className='text-sm font-semibold mb-1'>What it does:</p>
                    <p className='text-sm text-foreground/80'>
                      Determines the number of anchor points around the circle
                      where strings can connect. More pins = finer detail
                      resolution.
                    </p>
                  </div>

                  <div>
                    <p className='text-sm font-semibold mb-1'>Impact:</p>
                    <ul className='text-sm space-y-1 text-foreground/80 list-disc pl-5'>
                      <li>
                        <strong>Low (50-150):</strong> Geometric, abstract look
                      </li>
                      <li>
                        <strong>Medium (150-250):</strong> Balanced detail
                      </li>
                      <li>
                        <strong>High (250-500):</strong> Maximum detail
                        capability
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className='text-sm font-semibold mb-1'>
                      Recommended values:
                    </p>
                    <div className='grid grid-cols-2 gap-2 mt-2'>
                      <div className='text-xs bg-muted/50 p-2 rounded'>
                        <strong>Logos:</strong> 150-200 pins
                      </div>
                      <div className='text-xs bg-muted/50 p-2 rounded'>
                        <strong>Portraits:</strong> 250-350 pins
                      </div>
                      <div className='text-xs bg-muted/50 p-2 rounded'>
                        <strong>Abstract:</strong> 100-200 pins
                      </div>
                      <div className='text-xs bg-muted/50 p-2 rounded'>
                        <strong>Animals:</strong> 250-300 pins
                      </div>
                    </div>
                  </div>

                  <Card className='bg-amber-500/10 border-amber-500/30'>
                    <CardContent className='p-3'>
                      <p className='text-xs text-foreground/80'>
                        <Info className='h-3 w-3 inline mr-1' />
                        <strong>Performance Note:</strong> Pins have quadratic
                        impact on computation. 500 pins = 4x slower than 250
                        pins.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Lines */}
            <Card className='border-primary/50'>
              <CardContent className='p-6'>
                <div className='flex items-start justify-between mb-4'>
                  <div>
                    <h3 className='text-xl font-bold mb-1'>Number of Lines</h3>
                    <p className='text-sm text-muted-foreground'>
                      Range: 500 - 10,000 | Default: 3000
                    </p>
                  </div>
                  <TrendingUp className='h-8 w-8 text-primary' />
                </div>

                <div className='space-y-3'>
                  <div>
                    <p className='text-sm font-semibold mb-1'>What it does:</p>
                    <p className='text-sm text-foreground/80'>
                      Controls how many individual string segments are drawn.
                      More lines = darker areas and finer details.
                    </p>
                  </div>

                  <div>
                    <p className='text-sm font-semibold mb-1'>Impact:</p>
                    <ul className='text-sm space-y-1 text-foreground/80 list-disc pl-5'>
                      <li>
                        <strong>Low (500-1500):</strong> Light, sketchy
                        appearance
                      </li>
                      <li>
                        <strong>Medium (1500-4000):</strong> Balanced coverage
                      </li>
                      <li>
                        <strong>High (4000-10000):</strong> Dense, rich contrast
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className='text-sm font-semibold mb-1'>
                      Recommended values:
                    </p>
                    <div className='grid grid-cols-2 gap-2 mt-2'>
                      <div className='text-xs bg-muted/50 p-2 rounded'>
                        <strong>Quick preview:</strong> 1000-2000
                      </div>
                      <div className='text-xs bg-muted/50 p-2 rounded'>
                        <strong>Standard quality:</strong> 3000-4000
                      </div>
                      <div className='text-xs bg-muted/50 p-2 rounded'>
                        <strong>High quality:</strong> 5000-7000
                      </div>
                      <div className='text-xs bg-muted/50 p-2 rounded'>
                        <strong>Maximum detail:</strong> 8000-10000
                      </div>
                    </div>
                  </div>

                  <Card className='bg-green-500/10 border-green-500/30'>
                    <CardContent className='p-3'>
                      <p className='text-xs text-foreground/80'>
                        <Zap className='h-3 w-3 inline mr-1' />
                        <strong>Pro Tip:</strong> Lines have linear impact on
                        speed. 6000 lines takes ~2x longer than 3000 lines.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Line Weight */}
            <Card className='border-primary/50'>
              <CardContent className='p-6'>
                <div className='flex items-start justify-between mb-4'>
                  <div>
                    <h3 className='text-xl font-bold mb-1'>Line Weight</h3>
                    <p className='text-sm text-muted-foreground'>
                      Range: 0.1 - 5.0 | Default: 1.0
                    </p>
                  </div>
                  <Settings className='h-8 w-8 text-primary' />
                </div>

                <div className='space-y-3'>
                  <div>
                    <p className='text-sm font-semibold mb-1'>What it does:</p>
                    <p className='text-sm text-foreground/80'>
                      Sets the thickness of each string line. Thicker lines =
                      bolder appearance, thinner lines = delicate detail.
                    </p>
                  </div>

                  <div>
                    <p className='text-sm font-semibold mb-1'>Impact:</p>
                    <ul className='text-sm space-y-1 text-foreground/80 list-disc pl-5'>
                      <li>
                        <strong>Thin (0.1-0.5):</strong> Delicate, etching-like
                      </li>
                      <li>
                        <strong>Standard (0.5-1.5):</strong> Typical string
                        thickness
                      </li>
                      <li>
                        <strong>Thick (1.5-5.0):</strong> Bold, high-contrast
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className='text-sm font-semibold mb-1'>
                      Recommended values:
                    </p>
                    <div className='grid grid-cols-2 gap-2 mt-2'>
                      <div className='text-xs bg-muted/50 p-2 rounded'>
                        <strong>Physical build:</strong> 0.5-1.0
                      </div>
                      <div className='text-xs bg-muted/50 p-2 rounded'>
                        <strong>Digital display:</strong> 0.8-1.5
                      </div>
                      <div className='text-xs bg-muted/50 p-2 rounded'>
                        <strong>Print output:</strong> 0.3-0.8
                      </div>
                      <div className='text-xs bg-muted/50 p-2 rounded'>
                        <strong>Artistic effect:</strong> 2.0-4.0
                      </div>
                    </div>
                  </div>

                  <Card className='bg-blue-500/10 border-blue-500/30'>
                    <CardContent className='p-3'>
                      <p className='text-xs text-foreground/80'>
                        <Info className='h-3 w-3 inline mr-1' />
                        <strong>Note:</strong> Line weight doesn't affect
                        generation time, only visual appearance.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Opacity */}
            <Card className='border-primary/50'>
              <CardContent className='p-6'>
                <div className='flex items-start justify-between mb-4'>
                  <div>
                    <h3 className='text-xl font-bold mb-1'>Line Opacity</h3>
                    <p className='text-sm text-muted-foreground'>
                      Range: 0.1 - 1.0 | Default: 0.6
                    </p>
                  </div>
                  <Settings className='h-8 w-8 text-primary' />
                </div>

                <div className='space-y-3'>
                  <div>
                    <p className='text-sm font-semibold mb-1'>What it does:</p>
                    <p className='text-sm text-foreground/80'>
                      Controls line transparency. Lower values allow overlapping
                      lines to build up gradual darkness.
                    </p>
                  </div>

                  <div>
                    <p className='text-sm font-semibold mb-1'>Impact:</p>
                    <ul className='text-sm space-y-1 text-foreground/80 list-disc pl-5'>
                      <li>
                        <strong>Low (0.1-0.3):</strong> Soft, gradual tones
                      </li>
                      <li>
                        <strong>Medium (0.4-0.7):</strong> Natural string look
                      </li>
                      <li>
                        <strong>High (0.8-1.0):</strong> Sharp, high-contrast
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className='text-sm font-semibold mb-1'>
                      Recommended values:
                    </p>
                    <div className='grid grid-cols-2 gap-2 mt-2'>
                      <div className='text-xs bg-muted/50 p-2 rounded'>
                        <strong>Realistic string:</strong> 0.5-0.7
                      </div>
                      <div className='text-xs bg-muted/50 p-2 rounded'>
                        <strong>Soft gradients:</strong> 0.2-0.4
                      </div>
                      <div className='text-xs bg-muted/50 p-2 rounded'>
                        <strong>Bold graphics:</strong> 0.8-1.0
                      </div>
                      <div className='text-xs bg-muted/50 p-2 rounded'>
                        <strong>Physical preview:</strong> 0.6-0.8
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Preset Configurations */}
        <section className='mb-8'>
          <h2 className='text-2xl font-bold mb-4'>Preset Configurations</h2>
          <p className='text-foreground/80 mb-4'>
            Start with these proven combinations and adjust from there:
          </p>

          <div className='space-y-4'>
            <Card className='bg-green-500/5 border-green-500/30'>
              <CardContent className='p-6'>
                <div className='flex items-center gap-2 mb-3'>
                  <Badge variant='outline'>Fast Preview</Badge>
                  <span className='text-xs text-muted-foreground'>
                    ~10-30 seconds
                  </span>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-3 text-sm'>
                  <div>
                    <span className='text-muted-foreground'>Pins:</span>{' '}
                    <strong>150</strong>
                  </div>
                  <div>
                    <span className='text-muted-foreground'>Lines:</span>{' '}
                    <strong>2000</strong>
                  </div>
                  <div>
                    <span className='text-muted-foreground'>Weight:</span>{' '}
                    <strong>1.0</strong>
                  </div>
                  <div>
                    <span className='text-muted-foreground'>Opacity:</span>{' '}
                    <strong>0.6</strong>
                  </div>
                </div>
                <p className='text-xs text-muted-foreground mt-2'>
                  Use for: Quick tests, experimenting with different images
                </p>
              </CardContent>
            </Card>

            <Card className='bg-blue-500/5 border-blue-500/30'>
              <CardContent className='p-6'>
                <div className='flex items-center gap-2 mb-3'>
                  <Badge variant='default'>Balanced Quality</Badge>
                  <span className='text-xs text-muted-foreground'>
                    ~1-3 minutes
                  </span>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-3 text-sm'>
                  <div>
                    <span className='text-muted-foreground'>Pins:</span>{' '}
                    <strong>250</strong>
                  </div>
                  <div>
                    <span className='text-muted-foreground'>Lines:</span>{' '}
                    <strong>4000</strong>
                  </div>
                  <div>
                    <span className='text-muted-foreground'>Weight:</span>{' '}
                    <strong>0.8</strong>
                  </div>
                  <div>
                    <span className='text-muted-foreground'>Opacity:</span>{' '}
                    <strong>0.6</strong>
                  </div>
                </div>
                <p className='text-xs text-muted-foreground mt-2'>
                  Use for: Most portraits, logos, general use
                </p>
              </CardContent>
            </Card>

            <Card className='bg-purple-500/5 border-purple-500/30'>
              <CardContent className='p-6'>
                <div className='flex items-center gap-2 mb-3'>
                  <Badge variant='secondary'>High Detail</Badge>
                  <span className='text-xs text-muted-foreground'>
                    ~3-8 minutes
                  </span>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-3 text-sm'>
                  <div>
                    <span className='text-muted-foreground'>Pins:</span>{' '}
                    <strong>350</strong>
                  </div>
                  <div>
                    <span className='text-muted-foreground'>Lines:</span>{' '}
                    <strong>6000</strong>
                  </div>
                  <div>
                    <span className='text-muted-foreground'>Weight:</span>{' '}
                    <strong>0.6</strong>
                  </div>
                  <div>
                    <span className='text-muted-foreground'>Opacity:</span>{' '}
                    <strong>0.5</strong>
                  </div>
                </div>
                <p className='text-xs text-muted-foreground mt-2'>
                  Use for: Final outputs, prints, physical builds
                </p>
              </CardContent>
            </Card>

            <Card className='bg-amber-500/5 border-amber-500/30'>
              <CardContent className='p-6'>
                <div className='flex items-center gap-2 mb-3'>
                  <Badge variant='outline'>Maximum Quality</Badge>
                  <span className='text-xs text-muted-foreground'>
                    ~8-20 minutes
                  </span>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-3 text-sm'>
                  <div>
                    <span className='text-muted-foreground'>Pins:</span>{' '}
                    <strong>400</strong>
                  </div>
                  <div>
                    <span className='text-muted-foreground'>Lines:</span>{' '}
                    <strong>9000</strong>
                  </div>
                  <div>
                    <span className='text-muted-foreground'>Weight:</span>{' '}
                    <strong>0.5</strong>
                  </div>
                  <div>
                    <span className='text-muted-foreground'>Opacity:</span>{' '}
                    <strong>0.4</strong>
                  </div>
                </div>
                <p className='text-xs text-muted-foreground mt-2'>
                  Use for: Professional work, large prints, exhibitions
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Optimization Tips */}
        <section className='mb-8'>
          <h2 className='text-2xl font-bold mb-4'>Optimization Tips</h2>

          <div className='space-y-4'>
            <Card className='bg-muted/30'>
              <CardContent className='p-5'>
                <h3 className='font-semibold mb-2'>1. Start Low, Go High</h3>
                <p className='text-sm text-foreground/80'>
                  Begin with low values (150 pins, 2000 lines) to test your
                  image. Once satisfied with composition, increase for final
                  output.
                </p>
              </CardContent>
            </Card>

            <Card className='bg-muted/30'>
              <CardContent className='p-5'>
                <h3 className='font-semibold mb-2'>
                  2. Balance Pins and Lines
                </h3>
                <p className='text-sm text-foreground/80'>
                  More pins need more lines to fill detail. Rule of thumb:{' '}
                  <code className='text-xs bg-muted px-1 py-0.5 rounded'>
                    lines = pins × 15-20
                  </code>
                </p>
              </CardContent>
            </Card>

            <Card className='bg-muted/30'>
              <CardContent className='p-5'>
                <h3 className='font-semibold mb-2'>
                  3. Lower Opacity for More Lines
                </h3>
                <p className='text-sm text-foreground/80'>
                  If using 6000+ lines, reduce opacity to 0.3-0.5 to prevent
                  over-darkening.
                </p>
              </CardContent>
            </Card>

            <Card className='bg-muted/30'>
              <CardContent className='p-5'>
                <h3 className='font-semibold mb-2'>4. Adjust for Image Type</h3>
                <p className='text-sm text-foreground/80 mb-2'>
                  Different subjects need different settings:
                </p>
                <ul className='text-xs space-y-1 text-foreground/70'>
                  <li>
                    • <strong>Simple logos:</strong> Fewer pins, moderate lines
                  </li>
                  <li>
                    • <strong>Detailed portraits:</strong> More pins, many lines
                  </li>
                  <li>
                    • <strong>Abstract art:</strong> Fewer pins, variable lines
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className='bg-muted/30'>
              <CardContent className='p-5'>
                <h3 className='font-semibold mb-2'>
                  5. Physical Build Considerations
                </h3>
                <p className='text-sm text-foreground/80'>
                  If building physically: 200-300 pins is manageable, 500 pins
                  is extremely tedious. Keep line weight at 0.5-1.0 to match
                  real string thickness.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className='mb-8'>
          <h2 className='text-2xl font-bold mb-4'>
            Troubleshooting Common Issues
          </h2>

          <div className='space-y-3'>
            <Card>
              <CardContent className='p-4'>
                <p className='font-semibold text-sm mb-1'>
                  ⚠️ Result too light/faint
                </p>
                <p className='text-xs text-foreground/70'>
                  <strong>Fix:</strong> Increase lines or opacity. Try adding
                  1000-2000 more lines first.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='p-4'>
                <p className='font-semibold text-sm mb-1'>
                  ⚠️ Result too dark/muddy
                </p>
                <p className='text-xs text-foreground/70'>
                  <strong>Fix:</strong> Decrease opacity (try 0.3-0.4) or reduce
                  lines.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='p-4'>
                <p className='font-semibold text-sm mb-1'>
                  ⚠️ Missing fine details
                </p>
                <p className='text-xs text-foreground/70'>
                  <strong>Fix:</strong> Increase pins to 300-400 and lines to
                  6000+.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='p-4'>
                <p className='font-semibold text-sm mb-1'>
                  ⚠️ Generation taking too long
                </p>
                <p className='text-xs text-foreground/70'>
                  <strong>Fix:</strong> Reduce pins first (biggest impact on
                  speed), then lines.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='p-4'>
                <p className='font-semibold text-sm mb-1'>
                  ⚠️ Lines look too thick/thin
                </p>
                <p className='text-xs text-foreground/70'>
                  <strong>Fix:</strong> Adjust line weight. This doesn't affect
                  generation time, so experiment freely.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className='mt-12 flex flex-col sm:flex-row gap-4 justify-between'>
        <Link href='/tutorials/image-selection'>
          <Button variant='outline'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Previous: Image Selection
          </Button>
        </Link>
        <Link href='/tutorials/export-formats'>
          <Button>
            Next: Export Formats
            <ArrowRight className='h-4 w-4 ml-2' />
          </Button>
        </Link>
      </div>

      {/* CTA */}
      <Card className='mt-8 bg-primary/5'>
        <CardContent className='p-6 text-center'>
          <Settings className='h-10 w-10 mx-auto text-primary mb-3' />
          <h3 className='font-bold text-lg mb-2'>Experiment with Settings</h3>
          <p className='text-sm text-muted-foreground mb-4'>
            Try these configurations and find your perfect balance
          </p>
          <div className='flex justify-center gap-3'>
            <Link href='/gallery'>
              <Button variant='outline'>View Examples</Button>
            </Link>
            <Link href='/editor'>
              <Button>Start Generating</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
