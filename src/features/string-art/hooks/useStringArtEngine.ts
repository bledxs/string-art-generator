'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type {
	AlgorithmConfig,
	EngineStatus,
	GenerationProgress,
	LoomConfig,
	WorkerOutMessage,
} from '../types';

const initialProgress: GenerationProgress = {
	status: 'idle',
	currentStep: 0,
	totalSteps: 0,
	currentPin: 0,
	lineSequence: [],
	timeElapsedMs: 0,
};

export function useStringArtEngine() {
	const [status, setStatus] = useState<EngineStatus>('idle');
	const [progress, setProgress] = useState<GenerationProgress>(initialProgress);
	const workerRef = useRef<Worker | null>(null);

	useEffect(() => {
		const worker = new Worker(
			new URL('../workers/stringArt.worker.ts', import.meta.url),
		);
		worker.onmessage = (e: MessageEvent<WorkerOutMessage>) => {
			const data = e.data;
			if (data.type === 'PROGRESS_BATCH') {
				setProgress((prev) => ({
					...prev,
					status: 'running',
					currentStep: data.payload.currentStep,
					totalSteps: data.payload.totalSteps,
					currentPin: data.payload.currentPin,
					lineSequence: [...prev.lineSequence, ...data.payload.newLines],
					colorRuns: data.payload.colorRuns ?? prev.colorRuns,
					currentLayerIndex:
						data.payload.currentLayerIndex ?? prev.currentLayerIndex,
					currentLayerName:
						data.payload.currentLayerName ?? prev.currentLayerName,
					currentColor: data.payload.currentColor ?? prev.currentColor,
				}));
			} else if (data.type === 'COMPLETED') {
				setStatus('completed');
				setProgress((prev) => ({
					...prev,
					status: 'completed',
					timeElapsedMs: data.payload.timeElapsedMs,
					lineSequence: data.payload.lineSequence,
					converged: data.payload.converged,
					colorRuns: data.payload.colorRuns ?? prev.colorRuns,
				}));
			}
		};
		workerRef.current = worker;
		return () => worker.terminate();
	}, []);

	const start = useCallback(
		(
			pixels: Uint8ClampedArray,
			size: number,
			loom: LoomConfig,
			algo: AlgorithmConfig,
			rgbaBuffer?: Uint8ClampedArray,
		) => {
			setStatus('running');
			setProgress({ ...initialProgress, status: 'running' });
			workerRef.current?.postMessage({
				type: 'START',
				payload: {
					pixelBuffer: pixels,
					canvasSize: size,
					loomConfig: loom,
					algoConfig: algo,
					rgbaBuffer,
				},
			});
		},
		[],
	);

	const pause = useCallback(() => {
		setStatus('paused');
		workerRef.current?.postMessage({ type: 'PAUSE' });
	}, []);

	const resume = useCallback(() => {
		setStatus('running');
		workerRef.current?.postMessage({ type: 'RESUME' });
	}, []);

	const stop = useCallback(() => {
		setStatus('idle');
		workerRef.current?.postMessage({ type: 'STOP' });
	}, []);

	return { status, progress, start, pause, resume, stop };
}
