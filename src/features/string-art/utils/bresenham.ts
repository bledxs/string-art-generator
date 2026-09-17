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
	residual: Int16Array,
	lineIndices: Uint32Array,
	opacityStep: number,
	whitePenalty = 1.3,
): number {
	const len = lineIndices.length;
	if (len === 0) return -Infinity;

	let totalGain = 0;

	for (let i = 0; i < len; i++) {
		const r = residual[lineIndices[i]];
		// Squared error reduction: Delta E = 2 * r - opacityStep
		if (r > 0) {
			totalGain += 2 * r - opacityStep;
		} else {
			// When r <= 0, placing thread over-darkens, apply whitePenalty
			totalGain += Math.round((2 * r - opacityStep) * whitePenalty);
		}
	}

	return totalGain;
}

export function applyLineToPixels(
	residual: Int16Array,
	lineIndices: Uint32Array,
	opacityStep: number,
): void {
	const len = lineIndices.length;
	for (let i = 0; i < len; i++) {
		residual[lineIndices[i]] -= opacityStep;
	}
}

export function getLineSymmetricKey(pinA: number, pinB: number): number {
	const min = pinA < pinB ? pinA : pinB;
	const max = pinA < pinB ? pinB : pinA;
	return min * 100000 + max;
}
