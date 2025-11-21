// Server Component - Export Formats Tutorial
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Download,
  FileImage,
  FileCode,
  FileText,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Export Formats Explained - String Art Tutorials',
  description:
    'Understand SVG, PNG, and TXT export formats. Learn which format to use for physical builds, digital display, printing, or editing.',
  alternates: {
    canonical: `${siteConfig.url}/tutorials/export-formats`,
  },
  openGraph: {
    title: 'Export Formats Explained - String Art Generator',
    description: 'Choose the right export format for your string art project',
    url: `${siteConfig.url}/tutorials/export-formats`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ExportFormatsTutorial() {
  return (
    <div className='container mx-auto max-w-4xl px-4 py-8 md:py-12'>
      {/* Breadcrumb */}
      <nav className='mb-6 text-sm text-muted-foreground'>
        <Link href='/tutorials' className='hover:text-foreground'>
          Tutorials
        </Link>
        <span className='mx-2'>/</span>
        <span className='text-foreground'>Export Formats</span>
      </nav>

      {/* Header */}
      <div className='mb-8'>
        <div className='flex items-center gap-2 mb-4'>
          <Badge variant='outline'>Beginner</Badge>
          <Badge variant='secondary'>8 min read</Badge>
        </div>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-4'>
          Export Formats Explained
        </h1>
        <p className='text-lg text-muted-foreground'>
          Learn the differences between SVG, PNG, and TXT formats and when to
          use each for your string art projects.
        </p>
      </div>

      {/* Content */}
      <div className='prose prose-slate dark:prose-invert max-w-none'>
        {/* Introduction */}
        <section className='mb-8'>
          <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
            <Download className='h-6 w-6 text-primary' />
            Understanding Export Formats
          </h2>
          <p className='text-foreground/80 mb-4'>
            The String Art Generator offers three export formats, each designed
            for different use cases. Choosing the right format ensures you get
            the best results for your intended purpose.
          </p>
          <Card className='bg-blue-500/5 border-blue-500/30'>
            <CardContent className='p-4'>
              <p className='text-sm text-foreground/80'>
                <strong className='text-foreground'>Quick Guide:</strong> SVG
                for editing/printing, PNG for sharing online, TXT for physical
                builds.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* SVG Format */}
        <section className='mb-8'>
          <Card className='border-primary/50'>
            <CardContent className='p-6'>
              <div className='flex items-start justify-between mb-4'>
                <div>
                  <h2 className='text-2xl font-bold mb-1 flex items-center gap-2'>
                    <FileCode className='h-7 w-7 text-primary' />
                    SVG (Scalable Vector Graphics)
                  </h2>
                  <p className='text-sm text-muted-foreground'>
                    Vector format • Infinite scaling • Best quality
                  </p>
                </div>
                <Badge variant='default'>Recommended</Badge>
              </div>

              <div className='space-y-4'>
                <div>
                  <h3 className='font-semibold mb-2'>What it is:</h3>
                  <p className='text-sm text-foreground/80'>
                    SVG is a vector format that stores your string art as
                    mathematical paths rather than pixels. Each line is defined
                    by coordinates, making it perfectly scalable without quality
                    loss.
                  </p>
                </div>

                <div>
                  <h3 className='font-semibold mb-2'>Best for:</h3>
                  <div className='grid md:grid-cols-2 gap-2'>
                    <div className='flex items-start gap-2 text-sm'>
                      <CheckCircle className='h-4 w-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5' />
                      <span>Printing (any size)</span>
                    </div>
                    <div className='flex items-start gap-2 text-sm'>
                      <CheckCircle className='h-4 w-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5' />
                      <span>Editing in vector software</span>
                    </div>
                    <div className='flex items-start gap-2 text-sm'>
                      <CheckCircle className='h-4 w-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5' />
                      <span>Laser cutting/engraving</span>
                    </div>
                    <div className='flex items-start gap-2 text-sm'>
                      <CheckCircle className='h-4 w-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5' />
                      <span>Professional reproduction</span>
                    </div>
                    <div className='flex items-start gap-2 text-sm'>
                      <CheckCircle className='h-4 w-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5' />
                      <span>Web embedding</span>
                    </div>
                    <div className='flex items-start gap-2 text-sm'>
                      <CheckCircle className='h-4 w-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5' />
                      <span>Archive/preservation</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className='font-semibold mb-2'>Advantages:</h3>
                  <ul className='text-sm space-y-1 text-foreground/80 list-disc pl-5'>
                    <li>
                      <strong>Infinite scaling:</strong> Zoom to any size
                      without pixelation
                    </li>
                    <li>
                      <strong>Small file size:</strong> Usually 50-500 KB
                    </li>
                    <li>
                      <strong>Editable:</strong> Open in Illustrator, Inkscape,
                      Figma, etc.
                    </li>
                    <li>
                      <strong>Clean output:</strong> Crisp lines at any
                      resolution
                    </li>
                    <li>
                      <strong>Web-compatible:</strong> Modern browsers support
                      SVG natively
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className='font-semibold mb-2'>Compatible software:</h3>
                  <div className='flex flex-wrap gap-2'>
                    <Badge variant='outline'>Adobe Illustrator</Badge>
                    <Badge variant='outline'>Inkscape</Badge>
                    <Badge variant='outline'>Figma</Badge>
                    <Badge variant='outline'>Affinity Designer</Badge>
                    <Badge variant='outline'>CorelDRAW</Badge>
                    <Badge variant='outline'>Web Browsers</Badge>
                  </div>
                </div>

                <Card className='bg-green-500/10 border-green-500/30'>
                  <CardContent className='p-4'>
                    <p className='text-sm font-semibold text-green-700 dark:text-green-400 mb-1'>
                      💡 Pro Tip:
                    </p>
                    <p className='text-xs text-foreground/80'>
                      Always export SVG for archival. You can convert SVG to PNG
                      later, but not the reverse without quality loss.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* PNG Format */}
        <section className='mb-8'>
          <Card className='border-primary/50'>
            <CardContent className='p-6'>
              <div className='flex items-start justify-between mb-4'>
                <div>
                  <h2 className='text-2xl font-bold mb-1 flex items-center gap-2'>
                    <FileImage className='h-7 w-7 text-primary' />
                    PNG (Portable Network Graphics)
                  </h2>
                  <p className='text-sm text-muted-foreground'>
                    Raster format • Fixed resolution • Easy sharing
                  </p>
                </div>
                <Badge variant='secondary'>Popular</Badge>
              </div>

              <div className='space-y-4'>
                <div>
                  <h3 className='font-semibold mb-2'>What it is:</h3>
                  <p className='text-sm text-foreground/80'>
                    PNG is a raster (pixel-based) image format. The generator
                    exports at 2000x2000px by default with a transparent
                    background.
                  </p>
                </div>

                <div>
                  <h3 className='font-semibold mb-2'>Best for:</h3>
                  <div className='grid md:grid-cols-2 gap-2'>
                    <div className='flex items-start gap-2 text-sm'>
                      <CheckCircle className='h-4 w-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5' />
                      <span>Social media posts</span>
                    </div>
                    <div className='flex items-start gap-2 text-sm'>
                      <CheckCircle className='h-4 w-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5' />
                      <span>Email/messaging</span>
                    </div>
                    <div className='flex items-start gap-2 text-sm'>
                      <CheckCircle className='h-4 w-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5' />
                      <span>Quick previews</span>
                    </div>
                    <div className='flex items-start gap-2 text-sm'>
                      <CheckCircle className='h-4 w-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5' />
                      <span>Website thumbnails</span>
                    </div>
                    <div className='flex items-start gap-2 text-sm'>
                      <CheckCircle className='h-4 w-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5' />
                      <span>Digital wallpapers</span>
                    </div>
                    <div className='flex items-start gap-2 text-sm'>
                      <CheckCircle className='h-4 w-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5' />
                      <span>Presentations</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className='font-semibold mb-2'>Advantages:</h3>
                  <ul className='text-sm space-y-1 text-foreground/80 list-disc pl-5'>
                    <li>
                      <strong>Universal compatibility:</strong> Works everywhere
                    </li>
                    <li>
                      <strong>Transparent background:</strong> Easy to overlay
                    </li>
                    <li>
                      <strong>Ready to use:</strong> No conversion needed
                    </li>
                    <li>
                      <strong>High resolution:</strong> 2000x2000px is suitable
                      for most uses
                    </li>
                    <li>
                      <strong>Easy editing:</strong> Use any image editor
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className='font-semibold mb-2'>Limitations:</h3>
                  <div className='space-y-2'>
                    <div className='flex items-start gap-2 text-sm text-foreground/70'>
                      <XCircle className='h-4 w-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5' />
                      <span>
                        <strong>Fixed resolution:</strong> Can't scale up
                        without pixelation
                      </span>
                    </div>
                    <div className='flex items-start gap-2 text-sm text-foreground/70'>
                      <XCircle className='h-4 w-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5' />
                      <span>
                        <strong>Larger files:</strong> 500 KB - 3 MB typical
                      </span>
                    </div>
                    <div className='flex items-start gap-2 text-sm text-foreground/70'>
                      <XCircle className='h-4 w-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5' />
                      <span>
                        <strong>Not editable:</strong> Can't change individual
                        lines
                      </span>
                    </div>
                  </div>
                </div>

                <Card className='bg-blue-500/10 border-blue-500/30'>
                  <CardContent className='p-4'>
                    <p className='text-sm font-semibold text-blue-700 dark:text-blue-400 mb-1'>
                      📱 Best Practice:
                    </p>
                    <p className='text-xs text-foreground/80'>
                      For Instagram/Twitter: PNG works great. For printing
                      posters: use SVG and export to PNG at the desired size.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* TXT Format */}
        <section className='mb-8'>
          <Card className='border-primary/50'>
            <CardContent className='p-6'>
              <div className='flex items-start justify-between mb-4'>
                <div>
                  <h2 className='text-2xl font-bold mb-1 flex items-center gap-2'>
                    <FileText className='h-7 w-7 text-primary' />
                    TXT (String Instructions)
                  </h2>
                  <p className='text-sm text-muted-foreground'>
                    Pin-by-pin list • For physical builds • Human-readable
                  </p>
                </div>
                <Badge variant='outline'>Makers</Badge>
              </div>

              <div className='space-y-4'>
                <div>
                  <h3 className='font-semibold mb-2'>What it is:</h3>
                  <p className='text-sm text-foreground/80'>
                    A plain text file containing the sequence of pins to connect
                    in order. Each line represents one string connection.
                  </p>
                  <Card className='bg-muted/50 mt-2'>
                    <CardContent className='p-3'>
                      <code className='text-xs'>
                        <div>Pin 42 → Pin 187</div>
                        <div>Pin 187 → Pin 5</div>
                        <div>Pin 5 → Pin 293</div>
                        <div>Pin 293 → Pin 149</div>
                        <div className='text-muted-foreground'>...</div>
                      </code>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className='font-semibold mb-2'>Best for:</h3>
                  <div className='grid md:grid-cols-2 gap-2'>
                    <div className='flex items-start gap-2 text-sm'>
                      <CheckCircle className='h-4 w-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5' />
                      <span>Physical string art builds</span>
                    </div>
                    <div className='flex items-start gap-2 text-sm'>
                      <CheckCircle className='h-4 w-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5' />
                      <span>DIY maker projects</span>
                    </div>
                    <div className='flex items-start gap-2 text-sm'>
                      <CheckCircle className='h-4 w-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5' />
                      <span>Automated string machines</span>
                    </div>
                    <div className='flex items-start gap-2 text-sm'>
                      <CheckCircle className='h-4 w-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5' />
                      <span>Educational demonstrations</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className='font-semibold mb-2'>How to use:</h3>
                  <ol className='text-sm space-y-2 text-foreground/80 list-decimal pl-5'>
                    <li>Download the TXT file after generation</li>
                    <li>
                      Prepare your physical board with numbered pins (see{' '}
                      <Link
                        href='/tutorials/physical-build'
                        className='text-primary underline'>
                        Physical Build Guide
                      </Link>
                      )
                    </li>
                    <li>Start with your string at the first pin listed</li>
                    <li>
                      Follow the instructions line by line, connecting each pin
                      in order
                    </li>
                    <li>
                      Wrap string around each pin and move to the next without
                      cutting
                    </li>
                    <li>Continue until you reach the end of the file</li>
                  </ol>
                </div>

                <div>
                  <h3 className='font-semibold mb-2'>Advantages:</h3>
                  <ul className='text-sm space-y-1 text-foreground/80 list-disc pl-5'>
                    <li>
                      <strong>Step-by-step guide:</strong> No guessing where to
                      go next
                    </li>
                    <li>
                      <strong>Tiny file size:</strong> Usually under 100 KB
                    </li>
                    <li>
                      <strong>Platform independent:</strong> Open in any text
                      editor
                    </li>
                    <li>
                      <strong>Printable:</strong> Print and check off lines as
                      you work
                    </li>
                    <li>
                      <strong>Machine-readable:</strong> Can be used for
                      automation
                    </li>
                  </ul>
                </div>

                <Card className='bg-amber-500/10 border-amber-500/30'>
                  <CardContent className='p-4'>
                    <p className='text-sm font-semibold text-amber-700 dark:text-amber-400 mb-1'>
                      🛠️ Builder's Tip:
                    </p>
                    <p className='text-xs text-foreground/80'>
                      Print the TXT file and use a highlighter to mark your
                      progress. With 3000+ lines, it's easy to lose your place!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Comparison Table */}
        <section className='mb-8'>
          <h2 className='text-2xl font-bold mb-4'>Format Comparison</h2>
          <div className='overflow-x-auto'>
            <table className='w-full text-sm border-collapse'>
              <thead>
                <tr className='border-b-2 border-border'>
                  <th className='text-left p-3 font-semibold'>Feature</th>
                  <th className='text-left p-3 font-semibold'>SVG</th>
                  <th className='text-left p-3 font-semibold'>PNG</th>
                  <th className='text-left p-3 font-semibold'>TXT</th>
                </tr>
              </thead>
              <tbody className='text-foreground/80'>
                <tr className='border-b border-border'>
                  <td className='p-3'>File Size</td>
                  <td className='p-3'>50-500 KB</td>
                  <td className='p-3'>500 KB - 3 MB</td>
                  <td className='p-3'>&lt; 100 KB</td>
                </tr>
                <tr className='border-b border-border'>
                  <td className='p-3'>Scalability</td>
                  <td className='p-3 text-green-600 dark:text-green-400 font-semibold'>
                    Infinite
                  </td>
                  <td className='p-3 text-red-600 dark:text-red-400'>
                    Fixed 2000px
                  </td>
                  <td className='p-3 text-muted-foreground'>N/A</td>
                </tr>
                <tr className='border-b border-border'>
                  <td className='p-3'>Editable</td>
                  <td className='p-3 text-green-600 dark:text-green-400'>
                    Yes (vector)
                  </td>
                  <td className='p-3 text-amber-600 dark:text-amber-400'>
                    Limited (raster)
                  </td>
                  <td className='p-3 text-muted-foreground'>N/A</td>
                </tr>
                <tr className='border-b border-border'>
                  <td className='p-3'>Print Quality</td>
                  <td className='p-3 text-green-600 dark:text-green-400 font-semibold'>
                    Excellent
                  </td>
                  <td className='p-3 text-amber-600 dark:text-amber-400'>
                    Good (limited)
                  </td>
                  <td className='p-3 text-muted-foreground'>N/A</td>
                </tr>
                <tr className='border-b border-border'>
                  <td className='p-3'>Social Media</td>
                  <td className='p-3'>Good</td>
                  <td className='p-3 text-green-600 dark:text-green-400 font-semibold'>
                    Perfect
                  </td>
                  <td className='p-3 text-muted-foreground'>N/A</td>
                </tr>
                <tr className='border-b border-border'>
                  <td className='p-3'>Physical Build</td>
                  <td className='p-3 text-muted-foreground'>No</td>
                  <td className='p-3 text-muted-foreground'>No</td>
                  <td className='p-3 text-green-600 dark:text-green-400 font-semibold'>
                    Yes
                  </td>
                </tr>
                <tr className='border-b border-border'>
                  <td className='p-3'>Universal Support</td>
                  <td className='p-3'>Modern apps</td>
                  <td className='p-3 text-green-600 dark:text-green-400 font-semibold'>
                    Everywhere
                  </td>
                  <td className='p-3'>Text editors</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Decision Guide */}
        <section className='mb-8'>
          <h2 className='text-2xl font-bold mb-4'>
            Which Format Should I Use?
          </h2>

          <div className='space-y-3'>
            <Card className='border-l-4 border-l-green-500'>
              <CardContent className='p-4'>
                <p className='font-semibold mb-1'>
                  "I want to print this as a poster"
                </p>
                <p className='text-sm text-foreground/80'>
                  → <strong>SVG</strong> - Scales to any size without quality
                  loss
                </p>
              </CardContent>
            </Card>

            <Card className='border-l-4 border-l-blue-500'>
              <CardContent className='p-4'>
                <p className='font-semibold mb-1'>
                  "I want to share on Instagram/Twitter"
                </p>
                <p className='text-sm text-foreground/80'>
                  → <strong>PNG</strong> - Perfect for social media (2000px is
                  ideal)
                </p>
              </CardContent>
            </Card>

            <Card className='border-l-4 border-l-purple-500'>
              <CardContent className='p-4'>
                <p className='font-semibold mb-1'>
                  "I want to build this with real string and nails"
                </p>
                <p className='text-sm text-foreground/80'>
                  → <strong>TXT</strong> - Step-by-step pin connection
                  instructions
                </p>
              </CardContent>
            </Card>

            <Card className='border-l-4 border-l-amber-500'>
              <CardContent className='p-4'>
                <p className='font-semibold mb-1'>
                  "I want to edit this in Illustrator/Figma"
                </p>
                <p className='text-sm text-foreground/80'>
                  → <strong>SVG</strong> - Fully editable vector paths
                </p>
              </CardContent>
            </Card>

            <Card className='border-l-4 border-l-pink-500'>
              <CardContent className='p-4'>
                <p className='font-semibold mb-1'>
                  "I want a desktop wallpaper"
                </p>
                <p className='text-sm text-foreground/80'>
                  → <strong>PNG</strong> - Ready to use, transparent background
                </p>
              </CardContent>
            </Card>

            <Card className='border-l-4 border-l-cyan-500'>
              <CardContent className='p-4'>
                <p className='font-semibold mb-1'>
                  "I'm not sure yet, just archiving"
                </p>
                <p className='text-sm text-foreground/80'>
                  → <strong>Export all three</strong> - Keep your options open!
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Best Practices */}
        <section className='mb-8'>
          <h2 className='text-2xl font-bold mb-4'>Export Best Practices</h2>

          <div className='space-y-3'>
            <Card className='bg-muted/30'>
              <CardContent className='p-4'>
                <p className='font-semibold text-sm mb-1'>
                  ✓ Always export SVG first
                </p>
                <p className='text-xs text-foreground/70'>
                  It's your master file. You can always convert to PNG later,
                  but not the reverse.
                </p>
              </CardContent>
            </Card>

            <Card className='bg-muted/30'>
              <CardContent className='p-4'>
                <p className='font-semibold text-sm mb-1'>
                  ✓ Use descriptive filenames
                </p>
                <p className='text-xs text-foreground/70'>
                  Include parameters: `portrait-300pins-4000lines.svg` helps you
                  remember settings.
                </p>
              </CardContent>
            </Card>

            <Card className='bg-muted/30'>
              <CardContent className='p-4'>
                <p className='font-semibold text-sm mb-1'>
                  ✓ Test TXT before physical build
                </p>
                <p className='text-xs text-foreground/70'>
                  Open the file and verify it's readable. Check the total line
                  count to estimate time.
                </p>
              </CardContent>
            </Card>

            <Card className='bg-muted/30'>
              <CardContent className='p-4'>
                <p className='font-semibold text-sm mb-1'>
                  ✓ Organize your exports
                </p>
                <p className='text-xs text-foreground/70'>
                  Create folders by project. Keep SVG + settings together for
                  future regeneration.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className='mt-12 flex flex-col sm:flex-row gap-4 justify-between'>
        <Link href='/tutorials/parameters'>
          <Button variant='outline'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Previous: Parameters
          </Button>
        </Link>
        <Link href='/tutorials'>
          <Button variant='outline'>Back to Tutorials</Button>
        </Link>
      </div>

      {/* CTA */}
      <Card className='mt-8 bg-primary/5'>
        <CardContent className='p-6 text-center'>
          <Sparkles className='h-10 w-10 mx-auto text-primary mb-3' />
          <h3 className='font-bold text-lg mb-2'>
            Ready to Generate and Export?
          </h3>
          <p className='text-sm text-muted-foreground mb-4'>
            Create your string art and download in all three formats
          </p>
          <div className='flex flex-wrap justify-center gap-3'>
            <Link href='/gallery'>
              <Button variant='outline'>View Gallery</Button>
            </Link>
            <Link href='/faq'>
              <Button variant='outline'>Read FAQ</Button>
            </Link>
            <Link href='/editor'>
              <Button>Start Creating</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
