'use client';

import type * as React from 'react';
import { StatusLoomArt } from '@/shared/components/status';
import { useTranslation } from '@/shared/i18n';

export default function Loading(): React.ReactElement {
	const { t } = useTranslation();
	const strings = t.statusPages.loading;

	return (
		<main
			className='studio-grid relative flex min-h-screen w-full flex-col items-center justify-center p-4'
			aria-busy='true'
			aria-live='polite'
		>
			<div className='studio-spotlight pointer-events-none absolute inset-0' />

			<div className='relative z-10 flex w-full max-w-sm flex-col items-center text-center'>
				<StatusLoomArt variant='loading' className='mb-6' />

				<h2 className='animate-pulse font-semibold text-foreground text-lg sm:text-xl'>
					{strings.title}
				</h2>

				<p className='mt-2 text-muted-foreground text-xs leading-relaxed sm:text-sm'>
					{strings.description}
				</p>

				<div className='mt-6 h-1 w-36 overflow-hidden rounded-full bg-border/60'>
					<div className='h-full w-1/2 animate-pulse rounded-full bg-primary' />
				</div>
			</div>
		</main>
	);
}
