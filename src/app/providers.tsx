'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import * as React from 'react';
import { type SupportedLocale, useI18nStore } from '@/shared/i18n';

interface ThemeProviderProps {
	children: React.ReactNode;
	initialLocale?: SupportedLocale;
}

export function ThemeProvider({
	children,
	initialLocale,
}: Readonly<ThemeProviderProps>) {
	const setLocale = useI18nStore((state) => state.setLocale);

	React.useEffect(() => {
		if (initialLocale && initialLocale !== useI18nStore.getState().locale) {
			setLocale(initialLocale);
		}
	}, [initialLocale, setLocale]);

	return (
		<NextThemesProvider
			attribute='class'
			defaultTheme='dark'
			enableSystem
			disableTransitionOnChange
		>
			{children}
		</NextThemesProvider>
	);
}
