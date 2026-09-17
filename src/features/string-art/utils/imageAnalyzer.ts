import { THREAD_MATERIALS, type ThreadMaterial } from './threadMaterials';

export interface ImageMetrics {
	meanLuminance: number; // 0 - 255
	contrastStdDev: number; // 0 - 128
	edgeDensity: number; // 0 - 1 ratio of high frequency edges
}

export interface CalibrationRecommendation {
	pinCount: number;
	maxLines: number;
	lineWeight: number;
	opacityStep: number;
	contrast: number;
	brightness: number;
	minDistance: number;
	edgeWeight?: number;
	whitePenalty?: number;
	material: ThreadMaterial;
	reasoning: string;
}

export function computeLuminanceStats(
	pixels: Uint8ClampedArray,
	step = 4,
): { mean: number; stdDev: number } {
	let sum = 0;
	let count = 0;
	for (let i = 0; i < pixels.length; i += 4 * step) {
		const lum =
			0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2];
		sum += lum;
		count++;
	}
	const mean = count > 0 ? sum / count : 128;

	let varianceSum = 0;
	for (let i = 0; i < pixels.length; i += 4 * step) {
		const lum =
			0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2];
		varianceSum += (lum - mean) ** 2;
	}
	const stdDev = count > 0 ? Math.sqrt(varianceSum / count) : 40;
	return { mean: Math.round(mean), stdDev: Math.round(stdDev) };
}

export function computeEdgeDensity(
	pixels: Uint8ClampedArray,
	width: number,
	height: number,
	sampleStep = 4,
): number {
	let edgeCount = 0;
	let sampledCount = 0;

	for (let y = 1; y < height - 1; y += sampleStep) {
		for (let x = 1; x < width - 1; x += sampleStep) {
			const idxR = (y * width + (x + 1)) * 4;
			const idxL = (y * width + (x - 1)) * 4;
			const idxD = ((y + 1) * width + x) * 4;
			const idxU = ((y - 1) * width + x) * 4;

			const lumR = 0.299 * pixels[idxR] + 0.587 * pixels[idxR + 1];
			const lumL = 0.299 * pixels[idxL] + 0.587 * pixels[idxL + 1];
			const lumD = 0.299 * pixels[idxD] + 0.587 * pixels[idxD + 1];
			const lumU = 0.299 * pixels[idxU] + 0.587 * pixels[idxU + 1];

			const gx = lumR - lumL;
			const gy = lumD - lumU;
			const grad = Math.abs(gx) + Math.abs(gy);

			if (grad > 45) edgeCount++;
			sampledCount++;
		}
	}
	return sampledCount > 0 ? edgeCount / sampledCount : 0.15;
}

export const estimateEdgeDensity = computeEdgeDensity;

export function deriveOptimalParameters(
	metrics: ImageMetrics,
): CalibrationRecommendation {
	const isHighDetail = metrics.edgeDensity > 0.14;
	const isLowContrast = metrics.contrastStdDev < 42;

	let pinCount = isHighDetail ? 280 : 220;
	if (metrics.edgeDensity > 0.22) pinCount = 320;

	let material = THREAD_MATERIALS[1]; // Algodón Estándar #40
	let maxLines = 2000;

	if (isHighDetail) {
		material = THREAD_MATERIALS[0]; // Seda Ultrafina
		maxLines = 2400;
	} else if (metrics.edgeDensity < 0.08) {
		material = THREAD_MATERIALS[2]; // Bordado Grueso
		maxLines = 1400;
	}

	const contrast = isLowContrast ? 35 : 15;
	const brightness = metrics.meanLuminance < 110 ? 10 : 0;
	const minDistance = Math.round(pinCount * 0.08);
	const edgeWeight = isHighDetail ? 0.35 : 0.2;
	const whitePenalty = 1.3;

	const reasoning = isHighDetail
		? 'Alta frecuencia de bordes y micro-detalles. Se recomiendan más clavos con hilo fino y realce de bordes para máxima nitidez sin exceso de hilo.'
		: 'Trazos amplios y geometría fluida. Se recomienda hilo de cuerpo medio con protección de blancos para evitar sobre-densidad.';

	return {
		pinCount,
		maxLines,
		lineWeight: material.lineWeight,
		opacityStep: material.recommendedOpacity,
		contrast,
		brightness,
		minDistance,
		edgeWeight,
		whitePenalty,
		material,
		reasoning,
	};
}
