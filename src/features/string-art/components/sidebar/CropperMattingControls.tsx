'use client';

import { CircleDot, Sparkles } from 'lucide-react';
import { useTranslation } from '@/shared/i18n';
import { Slider } from '@/shared/ui/slider';
import { Switch } from '@/shared/ui/switch';
import type { MattingOptions } from '../../utils/imageMatting';

export interface CropperMattingControlsProps {
	options: MattingOptions;
	onChange: (options: MattingOptions) => void;
}

export function CropperMattingControls({
	options,
	onChange,
}: Readonly<CropperMattingControlsProps>) {
	const { t } = useTranslation();

	return (
		<div className='flex flex-col gap-3 rounded-lg border border-border/70 bg-card/50 p-3'>
			{/* Subject Isolation Toggle */}
			<div className='flex items-center justify-between gap-2'>
				<div className='flex flex-col'>
					<span className='flex items-center gap-1.5 font-medium text-foreground text-xs'>
						<Sparkles className='size-3.5 text-primary' />
						{t.cropper.cleanBgTitle}
					</span>
					<span className='text-muted-foreground text-xs leading-relaxed'>
						{t.cropper.cleanBgDesc}
					</span>
				</div>
				<Switch
					checked={options.isolateSubject ?? false}
					onCheckedChange={(checked) =>
						onChange({ ...options, isolateSubject: checked })
					}
				/>
			</div>

			{/* Radial Vignette Toggle */}
			<div className='flex items-center justify-between gap-2 border-border/40 border-t pt-2.5'>
				<div className='flex flex-col'>
					<span className='flex items-center gap-1.5 font-medium text-foreground text-xs'>
						<CircleDot className='size-3.5 text-primary' />
						{t.cropper.vignetteTitle}
					</span>
					<span className='text-muted-foreground text-xs leading-relaxed'>
						{t.cropper.vignetteDesc}
					</span>
				</div>
				<Switch
					checked={options.enableRadialFeather ?? true}
					onCheckedChange={(checked) =>
						onChange({ ...options, enableRadialFeather: checked })
					}
				/>
			</div>

			{/* Vignette Strength Slider */}
			{(options.enableRadialFeather ?? true) && (
				<div className='flex flex-col gap-1.5 pt-1'>
					<div className='flex items-center justify-between text-xs'>
						<span className='text-muted-foreground'>
							{t.cropper.vignetteStrength}
						</span>
						<span className='font-mono text-muted-foreground'>
							{options.featherStrength ?? 35}%
						</span>
					</div>
					<Slider
						value={[options.featherStrength ?? 35]}
						min={10}
						max={80}
						step={5}
						onValueChange={(val) =>
							onChange({ ...options, featherStrength: val[0] })
						}
					/>
				</div>
			)}
		</div>
	);
}
