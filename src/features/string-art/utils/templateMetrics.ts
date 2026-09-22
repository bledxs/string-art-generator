import type { LoomConfig } from '../types';

export const MM_TO_POINTS = 2.83465;

export const BRAND_COLORS = {
	primary: '#1c1917',
	accent: '#b45309',
	secondary: '#fef3c7',
	badgeText: '#92400e',
	muted: '#78716c',
	text: '#292524',
	boxBg: '#fefce8',
	boxBorder: '#fef08a',
};

export function getLoomSkillLevel(pinCount: number): string {
	if (pinCount <= 120) return 'Principiante / Beginner';
	if (pinCount <= 220) return 'Intermedio / Intermediate';
	if (pinCount <= 320) return 'Avanzado / Master Artisan';
	return 'Gran Maestro / Master Weaver';
}

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

export interface TemplatePinPoint {
	id: number;
	x: number;
	y: number;
	lx: number;
	ly: number;
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

export function getCircularPinPoints(
	pinCount: number,
	cx: number,
	cy: number,
	radius: number,
): TemplatePinPoint[] {
	const points: TemplatePinPoint[] = [];
	const angleStep = (2 * Math.PI) / pinCount;
	for (let i = 0; i < pinCount; i++) {
		const angle = i * angleStep - Math.PI / 2;
		const x = cx + radius * Math.cos(angle);
		const y = cy + radius * Math.sin(angle);
		const labelDist = radius + (i === 0 ? 22 : 18);
		points.push({
			id: i,
			x,
			y,
			lx: cx + labelDist * Math.cos(angle),
			ly: cy + labelDist * Math.sin(angle),
		});
	}
	return points;
}

export function getRectangularPinPoints(
	metrics: PhysicalLoomMetrics,
	cx: number,
	cy: number,
): TemplatePinPoint[] {
	const halfW = (metrics.widthMm * MM_TO_POINTS) / 2;
	const halfH = (metrics.heightMm * MM_TO_POINTS) / 2;
	const nH = metrics.nHoriz ?? 10;
	const nV = metrics.nVert ?? 10;
	const pins: TemplatePinPoint[] = [];
	let id = 0;

	// Top Edge
	for (let i = 0; i < nH; i++) {
		const x = cx - halfW + ((i + 0.5) / nH) * (halfW * 2);
		const y = cy - halfH;
		pins.push({ id: id++, x, y, lx: x, ly: y - (id === 1 ? 20 : 16) });
	}
	// Right Edge
	for (let i = 0; i < nV; i++) {
		const x = cx + halfW;
		const y = cy - halfH + ((i + 0.5) / nV) * (halfH * 2);
		pins.push({ id: id++, x, y, lx: x + 16, ly: y });
	}
	// Bottom Edge
	for (let i = 0; i < nH; i++) {
		const x = cx + halfW - ((i + 0.5) / nH) * (halfW * 2);
		const y = cy + halfH;
		pins.push({ id: id++, x, y, lx: x, ly: y + 16 });
	}
	// Left Edge
	for (let i = 0; i < nV; i++) {
		const x = cx - halfW;
		const y = cy + halfH - ((i + 0.5) / nV) * (halfH * 2);
		pins.push({ id: id++, x, y, lx: x - 16, ly: y });
	}
	return pins;
}
