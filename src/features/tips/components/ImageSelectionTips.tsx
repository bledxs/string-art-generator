// Server Component - Image Selection Tips Section
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';

const imageTypes = [
  {
    type: 'High Contrast Portraits',
    result: 'Excellent',
    description: 'Clear facial features, strong shadows',
    badge: 'recommended',
  },
  {
    type: 'Silhouettes',
    result: 'Excellent',
    description: 'Clean edges, iconic shapes',
    badge: 'recommended',
  },
  {
    type: 'Logos & Icons',
    result: 'Very Good',
    description: 'Simple, bold designs work best',
    badge: 'good',
  },
  {
    type: 'Landscapes',
    result: 'Moderate',
    description: 'Best with strong foreground/background separation',
    badge: 'moderate',
  },
  {
    type: 'Low Contrast Photos',
    result: 'Poor',
    description: 'Washed out, lacks definition',
    badge: 'avoid',
  },
  {
    type: 'Busy Patterns',
    result: 'Poor',
    description: 'Too much detail gets lost',
    badge: 'avoid',
  },
];

const dos = [
  'Use high-resolution images (1000px+ recommended)',
  'Choose images with strong contrast',
  'Prefer simple compositions over complex scenes',
  'Test with grayscale preview first',
  'Crop to focus on the subject',
];

const donts = [
  "Don't use low-resolution or pixelated images",
  "Don't choose images with subtle gradients",
  "Don't include too many small details",
  "Don't use images with similar foreground/background tones",
  "Don't forget to adjust brightness/contrast beforehand",
];

export function ImageSelectionTips() {
  return (
    <section id='image-selection' className='scroll-mt-20'>
      <h2 className='text-3xl font-bold mb-6'>Image Selection Tips</h2>

      {/* Image Types Table */}
      <Card className='mb-8'>
        <CardHeader>
          <CardTitle>Image Types & Expected Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b'>
                  <th className='text-left py-3 px-4'>Image Type</th>
                  <th className='text-left py-3 px-4'>Result Quality</th>
                  <th className='text-left py-3 px-4'>Notes</th>
                </tr>
              </thead>
              <tbody>
                {imageTypes.map((item, idx) => (
                  <tr key={idx} className='border-b last:border-0'>
                    <td className='py-3 px-4 font-medium'>{item.type}</td>
                    <td className='py-3 px-4'>
                      <Badge
                        variant={
                          item.badge === 'recommended'
                            ? 'default'
                            : item.badge === 'avoid'
                            ? 'destructive'
                            : 'secondary'
                        }>
                        {item.result}
                      </Badge>
                    </td>
                    <td className='py-3 px-4 text-sm text-muted-foreground'>
                      {item.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Do's and Don'ts */}
      <div className='grid md:grid-cols-2 gap-6'>
        <Card className='border-green-200 dark:border-green-900'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-green-700 dark:text-green-400'>
              <Check className='h-5 w-5' />
              Do&apos;s
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className='space-y-2'>
              {dos.map((item, idx) => (
                <li key={idx} className='flex items-start gap-2'>
                  <Check className='h-5 w-5 text-green-600 mt-0.5 shrink-0' />
                  <span className='text-sm'>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className='border-red-200 dark:border-red-900'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-red-700 dark:text-red-400'>
              <X className='h-5 w-5' />
              Don&apos;ts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className='space-y-2'>
              {donts.map((item, idx) => (
                <li key={idx} className='flex items-start gap-2'>
                  <X className='h-5 w-5 text-red-600 mt-0.5 shrink-0' />
                  <span className='text-sm'>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
