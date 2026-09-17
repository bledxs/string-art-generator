import { siteConfig } from './site';

export type SupportedLocale = 'es' | 'en';

export function getWebApplicationSchema(locale: SupportedLocale = 'es') {
	const isEn = locale === 'en';
	const title = isEn ? siteConfig.en.title : siteConfig.title;
	const description = isEn ? siteConfig.en.description : siteConfig.description;
	const url = isEn ? `${siteConfig.url}/en` : siteConfig.url;

	const features = isEn
		? [
				'Automatic string art pattern generation from user photos',
				'Real-time physical thread simulation with 60 FPS canvas engine',
				'Multi-color layered thread simulation (Monochrome, CMYK, RGBW, Warm Sepia)',
				'High-resolution PDF instruction manual and printable pin template export',
			]
		: [
				'Generador automático de patrones de hilorama a partir de imágenes',
				'Visualización interactiva y simulación de tejido paso a paso',
				'Soporte para múltiples colores e hilos superpuestos',
				'Exportación en alta resolución de instrucciones para armado físico en PDF',
			];

	return {
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: title,
		url,
		description,
		applicationCategory: 'MultimediaApplication',
		operatingSystem: 'All',
		browserRequirements: 'Requires JavaScript. Requires HTML5 Canvas support.',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD',
		},
		featureList: features,
	};
}

export function getFaqPageSchema(locale: SupportedLocale = 'es') {
	const items = siteConfig.faqs[locale] ?? siteConfig.faqs.es;

	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: items.map((faq) => ({
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: faq.answer,
			},
		})),
	};
}

export function getHowToSchema(locale: SupportedLocale = 'es') {
	const isEn = locale === 'en';
	const name = isEn
		? 'How to Create DIY String Art Step-by-Step from Photos'
		: 'Cómo hacer hilorama paso a paso con tus propias fotos';
	const description = isEn
		? 'A complete guide to turning any digital picture into a physical circular string art portrait with nails and thread.'
		: 'Guía paso a paso para transformar cualquier imagen digital en un cuadro de hilorama con clavos e hilo.';

	const steps = isEn
		? [
				{
					name: 'Upload photo',
					text: 'Upload any portrait or graphic image in JPG, PNG, or WebP format.',
				},
				{
					name: 'Adjust parameters',
					text: 'Choose pin count (100, 200, or 300 pins), adjust contrast, brightness, and maximum line limit.',
				},
				{
					name: 'Select color mode',
					text: 'Pick classic monochrome or multi-layer thread palettes like CMYK or Warm Sepia.',
				},
				{
					name: 'Live thread simulation',
					text: 'Watch the step-by-step thread weaving animation in real-time.',
				},
				{
					name: 'Export instructions & templates',
					text: 'Download the physical instruction manual with ordered pin sequence and scaled PDF template.',
				},
			]
		: [
				{
					name: 'Cargar imagen',
					text: 'Sube cualquier fotografía o retrato en formato JPG, PNG o WebP.',
				},
				{
					name: 'Ajustar parámetros',
					text: 'Configura el número de pines (100, 200 o 300 clavos), contraste, brillo y cantidad de líneas.',
				},
				{
					name: 'Elegir modo de color',
					text: 'Selecciona entre monocromático clásico o hilorama multicolor con capas superpuestas.',
				},
				{
					name: 'Simulador de arte de hilos',
					text: 'Visualiza en tiempo real cómo se entrelazan las cuerdas mediante la animación interactiva.',
				},
				{
					name: 'Exportar instrucciones PDF',
					text: 'Descarga la guía completa para armar tu cuadro físico, incluyendo la secuencia numérica y plantilla.',
				},
			];

	return {
		'@context': 'https://schema.org',
		'@type': 'HowTo',
		name,
		description,
		step: steps.map((step, index) => ({
			'@type': 'HowToStep',
			position: index + 1,
			name: step.name,
			text: step.text,
		})),
	};
}
