import type * as React from 'react';
import { LanguageSelector } from '@/shared/i18n';
import { Badge } from '@/shared/ui/badge';
import { type StatusArtVariant, StatusLoomArt } from './StatusLoomArt';

interface StatusCardProps {
	variant: StatusArtVariant;
	badge: string;
	title: string;
	description: string;
	actions?: React.ReactNode;
	details?: React.ReactNode;
}

export function StatusCard({
	variant,
	badge,
	title,
	description,
	actions,
	details,
}: Readonly<StatusCardProps>): React.ReactElement {
	return (
		<main
			suppressHydrationWarning
			className='studio-grid relative flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-6 lg:p-8'
		>
			<div className='studio-spotlight pointer-events-none absolute inset-0' />

			<div className='absolute top-4 right-4 z-20'>
				<LanguageSelector />
			</div>

			<div className='relative z-10 flex w-full max-w-lg flex-col items-center text-center'>
				<div className='w-full rounded-2xl border border-border/80 bg-card/85 p-6 shadow-2xl backdrop-blur-xl sm:p-8'>
					<div className='mb-6 flex justify-center'>
						<StatusLoomArt variant={variant} />
					</div>

					<div className='mb-3 flex justify-center'>
						<Badge
							suppressHydrationWarning
							variant='outline'
							className='border-primary/30 bg-primary/10 px-3 py-0.5 font-mono text-primary text-xs uppercase tracking-wider'
						>
							{badge}
						</Badge>
					</div>

					<h1
						suppressHydrationWarning
						className='font-semibold text-2xl text-foreground tracking-tight sm:text-3xl'
					>
						{title}
					</h1>

					<p
						suppressHydrationWarning
						className='mt-3 text-muted-foreground text-sm leading-relaxed sm:text-base'
					>
						{description}
					</p>

					{details && (
						<div className='mt-4 w-full text-left text-xs'>{details}</div>
					)}

					{actions && (
						<div className='mt-6 flex flex-wrap items-center justify-center gap-3'>
							{actions}
						</div>
					)}
				</div>

				<p className='mt-6 font-mono text-muted-foreground/60 text-xs'>
					String Art Studio — Atelier de Geometría & Arte con Hilos
				</p>
			</div>
		</main>
	);
}
