'use client';

import { en } from './locales/en';
import { es } from './locales/es';
import { useI18nStore } from './store';
import type { SupportedLocale, TranslationDictionary } from './types';

const dictionaries: Record<SupportedLocale, TranslationDictionary> = {
	es,
	en,
};

export function useTranslation() {
	const locale = useI18nStore((state) => state.locale);
	const setLocale = useI18nStore((state) => state.setLocale);
	const toggleLocale = useI18nStore((state) => state.toggleLocale);

	const t = dictionaries[locale] ?? es;

	return {
		t,
		locale,
		setLocale,
		toggleLocale,
	};
}
