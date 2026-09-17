const defaultSiteUrl = 'https://www.stringartgenerator.app';

export const siteConfig = {
	name: 'String Art Studio',
	shortName: 'StringArt',
	title: 'String Art Studio — Generador de Hilorama y Arte de Hilos Online',
	description:
		'Crea patrones profesionales de string art e hilorama a partir de tus fotos. Algoritmo de alta precisión con simulación interactiva, capas de color y exportación de instrucciones PDF gratis.',
	url: (
		process.env.NEXT_PUBLIC_SITE_URL ||
		process.env.SITE_URL ||
		defaultSiteUrl
	).replace(/\/$/, ''),
	ogImage: '/opengraph-image.png',
	twitterImage: '/twitter-image.png',
	keywords: [
		'string art generator',
		'string art pattern maker',
		'photo to string art',
		'string art creator online',
		'knit art algorithm',
		'diy string art instructions',
		'circular string art generator',
		'string art pdf export',
		'custom string art patterns',
		'generador de hilorama',
		'creador de hilorama online',
		'convertir foto en hilorama',
		'arte con hilos y clavos',
		'cuadros con hilos y clavos',
		'patrones de hilorama gratis',
		'patrones de hilorama',
		'como hacer hilorama',
		'manualidades con hilos',
		'string art personalizado',
		'string art multicolor',
		'simulador de arte de hilos',
		'instrucciones pdf de string art',
		'cuadros de hilorama personalizados',
		'algoritmo de string art',
		'plantillas de hilorama para imprimir',
	],
	author: 'String Art Studio',
	verification: {
		google:
			process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
			'pxbqTo-ydIEU4kjrFBWaU6OLQ6-ucjPQ0t3mfL4l0yE',
		ubersuggest: process.env.NEXT_PUBLIC_UBERSUGGEST_SITE_VERIFICATION,
	},
} as const;
