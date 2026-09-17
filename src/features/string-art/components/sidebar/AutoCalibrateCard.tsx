'use client';

import { Sparkles, Wand2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import {
	type CalibrationRecommendation,
	computeEdgeDensity,
	computeLuminanceStats,
	deriveOptimalParameters,
} from '../../utils/imageAnalyzer';

interface AutoCalibrateCardProps {
	imageSrc: string;
	onApply: (rec: CalibrationRecommendation) => void;
	disabled?: boolean;
}

export function AutoCalibrateCard({
	imageSrc,
	onApply,
	disabled = false,
}: Readonly<AutoCalibrateCardProps>) {
	const [recommendation, setRecommendation] =
		useState<CalibrationRecommendation | null>(null);

	useEffect(() => {
		let isMounted = true;
		const img = new Image();
		img.crossOrigin = 'anonymous';
		img.src = imageSrc;
		img.onload = () => {
			if (!isMounted) return;
			const off = document.createElement('canvas');
			off.width = 300;
			off.height = 300;
			const ctx = off.getContext('2d');
			if (!ctx) return;
			ctx.drawImage(img, 0, 0, 300, 300);
			const data = ctx.getImageData(0, 0, 300, 300);

			const lumStats = computeLuminanceStats(data.data);
			const edgeDensity = computeEdgeDensity(data.data, 300, 300);

			const rec = deriveOptimalParameters({
				meanLuminance: lumStats.mean,
				contrastStdDev: lumStats.stdDev,
				edgeDensity,
			});
			setRecommendation(rec);
		};
		return () => {
			isMounted = false;
		};
	}, [imageSrc]);

	if (!recommendation) return null;

	return (
		<div className='rounded-xl border border-primary/20 bg-primary/5 p-3 shadow-xs'>
			<div className='flex items-center justify-between'>
				<span className='flex items-center gap-1.5 font-medium text-foreground text-xs'>
					<Wand2 className='size-3.5 text-primary' />
					Auto-Calibración Inteligente
				</span>
				<Badge variant='accent' className='font-mono text-xs'>
					<Sparkles className='mr-1 size-2.5 text-primary' />
					Recomendado
				</Badge>
			</div>

			<p className='mt-1.5 text-muted-foreground text-xs leading-relaxed'>
				{recommendation.reasoning}
			</p>

			<div className='mt-2.5 grid grid-cols-2 gap-1.5 font-mono text-xs'>
				<div className='rounded-md border bg-card/60 px-2 py-1'>
					<span className='text-muted-foreground text-xs'>Clavos:</span>
					<span className='ml-1 font-bold text-foreground'>
						{recommendation.pinCount}
					</span>
				</div>
				<div className='rounded-md border bg-card/60 px-2 py-1'>
					<span className='text-muted-foreground text-xs'>Líneas:</span>
					<span className='ml-1 font-bold text-foreground'>
						{recommendation.maxLines}
					</span>
				</div>
				<div className='rounded-md border bg-card/60 px-2 py-1'>
					<span className='text-muted-foreground text-xs'>Hilo:</span>
					<span className='ml-1 truncate font-bold text-foreground'>
						{recommendation.material.name.split(' ')[0]}
					</span>
				</div>
				<div className='rounded-md border bg-card/60 px-2 py-1'>
					<span className='text-muted-foreground text-xs'>Contraste:</span>
					<span className='ml-1 font-bold text-foreground'>
						+{recommendation.contrast}
					</span>
				</div>
			</div>

			<Button
				variant='secondary'
				size='sm'
				disabled={disabled}
				onClick={() => onApply(recommendation)}
				className='mt-3 w-full gap-1.5 font-semibold text-xs'
			>
				<Wand2 className='size-3.5 text-primary' />
				Aplicar Calibración Óptima
			</Button>
		</div>
	);
}
