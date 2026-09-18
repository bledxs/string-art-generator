'use client';

import { Heart, Moon, SlidersHorizontal, Sun } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import type * as React from 'react';
import { siteConfig } from '@/shared/config/site';
import { LanguageSelector, useTranslation } from '@/shared/i18n';
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
	converged?: boolean;
	actionSlot?: React.ReactNode;
	onToggleMobileSidebar?: () => void;
}

export function StudioHeader({
	status,
	linesCount,
	pinCount,
	diameterCm,
	timeElapsedMs,
	converged,
	actionSlot,
	onToggleMobileSidebar,
}: Readonly<StudioHeaderProps>) {
	const { theme, setTheme } = useTheme();
	const { t } = useTranslation();

	const toggleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

	const statusBadge = {
		idle: <Badge variant='secondary'>{t.header.status.idle}</Badge>,
		running: (
			<Badge className='bg-amber-500/15 text-amber-600 dark:text-amber-400'>
				{t.header.status.running}
			</Badge>
		),
		paused: (
			<Badge className='bg-orange-500/15 text-orange-600 dark:text-orange-400'>
				{t.header.status.paused}
			</Badge>
		),
		completed: (
			<Badge className='bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'>
				{t.header.status.completed}
			</Badge>
		),
	}[status];

	return (
		<header className='flex h-14 w-full items-center justify-between border-b bg-card/60 px-2 backdrop-blur-md sm:px-4'>
			<div className='flex min-w-0 items-center gap-2 sm:gap-3'>
				{onToggleMobileSidebar && (
					<Button
						variant='ghost'
						size='icon'
						onClick={onToggleMobileSidebar}
						aria-label={t.header.openSettingsAria}
						className='size-8 shrink-0 md:hidden'
					>
						<SlidersHorizontal className='size-4' />
					</Button>
				)}

				<div className='flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 p-1'>
					<Image
						src='/favicon.svg'
						alt='String Art Studio'
						width={24}
						height={24}
						priority
						className='size-6 shrink-0 transition-transform hover:scale-105'
					/>
				</div>
				<div className='flex min-w-0 flex-col'>
					<div className='flex items-center gap-1.5 sm:gap-2'>
						<span className='truncate font-semibold text-xs tracking-tight sm:text-sm'>
							{t.header.title}
						</span>
						<div className='xs:inline-flex hidden sm:inline-flex'>
							{statusBadge}
						</div>
					</div>
					<span className='hidden text-muted-foreground text-xs sm:block'>
						{t.header.subtitle}
					</span>
				</div>
			</div>

			<ProjectStats
				linesCount={linesCount}
				pinCount={pinCount}
				diameterCm={diameterCm}
				timeElapsedMs={timeElapsedMs}
				converged={converged}
			/>

			<div className='flex shrink-0 items-center gap-1.5 sm:gap-2'>
				<LanguageSelector />
				<Button
					asChild
					variant='ghost'
					size='icon'
					className='size-8 text-rose-500 hover:bg-rose-500/10 hover:text-rose-600 dark:text-rose-400 dark:hover:bg-rose-400/10 dark:hover:text-rose-300'
				>
					<a
						href={siteConfig.links.sponsor}
						target='_blank'
						rel='noreferrer'
						aria-label={t.header.sponsorAria}
						title={t.header.sponsorBtn}
					>
						<Heart className='size-4 fill-rose-500/20' />
					</a>
				</Button>
				{actionSlot}
				<Button
					variant='ghost'
					size='icon'
					onClick={toggleTheme}
					aria-label={t.header.toggleThemeAria}
					className='size-8'
				>
					<Sun className='size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
					<Moon className='absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
				</Button>
			</div>
		</header>
	);
}
