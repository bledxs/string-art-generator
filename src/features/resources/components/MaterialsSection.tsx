import { Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function MaterialsSection() {
  return (
    <section id='materials' className='mb-16 scroll-mt-20'>
      <h2 className='text-2xl font-bold mb-6 flex items-center gap-2'>
        <Package className='h-6 w-6 text-primary' />
        Recommended Materials
      </h2>
      <div className='grid md:grid-cols-2 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle>Essential Materials</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <h4 className='font-semibold mb-2'>Board</h4>
              <ul className='text-sm space-y-1 text-muted-foreground'>
                <li>• Plywood (12-18mm thick) - Best for large projects</li>
                <li>• MDF (Medium Density Fiberboard) - Smooth surface</li>
                <li>• Corkboard - Easy to work with, lightweight</li>
                <li>• Foam board - Cheap option for practice</li>
              </ul>
            </div>
            <div>
              <h4 className='font-semibold mb-2'>Nails/Pins</h4>
              <ul className='text-sm space-y-1 text-muted-foreground'>
                <li>• 1-2cm finishing nails (brass or steel)</li>
                <li>• Panel pins for delicate work</li>
                <li>• T-pins for foam/cork boards</li>
              </ul>
            </div>
            <div>
              <h4 className='font-semibold mb-2'>String/Thread</h4>
              <ul className='text-sm space-y-1 text-muted-foreground'>
                <li>• Sewing thread (50-100 weight) - Fine detail</li>
                <li>• Embroidery floss - Vibrant colors</li>
                <li>• Nylon string - Durable, strong</li>
                <li>• Metallic thread - Special effects</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tools & Budget</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <h4 className='font-semibold mb-2'>Basic Tools</h4>
              <ul className='text-sm space-y-1 text-muted-foreground'>
                <li>• Hammer (lightweight)</li>
                <li>• Ruler or measuring tape</li>
                <li>• Protractor or compass</li>
                <li>• Pencil and eraser</li>
                <li>• Printer (for templates/TXT files)</li>
                <li>• Scissors</li>
              </ul>
            </div>
            <div className='p-4 bg-primary/10 rounded-lg'>
              <h4 className='font-semibold mb-2'>Estimated Budget</h4>
              <ul className='text-sm space-y-1'>
                <li className='flex justify-between'>
                  <span>Beginner kit (100 pins)</span>
                  <span className='font-semibold'>$15-25</span>
                </li>
                <li className='flex justify-between'>
                  <span>Intermediate (200 pins)</span>
                  <span className='font-semibold'>$25-40</span>
                </li>
                <li className='flex justify-between'>
                  <span>Advanced (300+ pins)</span>
                  <span className='font-semibold'>$40-60</span>
                </li>
              </ul>
            </div>
            <p className='text-xs text-muted-foreground'>
              * Prices are estimates in USD. Actual costs may vary by location
              and supplier.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
