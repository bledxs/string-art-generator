'use client';

import { CircleDot, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import type * as React from 'react';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import type { EngineStatus } from '../../types';
import { ProjectStats } from './ProjectStats';

interface StudioHeaderProps {
	status: EngineStatus;
	linesCount: number;
	pinCount: number;
	diameterCm: number;
	timeElapsedMs: number;
	actionSlot?: React.ReactNode;
}

export function StudioHeader({
	status,
	linesCount,
	pinCount,
	diameterCm,
	timeElapsedMs,
	actionSlot,
}: StudioHeaderProps) {
	const { theme, setTheme } = useTheme();

	const toggleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

	const statusBadge = {
		idle: <Badge variant='secondary'>Inactivo</Badge>,
		running: (
			<Badge className='bg-amber-500/15 text-amber-600 dark:text-amber-400'>
				Calculando...
			</Badge>
		),
		paused: (
			<Badge className='bg-orange-500/15 text-orange-600 dark:text-orange-400'>
				Pausado
			</Badge>
		),
		completed: (
			<Badge className='bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'>
				Completado
			</Badge>
		),
	}[status];

	return (
		<header className='flex h-14 w-full items-center justify-between border-b bg-card/60 px-4 backdrop-blur-md'>
			<div className='flex items-center gap-3'>
				<div className='flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary'>
					<CircleDot className='size-4' />
				</div>
				<div className='flex flex-col'>
					<div className='flex items-center gap-2'>
						<span className='font-semibold text-sm tracking-tight'>
							String Art Studio
						</span>
						{statusBadge}
					</div>
					<span className='text-muted-foreground text-xs'>
						Generador de tejido geométrico de alta resolución
					</span>
				</div>
			</div>

			<ProjectStats
				linesCount={linesCount}
				pinCount={pinCount}
				diameterCm={diameterCm}
				timeElapsedMs={timeElapsedMs}
			/>

			<div className='flex items-center gap-2'>
				{actionSlot}
				<Button
					variant='ghost'
					size='icon'
					onClick={toggleTheme}
					aria-label='Alternar tema'
					className='size-8'
				>
					<Sun className='size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
					<Moon className='absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
				</Button>
			</div>
		</header>
	);
}
