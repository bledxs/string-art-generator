/**
 * Site configuration using environment variables
 * All URLs and site-specific values should come from here
 */

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'String Art Generator',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'Transform images into beautiful string art patterns with our free online generator',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.stringartgenerator.app',
  ogImage: `${
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.stringartgenerator.app'
  }/og-image.png`,
  twitterImage: `${
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.stringartgenerator.app'
  }/twitter-image.png`,
  ogSquare: `${
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.stringartgenerator.app'
  }/og-square.png`,
  links: {
    twitter: 'https://twitter.com/stringartgen',
    github: 'https://github.com/stringart',
  },
  contact: {
    support:
      process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@stringartgenerator.app',
  },
  social: {
    twitterHandle: process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@stringartgen',
  },
} as const;

export type SiteConfig = typeof siteConfig;
