import type { PresetImage } from '../types';

// High-contrast SVG silhouettes encoded as data URLs for instant offline loading
const GEOMETRIC_MANDALA_SVG =
	'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400"><rect width="400" height="400" fill="white"/><circle cx="200" cy="200" r="140" fill="none" stroke="black" stroke-width="8"/><circle cx="200" cy="200" r="100" fill="none" stroke="black" stroke-width="6"/><circle cx="200" cy="200" r="60" fill="black"/><g stroke="black" stroke-width="4"><line x1="200" y1="40" x2="200" y2="360"/><line x1="40" y1="200" x2="360" y2="200"/><line x1="87" y1="87" x2="313" y2="313"/><line x1="87" y1="313" x2="313" y2="87"/></g><circle cx="200" cy="200" r="25" fill="white"/></svg>';

const PORTRAIT_SILHOUETTE_SVG =
	'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400"><rect width="400" height="400" fill="white"/><path d="M200 60 C150 60 140 110 140 160 C140 210 160 240 180 255 C150 270 120 310 110 360 L290 360 C280 310 250 270 220 255 C240 240 260 210 260 160 C260 110 250 60 200 60 Z" fill="black"/><circle cx="175" cy="155" r="12" fill="white"/><circle cx="225" cy="155" r="12" fill="white"/><path d="M185 205 Q200 220 215 205" stroke="white" stroke-width="4" fill="none"/></svg>';

const SACRED_CUBE_SVG =
	'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400"><rect width="400" height="400" fill="white"/><polygon points="200,70 320,140 320,280 200,350 80,280 80,140" fill="none" stroke="black" stroke-width="8"/><line x1="200" y1="70" x2="200" y2="210" stroke="black" stroke-width="6"/><line x1="80" y1="280" x2="200" y2="210" stroke="black" stroke-width="6"/><line x1="320" y1="280" x2="200" y2="210" stroke="black" stroke-width="6"/><polygon points="200,120 270,165 270,245 200,290 130,245 130,165" fill="black"/></svg>';

export const SAMPLE_PRESETS: PresetImage[] = [
	{
		id: 'mandala',
		title: 'Mandala Cósmico',
		subtitle: 'Geometría circular de alta densidad',
		url: GEOMETRIC_MANDALA_SVG,
		recommendedLines: 2200,
		recommendedPins: 240,
	},
	{
		id: 'portrait',
		title: 'Retrato Minimalista',
		subtitle: 'Contraste facial para tejer rostros',
		url: PORTRAIT_SILHOUETTE_SVG,
		recommendedLines: 2800,
		recommendedPins: 250,
	},
	{
		id: 'cube',
		title: 'Cubo de Metatrón',
		subtitle: 'Líneas isométricas de precisión',
		url: SACRED_CUBE_SVG,
		recommendedLines: 2000,
		recommendedPins: 200,
	},
];
