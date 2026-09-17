import Link from 'next/link';
import type * as React from 'react';
import { siteConfig } from '@/shared/config/site';

export function SeoContentEn(): React.ReactElement {
	const faqs = siteConfig.faqs.en;

	return (
		<footer className='border-border/50 border-t bg-background/80 px-4 py-12 backdrop-blur-xs sm:px-8'>
			<div className='mx-auto max-w-4xl space-y-10 text-muted-foreground text-sm leading-relaxed'>
				<header className='space-y-3'>
					<h1 className='font-bold font-serif text-2xl text-foreground sm:text-3xl'>
						{siteConfig.en.title}
					</h1>
					<p>
						Welcome to <strong>String Art Studio</strong>, the professional and
						free digital workbench for turning any portrait or graphic into
						realistic <em>string art patterns</em> and physical knit art
						instructions.
					</p>
				</header>

				<section className='space-y-2'>
					<h2 className='font-semibold text-foreground text-lg'>
						What is an online string art generator?
					</h2>
					<p>
						A string art generator transforms a raster photograph into an
						optimized mathematical sequence of intersecting chords strung
						between boundary pins on a circular or rectangular frame. String Art
						Studio calculates optimal chord density using real-time thread
						physics and non-destructive Bresenham rasterization.
					</p>
				</section>

				<section className='space-y-3'>
					<h2 className='font-semibold text-foreground text-lg'>
						How to make string art step-by-step from photos
					</h2>
					<ol className='list-decimal space-y-1 pl-5'>
						<li>
							<strong>Upload Photo:</strong> Choose any high-contrast portrait
							or graphic in JPG, PNG, or WebP.
						</li>
						<li>
							<strong>Adjust Parameters:</strong> Configure pin count (100, 200,
							300), line limit, and contrast.
						</li>
						<li>
							<strong>Color Mode:</strong> Select monochrome or multi-color
							layered threads (CMYK, Sepia).
						</li>
						<li>
							<strong>Simulation &amp; Preview:</strong> Inspect thread build-up
							with the 60 FPS timeline scrub player.
						</li>
						<li>
							<strong>Export Instructions:</strong> Download PDF instructions,
							CNC sequence, and printable radial templates.
						</li>
					</ol>
				</section>

				<section className='rounded-xl border border-primary/20 bg-primary/5 p-4 sm:p-6'>
					<h2 className='font-semibold text-base text-foreground sm:text-lg'>
						Free Printable Radial Pin Templates
					</h2>
					<p className='mt-1 text-xs sm:text-sm'>
						Need a physical circle template with pin markings for your wood
						board? Access our ready-to-print vector PDFs:
					</p>
					<div className='mt-3'>
						<Link
							href='/en/templates'
							className='inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground text-xs shadow-xs transition-opacity hover:opacity-90'
						>
							Download Free Printable Radial Templates (100, 200, 300 Pins) →
						</Link>
					</div>
				</section>

				<section className='space-y-4'>
					<h2 className='font-semibold text-foreground text-lg'>
						Frequently Asked Questions (FAQ)
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
							href='https://github.com/bledxs/string-art-generator/blob/main/LICENSE'
							target='_blank'
							rel='noreferrer'
							className='underline hover:text-foreground'
						>
							MIT License
						</a>{' '}
						•{' '}
						<Link
							href='/en/templates'
							className='underline hover:text-foreground'
						>
							Printable Pin Templates
						</Link>
					</p>
				</div>
			</div>
		</footer>
	);
}
