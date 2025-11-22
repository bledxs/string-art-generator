// Server Component - Events Use Case
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Cake, PartyPopper, Flower2 } from 'lucide-react';

const useCases = [
  {
    title: 'Weddings',
    icon: Heart,
    description:
      'Create romantic couple portraits, initials, or meaningful quotes as ceremony decor or guest book alternatives.',
    benefits: [
      'Unique ceremony backdrop',
      'Personalized guest book art',
      'Lasting keepsake after the day',
    ],
    popular: ['Couple portraits', 'Initials & date', 'First dance silhouette'],
  },
  {
    title: 'Anniversaries',
    icon: Flower2,
    description:
      'Commemorate milestones with custom string art featuring significant dates, locations, or photos.',
    benefits: [
      'Thoughtful handmade gift',
      'Celebrates shared memories',
      'Display-worthy home decor',
    ],
    popular: [
      'Wedding photo recreation',
      'Special date art',
      'Favorite place map',
    ],
  },
  {
    title: 'Quinceañeras & Sweet 16',
    icon: Cake,
    description:
      'Mark coming-of-age celebrations with stunning personalized portraits and party decor.',
    benefits: [
      'Photo-worthy centerpiece',
      'Personalized party decor',
      'Gift for the guest of honor',
    ],
    popular: ['Portrait art', 'Age number display', 'Themed silhouettes'],
  },
  {
    title: 'Memorial Art',
    icon: PartyPopper,
    description:
      'Honor loved ones with tasteful portrait art that preserves memories beautifully.',
    benefits: [
      'Dignified tribute',
      'Healing creative process',
      'Shareable with family',
    ],
    popular: ['Portrait tributes', 'Meaningful symbols', 'Favorite quotes'],
  },
];

const timeline = [
  {
    phase: '4-6 weeks before',
    task: 'Design and generate string art',
    time: '1-2 hours',
  },
  {
    phase: '3-4 weeks before',
    task: 'Order materials and prepare board',
    time: '1 hour',
  },
  {
    phase: '1-2 weeks before',
    task: 'Build physical string art',
    time: '4-8 hours',
  },
  {
    phase: 'Event day',
    task: 'Display and enjoy',
    time: '—',
  },
];

export function Events() {
  return (
    <div className='space-y-8'>
      {/* Introduction */}
      <Card className='bg-pink-50 dark:bg-pink-950/20 border-pink-200 dark:border-pink-900'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Heart className='h-6 w-6 text-pink-600 dark:text-pink-400' />
            For Special Events & Celebrations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground'>
            Make milestone moments unforgettable with custom string art that
            captures emotion, personality, and significance. Perfect for
            weddings, anniversaries, and celebrations of life.
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
                  <Icon className='h-8 w-8 text-pink-600 dark:text-pink-400' />
                  <CardTitle className='text-xl'>{useCase.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className='space-y-4'>
                <p className='text-sm text-muted-foreground'>
                  {useCase.description}
                </p>

                <div>
                  <h4 className='font-semibold text-sm mb-2'>Why It Works:</h4>
                  <ul className='space-y-1'>
                    {useCase.benefits.map((benefit, bidx) => (
                      <li key={bidx} className='text-sm flex items-start gap-2'>
                        <span className='text-pink-600 mt-1'>•</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className='pt-2 border-t'>
                  <h4 className='font-semibold text-sm mb-2'>Popular Ideas:</h4>
                  <div className='flex flex-wrap gap-2'>
                    {useCase.popular.map((idea, pidx) => (
                      <Badge key={pidx} variant='outline' className='text-xs'>
                        {idea}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Planning Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {timeline.map((item, idx) => (
              <div
                key={idx}
                className='flex items-start gap-4 pb-4 last:pb-0 border-b last:border-0'>
                <Badge variant='outline' className='mt-0.5 min-w-[140px]'>
                  {item.phase}
                </Badge>
                <div className='flex-1'>
                  <p className='font-semibold text-sm'>{item.task}</p>
                  <p className='text-xs text-muted-foreground'>{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <Card className='bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 border-pink-200 dark:border-pink-900'>
        <CardContent className='flex flex-col md:flex-row items-center justify-between gap-4 py-6'>
          <div>
            <h3 className='font-bold text-lg mb-1'>
              Create meaningful art for your special day
            </h3>
            <p className='text-sm text-muted-foreground'>
              Start designing your event masterpiece now.
            </p>
          </div>
          <Link href='/editor'>
            <Button size='lg' className='w-full md:w-auto'>
              Start Creating
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
