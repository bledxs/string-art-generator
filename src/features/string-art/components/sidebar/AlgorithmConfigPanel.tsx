'use client';

import {
	Activity,
	Contrast,
	Feather,
	Layers,
	MoveHorizontal,
} from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Slider } from '@/shared/ui/slider';
import type { AlgorithmConfig } from '../../types';
import {
	findMaterialByWeight,
	THREAD_MATERIALS,
	type ThreadMaterial,
} from '../../utils/threadMaterials';

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
	const currentMaterial = findMaterialByWeight(config.lineWeight);

	const updateField = (field: keyof AlgorithmConfig, value: number) => {
		onChange({ ...config, [field]: value });
	};

	const handleSelectMaterial = (mat: ThreadMaterial) => {
		onChange({
			...config,
			lineWeight: mat.lineWeight,
			opacityStep: mat.recommendedOpacity,
		});
	};

	return (
		<div className='flex flex-col gap-4'>
			{/* Thread Material Presets */}
			<div className='flex flex-col gap-1.5'>
				<span className='font-medium text-foreground text-xs'>
					Tipo y Grosor de Hilo
				</span>
				<div className='grid grid-cols-2 gap-1.5'>
					{THREAD_MATERIALS.map((mat) => (
						<Button
							key={mat.id}
							type='button'
							variant={currentMaterial.id === mat.id ? 'default' : 'outline'}
							size='sm'
							disabled={disabled}
							onClick={() => handleSelectMaterial(mat)}
							className='h-auto flex-col items-start p-2 text-left'
						>
							<span className='font-semibold text-xs'>{mat.name}</span>
							<span className='font-mono text-xs opacity-75'>
								{mat.thicknessMm}mm
							</span>
						</Button>
					))}
				</div>
			</div>

			{/* Calibrated Line Weight Slider */}
			<div className='flex flex-col gap-2'>
				<div className='flex items-center justify-between text-xs'>
					<span className='flex items-center gap-1.5 font-medium text-foreground'>
						<Feather className='size-3.5 text-primary' />
						Grosor de trazo
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
					onValueChange={(val) => updateField('lineWeight', val[0])}
				/>
			</div>

			{/* Line Count Limit */}
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
					max={7000}
					step={100}
					disabled={disabled}
					onValueChange={(val) => updateField('maxLines', val[0])}
				/>
			</div>

			{/* Opacity Step */}
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
					min={3}
					max={50}
					step={1}
					disabled={disabled}
					onValueChange={(val) => updateField('opacityStep', val[0])}
				/>
			</div>

			{/* Min Distance */}
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

			{/* Contrast */}
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
