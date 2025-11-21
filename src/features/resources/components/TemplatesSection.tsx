import { Download } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function TemplatesSection() {
  return (
    <section id='templates' className='mb-16 scroll-mt-20'>
      <h2 className='text-2xl font-bold mb-6 flex items-center gap-2'>
        <Download className='h-6 w-6 text-primary' />
        Downloadable Templates
      </h2>
      <p className='text-muted-foreground mb-6'>
        Print-ready PDF templates for marking pin positions. Simply print,
        attach to your board, and hammer nails at the marked points.
      </p>
      <div className='grid md:grid-cols-3 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle className='text-lg flex items-center justify-between'>
              100 Pins Template
              <Badge variant='secondary'>Beginner</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <p className='text-sm text-muted-foreground'>
              Ideal for simple designs and first projects. 18cm diameter circle.
            </p>
            <ul className='text-sm space-y-1 text-muted-foreground'>
              <li>• A4 size (210 x 297mm)</li>
              <li>• 100 equally spaced pins</li>
              <li>• Numbered positions</li>
            </ul>
            <Link href='/templates/100-pins-template.pdf' download>
              <Button className='w-full' variant='outline'>
                <Download className='h-4 w-4 mr-2' />
                Download PDF
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='text-lg flex items-center justify-between'>
              200 Pins Template
              <Badge>Intermediate</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <p className='text-sm text-muted-foreground'>
              Perfect for portraits and detailed designs. 26cm diameter circle.
            </p>
            <ul className='text-sm space-y-1 text-muted-foreground'>
              <li>• A3 size (297 x 420mm)</li>
              <li>• 200 equally spaced pins</li>
              <li>• Numbered positions</li>
            </ul>
            <Link href='/templates/200-pins-template.pdf' download>
              <Button className='w-full' variant='outline'>
                <Download className='h-4 w-4 mr-2' />
                Download PDF
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='text-lg flex items-center justify-between'>
              300 Pins Template
              <Badge variant='destructive'>Advanced</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <p className='text-sm text-muted-foreground'>
              Maximum detail for professional work. 39cm diameter circle.
            </p>
            <ul className='text-sm space-y-1 text-muted-foreground'>
              <li>• A2 size (420 x 594mm)</li>
              <li>• 300 equally spaced pins</li>
              <li>• Numbered positions</li>
            </ul>
            <Link href='/templates/300-pins-template.pdf' download>
              <Button className='w-full' variant='outline'>
                <Download className='h-4 w-4 mr-2' />
                Download PDF
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
