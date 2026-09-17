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

export function drawStrings(
	ctx: CanvasRenderingContext2D,
	pins: Pin[],
	lines: number[],
	opacity: number,
	lineWeight: number,
	colorMode: 'dark-on-light' | 'light-on-dark' = 'dark-on-light',
): void {
	if (lines.length <= 1 || pins.length === 0) return;
	ctx.save();

	if (colorMode === 'light-on-dark') {
		// Luminous ivory silk thread with natural compounding
		ctx.strokeStyle = `rgba(244, 242, 237, ${opacity})`;
	} else {
		// Warm charcoal cotton thread with compounded opacity
		ctx.strokeStyle = `rgba(18, 14, 11, ${opacity})`;
	}

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
	colorMode: 'dark-on-light' | 'light-on-dark' = 'dark-on-light',
): void {
	if (!showPins || pins.length === 0) return;
	ctx.save();
	const center = pins[0] ? pins[0].x : 350;
	const isLightOnDark = colorMode === 'light-on-dark';

	for (let i = 0; i < pins.length; i++) {
		const pin = pins[i];
		if (isLightOnDark) {
			drawSilverPin(ctx, pin.x, pin.y, center);
		} else {
			drawBrassPin(ctx, pin.x, pin.y, center);
		}
	}

	const active = pins[currentPin];
	if (active) {
		// Active pin: glowing guide ring
		ctx.beginPath();
		ctx.arc(active.x, active.y, 6.5, 0, Math.PI * 2);
		if (isLightOnDark) {
			ctx.strokeStyle = '#38bdf8';
			ctx.shadowColor = 'rgba(56, 189, 248, 0.9)';
		} else {
			ctx.strokeStyle = '#d97706';
			ctx.shadowColor = 'rgba(217, 119, 6, 0.8)';
		}
		ctx.lineWidth = 2;
		ctx.shadowBlur = 8;
		ctx.stroke();
	}
	ctx.restore();
}
