'use client';

import type { ColorLayer, ColorRun } from '../../types';

interface ThreadSpoolWidgetProps {
	linesCount: number;
	diameterCm: number;
	materialName?: string;
	colorRuns?: ColorRun[];
	colorLayers?: ColorLayer[];
}

export function ThreadSpoolWidget({
	linesCount,
	diameterCm,
	materialName = 'Algodón #40 Gütermann',
	colorRuns,
	colorLayers,
}: Readonly<ThreadSpoolWidgetProps>) {
	const meters = Math.round((linesCount * (diameterCm * 0.65)) / 100);
	const spoolCapacityMeters = 2000;
	const spoolsNeeded = Math.max(1, Math.ceil(meters / spoolCapacityMeters));

	// If multi-color runs exist, display detailed multi-spool breakdown
	const activeMultiRuns =
		colorRuns && colorRuns.length > 1
			? colorRuns
			: colorLayers && colorLayers.length > 1
				? colorLayers.map((l, _idx) => ({
						layerId: l.id,
						name: l.name,
						color: l.color,
						startIndex: 0,
						endIndex: l.linesCount,
						lineCount: l.linesCount,
					}))
				: null;

	return (
		<div className='rounded-xl border border-amber-900/20 bg-amber-950/10 p-3 shadow-xs transition-colors dark:border-amber-500/20 dark:bg-amber-950/20'>
			<div className='flex items-center justify-between text-xs'>
				<span className='font-medium text-amber-900/80 dark:text-amber-300/80'>
					Carrete de Artesano
				</span>
				<span className='font-mono text-amber-700 text-xs dark:text-amber-400'>
					{activeMultiRuns
						? `${activeMultiRuns.length} bobinas`
						: `${spoolsNeeded} ${spoolsNeeded === 1 ? 'bobina' : 'bobinas'}`}
				</span>
			</div>

			<div className='mt-2 flex items-center gap-3'>
				{/* Stylized Wooden Thread Spool */}
				<div className='relative flex h-10 w-12 shrink-0 items-center justify-center'>
					{/* Spool Wooden Flanges */}
					<div className='absolute inset-y-0 left-0 w-2 rounded-l-xs border border-amber-900/40 bg-linear-to-r from-amber-700 via-amber-600 to-amber-800' />
					{/* Wound Thread Cylinder */}
					<div className='absolute inset-x-2 inset-y-1 flex items-center justify-center overflow-hidden rounded-xs bg-stone-900 shadow-inner'>
						<div
							className='size-full bg-linear-to-b from-stone-800 via-stone-950 to-stone-800 opacity-90'
							style={{
								backgroundImage:
									'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.06) 2px, rgba(255,255,255,0.06) 4px)',
							}}
						/>
					</div>
					{/* Spool Right Flange */}
					<div className='absolute inset-y-0 right-0 w-2 rounded-r-xs border border-amber-900/40 bg-linear-to-r from-amber-800 via-amber-600 to-amber-700' />
				</div>

				<div className='flex-1 overflow-hidden'>
					<div className='flex items-baseline justify-between'>
						<span className='truncate text-muted-foreground text-xs'>
							{materialName}
						</span>
						<span className='font-bold font-mono text-foreground text-sm'>
							{meters.toLocaleString()} m
						</span>
					</div>
					<div className='mt-1 flex items-center gap-2'>
						<div className='h-1.5 flex-1 overflow-hidden rounded-full bg-muted'>
							<div
								className='h-full rounded-full bg-amber-600 transition-all duration-300 dark:bg-amber-500'
								style={{
									width: `${Math.min(100, Math.max(5, (meters / spoolCapacityMeters) * 100))}%`,
								}}
							/>
						</div>
						<span className='font-mono text-muted-foreground text-xs'>
							Ø {diameterCm}cm
						</span>
					</div>
				</div>
			</div>

			{/* Multi-spool breakdown list */}
			{activeMultiRuns && (
				<div className='mt-2.5 flex flex-col gap-1.5 border-amber-900/10 border-t pt-2 dark:border-amber-500/10'>
					{activeMultiRuns.map((run) => {
						const count =
							run.lineCount ?? Math.max(0, run.endIndex - run.startIndex);
						const runMeters = Math.round((count * (diameterCm * 0.65)) / 100);
						return (
							<div
								key={run.layerId}
								className='flex items-center justify-between text-xs'
							>
								<div className='flex items-center gap-1.5 overflow-hidden'>
									<span
										className='size-2.5 shrink-0 rounded-full border border-black/30'
										style={{ backgroundColor: run.color }}
									/>
									<span className='truncate text-muted-foreground text-xs'>
										{run.name}
									</span>
								</div>
								<div className='flex items-center gap-2 font-mono text-xs'>
									<span className='text-muted-foreground'>{count} lín</span>
									<span className='font-medium text-foreground'>
										{runMeters} m
									</span>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
