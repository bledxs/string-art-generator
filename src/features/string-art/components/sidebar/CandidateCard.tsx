'use client';

import { Check } from 'lucide-react';
import { useTranslation } from '@/shared/i18n';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import type { AlgorithmConfig } from '../../types';
import type { CandidateProfile } from '../../utils/candidateProfiles';

export interface CandidateCardProps {
	profile: CandidateProfile;
	previewUrl: string | null;
	isSelected: boolean;
	onSelect: (config: Partial<AlgorithmConfig>) => void;
}

export function CandidateCard({
	profile,
	previewUrl,
	isSelected,
	onSelect,
}: Readonly<CandidateCardProps>) {
	const { t } = useTranslation();
	const modalT = t.candidatesModal;
	const title = modalT[profile.titleKey];
	const desc = modalT[profile.descKey];
	const badge = modalT[profile.badgeKey];

	return (
		<div
			className={`group relative flex flex-col justify-between rounded-xl border p-3.5 transition-all duration-200 ${
				isSelected
					? 'border-primary bg-primary/10 shadow-md ring-2 ring-primary/40'
					: 'border-border/80 bg-card/70 hover:border-primary/50 hover:bg-card'
			}`}
		>
			<div className='flex flex-col gap-2.5'>
				<div className='flex items-center justify-between gap-2'>
					<span className='truncate font-semibold text-foreground text-xs sm:text-sm'>
						{title}
					</span>
					<Badge variant='outline' className='shrink-0 font-medium text-xs'>
						{badge}
					</Badge>
				</div>

				<div className='relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg border border-border/60 bg-muted/20'>
					{previewUrl ? (
						// biome-ignore lint/performance/noImgElement: mini preview data URL
						// biome-ignore lint/a11y/useAltText: candidate art preview
						<img
							src={previewUrl}
							className='size-full object-cover transition-transform duration-300 group-hover:scale-105'
						/>
					) : (
						<div className='flex flex-col items-center justify-center gap-1.5 p-4 text-center'>
							<div className='size-5 animate-spin rounded-full border-2 border-primary border-t-transparent' />
							<span className='text-muted-foreground text-xs'>
								{modalT.generating}
							</span>
						</div>
					)}
				</div>

				<p className='line-clamp-2 text-muted-foreground text-xs leading-relaxed'>
					{desc}
				</p>
			</div>

			<div className='mt-3 flex items-center justify-between gap-2 border-border/40 border-t pt-2'>
				<div className='flex items-center gap-2 font-mono text-muted-foreground text-xs'>
					<span>
						{profile.algoConfig.maxLines} {modalT.linesLabel}
					</span>
					<span>•</span>
					<span>
						{profile.algoConfig.contrast}% {modalT.contrastLabel}
					</span>
				</div>
				<Button
					type='button'
					size='sm'
					variant={isSelected ? 'default' : 'outline'}
					onClick={() => onSelect(profile.algoConfig)}
					className='h-7 gap-1 px-2.5 font-medium text-xs'
				>
					{isSelected && <Check className='size-3' />}
					{isSelected ? modalT.selectedBadge : modalT.applyBtn}
				</Button>
			</div>
		</div>
	);
}
