// Server Component - Resources Page
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Palette, Users, Package } from 'lucide-react';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';
import {
  TemplatesSection,
  MaterialsSection,
  SoftwareSection,
  CommunitySection,
} from '@/features/resources/components';

export const metadata: Metadata = {
  title: 'Resources - Tools, Materials & Community',
  description:
    'Downloadable templates, material recommendations, software tools, and community links for string art enthusiasts. Everything you need to start creating.',
  alternates: {
    canonical: `${siteConfig.url}/resources`,
  },
  openGraph: {
    title: 'Resources - String Art Generator',
    description:
      'Templates, materials, tools, and community resources for string art',
    url: `${siteConfig.url}/resources`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ResourcesPage() {
  return (
    <div className='container mx-auto max-w-6xl px-4 py-8 md:py-12'>
      {/* Header */}
      <div className='mb-12 text-center'>
        <div className='inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4'>
          <Package className='h-4 w-4 text-primary' />
          <span className='text-sm font-medium'>Resources</span>
        </div>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-4'>
          Tools & Resources
        </h1>
        <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
          Everything you need to create stunning string art: downloadable
          templates, material guides, software recommendations, and community
          links.
        </p>
      </div>

      {/* Quick Links */}
      <div className='grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12'>
        <a href='#templates' className='block'>
          <Card className='hover:bg-accent transition-colors h-full'>
            <CardContent className='p-6 text-center'>
              <Download className='h-8 w-8 mx-auto mb-2 text-primary' />
              <p className='font-medium'>Templates</p>
            </CardContent>
          </Card>
        </a>
        <a href='#materials' className='block'>
          <Card className='hover:bg-accent transition-colors h-full'>
            <CardContent className='p-6 text-center'>
              <Package className='h-8 w-8 mx-auto mb-2 text-primary' />
              <p className='font-medium'>Materials</p>
            </CardContent>
          </Card>
        </a>
        <a href='#software' className='block'>
          <Card className='hover:bg-accent transition-colors h-full'>
            <CardContent className='p-6 text-center'>
              <Palette className='h-8 w-8 mx-auto mb-2 text-primary' />
              <p className='font-medium'>Software</p>
            </CardContent>
          </Card>
        </a>
        <a href='#community' className='block'>
          <Card className='hover:bg-accent transition-colors h-full'>
            <CardContent className='p-6 text-center'>
              <Users className='h-8 w-8 mx-auto mb-2 text-primary' />
              <p className='font-medium'>Community</p>
            </CardContent>
          </Card>
        </a>
      </div>

      <TemplatesSection />
      <MaterialsSection />
      <SoftwareSection />
      <CommunitySection />

      {/* CTA Card */}
      <Card className='bg-linear-to-br from-primary/10 to-primary/5 border-primary/20'>
        <CardContent className='p-8 text-center'>
          <h2 className='text-2xl font-bold mb-4'>
            Ready to Create Your First String Art?
          </h2>
          <p className='text-muted-foreground mb-6 max-w-2xl mx-auto'>
            You have everything you need. Start with our interactive editor,
            choose a simple image, and follow the generated instructions.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/editor'>
              <Button size='lg'>Start Creating</Button>
            </Link>
            <Link href='/gallery'>
              <Button size='lg' variant='outline'>
                View Examples
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
