import type { LoomConfig, Pin } from '../types';
import {
	drawBirchBoard,
	drawBrassPin,
	drawEbonyBoard,
	drawRadialTicks,
	drawRectangularBirchBoard,
	drawRectangularEbonyBoard,
	drawSilverPin,
} from './loomMaterials';
import { getLoomDimensions } from './pinGeometry';

export function drawLoomBackground(
	ctx: CanvasRenderingContext2D,
	size: number,
	colorMode: 'dark-on-light' | 'light-on-dark' = 'dark-on-light',
	loomConfig?: LoomConfig,
): void {
	const center = size / 2;
	const isLightOnDark = colorMode === 'light-on-dark';

	if (loomConfig?.shape === 'rectangle') {
		const dims = getLoomDimensions(
			size,
			loomConfig.pinOffsetRatio,
			'rectangle',
			loomConfig.aspectRatio ?? '1:1',
		);
		if (isLightOnDark) {
			drawRectangularEbonyBoard(ctx, center, dims.width, dims.height);
		} else {
			drawRectangularBirchBoard(ctx, center, dims.width, dims.height);
		}
	} else {
		const radius = center * (loomConfig?.pinOffsetRatio ?? 0.93);
		if (isLightOnDark) {
			drawEbonyBoard(ctx, center, radius);
		} else {
			drawBirchBoard(ctx, center, radius);
		}
		drawRadialTicks(ctx, center, radius);
	}
}

function hexToRgba(hex: string, opacity: number): string {
	const sanitized = hex.replace('#', '');
	const num = Number.parseInt(
		sanitized.length === 3
			? sanitized
					.split('')
					.map((c) => c + c)
					.join('')
			: sanitized,
		16,
	);
	const r = (num >> 16) & 255;
	const g = (num >> 8) & 255;
	const b = num & 255;
	return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function drawSegmentsRange(
	ctx: CanvasRenderingContext2D,
	pins: Pin[],
	lines: number[],
	start: number,
	end: number,
): void {
	for (let i = start; i < end; i++) {
		const from = pins[lines[i - 1]];
		const to = pins[lines[i]];
		if (from && to) {
			ctx.beginPath();
			ctx.moveTo(from.x, from.y);
			ctx.lineTo(to.x, to.y);
			ctx.stroke();
		}
	}
}

function drawColorRunsStrings(
	ctx: CanvasRenderingContext2D,
	pins: Pin[],
	lines: number[],
	opacity: number,
	colorRuns: import('../types').ColorRun[],
): void {
	for (const run of colorRuns) {
		const start = Math.max(1, run.startIndex);
		const end = Math.min(lines.length, run.endIndex + 1);
		if (start >= end) continue;

		ctx.strokeStyle = hexToRgba(run.color, opacity);
		drawSegmentsRange(ctx, pins, lines, start, end);
	}
}

function drawSingleColorStrings(
	ctx: CanvasRenderingContext2D,
	pins: Pin[],
	lines: number[],
	opacity: number,
	colorMode: 'dark-on-light' | 'light-on-dark',
): void {
	ctx.strokeStyle =
		colorMode === 'light-on-dark'
			? `rgba(244, 242, 237, ${opacity})`
			: `rgba(18, 14, 11, ${opacity})`;

	drawSegmentsRange(ctx, pins, lines, 1, lines.length);
}

export function drawStrings(
	ctx: CanvasRenderingContext2D,
	pins: Pin[],
	lines: number[],
	opacity: number,
	lineWeight: number,
	colorMode: 'dark-on-light' | 'light-on-dark' = 'dark-on-light',
	colorRuns?: import('../types').ColorRun[],
): void {
	if (lines.length <= 1 || pins.length === 0) return;
	ctx.save();
	ctx.lineWidth = lineWeight;
	ctx.lineCap = 'round';

	if (colorRuns && colorRuns.length > 0) {
		drawColorRunsStrings(ctx, pins, lines, opacity, colorRuns);
	} else {
		drawSingleColorStrings(ctx, pins, lines, opacity, colorMode);
	}
	ctx.restore();
}

function drawPinZeroBadge(
	ctx: CanvasRenderingContext2D,
	pinZero: Pin,
	centerX: number,
	centerY: number,
	isLightOnDark: boolean,
): void {
	ctx.beginPath();
	ctx.arc(pinZero.x, pinZero.y, 5.5, 0, Math.PI * 2);
	ctx.strokeStyle = isLightOnDark ? '#f87171' : '#dc2626';
	ctx.lineWidth = 1.8;
	ctx.stroke();

	ctx.font = 'bold 9px ui-monospace, monospace';
	ctx.fillStyle = isLightOnDark ? '#fca5a5' : '#b91c1c';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	const dx = pinZero.x - centerX;
	const dy = pinZero.y - centerY;
	const dist = Math.hypot(dx, dy) || 1;
	ctx.fillText('0', pinZero.x + (dx / dist) * 12, pinZero.y + (dy / dist) * 12);
}

function drawActivePinRing(
	ctx: CanvasRenderingContext2D,
	active: Pin,
	isLightOnDark: boolean,
): void {
	ctx.beginPath();
	ctx.arc(active.x, active.y, 6.5, 0, Math.PI * 2);
	ctx.strokeStyle = isLightOnDark ? '#38bdf8' : '#d97706';
	ctx.shadowColor = isLightOnDark
		? 'rgba(56, 189, 248, 0.9)'
		: 'rgba(217, 119, 6, 0.8)';
	ctx.lineWidth = 2;
	ctx.shadowBlur = 8;
	ctx.stroke();
}

export function drawPins(
	ctx: CanvasRenderingContext2D,
	pins: Pin[],
	currentPin: number,
	showPins: boolean,
	colorMode: 'dark-on-light' | 'light-on-dark' = 'dark-on-light',
): void {
	if (!showPins || pins.length === 0) return;
	ctx.save();
	const centerX = ctx.canvas?.width ? ctx.canvas.width / 2 : 350;
	const centerY = ctx.canvas?.height ? ctx.canvas.height / 2 : 350;
	const isLightOnDark = colorMode === 'light-on-dark';

	for (const pin of pins) {
		if (isLightOnDark) {
			drawSilverPin(ctx, pin.x, pin.y, centerX);
		} else {
			drawBrassPin(ctx, pin.x, pin.y, centerX);
		}
	}

	if (pins[0]) {
		drawPinZeroBadge(ctx, pins[0], centerX, centerY, isLightOnDark);
	}

	if (pins[currentPin]) {
		drawActivePinRing(ctx, pins[currentPin], isLightOnDark);
	}
	ctx.restore();
}
