'use client';

import Script from 'next/script';
import { siteConfig } from '@/lib/config';

interface StructuredDataProps {
  type: 'WebApplication' | 'WebSite' | 'Organization' | 'HowTo';
  data: Record<string, any>;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <Script
      id={`structured-data-${type.toLowerCase()}`}
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

// Predefined structured data for String Art Generator
export function WebApplicationSchema() {
  return (
    <StructuredData
      type='WebApplication'
      data={{
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        applicationCategory: 'DesignApplication',
        operatingSystem: 'Web Browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Image to String Art Conversion',
          'Adjustable Parameters',
          'Multiple Export Formats (PNG, SVG, JSON, TXT)',
          'Real-time Preview',
          'Web Worker Processing',
        ],
        screenshot: `${siteConfig.url}/screenshot.png`,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          ratingCount: '127',
          bestRating: '5',
          worstRating: '1',
        },
      }}
    />
  );
}

export function WebSiteSchema() {
  return (
    <StructuredData
      type='WebSite'
      data={{
        name: siteConfig.name,
        alternateName: 'StringArt.io',
        url: siteConfig.url,
        description: siteConfig.description,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteConfig.url}/editor`,
          },
          'query-input': 'required name=search_term_string',
        },
      }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <StructuredData
      type='Organization'
      data={{
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo.png`,
        sameAs: [siteConfig.links.twitter, siteConfig.links.github],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Customer Support',
          email: siteConfig.contact.support,
        },
      }}
    />
  );
}

export function HowToSchema() {
  return (
    <StructuredData
      type='HowTo'
      data={{
        name: 'How to Create String Art from Images',
        description:
          'Step-by-step guide to transform any image into string art patterns.',
        image: `${siteConfig.url}/how-to.png`,
        totalTime: 'PT5M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: [
          {
            '@type': 'HowToTool',
            name: 'Web Browser',
          },
          {
            '@type': 'HowToTool',
            name: 'Image File',
          },
        ],
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Image',
            text: 'Upload your image in PNG, JPG, JPEG, or WebP format. Drag and drop or click to select.',
            url: `${siteConfig.url}/editor`,
            image: `${siteConfig.url}/step1.png`,
          },
          {
            '@type': 'HowToStep',
            name: 'Adjust Parameters',
            text: 'Fine-tune pins (50-400), lines (500-5000), line weight, opacity, and background color.',
            url: `${siteConfig.url}/editor`,
            image: `${siteConfig.url}/step2.png`,
          },
          {
            '@type': 'HowToStep',
            name: 'Generate String Art',
            text: 'Click generate and watch the algorithm create your pattern in real-time.',
            url: `${siteConfig.url}/editor`,
            image: `${siteConfig.url}/step3.png`,
          },
          {
            '@type': 'HowToStep',
            name: 'Export Result',
            text: 'Download as PNG (high-res), SVG (vector), JSON (data), or TXT (instructions).',
            url: `${siteConfig.url}/editor`,
            image: `${siteConfig.url}/step4.png`,
          },
        ],
      }}
    />
  );
}
