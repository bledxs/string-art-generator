'use client';

import {
	Activity,
	Contrast,
	Feather,
	Focus,
	Layers,
	MoveHorizontal,
	Route,
	Scale,
	Shield,
} from 'lucide-react';
import { useTranslation } from '@/shared/i18n';
import { Slider } from '@/shared/ui/slider';
import type { AlgorithmConfig } from '../../types';

interface AlgorithmSlidersProps {
	config: AlgorithmConfig;
	disabled?: boolean;
	onUpdateField: (field: keyof AlgorithmConfig, value: number) => void;
}

export function AlgorithmSliders({
	config,
	disabled = false,
	onUpdateField,
}: Readonly<AlgorithmSlidersProps>) {
	const { t } = useTranslation();
	const isLightOnDark = config.colorMode === 'light-on-dark';

	return (
		<div className='flex flex-col gap-3.5'>
			{/* Calibrated Line Weight Slider */}
			<div className='flex flex-col gap-1.5'>
				<div className='flex items-center justify-between text-xs'>
					<span className='flex items-center gap-1.5 font-medium text-foreground'>
						<Feather className='size-3.5 shrink-0 text-primary' />
						{t.engine.lineWeight}
					</span>
					<span className='font-mono text-muted-foreground'>
						{config.lineWeight}px
					</span>
				</div>
				<Slider
					value={[config.lineWeight]}
					min={0.4}
					max={2.5}
					step={0.05}
					disabled={disabled}
					onValueChange={(val) => onUpdateField('lineWeight', val[0])}
				/>
			</div>

			{/* Line Count Limit */}
			<div className='flex flex-col gap-1.5'>
				<div className='flex items-center justify-between text-xs'>
					<span className='flex items-center gap-1.5 font-medium text-foreground'>
						<Layers className='size-3.5 shrink-0 text-primary' />
						{t.engine.maxLines}
					</span>
					<span className='font-mono text-muted-foreground'>
						{config.maxLines}
					</span>
				</div>
				<Slider
					value={[config.maxLines]}
					min={500}
					max={4000}
					step={50}
					disabled={disabled}
					onValueChange={(val) => onUpdateField('maxLines', val[0])}
				/>
			</div>

			{/* Edge Weight / Detail Emphasis */}
			<div className='flex flex-col gap-1.5'>
				<div className='flex items-center justify-between text-xs'>
					<span className='flex items-center gap-1.5 font-medium text-foreground'>
						<Focus className='size-3.5 shrink-0 text-primary' />
						{t.engine.edgeWeight}
					</span>
					<span className='font-mono text-muted-foreground'>
						{Math.round((config.edgeWeight ?? 0.25) * 100)}%
					</span>
				</div>
				<Slider
					value={[config.edgeWeight ?? 0.25]}
					min={0}
					max={0.8}
					step={0.05}
					disabled={disabled}
					onValueChange={(val) => onUpdateField('edgeWeight', val[0])}
				/>
			</div>

			{/* Background / Shadow Protection */}
			<div className='flex flex-col gap-1.5'>
				<div className='flex items-center justify-between text-xs'>
					<span className='flex items-center gap-1.5 font-medium text-foreground'>
						<Shield className='size-3.5 shrink-0 text-primary' />
						{isLightOnDark
							? t.engine.whitePenaltyAdditive
							: t.engine.whitePenaltySubtractive}
					</span>
					<span className='font-mono text-muted-foreground'>
						{(config.whitePenalty ?? 1.3).toFixed(1)}x
					</span>
				</div>
				<Slider
					value={[config.whitePenalty ?? 1.3]}
					min={1.0}
					max={3.0}
					step={0.1}
					disabled={disabled}
					onValueChange={(val) => onUpdateField('whitePenalty', val[0])}
				/>
			</div>

			{/* Fractional Length Normalization */}
			<div className='flex flex-col gap-1.5'>
				<div className='flex items-center justify-between text-xs'>
					<span className='flex items-center gap-1.5 font-medium text-foreground'>
						<Scale className='size-3.5 shrink-0 text-primary' />
						{t.engine.lengthPenalty}
					</span>
					<span className='font-mono text-muted-foreground'>
						γ = {(config.lengthPenalty ?? 0.5).toFixed(2)}
					</span>
				</div>
				<Slider
					value={[config.lengthPenalty ?? 0.5]}
					min={0.0}
					max={0.9}
					step={0.05}
					disabled={disabled}
					onValueChange={(val) => onUpdateField('lengthPenalty', val[0])}
				/>
				<span className='text-muted-foreground text-xs leading-tight opacity-80'>
					{t.engine.lengthPenaltyDesc}
				</span>
			</div>

			{/* Angular Anti-Rebound */}
			<div className='flex flex-col gap-1.5'>
				<div className='flex items-center justify-between text-xs'>
					<span className='flex items-center gap-1.5 font-medium text-foreground'>
						<Route className='size-3.5 shrink-0 text-primary' />
						{t.engine.reboundPenalty}
					</span>
					<span className='font-mono text-muted-foreground'>
						{Math.round((1 - (config.reboundPenalty ?? 0.85)) * 100)}%
					</span>
				</div>
				<Slider
					value={[config.reboundPenalty ?? 0.85]}
					min={0.5}
					max={1.0}
					step={0.05}
					disabled={disabled}
					onValueChange={(val) => onUpdateField('reboundPenalty', val[0])}
				/>
				<span className='text-muted-foreground text-xs leading-tight opacity-80'>
					{t.engine.reboundPenaltyDesc}
				</span>
			</div>

			{/* Opacity Step */}
			<div className='flex flex-col gap-1.5'>
				<div className='flex items-center justify-between text-xs'>
					<span className='flex items-center gap-1.5 font-medium text-foreground'>
						<Activity className='size-3.5 shrink-0 text-primary' />
						{t.engine.opacityStep}
					</span>
					<span className='font-mono text-muted-foreground'>
						{config.opacityStep}
					</span>
				</div>
				<Slider
					value={[config.opacityStep]}
					min={3}
					max={50}
					step={1}
					disabled={disabled}
					onValueChange={(val) => onUpdateField('opacityStep', val[0])}
				/>
			</div>

			{/* Min Distance */}
			<div className='flex flex-col gap-1.5'>
				<div className='flex items-center justify-between text-xs'>
					<span className='flex items-center gap-1.5 font-medium text-foreground'>
						<MoveHorizontal className='size-3.5 shrink-0 text-primary' />
						{t.engine.minDistance}
					</span>
					<span className='font-mono text-muted-foreground'>
						{config.minDistance} {t.engine.minDistanceUnit}
					</span>
				</div>
				<Slider
					value={[config.minDistance]}
					min={5}
					max={50}
					step={1}
					disabled={disabled}
					onValueChange={(val) => onUpdateField('minDistance', val[0])}
				/>
			</div>

			{/* Contrast */}
			<div className='flex flex-col gap-1.5'>
				<div className='flex items-center justify-between text-xs'>
					<span className='flex items-center gap-1.5 font-medium text-foreground'>
						<Contrast className='size-3.5 shrink-0 text-primary' />
						{t.engine.contrast}
					</span>
					<span className='font-mono text-muted-foreground'>
						{config.contrast}
					</span>
				</div>
				<Slider
					value={[config.contrast]}
					min={-50}
					max={80}
					step={5}
					disabled={disabled}
					onValueChange={(val) => onUpdateField('contrast', val[0])}
				/>
			</div>
		</div>
	);
}
