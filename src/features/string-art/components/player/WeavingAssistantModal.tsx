'use client';

import {
	AlertTriangle,
	ArrowRight,
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	Sparkles,
} from 'lucide-react';
import { useTranslation } from '@/shared/i18n';
import { Button } from '@/shared/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/shared/ui/dialog';
import type { ColorRun } from '../../types';

export interface WeavingAssistantModalProps {
	isOpen: boolean;
	onClose: () => void;
	stepData: {
		currentStep: number;
		totalSteps: number;
		fromPin: number;
		toPin: number;
		progressPercent: number;
		activeRun?: ColorRun;
		isSpoolTransition?: boolean;
	};
	onNext: () => void;
	onPrev: () => void;
	onJump: (delta: number) => void;
}

export function WeavingAssistantModal({
	isOpen,
	onClose,
	stepData,
	onNext,
	onPrev,
	onJump,
}: Readonly<WeavingAssistantModalProps>) {
	const { t } = useTranslation();
	const {
		currentStep,
		totalSteps,
		fromPin,
		toPin,
		progressPercent,
		activeRun,
		isSpoolTransition,
	} = stepData;

	const activeRunName = activeRun
		? (t.color.layers[activeRun.layerId] ?? activeRun.name)
		: '';

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='max-w-xs p-4 sm:max-w-md sm:p-6'>
				<DialogHeader>
					<div className='flex items-center gap-2'>
						<Sparkles className='size-4 text-primary' />
						<DialogTitle>{t.assistant.title}</DialogTitle>
					</div>
					<DialogDescription>{t.assistant.description}</DialogDescription>
				</DialogHeader>

				<div className='flex flex-col items-center gap-4 py-2 sm:gap-6 sm:py-4'>
					{isSpoolTransition && activeRun && (
						<div className='flex w-full items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-amber-600 dark:text-amber-400'>
							<AlertTriangle className='size-4 shrink-0 animate-bounce' />
							<div className='font-medium text-xs'>
								<span className='font-bold'>
									{t.assistant.spoolChangeTitle}
								</span>{' '}
								{t.assistant.spoolChangePrompt}{' '}
								<span className='font-bold underline'>{activeRunName}</span>.
							</div>
						</div>
					)}

					{activeRun && (
						<div className='flex w-full items-center justify-between rounded-lg border bg-muted/20 px-3 py-1.5 text-xs'>
							<span className='text-muted-foreground'>
								{t.assistant.activeSpool}
							</span>
							<div className='flex items-center gap-2'>
								<span
									className='size-3 rounded-full border border-black/20 shadow-xs'
									style={{ backgroundColor: activeRun.color }}
								/>
								<span className='font-medium text-foreground'>
									{activeRunName}
								</span>
							</div>
						</div>
					)}

					<div className='flex w-full items-center justify-between text-muted-foreground text-xs'>
						<span>{t.assistant.progress}</span>
						<span className='font-mono font-semibold text-foreground'>
							{progressPercent}%
						</span>
					</div>

					<div className='flex w-full items-center justify-center gap-2 sm:gap-4'>
						<div className='flex flex-1 flex-col items-center justify-center rounded-xl border bg-muted/30 p-2 text-center sm:p-4'>
							<span className='text-muted-foreground text-xs uppercase tracking-wider'>
								{t.assistant.from}
							</span>
							<span className='font-bold font-mono text-2xl text-foreground sm:text-4xl'>
								{fromPin}
							</span>
						</div>

						<ArrowRight className='size-4 text-primary sm:size-6' />

						<div className='flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-primary bg-primary/10 p-2 text-center shadow-inner sm:p-4'>
							<span className='text-primary text-xs uppercase tracking-wider'>
								{t.assistant.to}
							</span>
							<span className='font-bold font-mono text-2xl text-primary sm:text-4xl'>
								{toPin}
							</span>
						</div>
					</div>

					<div className='flex items-center gap-2 font-mono text-muted-foreground text-xs'>
						<span>{currentStep + 1}</span>
						<span>/</span>
						<span>{totalSteps}</span>
					</div>

					<div className='flex w-full items-center justify-between gap-1.5 sm:gap-2'>
						<Button
							variant='outline'
							size='icon'
							disabled={currentStep <= 0}
							onClick={() => onJump(-10)}
							aria-label={`${t.assistant.jumpBackward} 10`}
							className='size-8 sm:size-9'
						>
							<ChevronsLeft className='size-3.5 sm:size-4' />
						</Button>

						<Button
							variant='secondary'
							disabled={currentStep <= 0}
							onClick={onPrev}
							aria-label={t.assistant.prevStep}
							className='flex-1 gap-1 px-2 text-xs sm:gap-1.5'
						>
							<ChevronLeft className='size-3.5 sm:size-4' />
							<span>{t.assistant.prevStep}</span>
						</Button>

						<Button
							variant='default'
							disabled={currentStep >= totalSteps}
							onClick={onNext}
							aria-label={t.assistant.nextStep}
							className='flex-1 gap-1 px-2 text-xs sm:gap-1.5'
						>
							<span>{t.assistant.nextStep}</span>
							<ChevronRight className='size-3.5 sm:size-4' />
						</Button>

						<Button
							variant='outline'
							size='icon'
							disabled={currentStep >= totalSteps}
							onClick={() => onJump(10)}
							aria-label={`${t.assistant.jumpForward} 10`}
							className='size-8 sm:size-9'
						>
							<ChevronsRight className='size-3.5 sm:size-4' />
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
