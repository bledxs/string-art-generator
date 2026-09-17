import type { LoomConfig } from '../types';
import { getLoomDimensions } from './pinGeometry';

export function extractGreyscaleBuffer(
	rgba: Uint8ClampedArray,
	size: number,
	contrast: number,
	brightness: number,
	edgeWeight = 0.25,
	colorMode: 'dark-on-light' | 'light-on-dark' = 'dark-on-light',
): Uint8ClampedArray {
	const pixelCount = size * size;
	const output = new Uint8ClampedArray(pixelCount);
	const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
	const isLightOnDark = colorMode === 'light-on-dark';

	for (let i = 0; i < pixelCount; i++) {
		const r = rgba[i * 4];
		const g = rgba[i * 4 + 1];
		const b = rgba[i * 4 + 2];
		const luma = 0.299 * r + 0.587 * g + 0.114 * b;
		const contrasted = factor * (luma - 128) + 128 + brightness;
		output[i] = Math.max(0, Math.min(255, Math.round(contrasted)));
	}

	// If edge enhancement is active, reinforce structural contours using Sobel
	if (edgeWeight > 0.01) {
		const temp = new Uint8ClampedArray(output);
		for (let y = 1; y < size - 1; y++) {
			const yOffset = y * size;
			for (let x = 1; x < size - 1; x++) {
				const idx = yOffset + x;
				// Sobel 3x3 kernel
				const gx =
					temp[idx - size + 1] +
					2 * temp[idx + 1] +
					temp[idx + size + 1] -
					(temp[idx - size - 1] + 2 * temp[idx - 1] + temp[idx + size - 1]);
				const gy =
					temp[idx + size - 1] +
					2 * temp[idx + size] +
					temp[idx + size + 1] -
					(temp[idx - size - 1] + 2 * temp[idx - size] + temp[idx - size + 1]);

				const grad = Math.min(255, (Math.abs(gx) + Math.abs(gy)) >> 2);

				if (isLightOnDark) {
					// Reinforce luminous edges on dark background
					const lightAffinity = temp[idx] / 255;
					const edgeBoost = Math.round(grad * edgeWeight * lightAffinity);
					output[idx] = Math.min(255, output[idx] + edgeBoost);
				} else {
					// Reinforce dark edges without dirtying bright highlights
					const darkAffinity = (255 - temp[idx]) / 255;
					const edgeBoost = Math.round(grad * edgeWeight * darkAffinity);
					output[idx] = Math.max(0, output[idx] - edgeBoost);
				}
			}
		}
	}

	return output;
}

export function applyCircularMask(
	pixels: Uint8ClampedArray,
	size: number,
	radiusRatio = 0.98,
	vignetteRatio = 0.82,
	colorMode: 'dark-on-light' | 'light-on-dark' = 'dark-on-light',
): void {
	const center = size / 2;
	const maxRadius = center * radiusRatio;
	const maxRadiusSq = maxRadius * maxRadius;
	const vignetteStart = maxRadius * vignetteRatio;
	const fadeRange = maxRadius - vignetteStart;
	const bgVal = colorMode === 'light-on-dark' ? 0 : 255;

	for (let y = 0; y < size; y++) {
		const dy = y - center;
		const dySq = dy * dy;
		const rowOffset = y * size;

		for (let x = 0; x < size; x++) {
			const dx = x - center;
			const distSq = dx * dx + dySq;
			const idx = rowOffset + x;

			if (distSq >= maxRadiusSq) {
				pixels[idx] = bgVal;
			} else if (distSq > vignetteStart * vignetteStart) {
				const dist = Math.sqrt(distSq);
				const t = (dist - vignetteStart) / fadeRange;
				const smoothT = t * t * (3 - 2 * t);
				pixels[idx] = Math.max(
					0,
					Math.min(
						255,
						Math.round(pixels[idx] * (1 - smoothT) + bgVal * smoothT),
					),
				);
			}
		}
	}
}

export function applyRectangularMask(
	pixels: Uint8ClampedArray,
	size: number,
	width: number,
	height: number,
	colorMode: 'dark-on-light' | 'light-on-dark' = 'dark-on-light',
): void {
	const center = size / 2;
	const halfW = width / 2;
	const halfH = height / 2;
	const x0 = center - halfW;
	const x1 = center + halfW;
	const y0 = center - halfH;
	const y1 = center + halfH;
	const bgVal = colorMode === 'light-on-dark' ? 0 : 255;
	const fade = 6;

	for (let y = 0; y < size; y++) {
		const rowOffset = y * size;
		for (let x = 0; x < size; x++) {
			const idx = rowOffset + x;
			if (x < x0 || x > x1 || y < y0 || y > y1) {
				pixels[idx] = bgVal;
			} else {
				const distEdgeX = Math.min(x - x0, x1 - x);
				const distEdgeY = Math.min(y - y0, y1 - y);
				const distMin = Math.min(distEdgeX, distEdgeY);
				if (distMin < fade) {
					const t = distMin / fade;
					const smoothT = t * t * (3 - 2 * t);
					pixels[idx] = Math.max(
						0,
						Math.min(
							255,
							Math.round(pixels[idx] * smoothT + bgVal * (1 - smoothT)),
						),
					);
				}
			}
		}
	}
}

export function applyLoomMask(
	pixels: Uint8ClampedArray,
	size: number,
	loomConfig: LoomConfig,
	colorMode: 'dark-on-light' | 'light-on-dark' = 'dark-on-light',
): void {
	if (loomConfig.shape === 'rectangle') {
		const dims = getLoomDimensions(
			size,
			loomConfig.pinOffsetRatio,
			'rectangle',
			loomConfig.aspectRatio ?? '1:1',
		);
		applyRectangularMask(pixels, size, dims.width, dims.height, colorMode);
	} else {
		applyCircularMask(pixels, size, loomConfig.pinOffsetRatio, 0.82, colorMode);
	}
}
