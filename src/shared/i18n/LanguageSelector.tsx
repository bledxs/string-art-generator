'use client';

import { Globe } from 'lucide-react';
import { useTranslation } from './useTranslation';

export function LanguageSelector() {
	const { locale, setLocale, t } = useTranslation();

	return (
		<div
			className='inline-flex items-center rounded-lg border border-border/70 bg-muted/30 p-0.5 text-xs'
			title={t.header.languageAria}
		>
			<span className='hidden items-center pr-1 pl-1.5 text-muted-foreground sm:inline-flex'>
				<Globe className='size-3.5' />
			</span>
			<button
				type='button'
				onClick={() => setLocale('es')}
				aria-pressed={locale === 'es'}
				aria-label='Español'
				className={`cursor-pointer rounded-md px-2 py-0.5 font-semibold text-xs transition-all ${
					locale === 'es'
						? 'bg-background text-foreground shadow-xs'
						: 'text-muted-foreground hover:text-foreground'
				}`}
			>
				ES
			</button>
			<button
				type='button'
				onClick={() => setLocale('en')}
				aria-pressed={locale === 'en'}
				aria-label='English'
				className={`cursor-pointer rounded-md px-2 py-0.5 font-semibold text-xs transition-all ${
					locale === 'en'
						? 'bg-background text-foreground shadow-xs'
						: 'text-muted-foreground hover:text-foreground'
				}`}
			>
				EN
			</button>
		</div>
	);
}
