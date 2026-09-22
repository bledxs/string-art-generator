'use client';

import { Check } from 'lucide-react';
import { useTranslation } from '@/shared/i18n';
import { Badge } from '@/shared/ui/badge';
import { NumberTicker } from '@/shared/ui/magicui';

interface ProjectStatsProps {
	linesCount: number;
	pinCount: number;
	diameterCm: number;
	timeElapsedMs: number;
	converged?: boolean;
}

export function ProjectStats({
	linesCount,
	pinCount,
	diameterCm,
	timeElapsedMs,
	converged,
}: Readonly<ProjectStatsProps>) {
	const { t } = useTranslation();
	const estimatedMeters = Math.round((linesCount * (diameterCm * 0.65)) / 100);
	const seconds = (timeElapsedMs / 1000).toFixed(1);

	return (
		<div className='hidden items-center gap-2 md:flex'>
			{converged && (
				<Badge
					variant='outline'
					className='border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
				>
					<Check className='mr-1 size-3' />
					{t.header.status.completed}
				</Badge>
			)}
			<Badge variant='accent'>
				{t.header.stats.lines}:{' '}
				<span className='ml-1 font-bold text-foreground'>{linesCount}</span>
			</Badge>
			<Badge variant='accent'>
				{t.header.stats.pins}:{' '}
				<NumberTicker
					value={pinCount}
					className='ml-1 font-bold text-foreground'
				/>
			</Badge>
			<Badge variant='accent'>~{estimatedMeters}m</Badge>
			{timeElapsedMs > 0 && (
				<Badge variant='accent'>
					{t.header.stats.time}:{' '}
					<span className='ml-1 font-bold text-foreground'>{seconds}s</span>
				</Badge>
			)}
		</div>
	);
}
