import type { ColorLayer } from '../types';

export {
	COLOR_PALETTES,
	type ColorPalettePreset,
} from '../constants/colorPalettes';

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

function computeCmykChannel(
	rNorm: number,
	gNorm: number,
	bNorm: number,
	layerId: string,
): number {
	const k = 1 - Math.max(rNorm, gNorm, bNorm);
	if (layerId.includes('-k')) return k;
	if (k >= 0.999) return 0;

	const denom = 1 - k;
	if (layerId.includes('-c')) return (1 - rNorm - k) / denom;
	if (layerId.includes('-m')) return (1 - gNorm - k) / denom;
	return (1 - bNorm - k) / denom;
}

function extractCmykResidual(
	rgba: Uint8ClampedArray,
	baseGrey: Uint8ClampedArray,
	pixelCount: number,
	layerId: string,
	colorMode: 'dark-on-light' | 'light-on-dark',
): Int16Array {
	const residual = new Int16Array(pixelCount);
	const isLightOnDark = colorMode === 'light-on-dark';

	for (let i = 0; i < pixelCount; i++) {
		const baseD = isLightOnDark ? baseGrey[i] : 255 - baseGrey[i];
		if (baseD <= 4) continue;

		const channel = computeCmykChannel(
			rgba[i * 4] / 255,
			rgba[i * 4 + 1] / 255,
			rgba[i * 4 + 2] / 255,
			layerId,
		);

		const clamped = Math.max(0, Math.min(1, channel));
		residual[i] = Math.round(clamped * 255);
	}
	return residual;
}

function extractRgbwResidual(
	rgba: Uint8ClampedArray,
	baseGrey: Uint8ClampedArray,
	pixelCount: number,
	layerId: string,
): Int16Array {
	const residual = new Int16Array(pixelCount);
	const isW = layerId.includes('-w');
	const isR = layerId.includes('-r');
	const isB = layerId.includes('-b');

	for (let i = 0; i < pixelCount; i++) {
		const baseD = baseGrey[i];
		if (baseD <= 4) continue;

		const r = rgba[i * 4];
		const g = rgba[i * 4 + 1];
		const b = rgba[i * 4 + 2];

		let affinity = 0.5;
		if (isW) {
			const maxC = Math.max(r, g, b);
			const minC = Math.min(r, g, b);
			const saturation = (maxC - minC) / (maxC + 1);
			affinity = 0.35 + 0.65 * (1 - saturation);
		} else if (isR) {
			const redness = (r - (g + b) / 2 + 255) / 510;
			affinity = 0.25 + 0.75 * Math.max(0, Math.min(1, redness));
		} else if (isB) {
			const blueness = (b - (r + g) / 2 + 255) / 510;
			affinity = 0.25 + 0.75 * Math.max(0, Math.min(1, blueness));
		} else {
			// Gold (Y)
			const goldness = ((r + g) / 2 - b + 255) / 510;
			affinity = 0.25 + 0.75 * Math.max(0, Math.min(1, goldness));
		}

		residual[i] = Math.round(baseD * affinity);
	}
	return residual;
}

function extractSepiaResidual(
	rgba: Uint8ClampedArray,
	baseGrey: Uint8ClampedArray,
	pixelCount: number,
	layerId: string,
	colorMode: 'dark-on-light' | 'light-on-dark',
): Int16Array {
	const residual = new Int16Array(pixelCount);
	const isLightOnDark = colorMode === 'light-on-dark';
	const isDark = layerId.includes('dark');
	const isTerracotta = layerId.includes('terracotta');

	for (let i = 0; i < pixelCount; i++) {
		const baseD = isLightOnDark ? baseGrey[i] : 255 - baseGrey[i];
		if (baseD <= 4) continue;

		const r = rgba[i * 4];
		const b = rgba[i * 4 + 2];

		let affinity = 0.5;
		if (isDark) {
			affinity = 0.4 + 0.6 * Math.sqrt(baseD / 255);
		} else if (isTerracotta) {
			const warmth = (r - b + 255) / 510;
			affinity = 0.25 + 0.75 * Math.max(0, Math.min(1, warmth));
		} else {
			// Cream / highlights
			affinity = 0.25 + 0.75 * ((255 - baseD) / 255);
		}

		residual[i] = Math.round(baseD * affinity);
	}
	return residual;
}

function extractAffinityResidual(
	rgba: Uint8ClampedArray,
	baseGrey: Uint8ClampedArray,
	pixelCount: number,
	targetColor: { r: number; g: number; b: number },
	colorMode: 'dark-on-light' | 'light-on-dark',
): Int16Array {
	const residual = new Int16Array(pixelCount);
	const isLightOnDark = colorMode === 'light-on-dark';

	for (let i = 0; i < pixelCount; i++) {
		const baseD = isLightOnDark ? baseGrey[i] : 255 - baseGrey[i];
		if (baseD <= 4) continue;

		const r = rgba[i * 4];
		const g = rgba[i * 4 + 1];
		const b = rgba[i * 4 + 2];

		const dist = Math.hypot(
			r - targetColor.r,
			g - targetColor.g,
			b - targetColor.b,
		);
		const affinity = 0.25 + 0.75 * Math.max(0, (441.67 - dist) / 441.67);
		residual[i] = Math.round(baseD * affinity);
	}
	return residual;
}

export function extractLayerResidual(
	rgba: Uint8ClampedArray,
	baseGrey: Uint8ClampedArray,
	pixelCount: number,
	layer: ColorLayer,
	paletteType: string,
	colorMode: 'dark-on-light' | 'light-on-dark',
): Int16Array {
	if (paletteType === 'monochrome') {
		const residual = new Int16Array(pixelCount);
		const isLightOnDark = colorMode === 'light-on-dark';
		for (let i = 0; i < pixelCount; i++) {
			residual[i] = isLightOnDark ? baseGrey[i] : 255 - baseGrey[i];
		}
		return residual;
	}

	if (paletteType === 'cmyk') {
		return extractCmykResidual(rgba, baseGrey, pixelCount, layer.id, colorMode);
	}
	if (paletteType === 'rgbw') {
		return extractRgbwResidual(rgba, baseGrey, pixelCount, layer.id);
	}
	if (paletteType === 'warm-sepia') {
		return extractSepiaResidual(
			rgba,
			baseGrey,
			pixelCount,
			layer.id,
			colorMode,
		);
	}
	const targetColor = hexToRgb(layer.color);
	return extractAffinityResidual(
		rgba,
		baseGrey,
		pixelCount,
		targetColor,
		colorMode,
	);
}
