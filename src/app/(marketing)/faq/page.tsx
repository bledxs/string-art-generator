// Server Component - FAQ Page (English)
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  HelpCircle,
  Sparkles,
  BookOpen,
  Settings,
  Download,
  Wrench,
} from 'lucide-react';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ)',
  description:
    'Find answers to common questions about String Art Generator, including usage, parameters, export formats, and physical construction.',
  alternates: {
    canonical: `${siteConfig.url}/faq`,
  },
  openGraph: {
    title: 'FAQ - String Art Generator',
    description: 'Common questions about creating string art patterns',
    url: `${siteConfig.url}/faq`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Structured Data for FAQPage
const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is string art?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'String art is a decorative art technique that creates visual patterns by connecting threads or strings between nails placed on a board. Our generator automates the design process using mathematical algorithms to transform any image into a string art pattern.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is String Art Generator free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, String Art Generator is completely free. It requires no registration, has no hidden fees, and has no limits on the number of designs you can create. It is an open source project available to everyone.',
      },
    },
  ],
};

export default function FAQPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <div className='container mx-auto max-w-4xl px-4 py-8 md:py-12'>
        {/* Header */}
        <div className='mb-8 md:mb-12 text-center'>
          <div className='inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4'>
            <HelpCircle className='h-4 w-4 text-primary' />
            <span className='text-sm font-medium'>FAQ</span>
          </div>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-4'>
            Frequently Asked Questions
          </h1>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Find quick answers to common questions about String Art Generator
          </p>
        </div>

        {/* Quick Navigation */}
        <Card className='mb-8 bg-muted/30'>
          <CardContent className='p-6'>
            <h2 className='font-bold mb-4 flex items-center gap-2'>
              <BookOpen className='h-5 w-5 text-primary' />
              Categories
            </h2>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-3 text-sm'>
              <a href='#general' className='text-primary hover:underline'>
                → General
              </a>
              <a href='#usage' className='text-primary hover:underline'>
                → Usage
              </a>
              <a href='#parameters' className='text-primary hover:underline'>
                → Parameters
              </a>
              <a href='#export' className='text-primary hover:underline'>
                → Export
              </a>
              <a href='#physical' className='text-primary hover:underline'>
                → Physical Build
              </a>
              <a
                href='#troubleshooting'
                className='text-primary hover:underline'>
                → Troubleshooting
              </a>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Sections */}
        <div className='space-y-8'>
          {/* General Questions */}
          <section id='general' className='scroll-mt-20'>
            <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
              <Sparkles className='h-6 w-6 text-primary' />
              General
            </h2>
            <Accordion type='single' collapsible className='space-y-2'>
              <AccordionItem value='q1'>
                <AccordionTrigger className='text-left'>
                  What is string art?
                </AccordionTrigger>
                <AccordionContent className='text-foreground/80'>
                  String art is a decorative art technique that creates visual
                  patterns by connecting threads or strings between nails placed
                  on a board. Our generator automates the design process using
                  mathematical algorithms to transform any image into a string
                  art pattern that you can create physically or use as digital
                  art.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='q2'>
                <AccordionTrigger className='text-left'>
                  Is String Art Generator free to use?
                </AccordionTrigger>
                <AccordionContent className='text-foreground/80'>
                  Yes, String Art Generator is completely free. It requires no
                  registration, has no hidden fees, and has no limits on the
                  number of designs you can create. It's an open source project
                  available to everyone.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='q3'>
                <AccordionTrigger className='text-left'>
                  Do I need to create an account?
                </AccordionTrigger>
                <AccordionContent className='text-foreground/80'>
                  No. String Art Generator works entirely in your browser
                  without requiring registration. Your projects are saved
                  locally on your device using LocalStorage, which means your
                  images never leave your browser.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='q4'>
                <AccordionTrigger className='text-left'>
                  Are my images private?
                </AccordionTrigger>
                <AccordionContent className='text-foreground/80'>
                  Absolutely. All processing is done locally in your browser
                  using Web Workers. Your images are never uploaded to our
                  servers or shared with third parties. You have complete
                  control over your content.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Usage Questions */}
          <section id='usage' className='scroll-mt-20'>
            <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
              <HelpCircle className='h-6 w-6 text-primary' />
              Usage
            </h2>
            <Accordion type='single' collapsible className='space-y-2'>
              <AccordionItem value='q5'>
                <AccordionTrigger className='text-left'>
                  What image formats are supported?
                </AccordionTrigger>
                <AccordionContent className='text-foreground/80'>
                  We support the most common formats: PNG, JPG, JPEG, and WebP.
                  For best results, use high-resolution images with good
                  contrast.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='q6'>
                <AccordionTrigger className='text-left'>
                  What is the maximum image size?
                </AccordionTrigger>
                <AccordionContent className='text-foreground/80'>
                  The limit depends on your browser's memory, but generally you
                  can load images up to 10-15 MB. If your image is very large,
                  consider resizing it to 2000x2000 pixels for faster processing
                  without loss of quality in the final result.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='q7'>
                <AccordionTrigger className='text-left'>
                  What types of images work best?
                </AccordionTrigger>
                <AccordionContent className='text-foreground/80'>
                  Images with <strong>high contrast</strong> work best:
                  portraits, silhouettes, logos, and simple graphic designs.
                  Avoid images with many fine details or subtle gradients, as
                  string art works better with strong contrasts between light
                  and dark areas.
                  <br />
                  <br />
                  Check our{' '}
                  <Link
                    href='/tutorials/image-selection'
                    className='text-primary underline'>
                    Image Selection Guide
                  </Link>{' '}
                  for detailed tips.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='q8'>
                <AccordionTrigger className='text-left'>
                  Can I save my projects?
                </AccordionTrigger>
                <AccordionContent className='text-foreground/80'>
                  Yes! Your projects are automatically saved in your browser's
                  LocalStorage. You can return to the editor and your last
                  configuration will be loaded. To permanently save a design,
                  export it in SVG, PNG, or TXT format.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Parameters Questions */}
          <section id='parameters' className='scroll-mt-20'>
            <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
              <Settings className='h-6 w-6 text-primary' />
              Parameters
            </h2>
            <Accordion type='single' collapsible className='space-y-2'>
              <AccordionItem value='q9'>
                <AccordionTrigger className='text-left'>
                  What do the "pins" mean?
                </AccordionTrigger>
                <AccordionContent className='text-foreground/80'>
                  Pins are the anchor points around the circle where strings can
                  connect. More pins (250-500) allow for finer details, while
                  fewer pins (50-150) create a more geometric, abstract look.
                  <br />
                  <br />
                  <strong>Recommended:</strong> 200-300 pins for most images.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='q10'>
                <AccordionTrigger className='text-left'>
                  How many lines should I use?
                </AccordionTrigger>
                <AccordionContent className='text-foreground/80'>
                  More lines create darker areas and more details but take
                  longer to generate:
                  <br />
                  <br />
                  <ul className='list-disc pl-5 space-y-1'>
                    <li>
                      <strong>1000-2000 lines:</strong> Quick preview
                    </li>
                    <li>
                      <strong>3000-4000 lines:</strong> Standard quality
                    </li>
                    <li>
                      <strong>5000-7000 lines:</strong> High quality
                    </li>
                    <li>
                      <strong>8000-10000 lines:</strong> Maximum detail
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='q11'>
                <AccordionTrigger className='text-left'>
                  How does line weight affect the result?
                </AccordionTrigger>
                <AccordionContent className='text-foreground/80'>
                  Line weight (0.1-5.0) controls the thickness of each string.
                  Thicker lines (1.5-3.0) create bold, high-contrast results,
                  while thinner lines (0.3-0.8) produce delicate, etching-like
                  details.
                  <br />
                  <br />
                  <strong>Tip:</strong> Use 0.5-1.0 for realistic string
                  thickness if building physically.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='q12'>
                <AccordionTrigger className='text-left'>
                  Why is my generation slow?
                </AccordionTrigger>
                <AccordionContent className='text-foreground/80'>
                  Generation time depends on parameters:
                  <br />
                  <br />
                  <ul className='list-disc pl-5 space-y-1'>
                    <li>
                      <strong>Pins:</strong> Have quadratic impact. 500 pins =
                      4x slower than 250 pins.
                    </li>
                    <li>
                      <strong>Lines:</strong> Have linear impact. 6000 lines =
                      2x slower than 3000 lines.
                    </li>
                  </ul>
                  <br />
                  <strong>Solution:</strong> Start with lower values (150 pins,
                  2000 lines) for testing, then increase for final output.
                  <br />
                  <br />
                  See our{' '}
                  <Link
                    href='/tutorials/parameters'
                    className='text-primary underline'>
                    Parameter Optimization Guide
                  </Link>{' '}
                  for detailed tips.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Export Questions */}
          <section id='export' className='scroll-mt-20'>
            <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
              <Download className='h-6 w-6 text-primary' />
              Export
            </h2>
            <Accordion type='single' collapsible className='space-y-2'>
              <AccordionItem value='q13'>
                <AccordionTrigger className='text-left'>
                  Which format should I choose?
                </AccordionTrigger>
                <AccordionContent className='text-foreground/80'>
                  <ul className='list-disc pl-5 space-y-2'>
                    <li>
                      <strong>SVG:</strong> Best for printing, editing (Illustrator/Inkscape),
                      and laser cutting. Scales infinitely without quality loss.
                    </li>
                    <li>
                      <strong>PNG:</strong> Best for social media, wallpapers,
                      and quick sharing. Fixed at 2000x2000px with transparent
                      background.
                    </li>
                    <li>
                      <strong>TXT:</strong> For physical builds. Contains
                      step-by-step pin connection instructions.
                    </li>
                  </ul>
                  <br />
                  Learn more in our{' '}
                  <Link
                    href='/tutorials/export-formats'
                    className='text-primary underline'>
                    Export Formats Guide
                  </Link>
                  .
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='q14'>
                <AccordionTrigger className='text-left'>
                  Can I use the SVG in Adobe Illustrator?
                </AccordionTrigger>
                <AccordionContent className='text-foreground/80'>
                  Yes, the SVG file is compatible with Illustrator, Inkscape,
                  and other vector editing software. You can edit individual
                  lines, change colors, or adjust the design.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='q15'>
                <AccordionTrigger className='text-left'>
                  What is the TXT file for?
                </AccordionTrigger>
                <AccordionContent className='text-foreground/80'>
                  The TXT file contains step-by-step instructions for building
                  the string art physically. Each line shows which pin to
                  connect next (e.g., "Pin 42 → Pin 187"). Follow the
                  instructions in order, wrapping string around each pin without
                  cutting.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='q16'>
                <AccordionTrigger className='text-left'>
                  Can I print the result?
                </AccordionTrigger>
                <AccordionContent className='text-foreground/80'>
                  Absolutely! Export as SVG for the best print quality since it
                  scales to any size. You can print posters, canvas prints, or
                  use it for commercial products (see our{' '}
                  <Link href='/terms' className='text-primary underline'>
                    Terms of Service
                  </Link>
                  ).
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Physical Build Questions */}
          <section id='physical' className='scroll-mt-20'>
            <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
              <Wrench className='h-6 w-6 text-primary' />
              Physical Build
            </h2>
            <Accordion type='single' collapsible className='space-y-2'>
              <AccordionItem value='q17'>
                <AccordionTrigger className='text-left'>
                  What materials do I need?
                </AccordionTrigger>
                <AccordionContent className='text-foreground/80'>
                  <ul className='list-disc pl-5 space-y-1'>
                    <li>
                      <strong>Board:</strong> Plywood, MDF, or corkboard (60-100
                      cm diameter recommended)
                    </li>
                    <li>
                      <strong>Nails:</strong> Small finishing nails or panel
                      pins (1-2 cm length)
                    </li>
                    <li>
                      <strong>String:</strong> Sewing thread, embroidery floss,
                      or nylon string (black or colored)
                    </li>
                    <li>
                      <strong>Tools:</strong> Hammer, ruler, protractor, pencil,
                      and the TXT export file
                    </li>
                  </ul>
                  <br />
                  See our complete{' '}
                  <Link
                    href='/tutorials/physical-build'
                    className='text-primary underline'>
                    Physical Build Guide
                  </Link>
                  .
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='q18'>
                <AccordionTrigger className='text-left'>
                  How do I translate the design to physical?
                </AccordionTrigger>
                <AccordionContent className='text-foreground/80'>
                  <ol className='list-decimal pl-5 space-y-2'>
                    <li>
                      Mark the circle on your board (use a compass or string
                      method)
                    </li>
                    <li>
                      Divide the circle into equal segments (number of pins)
                    </li>
                    <li>Number each position clockwise from the top</li>
                    <li>Hammer a nail at each marked position</li>
                    <li>
                      Follow the TXT file instructions, connecting pins in order
                    </li>
                  </ol>
                  <br />
                  <strong>Tip:</strong> Use 200-300 pins for manageable builds.
                  500 pins is extremely tedious!
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='q19'>
                <AccordionTrigger className='text-left'>
                  Where can I buy materials?
                </AccordionTrigger>
                <AccordionContent className='text-foreground/80'>
                  Materials are available at most craft stores or online:
                  <br />
                  <br />
                  <ul className='list-disc pl-5 space-y-1'>
                    <li>
                      <strong>Boards:</strong> Hardware stores (Home Depot,
                      Lowe's) or craft stores (Michaels, Hobby Lobby)
                    </li>
                    <li>
                      <strong>Nails:</strong> Hardware stores or Amazon
                    </li>
                    <li>
                      <strong>String:</strong> Craft stores, fabric stores, or
                      Amazon
                    </li>
                  </ul>
                  <br />
                  Budget: $15-30 USD for a complete project.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Troubleshooting Questions */}
          <section id='troubleshooting' className='scroll-mt-20'>
            <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
              <HelpCircle className='h-6 w-6 text-primary' />
              Troubleshooting
            </h2>
            <Accordion type='single' collapsible className='space-y-2'>
              <AccordionItem value='q20'>
                <AccordionTrigger className='text-left'>
                  My image looks blurry or unclear
                </AccordionTrigger>
                <AccordionContent className='text-foreground/80'>
                  <strong>Possible causes:</strong>
                  <br />
                  <ul className='list-disc pl-5 space-y-1 mt-2'>
                    <li>Low contrast in the original image</li>
                    <li>Too few pins (try 250-350 instead of 150)</li>
                    <li>Too few lines (try 4000-6000 instead of 2000)</li>
                  </ul>
                  <br />
                  <strong>Solutions:</strong>
                  <br />
                  <ul className='list-disc pl-5 space-y-1 mt-2'>
                    <li>
                      Pre-process your image to increase contrast before
                      uploading
                    </li>
                    <li>Increase the number of pins and lines</li>
                    <li>
                      Try converting your image to black & white with high
                      contrast
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='q21'>
                <AccordionTrigger className='text-left'>
                  The result is too light or too dark
                </AccordionTrigger>
                <AccordionContent className='text-foreground/80'>
                  <strong>Too light:</strong> Increase the number of lines or
                  increase opacity (try 0.7-0.9).
                  <br />
                  <br />
                  <strong>Too dark:</strong> Decrease opacity (try 0.3-0.5) or
                  reduce the number of lines.
                  <br />
                  <br />
                  <strong>Tip:</strong> If using 6000+ lines, lower opacity to
                  0.3-0.4 to prevent over-darkening.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='q22'>
                <AccordionTrigger className='text-left'>
                  Generation stops or crashes
                </AccordionTrigger>
                <AccordionContent className='text-foreground/80'>
                  This usually happens with very high parameters that exceed
                  your device's memory:
                  <br />
                  <br />
                  <strong>Solutions:</strong>
                  <br />
                  <ul className='list-disc pl-5 space-y-1 mt-2'>
                    <li>Reduce pins to 300 or less</li>
                    <li>Reduce lines to 6000 or less</li>
                    <li>Close other browser tabs to free memory</li>
                    <li>Try a different browser (Chrome handles it best)</li>
                    <li>Resize your image to 2000x2000px or smaller</li>
                  </ul>
                  <br />
                  If problems persist, please{' '}
                  <Link
                    href='https://github.com/bledxs/string-art-generator/issues'
                    className='text-primary underline'
                    target='_blank'
                    rel='noopener noreferrer'>
                    report the issue on GitHub
                  </Link>
                  .
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>

        {/* CTA Section */}
        <Card className='mt-12 bg-primary/5'>
          <CardContent className='p-6 md:p-8'>
            <div className='text-center'>
              <h2 className='text-xl font-bold mb-2'>Still have questions?</h2>
              <p className='text-sm text-muted-foreground mb-6'>
                Check our tutorials for detailed guides or contact us
              </p>
              <div className='flex flex-wrap justify-center gap-3'>
                <Link href='/tutorials'>
                  <button className='px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium'>
                    View Tutorials
                  </button>
                </Link>
                <Link href='/gallery'>
                  <button className='px-4 py-2 border border-border bg-background rounded-md hover:bg-muted transition-colors text-sm font-medium'>
                    See Examples
                  </button>
                </Link>
                <Link
                  href='https://github.com/bledxs/string-art-generator/issues'
                  target='_blank'
                  rel='noopener noreferrer'>
                  <button className='px-4 py-2 border border-border bg-background rounded-md hover:bg-muted transition-colors text-sm font-medium'>
                    Report Issue
                  </button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
