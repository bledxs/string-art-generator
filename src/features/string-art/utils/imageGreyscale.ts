export function extractGreyscaleBuffer(
	rgba: Uint8ClampedArray,
	size: number,
	contrast: number,
	brightness: number,
): Uint8ClampedArray {
	const pixelCount = size * size;
	const output = new Uint8ClampedArray(pixelCount);
	const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));

	for (let i = 0; i < pixelCount; i++) {
		const r = rgba[i * 4];
		const g = rgba[i * 4 + 1];
		const b = rgba[i * 4 + 2];
		const luma = 0.299 * r + 0.587 * g + 0.114 * b;
		const contrasted = factor * (luma - 128) + 128 + brightness;
		output[i] = Math.max(0, Math.min(255, Math.round(contrasted)));
	}
	return output;
}

export function applyCircularMask(
	pixels: Uint8ClampedArray,
	size: number,
	radiusRatio = 0.98,
): void {
	const center = size / 2;
	const maxRadiusSq = (center * radiusRatio) ** 2;

	for (let y = 0; y < size; y++) {
		for (let x = 0; x < size; x++) {
			const dx = x - center;
			const dy = y - center;
			if (dx * dx + dy * dy > maxRadiusSq) {
				pixels[y * size + x] = 255; // Blanco absoluto fuera del bastidor
			}
		}
	}
}
