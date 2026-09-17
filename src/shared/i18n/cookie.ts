import type { SupportedLocale } from './types';

export const LOCALE_COOKIE_NAME = 'string_art_locale';
export const DEFAULT_LOCALE: SupportedLocale = 'es';

/**
 * Reads the preferred locale from document.cookie synchronously in the browser.
 */
export function getClientCookieLocale(): SupportedLocale {
	if (typeof document === 'undefined') return DEFAULT_LOCALE;
	try {
		const match = document.cookie.match(
			new RegExp(`(?:^|;\\s*)${LOCALE_COOKIE_NAME}=([^;]+)`),
		);
		const val = match ? decodeURIComponent(match[1]) : null;
		if (val === 'es' || val === 'en') {
			return val;
		}
	} catch {
		// Ignore cookie parse error in restricted sandbox
	}
	return DEFAULT_LOCALE;
}

/**
 * Persists the preferred locale in a 1-year cookie accessible by Next.js server.
 */
export function setClientCookieLocale(locale: SupportedLocale): void {
	if (typeof document === 'undefined') return;
	try {
		// biome-ignore lint/suspicious/noDocumentCookie: synchronous client cookie persistence
		document.cookie = `${LOCALE_COOKIE_NAME}=${encodeURIComponent(
			locale,
		)}; path=/; max-age=31536000; SameSite=Lax`;
	} catch {
		// Ignore cookie write error
	}
}
