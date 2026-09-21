import type {
	AlgorithmConfig,
	ColorLayer,
	ColorRun,
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
import { extractLayerResidual } from '../utils/colorDecomposition';
import {
	calculateCircularPins,
	calculateRectangularPins,
	getLoomDimensions,
	isPinPairValid,
} from '../utils/pinGeometry';

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

function computeSobelGradients(
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

function scoreCandidatePin(
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

function setupColorLayers(
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

function runGenerationLoop(
	pixels: Uint8ClampedArray,
	size: number,
	loomConfig: LoomConfig,
	algoConfig: AlgorithmConfig,
	rgbaBuffer?: Uint8ClampedArray,
) {
	const startTime = performance.now();
	const center = { x: size / 2, y: size / 2 };

	let pins: Pin[];
	if (loomConfig.shape === 'rectangle') {
		const dims = getLoomDimensions(
			size,
			loomConfig.pinOffsetRatio,
			'rectangle',
			loomConfig.aspectRatio ?? '1:1',
		);
		pins = calculateRectangularPins(
			loomConfig.pinCount,
			dims.width,
			dims.height,
			center,
		);
	} else {
		const radius = (size / 2) * loomConfig.pinOffsetRatio;
		pins = calculateCircularPins(loomConfig.pinCount, radius, center);
	}

	const edgeWeight = algoConfig.edgeWeight ?? 0.25;
	const { gradX, gradY } =
		edgeWeight > 0.01
			? computeSobelGradients(pixels, size)
			: { gradX: null, gradY: null };

	const isLightOnDark = algoConfig.colorMode === 'light-on-dark';
	const layers = setupColorLayers(algoConfig, isLightOnDark);
	const paletteType = algoConfig.colorPaletteType ?? 'monochrome';
	const pixelCount = pixels.length;
	const totalTargetLines = layers.reduce((sum, l) => sum + l.linesCount, 0);

	let currentLayerIndex = 0;
	let currentLayerLinesDone = 0;
	let layerStartIndex = 0;
	const colorRuns: ColorRun[] = [];

	let residual: Int16Array =
		rgbaBuffer && paletteType !== 'monochrome'
			? extractLayerResidual(
					rgbaBuffer,
					pixels,
					pixelCount,
					layers[0],
					paletteType,
					algoConfig.colorMode ?? 'dark-on-light',
				)
			: (() => {
					const res = new Int16Array(pixelCount);
					for (let i = 0; i < pixelCount; i++) {
						res[i] = isLightOnDark ? pixels[i] : 255 - pixels[i];
					}
					return res;
				})();

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

	function advanceToNextLayer(): boolean {
		const currentLayer = layers[currentLayerIndex];
		const count = lineSequence.length - layerStartIndex;
		colorRuns.push({
			layerId: currentLayer.id,
			name: currentLayer.name,
			color: currentLayer.color,
			startIndex: layerStartIndex,
			endIndex: lineSequence.length,
			lineCount: count,
		});

		currentLayerIndex++;
		if (currentLayerIndex >= layers.length) return true;

		const nextLayer = layers[currentLayerIndex];
		currentLayerLinesDone = 0;
		layerStartIndex = lineSequence.length;

		if (rgbaBuffer && paletteType !== 'monochrome') {
			residual = extractLayerResidual(
				rgbaBuffer,
				pixels,
				pixelCount,
				nextLayer,
				paletteType,
				algoConfig.colorMode ?? 'dark-on-light',
			);
		}
		return false;
	}

	function processSingleStep(): boolean {
		if (currentLayerIndex >= layers.length) return true;

		const currentLayer = layers[currentLayerIndex];
		if (currentLayerLinesDone >= currentLayer.linesCount) {
			const finishedAll = advanceToNextLayer();
			if (finishedAll) return true;
		}

		const activeLayer = layers[currentLayerIndex];
		const activeOpacity = activeLayer.opacityStep ?? algoConfig.opacityStep;
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
			activeOpacity,
			whitePenalty,
			lengthPenalty,
			reboundPenalty,
			gradX,
			gradY,
			edgeWeight,
		);

		if (
			bestPin === -1 ||
			(autoStop && currentLayerLinesDone >= 200 && bestScore <= 0)
		) {
			currentLayerLinesDone = activeLayer.linesCount;
			return false;
		}

		applyLineToPixels(residual, bestRaster, activeOpacity);
		const lineKey = getLineSymmetricKey(currentPin, bestPin);
		usedLines.add(lineKey);

		currentPin = bestPin;
		lineSequence.push(currentPin);
		batchBuffer.push(currentPin);
		currentLayerLinesDone++;
		return false;
	}

	function processBatch(): boolean {
		for (let i = 0; i < batchSize; i++) {
			const isDone = processSingleStep();
			if (isDone) return true;
		}
		return currentLayerIndex >= layers.length;
	}

	function finalizeColorRuns() {
		if (
			currentLayerIndex < layers.length &&
			lineSequence.length > layerStartIndex
		) {
			const l = layers[currentLayerIndex];
			colorRuns.push({
				layerId: l.id,
				name: l.name,
				color: l.color,
				startIndex: layerStartIndex,
				endIndex: lineSequence.length,
				lineCount: lineSequence.length - layerStartIndex,
				dmcCode: l.dmcCode,
				gutermannCode: l.gutermannCode,
			});
		}
	}

	function finishGeneration(converged: boolean) {
		finalizeColorRuns();
		_isRunning = false;
		const completeMsg: WorkerOutMessage = {
			type: 'COMPLETED',
			payload: {
				totalLines: lineSequence.length,
				lineSequence,
				timeElapsedMs: Math.round(performance.now() - startTime),
				converged,
				colorRuns,
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
			const activeLayer =
				layers[currentLayerIndex] ?? layers[layers.length - 1];
			const currentActiveRun: ColorRun = {
				layerId: activeLayer.id,
				name: activeLayer.name,
				color: activeLayer.color,
				startIndex: layerStartIndex,
				endIndex: lineSequence.length,
				lineCount: lineSequence.length - layerStartIndex,
				dmcCode: activeLayer.dmcCode,
				gutermannCode: activeLayer.gutermannCode,
			};
			const progressMsg: WorkerOutMessage = {
				type: 'PROGRESS_BATCH',
				payload: {
					currentStep: lineSequence.length,
					totalSteps: totalTargetLines,
					currentPin,
					newLines: [...batchBuffer],
					currentLayerIndex,
					currentLayerName: activeLayer?.name,
					currentColor: activeLayer?.color,
					colorRuns: [...colorRuns, currentActiveRun],
				},
			};
			self.postMessage(progressMsg);
			batchBuffer.length = 0;
		}

		if (!hasConverged && lineSequence.length < totalTargetLines) {
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
			message.payload.rgbaBuffer,
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
