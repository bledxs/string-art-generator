'use client';

import { useEffect, useRef } from 'react';
import type { LoomConfig, Pin } from '../../types';
import {
	drawLoomBackground,
	drawPins,
	drawStrings,
} from '../../utils/canvasRenderer';

interface StudioCanvasProps {
	size: number;
	pins: Pin[];
	lines: number[];
	currentPin: number;
	lineWeight: number;
	opacity: number;
	showPins?: boolean;
	colorMode?: 'dark-on-light' | 'light-on-dark';
	loomConfig?: LoomConfig;
}

export function StudioCanvas({
	size,
	pins,
	lines,
	currentPin,
	lineWeight,
	opacity,
	showPins = true,
	colorMode = 'dark-on-light',
	loomConfig,
}: Readonly<StudioCanvasProps>) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		ctx.clearRect(0, 0, size, size);
		drawLoomBackground(ctx, size, colorMode, loomConfig);
		drawStrings(ctx, pins, lines, opacity, lineWeight, colorMode);
		drawPins(ctx, pins, currentPin, showPins, colorMode);
	}, [
		size,
		pins,
		lines,
		currentPin,
		lineWeight,
		opacity,
		showPins,
		colorMode,
		loomConfig,
	]);

	const isRect = loomConfig?.shape === 'rectangle';

	return (
		<canvas
			ref={canvasRef}
			width={size}
			height={size}
			className={`${isRect ? 'rounded-xl' : 'rounded-full'} shadow-2xl transition-shadow`}
			style={{ width: size, height: size }}
		/>
	);
}
