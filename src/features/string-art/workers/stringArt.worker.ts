import type {
	AlgorithmConfig,
	LoomConfig,
	Pin,
	WorkerInMessage,
	WorkerOutMessage,
} from '../types';
import {
	applyLineToPixels,
	calculateLineScore,
	getLineSymmetricKey,
	rasterizeLine,
} from '../utils/bresenham';
import { calculateCircularPins, isPinPairValid } from '../utils/pinGeometry';

let _isRunning = false;
let isPaused = false;
let shouldStop = false;
const lineCache = new Map<number, Uint32Array>();

function getLineRaster(
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

function isCandidatePinAcceptable(
	nextId: number,
	currentPinId: number,
	prevPinId: number,
	pinCount: number,
	minDistance: number,
): boolean {
	if (nextId === currentPinId) return false;
	if (!isPinPairValid(currentPinId, nextId, pinCount, minDistance))
		return false;
	if (prevPinId >= 0) {
		const diff = Math.abs(nextId - prevPinId);
		const circularDist = Math.min(diff, pinCount - diff);
		if (circularDist <= 2) return false;
	}
	return true;
}

function applyReboundDamping(
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

function findBestNextPin(
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
				pinCount,
				minDistance,
			)
		) {
			continue;
		}

		const lineKey = getLineSymmetricKey(currentPinId, nextId);
		if (usedLines.has(lineKey)) continue;

		const raster = getLineRaster(currentPin, pins[nextId], size, lineKey);
		const rawScore = calculateLineScore(
			residual,
			raster,
			opacityStep,
			whitePenalty,
			lengthPenalty,
		);

		const score = applyReboundDamping(
			rawScore,
			currentPin,
			pins[nextId],
			v1x,
			v1y,
			mag1,
			reboundPenalty,
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
		);
	}

	return { bestPin, bestRaster, bestScore };
}

function runGenerationLoop(
	pixels: Uint8ClampedArray,
	size: number,
	loomConfig: LoomConfig,
	algoConfig: AlgorithmConfig,
) {
	const startTime = performance.now();
	const radius = (size / 2) * loomConfig.pinOffsetRatio;
	const center = { x: size / 2, y: size / 2 };
	const pins = calculateCircularPins(loomConfig.pinCount, radius, center);

	const isLightOnDark = algoConfig.colorMode === 'light-on-dark';
	const pixelCount = pixels.length;
	const residual = new Int16Array(pixelCount);
	for (let i = 0; i < pixelCount; i++) {
		residual[i] = isLightOnDark ? pixels[i] : 255 - pixels[i];
	}

	const autoStop = algoConfig.autoStop ?? true;
	const whitePenalty = algoConfig.whitePenalty ?? 1.3;
	const lengthPenalty = algoConfig.lengthPenalty ?? 0.5;
	const reboundPenalty = algoConfig.reboundPenalty ?? 0.85;

	let currentPin = 0;
	const lineSequence: number[] = [currentPin];
	const batchBuffer: number[] = [];
	const usedLines = new Set<number>();
	const batchSize = 50;
	let hasConverged = false;

	function processBatch(): boolean {
		for (
			let i = 0;
			i < batchSize && lineSequence.length < algoConfig.maxLines;
			i++
		) {
			const prevPin =
				lineSequence.length > 1 ? lineSequence[lineSequence.length - 2] : -1;
			const { bestPin, bestRaster, bestScore } = findBestNextPin(
				currentPin,
				prevPin,
				pins,
				residual,
				size,
				algoConfig.minDistance,
				usedLines,
				algoConfig.opacityStep,
				whitePenalty,
				lengthPenalty,
				reboundPenalty,
			);

			if (bestPin === -1) {
				return true;
			}

			if (autoStop && lineSequence.length >= 300 && bestScore <= 0) {
				return true;
			}

			applyLineToPixels(residual, bestRaster, algoConfig.opacityStep);
			const lineKey = getLineSymmetricKey(currentPin, bestPin);
			usedLines.add(lineKey);

			currentPin = bestPin;
			lineSequence.push(currentPin);
			batchBuffer.push(currentPin);
		}
		return false;
	}

	function finishGeneration(converged: boolean) {
		_isRunning = false;
		const completeMsg: WorkerOutMessage = {
			type: 'COMPLETED',
			payload: {
				totalLines: lineSequence.length,
				lineSequence,
				timeElapsedMs: Math.round(performance.now() - startTime),
				converged,
			},
		};
		self.postMessage(completeMsg);
	}

	function step() {
		if (shouldStop) {
			_isRunning = false;
			return;
		}
		if (isPaused) {
			setTimeout(step, 50);
			return;
		}

		hasConverged = processBatch();

		if (batchBuffer.length > 0) {
			const progressMsg: WorkerOutMessage = {
				type: 'PROGRESS_BATCH',
				payload: {
					currentStep: lineSequence.length,
					totalSteps: algoConfig.maxLines,
					currentPin,
					newLines: [...batchBuffer],
				},
			};
			self.postMessage(progressMsg);
			batchBuffer.length = 0;
		}

		if (!hasConverged && lineSequence.length < algoConfig.maxLines) {
			setTimeout(step, 0);
		} else {
			finishGeneration(hasConverged);
		}
	}

	step();
}

self.onmessage = (e: MessageEvent<WorkerInMessage>) => {
	const message = e.data;
	if (message.type === 'START') {
		lineCache.clear();
		_isRunning = true;
		isPaused = false;
		shouldStop = false;
		runGenerationLoop(
			message.payload.pixelBuffer,
			message.payload.canvasSize,
			message.payload.loomConfig,
			message.payload.algoConfig,
		);
	} else if (message.type === 'PAUSE') {
		isPaused = true;
	} else if (message.type === 'RESUME') {
		isPaused = false;
	} else if (message.type === 'STOP') {
		shouldStop = true;
		_isRunning = false;
	}
};
