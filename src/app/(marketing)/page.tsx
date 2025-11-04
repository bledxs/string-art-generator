// Server Component - Landing Page
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Sparkles,
  Zap,
  Download,
  Image as ImageIcon,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className='min-h-screen bg-background'>
      {/* Hero Section */}
      <section className='relative py-20 px-4 overflow-hidden'>
        <div className='container mx-auto max-w-6xl'>
          <div className='text-center space-y-6'>
            <h1 className='text-5xl md:text-7xl font-bold tracking-tight'>
              Transform Images into
              <span className='block text-primary'>String Art</span>
            </h1>
            <p className='text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto'>
              Create stunning string art patterns from any image using advanced
              algorithms. Free, fast, and powerful.
            </p>
            <div className='flex gap-4 justify-center pt-4'>
              <Link href='/editor'>
                <Button size='lg' className='text-lg px-8'>
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
      <section className='py-20 px-4 bg-muted/50'>
        <div className='container mx-auto max-w-6xl'>
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-12'>
            Why String Art Generator?
          </h2>

          <div className='grid md:grid-cols-3 gap-8'>
            {/* Feature 1 */}
            <Card className='p-6 space-y-4'>
              <div className='h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center'>
                <Zap className='h-6 w-6 text-primary' />
              </div>
              <h3 className='text-xl font-semibold'>Lightning Fast</h3>
              <p className='text-muted-foreground'>
                Advanced Web Workers process your images in the background
                without freezing your browser. Generate complex patterns in
                seconds.
              </p>
            </Card>

            {/* Feature 2 */}
            <Card className='p-6 space-y-4'>
              <div className='h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center'>
                <ImageIcon className='h-6 w-6 text-primary' />
              </div>
              <h3 className='text-xl font-semibold'>Any Image</h3>
              <p className='text-muted-foreground'>
                Upload photos, logos, or artwork. Our algorithm analyzes
                brightness and creates optimal pin-to-pin connections for
                stunning results.
              </p>
            </Card>

            {/* Feature 3 */}
            <Card className='p-6 space-y-4'>
              <div className='h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center'>
                <Download className='h-6 w-6 text-primary' />
              </div>
              <h3 className='text-xl font-semibold'>Multiple Formats</h3>
              <p className='text-muted-foreground'>
                Export as high-resolution PNG, scalable SVG, raw JSON data, or
                step-by-step TXT instructions for physical builds.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className='py-20 px-4'>
        <div className='container mx-auto max-w-4xl'>
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-12'>
            How It Works
          </h2>

          <div className='space-y-8'>
            <div className='flex gap-6 items-start'>
              <div className='shrink-0 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold'>
                1
              </div>
              <div>
                <h3 className='text-xl font-semibold mb-2'>
                  Upload Your Image
                </h3>
                <p className='text-muted-foreground'>
                  Drag and drop or click to upload any image. Supports PNG, JPG,
                  JPEG, and WebP formats.
                </p>
              </div>
            </div>

            <div className='flex gap-6 items-start'>
              <div className='shrink-0 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold'>
                2
              </div>
              <div>
                <h3 className='text-xl font-semibold mb-2'>
                  Adjust Parameters
                </h3>
                <p className='text-muted-foreground'>
                  Fine-tune the number of pins (50-400), lines (500-5000), line
                  weight, opacity, and background color to match your vision.
                </p>
              </div>
            </div>

            <div className='flex gap-6 items-start'>
              <div className='shrink-0 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold'>
                3
              </div>
              <div>
                <h3 className='text-xl font-semibold mb-2'>
                  Generate & Export
                </h3>
                <p className='text-muted-foreground'>
                  Click generate and watch as the algorithm creates your string
                  art. Download in your preferred format and start building!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className='py-20 px-4 bg-muted/50'>
        <div className='container mx-auto max-w-4xl'>
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-12'>
            Perfect For
          </h2>

          <div className='grid md:grid-cols-2 gap-6'>
            <div className='flex gap-3 items-start'>
              <CheckCircle className='h-6 w-6 text-primary shrink-0 mt-1' />
              <div>
                <h4 className='font-semibold mb-1'>Artists & Creators</h4>
                <p className='text-sm text-muted-foreground'>
                  Design unique wall art and decorative pieces
                </p>
              </div>
            </div>

            <div className='flex gap-3 items-start'>
              <CheckCircle className='h-6 w-6 text-primary shrink-0 mt-1' />
              <div>
                <h4 className='font-semibold mb-1'>DIY Enthusiasts</h4>
                <p className='text-sm text-muted-foreground'>
                  Get exact instructions for physical string art projects
                </p>
              </div>
            </div>

            <div className='flex gap-3 items-start'>
              <CheckCircle className='h-6 w-6 text-primary shrink-0 mt-1' />
              <div>
                <h4 className='font-semibold mb-1'>Educators</h4>
                <p className='text-sm text-muted-foreground'>
                  Teach geometry, algorithms, and creative coding
                </p>
              </div>
            </div>

            <div className='flex gap-3 items-start'>
              <CheckCircle className='h-6 w-6 text-primary shrink-0 mt-1' />
              <div>
                <h4 className='font-semibold mb-1'>Gift Makers</h4>
                <p className='text-sm text-muted-foreground'>
                  Create personalized string art from photos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 px-4'>
        <div className='container mx-auto max-w-4xl text-center'>
          <h2 className='text-3xl md:text-4xl font-bold mb-6'>
            Ready to Create Your String Art?
          </h2>
          <p className='text-xl text-muted-foreground mb-8'>
            Join creators worldwide transforming images into beautiful string
            art patterns.
          </p>
          <Link href='/editor'>
            <Button size='lg' className='text-lg px-8'>
              <Sparkles className='mr-2 h-5 w-5' />
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className='border-t py-8 px-4'>
        <div className='container mx-auto max-w-6xl'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <p className='text-sm text-muted-foreground'>
              © 2025 String Art Generator. Built with Next.js 16.
            </p>
            <div className='flex gap-6'>
              <Link
                href='/editor'
                className='text-sm text-muted-foreground hover:text-foreground'>
                Editor
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
