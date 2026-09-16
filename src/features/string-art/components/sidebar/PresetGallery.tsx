'use client';

import {
	Check,
	Crop,
	Image as ImageIcon,
	Sparkles,
	Upload,
} from 'lucide-react';
import type * as React from 'react';
import { useRef } from 'react';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import type { PresetImage } from '../../types';
import { SAMPLE_PRESETS } from '../../utils/samplePresets';

interface PresetGalleryProps {
	selectedPresetId: string | null;
	activeImageSrc: string;
	onSelectPreset: (preset: PresetImage) => void;
	onCustomImageUpload: (dataUrl: string) => void;
	onOpenCropper: () => void;
}

export function PresetGallery({
	selectedPresetId,
	activeImageSrc,
	onSelectPreset,
	onCustomImageUpload,
	onOpenCropper,
}: Readonly<PresetGalleryProps>) {
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

	const isCustom = selectedPresetId === null;

	return (
		<div className='flex flex-col gap-4'>
			{/* Active Image Card with Immediate Feedback */}
			<div className='flex flex-col gap-2 rounded-xl border border-primary/30 bg-primary/5 p-3'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-1.5 font-medium text-foreground text-xs'>
						<ImageIcon className='size-3.5 text-primary' />
						<span>Imagen Seleccionada</span>
					</div>
					<Badge
						variant={isCustom ? 'accent' : 'secondary'}
						className='text-xs'
					>
						{isCustom ? 'Personalizada' : 'Muestra'}
					</Badge>
				</div>

				<div className='flex items-center gap-3'>
					<div className='relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-primary bg-background shadow-xs'>
						{/* biome-ignore lint/performance/noImgElement: user image preview */}
						{/* biome-ignore lint/a11y/useAltText: preview active image */}
						<img src={activeImageSrc} className='size-full object-cover' />
					</div>
					<div className='flex flex-1 flex-col gap-1.5'>
						<span className='font-medium text-foreground text-xs'>
							{isCustom
								? 'Tu imagen cargada'
								: SAMPLE_PRESETS.find((p) => p.id === selectedPresetId)?.title}
						</span>
						<div className='flex items-center gap-1.5'>
							<Button
								variant='outline'
								size='sm'
								onClick={onOpenCropper}
								className='h-7 gap-1 px-2 text-xs'
							>
								<Crop className='size-3 text-primary' />
								Recortar
							</Button>
							<Button
								variant='ghost'
								size='sm'
								onClick={triggerUpload}
								className='h-7 gap-1 px-2 text-muted-foreground text-xs'
							>
								<Upload className='size-3' />
								Cambiar
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* Curated Presets */}
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
							<div className='flex flex-1 flex-col overflow-hidden'>
								<div className='flex items-center justify-between'>
									<span className='truncate font-semibold text-foreground text-xs'>
										{preset.title}
									</span>
									{selectedPresetId === preset.id && (
										<Check className='size-3.5 text-primary' />
									)}
								</div>
								<span className='truncate text-muted-foreground text-xs'>
									{preset.subtitle}
								</span>
							</div>
						</button>
					))}
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
