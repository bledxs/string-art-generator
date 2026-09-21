import type {
	AlgorithmConfig,
	ColorRun,
	LoomConfig,
	WorkerInMessage,
	WorkerOutMessage,
} from '../types';
import { applyLineToPixels, getLineSymmetricKey } from '../utils/bresenham';
import { extractLayerResidual } from '../utils/colorDecomposition';
import {
	clearLineCache,
	computeSobelGradients,
	findBestNextPin,
	getLoomPins,
	setupColorLayers,
} from './workerCandidateScorer';

let _isRunning = false;
let isPaused = false;
let shouldStop = false;

function runGenerationLoop(
	pixels: Uint8ClampedArray,
	size: number,
	loomConfig: LoomConfig,
	algoConfig: AlgorithmConfig,
	rgbaBuffer?: Uint8ClampedArray,
) {
	const startTime = performance.now();
	const pins = getLoomPins(loomConfig, size);

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
		clearLineCache();
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
