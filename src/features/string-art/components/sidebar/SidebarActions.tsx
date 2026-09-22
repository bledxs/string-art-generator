'use client';

import { Play, RotateCcw, Sliders, Square } from 'lucide-react';
import { useTranslation } from '@/shared/i18n';
import { Button, ShimmerButton } from '@/shared/ui';
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
	const { t } = useTranslation();

	if (status === 'idle') {
		return (
			<ShimmerButton onClick={onStart} className='w-full'>
				<Play className='size-4 fill-current' />
				{t.actions.generate}
			</ShimmerButton>
		);
	}

	if (status === 'running') {
		return (
			<div className='flex gap-2'>
				<Button
					variant='secondary'
					size='lg'
					onClick={onPause}
					className='min-w-0 flex-1 gap-2'
				>
					<Sliders className='size-4' />
					{t.actions.pause}
				</Button>
				<Button
					variant='destructive'
					size='lg'
					onClick={onStop}
					aria-label={t.actions.stopAria}
					className='size-10 shrink-0 px-0'
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
					className='min-w-0 flex-1 gap-2'
				>
					<Play className='size-4 fill-current' />
					{t.actions.resume}
				</Button>
				<Button
					variant='destructive'
					size='lg'
					onClick={onStop}
					aria-label={t.actions.stopAria}
					className='size-10 shrink-0 px-0'
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
			{t.actions.regenerate}
		</Button>
	);
}
