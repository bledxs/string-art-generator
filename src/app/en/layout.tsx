import type { Metadata } from 'next';
import type * as React from 'react';
import {
	getFaqPageSchema,
	getHowToSchema,
	getWebApplicationSchema,
} from '@/shared/config/schema';
import { siteConfig } from '@/shared/config/site';

export const metadata: Metadata = {
	title: {
		default: siteConfig.en.title,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.en.description,
	keywords: [...siteConfig.en.keywords],
	alternates: {
		canonical: '/en',
		languages: {
			es: '/',
			en: '/en',
			'x-default': '/',
		},
	},
	openGraph: {
		type: 'website',
		locale: 'en_US',
		alternateLocale: ['es_ES'],
		url: `${siteConfig.url}/en`,
		title: siteConfig.en.title,
		description: siteConfig.en.description,
		siteName: siteConfig.name,
		images: [
			{
				url: siteConfig.ogImage,
				width: 1200,
				height: 630,
				alt: siteConfig.en.title,
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: siteConfig.en.title,
		description: siteConfig.en.description,
		images: [siteConfig.twitterImage],
	},
};

export default function EnglishLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const webAppJsonLd = getWebApplicationSchema('en');
	const faqJsonLd = getFaqPageSchema('en');
	const howToJsonLd = getHowToSchema('en');

	return (
		<>
			<script type='application/ld+json'>{JSON.stringify(webAppJsonLd)}</script>
			<script type='application/ld+json'>{JSON.stringify(faqJsonLd)}</script>
			<script type='application/ld+json'>{JSON.stringify(howToJsonLd)}</script>
			{children}
		</>
	);
}
