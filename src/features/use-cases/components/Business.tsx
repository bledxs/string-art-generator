// Server Component - Business Use Case
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Building2, Gift, Sparkles } from 'lucide-react';

const useCases = [
  {
    title: 'Corporate Logo Art',
    icon: Sparkles,
    description:
      'Transform company logos into stunning string art for office lobbies and conference rooms.',
    benefits: [
      'Unique brand representation',
      'Scalable to any size',
      'Modern, tech-forward aesthetic',
    ],
    bestFor: 'Tech companies, startups, creative agencies',
  },
  {
    title: 'Office Decor',
    icon: Building2,
    description:
      'Create inspiring workspace art that reflects company values and culture.',
    benefits: [
      'Customizable to brand colors',
      'Professional presentation',
      'Employee engagement booster',
    ],
    bestFor: 'Corporate offices, co-working spaces',
  },
  {
    title: 'Corporate Gifts',
    icon: Gift,
    description:
      'Personalized string art for client appreciation, employee milestones, or retirement gifts.',
    benefits: [
      'Memorable and unique',
      'Shows thoughtfulness',
      'Can include portraits or logos',
    ],
    bestFor: 'Client relations, HR departments',
  },
  {
    title: 'Brand Activations',
    icon: Briefcase,
    description:
      'Eye-catching installations for trade shows, product launches, or marketing campaigns.',
    benefits: [
      'Instagram-worthy content',
      'Interactive experiences',
      'Shareable brand moments',
    ],
    bestFor: 'Marketing teams, event planners',
  },
];

const benefits = [
  {
    title: 'Cost-Effective',
    description: 'Lower than commissioning custom art from scratch',
  },
  {
    title: 'Fast Turnaround',
    description: 'Generate designs in minutes, build in hours',
  },
  {
    title: 'Scalable',
    description: 'From desktop pieces to wall-sized installations',
  },
  {
    title: 'On-Brand',
    description: 'Customize colors, size, and complexity to match brand',
  },
];

export function Business() {
  return (
    <div className='space-y-8'>
      {/* Introduction */}
      <Card className='bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-900'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Briefcase className='h-6 w-6 text-violet-600 dark:text-violet-400' />
            For Businesses & Brands
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground'>
            Stand out with algorithmic string art that communicates innovation,
            creativity, and attention to detail. Perfect for corporate branding,
            office spaces, and client engagement.
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
                <div className='flex items-start gap-3'>
                  <Icon className='h-8 w-8 text-violet-600 dark:text-violet-400' />
                  <div className='flex-1'>
                    <CardTitle className='text-xl'>{useCase.title}</CardTitle>
                    <p className='text-xs text-muted-foreground mt-1'>
                      {useCase.bestFor}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className='space-y-4'>
                <p className='text-sm text-muted-foreground'>
                  {useCase.description}
                </p>

                <div>
                  <h4 className='font-semibold text-sm mb-2'>Advantages:</h4>
                  <ul className='space-y-1'>
                    {useCase.benefits.map((benefit, bidx) => (
                      <li key={bidx} className='text-sm flex items-start gap-2'>
                        <span className='text-violet-600 mt-1'>•</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Business Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Why Businesses Choose String Art</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid md:grid-cols-2 gap-4'>
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className='flex items-start gap-3 p-3 rounded-lg border'>
                <Badge variant='default' className='mt-0.5'>
                  ✓
                </Badge>
                <div>
                  <h4 className='font-semibold text-sm mb-1'>
                    {benefit.title}
                  </h4>
                  <p className='text-xs text-muted-foreground'>
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <Card className='bg-gradient-to-r from-violet-50 to-fuchsia-50 dark:from-violet-950/20 dark:to-fuchsia-950/20 border-violet-200 dark:border-violet-900'>
        <CardContent className='flex flex-col md:flex-row items-center justify-between gap-4 py-6'>
          <div>
            <h3 className='font-bold text-lg mb-1'>
              Elevate your brand with custom string art
            </h3>
            <p className='text-sm text-muted-foreground'>
              Contact us for bulk licenses or enterprise solutions.
            </p>
          </div>
          <Link href='/contact'>
            <Button size='lg' className='w-full md:w-auto'>
              Get in Touch
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
