// Server Component - Artists & Professionals Use Case
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Palette, DollarSign, Package, Award } from 'lucide-react';

const useCases = [
  {
    title: 'Digital Portfolio',
    icon: Palette,
    description:
      'Showcase unique string art pieces in your online portfolio with high-resolution exports.',
    benefits: [
      'Stand out with algorithmic art',
      'Unlimited variations from one design',
      'Professional PNG/SVG exports',
    ],
    config: {
      pins: '250-300',
      lines: '5000-8000',
      quality: 'High',
    },
  },
  {
    title: 'Custom Commissions',
    icon: DollarSign,
    description:
      'Accept client portrait commissions and deliver both digital files and physical instructions.',
    benefits: [
      'Fast turnaround (minutes vs hours)',
      'Preview before building physically',
      'Client gets PDF template included',
    ],
    config: {
      pins: '200-250',
      lines: '4000-6000',
      quality: 'Medium-High',
    },
  },
  {
    title: 'Merchandise & Prints',
    icon: Package,
    description:
      'Create print-ready designs for posters, t-shirts, and other merchandise.',
    benefits: [
      'Export at any resolution',
      'Vector SVG for infinite scaling',
      'Unique designs for each product',
    ],
    config: {
      pins: '200+',
      lines: '3000-5000',
      quality: 'Medium',
    },
  },
  {
    title: 'Gallery Exhibitions',
    icon: Award,
    description:
      'Prepare large-scale installations with precise templates for physical string art.',
    benefits: [
      'Generate templates up to A2 size',
      'Professional documentation',
      'Reproducible results',
    ],
    config: {
      pins: '300-400',
      lines: '10000+',
      quality: 'Ultra',
    },
  },
];

export function ArtistsProfessionals() {
  return (
    <div className='space-y-8'>
      {/* Introduction */}
      <Card className='bg-primary/5 border-primary/20'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Palette className='h-6 w-6 text-primary' />
            For Artists & Professionals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground'>
            String Art Generator empowers professional artists to explore
            algorithmic art without coding. Create portfolio pieces, accept
            commissions, sell merchandise, or prepare gallery exhibitions with
            precision and speed.
          </p>
        </CardContent>
      </Card>

      {/* Use Cases Grid */}
      <div className='grid md:grid-cols-2 gap-6'>
        {useCases.map((useCase, idx) => {
          const Icon = useCase.icon;
          return (
            <Card key={idx}>
              <CardHeader>
                <div className='flex items-start justify-between'>
                  <div className='flex items-center gap-3'>
                    <Icon className='h-8 w-8 text-primary' />
                    <CardTitle className='text-xl'>{useCase.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className='space-y-4'>
                <p className='text-sm text-muted-foreground'>
                  {useCase.description}
                </p>

                <div>
                  <h4 className='font-semibold text-sm mb-2'>Benefits:</h4>
                  <ul className='space-y-1'>
                    {useCase.benefits.map((benefit, bidx) => (
                      <li key={bidx} className='text-sm flex items-start gap-2'>
                        <span className='text-primary mt-1'>•</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className='pt-2 border-t'>
                  <h4 className='font-semibold text-sm mb-2'>
                    Recommended Settings:
                  </h4>
                  <div className='flex flex-wrap gap-2'>
                    <Badge variant='outline'>Pins: {useCase.config.pins}</Badge>
                    <Badge variant='outline'>
                      Lines: {useCase.config.lines}
                    </Badge>
                    <Badge variant='secondary'>{useCase.config.quality}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* CTA */}
      <Card className='bg-gradient-to-r from-violet-50 to-amber-50 dark:from-violet-950/20 dark:to-amber-950/20 border-violet-200 dark:border-violet-900'>
        <CardContent className='flex flex-col md:flex-row items-center justify-between gap-4 py-6'>
          <div>
            <h3 className='font-bold text-lg mb-1'>
              Ready to elevate your art practice?
            </h3>
            <p className='text-sm text-muted-foreground'>
              Start creating professional string art in minutes.
            </p>
          </div>
          <Link href='/editor'>
            <Button size='lg' className='w-full md:w-auto'>
              Create Your First Piece
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
