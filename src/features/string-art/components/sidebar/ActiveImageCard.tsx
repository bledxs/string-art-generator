'use client';

import { Crop, Image as ImageIcon, Upload } from 'lucide-react';
import { useTranslation } from '@/shared/i18n';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';

interface ActiveImageCardProps {
	activeImageSrc: string;
	isCustom: boolean;
	title: string;
	onOpenCropper: () => void;
	onTriggerUpload: () => void;
}

export function ActiveImageCard({
	activeImageSrc,
	isCustom,
	title,
	onOpenCropper,
	onTriggerUpload,
}: Readonly<ActiveImageCardProps>) {
	const { t } = useTranslation();

	return (
		<div className='flex flex-col gap-2 rounded-xl border border-primary/30 bg-primary/5 p-3'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-1.5 font-medium text-foreground text-xs'>
					<ImageIcon className='size-3.5 shrink-0 text-primary' />
					<span className='truncate'>{t.presets.selectedImage}</span>
				</div>
				<Badge
					variant={isCustom ? 'accent' : 'secondary'}
					className='shrink-0 text-xs'
				>
					{isCustom ? t.presets.customBadge : t.presets.presetBadge}
				</Badge>
			</div>

			<div className='flex items-center gap-3'>
				<div className='relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-primary bg-background shadow-xs'>
					{/* biome-ignore lint/performance/noImgElement: user image preview */}
					{/* biome-ignore lint/a11y/useAltText: preview active image */}
					<img src={activeImageSrc} className='size-full object-cover' />
				</div>
				<div className='flex min-w-0 flex-1 flex-col overflow-hidden'>
					<span className='truncate font-semibold text-foreground text-xs'>
						{title}
					</span>
					<span className='mt-0.5 truncate text-muted-foreground text-xs'>
						{isCustom ? t.presets.customSubtitle : t.presets.presetSubtitle}
					</span>
					<div className='mt-2 flex items-center gap-2'>
						<Button
							type='button'
							variant='outline'
							size='sm'
							onClick={onOpenCropper}
							className='h-7 shrink-0 gap-1 px-2 text-xs'
						>
							<Crop className='size-3' />
							{t.presets.cropBtn}
						</Button>
						<Button
							type='button'
							variant='ghost'
							size='sm'
							onClick={onTriggerUpload}
							className='h-7 shrink-0 gap-1 px-2 text-xs'
						>
							<Upload className='size-3' />
							{t.presets.changeBtn}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
