import type { MetadataRoute } from 'next';
import { siteConfig } from '@/shared/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
	const lastModified = new Date();

	return [
		{
			url: siteConfig.url,
			lastModified,
			changeFrequency: 'weekly',
			priority: 1.0,
			alternates: {
				languages: {
					es: `${siteConfig.url}`,
					en: `${siteConfig.url}/en`,
					'x-default': `${siteConfig.url}`,
				},
			},
		},
		{
			url: `${siteConfig.url}/en`,
			lastModified,
			changeFrequency: 'weekly',
			priority: 1.0,
			alternates: {
				languages: {
					es: `${siteConfig.url}`,
					en: `${siteConfig.url}/en`,
					'x-default': `${siteConfig.url}`,
				},
			},
		},
		{
			url: `${siteConfig.url}/plantillas`,
			lastModified,
			changeFrequency: 'monthly',
			priority: 0.8,
			alternates: {
				languages: {
					es: `${siteConfig.url}/plantillas`,
					en: `${siteConfig.url}/en/templates`,
					'x-default': `${siteConfig.url}/plantillas`,
				},
			},
		},
		{
			url: `${siteConfig.url}/en/templates`,
			lastModified,
			changeFrequency: 'monthly',
			priority: 0.8,
			alternates: {
				languages: {
					es: `${siteConfig.url}/plantillas`,
					en: `${siteConfig.url}/en/templates`,
					'x-default': `${siteConfig.url}/plantillas`,
				},
			},
		},
	];
}
