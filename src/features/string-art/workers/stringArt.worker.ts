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

function findBestNextPin(
	currentPinId: number,
	pins: Pin[],
	pixels: Uint8ClampedArray,
	size: number,
	minDistance: number,
	usedLines: Set<number>,
): { bestPin: number; bestRaster: Uint32Array } {
	let bestScore = -1;
	let bestPin = (currentPinId + minDistance) % pins.length;
	let bestRaster: Uint32Array = new Uint32Array(0);
	const currentPin = pins[currentPinId];

	for (let nextId = 0; nextId < pins.length; nextId++) {
		if (nextId === currentPinId) continue;
		if (!isPinPairValid(currentPinId, nextId, pins.length, minDistance))
			continue;

		const lineKey = getLineSymmetricKey(currentPinId, nextId);
		if (usedLines.has(lineKey)) continue;

		const raster = getLineRaster(currentPin, pins[nextId], size, lineKey);
		const score = calculateLineScore(pixels, raster);

		if (score > bestScore) {
			bestScore = score;
			bestPin = nextId;
			bestRaster = raster;
		}
	}
	return { bestPin, bestRaster };
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

	let currentPin = 0;
	const lineSequence: number[] = [currentPin];
	const batchBuffer: number[] = [];
	const usedLines = new Set<number>();
	const batchSize = 25;

	function step() {
		if (shouldStop) {
			_isRunning = false;
			return;
		}
		if (isPaused) {
			setTimeout(step, 50);
			return;
		}

		for (
			let i = 0;
			i < batchSize && lineSequence.length < algoConfig.maxLines;
			i++
		) {
			const { bestPin, bestRaster } = findBestNextPin(
				currentPin,
				pins,
				pixels,
				size,
				algoConfig.minDistance,
				usedLines,
			);

			applyLineToPixels(pixels, bestRaster, algoConfig.opacityStep);
			const lineKey = getLineSymmetricKey(currentPin, bestPin);
			usedLines.add(lineKey);

			currentPin = bestPin;
			lineSequence.push(currentPin);
			batchBuffer.push(currentPin);
		}

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

		if (lineSequence.length < algoConfig.maxLines) {
			setTimeout(step, 0);
		} else {
			_isRunning = false;
			const completeMsg: WorkerOutMessage = {
				type: 'COMPLETED',
				payload: {
					totalLines: lineSequence.length,
					lineSequence,
					timeElapsedMs: Math.round(performance.now() - startTime),
				},
			};
			self.postMessage(completeMsg);
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
