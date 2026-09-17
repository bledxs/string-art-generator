import type { MetadataRoute } from 'next';
import { siteConfig } from '@/shared/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: siteConfig.url,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1,
		},
	];
}
