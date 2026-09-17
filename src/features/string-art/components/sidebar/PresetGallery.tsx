'use client';

import { Check, Sparkles } from 'lucide-react';
import type * as React from 'react';
import { useRef } from 'react';
import { useTranslation } from '@/shared/i18n';
import type { PresetImage } from '../../types';
import type { CalibrationRecommendation } from '../../utils/imageAnalyzer';
import { SAMPLE_PRESETS } from '../../utils/samplePresets';
import { ActiveImageCard } from './ActiveImageCard';
import { AutoCalibrateCard } from './AutoCalibrateCard';

interface PresetGalleryProps {
	selectedPresetId: string | null;
	activeImageSrc: string;
	onSelectPreset: (preset: PresetImage) => void;
	onCustomImageUpload: (dataUrl: string) => void;
	onOpenCropper: () => void;
	onAutoCalibrate?: (rec: CalibrationRecommendation) => void;
}

export function PresetGallery({
	selectedPresetId,
	activeImageSrc,
	onSelectPreset,
	onCustomImageUpload,
	onOpenCropper,
	onAutoCalibrate,
}: Readonly<PresetGalleryProps>) {
	const { t } = useTranslation();
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = (event) => {
			const result = event.target?.result;
			if (typeof result === 'string') {
				onCustomImageUpload(result);
			}
		};
		reader.readAsDataURL(file);
	};

	const isCustom = selectedPresetId === null;
	const activePreset = SAMPLE_PRESETS.find((p) => p.id === selectedPresetId);
	const title = isCustom
		? t.presets.customSampleTitle
		: activePreset
			? (t.presetsData[activePreset.id]?.title ?? activePreset.title)
			: t.presets.defaultSampleTitle;

	return (
		<div className='flex flex-col gap-4'>
			{/* Active Image Preview & Actions */}
			<ActiveImageCard
				activeImageSrc={activeImageSrc}
				isCustom={isCustom}
				title={title}
				onOpenCropper={onOpenCropper}
				onTriggerUpload={() => fileInputRef.current?.click()}
			/>

			{/* Intelligent Auto-Calibration Card */}
			{onAutoCalibrate && (
				<AutoCalibrateCard
					imageSrc={activeImageSrc}
					onApply={onAutoCalibrate}
				/>
			)}

			{/* Curated Presets */}
			<div className='flex flex-col gap-1.5'>
				<div className='flex items-center gap-1.5 font-medium text-muted-foreground text-xs'>
					<Sparkles className='size-3.5 text-primary' />
					<span>{t.presets.curatedTitle}</span>
				</div>

				<div className='grid grid-cols-1 gap-2'>
					{SAMPLE_PRESETS.map((preset) => {
						const localizedPreset = t.presetsData[preset.id] ?? {
							title: preset.title,
							subtitle: preset.subtitle,
						};

						return (
							<button
								key={preset.id}
								type='button'
								onClick={() => onSelectPreset(preset)}
								className={`flex w-full min-w-0 items-center gap-3 rounded-lg border p-2.5 text-left transition-all ${
									selectedPresetId === preset.id
										? 'border-primary bg-primary/10 shadow-xs'
										: 'hover:border-primary/50 hover:bg-muted/40'
								}`}
							>
								<div className='flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-white p-1'>
									{/* biome-ignore lint/performance/noImgElement: offline data url */}
									{/* biome-ignore lint/a11y/useAltText: preview preset image */}
									<img src={preset.url} className='size-full object-contain' />
								</div>
								<div className='flex min-w-0 flex-1 flex-col overflow-hidden'>
									<div className='flex items-center justify-between'>
										<span className='truncate font-semibold text-foreground text-xs'>
											{localizedPreset.title}
										</span>
										{selectedPresetId === preset.id && (
											<Check className='size-3.5 shrink-0 text-primary' />
										)}
									</div>
									<span className='truncate text-muted-foreground text-xs'>
										{localizedPreset.subtitle}
									</span>
								</div>
							</button>
						);
					})}
				</div>
			</div>

			<input
				ref={fileInputRef}
				type='file'
				accept='image/png, image/jpeg, image/webp'
				className='hidden'
				onChange={handleFileChange}
			/>
		</div>
	);
}
