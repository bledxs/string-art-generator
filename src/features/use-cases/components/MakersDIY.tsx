// Server Component - Makers & DIY Use Case
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Hammer, Home, Gift, Users } from 'lucide-react';

const useCases = [
  {
    title: 'Home Decor',
    icon: Home,
    description:
      'Create personalized wall art that matches your interior design perfectly.',
    benefits: [
      'Custom sizes for any space',
      'Match any color scheme',
      'Unique conversation pieces',
    ],
    difficulty: 'Beginner-Friendly',
    timeEstimate: '2-4 hours',
  },
  {
    title: 'Weekend Projects',
    icon: Hammer,
    description:
      'Satisfying DIY projects you can complete in a single weekend with family or friends.',
    benefits: [
      'Clear step-by-step templates',
      'All skill levels welcome',
      'Sharable results',
    ],
    difficulty: 'Easy to Moderate',
    timeEstimate: '3-6 hours',
  },
  {
    title: 'Personalized Gifts',
    icon: Gift,
    description:
      'Handmade presents that show genuine thought—portraits, quotes, or meaningful symbols.',
    benefits: [
      'One-of-a-kind keepsakes',
      'Budget-friendly materials',
      'Memorable gift experience',
    ],
    difficulty: 'All Levels',
    timeEstimate: '2-5 hours',
  },
  {
    title: 'Maker Community',
    icon: Users,
    description:
      'Share your creations, learn from others, and inspire fellow DIY enthusiasts.',
    benefits: [
      'Join online communities',
      'Share build photos',
      'Get feedback & tips',
    ],
    difficulty: 'Social',
    timeEstimate: 'Ongoing',
  },
];

const popularProjects = [
  {
    name: 'Family Portrait',
    pins: 200,
    time: '4-5 hours',
    skill: 'Intermediate',
  },
  {
    name: 'Pet Silhouette',
    pins: 150,
    time: '2-3 hours',
    skill: 'Beginner',
  },
  {
    name: 'Inspirational Quote',
    pins: 180,
    time: '3-4 hours',
    skill: 'Beginner',
  },
  {
    name: 'Custom Logo',
    pins: 160,
    time: '2-3 hours',
    skill: 'Easy',
  },
];

export function MakersDIY() {
  return (
    <div className='space-y-8'>
      {/* Introduction */}
      <Card className='bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Hammer className='h-6 w-6 text-orange-600 dark:text-orange-400' />
            For Makers & DIY Enthusiasts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground'>
            Turn your creative ideas into reality with string art projects
            perfect for home decor, gifts, or weekend crafting. No artistic
            skills required—just enthusiasm and a bit of patience!
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
                  <Icon className='h-8 w-8 text-orange-600 dark:text-orange-400' />
                  <div>
                    <CardTitle className='text-xl'>{useCase.title}</CardTitle>
                    <div className='flex gap-2 mt-2'>
                      <Badge variant='secondary' className='text-xs'>
                        {useCase.difficulty}
                      </Badge>
                      <Badge variant='outline' className='text-xs'>
                        {useCase.timeEstimate}
                      </Badge>
                    </div>
                  </div>
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
                        <span className='text-orange-600 mt-1'>•</span>
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

      {/* Popular Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Popular DIY Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b'>
                  <th className='text-left py-3 px-4'>Project</th>
                  <th className='text-left py-3 px-4'>Pins</th>
                  <th className='text-left py-3 px-4'>Time</th>
                  <th className='text-left py-3 px-4'>Skill Level</th>
                </tr>
              </thead>
              <tbody>
                {popularProjects.map((project, idx) => (
                  <tr key={idx} className='border-b last:border-0'>
                    <td className='py-3 px-4 font-medium'>{project.name}</td>
                    <td className='py-3 px-4'>{project.pins}</td>
                    <td className='py-3 px-4 text-sm text-muted-foreground'>
                      {project.time}
                    </td>
                    <td className='py-3 px-4'>
                      <Badge variant='outline' className='text-xs'>
                        {project.skill}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <Card className='bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border-orange-200 dark:border-orange-900'>
        <CardContent className='flex flex-col md:flex-row items-center justify-between gap-4 py-6'>
          <div>
            <h3 className='font-bold text-lg mb-1'>
              Start your next DIY project today
            </h3>
            <p className='text-sm text-muted-foreground'>
              Download templates, get materials, and build something beautiful.
            </p>
          </div>
          <Link href='/resources'>
            <Button size='lg' className='w-full md:w-auto'>
              Get Templates & Supplies
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
