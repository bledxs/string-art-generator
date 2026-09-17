'use client';

import { Globe } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import type { SupportedLocale } from './types';
import { useTranslation } from './useTranslation';

function getNextPath(target: SupportedLocale, path: string): string | null {
	if (target === 'en') {
		if (path === '/plantillas') return '/en/templates';
		if (path === '/' || path === '') return '/en';
		return null;
	}
	if (path === '/en/templates') return '/plantillas';
	if (path === '/en') return '/';
	return null;
}

export function LanguageSelector() {
	const { locale, setLocale, t } = useTranslation();
	const pathname = usePathname();
	const router = useRouter();

	const handleSelectLocale = (targetLocale: SupportedLocale) => {
		setLocale(targetLocale);
		const nextPath = getNextPath(targetLocale, pathname);
		if (nextPath) {
			router.push(nextPath);
		}
	};

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
				onClick={() => handleSelectLocale('es')}
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
				onClick={() => handleSelectLocale('en')}
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
