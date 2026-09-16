'use client';

import { ArrowRight, BookOpen, Pause, Play } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Slider } from '@/shared/ui/slider';

export interface TimelinePlayerProps {
	totalLines: number;
	visibleLines: number;
	onVisibleLinesChange: (val: number) => void;
	isPlaying: boolean;
	onTogglePlay: () => void;
	onOpenAssistant: () => void;
	currentPins: { from: number; to: number };
}

export function TimelinePlayer({
	totalLines,
	visibleLines,
	onVisibleLinesChange,
	isPlaying,
	onTogglePlay,
	onOpenAssistant,
	currentPins,
}: TimelinePlayerProps) {
	if (totalLines <= 1) return null;

	const handleSliderChange = (vals: number[]) => {
		onVisibleLinesChange(vals[0]);
	};

	return (
		<div className='flex h-14 w-full items-center justify-between gap-4 border-t bg-card/75 px-4 backdrop-blur-md'>
			<div className='flex items-center gap-2'>
				<Button
					variant={isPlaying ? 'secondary' : 'default'}
					size='icon'
					onClick={onTogglePlay}
					aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
					className='size-8'
				>
					{isPlaying ? (
						<Pause className='size-4 fill-current' />
					) : (
						<Play className='size-4 fill-current' />
					)}
				</Button>

				<div className='hidden items-center gap-1.5 rounded-md border bg-muted/30 px-2 py-1 font-mono text-xs sm:flex'>
					<span className='text-muted-foreground'>Clavo:</span>
					<span className='font-bold text-foreground'>{currentPins.from}</span>
					<ArrowRight className='size-3 text-primary' />
					<span className='font-bold text-primary'>{currentPins.to}</span>
				</div>
			</div>

			<div className='flex flex-1 items-center gap-3'>
				<Slider
					value={[visibleLines]}
					min={1}
					max={totalLines}
					step={1}
					onValueChange={handleSliderChange}
					className='cursor-pointer'
				/>
				<span className='w-24 select-none text-right font-mono text-muted-foreground text-xs'>
					{visibleLines} / {totalLines}
				</span>
			</div>

			<Button
				variant='outline'
				size='sm'
				onClick={onOpenAssistant}
				className='gap-1.5 whitespace-nowrap text-xs'
			>
				<BookOpen className='size-3.5 text-primary' />
				<span className='hidden sm:inline'>Guía de Tejido</span>
			</Button>
		</div>
	);
}
