'use client';

import { Minus, Plus, RotateCcw } from 'lucide-react';
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
	const zoomPercentage = Math.round(scale * 100);

	return (
		<div className='absolute right-2 bottom-2 z-20 flex items-center gap-1 rounded-lg border bg-background/85 p-1 shadow-md backdrop-blur-md sm:right-4 sm:bottom-4'>
			<Button
				variant='ghost'
				size='icon'
				onClick={onZoomOut}
				aria-label='Reducir zoom'
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
				aria-label='Aumentar zoom'
				className='size-7'
			>
				<Plus className='size-3.5' />
			</Button>

			<div className='mx-0.5 h-4 w-px bg-border' />

			<Button
				variant='ghost'
				size='icon'
				onClick={onReset}
				aria-label='Restablecer vista'
				className='size-7'
			>
				<RotateCcw className='size-3.5' />
			</Button>
		</div>
	);
}
