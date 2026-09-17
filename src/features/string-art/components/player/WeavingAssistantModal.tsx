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
	const {
		currentStep,
		totalSteps,
		fromPin,
		toPin,
		progressPercent,
		activeRun,
		isSpoolTransition,
	} = stepData;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='max-w-xs p-4 sm:max-w-md sm:p-6'>
				<DialogHeader>
					<div className='flex items-center gap-2'>
						<Sparkles className='size-4 text-primary' />
						<DialogTitle>Asistente de Tejido</DialogTitle>
					</div>
					<DialogDescription>
						Guía interactiva paso a paso para el bastidor físico.
					</DialogDescription>
				</DialogHeader>

				<div className='flex flex-col items-center gap-4 py-2 sm:gap-6 sm:py-4'>
					{isSpoolTransition && activeRun && (
						<div className='flex w-full items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-amber-600 dark:text-amber-400'>
							<AlertTriangle className='size-4 shrink-0 animate-bounce' />
							<div className='font-medium text-xs'>
								<span className='font-bold'>¡Cambio de Bobina!</span> Cortar,
								atar y cambiar a{' '}
								<span className='font-bold underline'>{activeRun.name}</span>.
							</div>
						</div>
					)}

					{activeRun && (
						<div className='flex w-full items-center justify-between rounded-lg border bg-muted/20 px-3 py-1.5 text-xs'>
							<span className='text-muted-foreground'>Bobina en uso:</span>
							<div className='flex items-center gap-2'>
								<span
									className='size-3 rounded-full border border-black/20 shadow-xs'
									style={{ backgroundColor: activeRun.color }}
								/>
								<span className='font-medium text-foreground'>
									{activeRun.name}
								</span>
							</div>
						</div>
					)}

					<div className='flex w-full items-center justify-between text-muted-foreground text-xs'>
						<span>Progreso</span>
						<span className='font-mono font-semibold text-foreground'>
							{progressPercent}%
						</span>
					</div>

					<div className='flex w-full items-center justify-center gap-2 sm:gap-4'>
						<div className='flex flex-1 flex-col items-center justify-center rounded-xl border bg-muted/30 p-2 text-center sm:p-4'>
							<span className='text-muted-foreground text-xs uppercase tracking-wider'>
								Desde
							</span>
							<span className='font-bold font-mono text-2xl text-foreground sm:text-4xl'>
								{fromPin}
							</span>
						</div>

						<ArrowRight className='size-4 text-primary sm:size-6' />

						<div className='flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-primary bg-primary/10 p-2 text-center shadow-inner sm:p-4'>
							<span className='text-primary text-xs uppercase tracking-wider'>
								Hacia
							</span>
							<span className='font-bold font-mono text-2xl text-primary sm:text-4xl'>
								{toPin}
							</span>
						</div>
					</div>

					<div className='flex items-center gap-2 font-mono text-muted-foreground text-xs'>
						<span>Paso</span>
						<span className='font-bold text-foreground'>{currentStep + 1}</span>
						<span>de</span>
						<span className='font-bold text-foreground'>{totalSteps}</span>
					</div>

					<div className='flex w-full items-center justify-between gap-1.5 sm:gap-2'>
						<Button
							variant='outline'
							size='icon'
							disabled={currentStep <= 0}
							onClick={() => onJump(-10)}
							aria-label='Retroceder 10 pasos'
							className='size-8 sm:size-9'
						>
							<ChevronsLeft className='size-3.5 sm:size-4' />
						</Button>

						<Button
							variant='secondary'
							disabled={currentStep <= 0}
							onClick={onPrev}
							aria-label='Paso anterior'
							className='flex-1 gap-1 px-2 text-xs sm:gap-1.5'
						>
							<ChevronLeft className='size-3.5 sm:size-4' />
							<span className='xs:inline hidden'>Ant.</span>
						</Button>

						<Button
							variant='default'
							disabled={currentStep >= totalSteps}
							onClick={onNext}
							aria-label='Paso siguiente'
							className='flex-1 gap-1 px-2 text-xs sm:gap-1.5'
						>
							<span className='xs:inline hidden'>Sig.</span>
							<ChevronRight className='size-3.5 sm:size-4' />
						</Button>

						<Button
							variant='outline'
							size='icon'
							disabled={currentStep >= totalSteps}
							onClick={() => onJump(10)}
							aria-label='Avanzar 10 pasos'
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
