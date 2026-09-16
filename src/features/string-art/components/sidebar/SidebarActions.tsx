'use client';

import { Play, RotateCcw, Sliders, Square } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import type { EngineStatus } from '../../types';

interface SidebarActionsProps {
	status: EngineStatus;
	onStart: () => void;
	onPause: () => void;
	onResume: () => void;
	onStop: () => void;
}

export function SidebarActions({
	status,
	onStart,
	onPause,
	onResume,
	onStop,
}: Readonly<SidebarActionsProps>) {
	if (status === 'idle') {
		return (
			<Button
				variant='default'
				size='lg'
				onClick={onStart}
				className='w-full gap-2 font-medium'
			>
				<Play className='size-4 fill-current' />
				Generar Arte de Hilo
			</Button>
		);
	}

	if (status === 'running') {
		return (
			<div className='flex gap-2'>
				<Button
					variant='secondary'
					size='lg'
					onClick={onPause}
					className='flex-1 gap-2'
				>
					<Sliders className='size-4' />
					Pausar
				</Button>
				<Button
					variant='destructive'
					size='lg'
					onClick={onStop}
					aria-label='Detener cálculo'
					className='size-10 px-0'
				>
					<Square className='size-4 fill-current' />
				</Button>
			</div>
		);
	}

	if (status === 'paused') {
		return (
			<div className='flex gap-2'>
				<Button
					variant='default'
					size='lg'
					onClick={onResume}
					className='flex-1 gap-2'
				>
					<Play className='size-4 fill-current' />
					Reanudar
				</Button>
				<Button
					variant='destructive'
					size='lg'
					onClick={onStop}
					aria-label='Detener cálculo'
					className='size-10 px-0'
				>
					<Square className='size-4 fill-current' />
				</Button>
			</div>
		);
	}

	return (
		<Button
			variant='outline'
			size='lg'
			onClick={onStart}
			className='w-full gap-2'
		>
			<RotateCcw className='size-4' />
			Regenerar
		</Button>
	);
}
