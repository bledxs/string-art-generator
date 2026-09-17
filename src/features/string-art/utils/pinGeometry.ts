import type { Pin } from '../types';

export function calculateCircularPins(
	pinCount: number,
	radius: number,
	center: { x: number; y: number },
): Pin[] {
	const pins: Pin[] = [];
	const angleStep = (2 * Math.PI) / pinCount;

	for (let i = 0; i < pinCount; i++) {
		const angle = i * angleStep - Math.PI / 2;
		pins.push({
			id: i,
			x: center.x + radius * Math.cos(angle),
			y: center.y + radius * Math.sin(angle),
			angle,
			edge: 'circle',
		});
	}
	return pins;
}

export function calculateRectangularPins(
	pinCount: number,
	width: number,
	height: number,
	center: { x: number; y: number },
): Pin[] {
	const pins: Pin[] = [];
	const halfW = width / 2;
	const halfH = height / 2;
	const x0 = center.x - halfW;
	const x1 = center.x + halfW;
	const y0 = center.y - halfH;
	const y1 = center.y + halfH;

	// Distribute pins proportionally along horizontal and vertical edges
	const perimHalf = width + height;
	const nHoriz = Math.max(10, Math.round((pinCount / 2) * (width / perimHalf)));
	const nVert = Math.max(10, Math.round((pinCount / 2) * (height / perimHalf)));

	let currentId = 0;

	// 1. Top Edge: Left -> Right
	for (let i = 0; i < nHoriz; i++) {
		const x = x0 + ((i + 0.5) / nHoriz) * width;
		const y = y0;
		pins.push({
			id: currentId++,
			x,
			y,
			angle: Math.atan2(y - center.y, x - center.x),
			edge: 'top',
		});
	}

	// 2. Right Edge: Top -> Bottom
	for (let i = 0; i < nVert; i++) {
		const x = x1;
		const y = y0 + ((i + 0.5) / nVert) * height;
		pins.push({
			id: currentId++,
			x,
			y,
			angle: Math.atan2(y - center.y, x - center.x),
			edge: 'right',
		});
	}

	// 3. Bottom Edge: Right -> Left
	for (let i = 0; i < nHoriz; i++) {
		const x = x1 - ((i + 0.5) / nHoriz) * width;
		const y = y1;
		pins.push({
			id: currentId++,
			x,
			y,
			angle: Math.atan2(y - center.y, x - center.x),
			edge: 'bottom',
		});
	}

	// 4. Left Edge: Bottom -> Top
	for (let i = 0; i < nVert; i++) {
		const x = x0;
		const y = y1 - ((i + 0.5) / nVert) * height;
		pins.push({
			id: currentId++,
			x,
			y,
			angle: Math.atan2(y - center.y, x - center.x),
			edge: 'left',
		});
	}

	return pins;
}

export function getCircularPinDistance(
	pinA: number,
	pinB: number,
	totalPins: number,
): number {
	const diff = Math.abs(pinA - pinB);
	return Math.min(diff, totalPins - diff);
}

export function isPinPairValid(
	pinA: number,
	pinB: number,
	totalPins: number,
	minDistance: number,
	pins?: Pin[],
): boolean {
	if (pins?.[pinA] && pins?.[pinB]) {
		const edgeA = pins[pinA].edge;
		const edgeB = pins[pinB].edge;
		// In rectangular looms, never allow lines between pins on the exact same straight edge
		if (edgeA && edgeB && edgeA !== 'circle' && edgeA === edgeB) {
			return false;
		}
	}
	return getCircularPinDistance(pinA, pinB, totalPins) >= minDistance;
}

export function getLoomDimensions(
	canvasSize: number,
	offsetRatio: number,
	shape: 'circle' | 'rectangle',
	aspectRatio: '1:1' | '3:4' | '4:3' | '16:9' = '1:1',
): { width: number; height: number; radius: number } {
	const base = canvasSize * offsetRatio;
	if (shape === 'circle') {
		const radius = (canvasSize / 2) * offsetRatio;
		return { width: base, height: base, radius };
	}

	let w = base;
	let h = base;
	if (aspectRatio === '4:3') {
		h = base * (3 / 4);
	} else if (aspectRatio === '3:4') {
		w = base * (3 / 4);
	} else if (aspectRatio === '16:9') {
		h = base * (9 / 16);
	}
	return { width: w, height: h, radius: Math.min(w, h) / 2 };
}
