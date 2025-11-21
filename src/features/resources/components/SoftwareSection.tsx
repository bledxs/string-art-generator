import { Palette, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function SoftwareSection() {
  return (
    <section id='software' className='mb-16 scroll-mt-20'>
      <h2 className='text-2xl font-bold mb-6 flex items-center gap-2'>
        <Palette className='h-6 w-6 text-primary' />
        Software & Tools
      </h2>
      <div className='grid md:grid-cols-2 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle>Image Editing Software</CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='flex items-start gap-3 p-3 bg-muted/50 rounded-lg'>
              <div className='flex-1'>
                <h4 className='font-semibold text-sm'>GIMP (Free)</h4>
                <p className='text-xs text-muted-foreground'>
                  Open-source alternative to Photoshop. Perfect for contrast
                  adjustments.
                </p>
                <a
                  href='https://www.gimp.org'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-xs text-primary hover:underline inline-flex items-center gap-1 mt-1'>
                  gimp.org
                  <ExternalLink className='h-3 w-3' />
                </a>
              </div>
            </div>
            <div className='flex items-start gap-3 p-3 bg-muted/50 rounded-lg'>
              <div className='flex-1'>
                <h4 className='font-semibold text-sm'>Photoshop (Paid)</h4>
                <p className='text-xs text-muted-foreground'>
                  Industry standard for professional image editing and
                  preprocessing.
                </p>
                <a
                  href='https://www.adobe.com/products/photoshop.html'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-xs text-primary hover:underline inline-flex items-center gap-1 mt-1'>
                  adobe.com
                  <ExternalLink className='h-3 w-3' />
                </a>
              </div>
            </div>
            <div className='flex items-start gap-3 p-3 bg-muted/50 rounded-lg'>
              <div className='flex-1'>
                <h4 className='font-semibold text-sm'>
                  Photopea (Free Online)
                </h4>
                <p className='text-xs text-muted-foreground'>
                  Browser-based Photoshop alternative. No installation needed.
                </p>
                <a
                  href='https://www.photopea.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-xs text-primary hover:underline inline-flex items-center gap-1 mt-1'>
                  photopea.com
                  <ExternalLink className='h-3 w-3' />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vector & Design Tools</CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='flex items-start gap-3 p-3 bg-muted/50 rounded-lg'>
              <div className='flex-1'>
                <h4 className='font-semibold text-sm'>Inkscape (Free)</h4>
                <p className='text-xs text-muted-foreground'>
                  Open-source vector editor. Great for editing exported SVG
                  files.
                </p>
                <a
                  href='https://inkscape.org'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-xs text-primary hover:underline inline-flex items-center gap-1 mt-1'>
                  inkscape.org
                  <ExternalLink className='h-3 w-3' />
                </a>
              </div>
            </div>
            <div className='flex items-start gap-3 p-3 bg-muted/50 rounded-lg'>
              <div className='flex-1'>
                <h4 className='font-semibold text-sm'>Illustrator (Paid)</h4>
                <p className='text-xs text-muted-foreground'>
                  Professional vector graphics software for SVG editing and
                  refinement.
                </p>
                <a
                  href='https://www.adobe.com/products/illustrator.html'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-xs text-primary hover:underline inline-flex items-center gap-1 mt-1'>
                  adobe.com
                  <ExternalLink className='h-3 w-3' />
                </a>
              </div>
            </div>
            <div className='flex items-start gap-3 p-3 bg-muted/50 rounded-lg'>
              <div className='flex-1'>
                <h4 className='font-semibold text-sm'>Figma (Freemium)</h4>
                <p className='text-xs text-muted-foreground'>
                  Browser-based design tool. Good for mockups and SVG editing.
                </p>
                <a
                  href='https://www.figma.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-xs text-primary hover:underline inline-flex items-center gap-1 mt-1'>
                  figma.com
                  <ExternalLink className='h-3 w-3' />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
