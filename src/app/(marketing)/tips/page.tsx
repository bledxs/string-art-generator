// Server Component - Tips & Best Practices Page
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';
import {
  ImageSelectionTips,
  ParameterOptimization,
  CommonMistakes,
  PerformanceTips,
  PhysicalBuildTips,
} from '@/features/tips/components';

export const metadata: Metadata = {
  title: 'Tips & Best Practices - String Art Generator',
  description:
    'Expert tips for creating stunning string art. Learn image selection, parameter optimization, common mistakes to avoid, and performance best practices.',
  alternates: {
    canonical: `${siteConfig.url}/tips`,
  },
  openGraph: {
    title: 'Tips & Best Practices - String Art Generator',
    description:
      'Expert tips for creating stunning string art. Image selection, parameter optimization, and best practices.',
    url: `${siteConfig.url}/tips`,
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TipsPage() {
  return (
    <div className='container mx-auto px-4 py-12 max-w-6xl'>
      {/* Header */}
      <div className='text-center mb-12'>
        <h1 className='text-4xl md:text-5xl font-bold mb-4'>
          Tips & Best Practices
        </h1>
        <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
          Master string art creation with expert guidance on image selection,
          parameter tuning, and avoiding common pitfalls.
        </p>
      </div>

      {/* Sections */}
      <div className='space-y-16'>
        <ImageSelectionTips />
        <ParameterOptimization />
        <CommonMistakes />
        <PerformanceTips />
        <PhysicalBuildTips />
      </div>
    </div>
  );
}
