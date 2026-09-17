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
