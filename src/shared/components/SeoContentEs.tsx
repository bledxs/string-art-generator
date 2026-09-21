import Link from 'next/link';
import type * as React from 'react';
import { siteConfig } from '@/shared/config/site';

export function SeoContentEs(): React.ReactElement {
	const faqs = siteConfig.faqs.es;

	return (
		<footer
			id='seo-content'
			className='border-border/50 border-t bg-background/80 px-4 py-12 backdrop-blur-xs sm:px-8'
		>
			<div className='mx-auto max-w-4xl space-y-10 text-muted-foreground text-sm leading-relaxed'>
				<header className='space-y-3'>
					<h1 className='font-bold font-serif text-2xl text-foreground sm:text-3xl'>
						{siteConfig.title}
					</h1>
					<p>
						Bienvenido a <strong>String Art Studio</strong>, la herramienta
						digital profesional y gratuita para crear{' '}
						<em>manualidades con hilos</em>, cuadros de <em>hilografía</em> y
						diseños de <em>hilorama personalizado</em> a partir de cualquier
						imagen. La alternativa 100% libre y en el navegador a software de
						pago como AlineDeco.
					</p>
				</header>

				<section className='space-y-2'>
					<h2 className='font-semibold text-foreground text-lg'>
						¿Qué es un generador de patrones de hilorama e hilografía?
					</h2>
					<p>
						Un generador de hilorama o hilografía transforma una fotografía
						digital en una secuencia matemática óptima de cuerdas entrelazadas
						entre clavos perimetrales. Nuestro motor calcula la trayectoria con
						física de hilo en tiempo real y rasterización de Bresenham con
						preservación de luces.
					</p>
				</section>

				<section className='space-y-3'>
					<h2 className='font-semibold text-foreground text-lg'>
						Cómo hacer hilorama paso a paso con tus propias fotos
					</h2>
					<ol className='list-decimal space-y-1 pl-5'>
						<li>
							<strong>Cargar imagen:</strong> Sube una fotografía con buen
							contraste en formato JPG, PNG o WebP.
						</li>
						<li>
							<strong>Ajustar parámetros:</strong> Define el número de pines
							(100, 200, 300), límite de líneas y contraste.
						</li>
						<li>
							<strong>Modo de color:</strong> Elige entre monocromático clásico
							o capas multicolor (CMYK, Sepia).
						</li>
						<li>
							<strong>Simulación interactiva:</strong> Visualiza la acumulación
							de hilo en el reproductor a 60 FPS.
						</li>
						<li>
							<strong>Exportar instrucciones:</strong> Descarga la guía en PDF
							con la lista de clavos y plantillas a escala.
						</li>
					</ol>
				</section>

				<section className='rounded-xl border border-primary/20 bg-primary/5 p-4 sm:p-6'>
					<h2 className='font-semibold text-base text-foreground sm:text-lg'>
						Plantillas de Hilorama para Imprimir
					</h2>
					<p className='mt-1 text-xs sm:text-sm'>
						¿Necesitas una plantilla circular a escala con las marcas de los
						clavos para tu tabla de madera? Descarga nuestros PDFs vectoriales:
					</p>
					<div className='mt-3'>
						<Link
							href='/plantillas'
							className='inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground text-xs shadow-xs transition-opacity hover:opacity-90'
						>
							Descargar Plantillas de Hilorama para Imprimir (100, 200, 300
							Pines) →
						</Link>
					</div>
				</section>

				<section className='space-y-4'>
					<h2 className='font-semibold text-foreground text-lg'>
						Preguntas frecuentes sobre Hilorama y String Art (FAQ)
					</h2>
					<dl className='space-y-3'>
						{faqs.map((faq) => (
							<div
								key={faq.question}
								className='rounded-lg border border-border/40 bg-card/30 p-3.5'
							>
								<dt className='font-medium text-foreground text-sm'>
									{faq.question}
								</dt>
								<dd className='mt-1.5 text-xs sm:text-sm'>{faq.answer}</dd>
							</div>
						))}
					</dl>
				</section>

				<div className='border-border/40 border-t pt-6 text-center text-xs'>
					<p>
						String Art Studio © {new Date().getFullYear()} —{' '}
						<a
							href='https://github.com/bledxs/string-art-generator'
							target='_blank'
							rel='noreferrer'
							className='underline hover:text-foreground'
						>
							GitHub Open Source
						</a>{' '}
						•{' '}
						<a
							href={siteConfig.links.sponsor}
							target='_blank'
							rel='noreferrer'
							className='text-rose-500 underline hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300'
						>
							GitHub Sponsors ❤️
						</a>{' '}
						•{' '}
						<a
							href='https://github.com/bledxs/string-art-generator/blob/main/LICENSE'
							target='_blank'
							rel='noreferrer'
							className='underline hover:text-foreground'
						>
							Licencia MIT
						</a>{' '}
						•{' '}
						<Link
							href='/plantillas'
							className='underline hover:text-foreground'
						>
							Plantillas Imprimibles
						</Link>
					</p>
				</div>
			</div>
		</footer>
	);
}
