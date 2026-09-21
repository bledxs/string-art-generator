'use client';

import type { AlgorithmConfig, ColorRun, LoomConfig, Pin } from '../types';
import { WeavingAssistantModal } from './player/WeavingAssistantModal';
import { CandidateComparisonModal } from './sidebar/CandidateComparisonModal';
import { ImageCropperModal } from './sidebar/ImageCropperModal';
import { ExportModal } from './toolbar/ExportModal';

interface StudioModalsProps {
	exportModal: {
		isOpen: boolean;
		onClose: () => void;
		pins: Pin[];
		lines: number[];
		loom: LoomConfig;
		algo: AlgorithmConfig;
		colorRuns?: ColorRun[];
		timeElapsedMs?: number;
	};
	assistantModal: {
		isOpen: boolean;
		onClose: () => void;
		stepData: {
			currentStep: number;
			totalSteps: number;
			fromPin: number;
			toPin: number;
			progressPercent: number;
			activeRun?: ColorRun;
			isSpoolTransition?: boolean;
		};
		onNext: () => void;
		onPrev: () => void;
		onJump: (delta: number) => void;
	};
	cropperModal: {
		isOpen: boolean;
		imageSrc: string | null;
		onClose: () => void;
		onCropComplete: (dataUrl: string) => void;
	};
	candidatesModal: {
		isOpen: boolean;
		imageSrc: string | null;
		currentAlgo: AlgorithmConfig;
		onClose: () => void;
		onApplyCandidate: (config: Partial<AlgorithmConfig>) => void;
	};
}

export function StudioModals({
	exportModal,
	assistantModal,
	cropperModal,
	candidatesModal,
}: Readonly<StudioModalsProps>) {
	return (
		<>
			<ExportModal {...exportModal} />
			<WeavingAssistantModal {...assistantModal} />
			<ImageCropperModal {...cropperModal} />
			<CandidateComparisonModal {...candidatesModal} />
		</>
	);
}
