import { create } from 'zustand';
import { getClientCookieLocale, setClientCookieLocale } from './cookie';
import type { SupportedLocale } from './types';

interface I18nState {
	locale: SupportedLocale;
	setLocale: (locale: SupportedLocale) => void;
	toggleLocale: () => void;
}

export const useI18nStore = create<I18nState>((set, get) => ({
	locale: getClientCookieLocale(),
	setLocale: (locale: SupportedLocale) => {
		setClientCookieLocale(locale);
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
