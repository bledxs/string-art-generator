'use client';

import * as React from 'react';
import { useI18nStore } from './store';
import type { SupportedLocale } from './types';

interface LocaleSyncProps {
	locale: SupportedLocale;
}

export function LocaleSync({
	locale,
}: LocaleSyncProps): React.ReactElement | null {
	const setLocale = useI18nStore((s) => s.setLocale);

	React.useEffect(() => {
		if (useI18nStore.getState().locale !== locale) {
			setLocale(locale);
		}
	}, [locale, setLocale]);

	return null;
}
