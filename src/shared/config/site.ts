const defaultSiteUrl = 'https://www.stringartgenerator.app';

export const siteConfig = {
	name: 'String Art Studio',
	shortName: 'StringArt',
	title: 'String Art Studio — Generador de Hilorama y Arte de Hilos Online',
	description:
		'Crea patrones profesionales de hilorama y string art desde tus fotos. Algoritmo de alta precisión, simulación en vivo y descarga de instrucciones en PDF.',
	url: (
		process.env.NEXT_PUBLIC_SITE_URL ||
		process.env.SITE_URL ||
		defaultSiteUrl
	).replace(/\/$/, ''),
	ogImage: '/opengraph-image.png',
	twitterImage: '/twitter-image.png',
	keywords: [
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
		'plantillas de hilorama para imprimir',
		'string art generator',
		'string art pattern maker',
		'photo to string art',
	],
	en: {
		title:
			'String Art Studio — Free Online String Art Generator & Pattern Maker',
		description:
			'Transform photos into professional string art patterns online. High-precision knit algorithm with live thread physics, color layers, and free PDF instructions.',
		keywords: [
			'string art generator',
			'photo to string art',
			'string art pattern maker',
			'string art creator online',
			'circular string art generator',
			'knit art algorithm',
			'diy string art instructions',
			'string art templates printable',
			'free string art patterns',
			'string art pdf export',
			'multi color string art',
			'thread art simulation',
			'generador de hilorama',
		],
	},
	faqs: {
		es: [
			{
				question:
					'¿Qué materiales necesito para empezar un cuadro de hilorama?',
				answer:
					'Necesitas una tabla de madera lisa (MDF o pino), clavos sin cabeza o clavillos de cabeza pequeña, hilo de coser resistente o hilo de poliéster, un martillo y la plantilla descargable de String Art Studio.',
			},
			{
				question: '¿Cuántos clavos y cuántas líneas se recomiendan?',
				answer:
					'Para principiantes se recomiendan 100 a 150 clavos con 1,500 a 2,500 líneas. Para retratos fotográficos de alta definición, se recomiendan 200 a 300 clavos con 3,000 a 5,000 líneas.',
			},
			{
				question: '¿Cómo interpretar las instrucciones PDF de string art?',
				answer:
					'Las instrucciones proporcionan una secuencia numérica consecutiva (ejemplo: 0 → 142 → 15 → 188...). Simplemente ata el hilo al clavo inicial y continúa llevándolo hacia cada número indicado en orden.',
			},
			{
				question: '¿Puedo generar patrones de hilorama en varios colores?',
				answer:
					'Sí, String Art Studio incluye soporte para capas de color CMYK, RGBW y tonos Sepia con cálculo independiente de pasadas por hilo.',
			},
		],
		en: [
			{
				question: 'What materials do I need to start a string art project?',
				answer:
					'You need a smooth wooden board (MDF or birch plywood), small linoleum or brass nails, strong sewing or polyester thread, a hammer, and a printable template from String Art Studio.',
			},
			{
				question: 'How many pins and lines are recommended?',
				answer:
					'For beginners, 100 to 150 pins with 1,500 to 2,500 lines work best. For detailed photo portraits, 200 to 300 pins with 3,000 to 5,000 lines provide maximum photographic clarity.',
			},
			{
				question: 'How do I follow the string art PDF instructions?',
				answer:
					'The instructions provide a sequential list of pin numbers (e.g., 0 → 142 → 15 → 188...). Tie the thread to the starting pin and wrap it around each numbered pin in chronological order.',
			},
			{
				question: 'Can I create multi-color string art?',
				answer:
					'Yes, String Art Studio supports multi-layer color palettes including CMYK, RGBW, and Warm Sepia with automated layer-by-layer thread planning.',
			},
		],
	},
	author: 'String Art Studio',
	verification: {
		google:
			process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
			'pxbqTo-ydIEU4kjrFBWaU6OLQ6-ucjPQ0t3mfL4l0yE',
		ubersuggest: process.env.NEXT_PUBLIC_UBERSUGGEST_SITE_VERIFICATION,
	},
} as const;
