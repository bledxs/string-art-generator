'use client';

import { Minus, Plus, RotateCcw } from 'lucide-react';
import { useTranslation } from '@/shared/i18n';
import { Button } from '@/shared/ui/button';

interface ZoomControlsProps {
	scale: number;
	onZoomIn: () => void;
	onZoomOut: () => void;
	onReset: () => void;
}

export function ZoomControls({
	scale,
	onZoomIn,
	onZoomOut,
	onReset,
}: Readonly<ZoomControlsProps>) {
	const { t } = useTranslation();
	const zoomPercentage = Math.round(scale * 100);

	return (
		<div className='absolute right-2 bottom-2 z-20 flex items-center gap-1 rounded-lg border bg-background/85 p-1 shadow-md backdrop-blur-md sm:right-4 sm:bottom-4'>
			<Button
				variant='ghost'
				size='icon'
				onClick={onZoomOut}
				aria-label={t.zoom.zoomOut}
				className='size-7'
			>
				<Minus className='size-3.5' />
			</Button>

			<span className='w-12 select-none text-center font-mono text-muted-foreground text-xs'>
				{zoomPercentage}%
			</span>

			<Button
				variant='ghost'
				size='icon'
				onClick={onZoomIn}
				aria-label={t.zoom.zoomIn}
				className='size-7'
			>
				<Plus className='size-3.5' />
			</Button>

			<div className='mx-0.5 h-4 w-px bg-border' />

			<Button
				variant='ghost'
				size='icon'
				onClick={onReset}
				aria-label={t.zoom.reset}
				className='size-7'
			>
				<RotateCcw className='size-3.5' />
			</Button>
		</div>
	);
}
