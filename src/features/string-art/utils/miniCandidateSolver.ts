import type { AlgorithmConfig, Pin } from '../types';
import {
	applyLineToPixels,
	calculateLineScore,
	rasterizeLine,
} from './bresenham';
import { calculateCircularPins } from './pinGeometry';

const MINI_SIZE = 160;
const MINI_PINS = 96;
const MINI_LINES = 320;

function createMiniPins(): Pin[] {
	const center = { x: MINI_SIZE / 2, y: MINI_SIZE / 2 };
	const radius = (MINI_SIZE / 2) * 0.94;
	return calculateCircularPins(MINI_PINS, radius, center);
}

function prepareGrayscaleBuffer(
	img: HTMLImageElement,
	contrast: number,
	isLightOnDark: boolean,
): Int16Array {
	const off = document.createElement('canvas');
	off.width = MINI_SIZE;
	off.height = MINI_SIZE;
	const ctx = off.getContext('2d');
	if (!ctx) return new Int16Array(MINI_SIZE * MINI_SIZE);

	ctx.drawImage(img, 0, 0, MINI_SIZE, MINI_SIZE);
	const imgData = ctx.getImageData(0, 0, MINI_SIZE, MINI_SIZE);
	const data = imgData.data;
	const out = new Int16Array(MINI_SIZE * MINI_SIZE);
	const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));

	for (let i = 0; i < out.length; i++) {
		const r = data[i * 4];
		const g = data[i * 4 + 1];
		const b = data[i * 4 + 2];
		let lum = 0.299 * r + 0.587 * g + 0.114 * b;
		lum = factor * (lum - 128) + 128;
		lum = Math.max(0, Math.min(255, lum));
		out[i] = isLightOnDark ? Math.round(lum) : Math.round(255 - lum);
	}
	return out;
}

function findBestNextPin(
	currentPin: Pin,
	pins: Pin[],
	pixels: Int16Array,
	opacityStep: number,
): { nextPin: Pin; raster: Uint32Array } {
	let bestScore = -Infinity;
	let bestPin = pins[0];
	let bestRaster: Uint32Array = new Uint32Array(0);

	for (let i = 0; i < pins.length; i++) {
		const candidate = pins[i];
		const dist = Math.abs(candidate.id - currentPin.id);
		if (Math.min(dist, pins.length - dist) < 8) continue;

		const raster = rasterizeLine(
			currentPin.x,
			currentPin.y,
			candidate.x,
			candidate.y,
			MINI_SIZE,
		);
		const score = calculateLineScore(pixels, raster, opacityStep, 1.3);
		if (score > bestScore) {
			bestScore = score;
			bestPin = candidate;
			bestRaster = raster;
		}
	}
	return { nextPin: bestPin, raster: bestRaster };
}

function renderLinesToDataUrl(
	lines: number[],
	pins: Pin[],
	isLightOnDark: boolean,
): string {
	const canvas = document.createElement('canvas');
	canvas.width = MINI_SIZE;
	canvas.height = MINI_SIZE;
	const ctx = canvas.getContext('2d');
	if (!ctx) return '';

	ctx.fillStyle = isLightOnDark ? '#0f172a' : '#fcfbf7';
	ctx.fillRect(0, 0, MINI_SIZE, MINI_SIZE);

	ctx.strokeStyle = isLightOnDark
		? 'rgba(248, 250, 252, 0.35)'
		: 'rgba(15, 23, 42, 0.35)';
	ctx.lineWidth = 0.55;
	ctx.beginPath();

	for (let i = 1; i < lines.length; i++) {
		const p1 = pins[lines[i - 1]];
		const p2 = pins[lines[i]];
		ctx.moveTo(p1.x, p1.y);
		ctx.lineTo(p2.x, p2.y);
	}
	ctx.stroke();

	return canvas.toDataURL('image/webp', 0.8);
}

export function generateMiniCandidatePreview(
	img: HTMLImageElement,
	config: Partial<AlgorithmConfig>,
): string {
	const pins = createMiniPins();
	const isLightOnDark = config.colorMode === 'light-on-dark';
	const pixels = prepareGrayscaleBuffer(
		img,
		config.contrast ?? 15,
		isLightOnDark,
	);
	const lines: number[] = [0];
	let currentPin = pins[0];
	const opacityStep = config.opacityStep ?? 25;

	for (let step = 0; step < MINI_LINES; step++) {
		const { nextPin, raster } = findBestNextPin(
			currentPin,
			pins,
			pixels,
			opacityStep,
		);
		applyLineToPixels(pixels, raster, opacityStep);
		lines.push(nextPin.id);
		currentPin = nextPin;
	}

	return renderLinesToDataUrl(lines, pins, isLightOnDark);
}
