'use client';

import type { AlgorithmConfig, LoomConfig, Pin } from '../types';
import { WeavingAssistantModal } from './player/WeavingAssistantModal';
import { ExportModal } from './toolbar/ExportModal';

interface StudioModalsProps {
	exportModal: {
		isOpen: boolean;
		onClose: () => void;
		pins: Pin[];
		lines: number[];
		loom: LoomConfig;
		algo: AlgorithmConfig;
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
		};
		onNext: () => void;
		onPrev: () => void;
		onJump: (delta: number) => void;
	};
}

export function StudioModals({
	exportModal,
	assistantModal,
}: StudioModalsProps) {
	return (
		<>
			<ExportModal {...exportModal} />
			<WeavingAssistantModal {...assistantModal} />
		</>
	);
}
