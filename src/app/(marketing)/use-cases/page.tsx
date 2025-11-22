// Server Component - Use Cases Page
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';
import { UseCasesClient } from '@/features/use-cases/components/UseCasesClient';

export const metadata: Metadata = {
  title: 'Use Cases - String Art Generator',
  description:
    'Discover how artists, educators, makers, businesses, and event planners use String Art Generator for stunning visual creations.',
  alternates: {
    canonical: `${siteConfig.url}/use-cases`,
  },
  openGraph: {
    title: 'Use Cases - String Art Generator',
    description:
      'Real-world applications of string art. From professional portfolios to educational projects and personalized gifts.',
    url: `${siteConfig.url}/use-cases`,
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface UseCasesPageProps {
  searchParams: Promise<{
    tab?: string;
  }>;
}

export default async function UseCasesPage({
  searchParams,
}: UseCasesPageProps) {
  const { tab } = await searchParams;

  return (
    <div className='container mx-auto px-4 py-12 max-w-6xl'>
      {/* Header */}
      <div className='text-center mb-12'>
        <h1 className='text-4xl md:text-5xl font-bold mb-4'>
          Use Cases & Applications
        </h1>
        <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
          Explore how different communities leverage String Art Generator to
          create meaningful, beautiful, and impactful visual art.
        </p>
      </div>

      {/* Client Component with Tabs */}
      <UseCasesClient defaultTab={tab || 'artists'} />
    </div>
  );
}
