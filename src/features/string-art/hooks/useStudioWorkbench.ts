'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { AlgorithmConfig, LoomConfig, PresetImage } from '../types';
import { extractGreyscaleBuffer } from '../utils/imageGreyscale';
import { calculateCircularPins } from '../utils/pinGeometry';
import { SAMPLE_PRESETS } from '../utils/samplePresets';
import { useStringArtEngine } from './useStringArtEngine';

const CANVAS_SIZE = 700;

export function useStudioWorkbench() {
	const [loomConfig, setLoomConfig] = useState<LoomConfig>({
		shape: 'circle',
		pinCount: 240,
		physicalDiameterCm: 50,
		pinOffsetRatio: 0.95,
	});
	const [algoConfig, setAlgoConfig] = useState<AlgorithmConfig>({
		maxLines: 2400,
		lineWeight: 0.85,
		opacityStep: 18,
		minDistance: 20,
		contrast: 15,
		brightness: 0,
	});
	const [selectedPreset, setSelectedPreset] = useState<PresetImage | null>(
		SAMPLE_PRESETS[0],
	);
	const [imageSrc, setImageSrc] = useState<string>(SAMPLE_PRESETS[0].url);
	const [cropperImageSrc, setCropperImageSrc] = useState<string | null>(null);
	const [isCropperOpen, setIsCropperOpen] = useState(false);
	const [visibleLinesCount, setVisibleLinesCount] = useState<number>(0);
	const [isExportOpen, setIsExportOpen] = useState(false);
	const [isAssistantOpen, setIsAssistantOpen] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);

	const engine = useStringArtEngine();

	const pins = useMemo(() => {
		const radius = (CANVAS_SIZE / 2) * loomConfig.pinOffsetRatio;
		const center = { x: CANVAS_SIZE / 2, y: CANVAS_SIZE / 2 };
		return calculateCircularPins(loomConfig.pinCount, radius, center);
	}, [loomConfig.pinCount, loomConfig.pinOffsetRatio]);

	const displayedLines = useMemo(() => {
		return engine.progress.lineSequence.slice(0, visibleLinesCount);
	}, [engine.progress.lineSequence, visibleLinesCount]);

	useEffect(() => {
		if (engine.status === 'running') {
			setVisibleLinesCount(engine.progress.lineSequence.length);
		}
	}, [engine.status, engine.progress.lineSequence.length]);

	const handleSelectPreset = useCallback((preset: PresetImage) => {
		setSelectedPreset(preset);
		setImageSrc(preset.url);
		setLoomConfig((p) => ({ ...p, pinCount: preset.recommendedPins }));
		setAlgoConfig((p) => ({ ...p, maxLines: preset.recommendedLines }));
	}, []);

	const handleCustomUpload = useCallback((dataUrl: string) => {
		setCropperImageSrc(dataUrl);
		setIsCropperOpen(true);
	}, []);

	const handleCropComplete = useCallback((croppedUrl: string) => {
		setImageSrc(croppedUrl);
		setSelectedPreset(null);
	}, []);

	const handleOpenCropper = useCallback(() => {
		setCropperImageSrc(imageSrc);
		setIsCropperOpen(true);
	}, [imageSrc]);

	const startGeneration = useCallback(() => {
		const img = new Image();
		img.crossOrigin = 'anonymous';
		img.src = imageSrc;
		img.onload = () => {
			const off = document.createElement('canvas');
			off.width = CANVAS_SIZE;
			off.height = CANVAS_SIZE;
			const ctx = off.getContext('2d');
			if (!ctx) return;
			ctx.drawImage(img, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
			const data = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
			const grey = extractGreyscaleBuffer(
				data.data,
				CANVAS_SIZE,
				algoConfig.contrast,
				algoConfig.brightness,
			);
			engine.start(grey, CANVAS_SIZE, loomConfig, algoConfig);
		};
	}, [imageSrc, loomConfig, algoConfig, engine]);

	const sidebarProps = useMemo(
		() => ({
			linesCount: displayedLines.length,
			loom: { config: loomConfig, onChange: setLoomConfig },
			algo: { config: algoConfig, onChange: setAlgoConfig },
			presets: {
				selectedId: selectedPreset?.id ?? null,
				activeImageSrc: imageSrc,
				onSelect: handleSelectPreset,
				onUpload: handleCustomUpload,
				onOpenCropper: handleOpenCropper,
			},
			execution: {
				status: engine.status,
				onStart: startGeneration,
				onPause: engine.pause,
				onResume: engine.resume,
				onStop: engine.stop,
			},
		}),
		[
			displayedLines.length,
			loomConfig,
			algoConfig,
			selectedPreset,
			imageSrc,
			engine,
			handleSelectPreset,
			handleCustomUpload,
			handleOpenCropper,
			startGeneration,
		],
	);

	const baseModalsProps = useMemo(
		() => ({
			exportModal: {
				isOpen: isExportOpen,
				onClose: () => setIsExportOpen(false),
				pins,
				lines: displayedLines,
				loom: loomConfig,
				algo: algoConfig,
			},
			cropperModal: {
				isOpen: isCropperOpen,
				imageSrc: cropperImageSrc,
				onClose: () => setIsCropperOpen(false),
				onCropComplete: handleCropComplete,
			},
		}),
		[
			isExportOpen,
			pins,
			displayedLines,
			loomConfig,
			algoConfig,
			isCropperOpen,
			cropperImageSrc,
			handleCropComplete,
		],
	);

	return {
		canvasSize: CANVAS_SIZE,
		loomConfig,
		algoConfig,
		pins,
		displayedLines,
		visibleLinesCount,
		isAssistantOpen,
		isPlaying,
		engine,
		sidebarProps,
		baseModalsProps,
		setVisibleLinesCount,
		setIsExportOpen,
		setIsAssistantOpen,
		togglePlay: () => setIsPlaying(!isPlaying),
	};
}
