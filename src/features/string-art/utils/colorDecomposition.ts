import type { ColorLayer } from '../types';

export interface ColorPalettePreset {
	id: 'monochrome' | 'cmyk' | 'rgbw' | 'warm-sepia';
	name: string;
	description: string;
	recommendedMode: 'dark-on-light' | 'light-on-dark';
	layers: ColorLayer[];
}

export const COLOR_PALETTES: ColorPalettePreset[] = [
	{
		id: 'monochrome',
		name: 'Monocromo Clásico',
		description: '1 bobina. Alto contraste tradicional sobre madera o ébano.',
		recommendedMode: 'dark-on-light',
		layers: [
			{
				id: 'mono-base',
				name: 'Hilo Principal',
				color: '#120e0b',
				linesCount: 2200,
			},
		],
	},
	{
		id: 'cmyk',
		name: 'Cuatricromía CMYK',
		description:
			'4 bobinas (Negro, Cian, Magenta, Amarillo). Sustractivo sobre fondo blanco.',
		recommendedMode: 'dark-on-light',
		layers: [
			{
				id: 'cmyk-k',
				name: 'Negro Carbón (K)',
				color: '#09090b',
				linesCount: 900,
			},
			{
				id: 'cmyk-c',
				name: 'Cian Intenso (C)',
				color: '#0284c7',
				linesCount: 650,
			},
			{
				id: 'cmyk-m',
				name: 'Magenta Carmín (M)',
				color: '#db2777',
				linesCount: 650,
			},
			{
				id: 'cmyk-y',
				name: 'Amarillo Cromo (Y)',
				color: '#eab308',
				linesCount: 400,
			},
		],
	},
	{
		id: 'rgbw',
		name: 'Luminoso RGBW (Aditivo)',
		description:
			'4 bobinas (Azul, Carmín, Oro, Blanco Puro). Aditivo sobre fondo negro ébano.',
		recommendedMode: 'light-on-dark',
		layers: [
			{
				id: 'rgbw-b',
				name: 'Azul Cobalto (Sombras)',
				color: '#2563eb',
				linesCount: 750,
			},
			{
				id: 'rgbw-r',
				name: 'Rojo Carmín (Medios Tonos)',
				color: '#dc2626',
				linesCount: 750,
			},
			{
				id: 'rgbw-y',
				name: 'Oro Cálido (Matices)',
				color: '#f59e0b',
				linesCount: 500,
			},
			{
				id: 'rgbw-w',
				name: 'Blanco Titanio (Altas Luces)',
				color: '#ffffff',
				linesCount: 600,
			},
		],
	},
	{
		id: 'warm-sepia',
		name: 'Sepia y Terracota de Taller',
		description:
			'3 bobinas de tonos tierra cálidos. Ideal para retratos renacentistas.',
		recommendedMode: 'dark-on-light',
		layers: [
			{
				id: 'sepia-dark',
				name: 'Espresso Oscuro (Sombras)',
				color: '#27150c',
				linesCount: 1100,
			},
			{
				id: 'sepia-terracotta',
				name: 'Terracota Toscana (Volumen)',
				color: '#b45309',
				linesCount: 900,
			},
			{
				id: 'sepia-cream',
				name: 'Crema Marfil (Luz)',
				color: '#fef3c7',
				linesCount: 600,
			},
		],
	},
];

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
	const sanitized = hex.replace('#', '');
	const num = Number.parseInt(
		sanitized.length === 3
			? sanitized
					.split('')
					.map((c) => c + c)
					.join('')
			: sanitized,
		16,
	);
	return {
		r: (num >> 16) & 255,
		g: (num >> 8) & 255,
		b: num & 255,
	};
}

function extractCmykResidual(
	rgba: Uint8ClampedArray,
	pixelCount: number,
	layerId: string,
): Int16Array {
	const residual = new Int16Array(pixelCount);
	const isK = layerId.includes('-k');
	const isC = layerId.includes('-c');
	const isM = layerId.includes('-m');
	const isY = layerId.includes('-y');

	for (let i = 0; i < pixelCount; i++) {
		const r = rgba[i * 4] / 255;
		const g = rgba[i * 4 + 1] / 255;
		const b = rgba[i * 4 + 2] / 255;
		const k = 1 - Math.max(r, g, b);

		if (isK) {
			residual[i] = Math.round(k * 255);
		} else if (k < 0.999) {
			const denom = 1 - k;
			if (isC) residual[i] = Math.round(((1 - r - k) / denom) * 255);
			else if (isM) residual[i] = Math.round(((1 - g - k) / denom) * 255);
			else if (isY) residual[i] = Math.round(((1 - b - k) / denom) * 255);
		} else {
			residual[i] = 0;
		}
	}
	return residual;
}

function extractRgbwResidual(
	rgba: Uint8ClampedArray,
	pixelCount: number,
	layerId: string,
): Int16Array {
	const residual = new Int16Array(pixelCount);
	const isW = layerId.includes('-w');
	const isR = layerId.includes('-r');
	const isB = layerId.includes('-b');
	const isY = layerId.includes('-y');

	for (let i = 0; i < pixelCount; i++) {
		const r = rgba[i * 4];
		const g = rgba[i * 4 + 1];
		const b = rgba[i * 4 + 2];
		const whiteShared = Math.min(r, g, b);

		if (isW) {
			residual[i] = whiteShared;
		} else if (isR) {
			residual[i] = Math.max(0, r - whiteShared);
		} else if (isB) {
			residual[i] = Math.max(0, b - whiteShared);
		} else if (isY) {
			residual[i] = Math.max(0, Math.min(r, g) - whiteShared);
		} else {
			residual[i] = Math.max(0, g - whiteShared);
		}
	}
	return residual;
}

function extractAffinityResidual(
	rgba: Uint8ClampedArray,
	pixelCount: number,
	targetColor: { r: number; g: number; b: number },
	colorMode: 'dark-on-light' | 'light-on-dark',
): Int16Array {
	const residual = new Int16Array(pixelCount);
	const isLightOnDark = colorMode === 'light-on-dark';

	for (let i = 0; i < pixelCount; i++) {
		const r = rgba[i * 4];
		const g = rgba[i * 4 + 1];
		const b = rgba[i * 4 + 2];

		const dist = Math.hypot(
			r - targetColor.r,
			g - targetColor.g,
			b - targetColor.b,
		);
		const affinity = Math.max(0, 255 - dist);
		const luma = 0.299 * r + 0.587 * g + 0.114 * b;

		if (isLightOnDark) {
			residual[i] = Math.round((affinity * luma) / 255);
		} else {
			const darkness = 255 - luma;
			residual[i] = Math.round((affinity * darkness) / 255);
		}
	}
	return residual;
}

export function extractLayerResidual(
	rgba: Uint8ClampedArray,
	pixelCount: number,
	layer: ColorLayer,
	paletteType: string,
	colorMode: 'dark-on-light' | 'light-on-dark',
): Int16Array {
	if (paletteType === 'cmyk') {
		return extractCmykResidual(rgba, pixelCount, layer.id);
	}
	if (paletteType === 'rgbw') {
		return extractRgbwResidual(rgba, pixelCount, layer.id);
	}
	const targetColor = hexToRgb(layer.color);
	return extractAffinityResidual(rgba, pixelCount, targetColor, colorMode);
}
