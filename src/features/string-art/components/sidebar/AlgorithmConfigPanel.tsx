'use client';

import { Activity, Contrast, Layers, MoveHorizontal } from 'lucide-react';
import { Slider } from '@/shared/ui/slider';
import type { AlgorithmConfig } from '../../types';

interface AlgorithmConfigPanelProps {
	config: AlgorithmConfig;
	onChange: (updated: AlgorithmConfig) => void;
	disabled?: boolean;
}

export function AlgorithmConfigPanel({
	config,
	onChange,
	disabled = false,
}: AlgorithmConfigPanelProps) {
	const updateField = (field: keyof AlgorithmConfig, value: number) => {
		onChange({ ...config, [field]: value });
	};

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex flex-col gap-2'>
				<div className='flex items-center justify-between text-xs'>
					<span className='flex items-center gap-1.5 font-medium text-foreground'>
						<Layers className='size-3.5 text-primary' />
						Límite de líneas
					</span>
					<span className='font-mono text-muted-foreground'>
						{config.maxLines}
					</span>
				</div>
				<Slider
					value={[config.maxLines]}
					min={500}
					max={4500}
					step={100}
					disabled={disabled}
					onValueChange={(val) => updateField('maxLines', val[0])}
				/>
			</div>

			<div className='flex flex-col gap-2'>
				<div className='flex items-center justify-between text-xs'>
					<span className='flex items-center gap-1.5 font-medium text-foreground'>
						<Activity className='size-3.5 text-primary' />
						Opacidad de hilo
					</span>
					<span className='font-mono text-muted-foreground'>
						{config.opacityStep}
					</span>
				</div>
				<Slider
					value={[config.opacityStep]}
					min={5}
					max={50}
					step={1}
					disabled={disabled}
					onValueChange={(val) => updateField('opacityStep', val[0])}
				/>
			</div>

			<div className='flex flex-col gap-2'>
				<div className='flex items-center justify-between text-xs'>
					<span className='flex items-center gap-1.5 font-medium text-foreground'>
						<MoveHorizontal className='size-3.5 text-primary' />
						Distancia mín. de cuerda
					</span>
					<span className='font-mono text-muted-foreground'>
						{config.minDistance} clavos
					</span>
				</div>
				<Slider
					value={[config.minDistance]}
					min={5}
					max={50}
					step={1}
					disabled={disabled}
					onValueChange={(val) => updateField('minDistance', val[0])}
				/>
			</div>

			<div className='flex flex-col gap-2'>
				<div className='flex items-center justify-between text-xs'>
					<span className='flex items-center gap-1.5 font-medium text-foreground'>
						<Contrast className='size-3.5 text-primary' />
						Contraste de entrada
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
					onValueChange={(val) => updateField('contrast', val[0])}
				/>
			</div>
		</div>
	);
}
