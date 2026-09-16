import { Badge } from '@/shared/ui/badge';

interface ProjectStatsProps {
	linesCount: number;
	pinCount: number;
	diameterCm: number;
	timeElapsedMs: number;
}

export function ProjectStats({
	linesCount,
	pinCount,
	diameterCm,
	timeElapsedMs,
}: ProjectStatsProps) {
	// Average chord length is approximately 0.65 * diameter
	const estimatedMeters = Math.round((linesCount * (diameterCm * 0.65)) / 100);
	const seconds = (timeElapsedMs / 1000).toFixed(1);

	return (
		<div className='hidden items-center gap-2 md:flex'>
			<Badge variant='accent'>
				Líneas:{' '}
				<span className='ml-1 font-bold text-foreground'>{linesCount}</span>
			</Badge>
			<Badge variant='accent'>
				Clavos:{' '}
				<span className='ml-1 font-bold text-foreground'>{pinCount}</span>
			</Badge>
			<Badge variant='accent'>
				Hilo est.:{' '}
				<span className='ml-1 font-bold text-foreground'>
					~{estimatedMeters}m
				</span>
			</Badge>
			{timeElapsedMs > 0 && (
				<Badge variant='accent'>
					Tiempo:{' '}
					<span className='ml-1 font-bold text-foreground'>{seconds}s</span>
				</Badge>
			)}
		</div>
	);
}
