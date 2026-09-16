export function rasterizeLine(
	x0: number,
	y0: number,
	x1: number,
	y1: number,
	size: number,
): Uint32Array {
	const points: number[] = [];
	let currX = Math.round(x0);
	let currY = Math.round(y0);
	const targetX = Math.round(x1);
	const targetY = Math.round(y1);

	const dx = Math.abs(targetX - currX);
	const dy = Math.abs(targetY - currY);
	const sx = currX < targetX ? 1 : -1;
	const sy = currY < targetY ? 1 : -1;
	let err = dx - dy;

	while (true) {
		if (currX >= 0 && currX < size && currY >= 0 && currY < size) {
			points.push(currY * size + currX);
		}
		if (currX === targetX && currY === targetY) break;
		const e2 = 2 * err;
		if (e2 > -dy) {
			err -= dy;
			currX += sx;
		}
		if (e2 < dx) {
			err += dx;
			currY += sy;
		}
	}
	return new Uint32Array(points);
}

export function calculateLineScore(
	pixels: Uint8ClampedArray,
	lineIndices: Uint32Array,
): number {
	if (lineIndices.length === 0) return 0;
	let totalDarkness = 0;
	for (let i = 0; i < lineIndices.length; i++) {
		const idx = lineIndices[i];
		// Pixel values are 0 (black) to 255 (white). Darkness is 255 - value.
		totalDarkness += 255 - pixels[idx];
	}
	return totalDarkness / lineIndices.length;
}

export function applyLineToPixels(
	pixels: Uint8ClampedArray,
	lineIndices: Uint32Array,
	opacityStep: number,
): void {
	for (let i = 0; i < lineIndices.length; i++) {
		const idx = lineIndices[i];
		// Thread lightens target error buffer
		pixels[idx] = Math.min(255, pixels[idx] + opacityStep);
	}
}

export function getLineSymmetricKey(pinA: number, pinB: number): number {
	const min = pinA < pinB ? pinA : pinB;
	const max = pinA < pinB ? pinB : pinA;
	return min * 100000 + max;
}
