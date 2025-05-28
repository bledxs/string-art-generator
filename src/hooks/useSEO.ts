import { useEffect } from 'react';

import {
  updateLinkTag,
  updateMetaName,
  updateMetaProperty,
  updateMetaTag,
} from '@/helpers/seoHelpers';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

export const useSEO = ({
  title,
  description,
  keywords = [],
  image,
  url,
}: SEOProps = {}) => {
  useEffect(() => {
    // Actualizar título
    if (title) {
      document.title = `${title} | StringArt Pro`;
    }

    // Actualizar meta description
    if (description) {
      updateMetaTag('description', description);
    }

    // Actualizar keywords
    if (keywords.length > 0) {
      updateMetaTag('keywords', keywords.join(', '));
    }

    // Actualizar Open Graph
    if (title) {
      updateMetaProperty('og:title', title);
    }
    if (description) {
      updateMetaProperty('og:description', description);
    }
    if (image) {
      updateMetaProperty('og:image', image);
    }
    if (url) {
      updateMetaProperty('og:url', url);
      updateLinkTag('canonical', url);
    }

    // Actualizar Twitter Cards
    if (title) {
      updateMetaName('twitter:title', title);
    }
    if (description) {
      updateMetaName('twitter:description', description);
    }
    if (image) {
      updateMetaName('twitter:image', image);
    }
  }, [title, description, keywords, image, url]);
};
