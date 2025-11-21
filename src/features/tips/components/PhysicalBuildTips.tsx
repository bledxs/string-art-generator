// Server Component - Physical Build Tips Section
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Hammer, ShieldAlert, Wrench } from 'lucide-react';

const bestPractices = [
  'Print template at 100% scale - verify with a ruler',
  "Use painter's tape to secure template to board",
  'Pre-drill pilot holes for nails to prevent wood splitting',
  'Start nails by hand, finish with hammer for consistency',
  'Keep nails at same height (use a depth guide)',
  'Number pins on template to match design',
  'Thread from darkest to lightest areas',
  'Maintain consistent tension throughout',
  'Tie off thread at starting pin, not randomly',
  'Use thread wax to reduce tangling',
];

const safetyTips = [
  'Wear safety glasses when hammering',
  'Work in well-lit area',
  'Keep fingers clear of hammer strikes',
  'Use thimble when pulling tight threads',
  'Secure board to prevent movement',
  'Keep workspace clear of trip hazards',
];

const troubleshooting = [
  {
    problem: 'Thread keeps breaking',
    solution: 'Reduce tension or use thicker thread (2-ply instead of 1-ply)',
  },
  {
    problem: 'Nails are uneven heights',
    solution: 'Use a small wood block as a depth guide when hammering',
  },
  {
    problem: 'Template tore',
    solution: 'Laminate template or use cardstock instead of regular paper',
  },
  {
    problem: 'Thread tangles frequently',
    solution: 'Apply thread wax and work in shorter sections',
  },
  {
    problem: 'Image looks washed out',
    solution: 'Use darker thread or reduce opacity parameter in design',
  },
  {
    problem: 'Board warping',
    solution: 'Use plywood (not particle board) and seal both sides',
  },
];

export function PhysicalBuildTips() {
  return (
    <section id='physical-build' className='scroll-mt-20'>
      <h2 className='text-3xl font-bold mb-6'>Physical Build Tips</h2>

      {/* Best Practices */}
      <Card className='mb-6'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Hammer className='h-5 w-5 text-blue-500' />
            Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='grid md:grid-cols-2 gap-2'>
            {bestPractices.map((practice, idx) => (
              <li key={idx} className='flex items-start gap-2'>
                <span className='text-blue-500 font-bold mt-1'>•</span>
                <span className='text-sm'>{practice}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Safety */}
      <Card className='mb-6 border-red-200 dark:border-red-900'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2 text-red-700 dark:text-red-400'>
            <ShieldAlert className='h-5 w-5' />
            Safety First
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid md:grid-cols-2 gap-3'>
            {safetyTips.map((tip, idx) => (
              <div
                key={idx}
                className='flex items-center gap-2 p-2 bg-red-50 dark:bg-red-950/20 rounded'>
                <Badge variant='destructive' className='text-xs'>
                  !
                </Badge>
                <span className='text-sm'>{tip}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Troubleshooting */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Wrench className='h-5 w-5 text-yellow-500' />
            Common Issues & Solutions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            {troubleshooting.map((item, idx) => (
              <div key={idx} className='border-l-4 border-l-yellow-500 pl-4'>
                <div className='font-semibold text-sm mb-1'>{item.problem}</div>
                <div className='text-sm text-muted-foreground'>
                  → {item.solution}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
