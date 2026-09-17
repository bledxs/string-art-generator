'use client';

import { ArrowRight, BookOpen, Pause, Play } from 'lucide-react';
import { useTranslation } from '@/shared/i18n';
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
}: Readonly<TimelinePlayerProps>) {
	const { t } = useTranslation();
	const isDisabled = totalLines <= 1;

	const handleSliderChange = (vals: number[]) => {
		onVisibleLinesChange(vals[0]);
	};

	return (
		<footer className='flex h-14 w-full shrink-0 items-center justify-between gap-2 border-t bg-card/85 px-2 backdrop-blur-md transition-colors sm:gap-4 sm:px-4'>
			<div className='flex shrink-0 items-center gap-1.5 sm:gap-2'>
				<Button
					variant={isPlaying ? 'secondary' : 'default'}
					size='icon'
					disabled={isDisabled}
					onClick={onTogglePlay}
					aria-label={isPlaying ? t.timeline.pause : t.timeline.play}
					className='size-8'
				>
					{isPlaying ? (
						<Pause className='size-4 fill-current' />
					) : (
						<Play className='size-4 fill-current' />
					)}
				</Button>

				<div className='hidden items-center gap-1.5 rounded-md border bg-muted/30 px-2 py-1 font-mono text-xs sm:flex'>
					<span className='text-muted-foreground'>{t.timeline.pinLabel}</span>
					<span className='font-bold text-foreground'>
						{isDisabled ? '-' : currentPins.from}
					</span>
					<ArrowRight className='size-3 text-primary' />
					<span className='font-bold text-primary'>
						{isDisabled ? '-' : currentPins.to}
					</span>
				</div>
			</div>

			<div className='flex flex-1 items-center justify-center gap-2 sm:gap-3'>
				{isDisabled ? (
					<span className='select-none truncate text-center text-muted-foreground text-xs italic'>
						{t.timeline.emptyPrompt}
					</span>
				) : (
					<>
						<Slider
							value={[visibleLines]}
							min={1}
							max={totalLines}
							step={1}
							onValueChange={handleSliderChange}
							className='cursor-pointer'
						/>
						<span className='w-14 shrink-0 select-none text-right font-mono text-muted-foreground text-xs sm:w-20'>
							{visibleLines}/{totalLines}
						</span>
					</>
				)}
			</div>

			<Button
				variant='outline'
				size='sm'
				disabled={isDisabled}
				onClick={onOpenAssistant}
				aria-label={t.timeline.guideAria}
				className='size-8 shrink-0 p-0 sm:h-8 sm:w-auto sm:px-2.5'
			>
				<BookOpen className='size-3.5 text-primary' />
				<span className='hidden sm:inline'>{t.timeline.guideBtn}</span>
			</Button>
		</footer>
	);
}
