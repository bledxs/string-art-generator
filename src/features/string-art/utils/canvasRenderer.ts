import type { Pin } from '../types';
import { drawBirchBoard, drawBrassPin, drawRadialTicks } from './loomMaterials';

export function drawLoomBackground(
	ctx: CanvasRenderingContext2D,
	size: number,
): void {
	const center = size / 2;
	const radius = center * 0.93;

	drawBirchBoard(ctx, center, radius);
	drawRadialTicks(ctx, center, radius);
}

export function drawStrings(
	ctx: CanvasRenderingContext2D,
	pins: Pin[],
	lines: number[],
	opacity: number,
	lineWeight: number,
): void {
	if (lines.length <= 1 || pins.length === 0) return;
	ctx.save();
	// Warm charcoal cotton thread with compounded opacity
	ctx.strokeStyle = `rgba(18, 14, 11, ${opacity})`;
	ctx.lineWidth = lineWeight;
	ctx.lineCap = 'round';

	for (let i = 1; i < lines.length; i++) {
		const from = pins[lines[i - 1]];
		const to = pins[lines[i]];
		if (from && to) {
			ctx.beginPath();
			ctx.moveTo(from.x, from.y);
			ctx.lineTo(to.x, to.y);
			ctx.stroke();
		}
	}
	ctx.restore();
}

export function drawPins(
	ctx: CanvasRenderingContext2D,
	pins: Pin[],
	currentPin: number,
	showPins: boolean,
): void {
	if (!showPins || pins.length === 0) return;
	ctx.save();
	const center = pins[0] ? pins[0].x : 350;

	for (let i = 0; i < pins.length; i++) {
		const pin = pins[i];
		drawBrassPin(ctx, pin.x, pin.y, center);
	}

	const active = pins[currentPin];
	if (active) {
		// Active pin: glowing guide ring
		ctx.beginPath();
		ctx.arc(active.x, active.y, 6.5, 0, Math.PI * 2);
		ctx.strokeStyle = '#d97706';
		ctx.lineWidth = 2;
		ctx.shadowColor = 'rgba(217, 119, 6, 0.8)';
		ctx.shadowBlur = 8;
		ctx.stroke();
	}
	ctx.restore();
}
