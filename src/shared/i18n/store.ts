import { create } from 'zustand';
import type { SupportedLocale } from './types';

const STORAGE_KEY = 'string_art_locale';

function detectSystemLocale(): SupportedLocale {
	if (typeof window === 'undefined') return 'es';
	const nav = navigator;
	const userLanguage =
		'userLanguage' in nav && typeof nav.userLanguage === 'string'
			? nav.userLanguage
			: '';
	const browserLang = nav.languages?.[0] || nav.language || userLanguage || '';
	return browserLang.toLowerCase().startsWith('es') ? 'es' : 'en';
}

function getInitialLocale(): SupportedLocale {
	if (typeof window === 'undefined') return 'es';
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored === 'es' || stored === 'en') {
			return stored;
		}
	} catch {
		// Ignore storage read errors (e.g. private mode)
	}
	return detectSystemLocale();
}

const initialLocale = getInitialLocale();

if (typeof document !== 'undefined') {
	document.documentElement.lang = initialLocale;
}

interface I18nState {
	locale: SupportedLocale;
	setLocale: (locale: SupportedLocale) => void;
	toggleLocale: () => void;
}

export const useI18nStore = create<I18nState>((set, get) => ({
	locale: initialLocale,
	setLocale: (locale: SupportedLocale) => {
		try {
			localStorage.setItem(STORAGE_KEY, locale);
		} catch {
			// Ignore storage write errors
		}
		if (typeof document !== 'undefined') {
			document.documentElement.lang = locale;
		}
		set({ locale });
	},
	toggleLocale: () => {
		const current = get().locale;
		const next: SupportedLocale = current === 'es' ? 'en' : 'es';
		get().setLocale(next);
	},
}));
