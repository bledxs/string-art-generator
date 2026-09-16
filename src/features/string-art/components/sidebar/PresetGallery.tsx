'use client';

import { Sparkles, Upload } from 'lucide-react';
import type * as React from 'react';
import { useRef } from 'react';
import { Button } from '@/shared/ui/button';
import type { PresetImage } from '../../types';
import { SAMPLE_PRESETS } from '../../utils/samplePresets';

interface PresetGalleryProps {
	selectedPresetId: string | null;
	onSelectPreset: (preset: PresetImage) => void;
	onCustomImageUpload: (dataUrl: string) => void;
}

export function PresetGallery({
	selectedPresetId,
	onSelectPreset,
	onCustomImageUpload,
}: PresetGalleryProps) {
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

	const triggerUpload = () => {
		fileInputRef.current?.click();
	};

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex flex-col gap-1.5'>
				<div className='flex items-center gap-1.5 font-medium text-muted-foreground text-xs'>
					<Sparkles className='size-3.5 text-primary' />
					<span>Muestras de alta definición</span>
				</div>

				<div className='grid grid-cols-1 gap-2'>
					{SAMPLE_PRESETS.map((preset) => (
						<button
							key={preset.id}
							type='button'
							onClick={() => onSelectPreset(preset)}
							className={`flex items-center gap-3 rounded-lg border p-2.5 text-left transition-all ${
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
							<div className='flex flex-col overflow-hidden'>
								<span className='truncate font-semibold text-foreground text-xs'>
									{preset.title}
								</span>
								<span className='truncate text-muted-foreground text-xs'>
									{preset.subtitle}
								</span>
							</div>
						</button>
					))}
				</div>
			</div>

			<div className='flex flex-col gap-2 pt-2'>
				<input
					ref={fileInputRef}
					type='file'
					accept='image/png, image/jpeg, image/webp'
					className='hidden'
					onChange={handleFileChange}
				/>
				<Button
					variant='outline'
					size='sm'
					onClick={triggerUpload}
					className='w-full gap-2 text-xs'
				>
					<Upload className='size-3.5' />
					<span>Cargar imagen propia (JPG/PNG)</span>
				</Button>
			</div>
		</div>
	);
}
