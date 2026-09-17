import type * as React from 'react';

/**
 * Semantic SEO Content component.
 * Pre-rendered on the server (SSR) so search engines and SEO auditors (Google, Ubersuggest, Bing)
 * can index the H1 heading, core keyword topics, FAQs, and rich text content.
 * Kept visually accessible to screen readers and bots via standard 'sr-only' styling.
 */
export function SeoContent(): React.ReactElement {
	return (
		<article
			className='sr-only'
			aria-label='Información y Guía de String Art Studio'
		>
			<header>
				<h1>
					String Art Studio — Generador de Patrones de Hilorama y Arte de Hilos
					Online
				</h1>
				<p>
					Bienvenido a <strong>String Art Studio</strong>, la herramienta
					digital profesional y gratuita para crear{' '}
					<em>manualidades con hilos</em> y diseños de{' '}
					<em>string art personalizado</em> a partir de cualquier fotografía o
					imagen.
				</p>
			</header>

			<section>
				<h2>¿Qué es un generador de patrones de hilorama?</h2>
				<p>
					Un generador de patrones de hilorama es un software que transforma una
					imagen digital en una secuencia matemática de líneas de hilo
					conectadas entre clavos perimetrales colocados en un bastidor o
					tablero circular. String Art Studio utiliza un{' '}
					<strong>algoritmo de alta precisión</strong> para calcular el
					recorrido óptimo del tejido, permitiendo crear impresionantes obras de
					arte con hilos y clavos con máxima fidelidad visual sin requerir
					conocimientos técnicos avanzados.
				</p>
			</section>

			<section>
				<h2>Cómo hacer hilorama paso a paso con tus propias fotos</h2>
				<ol>
					<li>
						<strong>Cargar imagen:</strong> Sube cualquier fotografía o retrato
						en formato JPG, PNG o WebP.
					</li>
					<li>
						<strong>Ajustar parámetros:</strong> Configura el número de pines
						(100, 200 o 300 clavos), el contraste, brillo y la cantidad de
						líneas deseadas.
					</li>
					<li>
						<strong>Elegir modo de color:</strong> Selecciona entre
						monocromático clásico (hilo negro sobre fondo blanco) o{' '}
						<em>string art multicolor</em> con capas superpuestas.
					</li>
					<li>
						<strong>Simulador de arte de hilos:</strong> Visualiza en tiempo
						real cómo se entrelazan las cuerdas mediante la animación
						interactiva paso a paso.
					</li>
					<li>
						<strong>Exportar instrucciones PDF:</strong> Descarga la guía
						completa para armar tu cuadro físico, incluyendo la lista ordenada
						de números de clavos y la plantilla imprimible a escala.
					</li>
				</ol>
			</section>

			<section>
				<h2>Ventajas y características de String Art Studio</h2>
				<ul>
					<li>
						<strong>100% Gratuito y en el navegador:</strong> Sin necesidad de
						instalar programas ni registrarse.
					</li>
					<li>
						<strong>Simulador interactivo en tiempo real:</strong> Reproductor
						con control de velocidad para acompañarte durante el tejido de cada
						cuerda.
					</li>
					<li>
						<strong>Plantillas de hilorama para imprimir:</strong> Guías de
						pines circulares en formatos estándar A4, A3 y A2 con Pin 0
						claramente identificado a las 12:00.
					</li>
					<li>
						<strong>Patrones de hilorama personalizables:</strong> Control de
						opacidad, grosor del hilo, longitud total requerida en metros y
						cálculo de peso físico.
					</li>
					<li>
						<strong>Ideal para creadores y emprendedores:</strong> Diseñado para
						artistas, docentes de artes plásticas, aficionados al DIY y
						fabricantes de cuadros decorativos artesanales.
					</li>
				</ul>
			</section>

			<section>
				<h2>Preguntas frecuentes sobre Hilorama y String Art (FAQ)</h2>
				<dl>
					<dt>¿Qué materiales necesito para empezar un cuadro de hilorama?</dt>
					<dd>
						Necesitas una tabla de madera lisa (MDF o pino), clavos sin cabeza o
						clavillos de cabeza pequeña, hilo de coser resistente o hilo de
						poliéster, un martillo y la plantilla descargable de String Art
						Studio.
					</dd>

					<dt>¿Cuántos clavos y cuántas líneas se recomiendan?</dt>
					<dd>
						Para principiantes se recomiendan 100 a 150 clavos con 1,500 a 2,500
						líneas. Para retratos fotográficos de alta definición, se
						recomiendan 200 a 300 clavos con 3,000 a 5,000 líneas.
					</dd>

					<dt>¿Cómo interpretar las instrucciones PDF de string art?</dt>
					<dd>
						Las instrucciones proporcionan una secuencia numérica consecutiva
						(ejemplo: 0 → 142 → 15 → 188...). Simplemente ata el hilo al clavo
						inicial y continúa llevándolo hacia cada número indicado en orden.
					</dd>
				</dl>
			</section>
		</article>
	);
}
