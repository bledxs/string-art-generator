/**
 * Global TypeScript types shared across features
 */

// Common UI Props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Image related types (shared between features)
export interface ImageDimensions {
  width: number;
  height: number;
}

export interface ImageFile {
  file: File;
  url: string;
  dimensions: ImageDimensions;
}

// Export formats (could be used by other features in the future)
export type ExportFormat = 'png' | 'svg' | 'json' | 'txt';

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Environment config types
export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  twitterImage: string;
  links: {
    twitter: string;
    github: string;
  };
  contact: {
    support: string;
  };
  social: {
    twitterHandle: string;
  };
}
