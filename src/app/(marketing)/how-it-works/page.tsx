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
      <section className='relative py-12 md:py-20 px-4 border-b'>
        <div className='container mx-auto max-w-4xl text-center'>
          <div className='inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4 md:mb-6'>
            <Sparkles className='h-4 w-4 text-primary' />
            <span className='text-sm font-medium'>How It Works</span>
          </div>
          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 px-4'>
            Create String Art in 4 Simple Steps
          </h1>
          <p className='text-base sm:text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-6 md:mb-8 px-4'>
            Transform any image into a beautiful string art pattern in minutes.
            No experience required.
          </p>
          <Link href='/editor'>
            <Button size='lg' className='text-base md:text-lg w-full sm:w-auto'>
              <Sparkles className='mr-2 h-5 w-5' />
              Try It Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Steps Section */}
      <section className='py-12 md:py-16 px-4 bg-muted'>
        <div className='container mx-auto max-w-6xl'>
          <div className='space-y-16 md:space-y-24'>
            {/* Step 1 */}
            <div className='grid md:grid-cols-2 gap-8 md:gap-12 items-center'>
              <div className='order-2 md:order-1'>
                <div className='inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-3 md:mb-4'>
                  <span className='text-xs font-bold text-primary'>STEP 1</span>
                </div>
                <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 flex items-center gap-3'>
                  <Upload className='h-6 w-6 md:h-8 md:w-8 text-primary shrink-0' />
                  Upload Your Image
                </h2>
                <p className='text-base md:text-lg text-foreground/70 mb-4 md:mb-6'>
                  Choose any image from your device - photos, logos, artwork, or
                  graphics. Drag and drop or click to browse.
                </p>
                <ul className='space-y-2 md:space-y-3'>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                    <span className='text-foreground/70'>
                      Supports PNG, JPG, JPEG, and WebP formats
                    </span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                    <span className='text-foreground/70'>
                      Works best with high-contrast images
                    </span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                    <span className='text-foreground/70'>
                      Your images stay private - processed locally in browser
                    </span>
                  </li>
                </ul>
                <div className='mt-6'>
                  <Link
                    href='/tutorials/image-selection'
                    className='inline-flex items-center text-sm font-medium text-primary hover:underline'>
                    Learn more about image selection
                    <ArrowRight className='ml-1 h-4 w-4' />
                  </Link>
                </div>
              </div>
              <div className='order-1 md:order-2'>
                <Card className='bg-background/95 border-border/50'>
                  <CardContent className='p-8 md:p-12 flex items-center justify-center min-h-[200px] md:min-h-[300px]'>
                    <ImageIcon className='h-16 w-16 md:h-24 md:w-24 text-muted-foreground/40' />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Step 2 */}
            <div className='grid md:grid-cols-2 gap-8 md:gap-12 items-center'>
              <div>
                <Card className='bg-background/98 border-border/50'>
                  <CardContent className='p-8 md:p-12 flex items-center justify-center min-h-[200px] md:min-h-[300px]'>
                    <Settings className='h-16 w-16 md:h-24 md:w-24 text-muted-foreground/40' />
                  </CardContent>
                </Card>
              </div>
              <div>
                <div className='inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-3 md:mb-4'>
                  <span className='text-xs font-bold text-primary'>STEP 2</span>
                </div>
                <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 flex items-center gap-3'>
                  <Settings className='h-6 w-6 md:h-8 md:w-8 text-primary shrink-0' />
                  Adjust Parameters
                </h2>
                <p className='text-base md:text-lg text-foreground/70 mb-4 md:mb-6'>
                  Fine-tune the string art generation with intuitive controls.
                  Experiment with different settings to get your perfect result.
                </p>
                <ul className='space-y-2 md:space-y-3'>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                    <div>
                      <strong className='text-foreground'>
                        Pins (50-400):
                      </strong>
                      <span className='text-foreground/70'>
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
                      <span className='text-foreground/70'>
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
                      <span className='text-foreground/70'>
                        {' '}
                        Control visual thickness and transparency
                      </span>
                    </div>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                    <div>
                      <strong className='text-foreground'>Colors:</strong>
                      <span className='text-foreground/70'>
                        {' '}
                        Customize string and background colors
                      </span>
                    </div>
                  </li>
                </ul>
                <div className='mt-6'>
                  <Link
                    href='/tutorials/parameters'
                    className='inline-flex items-center text-sm font-medium text-primary hover:underline'>
                    Full parameter optimization guide
                    <ArrowRight className='ml-1 h-4 w-4' />
                  </Link>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className='grid md:grid-cols-2 gap-8 md:gap-12 items-center'>
              <div className='order-2 md:order-1'>
                <div className='inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-3 md:mb-4'>
                  <span className='text-xs font-bold text-primary'>STEP 3</span>
                </div>
                <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 flex items-center gap-3'>
                  <Zap className='h-6 w-6 md:h-8 md:w-8 text-primary shrink-0' />
                  Generate String Art
                </h2>
                <p className='text-base md:text-lg text-foreground/70 mb-4 md:mb-6'>
                  Click "Generate" and watch as our algorithm transforms your
                  image into a string art pattern in real-time.
                </p>
                <ul className='space-y-2 md:space-y-3'>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                    <span className='text-foreground/70'>
                      Advanced algorithm analyzes brightness and contrast
                    </span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                    <span className='text-foreground/70'>
                      Runs in background thread - UI stays responsive
                    </span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                    <span className='text-foreground/70'>
                      Real-time progress updates show generation status
                    </span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                    <span className='text-foreground/70'>
                      Generates optimal path connecting all pins
                    </span>
                  </li>
                </ul>
                <div className='mt-6'>
                  <Link
                    href='/blog/la-ciencia-detras-del-string-art'
                    className='inline-flex items-center text-sm font-medium text-primary hover:underline'>
                    Deep dive into the algorithm
                    <ArrowRight className='ml-1 h-4 w-4' />
                  </Link>
                </div>
              </div>
              <div className='order-1 md:order-2'>
                <Card className='bg-background/95 border-border/50'>
                  <CardContent className='p-8 md:p-12 flex items-center justify-center min-h-[200px] md:min-h-[300px]'>
                    <Zap className='h-16 w-16 md:h-24 md:w-24 text-muted-foreground/40' />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Step 4 */}
            <div className='grid md:grid-cols-2 gap-8 md:gap-12 items-center'>
              <div>
                <Card className='bg-background/98 border-border/50'>
                  <CardContent className='p-8 md:p-12 flex items-center justify-center min-h-[200px] md:min-h-[300px]'>
                    <Download className='h-16 w-16 md:h-24 md:w-24 text-muted-foreground/40' />
                  </CardContent>
                </Card>
              </div>
              <div>
                <div className='inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-3 md:mb-4'>
                  <span className='text-xs font-bold text-primary'>STEP 4</span>
                </div>
                <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 flex items-center gap-3'>
                  <Download className='h-6 w-6 md:h-8 md:w-8 text-primary shrink-0' />
                  Export Your Design
                </h2>
                <p className='text-base md:text-lg text-foreground/70 mb-4 md:mb-6'>
                  Download your string art in multiple formats for different use
                  cases.
                </p>
                <ul className='space-y-2 md:space-y-3'>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                    <div>
                      <strong className='text-foreground'>PNG:</strong>
                      <span className='text-foreground/70'>
                        {' '}
                        High-resolution raster image (2000x2000)
                      </span>
                    </div>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                    <div>
                      <strong className='text-foreground'>SVG:</strong>
                      <span className='text-foreground/70'>
                        {' '}
                        Scalable vector format for infinite resolution
                      </span>
                    </div>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                    <div>
                      <strong className='text-foreground'>JSON:</strong>
                      <span className='text-foreground/70'>
                        {' '}
                        Raw data for developers and further processing
                      </span>
                    </div>
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                    <div>
                      <strong className='text-foreground'>TXT:</strong>
                      <span className='text-foreground/70'>
                        {' '}
                        Step-by-step instructions for physical creation
                      </span>
                    </div>
                  </li>
                </ul>
                <div className='mt-6 space-y-2'>
                  <Link
                    href='/tutorials/export-formats'
                    className='inline-flex items-center text-sm font-medium text-primary hover:underline'>
                    Learn about export formats
                    <ArrowRight className='ml-1 h-4 w-4' />
                  </Link>
                  <br />
                  <Link
                    href='/tutorials/physical-build'
                    className='inline-flex items-center text-sm font-medium text-primary hover:underline'>
                    Physical construction guide
                    <ArrowRight className='ml-1 h-4 w-4' />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Algorithm Section */}
      <section className='py-12 md:py-16 px-4 bg-background'>
        <div className='container mx-auto max-w-4xl'>
          <div className='text-center mb-8 md:mb-12 px-4'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4'>
              The Algorithm Behind the Magic
            </h2>
            <p className='text-base md:text-lg text-foreground/80 max-w-2xl mx-auto'>
              Our greedy algorithm intelligently connects pins to recreate your
              image using continuous string paths.
            </p>
          </div>

          <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6'>
            <Card className='bg-background/95 border-border/50'>
              <CardContent className='p-6'>
                <div className='text-4xl font-bold text-primary mb-2'>1</div>
                <h3 className='font-bold mb-2 text-foreground'>
                  Image Analysis
                </h3>
                <p className='text-sm text-foreground/70'>
                  Converts your image to brightness values (0-255) for each
                  pixel region.
                </p>
              </CardContent>
            </Card>
            <Card className='bg-background/98 border-border/50'>
              <CardContent className='p-6'>
                <div className='text-4xl font-bold text-primary mb-2'>2</div>
                <h3 className='font-bold mb-2 text-foreground'>
                  Pin Placement
                </h3>
                <p className='text-sm text-foreground/70'>
                  Arranges pins in a perfect circle with precise mathematical
                  spacing.
                </p>
              </CardContent>
            </Card>
            <Card className='bg-background/95 border-border/50'>
              <CardContent className='p-6'>
                <div className='text-4xl font-bold text-primary mb-2'>3</div>
                <h3 className='font-bold mb-2 text-foreground'>
                  Path Generation
                </h3>
                <p className='text-sm text-foreground/70'>
                  Finds optimal line connections by darkening the brightest
                  areas first.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className='py-12 md:py-16 px-4 bg-muted'>
        <div className='container mx-auto max-w-4xl'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center px-4'>
            Pro Tips for Best Results
          </h2>
          <div className='grid sm:grid-cols-2 gap-4 md:gap-6'>
            <Card className='bg-background/95 border-border/50'>
              <CardContent className='p-6'>
                <h3 className='font-semibold mb-3 flex items-center gap-2'>
                  <Sparkles className='h-5 w-5 text-primary' />
                  Image Selection
                </h3>
                <ul className='space-y-2 text-sm text-foreground/70'>
                  <li>• Use high-contrast images for clearer results</li>
                  <li>• Portraits and logos work exceptionally well</li>
                  <li>• Avoid images with too many fine details</li>
                  <li>• Square images produce the most balanced results</li>
                </ul>
              </CardContent>
            </Card>
            <Card className='bg-background/98 border-border/50'>
              <CardContent className='p-6'>
                <h3 className='font-bold mb-3 flex items-center gap-2 text-foreground'>
                  <Settings className='h-5 w-5 text-primary' />
                  Parameter Tuning
                </h3>
                <ul className='space-y-2 text-sm text-foreground/70'>
                  <li>• Start with default settings, then experiment</li>
                  <li>• More pins = sharper features but slower generation</li>
                  <li>• Increase lines for darker, denser patterns</li>
                  <li>• Lower opacity creates lighter, more delicate art</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className='mt-8 text-center'>
            <Link
              href='/tips'
              className='inline-flex items-center text-sm font-medium text-primary hover:underline'>
              View all tips and tricks
              <ArrowRight className='ml-1 h-4 w-4' />
            </Link>
          </div>
        </div>
      </section>

      {/* Common Use Cases Section */}
      <section className='py-12 md:py-16 px-4 bg-background'>
        <div className='container mx-auto max-w-4xl'>
          <div className='text-center mb-8 md:mb-12 px-4'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4'>
              Popular Use Cases
            </h2>
            <p className='text-base md:text-lg text-foreground/80 max-w-2xl mx-auto'>
              See how others are using String Art Generator for different
              creative projects
            </p>
          </div>

          <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6'>
            <Card className='bg-background/95 border-border/50 hover:border-primary/50 transition-colors'>
              <CardContent className='p-6'>
                <h3 className='font-bold mb-2 text-foreground'>Portrait Art</h3>
                <p className='text-sm text-foreground/70 mb-4'>
                  Transform family photos into unique wall decorations
                </p>
                <Link
                  href='/use-cases#personalized-portraits'
                  className='text-xs text-primary hover:underline inline-flex items-center'>
                  Learn more
                  <ArrowRight className='ml-1 h-3 w-3' />
                </Link>
              </CardContent>
            </Card>

            <Card className='bg-background/98 border-border/50 hover:border-primary/50 transition-colors'>
              <CardContent className='p-6'>
                <h3 className='font-bold mb-2 text-foreground'>Logo Design</h3>
                <p className='text-sm text-foreground/70 mb-4'>
                  Create artistic brand representations for offices
                </p>
                <Link
                  href='/use-cases#business-branding'
                  className='text-xs text-primary hover:underline inline-flex items-center'>
                  Learn more
                  <ArrowRight className='ml-1 h-3 w-3' />
                </Link>
              </CardContent>
            </Card>

            <Card className='bg-background/95 border-border/50 hover:border-primary/50 transition-colors'>
              <CardContent className='p-6'>
                <h3 className='font-bold mb-2 text-foreground'>Education</h3>
                <p className='text-sm text-foreground/70 mb-4'>
                  Teach math, geometry, and algorithms visually
                </p>
                <Link
                  href='/use-cases#educational-tools'
                  className='text-xs text-primary hover:underline inline-flex items-center'>
                  Learn more
                  <ArrowRight className='ml-1 h-3 w-3' />
                </Link>
              </CardContent>
            </Card>

            <Card className='bg-background/98 border-border/50 hover:border-primary/50 transition-colors'>
              <CardContent className='p-6'>
                <h3 className='font-bold mb-2 text-foreground'>Gift Ideas</h3>
                <p className='text-sm text-foreground/70 mb-4'>
                  Handmade personalized presents for special occasions
                </p>
                <Link
                  href='/use-cases#personalized-gifts'
                  className='text-xs text-primary hover:underline inline-flex items-center'>
                  Learn more
                  <ArrowRight className='ml-1 h-3 w-3' />
                </Link>
              </CardContent>
            </Card>

            <Card className='bg-background/95 border-border/50 hover:border-primary/50 transition-colors'>
              <CardContent className='p-6'>
                <h3 className='font-bold mb-2 text-foreground'>Home Decor</h3>
                <p className='text-sm text-foreground/70 mb-4'>
                  Design custom artwork matching your interior style
                </p>
                <Link
                  href='/use-cases#home-decoration'
                  className='text-xs text-primary hover:underline inline-flex items-center'>
                  Learn more
                  <ArrowRight className='ml-1 h-3 w-3' />
                </Link>
              </CardContent>
            </Card>

            <Card className='bg-background/98 border-border/50 hover:border-primary/50 transition-colors'>
              <CardContent className='p-6'>
                <h3 className='font-bold mb-2 text-foreground'>Art Projects</h3>
                <p className='text-sm text-foreground/70 mb-4'>
                  Explore generative art and creative coding
                </p>
                <Link
                  href='/use-cases#art-exploration'
                  className='text-xs text-primary hover:underline inline-flex items-center'>
                  Learn more
                  <ArrowRight className='ml-1 h-3 w-3' />
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className='mt-8 text-center'>
            <Link href='/use-cases'>
              <Button variant='outline' size='lg' className='w-full sm:w-auto'>
                View All Use Cases
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links Section */}
      <section className='py-12 md:py-16 px-4 bg-muted'>
        <div className='container mx-auto max-w-4xl'>
          <div className='text-center mb-8 md:mb-12 px-4'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4'>
              Frequently Asked Questions
            </h2>
            <p className='text-base md:text-lg text-foreground/80 max-w-2xl mx-auto'>
              Quick answers to common questions about the string art generation
              process
            </p>
          </div>

          <div className='space-y-4'>
            <Card className='bg-background/95 border-border/50'>
              <CardContent className='p-6'>
                <h3 className='font-semibold mb-2 text-foreground'>
                  How long does generation take?
                </h3>
                <p className='text-sm text-foreground/70'>
                  Typically 5-30 seconds depending on parameters. Higher
                  pin/line counts take longer but produce more detailed results.
                </p>
              </CardContent>
            </Card>

            <Card className='bg-background/98 border-border/50'>
              <CardContent className='p-6'>
                <h3 className='font-semibold mb-2 text-foreground'>
                  Can I use this commercially?
                </h3>
                <p className='text-sm text-foreground/70'>
                  Yes! The tool is 100% free and open source (MIT License). You
                  own all rights to your generated string art.
                </p>
              </CardContent>
            </Card>

            <Card className='bg-background/95 border-border/50'>
              <CardContent className='p-6'>
                <h3 className='font-semibold mb-2 text-foreground'>
                  Do you store my images?
                </h3>
                <p className='text-sm text-foreground/70'>
                  No. All processing happens locally in your browser. Your
                  images never leave your device, ensuring complete privacy.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className='mt-8 text-center'>
            <Link href='/faq'>
              <Button variant='outline' size='lg' className='w-full sm:w-auto'>
                View All FAQs (22 Questions)
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery CTA Section */}
      <section className='py-12 md:py-16 px-4 bg-background border-b'>
        <div className='container mx-auto max-w-4xl text-center'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 px-4'>
            Need Inspiration?
          </h2>
          <p className='text-base md:text-lg text-foreground/80 mb-6 md:mb-8 px-4'>
            Browse our curated gallery of example configurations and try them
            directly in the editor
          </p>
          <Link href='/gallery'>
            <Button
              variant='outline'
              size='lg'
              className='text-base md:text-lg px-6 md:px-8 w-full sm:w-auto'>
              <ImageIcon className='mr-2 h-5 w-5' />
              Browse Gallery
              <ArrowRight className='ml-2 h-5 w-5' />
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-12 md:py-16 px-4 bg-background'>
        <div className='container mx-auto max-w-4xl text-center'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 px-4'>
            Ready to Create Your String Art?
          </h2>
          <p className='text-base md:text-lg text-foreground/80 mb-6 md:mb-8 px-4'>
            Start transforming your images into beautiful string art patterns
            today. It's free and takes less than a minute!
          </p>
          <Link href='/editor'>
            <Button
              size='lg'
              className='text-base md:text-lg px-6 md:px-8 w-full sm:w-auto'>
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
