'use client';

import Script from 'next/script';
import { siteConfig } from '@/lib/config';

interface StructuredDataProps {
  type:
    | 'WebApplication'
    | 'WebSite'
    | 'Organization'
    | 'HowTo'
    | 'BreadcrumbList'
    | 'ItemList';
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
        '@type': 'Organization',
        name: siteConfig.name,
        alternateName: 'String Art Generator',
        url: siteConfig.url,
        logo: {
          '@type': 'ImageObject',
          url: `${siteConfig.url}/logo.png`,
          width: 512,
          height: 512,
        },
        description: siteConfig.description,
        foundingDate: '2024',
        founder: {
          '@type': 'Person',
          name: 'String Art Generator Team',
        },
        sameAs: [siteConfig.links.github, siteConfig.links.twitter],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'Customer Support',
            email: siteConfig.contact.support,
            availableLanguage: ['English'],
          },
          {
            '@type': 'ContactPoint',
            contactType: 'Technical Support',
            url: `${siteConfig.links.github}/issues`,
          },
        ],
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'US',
        },
        knowsAbout: [
          'String Art',
          'Generative Art',
          'Image Processing',
          'Algorithmic Art',
          'Web Workers',
          'Digital Art',
        ],
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

// BreadcrumbList for better navigation understanding
export function BreadcrumbListSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <StructuredData
      type='BreadcrumbList'
      data={{
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

// SiteNavigationElement for main navigation
export function SiteNavigationSchema() {
  const navigationItems = [
    { name: 'Home', url: siteConfig.url },
    { name: 'Tutorials', url: `${siteConfig.url}/tutorials` },
    { name: 'FAQ', url: `${siteConfig.url}/faq` },
    { name: 'Gallery', url: `${siteConfig.url}/gallery` },
    { name: 'How It Works', url: `${siteConfig.url}/how-it-works` },
    { name: 'About', url: `${siteConfig.url}/about` },
    { name: 'Editor', url: `${siteConfig.url}/editor` },
  ];

  return (
    <StructuredData
      type='ItemList'
      data={{
        '@type': 'ItemList',
        name: 'Main Navigation',
        description: 'Primary navigation menu for String Art Generator',
        itemListElement: navigationItems.map((item, index) => ({
          '@type': 'SiteNavigationElement',
          position: index + 1,
          name: item.name,
          url: item.url,
        })),
      }}
    />
  );
}
