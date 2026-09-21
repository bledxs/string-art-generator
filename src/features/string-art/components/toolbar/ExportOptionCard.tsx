'use client';

import { Download } from 'lucide-react';
import type { ReactNode } from 'react';

const colorStyles = {
	amber: {
		hoverBorder: 'hover:border-amber-500/40 hover:bg-amber-500/10',
		iconBg:
			'border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:bg-amber-500/20',
		badge:
			'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400',
	},
	emerald: {
		hoverBorder: 'hover:border-emerald-500/40 hover:bg-emerald-500/10',
		iconBg:
			'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500/20',
		badge:
			'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
	},
	blue: {
		hoverBorder: 'hover:border-blue-500/40 hover:bg-blue-500/10',
		iconBg:
			'border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500/20',
		badge: 'border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400',
	},
	purple: {
		hoverBorder: 'hover:border-purple-500/40 hover:bg-purple-500/10',
		iconBg:
			'border-purple-500/20 bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-500/20',
		badge:
			'border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400',
	},
};

export interface ExportOptionCardProps {
	title: string;
	description: string;
	extension: string;
	icon: ReactNode;
	theme: keyof typeof colorStyles;
	onClick: () => void;
	actionSlot?: ReactNode;
}

export function ExportOptionCard({
	title,
	description,
	extension,
	icon,
	theme,
	onClick,
	actionSlot,
}: Readonly<ExportOptionCardProps>) {
	const style = colorStyles[theme];

	return (
		<div className='flex flex-col gap-1.5'>
			<button
				type='button'
				onClick={onClick}
				className={`group relative flex w-full cursor-pointer items-center justify-between rounded-xl border border-border/70 bg-card/60 p-3.5 text-left shadow-xs transition-all duration-200 ${style.hoverBorder} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 active:opacity-90`}
			>
				<div className='flex items-center gap-3.5'>
					<div
						className={`flex size-10 shrink-0 items-center justify-center rounded-lg border transition-all group-hover:scale-105 ${style.iconBg}`}
					>
						{icon}
					</div>
					<div className='flex flex-col'>
						<div className='flex items-center gap-2'>
							<span className='font-semibold text-foreground text-xs sm:text-sm'>
								{title}
							</span>
							<span
								className={`rounded border px-1.5 py-0.5 font-medium font-mono text-xs ${style.badge}`}
							>
								{extension}
							</span>
						</div>
						<span className='mt-0.5 text-muted-foreground text-xs leading-relaxed'>
							{description}
						</span>
					</div>
				</div>
				<Download className='size-4 shrink-0 text-muted-foreground/40 transition-all group-hover:scale-110 group-hover:text-foreground' />
			</button>
			{actionSlot}
		</div>
	);
}
