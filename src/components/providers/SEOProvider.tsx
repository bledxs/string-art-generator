import React from 'react';
import { useSEO } from '../../hooks/useSEO';

interface SEOProviderProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  children: React.ReactNode;
}

export const SEOProvider: React.FC<SEOProviderProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  children,
}) => {
  useSEO({ title, description, keywords, image, url });

  return <>{children}</>;
};
