// Server Component - Landing Page
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Sparkles,
  Zap,
  Download,
  Image as ImageIcon,
  ArrowRight,
  CheckCircle,
  Users,
  Palette,
  TrendingUp,
  Star,
} from 'lucide-react';
import {
  WebApplicationSchema,
  WebSiteSchema,
  OrganizationSchema,
  HowToSchema,
  SiteNavigationSchema,
} from '@/components/seo/StructuredData';
import { InlineAd } from '@/components/ads';

export default function LandingPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <WebApplicationSchema />
      <WebSiteSchema />
      <OrganizationSchema />
      <HowToSchema />
      <SiteNavigationSchema />

      {/* Hero Section */}
      <section className='relative py-12 md:py-20 px-4 overflow-hidden bg-background'>
        <div className='container mx-auto max-w-6xl'>
          <div className='text-center space-y-4 md:space-y-6'>
            <h1 className='text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight'>
              Transform Images into
              <span className='block text-primary'>String Art</span>
            </h1>
            <p className='text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto px-4'>
              Create stunning string art patterns from any image using advanced
              algorithms. Free, fast, and powerful.
            </p>
            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 px-4'>
              <Link href='/editor' className='w-full sm:w-auto'>
                <Button size='lg' className='text-lg px-8 w-full sm:w-auto'>
                  <Sparkles className='mr-2 h-5 w-5' />
                  Start Creating
                  <ArrowRight className='ml-2 h-5 w-5' />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-12 md:py-20 px-4 bg-card'>
        <div className='container mx-auto max-w-6xl'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 px-4'>
            Why String Art Generator?
          </h2>

          <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8'>
            {/* Feature 1 */}
            <Card className='p-6 space-y-4 bg-secondary/20 border-secondary hover:shadow-lg transition-shadow'>
              <div className='h-12 w-12 rounded-lg bg-secondary flex items-center justify-center'>
                <Zap className='h-6 w-6 text-secondary-foreground' />
              </div>
              <h3 className='text-xl font-bold text-card-foreground'>
                Lightning Fast
              </h3>
              <p className='text-muted-foreground'>
                Advanced Web Workers process your images in the background
                without freezing your browser. Generate complex patterns in
                seconds.
              </p>
            </Card>

            {/* Feature 2 */}
            <Card className='p-6 space-y-4 bg-primary/5 border-primary/30 hover:shadow-lg transition-shadow'>
              <div className='h-12 w-12 rounded-lg bg-primary flex items-center justify-center'>
                <ImageIcon className='h-6 w-6 text-primary-foreground' />
              </div>
              <h3 className='text-xl font-bold text-card-foreground'>
                Any Image
              </h3>
              <p className='text-muted-foreground'>
                Upload photos, logos, or artwork. Our algorithm analyzes
                brightness and creates optimal pin-to-pin connections for
                stunning results.
              </p>
            </Card>

            {/* Feature 3 */}
            <Card className='p-6 space-y-4 bg-accent/20 border-accent hover:shadow-lg transition-shadow'>
              <div className='h-12 w-12 rounded-lg bg-accent flex items-center justify-center'>
                <Download className='h-6 w-6 text-accent-foreground' />
              </div>
              <h3 className='text-xl font-bold text-card-foreground'>
                Multiple Formats
              </h3>
              <p className='text-muted-foreground'>
                Export as high-resolution PNG, scalable SVG, raw JSON data, or
                step-by-step TXT instructions for physical builds.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Examples Section */}
      <section className='py-12 md:py-20 px-4 bg-background'>
        <div className='container mx-auto max-w-6xl'>
          <div className='text-center mb-8 md:mb-12'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4 px-4'>
              Featured Examples
            </h2>
            <p className='text-muted-foreground max-w-2xl mx-auto px-4'>
              See what's possible with String Art Generator. Each piece created
              with just threads and math.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-6 md:gap-8'>
            {/* Example 1 - Portrait */}
            <Card className='overflow-hidden group hover:shadow-xl transition-all'>
              <div className='aspect-square bg-muted relative overflow-hidden'>
                <div className='absolute inset-0 bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center'>
                  <ImageIcon className='h-24 w-24 text-muted-foreground/30' />
                </div>
              </div>
              <div className='p-4 space-y-2'>
                <div className='flex items-center gap-2'>
                  <span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary'>
                    Portrait
                  </span>
                  <span className='text-xs text-muted-foreground'>
                    300 pins, 4000 lines
                  </span>
                </div>
                <h3 className='font-bold'>High Detail Portrait</h3>
                <p className='text-sm text-muted-foreground'>
                  Perfect for capturing facial features with high contrast.
                </p>
              </div>
            </Card>

            {/* Example 2 - Logo */}
            <Card className='overflow-hidden group hover:shadow-xl transition-all'>
              <div className='aspect-square bg-muted relative overflow-hidden'>
                <div className='absolute inset-0 bg-linear-to-br from-secondary/20 to-accent/20 flex items-center justify-center'>
                  <Sparkles className='h-24 w-24 text-muted-foreground/30' />
                </div>
              </div>
              <div className='p-4 space-y-2'>
                <div className='flex items-center gap-2'>
                  <span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary'>
                    Logo
                  </span>
                  <span className='text-xs text-muted-foreground'>
                    150 pins, 2000 lines
                  </span>
                </div>
                <h3 className='font-bold'>Bold Logo Design</h3>
                <p className='text-sm text-muted-foreground'>
                  Clean, recognizable designs with strong shapes.
                </p>
              </div>
            </Card>

            {/* Example 3 - Abstract */}
            <Card className='overflow-hidden group hover:shadow-xl transition-all'>
              <div className='aspect-square bg-muted relative overflow-hidden'>
                <div className='absolute inset-0 bg-linear-to-br from-accent/20 to-primary/20 flex items-center justify-center'>
                  <Palette className='h-24 w-24 text-muted-foreground/30' />
                </div>
              </div>
              <div className='p-4 space-y-2'>
                <div className='flex items-center gap-2'>
                  <span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent'>
                    Abstract
                  </span>
                  <span className='text-xs text-muted-foreground'>
                    200 pins, 3000 lines
                  </span>
                </div>
                <h3 className='font-bold'>Artistic Expression</h3>
                <p className='text-sm text-muted-foreground'>
                  Unique patterns and creative interpretations.
                </p>
              </div>
            </Card>
          </div>

          <div className='text-center mt-8'>
            <Link href='/gallery'>
              <Button variant='outline' size='lg'>
                View Full Gallery
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className='py-12 md:py-20 px-4 bg-background'>
        <div className='container mx-auto max-w-4xl'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 px-4'>
            How It Works
          </h2>

          <div className='space-y-6 md:space-y-8'>
            <div className='flex gap-4 md:gap-6 items-start'>
              <div className='shrink-0 h-10 w-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-lg shadow-md'>
                1
              </div>
              <div>
                <h3 className='text-lg md:text-xl font-bold mb-2 text-foreground'>
                  Upload Your Image
                </h3>
                <p className='text-sm md:text-base text-foreground/80'>
                  Drag and drop or click to upload any image. Supports PNG, JPG,
                  JPEG, and WebP formats.
                </p>
              </div>
            </div>

            <div className='flex gap-4 md:gap-6 items-start'>
              <div className='shrink-0 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-md'>
                2
              </div>
              <div>
                <h3 className='text-lg md:text-xl font-bold mb-2 text-foreground'>
                  Adjust Parameters
                </h3>
                <p className='text-sm md:text-base text-foreground/80'>
                  Fine-tune the number of pins (50-400), lines (500-5000), line
                  weight, opacity, and background color to match your vision.
                </p>
              </div>
            </div>

            <div className='flex gap-4 md:gap-6 items-start'>
              <div className='shrink-0 h-10 w-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-lg shadow-md'>
                3
              </div>
              <div>
                <h3 className='text-lg md:text-xl font-bold mb-2 text-foreground'>
                  Generate & Export
                </h3>
                <p className='text-sm md:text-base text-foreground/80'>
                  Click generate and watch as the algorithm creates your string
                  art. Download in your preferred format and start building!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-12 md:py-16 px-4 bg-linear-to-br from-primary/5 via-background to-secondary/5'>
        <div className='container mx-auto max-w-6xl'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8'>
            <div className='text-center space-y-2'>
              <div className='h-16 w-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-3'>
                <Users className='h-8 w-8 text-primary' />
              </div>
              <div className='text-3xl md:text-4xl font-bold text-foreground'>
                2.3K+
              </div>
              <p className='text-sm text-muted-foreground'>Unique Visitors</p>
            </div>

            <div className='text-center space-y-2'>
              <div className='h-16 w-16 mx-auto rounded-2xl bg-secondary/10 flex items-center justify-center mb-3'>
                <Sparkles className='h-8 w-8 text-secondary' />
              </div>
              <div className='text-3xl md:text-4xl font-bold text-foreground'>
                500+
              </div>
              <p className='text-sm text-muted-foreground'>Designs Created</p>
            </div>

            <div className='text-center space-y-2'>
              <div className='h-16 w-16 mx-auto rounded-2xl bg-accent/10 flex items-center justify-center mb-3'>
                <Download className='h-8 w-8 text-accent' />
              </div>
              <div className='text-3xl md:text-4xl font-bold text-foreground'>
                1K+
              </div>
              <p className='text-sm text-muted-foreground'>Files Downloaded</p>
            </div>

            <div className='text-center space-y-2'>
              <div className='h-16 w-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-3'>
                <TrendingUp className='h-8 w-8 text-primary' />
              </div>
              <div className='text-3xl md:text-4xl font-bold text-foreground'>
                100%
              </div>
              <p className='text-sm text-muted-foreground'>Free Forever</p>
            </div>
          </div>
        </div>
      </section>

      {/* Inline Ad between sections */}
      <div className='container mx-auto max-w-6xl px-4'>
        <InlineAd />
      </div>

      {/* Benefits */}
      <section className='py-12 md:py-20 px-4 bg-popover'>
        <div className='container mx-auto max-w-4xl'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 px-4 text-popover-foreground'>
            Perfect For
          </h2>

          <div className='grid sm:grid-cols-2 gap-4 md:gap-6'>
            <div className='flex gap-3 items-start'>
              <CheckCircle className='h-6 w-6 text-secondary shrink-0 mt-1' />
              <div>
                <h4 className='font-bold mb-1 text-popover-foreground'>
                  Artists & Creators
                </h4>
                <p className='text-sm text-muted-foreground'>
                  Design unique wall art and decorative pieces
                </p>
              </div>
            </div>

            <div className='flex gap-3 items-start'>
              <CheckCircle className='h-6 w-6 text-primary shrink-0 mt-1' />
              <div>
                <h4 className='font-bold mb-1 text-popover-foreground'>
                  DIY Enthusiasts
                </h4>
                <p className='text-sm text-muted-foreground'>
                  Get exact instructions for physical string art projects
                </p>
              </div>
            </div>

            <div className='flex gap-3 items-start'>
              <CheckCircle className='h-6 w-6 text-accent shrink-0 mt-1' />
              <div>
                <h4 className='font-bold mb-1 text-popover-foreground'>
                  Educators
                </h4>
                <p className='text-sm text-muted-foreground'>
                  Teach geometry, algorithms, and creative coding
                </p>
              </div>
            </div>

            <div className='flex gap-3 items-start'>
              <CheckCircle className='h-6 w-6 text-secondary shrink-0 mt-1' />
              <div>
                <h4 className='font-bold mb-1 text-popover-foreground'>
                  Gift Makers
                </h4>
                <p className='text-sm text-muted-foreground'>
                  Create personalized string art from photos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='py-12 md:py-20 px-4 bg-card'>
        <div className='container mx-auto max-w-6xl'>
          <div className='text-center mb-8 md:mb-12'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4 px-4'>
              Loved by Creators Worldwide
            </h2>
            <p className='text-muted-foreground max-w-2xl mx-auto px-4'>
              See what artists, educators, and makers are saying about String
              Art Generator.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-6 md:gap-8'>
            {/* Testimonial 1 */}
            <Card className='p-6 space-y-4 bg-background hover:shadow-lg transition-shadow'>
              <div className='flex gap-1 mb-2'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className='h-4 w-4 fill-secondary text-secondary'
                  />
                ))}
              </div>
              <p className='text-sm text-muted-foreground italic'>
                "This tool transformed how I create commissioned art pieces. The
                ability to preview and adjust parameters saves hours of work!"
              </p>
              <div className='pt-2 border-t'>
                <p className='font-semibold text-sm'>Sarah Chen</p>
                <p className='text-xs text-muted-foreground'>
                  Professional Artist
                </p>
              </div>
            </Card>

            {/* Testimonial 2 */}
            <Card className='p-6 space-y-4 bg-background hover:shadow-lg transition-shadow'>
              <div className='flex gap-1 mb-2'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className='h-4 w-4 fill-secondary text-secondary'
                  />
                ))}
              </div>
              <p className='text-sm text-muted-foreground italic'>
                "My students love seeing math come to life! Perfect for teaching
                algorithms and geometry in a visual, engaging way."
              </p>
              <div className='pt-2 border-t'>
                <p className='font-semibold text-sm'>Dr. James Rodriguez</p>
                <p className='text-xs text-muted-foreground'>
                  Mathematics Educator
                </p>
              </div>
            </Card>

            {/* Testimonial 3 */}
            <Card className='p-6 space-y-4 bg-background hover:shadow-lg transition-shadow'>
              <div className='flex gap-1 mb-2'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className='h-4 w-4 fill-secondary text-secondary'
                  />
                ))}
              </div>
              <p className='text-sm text-muted-foreground italic'>
                "Made a custom portrait for my mom's birthday. The TXT file made
                the physical build so easy. She absolutely loved it!"
              </p>
              <div className='pt-2 border-t'>
                <p className='font-semibold text-sm'>Alex Martinez</p>
                <p className='text-xs text-muted-foreground'>DIY Enthusiast</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-12 md:py-20 px-4 bg-muted'>
        <div className='container mx-auto max-w-4xl text-center'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 px-4'>
            Ready to Create Your String Art?
          </h2>
          <p className='text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 px-4'>
            Join creators worldwide transforming images into beautiful string
            art patterns.
          </p>
          <Link href='/editor'>
            <Button
              size='lg'
              className='text-base md:text-lg px-6 md:px-8 w-full sm:w-auto shadow-lg'>
              <Sparkles className='mr-2 h-5 w-5' />
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
