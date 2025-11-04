// Server Component - How It Works Page
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Upload,
  Settings,
  Zap,
  Download,
  Image as ImageIcon,
  Sparkles,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    'Learn how to create stunning string art patterns with our generator. Step-by-step guide from image upload to final export.',
  alternates: {
    canonical: 'https://www.stringartgenerator.app/how-it-works',
  },
  openGraph: {
    title: 'How String Art Generator Works',
    description:
      'Step-by-step guide to creating beautiful string art from any image',
    url: 'https://www.stringartgenerator.app/how-it-works',
  },
};

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero Section */}
      <section className='relative py-20 px-4 border-b'>
        <div className='container mx-auto max-w-4xl text-center'>
          <div className='inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6'>
            <Sparkles className='h-4 w-4 text-primary' />
            <span className='text-sm font-medium'>How It Works</span>
          </div>
          <h1 className='text-4xl md:text-6xl font-bold mb-6'>
            Create String Art in 4 Simple Steps
          </h1>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto mb-8'>
            Transform any image into a beautiful string art pattern in minutes.
            No experience required.
          </p>
          <Link href='/editor'>
            <Button size='lg' className='text-lg'>
              <Sparkles className='mr-2 h-5 w-5' />
              Try It Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Steps Section */}
      <section className='py-16 px-4'>
        <div className='container mx-auto max-w-6xl'>
          <div className='space-y-24'>
            {/* Step 1 */}
            <div className='grid md:grid-cols-2 gap-12 items-center'>
              <div className='order-2 md:order-1'>
                <div className='inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-4'>
                  <span className='text-xs font-bold text-primary'>STEP 1</span>
                </div>
                <h2 className='text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3'>
                  <Upload className='h-8 w-8 text-primary' />
                  Upload Your Image
                </h2>
                <p className='text-lg text-muted-foreground mb-6'>
                  Choose any image from your device - photos, logos, artwork, or
                  graphics. Drag and drop or click to browse.
                </p>
                <ul className='space-y-3'>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                    <span className='text-muted-foreground'>
                      Supports PNG, JPG, JPEG, and WebP formats
                    </span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                    <span className='text-muted-foreground'>
                      Works best with high-contrast images
                    </span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                    <span className='text-muted-foreground'>
                      Your images stay private - processed locally in browser
                    </span>
                  </li>
                </ul>
              </div>
              <div className='order-1 md:order-2'>
                <Card className='bg-muted/50'>
                  <CardContent className='p-12 flex items-center justify-center min-h-[300px]'>
                    <ImageIcon className='h-24 w-24 text-muted-foreground/40' />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Step 2 */}
            <div className='grid md:grid-cols-2 gap-12 items-center'>
              <div>
                <Card className='bg-muted/50'>
                  <CardContent className='p-12 flex items-center justify-center min-h-[300px]'>
                    <Settings className='h-24 w-24 text-muted-foreground/40' />
                  </CardContent>
                </Card>
              </div>
              <div>
                <div className='inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-4'>
                  <span className='text-xs font-bold text-primary'>STEP 2</span>
                </div>
                <h2 className='text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3'>
                  <Settings className='h-8 w-8 text-primary' />
                  Adjust Parameters
                </h2>
                <p className='text-lg text-muted-foreground mb-6'>
                  Fine-tune the string art generation with intuitive controls.
                  Experiment with different settings to get your perfect result.
                </p>
                <ul className='space-y-3'>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                    <div>
                      <strong className='text-foreground'>
                        Pins (50-400):
                      </strong>
                      <span className='text-muted-foreground'>
                        {' '}
                        More pins = more detail but longer generation time
                      </span>
                    </div>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                    <div>
                      <strong className='text-foreground'>
                        Lines (500-5000):
                      </strong>
                      <span className='text-muted-foreground'>
                        {' '}
                        More lines create denser, darker patterns
                      </span>
                    </div>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                    <div>
                      <strong className='text-foreground'>
                        Line Weight & Opacity:
                      </strong>
                      <span className='text-muted-foreground'>
                        {' '}
                        Control visual thickness and transparency
                      </span>
                    </div>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                    <div>
                      <strong className='text-foreground'>Colors:</strong>
                      <span className='text-muted-foreground'>
                        {' '}
                        Customize string and background colors
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className='grid md:grid-cols-2 gap-12 items-center'>
              <div className='order-2 md:order-1'>
                <div className='inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-4'>
                  <span className='text-xs font-bold text-primary'>STEP 3</span>
                </div>
                <h2 className='text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3'>
                  <Zap className='h-8 w-8 text-primary' />
                  Generate String Art
                </h2>
                <p className='text-lg text-muted-foreground mb-6'>
                  Click "Generate" and watch as our algorithm transforms your
                  image into a string art pattern in real-time.
                </p>
                <ul className='space-y-3'>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                    <span className='text-muted-foreground'>
                      Advanced algorithm analyzes brightness and contrast
                    </span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                    <span className='text-muted-foreground'>
                      Runs in background thread - UI stays responsive
                    </span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                    <span className='text-muted-foreground'>
                      Real-time progress updates show generation status
                    </span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                    <span className='text-muted-foreground'>
                      Generates optimal path connecting all pins
                    </span>
                  </li>
                </ul>
              </div>
              <div className='order-1 md:order-2'>
                <Card className='bg-muted/50'>
                  <CardContent className='p-12 flex items-center justify-center min-h-[300px]'>
                    <Zap className='h-24 w-24 text-muted-foreground/40' />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Step 4 */}
            <div className='grid md:grid-cols-2 gap-12 items-center'>
              <div>
                <Card className='bg-muted/50'>
                  <CardContent className='p-12 flex items-center justify-center min-h-[300px]'>
                    <Download className='h-24 w-24 text-muted-foreground/40' />
                  </CardContent>
                </Card>
              </div>
              <div>
                <div className='inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-4'>
                  <span className='text-xs font-bold text-primary'>STEP 4</span>
                </div>
                <h2 className='text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3'>
                  <Download className='h-8 w-8 text-primary' />
                  Export Your Design
                </h2>
                <p className='text-lg text-muted-foreground mb-6'>
                  Download your string art in multiple formats for different use
                  cases.
                </p>
                <ul className='space-y-3'>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                    <div>
                      <strong className='text-foreground'>PNG:</strong>
                      <span className='text-muted-foreground'>
                        {' '}
                        High-resolution raster image (2000x2000)
                      </span>
                    </div>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                    <div>
                      <strong className='text-foreground'>SVG:</strong>
                      <span className='text-muted-foreground'>
                        {' '}
                        Scalable vector format for infinite resolution
                      </span>
                    </div>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                    <div>
                      <strong className='text-foreground'>JSON:</strong>
                      <span className='text-muted-foreground'>
                        {' '}
                        Raw data for developers and further processing
                      </span>
                    </div>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                    <div>
                      <strong className='text-foreground'>TXT:</strong>
                      <span className='text-muted-foreground'>
                        {' '}
                        Step-by-step instructions for physical creation
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Algorithm Section */}
      <section className='py-16 px-4 bg-muted/50'>
        <div className='container mx-auto max-w-4xl'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              The Algorithm Behind the Magic
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Our greedy algorithm intelligently connects pins to recreate your
              image using continuous string paths.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-6'>
            <Card>
              <CardContent className='p-6'>
                <div className='text-4xl font-bold text-primary mb-2'>1</div>
                <h3 className='font-semibold mb-2'>Image Analysis</h3>
                <p className='text-sm text-muted-foreground'>
                  Converts your image to brightness values (0-255) for each
                  pixel region.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-6'>
                <div className='text-4xl font-bold text-primary mb-2'>2</div>
                <h3 className='font-semibold mb-2'>Pin Placement</h3>
                <p className='text-sm text-muted-foreground'>
                  Arranges pins in a perfect circle with precise mathematical
                  spacing.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-6'>
                <div className='text-4xl font-bold text-primary mb-2'>3</div>
                <h3 className='font-semibold mb-2'>Path Generation</h3>
                <p className='text-sm text-muted-foreground'>
                  Finds optimal line connections by darkening the brightest
                  areas first.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className='py-16 px-4'>
        <div className='container mx-auto max-w-4xl'>
          <h2 className='text-3xl md:text-4xl font-bold mb-8 text-center'>
            Pro Tips for Best Results
          </h2>
          <div className='grid md:grid-cols-2 gap-6'>
            <Card>
              <CardContent className='p-6'>
                <h3 className='font-semibold mb-3 flex items-center gap-2'>
                  <Sparkles className='h-5 w-5 text-primary' />
                  Image Selection
                </h3>
                <ul className='space-y-2 text-sm text-muted-foreground'>
                  <li>• Use high-contrast images for clearer results</li>
                  <li>• Portraits and logos work exceptionally well</li>
                  <li>• Avoid images with too many fine details</li>
                  <li>• Square images produce the most balanced results</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-6'>
                <h3 className='font-semibold mb-3 flex items-center gap-2'>
                  <Settings className='h-5 w-5 text-primary' />
                  Parameter Tuning
                </h3>
                <ul className='space-y-2 text-sm text-muted-foreground'>
                  <li>• Start with default settings, then experiment</li>
                  <li>• More pins = sharper features but slower generation</li>
                  <li>• Increase lines for darker, denser patterns</li>
                  <li>• Lower opacity creates lighter, more delicate art</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 px-4 bg-primary/5'>
        <div className='container mx-auto max-w-4xl text-center'>
          <h2 className='text-3xl md:text-4xl font-bold mb-6'>
            Ready to Create Your String Art?
          </h2>
          <p className='text-lg text-muted-foreground mb-8'>
            Start transforming your images into beautiful string art patterns
            today. It's free and takes less than a minute!
          </p>
          <Link href='/editor'>
            <Button size='lg' className='text-lg px-8'>
              <Sparkles className='mr-2 h-5 w-5' />
              Get Started Now
              <ArrowRight className='ml-2 h-5 w-5' />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
