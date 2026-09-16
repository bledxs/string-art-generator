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
): boolean {
	return getCircularPinDistance(pinA, pinB, totalPins) >= minDistance;
}
