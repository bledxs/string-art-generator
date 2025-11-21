// Server Component - Common Mistakes Section
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

const mistakes = [
  {
    mistake: 'Using Low-Resolution Images',
    problem: 'Results in pixelated, unclear string art',
    solution:
      'Use images at least 1000x1000px. Upscale if needed using AI tools.',
  },
  {
    mistake: 'Too Many Pins for Complex Images',
    problem: 'Slows generation, harder to build physically',
    solution: 'Start with 200 pins. Add more only if results lack detail.',
  },
  {
    mistake: 'Ignoring Min Distance Parameter',
    problem: 'Threads cross too frequently, creating messy builds',
    solution: 'Keep min distance at 20-30 for physical projects.',
  },
  {
    mistake: 'Not Testing with Grayscale First',
    problem: 'Color images often lack contrast in string art',
    solution: 'Convert to grayscale and adjust contrast before uploading.',
  },
  {
    mistake: 'Skipping the Preview',
    problem: 'Wastes time on unsuitable images',
    solution: 'Always generate a quick preview (100 pins) first.',
  },
  {
    mistake: 'Using Images with Busy Backgrounds',
    problem: 'Subject gets lost in noise',
    solution: 'Crop tightly or remove background before processing.',
  },
  {
    mistake: 'Setting Line Darkness Too High',
    problem: 'Over-saturated, loses subtlety',
    solution: 'Keep between 0.3-0.5 for natural shading.',
  },
  {
    mistake: 'Not Saving Intermediate Results',
    problem: 'Losing good configurations',
    solution: 'Export settings and images at each iteration.',
  },
  {
    mistake: 'Ignoring Physical Build Constraints',
    problem: 'Digital design impossible to build',
    solution:
      'Consider thread thickness, board size, nail spacing in parameters.',
  },
  {
    mistake: 'Giving Up After First Attempt',
    problem: 'Missing the learning curve',
    solution: 'String art is iterative. Adjust parameters based on results.',
  },
];

export function CommonMistakes() {
  return (
    <section id='mistakes' className='scroll-mt-20'>
      <h2 className='text-3xl font-bold mb-6'>Common Mistakes to Avoid</h2>

      <div className='grid gap-4'>
        {mistakes.map((item, idx) => (
          <Card
            key={idx}
            className='border-l-4 border-l-orange-500 dark:border-l-orange-400'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-lg flex items-start gap-2'>
                <AlertTriangle className='h-5 w-5 text-orange-500 mt-0.5 shrink-0' />
                <div>
                  <span className='text-orange-700 dark:text-orange-400'>
                    #{idx + 1}:
                  </span>{' '}
                  {item.mistake}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div>
                <span className='font-semibold text-sm text-red-600 dark:text-red-400'>
                  Problem:
                </span>{' '}
                <span className='text-sm text-muted-foreground'>
                  {item.problem}
                </span>
              </div>
              <div>
                <span className='font-semibold text-sm text-green-600 dark:text-green-400'>
                  Solution:
                </span>{' '}
                <span className='text-sm'>{item.solution}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
