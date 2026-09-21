'use client';

import { Sparkles } from 'lucide-react';
import { useTranslation } from '@/shared/i18n';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/shared/ui/dialog';
import { useCandidatePreviews } from '../../hooks/useCandidatePreviews';
import type { AlgorithmConfig } from '../../types';
import { CandidateCard } from './CandidateCard';

export interface CandidateComparisonModalProps {
	isOpen: boolean;
	imageSrc: string | null;
	currentAlgo: AlgorithmConfig;
	onClose: () => void;
	onApplyCandidate: (config: Partial<AlgorithmConfig>) => void;
}

export function CandidateComparisonModal({
	isOpen,
	imageSrc,
	currentAlgo,
	onClose,
	onApplyCandidate,
}: Readonly<CandidateComparisonModalProps>) {
	const { t } = useTranslation();
	const { previews, profiles } = useCandidatePreviews(imageSrc, isOpen);

	const handleSelect = (config: Partial<AlgorithmConfig>) => {
		onApplyCandidate(config);
		onClose();
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent
				className='max-h-screen overflow-y-auto sm:max-w-2xl'
				onOpenAutoFocus={(e) => e.preventDefault()}
			>
				<DialogHeader>
					<div className='flex items-center gap-2'>
						<Sparkles className='size-4 text-primary' />
						<DialogTitle>{t.candidatesModal.title}</DialogTitle>
					</div>
					<DialogDescription>{t.candidatesModal.description}</DialogDescription>
				</DialogHeader>

				<div className='grid grid-cols-1 gap-3.5 py-2 sm:grid-cols-2'>
					{profiles.map((profile) => {
						const isSelected =
							currentAlgo.contrast === profile.algoConfig.contrast &&
							currentAlgo.opacityStep === profile.algoConfig.opacityStep &&
							(currentAlgo.colorMode ?? 'dark-on-light') ===
								(profile.algoConfig.colorMode ?? 'dark-on-light');

						return (
							<CandidateCard
								key={profile.id}
								profile={profile}
								previewUrl={previews[profile.id] ?? null}
								isSelected={isSelected}
								onSelect={handleSelect}
							/>
						);
					})}
				</div>
			</DialogContent>
		</Dialog>
	);
}
