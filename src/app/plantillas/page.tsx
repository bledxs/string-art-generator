import { ArrowLeft, Download, FileText, HelpCircle } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/shared/config/site';

export const metadata: Metadata = {
	title: 'Plantillas de Hilorama para Imprimir en PDF (100, 200, 300 Pines)',
	description:
		'Descarga plantillas circulares de hilorama gratis en PDF listas para imprimir a escala real. Guías con marcas exactas para 100, 200 y 300 clavos.',
	keywords: [
		'plantillas de hilorama para imprimir',
		'plantilla circular para hilorama pdf',
		'plantilla clavos string art',
		'patrones de hilorama gratis para imprimir',
		'circulo de clavos hilorama',
		'plantilla 100 clavos hilorama',
		'plantilla 200 clavos hilorama',
		'plantilla 300 clavos hilorama',
	],
	alternates: {
		canonical: '/plantillas',
		languages: {
			es: '/plantillas',
			en: '/en/templates',
			'x-default': '/plantillas',
		},
	},
	openGraph: {
		title: 'Plantillas de Hilorama para Imprimir en PDF (100, 200, 300 Pines)',
		description:
			'Descarga gratis plantillas circulares de clavos para hilorama en PDF. Formatos para 100, 200 y 300 clavos a escala real.',
		url: `${siteConfig.url}/plantillas`,
		siteName: siteConfig.name,
		type: 'website',
	},
};

const TEMPLATES = [
	{
		pins: 100,
		title: 'Plantilla de 100 Clavos (Principiantes)',
		subtitle: 'Ideal para cuadros de 30 a 40 cm y líneas gruesas',
		desc: 'Recomendada para quienes inician en el hilorama. Separación cómoda entre clavos para facilitar el martillado manual y el enhebrado rápido.',
		file: '/templates/100-pins-template.pdf',
		size: '405 KB',
		linesRecommended: '1,500 – 2,500 líneas',
		badge: 'Iniciación',
	},
	{
		pins: 200,
		title: 'Plantilla de 200 Clavos (Estándar)',
		subtitle: 'El equilibrio perfecto para retratos y decoración',
		desc: 'Nuestra plantilla más popular. Ofrece un alto nivel de contraste y definición para rostros, logos y siluetas en tableros de 40 a 50 cm.',
		file: '/templates/200-pins-template.pdf',
		size: '413 KB',
		linesRecommended: '2,500 – 4,000 líneas',
		badge: 'Más Popular',
	},
	{
		pins: 300,
		title: 'Plantilla de 300 Clavos (Alta Definición)',
		subtitle: 'Para cuadros hiperrealistas de 50 a 65 cm',
		desc: 'Diseñada para artistas y artesanos avanzados. Permite capturar micro-detalles y gradientes fotográficos continuos con hilo fino.',
		file: '/templates/300-pins-template.pdf',
		size: '421 KB',
		linesRecommended: '3,500 – 5,500 líneas',
		badge: 'Profesional',
	},
];

export default function PlantillasPage() {
	return (
		<main className='min-h-screen bg-background px-4 py-12 sm:px-8'>
			<div className='mx-auto max-w-4xl space-y-12'>
				<nav className='flex items-center justify-between'>
					<Link
						href='/'
						className='inline-flex items-center gap-1.5 font-medium text-muted-foreground text-xs transition-colors hover:text-foreground'
					>
						<ArrowLeft className='size-3.5' /> Volver al Generador
					</Link>
					<Link
						href='/en/templates'
						className='rounded-md border border-border/70 px-2 py-0.5 font-semibold text-muted-foreground text-xs hover:text-foreground'
					>
						English (EN)
					</Link>
				</nav>

				<header className='space-y-3'>
					<div className='inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-medium text-primary text-xs'>
						<FileText className='size-3.5' /> Recursos Imprimibles Gratuitos
					</div>
					<h1 className='font-bold font-serif text-3xl text-foreground sm:text-4xl'>
						Plantillas Circulares de Hilorama para Imprimir en PDF
					</h1>
					<p className='text-muted-foreground text-sm leading-relaxed sm:text-base'>
						Descarga nuestras guías radiales de precisión con marcas exactas
						para clavar en tu tablero de madera. Todas las plantillas ubican el{' '}
						<strong>Clavo 0 en la posición de las 12:00</strong> para una
						sincronización exacta con las instrucciones del generador online.
					</p>
				</header>

				<section className='grid gap-6 sm:grid-cols-3'>
					{TEMPLATES.map((tmpl) => (
						<article
							key={tmpl.pins}
							className='flex flex-col justify-between rounded-xl border border-border/60 bg-card/40 p-5 shadow-xs transition-colors hover:border-primary/40'
						>
							<div className='space-y-3'>
								<div className='flex items-center justify-between'>
									<span className='rounded-md bg-secondary px-2 py-0.5 font-medium text-secondary-foreground text-xs'>
										{tmpl.badge}
									</span>
									<span className='font-mono text-muted-foreground text-xs'>
										{tmpl.size}
									</span>
								</div>
								<div>
									<h2 className='font-bold text-foreground text-lg'>
										{tmpl.pins} Clavos
									</h2>
									<p className='font-medium text-primary text-xs'>
										{tmpl.subtitle}
									</p>
								</div>
								<p className='text-muted-foreground text-xs leading-relaxed'>
									{tmpl.desc}
								</p>
								<div className='border-border/40 border-t pt-2 text-muted-foreground text-xs'>
									Líneas sugeridas: <strong>{tmpl.linesRecommended}</strong>
								</div>
							</div>

							<div className='mt-6 pt-2'>
								<a
									href={tmpl.file}
									download
									className='inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 font-medium text-primary-foreground text-xs shadow-xs transition-opacity hover:opacity-90'
								>
									<Download className='size-3.5' /> Descargar PDF
								</a>
							</div>
						</article>
					))}
				</section>

				<section className='space-y-4 rounded-xl border border-border/60 bg-muted/20 p-6'>
					<h2 className='flex items-center gap-2 font-semibold text-base text-foreground'>
						<HelpCircle className='size-4 text-primary' /> Instrucciones de
						Impresión y Armado
					</h2>
					<ol className='list-decimal space-y-2 pl-5 text-muted-foreground text-xs leading-relaxed sm:text-sm'>
						<li>
							<strong>Configuración de impresión:</strong> Al imprimir el PDF,
							selecciona en tu visor <em>"Tamaño real"</em> o{' '}
							<em>"Escala 100%"</em>. No uses la opción "Ajustar a página" para
							no alterar las distancias.
						</li>
						<li>
							<strong>Fijar la plantilla:</strong> Centra la hoja sobre tu
							tablero de madera (MDF, pino o abedul) y sujétala con cinta
							adhesiva de enmascarar.
						</li>
						<li>
							<strong>Colocación de clavos:</strong> Clava un clavo pequeño o
							tachuela sin cabeza perpendicularmente en cada punto negro
							marcado. Asegúrate de que el <strong>Clavo 0</strong> quede en la
							parte superior (posición 12:00 de reloj).
						</li>
						<li>
							<strong>Retirar el papel:</strong> Una vez colocados todos los
							clavos, rasga suavemente el papel hacia afuera.
						</li>
						<li>
							<strong>Tejer el hilo:</strong> Ingresa al{' '}
							<Link href='/' className='text-primary underline'>
								Generador de Hilorama
							</Link>
							, sube tu fotografía y sigue la secuencia paso a paso.
						</li>
					</ol>
				</section>
			</div>
		</main>
	);
}
