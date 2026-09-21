import type { AlgorithmConfig, ColorLayer, LoomConfig, Pin } from '../types';
import {
	calculateLineScore,
	getLineSymmetricKey,
	rasterizeLine,
} from '../utils/bresenham';
import {
	calculateCircularPins,
	calculateRectangularPins,
	getLoomDimensions,
	isPinPairValid,
} from '../utils/pinGeometry';

export function getLoomPins(loomConfig: LoomConfig, size: number): Pin[] {
	const center = { x: size / 2, y: size / 2 };
	if (loomConfig.shape === 'rectangle') {
		const dims = getLoomDimensions(
			size,
			loomConfig.pinOffsetRatio,
			'rectangle',
			loomConfig.aspectRatio ?? '1:1',
		);
		return calculateRectangularPins(
			loomConfig.pinCount,
			dims.width,
			dims.height,
			center,
		);
	}
	const radius = (size / 2) * loomConfig.pinOffsetRatio;
	return calculateCircularPins(loomConfig.pinCount, radius, center);
}

const lineCache = new Map<number, Uint32Array>();

export function clearLineCache(): void {
	lineCache.clear();
}

export function getLineRaster(
	pinA: Pin,
	pinB: Pin,
	size: number,
	key: number,
): Uint32Array {
	const cached = lineCache.get(key);
	if (cached) return cached;
	const raster = rasterizeLine(pinA.x, pinA.y, pinB.x, pinB.y, size);
	lineCache.set(key, raster);
	return raster;
}

export function isCandidatePinAcceptable(
	nextId: number,
	currentPinId: number,
	prevPinId: number,
	pins: Pin[],
	minDistance: number,
): boolean {
	if (nextId === currentPinId) return false;
	const pinCount = pins.length;
	if (!isPinPairValid(currentPinId, nextId, pinCount, minDistance, pins)) {
		return false;
	}
	if (prevPinId >= 0) {
		const diff = Math.abs(nextId - prevPinId);
		const circularDist = Math.min(diff, pinCount - diff);
		if (circularDist <= 2) return false;
	}
	return true;
}

export function applyReboundDamping(
	score: number,
	pCurr: Pin,
	pNext: Pin,
	v1x: number,
	v1y: number,
	mag1: number,
	reboundPenalty: number,
): number {
	if (score <= 0 || reboundPenalty >= 1.0 || mag1 <= 0) return score;
	const v2x = pNext.x - pCurr.x;
	const v2y = pNext.y - pCurr.y;
	const mag2 = Math.hypot(v2x, v2y);
	if (mag2 <= 0) return score;
	const cosTheta = (v1x * v2x + v1y * v2y) / (mag1 * mag2);
	return cosTheta < -0.85 ? score * reboundPenalty : score;
}

export function computeSobelGradients(
	pixels: Uint8ClampedArray,
	size: number,
): { gradX: Int16Array; gradY: Int16Array } {
	const pixelCount = size * size;
	const gradX = new Int16Array(pixelCount);
	const gradY = new Int16Array(pixelCount);

	for (let y = 1; y < size - 1; y++) {
		const yOffset = y * size;
		for (let x = 1; x < size - 1; x++) {
			const idx = yOffset + x;
			gradX[idx] =
				pixels[idx - size + 1] +
				2 * pixels[idx + 1] +
				pixels[idx + size + 1] -
				(pixels[idx - size - 1] + 2 * pixels[idx - 1] + pixels[idx + size - 1]);
			gradY[idx] =
				pixels[idx + size - 1] +
				2 * pixels[idx + size] +
				pixels[idx + size + 1] -
				(pixels[idx - size - 1] +
					2 * pixels[idx - size] +
					pixels[idx - size + 1]);
		}
	}

	return { gradX, gradY };
}

export function scoreCandidatePin(
	currentPin: Pin,
	nextPin: Pin,
	size: number,
	lineKey: number,
	residual: Int16Array,
	opacityStep: number,
	whitePenalty: number,
	lengthPenalty: number,
	v1x: number,
	v1y: number,
	mag1: number,
	reboundPenalty: number,
	gradX?: Int16Array | null,
	gradY?: Int16Array | null,
	edgeWeight = 0,
): { raster: Uint32Array; score: number } {
	const dx = nextPin.x - currentPin.x;
	const dy = nextPin.y - currentPin.y;
	const dist = Math.hypot(dx, dy);
	const ux = dist > 0 ? dx / dist : 0;
	const uy = dist > 0 ? dy / dist : 0;

	const raster = getLineRaster(currentPin, nextPin, size, lineKey);
	const rawScore = calculateLineScore(
		residual,
		raster,
		opacityStep,
		whitePenalty,
		lengthPenalty,
		ux,
		uy,
		gradX,
		gradY,
		edgeWeight,
	);

	const score = applyReboundDamping(
		rawScore,
		currentPin,
		nextPin,
		v1x,
		v1y,
		mag1,
		reboundPenalty,
	);

	return { raster, score };
}

export function findBestNextPin(
	currentPinId: number,
	prevPinId: number,
	pins: Pin[],
	residual: Int16Array,
	size: number,
	minDistance: number,
	usedLines: Set<number>,
	opacityStep: number,
	whitePenalty: number,
	lengthPenalty = 0.5,
	reboundPenalty = 0.85,
	gradX?: Int16Array | null,
	gradY?: Int16Array | null,
	edgeWeight = 0,
): { bestPin: number; bestRaster: Uint32Array; bestScore: number } {
	let bestScore = -Infinity;
	let bestPin = -1;
	let bestRaster: Uint32Array = new Uint32Array(0);
	const currentPin = pins[currentPinId];
	const pinCount = pins.length;

	const pPrev = prevPinId >= 0 ? pins[prevPinId] : null;
	const v1x = pPrev ? currentPin.x - pPrev.x : 0;
	const v1y = pPrev ? currentPin.y - pPrev.y : 0;
	const mag1 = pPrev ? Math.hypot(v1x, v1y) : 0;

	for (let nextId = 0; nextId < pinCount; nextId++) {
		if (
			!isCandidatePinAcceptable(
				nextId,
				currentPinId,
				prevPinId,
				pins,
				minDistance,
			)
		) {
			continue;
		}

		const lineKey = getLineSymmetricKey(currentPinId, nextId);
		if (usedLines.has(lineKey)) continue;

		const nextPin = pins[nextId];
		const { raster, score } = scoreCandidatePin(
			currentPin,
			nextPin,
			size,
			lineKey,
			residual,
			opacityStep,
			whitePenalty,
			lengthPenalty,
			v1x,
			v1y,
			mag1,
			reboundPenalty,
			gradX,
			gradY,
			edgeWeight,
		);

		if (score > bestScore) {
			bestScore = score;
			bestPin = nextId;
			bestRaster = raster;
		}
	}

	// Fallback if no pin found with anti-Moire constraint
	if (bestPin === -1 && prevPinId >= 0) {
		return findBestNextPin(
			currentPinId,
			-1,
			pins,
			residual,
			size,
			minDistance,
			usedLines,
			opacityStep,
			whitePenalty,
			lengthPenalty,
			reboundPenalty,
			gradX,
			gradY,
			edgeWeight,
		);
	}

	return { bestPin, bestRaster, bestScore };
}

export function setupColorLayers(
	algoConfig: AlgorithmConfig,
	isLightOnDark: boolean,
): ColorLayer[] {
	if (algoConfig.colorLayers && algoConfig.colorLayers.length > 0) {
		if (
			algoConfig.colorPaletteType === 'monochrome' ||
			algoConfig.colorLayers.length === 1
		) {
			return algoConfig.colorLayers.map((l) => ({
				...l,
				color: isLightOnDark ? '#f4f2ed' : '#120e0b',
			}));
		}
		return algoConfig.colorLayers;
	}
	return [
		{
			id: 'default-layer',
			name: 'Hilo Principal',
			color: isLightOnDark ? '#f4f2ed' : '#120e0b',
			linesCount: algoConfig.maxLines,
			opacityStep: algoConfig.opacityStep,
		},
	];
}
