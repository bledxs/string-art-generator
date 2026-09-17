import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import type * as React from 'react';
import { Toaster } from 'sonner';
import { siteConfig } from '@/shared/config/site';
import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME } from '@/shared/i18n';
import './globals.css';
import { ThemeProvider } from './providers';

export const metadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	title: {
		default: siteConfig.title,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	keywords: [...siteConfig.keywords],
	authors: [{ name: siteConfig.author }],
	creator: siteConfig.author,
	alternates: {
		canonical: '/',
	},
	icons: {
		icon: [
			{ url: '/favicon.ico', sizes: 'any' },
			{ url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
		],
		apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
	},
	openGraph: {
		type: 'website',
		locale: 'es_ES',
		alternateLocale: ['en_US'],
		url: siteConfig.url,
		title: siteConfig.title,
		description: siteConfig.description,
		siteName: siteConfig.name,
		images: [
			{
				url: siteConfig.ogImage,
				width: 1200,
				height: 630,
				alt: siteConfig.title,
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: siteConfig.title,
		description: siteConfig.description,
		images: [siteConfig.twitterImage],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	verification: {
		google: siteConfig.verification.google || undefined,
		other: siteConfig.verification.ubersuggest
			? {
					ubersuggest: siteConfig.verification.ubersuggest,
				}
			: undefined,
	},
};

const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'WebApplication',
	name: siteConfig.name,
	url: siteConfig.url,
	description: siteConfig.description,
	applicationCategory: 'MultimediaApplication',
	operatingSystem: 'All',
	browserRequirements: 'Requires JavaScript. Requires HTML5 Canvas support.',
	offers: {
		'@type': 'Offer',
		price: '0',
		priceCurrency: 'USD',
	},
	featureList: [
		'Generador automático de patrones de hilorama a partir de imágenes',
		'Visualización interactiva y simulación de tejido paso a paso',
		'Soporte para múltiples colores e hilos superpuestos',
		'Exportación en alta resolución de instrucciones para armado físico en PDF',
	],
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const cookieStore = await cookies();
	const cookieLocale = cookieStore.get(LOCALE_COOKIE_NAME)?.value;
	const locale =
		cookieLocale === 'en' || cookieLocale === 'es'
			? cookieLocale
			: DEFAULT_LOCALE;

	return (
		<html lang={locale} suppressHydrationWarning>
			<head>
				<script type='application/ld+json'>{JSON.stringify(jsonLd)}</script>
			</head>
			<body className='min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary/20 selection:text-primary'>
				<ThemeProvider initialLocale={locale}>
					{children}
					<Toaster richColors closeButton position='bottom-right' />
				</ThemeProvider>
			</body>
		</html>
	);
}
