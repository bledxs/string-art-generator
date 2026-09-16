'use client';

import {
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

export interface WeavingAssistantModalProps {
	isOpen: boolean;
	onClose: () => void;
	stepData: {
		currentStep: number;
		totalSteps: number;
		fromPin: number;
		toPin: number;
		progressPercent: number;
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
}: WeavingAssistantModalProps) {
	const { currentStep, totalSteps, fromPin, toPin, progressPercent } = stepData;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<div className='flex items-center gap-2'>
						<Sparkles className='size-4 text-primary' />
						<DialogTitle>Asistente de Tejido Manual</DialogTitle>
					</div>
					<DialogDescription>
						Guía interactiva paso a paso para tender el hilo sobre el bastidor
						físico.
					</DialogDescription>
				</DialogHeader>

				<div className='flex flex-col items-center gap-6 py-4'>
					<div className='flex w-full items-center justify-between text-muted-foreground text-xs'>
						<span>Progreso de armado</span>
						<span className='font-mono font-semibold text-foreground'>
							{progressPercent}%
						</span>
					</div>

					<div className='flex w-full items-center justify-center gap-4'>
						<div className='flex flex-1 flex-col items-center justify-center rounded-xl border bg-muted/30 p-4 text-center'>
							<span className='text-muted-foreground text-xs uppercase tracking-wider'>
								Desde Clavo
							</span>
							<span className='font-bold font-mono text-4xl text-foreground'>
								{fromPin}
							</span>
						</div>

						<ArrowRight className='size-6 text-primary' />

						<div className='flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-primary bg-primary/10 p-4 text-center shadow-inner'>
							<span className='text-primary text-xs uppercase tracking-wider'>
								Hacia Clavo
							</span>
							<span className='font-bold font-mono text-4xl text-primary'>
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

					<div className='flex w-full items-center justify-between gap-2'>
						<Button
							variant='outline'
							size='icon'
							disabled={currentStep <= 0}
							onClick={() => onJump(-10)}
							aria-label='Retroceder 10 pasos'
							className='size-9'
						>
							<ChevronsLeft className='size-4' />
						</Button>

						<Button
							variant='secondary'
							disabled={currentStep <= 0}
							onClick={onPrev}
							className='flex-1 gap-1.5'
						>
							<ChevronLeft className='size-4' />
							Anterior
						</Button>

						<Button
							variant='default'
							disabled={currentStep >= totalSteps}
							onClick={onNext}
							className='flex-1 gap-1.5'
						>
							Siguiente
							<ChevronRight className='size-4' />
						</Button>

						<Button
							variant='outline'
							size='icon'
							disabled={currentStep >= totalSteps}
							onClick={() => onJump(10)}
							aria-label='Avanzar 10 pasos'
							className='size-9'
						>
							<ChevronsRight className='size-4' />
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
