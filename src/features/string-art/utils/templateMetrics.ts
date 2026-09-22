import type { LoomConfig } from '../types';

export interface PhysicalLoomMetrics {
	shape: 'circle' | 'rectangle';
	pinCount: number;
	widthMm: number;
	heightMm: number;
	radiusMm: number;
	perimeterMm: number;
	pinSpacingMm: number;
	aspectRatio?: string;
	nHoriz?: number;
	nVert?: number;
}

export interface PhysicalPin {
	id: number;
	x: number;
	y: number;
	nx: number;
	ny: number;
}

export function calculatePhysicalLoomMetrics(
	loom: LoomConfig,
): PhysicalLoomMetrics {
	if (loom.shape === 'circle') {
		const diameterMm = loom.physicalDiameterCm * 10;
		const radiusMm = diameterMm / 2;
		const perimeterMm = Math.PI * diameterMm;
		return {
			shape: 'circle',
			pinCount: loom.pinCount,
			widthMm: diameterMm,
			heightMm: diameterMm,
			radiusMm,
			perimeterMm,
			pinSpacingMm: perimeterMm / loom.pinCount,
		};
	}

	const baseMm = loom.physicalDiameterCm * 10;
	const ratio = loom.aspectRatio ?? '1:1';
	let widthMm = baseMm;
	let heightMm = baseMm;

	if (ratio === '4:3') {
		heightMm = baseMm * 0.75;
	} else if (ratio === '3:4') {
		widthMm = baseMm * 0.75;
	} else if (ratio === '16:9') {
		heightMm = baseMm * (9 / 16);
	}

	const perimHalf = widthMm + heightMm;
	const nHoriz = Math.max(
		10,
		Math.round((loom.pinCount / 2) * (widthMm / perimHalf)),
	);
	const nVert = Math.max(
		10,
		Math.round((loom.pinCount / 2) * (heightMm / perimHalf)),
	);
	const actualPins = 2 * (nHoriz + nVert);
	const perimeterMm = 2 * (widthMm + heightMm);

	return {
		shape: 'rectangle',
		pinCount: actualPins,
		widthMm,
		heightMm,
		radiusMm: Math.min(widthMm, heightMm) / 2,
		perimeterMm,
		pinSpacingMm: perimeterMm / actualPins,
		aspectRatio: ratio,
		nHoriz,
		nVert,
	};
}

export function calculatePhysicalPins(
	metrics: PhysicalLoomMetrics,
	cx: number,
	cy: number,
): PhysicalPin[] {
	if (metrics.shape === 'circle') {
		return calculateCircularPhysicalPins(
			metrics.pinCount,
			metrics.radiusMm,
			cx,
			cy,
		);
	}
	return calculateRectangularPhysicalPins(metrics, cx, cy);
}

function calculateCircularPhysicalPins(
	pinCount: number,
	radius: number,
	cx: number,
	cy: number,
): PhysicalPin[] {
	const pins: PhysicalPin[] = [];
	const angleStep = (2 * Math.PI) / pinCount;

	for (let i = 0; i < pinCount; i++) {
		const angle = i * angleStep - Math.PI / 2;
		const nx = Math.cos(angle);
		const ny = Math.sin(angle);
		pins.push({
			id: i,
			x: cx + radius * nx,
			y: cy + radius * ny,
			nx,
			ny,
		});
	}
	return pins;
}

function calculateRectangularPhysicalPins(
	metrics: PhysicalLoomMetrics,
	cx: number,
	cy: number,
): PhysicalPin[] {
	const pins: PhysicalPin[] = [];
	const halfW = metrics.widthMm / 2;
	const halfH = metrics.heightMm / 2;
	const x0 = cx - halfW;
	const x1 = cx + halfW;
	const y0 = cy - halfH;
	const y1 = cy + halfH;
	const nH = metrics.nHoriz ?? 10;
	const nV = metrics.nVert ?? 10;

	let id = 0;
	// 1. Top Edge: Left -> Right
	for (let i = 0; i < nH; i++) {
		pins.push({
			id: id++,
			x: x0 + ((i + 0.5) / nH) * metrics.widthMm,
			y: y0,
			nx: 0,
			ny: -1,
		});
	}
	// 2. Right Edge: Top -> Bottom
	for (let i = 0; i < nV; i++) {
		pins.push({
			id: id++,
			x: x1,
			y: y0 + ((i + 0.5) / nV) * metrics.heightMm,
			nx: 1,
			ny: 0,
		});
	}
	// 3. Bottom Edge: Right -> Left
	for (let i = 0; i < nH; i++) {
		pins.push({
			id: id++,
			x: x1 - ((i + 0.5) / nH) * metrics.widthMm,
			y: y1,
			nx: 0,
			ny: 1,
		});
	}
	// 4. Left Edge: Bottom -> Top
	for (let i = 0; i < nV; i++) {
		pins.push({
			id: id++,
			x: x0,
			y: y1 - ((i + 0.5) / nV) * metrics.heightMm,
			nx: -1,
			ny: 0,
		});
	}
	return pins;
}
