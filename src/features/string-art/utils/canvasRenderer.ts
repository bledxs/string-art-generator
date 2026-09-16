import type { Pin } from '../types';

export function drawLoomBackground(
	ctx: CanvasRenderingContext2D,
	size: number,
): void {
	const center = size / 2;
	const radius = center * 0.95;

	ctx.save();
	ctx.beginPath();
	ctx.arc(center, center, radius, 0, Math.PI * 2);
	ctx.fillStyle = '#ffffff';
	ctx.shadowColor = 'rgba(0,0,0,0.15)';
	ctx.shadowBlur = 18;
	ctx.shadowOffsetY = 4;
	ctx.fill();
	ctx.restore();

	ctx.beginPath();
	ctx.arc(center, center, radius, 0, Math.PI * 2);
	ctx.strokeStyle = '#e2e8f0';
	ctx.lineWidth = 2;
	ctx.stroke();
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
	ctx.beginPath();
	ctx.strokeStyle = `rgba(15, 23, 42, ${opacity})`;
	ctx.lineWidth = lineWeight;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'round';

	const first = pins[lines[0]];
	if (first) ctx.moveTo(first.x, first.y);

	for (let i = 1; i < lines.length; i++) {
		const pin = pins[lines[i]];
		if (pin) ctx.lineTo(pin.x, pin.y);
	}
	ctx.stroke();
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
	for (let i = 0; i < pins.length; i++) {
		const pin = pins[i];
		ctx.beginPath();
		ctx.arc(pin.x, pin.y, 1.5, 0, Math.PI * 2);
		ctx.fillStyle = i === currentPin ? '#ef4444' : '#94a3b8';
		ctx.fill();
	}
	const active = pins[currentPin];
	if (active) {
		ctx.beginPath();
		ctx.arc(active.x, active.y, 5, 0, Math.PI * 2);
		ctx.strokeStyle = 'rgba(239, 68, 68, 0.8)';
		ctx.lineWidth = 1.5;
		ctx.stroke();
	}
	ctx.restore();
}
